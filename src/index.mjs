import express from "express";


// const cart = require('./routes/cart')
// const user = require('./routes/user')

const app = express();

const PORT = process.env.PORT || 3000;

const mockUser = [
    {
        id:1,
        name:"A"
    },
    {
        id:2,
        name:"A B"
    },
    {
        id:3,
        name:"BA"
    },
    {
        id:4,
        name:"GA"
    },
    {
        id:5,
        name:"GAew"
    },
    {
        id:6,
        name:"GAvdvd"
    },
    {
        id:7,
        name:"GAvdsvd"
    },
];

app.use(express.json());
app.use(express.urlencoded())

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`)
    next();
})

// app.use('/api/v1/cart', cart);
// app.use('/api/v1/user', user);

app.get('/', (req, res) => {
    res.status(201).send({msg : "hello"})
})

app.get('/api/user', (req, res) => {
    console.log(req.query)
    const { filter, value } = req.query

    if(filter && value) return res.send([
        mockUser.filter(u => u[filter].includes(value))
    ])

    return res.send(mockUser)
})

app.get('/api/user/:id', (req, res) => {
    console.log(req.params)
    const parseId = parseInt(req.params.id);
    if(isNaN(parseId)) return res.status(400).send({ msg: 'Bad Request Invaild ID'});
    const findUser = mockUser.find(u => u.id === parseId)

    if(!findUser) return res.sendStatus(404);
    return res.send(findUser);
})

app.listen(PORT, () => console.log(`run expess on server port ${PORT}`))



