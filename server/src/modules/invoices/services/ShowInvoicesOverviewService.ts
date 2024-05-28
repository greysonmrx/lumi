import { SHORT_MONTHS } from "@/config/constants";

import { IInvoicesRepository } from "../repositories/IInvoicesRepository";

type ShowInvoicesOverviewServiceRequest = {
  customerNumber: string;
};

type ShowInvoicesOverviewServiceResponse = {
  [month: string]: {
    generatedEnergyAmount: number;
    consumedEnergyAmount: number;
    compensatedEnergyAmount: number;
    distributedEnergyGenerationValue: number;
    totalWithoutDistributedEnergyGeneration: number;
    invoicesTotalValue: number;
    amountOfInvoices: number;
  };
};

export class ShowInvoicesOverviewService {
  constructor(private invoicesRepository: IInvoicesRepository) {}

  public async perform({
    customerNumber,
  }: ShowInvoicesOverviewServiceRequest): Promise<ShowInvoicesOverviewServiceResponse> {
    const dataByMonth: ShowInvoicesOverviewServiceResponse = {};

    const invoicesTotalValueData =
      await this.invoicesRepository.getInvoiceTotalValueByCustomerNumberGroupedByReferenceMonth(
        { customerNumber }
      );

    const amountOfInvoicesData =
      await this.invoicesRepository.getAmountOfInvoicesByCustomerNumberGroupedByReferenceMonth(
        { customerNumber }
      );

    const electricityAmountData =
      await this.invoicesRepository.getInvoiceItemAmountByCustomerNumberGroupedByReferenceMonth(
        {
          invoiceItemName: "Energia Elétrica",
          customerNumber,
        }
      );

    const electricityValueData =
      await this.invoicesRepository.getInvoiceItemValueByCustomerNumberGroupedByReferenceMonth(
        {
          invoiceItemName: "Energia Elétrica",
          customerNumber,
        }
      );

    const publicLightingContributionValueData =
      await this.invoicesRepository.getInvoiceItemValueByCustomerNumberGroupedByReferenceMonth(
        {
          invoiceItemName: "Contrib Ilum Publica Municipal",
          customerNumber,
        }
      );

    const injectedEnergyAmountData =
      await this.invoicesRepository.getInvoiceItemAmountByCustomerNumberGroupedByReferenceMonth(
        {
          invoiceItemName: "Energia SCEEE s/ICMS",
          customerNumber,
        }
      );

    const injectedEnergyValueData =
      await this.invoicesRepository.getInvoiceItemValueByCustomerNumberGroupedByReferenceMonth(
        {
          invoiceItemName: "Energia SCEEE s/ICMS",
          customerNumber,
        }
      );

    const compensatedEnergyAmountData =
      await this.invoicesRepository.getInvoiceItemAmountByCustomerNumberGroupedByReferenceMonth(
        {
          invoiceItemName: "Energia Compensada GD I",
          customerNumber,
        }
      );

    const compensatedEnergyValueData =
      await this.invoicesRepository.getInvoiceItemValueByCustomerNumberGroupedByReferenceMonth(
        {
          invoiceItemName: "Energia Compensada GD I",
          customerNumber,
        }
      );

    SHORT_MONTHS.forEach((currentMonth) => {
      const electricityAmountForTheGivenMonth = electricityAmountData.find(
        (electricityAmount) => electricityAmount.referenceMonth === currentMonth
      );

      if (electricityAmountForTheGivenMonth) {
        Object.assign(dataByMonth, {
          [currentMonth]: {
            ...dataByMonth[currentMonth],
            consumedEnergyAmount:
              (dataByMonth[currentMonth]?.consumedEnergyAmount ?? 0) +
              Number(electricityAmountForTheGivenMonth.amountOrValue),
          },
        });
      }

      const electricityValueForTheGivenMonth = electricityValueData.find(
        (electricityValue) => electricityValue.referenceMonth === currentMonth
      );

      if (electricityValueForTheGivenMonth) {
        Object.assign(dataByMonth, {
          [currentMonth]: {
            ...dataByMonth[currentMonth],
            totalWithoutDistributedEnergyGeneration:
              (dataByMonth[currentMonth]
                ?.totalWithoutDistributedEnergyGeneration ?? 0) +
              Number(electricityValueForTheGivenMonth.amountOrValue),
          },
        });
      }

      const publicLightingContributionValueForTheGivenMonth =
        publicLightingContributionValueData.find(
          (publicLightingContributionValue) =>
            publicLightingContributionValue.referenceMonth === currentMonth
        );

      if (publicLightingContributionValueForTheGivenMonth) {
        Object.assign(dataByMonth, {
          [currentMonth]: {
            ...dataByMonth[currentMonth],
            totalWithoutDistributedEnergyGeneration:
              (dataByMonth[currentMonth]
                ?.totalWithoutDistributedEnergyGeneration ?? 0) +
              Number(
                publicLightingContributionValueForTheGivenMonth.amountOrValue
              ),
          },
        });
      }

      const injectedEnergyAmountForTheGivenMonth =
        injectedEnergyAmountData.find(
          (injectedEnergyAmount) =>
            injectedEnergyAmount.referenceMonth === currentMonth
        );

      if (injectedEnergyAmountForTheGivenMonth) {
        Object.assign(dataByMonth, {
          [currentMonth]: {
            ...dataByMonth[currentMonth],
            consumedEnergyAmount:
              (dataByMonth[currentMonth]?.consumedEnergyAmount ?? 0) +
              Number(injectedEnergyAmountForTheGivenMonth.amountOrValue),
            generatedEnergyAmount: Number(
              injectedEnergyAmountForTheGivenMonth.amountOrValue
            ),
          },
        });
      }

      const injectedEnergyValueForTheGivenMonth = injectedEnergyValueData.find(
        (injectedEnergyValue) =>
          injectedEnergyValue.referenceMonth === currentMonth
      );

      if (injectedEnergyValueForTheGivenMonth) {
        Object.assign(dataByMonth, {
          [currentMonth]: {
            ...dataByMonth[currentMonth],
            totalWithoutDistributedEnergyGeneration:
              (dataByMonth[currentMonth]
                ?.totalWithoutDistributedEnergyGeneration ?? 0) +
              Number(injectedEnergyValueForTheGivenMonth.amountOrValue),
          },
        });
      }

      const compensatedEnergyAmountForTheGivenMonth =
        compensatedEnergyAmountData.find(
          (compensatedEnergyAmount) =>
            compensatedEnergyAmount.referenceMonth === currentMonth
        );

      if (compensatedEnergyAmountForTheGivenMonth) {
        Object.assign(dataByMonth, {
          [currentMonth]: {
            ...dataByMonth[currentMonth],
            compensatedEnergyAmount: Number(
              compensatedEnergyAmountForTheGivenMonth.amountOrValue
            ),
          },
        });
      }

      const compensatedEnergyValueForTheGivenMonth =
        compensatedEnergyValueData.find(
          (compensatedEnergyValue) =>
            compensatedEnergyValue.referenceMonth === currentMonth
        );

      if (compensatedEnergyValueForTheGivenMonth) {
        Object.assign(dataByMonth, {
          [currentMonth]: {
            ...dataByMonth[currentMonth],
            distributedEnergyGenerationValue:
              (dataByMonth[currentMonth]?.distributedEnergyGenerationValue ??
                0) +
              Number(compensatedEnergyValueForTheGivenMonth.amountOrValue),
          },
        });
      }

      const amountOfInvoicesForTheGivenMonth = amountOfInvoicesData.find(
        (amountOfInvoices) => amountOfInvoices.referenceMonth === currentMonth
      );

      if (amountOfInvoicesForTheGivenMonth) {
        Object.assign(dataByMonth, {
          [currentMonth]: {
            ...dataByMonth[currentMonth],
            amountOfInvoices: Number(
              amountOfInvoicesForTheGivenMonth.amountOrValue
            ),
          },
        });
      }

      const invoicesTotalValueForTheGivenMonth = invoicesTotalValueData.find(
        (invoicesTotalValue) =>
          invoicesTotalValue.referenceMonth === currentMonth
      );

      if (invoicesTotalValueForTheGivenMonth) {
        Object.assign(dataByMonth, {
          [currentMonth]: {
            ...dataByMonth[currentMonth],
            invoicesTotalValue: Number(
              invoicesTotalValueForTheGivenMonth.amountOrValue
            ),
          },
        });
      }
    });

    return dataByMonth;
  }
}
