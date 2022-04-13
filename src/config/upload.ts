import crypto from "crypto";
import { diskStorage } from "multer";
import { resolve } from "path";

const tmpFolder = resolve(__dirname, "..", "..", "tmp");

export default {
  tmpFolder,
  storage: diskStorage({
    destination: tmpFolder,
    filename: (_req, file, callback) => {
      const hash = crypto.randomBytes(16).toString("hex");
      const name = `${hash}-${file.originalname}`;
      return callback(null, name);
    },
  }),
};
