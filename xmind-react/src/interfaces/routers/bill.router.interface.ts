import {
  BillStoreInterface,
  Category,
  Order,
} from "../stores/bill.store.interface";

export interface BillProps {
  billStore: BillStoreInterface;
}

export interface BillFormProps {
  billStore?: BillStoreInterface;
}

export interface BillCategoryOrdersProps {
  bill: Category & {
    orders: Order[];
    totalAmount: string;
  };
}
