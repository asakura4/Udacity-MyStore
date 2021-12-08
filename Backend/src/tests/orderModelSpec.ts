import { Order, OrderProduct, OrderStore } from '../models/order';

describe('Order model  - ', () => {
    
    const store = new OrderStore();
    
    
    it('findCurrentOrderByUser', async (done) => {
        const orders = await store.findCurrentOrderByUser('1');
        
        expect(orders.length).toBeGreaterThan(0);
        //done();
    });
    
    it('findCompletedOrderByUser', async (done) => {
        const orders = await store.findCompletedOrderByUser('3');
        
        expect(orders.length).toBeGreaterThan(0);
        //done();
    });

    it('completeOrder', async (done) => {
        const order = await store.completeOrder('3' ,'3');
        
        expect(order['status']).toBe('completed');
        expect(Number(order['user_id'])).toBe(3);
        //done();
    });
    
    
    it('addProduct', async (done) => {
        const order_products = await store.addProduct(20 ,'1', '3');
        //console.log(order_products);
        expect(Number(order_products['product_id'])).toBe(3);
        expect(Number(order_products['order_id'])).toBe(1);
        //done();
    });
    
});

