import fs from "fs";
import path from "path";
import FileModel from "../models/File";

export async function saveFile(file: { name: string; url: string; size: number }, fileBuffer: Buffer) {
  // save buffer to local storage in `files` folder
  // ensure the `files` folder exists
  const filesDir = path.join(__dirname, "../../files");
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
  }
  const savedData = await FileModel.create(file);
  // construct file path
  const pathname = path.join(filesDir, savedData.id + path.extname(file.name));
  // write file to disk
  fs.writeFileSync(pathname, fileBuffer);
  return savedData;
}

export async function getFileById(id: string) {
  const file = await FileModel.findByPk(id);
  if (!file) return null;
  const filesDir = path.join(__dirname, "../../files");
  const pathname = path.join(filesDir, file.id + path.extname(file.name));
  if (!fs.existsSync(pathname)) return null;
  const fileBuffer = fs.readFileSync(pathname);
  return { file, fileBuffer };
}

export async function deleteFileById(id: string) {
  const file = await FileModel.findByPk(id);
  if (!file) return false;
  const filesDir = path.join(__dirname, "../../files");
  const pathname = path.join(filesDir, file.id + path.extname(file.name));
  if (fs.existsSync(pathname)) {
    fs.unlinkSync(pathname);
  }
  await file.destroy();
  return true;
}

export async function listFiles() {
  const files = await FileModel.findAll();
  return files;
}

export async function updateFile(id: string, data: Partial<{ name: string; url: string; size: number }>, buffer?: Buffer) {
  const file = await FileModel.findByPk(id);
  if (!file) return null;
  const updated = await file.update(data);
  // update the file on disk while keeping the same extension and name
  if (buffer) {
    const filesDir = path.join(__dirname, "../../files");
    const pathname = path.join(filesDir, updated.id + path.extname(updated.name));
    fs.writeFileSync(pathname, buffer);
  }
  return file;
}
