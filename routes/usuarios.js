const {Router} = require('express')

const route = Router() 

route.get('/', (req, res) => {
    res.json({
        msg: 'API GET'
    })
})

route.post('/', (req, res) => {
    res.json({
        msg: 'API POST'
    })
})

route.put('/', (req, res) => {
    res.json({
        msg: 'API PUT'
    })
})

route.delete('/', (req, res) => {
    res.json({
        msg: 'API DELETE'
    })
})

module.exports = route