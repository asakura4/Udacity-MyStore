import supertest from 'supertest';
import app from '../server';

const request = supertest(app);
describe('user routes endpoint - ', () => {
    
    const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.ppPX2xP6GO8z_WuzgkFr6VwZphJ435SGh7ozUm5_eSM'
    
    it('gets index', async (done) => {
        const response = await request.get('/user')
        .set('Authorization', `Bearer ${token}`);
        
        //console.log(response);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(3);
        //done();
    });
    
        
    it('gets show', async (done) => {
        const response = await request.get('/user/3')
            .set('Authorization', `Bearer ${token}`);
        //console.log(response);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(3);
        expect(response.body.firstname).toBe('firstC');
        //done();
    });

    it('post create', async (done) => {
        const numId: string = Math.round(Math.random() * 10000 as number).toString() as string;
        const newUser = {
            firstName: 'first' + numId,
            lastName: 'last' + numId,
            password: 'password' + numId
        }
        const response = await request.post('/user')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(newUser)
        expect(response.status).toBe(200);
        //console.log(response.body);
        expect(response.body.lastname).toBe('last' + numId);
        expect(response.body.password).not.toBe('password' + numId);
        //done();
    });
    

    
       
});