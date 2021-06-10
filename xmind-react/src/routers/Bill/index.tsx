import React, { useEffect } from "react";
import { BillProps } from "@/interfaces/routers/bill.router.interface";
import { inject, observer } from "mobx-react";
import CategoryOrders from "./CategoryOrders";
import { Button, DatePicker, Modal, Tooltip } from "antd";
import styles from "./index.module.scss";
import { PlusOutlined } from "@ant-design/icons";
import Form from "./Form";
import LoadSkeleton from "@/components/LoadSkeleton";
import ListSkeleton from "./ListSkeleton";

export default inject("billStore")(
  observer(({ billStore }: BillProps) => {
    const {
      getBills,
      setMonth,
      incomeTotal,
      outlayTotal,
      setModalVisible,
      modalVisible,
      loading,
      isError,
    } = billStore;

    useEffect(() => {
      getBills();
    }, []);

    return (
      <>
        <div className={styles.container}>
          <DatePicker
            className={styles.date}
            onChange={setMonth}
            picker="month"
          />
          <div className={styles.list}>
            <LoadSkeleton
              loading={loading}
              error={{ isError, onAgain: getBills }}
              component={<ListSkeleton />}>
              <CategoryOrders />
            </LoadSkeleton>
          </div>

          <div className={styles.footer}>
            <span style={{ marginRight: 16 }}>{`收入: ¥${incomeTotal}`}</span>
            <span>{`支出: ¥${outlayTotal}`}</span>
            <div className={styles.add}>
              <Tooltip title="创建账单">
                <Button
                  shape="circle"
                  icon={<PlusOutlined translate />}
                  onClick={setModalVisible}
                />
              </Tooltip>
            </div>
          </div>
        </div>

        <Modal
          destroyOnClose
          maskClosable={false}
          footer={null}
          onCancel={setModalVisible}
          visible={modalVisible}
          title="创建账单"
          centered
          className={styles.modal}>
          <Form />
        </Modal>
      </>
    );
  }),
);
