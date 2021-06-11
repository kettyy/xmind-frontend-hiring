import { Provide } from '@midwayjs/decorator';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { Order } from '../interface';
import { v4 } from 'uuid';

@Provide()
export class OrderService {
  async index() {
    const workbook = xlsx.read(
      fs.readFileSync('src/public/bill.csv', 'utf-8'),
      { type: 'buffer' }
    );
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json<Omit<Order, 'id'>>(sheet);

    return data.map(order => Object.assign(order, { id: v4() }));
  }

  async create(options: Partial<Order>) {
    return Object.assign({ id: v4(), time: Date.now() }, options);
  }
}
