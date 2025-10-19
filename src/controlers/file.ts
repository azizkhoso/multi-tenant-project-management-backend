import { Request, Response } from "express";
import { getFileById as fileById } from "../services/file.service";

export async function getFileById(req: Request, res: Response) {
  const f = await fileById(req.params.id as string);
  res.contentType(f.file.mimeType).send(f?.fileBuffer);
}
