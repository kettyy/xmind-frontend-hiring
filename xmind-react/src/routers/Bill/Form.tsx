import { Button, Form, InputNumber, Select } from "antd";
import { inject, observer } from "mobx-react";
import React from "react";
import { BillFormProps } from "@/interfaces/routers/bill.router.interface";
import styles from "./index.module.scss";
import {
  filterOption,
  inputNumberCurrencyFormatter,
} from "@/util/methods.util";

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const formatter = inputNumberCurrencyFormatter("¥");

export default inject("billStore")(
  observer(({ billStore }: BillFormProps) => {
    const { categoryOptions, creatOrder, submitting } = billStore!;

    return (
      <Form
        {...layout}
        validateTrigger="onBlur"
        onFinish={creatOrder}
        data-testid="bill-form">
        <Form.Item
          label="分类"
          name="category"
          rules={[{ required: true, message: "请选择分类" }]}>
          <Select
            placeholder="分类"
            showSearch
            optionFilterProp="children"
            filterOption={filterOption}
            options={categoryOptions}
          />
        </Form.Item>

        <Form.Item
          label="金额"
          name="amount"
          rules={[{ required: true, message: "请填写金额" }]}>
          <InputNumber
            formatter={formatter}
            precision={2}
            style={{ width: "100%" }}
          />
        </Form.Item>

        <div className={styles.btns}>
          <Button htmlType="reset">重置</Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: 24 }}
            loading={submitting}>
            提交
          </Button>
        </div>
      </Form>
    );
  }),
);
