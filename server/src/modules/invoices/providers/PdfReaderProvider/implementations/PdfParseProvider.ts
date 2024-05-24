import PdfParse from "pdf-parse";

import { IPdfReaderProvider } from "../models/IPdfReaderProvider";

export class PdfParseProvider implements IPdfReaderProvider {
  public async getContent(pdfFile: Buffer): Promise<string> {
    const pdfData = await PdfParse(pdfFile);

    return pdfData.text;
  }
}
