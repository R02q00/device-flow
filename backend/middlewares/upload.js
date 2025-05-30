import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, 'Public/tools');
    },
    filename: (res, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }

});

const upload = multer({storage: storage});

export default upload;