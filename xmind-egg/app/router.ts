import { Application } from "egg";

export default (app: Application) => {
  const { controller, router } = app;

  router.get("/orders", controller.order.index);
  router.post("/orders", controller.order.create);
  router.get("/categories", controller.category.index);
};
