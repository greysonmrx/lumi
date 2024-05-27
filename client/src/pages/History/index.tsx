"use client";

import React from "react";

import { SHORT_MONTHS } from "@/constants";

import { Icon } from "@/components/Icon";
import { Button } from "@/components/Button";
import { Table } from "@/components/Table";
import { Toggle } from "@/components/Toggle";
import { Tooltip } from "@/components/Tooltip";
import { SearchField } from "@/components/SearchField";
import { PageHeader } from "@/components/PageHeader";
import { TableSkeleton } from "./skeletons/TableSkeleton";

import { useHistory } from "./useHistory";

export const History: React.FC = () => {
  const {
    loading,
    fileInputRef,
    selectedYear,
    customerList,
    listOfLastSixYears,
    handleSelectYear,
    handleUploadInvoices,
    handleChangeSearchText,
  } = useHistory();

  return (
    <>
      <PageHeader.Root>
        <div>
          <PageHeader.Title>Histórico de faturas</PageHeader.Title>
          <PageHeader.Subtitle>
            Aqui estão todas as faturas cadastradas
          </PageHeader.Subtitle>
        </div>
        <div>
          <input
            type="file"
            id="invoicesUpload"
            className="hidden"
            ref={fileInputRef}
            accept="application/pdf"
            multiple={true}
            onChange={handleUploadInvoices}
          />
          <Button role="button" onClick={() => fileInputRef.current?.click()}>
            <Icon name="upload" size={16} />
            Importar faturas
          </Button>
        </div>
      </PageHeader.Root>
      <div className="flex flex-col justify-between items-center mb-5 gap-3 md:flex-row">
        <Toggle.Root
          type="single"
          defaultValue={selectedYear}
          className="w-full md:w-fit"
        >
          {listOfLastSixYears.map((year) => (
            <Toggle.Item
              key={year}
              value={year}
              aria-label={year}
              onClick={() => handleSelectYear(year)}
            >
              {year}
            </Toggle.Item>
          ))}
        </Toggle.Root>
        <SearchField
          placeholder="Buscar por clientes"
          className="w-full md:w-fit"
          onChange={handleChangeSearchText}
        />
      </div>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Número do cliente</Table.Head>
            <Table.Head>Nome do cliente</Table.Head>
            {SHORT_MONTHS.map((month) => (
              <Table.Head key={`table-head-${month}`} className="text-center">
                {month}
              </Table.Head>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {!loading ? (
            customerList.map((customer) => (
              <Table.Row key={customer.id}>
                <Table.Cell className="font-medium">
                  {customer.number}
                </Table.Cell>
                <Table.Cell>{customer.name.toUpperCase()}</Table.Cell>
                {SHORT_MONTHS.map((month) => {
                  const invoiceExists = customer.invoices.find(
                    (invoice) => invoice.referenceMonth.split("/")[0] === month
                  );

                  return (
                    <Table.Cell
                      key={`table-body-${month}`}
                      className="text-center w-8"
                    >
                      {invoiceExists ? (
                        <Tooltip.Root delayDuration={0}>
                          <Tooltip.Trigger>
                            <a
                              target="_blank"
                              href={invoiceExists.pdf?.url}
                              rel="noopener noreferrer"
                            >
                              <button className="flex flex-1 border rounded-md items-center justify-center w-8 h-8 hover:bg-green-700/90 text-white bg-green-700">
                                <Icon name="invoice" size={16} />
                              </button>
                            </a>
                          </Tooltip.Trigger>
                          <Tooltip.Content side="bottom" sideOffset={10}>
                            <span>Abrir fatura</span>
                          </Tooltip.Content>
                        </Tooltip.Root>
                      ) : (
                        "-"
                      )}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))
          ) : (
            <>
              {[0, 0, 0].map((_, index) => (
                <Table.Row key={`skeleton-table-row-${index}`}>
                  <Table.Cell>
                    <TableSkeleton.Content className="px-14" />
                  </Table.Cell>
                  <Table.Cell>
                    <TableSkeleton.Content className="px-28" />
                  </Table.Cell>
                  {SHORT_MONTHS.map((month) => (
                    <Table.Cell
                      key={`skeleton-table-body-${month}`}
                      className="text-center w-8"
                    >
                      <TableSkeleton.Content className="w-8 h-8" />
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </>
          )}
        </Table.Body>
      </Table.Root>
    </>
  );
};
