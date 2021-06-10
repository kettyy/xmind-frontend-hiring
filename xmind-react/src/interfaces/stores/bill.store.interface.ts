import { Moment } from "moment";

export interface Order {
  id: string;
  /** 创建时间 */
  time: string;
  /** 账单的类型 1 代表收入，0 代表支出 */
  type: 0 | 1;
  /** 分类ID */
  category: string;
  /** 金额 */
  amount: number;
}

export type OrderFormOptions = Pick<Order, "category" | "amount">;

export interface Category {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类类型 */
  type: 0 | 1;
}

export interface BillStoreInterface {
  /**
   * 数据加载状态
   *
   * @type {boolean}
   * @memberof BillStoreInterface
   */
  loading: boolean;

  /**
   * 加载是否异常
   *
   * @type {boolean}
   * @memberof BillStoreInterface
   */
  isError: boolean;

  /**
   * 订单数据集合
   *
   * @type {Order[]}
   * @memberof BillStoreInterface
   */
  orders: Order[];

  /**
   * 分类数据集合
   *
   * @type {Category[]}
   * @memberof BillStoreInterface
   */
  categories: Category[];

  /**
   * 查询月份
   *
   * @type {number | undefined}
   * @memberof BillStoreInterface
   */
  searchMonth: number | undefined;

  /**
   * 表单提交状态
   *
   * @type {boolean}
   * @memberof BillStoreInterface
   */
  submitting: boolean;

  /**
   * 模态层可见状态
   *
   * @type {boolean}
   * @memberof BillStoreInterface
   */
  modalVisible: boolean;

  /**
   * 根据查询参数过滤的订单集合
   *
   * @type {Order[]}
   * @memberof BillStoreInterface
   */
  filteredOrders: Order[];

  /**
   * 收入总额
   *
   * @type {string}
   * @memberof BillStoreInterface
   */
  incomeTotal: string;

  /**
   * 支出总额
   *
   * @type {string}
   * @memberof BillStoreInterface
   */
  outlayTotal: string;

  /**
   * 分类ID不存在分类列表的订单集合
   *
   * @type {Order[]}
   * @memberof BillStoreInterface
   */
  uncategorizedOrders: Order[];

  /**
   * 账单集合
   *
   * @type {(Array<
   *     Category & {
   *       orders: Order[];
   *       totalAmount: string;
   *     }
   *   >)}
   * @memberof BillStoreInterface
   */
  bills: Array<
    Category & {
      orders: Order[];
      totalAmount: string;
    }
  >;

  categoryOptions: Array<{ value: string; label: string }>;

  /**
   * 请求账单数据
   *
   * @author wangxin
   * @memberof BillStoreInterface
   */
  getBills(): Promise<void>;

  /**
   * 创建订单
   *
   * @author wangxin
   * @param {OrderFormOptions} options
   * @memberof BillStoreInterface
   */
  creatOrder(options: OrderFormOptions): void;

  /**
   * 切换查询月份
   *
   * @author wangxin
   * @param {Moment | null} month
   * @memberof BillStoreInterface
   */
  setMonth(month: Moment | null): void;

  /**
   * 切换模态层可见状态
   *
   * @author wangxin
   * @memberof BillStoreInterface
   */
  setModalVisible(): void;
}
