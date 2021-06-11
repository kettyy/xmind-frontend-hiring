'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
};
