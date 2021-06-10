import { Skeleton } from "antd";
import React from "react";
import styles from "./index.module.scss";

const items = Array.from({ length: 6 }).fill(null);

export default () => {
  return (
    <>
      {items.map((k, i) => (
        <div className={styles.skeleton} key={`Bill_ListSkeleton-${i}`}>
          <Skeleton paragraph={false} active />
          <Skeleton.Input active />
        </div>
      ))}
    </>
  );
};
