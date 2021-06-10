import { BillStoreInterface } from "../stores/bill.store.interface";

export interface BillProps {
  billStore: BillStoreInterface;
}

export interface BillFormProps {
  billStore?: BillStoreInterface;
}

export interface BillCategoryOrdersProps {
  billStore?: BillStoreInterface;
}
