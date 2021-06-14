import { Service } from 'egg';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../interface';

export default class OrderService extends Service {
  async findAll() {
    await this.init();

    const orders = await this.app.mysql.select('orders');

    return { list: orders };
  }

  async create(body: Omit<Order, 'id' | 'time'>) {
    const order = Object.assign(
      {
        id: uuidv4(),
        time: Date.now(),
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      body,
    );

    const result = await this.app.mysql.insert('orders', order);

    return result.affectedRows === 1 ? order : null;
  }

  async init() {
    const count = await this.app.mysql.count('orders');

    if (count !== 0) {
      return;
    }

    const workbook = xlsx.read(
      fs.readFileSync('app/public/bill.csv', 'utf-8'),
      { type: 'buffer' },
    );
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json<Omit<Order, 'id'>>(sheet);

    for (const order of data) {
      await this.create(order);
    }
  }
}
