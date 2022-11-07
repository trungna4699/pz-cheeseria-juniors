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

// Get cheeses details
router.get('/api/cheeses', (req, res, next) => {
    res.json(cheeses);
});

// Send and store purchased orders
router.post('/api/purchases', jsonParser, (req, res, next) => {
    purchasedItems.push(req.body);
    console.log(purchasedItems);
});

// Get recent purchases
router.get('/api/purchases', (req, res, next) => {
    res.json(purchasedItems);
});

export default router;