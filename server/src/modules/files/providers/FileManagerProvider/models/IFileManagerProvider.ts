import { IFileToBeUploaded } from "./IFileToBeUploaded";

export interface IFileManagerProvider {
  prepareUpload(file: IFileToBeUploaded): Pick<IFileToBeUploaded, "name"> & {
    path: string;
    upload: () => Promise<void>;
  };
}
