import { ICreateFileDTO } from "../dtos/ICreateFileDTO";

import { IFile } from "../entities/IFile";

export interface IFilesRepository {
  create(data: ICreateFileDTO): Promise<IFile>;
}
