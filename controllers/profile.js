const router = require('express').Router();
const s3 = require('s3');
const multer = require('multer');
const path = require('path');
const Redirect = require('../middlewares/redirect');

const upload = multer({ dest: './temp/' });

const s3BucketName = 'gallerie1';
const s3Region = 'us-east-1';

// TODO: Load from config file
const client = s3.createClient({
  maxAsyncS3: 20,
  s3RetryCount: 3,
  s3RetryDelay: 1000,
  multipartUploadThreshold: 20971520, // this is the default (20 MB)
  multipartUploadSize: 15728640, // this is the default (15 MB)
  s3Options: {
    accessKeyId: 'AKIAIU3RYHKS5WEH7J4A',
    secretAccessKey: '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',
    region: s3Region,
  },
});


router.get('/', Redirect.ifNotLoggedIn(), (req, res) => {
  let context = { randomPerson: req.user };
  res.render('profile', context);
});


router.get('/edit', Redirect.ifNotLoggedIn(), (req, res) => {
  res.sendStatus(200);
});


router.get('/upload', (req, res) => {
  res.render('profile/upload');
});


router.post('/upload', upload.single('file'), (req, res) => {
  console.log(req.body); // form fields
  console.log(req.file);

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
    const s3BaseUrl = s3.getPublicUrlHttp(s3BucketName, s3KeyLocation, s3Region);
    // Create Photo
    // Delete temp file
    console.log(s3BaseUrl);
    console.log('Done Uploading');
    // Redirect to photo page
  });
});

module.exports = router;
