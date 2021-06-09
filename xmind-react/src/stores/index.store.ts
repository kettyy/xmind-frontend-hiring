import { BillStoreInterface } from "@/interfaces/stores/bill.store.interface";
import { RootStoreInterface } from "@/interfaces/stores/index.store.interface";
import { BillStore } from "./bill.store";

export class RootStore implements RootStoreInterface {
  billStore: BillStoreInterface;

  constructor() {
    this.billStore = new BillStore();
  }
}
