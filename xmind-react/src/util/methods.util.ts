import { SelectOption } from "@/interfaces/stores/bill.store.interface";
import { OptionData, OptionGroupData } from "rc-select/lib/interface";

export const filterOption = (
  inputValue: string,
  option?: OptionData | OptionGroupData,
) =>
  (option as SelectOption).label
    .toLowerCase()
    .indexOf(inputValue.toLowerCase()) >= 0;

export const inputNumberCurrencyFormatter =
  (currency: string) => (value?: string) =>
    `${currency} ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
