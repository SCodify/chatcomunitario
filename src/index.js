const realTimeServer = require('./realTimeServer')
const app = require('./server')

const PORT = 3030

const httpServer = app.listen(PORT, ()=>{
  console.log(`server run on port ${PORT}`)
})

realTimeServer(httpServer )