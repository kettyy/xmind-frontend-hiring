"use strict";

export default (app) => {
  const { STRING, INTEGER, DOUBLE } = app.Sequelize;

  return app.model.define("order", {
    id: { type: STRING, primaryKey: true },
    type: INTEGER,
    time: STRING, // 因时间戳为大数字，防止精度丢失，以字符串形式保存
    category: STRING(32),
    amount: DOUBLE,
    created_at: STRING,
    updated_at: STRING,
  });
};
