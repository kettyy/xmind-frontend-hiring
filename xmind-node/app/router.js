"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/orders", controller.order.index);
  router.post("/orders", controller.order.create);
  router.get("/categories", controller.category.index);
};
