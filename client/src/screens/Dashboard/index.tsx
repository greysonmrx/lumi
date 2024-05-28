"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { Icon } from "@/components/Icon";
import { KWhChart } from "./components/KWhChart";
import { MoneyChart } from "./components/MoneyChart";
import { PageHeader } from "@/components/PageHeader";
import { SearchField } from "@/components/SearchField";
import { AnalyticsCard } from "./components/AnalyticsCard";
import { AnalyticsCardSkeleton } from "./skeletons/AnalyticsCardSkeleton";

import { formatMoney } from "@/utils/formatMoney";
import { numberWithDots } from "@/utils/numberWithDots";

import { useDashboard } from "./useDashboard";

export const Dashboard: React.FC = () => {
  const searchParams = useSearchParams();

  const {
    isLoading,
    analytics,
    kWhChartData,
    moneyChartData,
    lastUpdateDate,
    handleChangeSearchText,
  } = useDashboard();

  return (
    <>
      <PageHeader.Root>
        <div>
          <PageHeader.Title>Painel de controle</PageHeader.Title>
          <PageHeader.Subtitle>
            Aqui está um resumo dos dados
          </PageHeader.Subtitle>
        </div>
        <p className="text-sm text-gray-500">
          Última atualização:{" "}
          <strong className="text-green-950">{lastUpdateDate}</strong>
        </p>
      </PageHeader.Root>
      <div className="flex items-center w-full pb-10 gap-10">
        <hr className="hidden md:block flex-1 border-t-1 border-slate-300 border-t-solid" />
        <SearchField
          placeholder="Nº do cliente"
          className="w-full md:w-[300px]"
          disabled={isLoading}
          defaultValue={searchParams.get("customerNumber") ?? ""}
          onChange={handleChangeSearchText}
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-4 lg:grid-rows-3 md:grid-cols-2 grid-cols-1 md:grid-rows-8">
        {!isLoading && analytics ? (
          <>
            <AnalyticsCard.Root className="lg:col-span-1 lg:row-span-1 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 col-start-1 col-end-2 row-start-1 row-end-2">
              <AnalyticsCard.Header>
                <AnalyticsCard.Icon>
                  <Icon name="lightning" size={18} />
                </AnalyticsCard.Icon>
                <AnalyticsCard.Title>Energia gerada</AnalyticsCard.Title>
              </AnalyticsCard.Header>
              <AnalyticsCard.Content>
                <AnalyticsCard.Value>
                  {numberWithDots(analytics.generatedEnergy.value)}
                  <AnalyticsCard.ValueIndicator>
                    kWh
                  </AnalyticsCard.ValueIndicator>
                </AnalyticsCard.Value>
              </AnalyticsCard.Content>
              <AnalyticsCard.Footer>
                <AnalyticsCard.ComparisonValue
                  growing={analytics.generatedEnergy.lastMonthComparison >= 0}
                >
                  <Icon
                    name={
                      analytics.generatedEnergy.lastMonthComparison >= 0
                        ? "trend-up"
                        : "trend-down"
                    }
                    size={18}
                  />
                  {analytics.generatedEnergy.lastMonthComparison}%
                </AnalyticsCard.ComparisonValue>
                <AnalyticsCard.ComparisonText>
                  desde o último mês
                </AnalyticsCard.ComparisonText>
              </AnalyticsCard.Footer>
            </AnalyticsCard.Root>
            <AnalyticsCard.Root className="lg:col-span-1 lg:row-span-1 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 col-start-1 col-end-2 row-start-2 row-end-3">
              <AnalyticsCard.Header>
                <AnalyticsCard.Icon>
                  <Icon name="plug" size={18} />
                </AnalyticsCard.Icon>
                <AnalyticsCard.Title>Energia consumida</AnalyticsCard.Title>
              </AnalyticsCard.Header>
              <AnalyticsCard.Content>
                <AnalyticsCard.Value>
                  {numberWithDots(analytics.consumedEnergy.value)}
                  <AnalyticsCard.ValueIndicator>
                    kWh
                  </AnalyticsCard.ValueIndicator>
                </AnalyticsCard.Value>
              </AnalyticsCard.Content>
              <AnalyticsCard.Footer>
                <AnalyticsCard.ComparisonValue
                  growing={analytics.consumedEnergy.lastMonthComparison >= 0}
                >
                  <Icon
                    name={
                      analytics.consumedEnergy.lastMonthComparison >= 0
                        ? "trend-up"
                        : "trend-down"
                    }
                    size={18}
                  />
                  {analytics.consumedEnergy.lastMonthComparison}%
                </AnalyticsCard.ComparisonValue>
                <AnalyticsCard.ComparisonText>
                  desde o último mês
                </AnalyticsCard.ComparisonText>
              </AnalyticsCard.Footer>
            </AnalyticsCard.Root>
            <AnalyticsCard.Root className="lg:col-span-1 lg:row-span-1 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 col-start-1 col-end-2 row-start-3 row-end-4">
              <AnalyticsCard.Header>
                <AnalyticsCard.Icon>
                  <Icon name="leaf" size={18} />
                </AnalyticsCard.Icon>
                <AnalyticsCard.Title>Energia compensada</AnalyticsCard.Title>
              </AnalyticsCard.Header>
              <AnalyticsCard.Content>
                <AnalyticsCard.Value>
                  {numberWithDots(analytics.compensatedEnergy.value)}
                  <AnalyticsCard.ValueIndicator>
                    kWh
                  </AnalyticsCard.ValueIndicator>
                </AnalyticsCard.Value>
              </AnalyticsCard.Content>
              <AnalyticsCard.Footer>
                <AnalyticsCard.ComparisonValue
                  growing={analytics.compensatedEnergy.lastMonthComparison >= 0}
                >
                  <Icon
                    name={
                      analytics.compensatedEnergy.lastMonthComparison >= 0
                        ? "trend-up"
                        : "trend-down"
                    }
                    size={18}
                  />
                  {analytics.compensatedEnergy.lastMonthComparison}%
                </AnalyticsCard.ComparisonValue>
                <AnalyticsCard.ComparisonText>
                  desde o último mês
                </AnalyticsCard.ComparisonText>
              </AnalyticsCard.Footer>
            </AnalyticsCard.Root>
            <AnalyticsCard.Root className="lg:col-span-1 lg:row-span-1 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 col-start-1 col-end-2 row-start-4 row-end-5">
              <AnalyticsCard.Header>
                <AnalyticsCard.Icon>
                  <Icon name="wallet" size={18} />
                </AnalyticsCard.Icon>
                <AnalyticsCard.Title>Total das faturas</AnalyticsCard.Title>
              </AnalyticsCard.Header>
              <AnalyticsCard.Content>
                <AnalyticsCard.Value>
                  {formatMoney(analytics.invoicesTotalValue.value)}
                </AnalyticsCard.Value>
              </AnalyticsCard.Content>
              <AnalyticsCard.Footer>
                <AnalyticsCard.ComparisonValue
                  growing={
                    analytics.invoicesTotalValue.lastMonthComparison >= 0
                  }
                >
                  <Icon
                    name={
                      analytics.invoicesTotalValue.lastMonthComparison >= 0
                        ? "trend-up"
                        : "trend-down"
                    }
                    size={18}
                  />
                  {analytics.invoicesTotalValue.lastMonthComparison}%
                </AnalyticsCard.ComparisonValue>
                <AnalyticsCard.ComparisonText>
                  desde o último mês
                </AnalyticsCard.ComparisonText>
              </AnalyticsCard.Footer>
            </AnalyticsCard.Root>
            <AnalyticsCard.Root className="justify-end lg:col-start-1 lg:col-end-4 lg:row-span-2 md:col-start-1 md:col-end-3 md:row-start-5 md:row-end-7 col-start-1 col-end-2 row-start-7 row-end-9">
              <AnalyticsCard.Header className="absolute top-0 bg-white z-10 w-full md:w-fit">
                <AnalyticsCard.Icon>
                  <Icon name="scales" size={18} />
                </AnalyticsCard.Icon>
                <AnalyticsCard.Title>Balanço energético</AnalyticsCard.Title>
              </AnalyticsCard.Header>
              <KWhChart data={kWhChartData} />
            </AnalyticsCard.Root>
            <AnalyticsCard.Root className="justify-end lg:col-span-1 lg:row-span-2 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5 col-start-1 col-end-2 row-start-5 row-end-7">
              <AnalyticsCard.Header className="absolute top-0 bg-white z-10 w-full md:w-fit">
                <AnalyticsCard.Icon>
                  <Icon name="currency-dollar" size={18} />
                </AnalyticsCard.Icon>
                <AnalyticsCard.Title>Financeiro</AnalyticsCard.Title>
              </AnalyticsCard.Header>
              <MoneyChart data={moneyChartData} />
            </AnalyticsCard.Root>
          </>
        ) : (
          <>
            <AnalyticsCardSkeleton.Root className="lg:col-span-1 lg:row-span-1 md:col-start-1 md:col-end-2 md:row-start-1 md:row-end-2 col-start-1 col-end-2 row-start-1 row-end-2">
              <AnalyticsCardSkeleton.Header>
                <AnalyticsCardSkeleton.Icon />
                <AnalyticsCardSkeleton.Title />
              </AnalyticsCardSkeleton.Header>
              <AnalyticsCardSkeleton.Content>
                <AnalyticsCardSkeleton.Value />
              </AnalyticsCardSkeleton.Content>
              <AnalyticsCardSkeleton.Footer>
                <AnalyticsCardSkeleton.ComparisonValue />
              </AnalyticsCardSkeleton.Footer>
            </AnalyticsCardSkeleton.Root>
            <AnalyticsCardSkeleton.Root className="lg:col-span-1 lg:row-span-1 md:col-start-2 md:col-end-3 md:row-start-1 md:row-end-2 col-start-1 col-end-2 row-start-2 row-end-3">
              <AnalyticsCardSkeleton.Header>
                <AnalyticsCardSkeleton.Icon />
                <AnalyticsCardSkeleton.Title />
              </AnalyticsCardSkeleton.Header>
              <AnalyticsCardSkeleton.Content>
                <AnalyticsCardSkeleton.Value />
              </AnalyticsCardSkeleton.Content>
              <AnalyticsCardSkeleton.Footer>
                <AnalyticsCardSkeleton.ComparisonValue />
              </AnalyticsCardSkeleton.Footer>
            </AnalyticsCardSkeleton.Root>
            <AnalyticsCardSkeleton.Root className="lg:col-span-1 lg:row-span-1 md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3 col-start-1 col-end-2 row-start-3 row-end-4">
              <AnalyticsCardSkeleton.Header>
                <AnalyticsCardSkeleton.Icon />
                <AnalyticsCardSkeleton.Title />
              </AnalyticsCardSkeleton.Header>
              <AnalyticsCardSkeleton.Content>
                <AnalyticsCardSkeleton.Value />
              </AnalyticsCardSkeleton.Content>
              <AnalyticsCardSkeleton.Footer>
                <AnalyticsCardSkeleton.ComparisonValue />
              </AnalyticsCardSkeleton.Footer>
            </AnalyticsCardSkeleton.Root>
            <AnalyticsCardSkeleton.Root className="lg:col-span-1 lg:row-span-1 md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 col-start-1 col-end-2 row-start-4 row-end-5">
              <AnalyticsCardSkeleton.Header>
                <AnalyticsCardSkeleton.Icon />
                <AnalyticsCardSkeleton.Title />
              </AnalyticsCardSkeleton.Header>
              <AnalyticsCardSkeleton.Content>
                <AnalyticsCardSkeleton.Value />
              </AnalyticsCardSkeleton.Content>
              <AnalyticsCardSkeleton.Footer>
                <AnalyticsCardSkeleton.ComparisonValue />
              </AnalyticsCardSkeleton.Footer>
            </AnalyticsCardSkeleton.Root>
            <AnalyticsCardSkeleton.Root className="lg:col-span-3 lg:row-span-2 md:col-start-1 md:col-end-3 md:row-start-5 md:row-end-7 col-start-1 col-end-2 row-start-7 row-end-9">
              <AnalyticsCardSkeleton.Header>
                <AnalyticsCardSkeleton.Icon />
                <AnalyticsCardSkeleton.Title />
              </AnalyticsCardSkeleton.Header>
            </AnalyticsCardSkeleton.Root>
            <AnalyticsCardSkeleton.Root className="lg:col-span-1 lg:row-span-2 md:col-start-1 md:col-end-3 md:row-start-3 md:row-end-5 col-start-1 col-end-2 row-start-5 row-end-7">
              <AnalyticsCardSkeleton.Header>
                <AnalyticsCardSkeleton.Icon />
                <AnalyticsCardSkeleton.Title />
              </AnalyticsCardSkeleton.Header>
            </AnalyticsCardSkeleton.Root>
          </>
        )}
      </div>
    </>
  );
};
