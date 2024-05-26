import { generateFileKey } from "@/shared/utils/generateFileKey";

import { IFileManagerProvider } from "../models/IFileManagerProvider";
import { IFileToBeUploaded } from "../models/IFileToBeUploaded";

export class FakeFileManagerProvider implements IFileManagerProvider {
  public prepareUpload(file: IFileToBeUploaded): Pick<
    IFileToBeUploaded,
    "name"
  > & {
    path: string;
    upload: () => Promise<void>;
  } {
    const name = generateFileKey(file.name);
    const path = "/fake/path";

    return {
      name,
      path,
      upload: async () => {},
    };
  }
}
