import dotenv from 'dotenv'

dotenv.config()

const express = import('exxpress')()

express.all('/', (req, res) => {
  res.send('working!!!')
})

export default keepRunning = () =>
  express.listen(process.env.PORT ?? 3000, () => console.log('ready!!!'))
