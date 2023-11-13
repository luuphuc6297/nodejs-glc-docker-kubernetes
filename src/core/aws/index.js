const path = require('path');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const { v4: uuidV4 } = require('uuid');
const { AWS_ACCESS_KEY_ID, AWS_REGION, AWS_SECRET_KEY, AWS_S3_UPLOAD_BUCKET } = require('../config/config');

// Define vars
const AWS_S3_BUCKET = AWS_S3_UPLOAD_BUCKET;
const ACL = 'public-read';
const CACHE_CONTROL = 'public, max-age=31536000';

// S3 credential
const s3Credential = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION,
};
// Register credential
aws.config.update(s3Credential);

// Initialize S3 service
const s3 = new aws.S3();

// AWS S3 Storage config
exports.s3Storage = multerS3({
    s3,
    bucket: AWS_S3_BUCKET,
    acl: ACL,
    cacheControl: CACHE_CONTROL,
    metadata: (req, file, cb) => {
        cb(null, { ...req.body });
    },
    key: (req, file, cb) => {
        const extName = path.extname(file.originalname).toLowerCase();
        cb(null, `test/${uuidV4().replace(/-/g, '_')}_o${extName}`);
    },
});
