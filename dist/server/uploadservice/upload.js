import * as multer from 'multer';
const filter = function (req, image, cb) {
    if (image.mimetype === "image/jpeg" ||
        image.mimetype === "image/jpg" ||
        image.mimetype === "image/png") {
        return cb(null, true);
    }
    else {
        return cb(null, false);
    }
};
const memorystorage = multer.memoryStorage();
var uploader = multer({ storage: memorystorage, fileFilter: filter }).single("imagedata");
//# sourceMappingURL=upload.js.map