import express from "express";
import routes from "./routes/index.mjs";

const app = express();
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`)
    next();
})

app.get('/', (req, res) => {
    res.status(201).send({msg : "hello"})
})

app.listen(PORT, () => console.log(`run expess on server port ${PORT}`))



