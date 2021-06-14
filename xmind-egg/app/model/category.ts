

export default app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define('category', {
    id: { type: STRING, primaryKey: true },
    type: INTEGER,
    name: STRING,
    created_at: STRING, // 因时间戳为大数字，防止精度丢失，以字符串形式保存
    updated_at: STRING,
  });
};
