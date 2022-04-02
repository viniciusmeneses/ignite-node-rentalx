import crypto from "crypto";
import { Options, diskStorage } from "multer";
import { resolve } from "path";

const upload = (folder: string): Options => ({
  storage: diskStorage({
    destination: resolve(__dirname, "..", "..", folder),
    filename: (_req, file, callback) => {
      const hash = crypto.randomBytes(16).toString("hex");
      const name = `${hash}-${file.originalname}`;
      return callback(null, name);
    },
  }),
});

export default { upload };
