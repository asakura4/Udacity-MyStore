import app from '../server';
import { User, UserStore } from '../models/user';


describe('User model  - ', () => {
    
    const store = new UserStore();
    
    it('index', async (done) => {
        const users = await store.index();
        
        expect(users.length).toBeGreaterThan(0);
        //done();
    });
    
    it('show', async (done) => {
        const returnUser = await store.show('4');
        //@ts-ignore
        expect(returnUser['firstname']).toBe('firstD');
        //@ts-ignore
        expect(returnUser['lastname']).toBe('lastD');
        //done();
    });

    
    it('create', async (done) => {
        const numId: string = Math.round(Math.random() * 10000 as number).toString() as string;
        const newUser = {
            firstName: 'first' + numId,
            lastName: 'last' + numId,
            password: 'password' + numId
        }
        const returnUser = await store.create(newUser);
        
        //@ts-ignore
        expect(returnUser['firstname']).toBe(newUser['firstName']);
        //@ts-ignore
        expect(returnUser['lastname']).toBe(newUser['lastName']);
        expect(returnUser['password']).not.toBe('password123');
        //done();
    });    


 
    
});

