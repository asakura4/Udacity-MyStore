import app from '../server';
import { Product, ProductStore } from '../models/product';


describe('Product model  - ', () => {
    
    const store = new ProductStore();
    
    it('index', async (done) => {
        const products = await store.index();
        
        expect(products.length).toBeGreaterThan(0);
        //done();
    });
    
    it('show', async (done) => {
        const product = await store.show('1');
        
        expect(product['name']).toBe('prodA');
        expect(Number(product['price'])).toBe(4);
        expect(product['category']).toBe('FOOD');
        //done();
    });

    it('create', async (done) => {
        const newProduct = {
            name: 'ProdE',
            price: 30,
            category: 'PET'
            
        }
        const product = await store.create(newProduct);
        
        expect(product['name']).toBe('ProdE');
        expect(Number(product['price'])).toBe(30);
        expect(product['category']).toBe('PET');
        //done();
    });    


    it('getProductByCategory', async (done) => {
        const product = await store.getProductByCategory('PET');
        
        expect(product[0]['name']).toBe('ProdE');
        expect(Number(product[0]['price'])).toBe(30);
        expect(product[0]['category']).toBe('PET');
        //done();
    });     
    
});

