import { v4 as uuidv4 } from "uuid";
import path from "node:path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uploadFiles = (
  files,
  extensionValid = ["jpg", "png", "gif", "jpeg"],
  folder = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;

    const nameCut = archivo.name.split(".");
    const extension = nameCut[nameCut.length - 1];

    // Validar extension
    if (!extensionValid.includes(extension)) {
      return reject(
        `La extension ${extension} no es permitida, ${extensionValid}`
      );
    }

    const nameTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", folder, nameTemp);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        return reject(err);
      }

      resolve(nameTemp);
    });
  });
};

export { uploadFiles };
