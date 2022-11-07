import * as express from 'express';

const bodyParser = require('body-parser')

// create application/json parser
const jsonParser = bodyParser.json()

// Types
export type CartItemType = {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    title: string;
    amount: number;
  };

let purchasedItems: CartItemType[] = [];

const cheeses = require('./data/cheeses.json');
const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses);
});

router.post('/api/purchases', jsonParser, (req, res, next) => {
    purchasedItems.push(req.body);
    console.log("post received: ", purchasedItems);
});

router.get('/api/purchases', (req, res, next) => {
    console.log("getPurchases reached!!!");
    res.json(purchasedItems);
});

export default router;