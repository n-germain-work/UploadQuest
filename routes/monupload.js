var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({
  dest: 'tmp/',
  limits: { fileSize: 3145728 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png format allowed!'));
    }
  },
});
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
