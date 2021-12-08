// @ts-ignore
import Client from '../database';

export type Order = {
    id?: number;
    user_id: number;
    status: string;
    
}

export type OrderProduct = {
    id?: number;
    quantity: number;
    order_id: number;
    product_id: number;
}

export class OrderStore {
    
    async create(o: Order): Promise<Order>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = `INSERT INTO orders (user_id, status) 
                    VALUES($1, $2) RETURNING * `;
            
            const result = await conn.query(sql, [o.user_id, o.status]);
            const order = result.rows[0];
            conn.release();
            
            return order;
        }catch(err){
            throw new Error(`unable create order ${o.user_id} : ${err}`)
        }
    }
    
    async findCurrentOrderByUser(id: string): Promise<Order[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            
            const sql = `SELECT * FROM orders WHERE user_id = ($1);`;
            
            const result = await conn.query(sql, [id]);
            conn.release();
            
            return result.rows;
            
        }catch(err){
           throw new Error(`unable find order ${id} : ${err} `);  
        }
        
    }
    
    async findCompletedOrderByUser(id: string): Promise<Order[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            
           const sql = `SELECT * FROM orders WHERE user_id = ($1) and status = 'completed' `;
            
            const result = await conn.query(sql, [id]);
            conn.release();
            
            return result.rows;
            
        }catch(err){
           throw new Error(`unable find order ${id} : ${err} `);  
        }
        
    }
    
    async completeOrder(user_id: string, order_id: string ): Promise<Order>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            
           const sql = `UPDATE orders SET status = 'completed' 
                        WHERE id = ($1) AND user_id = ($2)
                        RETURNING * `;
            
            const result = await conn.query(sql, [order_id, user_id]);
            conn.release();
            
            return result.rows[0];
            
        }catch(err){
           throw new Error(`unable find order ${order_id} : ${err} `);  
        }        
    }
    
    async addProduct(quantity: number, order_id: string, product_id: string): Promise<OrderProduct>{
        try{
            const ordersql = `SELECT * FROM orders WHERE id=($1);`;
            
            //@ts-ignore
            const conn = await Client.connect();
            
            const result = await conn.query(ordersql, [order_id]);
            const order = result.rows[0]
            
            if(order.status === 'completed'){
                throw new Error(`Could not add product ${product_id} to order ${order_id} because order status is ${order.status}`);
                
            }
            conn.release();
        }catch(err){
            throw new Error(`${err}`); 
        }
        
        try{
            const sql = `INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *`;
            
            //@ts-ignore
            const conn = await Client.connect();
            
            const result = await conn.query(sql, [quantity, order_id, product_id]);
            const order = result.rows[0];
            
            conn.release();
            
            return order;
            
        } catch(err){
            throw new Error(`Could not add product ${product_id} to order ${order_id}: ${err}`);
        }
        
    }
    
    
}