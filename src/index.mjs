import express from "express";

import  { query, validationResult } from "express-validator";

const app = express();

const PORT = process.env.PORT || 3000;

const mockUser = [
    {
        id:1,
        name:"A",
        age: 8
    },
    {
        id:2,
        name:"A B",
        age: 10
    },
    {
        id:3,
        name:"BA",
        age: 9
    },
    {
        id:4,
        name:"GA",
        age: 39
    },
    {
        id:5,
        name:"GAew",
        age: 12
    },
    {
        id:6,
        name:"GAvdvd",
        age: 32
    },
    {
        id:7,
        name:"GAvdsvd",
        age: 83
    },
];

const middlewareUserId = (req, res, next) => {
    const { params : { id }} = req;
    const parseId = parseInt(id);
    if(isNaN(parseId)) return res.sendStatus(400);
    const findIndex = mockUser.findIndex(user => user.id == parseId);
    console.log(findIndex)

    if (findIndex === -1) return res.sendStatus(404);
    req.findIndex = findIndex;
    next();
}

app.use(express.json());
app.use(express.urlencoded())

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`)
    next();
})

app.get('/', (req, res) => {
    res.status(201).send({msg : "hello"})
})

app.get(
    '/api/user',
    query('filter').isString().notEmpty().isLength({ min:3, max:30 }),
    (req, res) => {
        const result = validationResult(req)
        console.log(result)
        const { filter, value } = req.query

        if(filter && value) return res.send([
            mockUser.filter(u => u[filter].includes(value))
        ])
        return res.send(mockUser)
    }
)

app.get('/api/user/:id', middlewareUserId, (req, res) => {
    const { findIndex } = req;
    return res.send(mockUser[findIndex]);
})

app.put('/api/user/:id', middlewareUserId, (req, res) => {
    const { body, findIndex } = req;
    mockUser[findIndex] = {id: parseId, ...body};
    
    return res.sendStatus(200);
})

app.delete('/api/user/:id', middlewareUserId, (req, res) => {
    const { findIndex } = req;
    return res.sendStatus(200);
})

app.listen(PORT, () => console.log(`run expess on server port ${PORT}`))



