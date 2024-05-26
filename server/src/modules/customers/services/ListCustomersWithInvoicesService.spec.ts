import {
  describe,
  it,
  beforeEach,
  expect,
  vi,
  type MockInstance,
} from "vitest";

import { FakeCustomersRepository } from "../repositories/fakes/FakeCustomersRepository";

import { ListCustomersWithInvoicesService } from "./ListCustomersWithInvoicesService";

const customer = {
  name: "Customer One",
  number: "123456",
  invoices: [
    {
      dueDate: new Date("2003-2-1"),
      referenceMonth: "FEV/2003",
      totalValue: 1000,
      pdf: {
        name: "invoice-1.pdf",
        path: "/path/to/invoice-1.pdf",
      },
    },
    {
      dueDate: new Date("2003-3-1"),
      referenceMonth: "MAR/2003",
      totalValue: 1500,
      pdf: {
        name: "invoice-2.pdf",
        path: "/path/to/invoice-2.pdf",
      },
    },
  ],
};

describe("[SERVICES] - List Customers With Invoices Service", () => {
  let customersRepository: FakeCustomersRepository;

  let listCustomersWithInvoices: ListCustomersWithInvoicesService;

  let findAllWithInvoicesSpy: MockInstance;

  beforeEach(() => {
    customersRepository = new FakeCustomersRepository();

    listCustomersWithInvoices = new ListCustomersWithInvoicesService(
      customersRepository
    );

    findAllWithInvoicesSpy = vi.spyOn(
      customersRepository,
      "findAllWithInvoices"
    );
  });

  it("should be able to list customers with invoices for the given year", async () => {
    await customersRepository.create(customer);

    const customersWithInvoices = await listCustomersWithInvoices.perform({
      year: "2003",
    });

    expect(customersWithInvoices).toHaveLength(1);
    expect(findAllWithInvoicesSpy).toHaveBeenCalledWith({
      year: "2003",
    });
    customersWithInvoices.forEach((customerWithInvoices) => {
      expect(customerWithInvoices).toMatchSnapshot({
        id: expect.any(String),
        name: expect.any(String),
        number: expect.any(String),
      });
    });

    const [invoices] = customersWithInvoices.map((customerWithInvoices) => [
      ...customerWithInvoices.invoices,
    ]);

    invoices.forEach((invoice) => {
      expect(invoice).toMatchSnapshot({
        id: expect.any(String),
        referenceMonth: expect.any(String),
        pdf: {
          url: expect.any(String),
        },
      });
    });
  });

  it("should be able to list customers with invoices for the given year and customer name", async () => {
    await customersRepository.create(customer);

    const customersWithInvoices = await listCustomersWithInvoices.perform({
      year: "2003",
      customer: "Customer One",
    });

    expect(customersWithInvoices).toHaveLength(1);
    expect(findAllWithInvoicesSpy).toHaveBeenCalledWith({
      year: "2003",
      customer: "Customer One",
    });
    customersWithInvoices.forEach((customerWithInvoices) => {
      expect(customerWithInvoices).toMatchSnapshot({
        id: expect.any(String),
        name: expect.any(String),
        number: expect.any(String),
      });
    });

    const [invoices] = customersWithInvoices.map((customerWithInvoices) => [
      ...customerWithInvoices.invoices,
    ]);

    invoices.forEach((invoice) => {
      expect(invoice).toMatchSnapshot({
        id: expect.any(String),
        referenceMonth: expect.any(String),
        pdf: {
          url: expect.any(String),
        },
      });
    });
  });

  it("should be able to list customers with invoices for the given year and customer number", async () => {
    await customersRepository.create(customer);

    const customersWithInvoices = await listCustomersWithInvoices.perform({
      year: "2003",
      customer: "123456",
    });

    expect(customersWithInvoices).toHaveLength(1);
    expect(findAllWithInvoicesSpy).toHaveBeenCalledWith({
      year: "2003",
      customer: "123456",
    });
    customersWithInvoices.forEach((customerWithInvoices) => {
      expect(customerWithInvoices).toMatchSnapshot({
        id: expect.any(String),
        name: expect.any(String),
        number: expect.any(String),
      });
    });

    const [invoices] = customersWithInvoices.map((customerWithInvoices) => [
      ...customerWithInvoices.invoices,
    ]);

    invoices.forEach((invoice) => {
      expect(invoice).toMatchSnapshot({
        id: expect.any(String),
        referenceMonth: expect.any(String),
        pdf: {
          url: expect.any(String),
        },
      });
    });
  });

  it("should be able to list customers with invoices when no customers exist", async () => {
    const customersWithInvoices = await listCustomersWithInvoices.perform({
      year: "2003",
    });

    expect(customersWithInvoices).toHaveLength(0);
    expect(customersWithInvoices).toEqual([]);
    expect(findAllWithInvoicesSpy).toHaveBeenCalledWith({ year: "2003" });
  });
});
