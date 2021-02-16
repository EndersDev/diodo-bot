import dotenv from 'dotenv'
import Discord from 'discord.js'

dotenv.config()
const client = new Discord.Client()
const token = process.env.TOKEN //?? token_key

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === '!ping') {
    msg.reply('Pong!')
  }
})

client.on('message', msg => {
  if (msg.content === '!kengo') {
    msg.reply('Você')
  }
})

client.login(token)
