import dotenv from 'dotenv'
import Discord from 'discord.js'

dotenv.config()
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})
const token = process.env.TOKEN //?? token_key

const reg_channel = msg => {
  if (msg.message.channel.id === process.env.REG_CHN_ID) return true
  else return false
}

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

client.on('messageReactionAdd', async (react, user) => {
  // When we receive a reaction we check if the reaction is partial or not
  if (react.partial) {
    // If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
    try {
      await react.fetch()
    } catch (error) {
      console.error('Something went wrong when fetching the message: ', error)
      // Return as `reaction.message.author` may be undefined/null
      return
    }
  }

  if (react.message.channel.id == process.env.REG_CHN_ID) {
    if (react.message.id == process.env.SEM_1_ID) {
      console.log('1º SEMESTRE:')
      console.log(react.message.id)
      console.log('\n reaction:\n')
      console.log(react.emoji.name)
      if (react.emoji.name == '📐') console.log('sim :')
      const guildMember = react.message.guild.members.cache.get(user.id)
      if (!guildMember.roles.cache.get(process.env.ROLE_ELE)) {
        guildMember.roles.add(process.env.ROLE_ELE)
      }
    }
  }
})

client.on('messageReactionRemove', async (reaction, user) => {
  if (reaction.message.id === '731619243249893417') {
    //692177977705889845
    const guildMember = reaction.message.guild.members.cache.get(user.id)
    if (guildMember.roles.cache.get('692177977705889845')) {
      guildMember.roles.remove('692177977705889845')
    }
  }
})

client.login(token)
