import {
  ALL,
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Provide,
} from '@midwayjs/decorator';
import { IndexResponse, Order } from '../interface';
import { Context } from 'egg';
import { OrderService } from '../service/order';

@Provide()
@Controller('/')
export class OrderController {
  @Inject()
  ctx: Context;

  @Inject()
  orderService: OrderService;

  @Get('/orders')
  @HttpCode(200)
  async index(): Promise<IndexResponse<Order[]>> {
    const orders = await this.orderService.index();
    return { list: orders };
  }

  @Post('/orders')
  @HttpCode(201)
  async create(@Body(ALL) options: Partial<Order>): Promise<Partial<Order>> {
    const order = await this.orderService.create(options);

    return order;
  }
}
