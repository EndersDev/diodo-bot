import dotenv from 'dotenv'
import Discord from 'discord.js'
import { verifySem } from './materias.js'

dotenv.config()
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})
const token = process.env.TOKEN //?? token_key

/* const reg_channel = msg => {
  if (msg.message.channel.id === process.env.REG_CHN_ID) return true
  else return false
} */

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

//ping pong
client.on('message', msg => {
  if (msg.content === '!ping') {
    msg.reply('Pong!')
  }
})

//kengo vc
client.on('message', msg => {
  if (msg.content === '!kengo') {
    msg.reply('Você')
  }
})

//delicinha
client.on('message', msg => {
  if (msg.content === '!delicinha') {
    msg.reply('Você é com certeza')
  }
})

//
client.on('messageReactionAdd', async (react, user) => {
  let Atualmember = react.message.guild.members.cache.get(user.id)
  let Atualchannel = react.message.channel
  // recebemos uma reação e verificamos se é parcial
  if (react.partial) {
    // se a mensagem da reação foi apagada resolvemos o erro
    try {
      await react.fetch()
    } catch (error) {
      console.error('Something went wrong when fetching the message: ', error)
      // Return as `reaction.message.author` may be undefined/null
      return
    }
  }
  //se a mensagem foi no canal Registro verifica o semestre
  if (Atualchannel.id == process.env.REG_CHN_ID) {
    /* let materiaCanal = react.message.guild.channels.cache.find(chn =>
      chn.name.includes(`${react.emoji.name}`)
    )
    console.log(materiaCanal.name) */
    //console.log(Atualmember.permissions.toArray())
    verifySem({
      usuario: react.message.guild.members.cache.get(user.id),
      semestre: react.message.id,
      materia: [
        react.emoji.name,
        react.message.guild.channels.cache.find(chn =>
          chn.name.includes(`${react.emoji.name}`)
        )
      ],
      addRemove: true
    })
    if (!Atualmember.roles.cache.get(process.env.ROLE_ELE)) {
      Atualmember.roles.add(process.env.ROLE_ELE)
    }
  }
})

/* client.on('messageReactionRemove', async (react, user) => {
  let Atualmember = react.message.guild.members.cache.get(user.id)
  let Atualchannel = react.message.channel
  // recebemos uma reação e verificamos se é parcial
  if (react.partial) {
    // se a mensagem da reação foi apagada resolvemos o erro
    try {
      await react.fetch()
    } catch (error) {
      console.error('Something went wrong when fetching the message: ', error)
      // Return as `reaction.message.author` may be undefined/null
      return
    }
  }
  //se a mensagem foi no canal Registro verifica o semestre
  if (Atualchannel.id == process.env.REG_CHN_ID) {
    //console.log(Atualmember.permissions.toArray())
    verifySem({
      usuario: react.message.guild.members.cache.get(user.id),
      semestre: react.message.id,
      materia: [
        react.emoji.name,
        react.message.guild.channels.cache.find(
          chn => chn.name === `${react.emoji.name}`
        )
      ],
      addRemove: false
    })
    if (!Atualmember.roles.cache.get(process.env.ROLE_ELE)) {
      guildMember.roles.add(process.env.ROLE_ELE)
    }
  }
}) */

/* client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.id === '731619243249893417') {
    //692177977705889845    role id
    const guildMember = reaction.message.guild.members.cache.get(user.id)
    if (guildMember.roles.cache.get('692177977705889845')) {
      guildMember.roles.remove('692177977705889845')
    }
  }
}) */

client.login(token)
