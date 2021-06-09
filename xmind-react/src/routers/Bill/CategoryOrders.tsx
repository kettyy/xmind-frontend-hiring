import React from "react";
import { billType } from "@/config/config.default";
import { BillCategoryOrdersProps } from "@/interfaces/routers/bill.router.interface";
import { List } from "antd";
import moment from "moment";
import styles from "./index.module.scss";

export default ({
  bill: { name, totalAmount, type: categoryType, orders },
}: BillCategoryOrdersProps) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={orders}
      header={
        <div className={styles.category}>
          <h4>{name}</h4>
          <p>{`${billType[categoryType]}: ¥${totalAmount}`}</p>
        </div>
      }
      renderItem={({ time, type, amount, id }) => (
        <List.Item key={id} className={styles.order}>
          <p>{moment(Number(time)).format("YYYY-MM-DD")}</p>
          <p>{`¥${Number(amount).toFixed(2)}`}</p>
        </List.Item>
      )}
    />
  );
};
