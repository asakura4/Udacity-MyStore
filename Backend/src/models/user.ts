// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';

const saltRounds: string = (process.env.SALT_ROUNDS as unknown) as string;
const pepper: string  = (process.env.BCRYPT_PASSWORD as unknown) as string;

export type User = {
     id?: number;
     firstName: string;
     lastName: string;
     password: string;
}

export class UserStore {
    async index(): Promise<User[]>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users;';
            
            const result = await conn.query(sql);
            conn.release();
            
            return result.rows;
            
        }catch(err){
            throw new Error(`Could not get user. Error: ${err}`);
        }
    }
    
    async show(id: string): Promise<User>{
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = 'SELECT * FROM users WHERE id=($1);';
            
            const result = await conn.query(sql, [id]);
            
            conn.release();
            
            return result.rows[0];
            
        }catch(err){
            throw new Error(`Could not find user ${id}. Error: ${err}`);
        }
    }
    
    async create(u: User): Promise<User>{
        
        try{
            // @ts-ignore
            const conn = await Client.connect();
            const sql = `INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING * `;
            
            const hashedPassword = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
            
            const result = await conn.query(sql, [u.firstName, u.lastName, hashedPassword]);
            const user = result.rows[0];
            conn.release();
            
            return user;
        }catch(err){
            throw new Error(`unable create user (${u.firstName} ,${u.lastName}) : ${err}`)
        }
        
    }
    
}