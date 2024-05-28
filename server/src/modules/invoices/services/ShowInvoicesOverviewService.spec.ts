import { randomUUID } from "node:crypto";
import { describe, it, expect, beforeEach } from "vitest";

import { ICreateInvoiceDTO } from "../dtos/ICreateInvoiceDTO";

import { FakeInvoicesRepository } from "../repositories/fakes/FakeInvoicesRepository";

import { ShowInvoicesOverviewService } from "./ShowInvoicesOverviewService";

describe("[SERVICES] - Show Invoices Overview Service", () => {
  let fakeInvoicesRepository: FakeInvoicesRepository;

  let showInvoicesOverview: ShowInvoicesOverviewService;

  const customerId = randomUUID();

  const invoicesMock: ICreateInvoiceDTO[] = [
    {
      customerId,
      dueDate: new Date(),
      pdfId: randomUUID(),
      referenceMonth: "SET/2023",
      totalValue: 106.59,
      items: [
        {
          name: "Contrib Ilum Publica Municipal",
          totalValue: 49.43,
        },
        {
          name: "Energia Elétrica",
          totalValue: 47.78,
          amount: 50,
          unitPrice: 0.95603119,
        },
        {
          name: "Energia SCEE s/ ICMS",
          totalValue: 211.13,
          unitPrice: 0.51002616,
          amount: 414,
        },
        {
          name: "Energia compensada GD I",
          totalValue: -201.75,
          amount: 414,
          unitPrice: 0.48733,
        },
      ],
    },
    {
      customerId,
      dueDate: new Date(),
      pdfId: randomUUID(),
      referenceMonth: "OUT/2023",
      totalValue: 109.18,
      items: [
        {
          name: "Contrib Ilum Publica Municipal",
          totalValue: 49.43,
        },
        {
          name: "Energia Elétrica",
          totalValue: 47.61,
          amount: 50,
          unitPrice: 0.95254203,
        },
        {
          name: "Energia SCEE s/ ICMS",
          totalValue: 296.25,
          unitPrice: 0.50816475,
          amount: 583,
        },
        {
          name: "Energia compensada GD I",
          totalValue: -284.11,
          amount: 583,
          unitPrice: 0.48733,
        },
      ],
    },
  ];

  beforeEach(() => {
    fakeInvoicesRepository = new FakeInvoicesRepository();

    showInvoicesOverview = new ShowInvoicesOverviewService(
      fakeInvoicesRepository
    );
  });

  it("should be able to show the invoices overview", async () => {
    await Promise.all(
      invoicesMock.map(
        async (invoice) => await fakeInvoicesRepository.create(invoice)
      )
    );

    const invoicesOverview = await showInvoicesOverview.perform({
      customerNumber: "",
    });

    expect(invoicesOverview["SET"]).toEqual({
      consumedEnergyAmount: 50,
      totalWithoutDistributedEnergyGeneration: 97.21000000000001,
      generatedEnergyAmount: 0,
      compensatedEnergyAmount: 0,
      distributedEnergyGenerationValue: 0,
      amountOfInvoices: 1,
      invoicesTotalValue: 106.59,
    });
    expect(invoicesOverview["OUT"]).toEqual({
      consumedEnergyAmount: 50,
      totalWithoutDistributedEnergyGeneration: 97.03999999999999,
      generatedEnergyAmount: 0,
      compensatedEnergyAmount: 0,
      distributedEnergyGenerationValue: 0,
      amountOfInvoices: 1,
      invoicesTotalValue: 109.18,
    });
  });

  it("should be able to show the invoices overview for the given customer number", async () => {
    await Promise.all(
      invoicesMock.map(
        async (invoice) => await fakeInvoicesRepository.create(invoice)
      )
    );

    const invoicesOverview = await showInvoicesOverview.perform({
      customerNumber: customerId,
    });

    expect(invoicesOverview["SET"]).toEqual({
      consumedEnergyAmount: 50,
      totalWithoutDistributedEnergyGeneration: 97.21000000000001,
      generatedEnergyAmount: 0,
      compensatedEnergyAmount: 0,
      distributedEnergyGenerationValue: 0,
      amountOfInvoices: 1,
      invoicesTotalValue: 106.59,
    });
    expect(invoicesOverview["OUT"]).toEqual({
      consumedEnergyAmount: 50,
      totalWithoutDistributedEnergyGeneration: 97.03999999999999,
      generatedEnergyAmount: 0,
      compensatedEnergyAmount: 0,
      distributedEnergyGenerationValue: 0,
      amountOfInvoices: 1,
      invoicesTotalValue: 109.18,
    });
  });

  it("should be able to show the invoices overview when no invoices exist", async () => {
    const invoicesOverview = await showInvoicesOverview.perform({
      customerNumber: "",
    });

    expect(invoicesOverview).toEqual({});
  });
});
