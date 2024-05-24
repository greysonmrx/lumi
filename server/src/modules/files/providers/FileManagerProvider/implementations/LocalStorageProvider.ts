import { writeFile } from "node:fs";
import { promisify } from "node:util";

import { generateFileKey } from "@/shared/utils/generateFileKey";

import { LOCAL_UPLOADS_FOLDER } from "@/config/upload";

import { IFileManagerProvider } from "../models/IFileManagerProvider";
import { IFileToBeUploaded } from "../models/IFileToBeUploaded";

export class LocalStorageProvider implements IFileManagerProvider {
  private async upload({
    name,
    path,
    content,
  }: IFileToBeUploaded & { path: string }): Promise<void> {
    const writeFileAsync = promisify(writeFile);

    return writeFileAsync(`${path}/${name}`, content);
  }

  public prepareUpload(file: IFileToBeUploaded): Pick<
    IFileToBeUploaded,
    "name"
  > & {
    path: string;
    upload: () => Promise<void>;
  } {
    const name = generateFileKey(file.name);
    const path = LOCAL_UPLOADS_FOLDER;

    return {
      name,
      path,
      upload: () => this.upload({ ...file, name, path }),
    };
  }
}
