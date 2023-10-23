const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('backend/db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
    function isAuthorized(req) {
        return req.rawHeaders.includes('Token');
    }

    if (isAuthorized(req)) {
        next()
    } else {
        res.sendStatus(401)
    }
})
server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running')
})
