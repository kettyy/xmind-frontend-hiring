import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  sequelize: {
    enable: true,
    package: "egg-sequelize",
  },
  mysql: {
    enable: true,
    package: "egg-mysql",
  },
};

export default plugin;
