import { Service } from 'egg';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { Category } from '../interface';

export default class CategoryService extends Service {
  async findAll() {
    await this.init();

    const categories = await this.app.mysql.select('categories');
    return { list: categories };
  }

  async create(body: Category) {
    const category = Object.assign(body, {
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    const result = await this.app.mysql.insert(
      'categories',
      Object.assign(body, {
        created_at: Date.now(),
        updated_at: Date.now(),
      }),
    );

    return result.affectedRows === 1 ? category : null;
  }

  async init() {
    const count = await this.app.mysql.count('categories');

    if (count !== 0) {
      return;
    }

    const workbook = xlsx.read(
      fs.readFileSync('app/public/categories.csv', 'utf-8'),
      { type: 'buffer' },
    );
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json<Category>(sheet);

    for (const category of data) {
      await this.create(category);
    }
  }
}
