import React from "react";

import {
  CustomersService,
  type ListCustomersWithInvoicesResponse,
} from "@/services/CustomersService";
import { InvoicesService } from "@/services/InvoicesService";

import { debounce } from "@/utils/debounce";

interface UseHistoryData {
  loading: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  selectedYear: string;
  customerList: ListCustomersWithInvoicesResponse;
  listOfLastSixYears: string[];
  handleSelectYear: (year: string) => void;
  handleUploadInvoices: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleChangeSearchText: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function useHistory(): UseHistoryData {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const listOfLastSixYears = React.useMemo(() => {
    const currentYear = new Date().getFullYear();

    const years = [];

    for (let year = currentYear; years.length < 6; year--) {
      years.push(String(year));
    }

    return years.reverse();
  }, []);

  const [selectedYear, setSelectedYear] = React.useState(
    listOfLastSixYears[listOfLastSixYears.length - 1]
  );
  const [loading, setLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState("");
  const [customerList, setCustomerList] =
    React.useState<ListCustomersWithInvoicesResponse>([]);

  const handleSelectYear = React.useCallback((year: string) => {
    setSelectedYear(year);
  }, []);

  const handleChangeSearchText = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value);
    },
    []
  );

  const handleFetchCustomerList = React.useCallback(
    async (year: string, customer?: string) => {
      setLoading(true);

      try {
        const customersWithInvoices =
          await CustomersService.listCustomersWithInvoices({ year, customer });

        setCustomerList(customersWithInvoices);
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleUploadInvoices = React.useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) {
        return;
      }

      try {
        const files = event.target.files;

        await InvoicesService.importInvoices({ files });

        await handleFetchCustomerList(selectedYear, searchText);
      } catch (error) {
        alert(error);
      }
    },
    [selectedYear, searchText, handleFetchCustomerList]
  );

  React.useEffect(() => {
    handleFetchCustomerList(selectedYear, searchText);
  }, [selectedYear, searchText, handleFetchCustomerList]);

  return {
    loading,
    fileInputRef,
    selectedYear,
    customerList,
    listOfLastSixYears,
    handleSelectYear,
    handleUploadInvoices,
    handleChangeSearchText: debounce(handleChangeSearchText, 500),
  };
}
