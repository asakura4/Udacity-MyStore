import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, UserStore } from '../models/user';

const store = new UserStore();
const token_secret: string = (process.env.TOKEN_SECRET as unknown) as string;


async function index(req: Request, res: Response){
    try {
        
        const authorizationHeader: string = (req.headers.authorization as unknown) as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, token_secret);
    }catch(err){
        console.log(err);
        res.status(401);
        res.json('Acess denied, invalid token');
    }
    
    const users = await store.index();
    res.json(users);
    
}

async function show(req: Request, res: Response){
    try {
        const authorizationHeader: string = (req.headers.authorization as unknown) as string;
        const token = authorizationHeader.split(' ')[1];
        jwt.verify(token, token_secret);
    }catch(err){
        res.status(401);
        res.json('Acess denied, invalid token');
    }
    
    const user = await store.show(req.params._id);
    res.json(user);
    
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
         const user:  User = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }        
        const newUser = await store.create(user);
        res.json(newUser);
        return;
    } catch(err){
        res.status(400);
        res.json(err);
    }
    
}


const userRoutes = (app: express.Application) =>{
    app.get('/user', index);
    app.get('/user/:_id', show);
    app.post('/user', create);
}


export default userRoutes;