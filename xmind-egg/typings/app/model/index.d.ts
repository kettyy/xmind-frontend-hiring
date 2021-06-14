// This file is created by egg-ts-helper@1.25.9
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCategory from '../../../app/model/category';
import ExportOrder from '../../../app/model/order';

declare module 'egg' {
  interface IModel {
    Category: ReturnType<typeof ExportCategory>;
    Order: ReturnType<typeof ExportOrder>;
  }
}
