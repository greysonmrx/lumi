import { IFilesRepository } from "@/modules/files/repositories/IFilesRepository";

import { IFile } from "@/modules/files/entities/IFile";

import { ICreateFileDTO } from "@/modules/files/dtos/ICreateFileDTO";

import { prisma } from "@/shared/infra/database";

export class FilesRepository implements IFilesRepository {
  public async create(data: ICreateFileDTO): Promise<IFile> {
    const file = await prisma.file.create({
      data: {
        name: data.name,
        path: data.path,
      },
    });

    return file;
  }
}
