'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;
    await queryInterface.createTable('categories', {
      id: STRING,
      type: INTEGER,
      name: STRING,
      created_at: STRING, // 因时间戳为大数字，防止精度丢失，以字符串形式保存
      updated_at: STRING,
    });
  },

  down: async queryInterface => {
    await queryInterface.dropTable('categories');
  },
};
