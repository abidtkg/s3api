const express = require('express');
const app = express();
require('dotenv').config();
const AWS = require('aws-sdk');
const upload = require('./configs/multer.config');
const fs = require('fs');
const uuid = require('uuid/v4')

// Setup S3 Bucket
const s3 = new AWS.S3({
    accessKeyId: process.env.AWSACCESSKEYID,
    secretAccessKey: process.env.AWSSECRETACCESSKEY
})

// Import Routes
const homeRoutes = require('./routes/home.routes');

// Implement Routes
app.use('/', homeRoutes);

app.post('/upload', upload.single('image'), async (req, res) => {
    const file = req.file;
    let myFile = req.file.originalname.split(".")
    const fileType = myFile[myFile.length - 1]

    const params = {
        Bucket: process.env.AWSBUCKETNAME,
        Key: `${uuid()}.${fileType}`,
        Body: req.file.buffer
    }


    await s3.upload(params, (error, success) => {
        if(error){
            return res.status(500).json(error);
        }else{
            res.status(200).json(success);
        }
    })

});

// Port To Listen
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server Port: ${port}`));