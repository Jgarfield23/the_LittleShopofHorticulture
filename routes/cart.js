// skeleton code, parameters/model names subject to change

// need to add items selected by a user to a cart
// need to be able to remove items from the card
// need to move items to checkout for purchase

const router = require('express').Router();
const models = require('./models');

// this can be used to add items to a cart
router.post('/add', async (req, res) => {
    try {
        const cart = await getCart(req.user); // this would probably be declared in model
        cart.items.push({ id: itemId, quantity: quantity });
        await saveCart(cart); // this would probably be declared in model
        res.status(200).json(cart);
    } catch (err) {
        console.error(err);
        res.status(400).json(err)
    }
    
});