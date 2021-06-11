'use strict';

const Service = require('egg').Service;
const uuidv4 = require('uuid').v4;
const xlsx = require('xlsx');
const fs = require('fs');

class OrderService extends Service {
  async findAll() {
    await this.init();

    const orders = await this.app.mysql.select('orders');

    return { list: orders };
  }

  async create(body) {
    const order = Object.assign(
      {
        id: uuidv4(),
        time: Date.now(),
        created_at: Date.now(),
        updated_at: Date.now(),
      },
      body
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
      { type: 'buffer' }
    );
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json(sheet);

    for (const order of data) {
      await this.create(order);
    }
  }
}

module.exports = OrderService;
