import express from "express";
import routes from "./routes/index.mjs";
import cookieParser from "cookie-parser";
import session from "express-session";
import { mockUser } from "./utils/constants.mjs";

const app = express();


const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser('secret-hello'));
app.use(session({
    secret: 'the dev',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60 * 24,
    }
}))
app.use('/api', routes);


app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`)
    next();
})

app.get('/', (req, res) => {
    req.session.visited = true;
    res.cookie('hello', 'world', { maxAge: 60000 * 60 * 2, signed: true})
    res.status(201).send({msg : "hello"})
})

app.post('/api/auth', (req, res) => {
    const {
        body: { username, password }
    } = req;
    const findUser = mockUser.find(u => u.username === username)
    if(!findUser || findUser.password != password) return res.status(401).send({ msg: "BAD Credentials"});

    req.session.user = findUser;
    return res.status(200).send(findUser);
})

app.get('/api/auth/status', (req, res) => {
    req.sessionStore.get( req.sessionID, (err, session) => {
        console.log(session);
    })
    return req.session.user
    ? res.status(200).send(req.session.user)
    : res.status(401).send({ msg: "Not authenticated"});
})

app.post('/api/cart', (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    const  { body: item } = req;

    const  { cart } = req.session;

    if(cart) {
        cart.push(item);
    } else {
        req.session.cart = [item];
    }

    return res.status(201).send(item);

})

app.get('/api/cart', (req, res) => {
    if (!req.session.user) return res.sendStatus(401);
    return res.send(req.session.cart ?? []);
})

app.listen(PORT, () => console.log(`run expess on server port ${PORT}`))



