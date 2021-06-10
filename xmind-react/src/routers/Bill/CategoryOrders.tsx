import React from "react";
import { billType } from "@/config/config.default";
import { BillCategoryOrdersProps } from "@/interfaces/routers/bill.router.interface";
import { Empty, List } from "antd";
import moment from "moment";
import styles from "./index.module.scss";
import { inject, observer } from "mobx-react";

export default inject("billStore")(
  observer(({ billStore }: BillCategoryOrdersProps) => {
    const { bills } = billStore!;

    return (
      <>
        {bills.length ? (
          bills.map(({ name, orders, type: categoryType, totalAmount, id }) => (
            <List
              key={id}
              itemLayout="vertical"
              dataSource={orders}
              header={
                <div className={styles.category}>
                  <h4>{name}</h4>
                  <p>{`${billType[categoryType]}: ¥${totalAmount}`}</p>
                </div>
              }
              renderItem={({ time, amount, id: orderId }) => (
                <List.Item key={orderId} className={styles.order}>
                  <p>{moment(Number(time)).format("YYYY-MM-DD")}</p>
                  <p>{`¥${Number(amount).toFixed(2)}`}</p>
                </List.Item>
              )}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </div>
        )}
      </>
    );
  }),
);
