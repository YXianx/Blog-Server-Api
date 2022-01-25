const blogRouter = require('./blog')
const userRouter = require('./user')

const handleRoute = (app)=>{
    blogRouter(app)
    userRouter(app)
}

module.exports = handleRoute