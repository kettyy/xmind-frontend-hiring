import { BillStoreInterface } from "./bill.store.interface";

export interface RootStoreInterface {
  /** 账单管理 */
  billStore: BillStoreInterface;
}
