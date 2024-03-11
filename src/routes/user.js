const  { Router } = require('express')

const router = Router()

const users = [
    {
        name: "nguyen an",
    },
    {
        name: "nguyen an tien",
    },
    {
        name: "nguyen an xuan",
    },
]

router.get('/', (req, res) => {
    res.send(users)
})

module.exports = router