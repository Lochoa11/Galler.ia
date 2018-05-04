
const router = require('express').Router();
const s3 = require('s3');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const models = require('../models');
const Redirect = require('../middlewares/redirect');

const upload = multer({ dest: './temp/' });
const s3BucketName = 'gallerie1';
const s3Region = 'us-east-1';

// TODO: Load from config file
const client = s3.createClient({
  maxAsyncS3: 20,
  s3RetryCount: 3,
  s3RetryDelay: 1000,
  multipartUploadThreshold: 20971520,
  multipartUploadSize: 15728640,
  s3Options: {
    accessKeyId: 'AKIAIU3RYHKS5WEH7J4A',
    secretAccessKey: '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',
    region: s3Region,
  },
});


router.get('/', Redirect.ifNotLoggedIn(), (req, res) => {

  // TODO: Fetch all user pictures and display thumbanils
  const user = req.user; // TODO: change this, wrong
  models.Photos.findAll({
    order: ['createdAt'],
    where: {
      UserId: req.user.id,
    },
  }).then((photos) => {
    const context = {
      user,
      photos,
    };
    res.render('profile', context);
  });
});



router.get('/upload', (req, res) => {
  res.render('profile/upload');
});


router.post('/upload', upload.single('file'), (req, res) => {
  const ext = path.extname(req.file.originalname);
  // Validate image file here
  const tempFile = `${req.file.destination}${req.file.filename}`; // temp/FILENAME
  const s3KeyLocation = `user_content/${req.file.filename}${ext}`; // Folder to store in S3

  const params = {
    localFile: tempFile,
    s3Params: {
      Bucket: s3BucketName,
      Key: s3KeyLocation,
      ACL: 'public-read',
    },
  };

  const uploader = client.uploadFile(params);
  uploader.on('error', (err) => {
    // TODO:Redirect or Error Message
    console.error('Unable to Upload', err.stack);
  });

  uploader.on('progress', () => {
    // console.log('Progress', uploader.progressMd5Amount, uploader.progressAmount, uploader.progressTotal)
  });

  uploader.on('end', () => {
    const s3Url = s3.getPublicUrlHttp(s3BucketName, s3KeyLocation, s3Region);
    // Create Photo
    models.Photos.create({
      title: req.body.title,
      description: req.body.description,
      image_url: s3Url,
      UserId: req.user.id,
    });
    fs.unlink(tempFile);
    // Redirect to photo page
    // res.sendStatus(200);
    res.render('profile/uploadcomplete');
  });
});

module.exports = router;
