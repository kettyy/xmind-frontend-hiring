// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCategory from '../../../app/controller/category';
import ExportOrder from '../../../app/controller/order';

declare module 'egg' {
  interface IController {
    category: ExportCategory;
    order: ExportOrder;
  }
}
