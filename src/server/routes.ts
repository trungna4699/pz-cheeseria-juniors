import * as express from 'express';

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

const purchasedItems: CartItemType[] = [];
// console.log("Items purchased here: " + purchasedItems)
// console.log(purchasedItems);

const cheeses = require('./data/cheeses.json');
const router = express.Router();

router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});

router.post('/api/purchases', (req, res, next) => {
    // console.log(req.body);
    purchasedItems.push(req.body);
    // console.log(purchasedItems);
    // res.sendStatus(200);
});

export default router;