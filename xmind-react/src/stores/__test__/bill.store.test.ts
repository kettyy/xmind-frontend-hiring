import { BillStoreInterface } from "@/interfaces/stores/bill.store.interface";
import { BillStore } from "@/stores/bill.store";
import axios from "axios";
import moment from "moment";
import {
  categories,
  orders,
  uncategorizedOrders,
} from "../__mock__/bill.store.mock";

describe("billStore - getBills get the correct response", () => {
  let billStore: BillStoreInterface;

  beforeEach(() => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
      switch (url) {
        case "/orders":
          return Promise.resolve({ data: { list: orders } });
        case "/categories":
          return Promise.resolve({ data: { list: categories } });
        default:
          return Promise.resolve({ data: {} });
      }
    });

    billStore = new BillStore();

    billStore.getBills();
  });

  test("getBills responds normally", () => {
    expect(billStore.loading).toBe(false);
    expect(billStore.isError).toBe(false);
    expect(billStore.orders).toEqual(orders);
    expect(billStore.categories).toEqual(categories);
  });

  test("When the query condition is empty, filteredOrders returns orders directly", () => {
    expect(billStore.filteredOrders).toEqual(orders);
  });

  test("When the query condition is not empty, filteredOrders is filtered according to the condition", () => {
    billStore.setMonth(moment("2021-06-10"));
    expect(billStore.filteredOrders.length).toBe(2);
  });

  test("Total amount of bill receipts and payments", () => {
    expect(billStore.incomeTotal).toBe("134100.00");
    expect(billStore.outlayTotal).toBe("108802.00");
  });

  test("uncategorizedOrders is empty", () => {
    expect(billStore.uncategorizedOrders.length).toBe(0);
  });

  test("When there is abnormal data, uncategorizedOrders is not empty", async () => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
      switch (url) {
        case "/orders":
          return Promise.resolve({
            data: { list: [...orders, ...uncategorizedOrders] },
          });
        case "/categories":
          return Promise.resolve({ data: { list: categories } });
        default:
          return Promise.resolve({ data: {} });
      }
    });

    await billStore.getBills();

    expect(billStore.orders).not.toEqual(orders);
    expect(billStore.uncategorizedOrders.length).toBe(1);
    expect(billStore.uncategorizedOrders[0].category).toBe("other");
  });

  test("bills is merged and sorted according to classification", () => {
    const top = billStore.bills[0];
    const bottom = billStore.bills[billStore.bills.length - 1];

    expect(billStore.bills.length).toBe(categories.length);
    expect(top.id).toBe(
      Array.from(
        new Set(top.orders.map(({ category }) => category)),
      ).toString(),
    );
    expect(Number(top.totalAmount) > Number(bottom.totalAmount)).toBe(true);
    expect(
      Number(top.orders[0].time) >
        Number(top.orders[top.orders.length - 1].time),
    ).toBe(true);
  });

  test("bills will contain uncategorizedOrders", async () => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
      switch (url) {
        case "/orders":
          return Promise.resolve({
            data: { list: [...orders, ...uncategorizedOrders] },
          });
        case "/categories":
          return Promise.resolve({ data: { list: categories } });
        default:
          return Promise.resolve({ data: {} });
      }
    });

    await billStore.getBills();

    const billsLength = billStore.bills.length;

    expect(billsLength).toBe(categories.length + 1);
    expect(billStore.bills[billsLength - 1].id).toBe("other");
    expect(billStore.bills[billsLength - 1].orders).toEqual(
      uncategorizedOrders,
    );
  });

  test("The structure of categoryOptions", () => {
    expect(billStore.categoryOptions.length).toBe(categories.length);
    expect(Object.keys(billStore.categoryOptions[0]).toString()).toBe(
      "value,label",
    );
  });

  test("Local data added after bill creation", () => {
    jest
      .spyOn(axios, "post")
      .mockImplementation(() => Promise.resolve({ data: {} }));

    billStore.creatOrder({ category: "1bcddudhmh", amount: 1000.0 });

    setTimeout(() => {
      expect(billStore.orders.length).toBe(orders.length + 1);
      expect(billStore.submitting).toBe(false);
      expect(billStore.modalVisible).toBe(false);
    }, 1000);
  });

  test("Local data will not be added after failure to create a bill", () => {
    jest.spyOn(axios, "post").mockImplementation(() => Promise.reject({}));

    billStore.creatOrder({ category: "1bcddudhmh", amount: 1000.0 });

    setTimeout(() => {
      expect(billStore.orders.length).toBe(orders.length);
      expect(billStore.submitting).toBe(false);
    }, 1000);
  });
});

describe("billStore - getBills get the wrong response", () => {
  test("orders get the wrong response", async () => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
      switch (url) {
        case "/orders":
          return Promise.reject({});
        case "/categories":
          return Promise.resolve({ data: { list: categories } });
        default:
          return Promise.resolve({ data: {} });
      }
    });

    const billStore = new BillStore();

    await billStore.getBills();

    expect(billStore.loading).toBe(false);
    expect(billStore.isError).toBe(true);
    expect(billStore.orders.length).toBe(0);
    expect(billStore.categories.length).toBe(0);
  });

  test("categories get the wrong response", async () => {
    jest.spyOn(axios, "get").mockImplementation((url) => {
      switch (url) {
        case "/orders":
          return Promise.resolve({ data: { list: orders } });
        case "/categories":
          return Promise.reject({});
        default:
          return Promise.resolve({ data: {} });
      }
    });

    const billStore = new BillStore();

    await billStore.getBills();

    expect(billStore.loading).toBe(false);
    expect(billStore.isError).toBe(true);
    expect(billStore.orders.length).toBe(0);
    expect(billStore.categories.length).toBe(0);
  });

  test("got the wrong response", async () => {
    jest.spyOn(axios, "get").mockImplementation(() => Promise.reject({}));

    const billStore = new BillStore();

    await billStore.getBills();

    expect(billStore.loading).toBe(false);
    expect(billStore.isError).toBe(true);
    expect(billStore.orders.length).toBe(0);
    expect(billStore.categories.length).toBe(0);
  });
});

test("setMonth convert the date to the first day of the month", () => {
  const billStore = new BillStore();

  billStore.setMonth(moment("2021-06-10"));

  expect(billStore.searchMonth).not.toBe(undefined);
  expect(moment(billStore.searchMonth).format("YYYY-MM-DD")).toBe("2021-06-01");

  billStore.setMonth(null);
  expect(billStore.searchMonth).toBe(undefined);
});

test("setModalVisible reverse modalVisible", () => {
  const billStore = new BillStore();

  expect(billStore.modalVisible).toBe(false);

  billStore.setModalVisible();

  expect(billStore.modalVisible).toBe(true);
});
