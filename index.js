const next = require('next');
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const dev = process.env.NODE_ENV !== 'production'

const nxt = next({
    dev
})
const handle = nxt.getRequestHandler()

nxt.prepare().then(() => {
    const app = express()
    app.use(cors());
    app.disable('x-powered-by')
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.get('*', (req, res) => {
        return handle(req, res)

    })

    const port = process.env.PORT || 8000;

    app.listen(process.env.PORT || 8000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:' + port)
    })
    

 }).catch(err => {
    console.log(err)
    process.exit(1)
})