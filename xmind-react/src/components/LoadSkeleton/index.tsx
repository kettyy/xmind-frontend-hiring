import { LoadSkeletonProps } from "@/interfaces/components/loadSkeleton.component.interface";
import { Skeleton } from "antd";
import React from "react";
import styles from "./index.module.scss";

export default ({ children, loading, error, component }: LoadSkeletonProps) => {
  if (loading) {
    return (
      <div className={styles.skeleton}>
        {component ? component : <Skeleton paragraph={{ rows: 10 }} />}
      </div>
    );
  }

  const { isError, onAgain } = error || {};

  if (isError) {
    return (
      <div className={styles.error}>
        <p className="ant-btn-link">
          请求失败，
          <span className={styles.again} onClick={onAgain}>
            点击重试
          </span>
        </p>
      </div>
    );
  }

  return <>{children}</>;
};
