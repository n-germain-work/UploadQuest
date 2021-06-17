var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const fs = require('fs');

/* POST file. */
router.post('/', upload.single('monfichier'), function (req, res, next) {
  console.log('test');
  fs.rename(
    req.file.path,
    'public/images/' + req.file.originalname,
    function (err) {
      if (err) {
        res.send('problème durant le déplacement');
      } else {
        res.send('Fichier uploadé avec succès');
      }
    }
  );
});

router.get('/', function (req, res, next) {
  res.send('ok');
});

module.exports = router;
