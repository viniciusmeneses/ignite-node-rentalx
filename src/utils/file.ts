import { stat, unlink } from "fs/promises";

export const deleteFile = async (fileName: string): Promise<void> => {
  try {
    await stat(fileName);
  } catch {
    return;
  }

  await unlink(fileName);
};
