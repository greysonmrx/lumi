import { randomUUID } from "node:crypto";

import { ICreateFileDTO } from "../../dtos/ICreateFileDTO";

import { File } from "../../entities/fakes/File";

import { IFilesRepository } from "../IFilesRepository";

export class FakeFilesRepository implements IFilesRepository {
  public async create(data: ICreateFileDTO): Promise<File> {
    const file = new File();

    Object.assign(file, {
      id: randomUUID(),
      name: data.name,
      path: data.path,
      createdAt: new Date(),
    });

    return file;
  }
}
