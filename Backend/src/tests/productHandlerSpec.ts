import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
describe('Product routes endpoint - ', () => {
    
    const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ppPX2xP6GO8z_WuzgkFr6VwZphJ435SGh7ozUm5_eSM'
    
    it('gets index', async (done) => {
        const response = await request.get('/product');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        //done();
    });
    
        
    it('gets show', async (done) => {
        const response = await request.get('/product/1');
        //console.log(response);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(1);
        expect(response.body.name).toBe('prodA');
        //done();
    });

    it('post create', async (done) => {
        const newProduct = {
            name: 'prodD',
            price: 8,
            category: 'ALCOHOL'
        }
        const response = await request.post('/product')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newProduct)
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('prodD');
        //done();
    });
    
    it('get category', async (done) => {
        const response = await request.get('/product/category/FOOD');
        //console.log(response);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
        //done();
    });
    
       
});

