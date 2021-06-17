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

/* POST files. */
router.post('/', upload.array('monfichier', 10), function (req, res, next) {
  for (file of req.files)
    fs.rename(file.path, 'public/images/' + file.originalname, function (err) {
      if (err) {
        res.send('problème durant le déplacement');
      } else {
        res.send('Fichier uploadé avec succès');
      }
    });
});

router.get('/', function (req, res, next) {
  res.send('ok');
});

module.exports = router;
