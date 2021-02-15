const Discord = require('discord.js')
const client = new Discord.Client()

const token = 'ODA5OTMwOTkyMDk2NzcyMTM3.YCcRBA.FEFVQmb545f1-KRYQ8F6SdasCjI'

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
