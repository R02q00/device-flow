import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, '../Public/tools');
    },
    filename: (res, file, cb) => {
        const filename = Date.now() + '_' + path.extname(file.originalname)
        cb(null, filename);
    }

});

export const upload = multer({storage});
