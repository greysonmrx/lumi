export interface IPdfReaderProvider {
  getContent(pdfFile: Buffer): Promise<string>;
}
