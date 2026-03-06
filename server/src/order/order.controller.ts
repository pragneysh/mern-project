import { Body, Controller, Get, Post, Put, Param, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard('jwt')) // ✅ MUST be here
  @Post('confirm-order')
  async createOrder(@Body() body: any, @Req() req: any) {
    return this.orderService.confirmOrder(
      body,
      req.user.id, // eslint-disable-line
    );
  }

  @UseGuards(AuthGuard('jwt')) // ✅ MUST be here
  @Get('orders')
  async getOrder(@Req() req: any) {
    return this.orderService.getOrders(req.user.id); // eslint-disable-line
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('orders/:id/status')
  async changeOrderStatus(@Param('id') orderId: string, @Body() body: any) {
    return this.orderService.changeOrderStatus(orderId, body);
  }
}
