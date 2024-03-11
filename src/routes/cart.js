const { Router } = require("express");

const router = Router();

const groceryList = [
    {
        item: "milk",
        C: 2
    },
    {
        item: "milk 2",
        quarity: 2
    },
    {
        item: "milk 3",
        quarity: 21
    },
]

router.get('/',
(req, res, next) => (req, res) => {
    res.send(groceryList)
})

router.get('/:item', (req, res) => {
    const { item } = req.params;
    const itemFind = groceryList.find(g => g.item == item);
    console.log(req.params.item);
    res.send(itemFind)
})

router.post('/', (req, res) => {
    console.log(req.body);
    groceryList.push(req.body);
    res.send(201);
})

module.exports = router;