import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();
const token_secret: string = (process.env.TOKEN_SECRET as unknown) as string;


const orderRoutes = (app: express.Application) =>{
    app.get('/order/currentOrder/:_id', findCurrentOrderByUser);
    app.get('/order/completedOrder/:_id', findCompletedOrderByUser);
    app.put('/order/complete', completeOrder);
    app.post('/order', create);
    // TODO addorder to product
    app.post('/order/:_id/addProduct', addProduct);

}


async function findCurrentOrderByUser(req: Request, res: Response){
    try {
        const authorizationHeader: string = (req.headers.authorization as unknown) as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, token_secret);
    }catch(err){
        console.log(err);
        res.status(401);
        res.json('Acess denied, invalid token');
    }
    
    const orders = await store.findCurrentOrderByUser((req.params._id as unknown) as string);
    res.json(orders);
    
}

async function findCompletedOrderByUser(req: Request, res: Response){
    try {
        const authorizationHeader: string = (req.headers.authorization as unknown) as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, token_secret);
    }catch(err){
        res.status(401);
        res.json('Acess denied, invalid token');
    }        

    const orders = await store.findCompletedOrderByUser((req.params._id as unknown) as string);
    res.json(orders);
    
}


async function completeOrder(req: Request, res: Response){
    try {
        const authorizationHeader: string = (req.headers.authorization as unknown) as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, token_secret);
    }catch(err){
        res.status(401);
        res.json('Acess denied, invalid token');
    }
    
    try {
        const userid: string =  (req.body.user_id as unknown) as string;
        const orderid: string =  (req.body.order_id as unknown) as string;
        
        const updatedOrder = await store.completeOrder(userid, orderid);
        res.json(updatedOrder);
        return;
    } catch(err){
        res.status(400);
        res.json(err);
    }
    
}


async function create(req: Request, res: Response){
    try {
        const authorizationHeader: string = (req.headers.authorization as unknown) as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, token_secret);
    }catch(err){
        res.status(401);
        res.json('Acess denied, invalid token');
    }
    
    try {
         const order:  Order = {
            user_id: req.body.user_id,
            status: req.body.status
        }        
        const newOrder = await store.create(order);
        res.json(newOrder);
        return;
    } catch(err){
        res.status(400);
        res.json(err);
    }
    
}

async function addProduct(req: Request, res: Response){
    try {
        const authorizationHeader: string = (req.headers.authorization as unknown) as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, token_secret);
    }catch(err){
        res.status(401);
        res.json('Acess denied, invalid token');
    }
    
    try {
        const order_id: string = (req.params._id as unknown) as string;
        const product_id: string = (req.body.product_id as unknown) as string;  
        const quantity: number = parseInt((req.body.product_id as unknown) as string);  
        
        const addedOrder = await store.addProduct(quantity, order_id, product_id);
        res.json(addedOrder);
        return;
    } catch(err){
        res.status(400);
        res.json(err);
    }    
    
}






export default orderRoutes;