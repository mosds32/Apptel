import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath = '';
        if (file.mimetype.startsWith('image/')) {
            uploadPath = './public/uploads/images';
        } else {
            uploadPath = './public/uploads';
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Use originalname instead of filename
        cb(null, new Date().valueOf() + '_' + file.originalname);
    }
});

const multerConfig = {
    upload: multer({ storage: storage })
};

export default multerConfig;
