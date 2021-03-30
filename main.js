import Discord from 'discord.js'
import keepRunning from './serve.js'
import emojiToChn from './emojiToChn.js'

const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
}) // coisas que o bot irá mecher

const token = process.env.TOKEN //?? token_key

/* const reg_channel = msg => {
  if (msg.message.channel.id === process.env.REG_CHN_ID) return true
  else return false
} */

//on LOGIN
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

//EVENTS
client.on('message', async (msg) => {
  if (msg.content === '!ping') {
    msg.reply('Pong!')
  }
})

client.on('message', async (msg) => {
  if (msg.content === '!kengo') {
    msg.reply('Você')
  }
})

client.on('message', async (msg) => {
  if (msg.content === '!delicinha') {
    msg.reply('Você é com certeza')
  }
})

//
client.on('messageReactionAdd', async (react, user) => {
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

  await emojiToChn({ service: true, react: react, user: user }).catch(
    (error) => {
      react.message
        .reply(
          `não foi possivel executar. \n comando: addReaction \n error: ${error}`
        )
        .then((msg) => setTimeout(() => msg.delete(), 5000))
    }
  )
})

client.on('messageReactionRemove', async (react, user) => {
  await emojiToChn({ service: false, react: react, user: user }).catch(
    (error) => {
      react.message
        .reply(
          `não foi possivel executar. \n comando: removeReaction \n error: ${error}`
        )
        .then((msg) => setTimeout(() => msg.delete(), 5000))
    }
  )
})

client.on('guildMemberAdd', async (member) => {
  await welcomeBye({
    service: true,
    member: member,
    client: client
  })
})

client.on('guildMemberRemove', async (member) => {
  await welcomeBye({
    service: false,
    member: member,
    client: client
  })
})

keepRunning()
client.login(token)
