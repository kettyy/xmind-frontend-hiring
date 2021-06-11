'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING, DOUBLE } = Sequelize;
    await queryInterface.createTable('orders', {
      id: STRING,
      type: INTEGER,
      time: STRING, // 因时间戳为大数字，防止精度丢失，以字符串形式保存
      category: STRING(32),
      amount: DOUBLE,
      created_at: STRING,
      updated_at: STRING,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('orders');
  },
};
