import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
describe('order routes endpoint - ', () => {
    
    const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ppPX2xP6GO8z_WuzgkFr6VwZphJ435SGh7ozUm5_eSM'
    
    it('gets current order by user', async (done) => {
        const response = await request.get('/order/currentOrder/1')
             .set('Authorization', `Bearer ${token}`);
        //console.log(response);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
        //done();
    });
    
        
    it('gets completed order by user', async (done) => {
        const response = await request.get('/order/completedOrder/3')
            .set('Authorization', `Bearer ${token}`);
        //console.log(response);
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(4);
        //done();
    });

    it('put completeOrder', async (done) => {
        const newOrder = {
            order_id: 4,
            user_id: 3
        }
        const response = await request.put('/order/complete')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newOrder)
        //console.log(response);
        expect(response.status).toBe(200);
        expect(response.body.user_id).toBe('3');
        //done();
    });
    
    it('post create', async (done) => {
        const newOrder = {
            user_id: 2,
            status: 'active'
        }
        const response = await request.post('/order')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newOrder)
        expect(response.status).toBe(200);
        expect(response.body.user_id).toBe('2');
        //done();
    });
    
       
});

