import React from "react";

import { InvoicesService } from "@/services/InvoicesService";

import { SHORT_MONTHS } from "@/constants";

import { debounce } from "@/utils/debounce";

interface UseDashboardData {
  isLoading: boolean;
  lastUpdateDate: string;
  kWhChartData: [string, number, number][];
  moneyChartData: number[];
  analytics?: {
    generatedEnergy: {
      value: number;
      lastMonthComparison: number;
    };
    consumedEnergy: {
      value: number;
      lastMonthComparison: number;
    };
    compensatedEnergy: {
      value: number;
      lastMonthComparison: number;
    };
    invoicesTotalValue: {
      value: number;
      lastMonthComparison: number;
    };
    amountOfInvoices: {
      value: number;
      lastMonthComparison: number;
    };
  };
  handleChangeSearchText: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useDashboard(): UseDashboardData {
  const lastUpdateDate = React.useMemo(() => new Date(), []);

  const [isLoading, setIsLoading] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [analytics, setAnalytics] =
    React.useState<UseDashboardData["analytics"]>();
  const [kWhChartData, setKWhChartData] = React.useState<
    UseDashboardData["kWhChartData"]
  >([]);
  const [moneyChartData, setMoneyChartData] = React.useState<
    UseDashboardData["moneyChartData"]
  >([]);

  const handleChangeSearchText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    []
  );

  const handleFetchInvoicesDataByMonth = React.useCallback(
    async (customerNumber: string) => {
      setIsLoading(true);

      try {
        const invoicesOverview = await InvoicesService.showInvoicesOverview({
          customerNumber,
        });

        setKWhChartData(
          SHORT_MONTHS.map((month) => [
            month,
            (invoicesOverview[month]?.generatedEnergyAmount ?? 0) +
              (invoicesOverview[month]?.consumedEnergyAmount ?? 0),
            invoicesOverview[month]?.compensatedEnergyAmount ?? 0,
          ])
        );
        setMoneyChartData([
          Object.values(invoicesOverview).reduce((acc, month) => {
            return (
              acc +
              Math.round(
                Number(month?.totalWithoutDistributedEnergyGeneration ?? 0)
              )
            );
          }, 0),
          Object.values(invoicesOverview).reduce((acc, month) => {
            return (
              acc +
              Math.round(Number(month?.distributedEnergyGenerationValue ?? 0))
            );
          }, 0),
        ]);

        const currentMonthIndex = lastUpdateDate.getMonth();
        const currentMonth = SHORT_MONTHS[currentMonthIndex];
        const lastMonth =
          SHORT_MONTHS[currentMonthIndex === 0 ? 11 : currentMonthIndex - 1];

        const currentMonthInvoiceData = invoicesOverview[currentMonth];
        const lastMonthInvoiceData = invoicesOverview[lastMonth];

        setAnalytics({
          amountOfInvoices: {
            value: currentMonthInvoiceData?.amountOfInvoices ?? 0,
            lastMonthComparison: parseInt(
              String(
                (((currentMonthInvoiceData?.amountOfInvoices ?? 0) -
                  (lastMonthInvoiceData?.amountOfInvoices ?? 0)) /
                  (currentMonthInvoiceData?.amountOfInvoices ?? 1)) *
                  100
              ),
              10
            ),
          },
          consumedEnergy: {
            value: currentMonthInvoiceData?.consumedEnergyAmount ?? 0,
            lastMonthComparison: parseInt(
              String(
                (((currentMonthInvoiceData?.consumedEnergyAmount ?? 0) -
                  (lastMonthInvoiceData?.consumedEnergyAmount ?? 0)) /
                  (currentMonthInvoiceData?.consumedEnergyAmount ?? 1)) *
                  100
              ),
              10
            ),
          },
          compensatedEnergy: {
            value: currentMonthInvoiceData?.compensatedEnergyAmount ?? 0,
            lastMonthComparison: parseInt(
              String(
                (((currentMonthInvoiceData?.compensatedEnergyAmount ?? 0) -
                  (lastMonthInvoiceData?.compensatedEnergyAmount ?? 0)) /
                  (currentMonthInvoiceData?.compensatedEnergyAmount ?? 1)) *
                  100
              ),
              10
            ),
          },
          generatedEnergy: {
            value: currentMonthInvoiceData?.generatedEnergyAmount ?? 0,
            lastMonthComparison: parseInt(
              String(
                (((currentMonthInvoiceData?.generatedEnergyAmount ?? 0) -
                  (lastMonthInvoiceData?.generatedEnergyAmount ?? 0)) /
                  (currentMonthInvoiceData?.generatedEnergyAmount ?? 1)) *
                  100
              ),
              10
            ),
          },
          invoicesTotalValue: {
            value: currentMonthInvoiceData?.invoicesTotalValue ?? 0,
            lastMonthComparison: parseInt(
              String(
                (((currentMonthInvoiceData?.invoicesTotalValue ?? 0) -
                  (lastMonthInvoiceData?.invoicesTotalValue ?? 0)) /
                  (currentMonthInvoiceData?.invoicesTotalValue ?? 1)) *
                  100
              ),
              10
            ),
          },
        });
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false);
      }
    },
    [lastUpdateDate]
  );

  React.useEffect(() => {
    handleFetchInvoicesDataByMonth(searchText);
  }, [searchText, handleFetchInvoicesDataByMonth]);

  return {
    isLoading,
    kWhChartData,
    moneyChartData,
    analytics,
    lastUpdateDate: lastUpdateDate.toLocaleDateString("en-GB"),
    handleChangeSearchText: debounce(handleChangeSearchText, 500),
  };
}
