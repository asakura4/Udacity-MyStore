// @ts-ignore
import Client from '../database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string;
}

export class ProductStore {
    async index(): Promise<Product[]>{
         try{
             // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM product; ';
             
            const result = await conn.query(sql);
            conn.release();
             
            return result.rows;
             
         }catch(err){
            console.log(err);
            throw new Error(`Could not get products. Error: ${err}`);
         }
    }
    
    async show(id: string): Promise<Product>{
        try{
            const sql = 'SELECT * FROM product WHERE id=($1); ';
            
            // @ts-ignore
            const conn = await Client.connect();
            
            const result = await conn.query(sql, [id]);
            conn.release();
            
            return result.rows[0];
            
        }catch(err){
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    
    async create(p: Product): Promise<Product>{
         try{
            const sql = 'INSERT INTO product (name, price, category) VALUES ($1, $2, $3) RETURNING *; ';
            
            // @ts-ignore
            const conn = await Client.connect();
            
            const result = await conn.query(sql, [p.name, p.price, p.category]);
            conn.release();
            
            return result.rows[0];
            
        }catch(err){
            throw new Error(`Could not create product ${p.name}. Error: ${err}`);
        }
        
    }
    
    // TODO
    async findTopFiveProduct(): Promise<Product[]>{
         try{
            const sql = '';
            
            // @ts-ignore
            const conn = await Client.connect();
            
            const result = await conn.query(sql);
            conn.release();
            
            return result.rows;
            
        }catch(err){
            throw new Error(`Could not find top five Error: ${err}`);
        }
        
    }
    
    async getProductByCategory(category: string): Promise<Product[]>{
         try{
            const sql = 'SELECT * FROM product WHERE category=($1); ';
            
            // @ts-ignore
            const conn = await Client.connect();
            
            const result = await conn.query(sql, [category]);
            conn.release();
            
            return result.rows;
            
        }catch(err){
            throw new Error(`Could not find category ${category}. Error: ${err}`);
        }
        
    }
}