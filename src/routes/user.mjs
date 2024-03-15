import { Router } from 'express';
import  { validationResult, matchedData, checkSchema } from "express-validator";
import { createUserValidationSchema, createUserValidationQuery } from '../utils/validationSchemas.mjs'
import  { mockUser } from '../utils/constants.mjs'
import { middlewareUserId } from '../utils/middleware.mjs'

const router = Router();



router.get('/', 
    checkSchema(createUserValidationQuery),
    (req, res) => {
        const result = validationResult(req)
        
        if(!result.isEmpty()) return res.status(400).send({ errors: result.array()});

        const { filter, value } = req.query

        if(filter && value) return res.send([
            mockUser.filter(u => u[filter].includes(value))
        ])
        return res.send(mockUser)
    }
)

router.post('/',
    checkSchema(createUserValidationSchema),

    (req, res) => {

        const result = validationResult(req)

        if (!result.isEmpty()) return res.status(400).send({errors: result.array()})

        const data = matchedData(req);

        const newUser = { id: mockUser[mockUser.length - 1].id + 1, ...data};
        mockUser.push(newUser);
        return res.status(201).send(newUser)
    }
)

router.get('/:id', middlewareUserId, (req, res) => {
    const { findIndex } = req;
    return res.send(mockUser[findIndex]);
})

router.put('/:id',
    checkSchema(createUserValidationSchema),
    middlewareUserId,
    (req, res) => {
        const { body, findIndex } = req;
        mockUser[findIndex] = {id: parseId, ...body};
        
        return res.sendStatus(200);
    }
)

router.delete('/:id', middlewareUserId, (req, res) => {
    const { findIndex } = req;
    mockUser.splice(findIndex, 1);
    return res.sendStatus(200);
})

export default router;