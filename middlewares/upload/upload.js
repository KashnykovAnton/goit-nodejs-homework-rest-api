import multer from "multer";

const TMP_DIR = process.env.TMP_DIR;

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, TMP_DIR);
  },
  filename: function (_req, file, cb) {
    cb(null, `${Date.now().toString()}_${file.originalname}`);
  },
});

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5e5 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.includes("image")) {
      return cb(null, true);
    }

    cb(new Error("Wrong file format for avatar!"));
  },
});
