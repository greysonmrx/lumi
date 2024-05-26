import {
  it,
  vi,
  describe,
  expect,
  afterEach,
  beforeEach,
  type MockInstance,
} from "vitest";

import { NotFoundError } from "@/shared/errors/NotFoundError";

import { FakeCustomersRepository } from "@/modules/customers/repositories/fakes/FakeCustomersRepository";
import { FakeFilesRepository } from "@/modules/files/repositories/fakes/FakeFilesRepository";

import { FakeFileManagerProvider } from "@/modules/files/providers/FileManagerProvider/implementations/FakeFileManagerProvider";

import { FakeInvoicesRepository } from "../repositories/fakes/FakeInvoicesRepository";
import { FakePdfReaderProvider } from "../providers/PdfReaderProvider/implementations/FakePdfReaderProvider";

import { ImportInvoicesService } from "./ImportInvoicesService";

describe("[SERVICES] - Import Invoices Service", () => {
  let fakeFilesRepository: FakeFilesRepository;
  let fakeInvoicesRepository: FakeInvoicesRepository;
  let fakeCustomersRepository: FakeCustomersRepository;
  let fakeFileManagerProvider: FakeFileManagerProvider;
  let fakePdfReaderProvider: FakePdfReaderProvider;

  let getCustomerNameSpy: MockInstance;
  let getCustomerNumberSpy: MockInstance;
  let getDueDateSpy: MockInstance;
  let getReferenceMonthSpy: MockInstance;
  let getTotalValueSpy: MockInstance;

  let importInvoices: ImportInvoicesService;

  const fileContent = "content" as any;
  const files = [
    { name: "invoice-1", size: 1000, content: fileContent },
    { name: "invoice-2", size: 2000, content: fileContent },
    { name: "invoice-3", size: 3000, content: fileContent },
  ];

  beforeEach(() => {
    fakeFilesRepository = new FakeFilesRepository();
    fakeInvoicesRepository = new FakeInvoicesRepository();
    fakeCustomersRepository = new FakeCustomersRepository();
    fakeFileManagerProvider = new FakeFileManagerProvider();
    fakePdfReaderProvider = new FakePdfReaderProvider();

    importInvoices = new ImportInvoicesService(
      fakeFilesRepository,
      fakeInvoicesRepository,
      fakeCustomersRepository,
      fakePdfReaderProvider,
      fakeFileManagerProvider
    );

    getCustomerNameSpy = vi.spyOn(importInvoices, "getCustomerName");
    getCustomerNumberSpy = vi.spyOn(importInvoices, "getCustomerNumber");
    getDueDateSpy = vi.spyOn(importInvoices, "getDueDate");
    getReferenceMonthSpy = vi.spyOn(importInvoices, "getReferenceMonth");
    getTotalValueSpy = vi.spyOn(importInvoices, "getTotalValue");
  });

  afterEach(() => {
    getCustomerNameSpy.mockClear();
    getCustomerNumberSpy.mockClear();
    getDueDateSpy.mockClear();
    getReferenceMonthSpy.mockClear();
    getTotalValueSpy.mockClear();
  });

  it("should be able to import invoices correctly", async () => {
    getCustomerNameSpy.mockReturnValue("Customer Name");
    getCustomerNumberSpy.mockReturnValue("123321");
    getDueDateSpy.mockReturnValue("2003-02-01");
    getReferenceMonthSpy.mockReturnValue("FEV/03");
    getTotalValueSpy.mockReturnValue(1000);

    const invoices = await importInvoices.perform({ files });

    expect(invoices).toHaveLength(3);

    invoices.forEach((invoice) => {
      expect(invoice).toMatchSnapshot({
        id: expect.any(String),
        createdAt: expect.any(Date),
        dueDate: expect.any(Date),
        pdfId: expect.any(String),
        customerId: expect.any(String),
        referenceMonth: expect.any(String),
        totalValue: expect.any(Number),
      });
    });
  });

  it("should not be able to import invoices if customer name is not found", async () => {
    getCustomerNumberSpy.mockReturnValue("123321");
    getDueDateSpy.mockReturnValue("2003-02-01");
    getReferenceMonthSpy.mockReturnValue("FEV/03");
    getTotalValueSpy.mockReturnValue(1000);

    await expect(importInvoices.perform({ files })).rejects.toThrow(
      NotFoundError
    );
  });

  it("should not be able to import invoices if customer number is not found", async () => {
    getCustomerNameSpy.mockReturnValue("Customer Name");
    getDueDateSpy.mockReturnValue("2003-02-01");
    getReferenceMonthSpy.mockReturnValue("FEV/03");
    getTotalValueSpy.mockReturnValue(1000);

    await expect(importInvoices.perform({ files })).rejects.toThrow(
      NotFoundError
    );
  });

  it("should not be able to import invoices if due date is not found", async () => {
    getCustomerNameSpy.mockReturnValue("Customer Name");
    getCustomerNumberSpy.mockReturnValue("123321");
    getReferenceMonthSpy.mockReturnValue("FEV/03");
    getTotalValueSpy.mockReturnValue(1000);

    await expect(importInvoices.perform({ files })).rejects.toThrow(
      NotFoundError
    );
  });

  it("should not be able to import invoices if reference month is not found", async () => {
    getCustomerNameSpy.mockReturnValue("Customer Name");
    getCustomerNumberSpy.mockReturnValue("123321");
    getDueDateSpy.mockReturnValue("2003-02-01");
    getTotalValueSpy.mockReturnValue(1000);

    await expect(importInvoices.perform({ files })).rejects.toThrow(
      NotFoundError
    );
  });

  it("should not be able to import invoices if total value is not found", async () => {
    getCustomerNameSpy.mockReturnValue("Customer Name");
    getCustomerNumberSpy.mockReturnValue("123321");
    getDueDateSpy.mockReturnValue("2003-02-01");
    getReferenceMonthSpy.mockReturnValue("FEV/03");

    await expect(importInvoices.perform({ files })).rejects.toThrow(
      NotFoundError
    );
  });
});
