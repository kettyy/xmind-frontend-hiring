export interface IndexResponse<T> {
  list: T;
}

export interface Category {
  /** 分类ID */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类类型 */
  type: 0 | 1;
}

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
