import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Product, ProductStore } from '../models/product';


const store = new ProductStore();
const token_secret: string = (process.env.TOKEN_SECRET as unknown) as string;



const index = async (_req: Request, res: Response) => {
    const products = await store.index();
    res.json(products);
}

const show = async (req: Request, res: Response) => {
    console.log(req.params._id);
    const product = await store.show((req.params._id as unknown) as string);
    res.json(product);
}

const create = async (req: Request, res: Response) => {
    try {
        const authorizationHeader: string = (req.headers.authorization as unknown) as string;
        const token = authorizationHeader.split(' ')[1];
        const decode = jwt.verify(token, token_secret);
    }catch(err){
        res.status(401);
        console.log(err);
        res.json(`Acess denied, invalid token. ${err}`);
    }
    
    try {
         const prod:  Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        }        
        const newProd = await store.create(prod);
        res.json(newProd);
        return
    } catch(err){
        res.status(400);
        res.json(err);
    }
}






const getProductByCategory = async (req: Request, res: Response) => {
    const products = await store.getProductByCategory((req.params.category as unknown) as string);
     res.json(products);
     
}



const productRoutes = (app: express.Application) => {
    app.get('/product', index);
    app.get('/product/:_id', show);
    app.post('/product', create);
    //TODO: routes for top 5 popular product
    app.get('/product/category/:category', getProductByCategory);
}


export default productRoutes;