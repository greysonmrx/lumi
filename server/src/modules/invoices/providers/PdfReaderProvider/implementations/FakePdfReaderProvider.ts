import { IPdfReaderProvider } from "../models/IPdfReaderProvider";

export class FakePdfReaderProvider implements IPdfReaderProvider {
  public async getContent(pdfFile: Buffer): Promise<string> {
    return String(pdfFile);
  }
}
