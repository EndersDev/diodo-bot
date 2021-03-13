import dotenv from 'dotenv'

dotenv.config()

import express from 'express'

const server = express()
server.all('/', (req, res) => {
  res.send('working!!!')
})

const keepRunning = () =>
  server.listen(process.env.PORT || 3000, () => console.log('ready!!!'))

export default keepRunning
