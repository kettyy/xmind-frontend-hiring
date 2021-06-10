import {
  BillStoreInterface,
  Category,
  Order,
  OrderFormOptions,
} from "@/interfaces/stores/bill.store.interface";
import { message } from "antd";
import axios from "axios";
import { action, computed, observable, runInAction, toJS } from "mobx";
import moment, { Moment } from "moment";

export class BillStore implements BillStoreInterface {
  @observable loading = false;

  @observable isError = false;

  @observable orders: Order[] = [];

  @observable categories: Category[] = [];

  @observable searchMonth: number | undefined = undefined;

  @observable submitting = false;

  @observable modalVisible = false;

  @computed get filteredOrders() {
    if (!this.searchMonth) return this.orders;

    const start = moment(this.searchMonth).startOf("M");
    const end = moment(this.searchMonth).endOf("M");

    return this.orders.filter(({ time }) => {
      const orderTime = moment(Number(time));
      return orderTime.isAfter(start) && orderTime.isBefore(end);
    });
  }

  @computed get incomeTotal() {
    return this.getTotalAmount(
      this.filteredOrders.filter(({ type }) => type === 1),
    );
  }

  @computed get outlayTotal() {
    return this.getTotalAmount(
      this.filteredOrders.filter(({ type }) => type === 0),
    );
  }

  @computed get uncategorizedOrders() {
    return this.orders.filter(({ category }) =>
      this.categories.every(({ id }) => id !== category),
    );
  }

  @computed get bills() {
    const categories = this.categories
      .map((category) => {
        const orders = this.filteredOrders.filter(
          ({ category: categoryId }) => categoryId === category.id,
        );

        orders.sort(
          ({ time: preTime }, { time: curTime }) =>
            Number(curTime) - Number(preTime),
        );

        return Object.assign(toJS(category), {
          orders,
          totalAmount: this.getTotalAmount(orders),
        });
      })
      .filter(({ orders }) => orders.length);

    if (this.uncategorizedOrders.length) {
      categories.push(
        Object.assign({
          id: "other",
          name: "其他",
          type: -1,
          orders: this.uncategorizedOrders,
          totalAmount: this.getTotalAmount(this.uncategorizedOrders),
        }),
      );
    }

    categories.sort(
      ({ totalAmount: preTotal }, { totalAmount: curTotal }) =>
        Number(curTotal) - Number(preTotal),
    );

    return categories;
  }

  @computed get categoryOptions() {
    return this.categories.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
  }

  @action getBills = async () => {
    this.loading = true;
    this.isError = false;

    try {
      const {
        data: { list: orders },
      } = await axios.get("/orders");

      const {
        data: { list: categories },
      } = await axios.get("/categories");

      runInAction(() => {
        this.orders = orders;
        this.categories = categories;
      });
    } catch {
      runInAction(() => {
        this.isError = true;
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action creatOrder = (order: OrderFormOptions) => {
    this.submitting = true;

    const type = this.categories.find(({ id }) => id === order.category)?.type;

    axios
      .post("/orders", Object.assign({ type }, order))
      .then(({ data }) => {
        runInAction(() => {
          this.orders.push(data);
          this.modalVisible = false;
        });
        message.success("创建成功");
      })
      .catch(() => {
        message.error("创建失败，请重试");
      })
      .finally(() => {
        runInAction(() => {
          this.submitting = false;
        });
      });
  };

  @action setMonth = (month: Moment | null) => {
    this.searchMonth = month ? month.startOf("M").valueOf() : undefined;
  };

  @action setModalVisible = () => {
    this.modalVisible = !this.modalVisible;
  };

  private getTotalAmount = (orders: Order[]) => {
    return orders
      .map(({ amount }) => amount)
      .reduce(
        (preAmount, curAmount) => Number(preAmount) + Number(curAmount),
        0,
      )
      .toFixed(2);
  };
}
