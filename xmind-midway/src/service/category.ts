import { Provide } from '@midwayjs/decorator';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { Category } from '../interface';

@Provide()
export class CategoryService {
  async index() {
    const workbook = xlsx.read(
      fs.readFileSync('src/public/categories.csv', 'utf-8'),
      { type: 'buffer' }
    );
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const data = xlsx.utils.sheet_to_json<Category>(sheet);

    return data;
  }
}
