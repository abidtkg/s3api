const expres = require('express');
const router = expres.Router();

router.get('/', (req, res) => {
    res.status(200).json({message: 'API Home Page Working'});
});


module.exports = router;