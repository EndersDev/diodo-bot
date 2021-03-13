import dotenv from 'dotenv'
import Discord from 'discord.js'
import { verifySem } from './materias.js'
import keepRunning from './serve.js'

dotenv.config()
const client = new Discord.Client({
  partials: ['MESSAGE', 'CHANNEL', 'REACTION']
})

const token = process.env.TOKEN //?? token_key

const emojiToClass = async ({ AR, react, user }) => {
  let atualMember = react.message.guild.members.cache.get(user.id)
  let Atualchannel = react.message.channel
  let semestre = react.message.id
  let emoji = react.emoji.name
  //se a mensagem foi no canal Registro verifica o semestre
  if (Atualchannel.id == process.env.REG_CHN_ID) {
    /* console.log('1º SEMESTRE:')
        console.log(semestre)
        console.log('\n reaction:')
        console.log(materia[0]) //if (emoji == '📐') console.log('sim :') 
    
    let materiaCanal = react.message.guild.channels.cache.find(chn =>
      chn.name.includes(`${emoji}`)
    )

    console.log(materiaCanal.name)
    if (t.length > 1) console.log('\n array:', t[2].name)
    else console.log('\n array:', t[0].name) */

    let buscaChn = react.message.guild.channels.cache
      .filter(chn => chn.name.includes(`${emoji}`))
      .array()

    let num = 0

    if (emoji == '📐') {
      if (semestre == process.env.SEM_2_ID) num = 0
      if (semestre == process.env.SEM_1_ID) num = 2
      if (semestre == process.env.SEM_3_ID) num = 1
    }

    if (emoji == '📏') {
      if (semestre == process.env.SEM_3_ID) num = 0
      if (semestre == process.env.SEM_1_ID) num = 1
    }

    console.log(`materia id:${semestre} \n emoji:${emoji}`)

    verifySem({
      usuario: react.message.guild.members.cache.get(user.id),
      semestre: semestre,
      materias: buscaChn,
      arNum: num,
      addRemove: AR
    })
    if (!atualMember.roles.cache.get(process.env.ROLE_ELE)) {
      atualMember.roles.add(process.env.ROLE_ELE)
    }
  }
}

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

  await emojiToClass({ AR: true, react: react, user: user }).catch(error => {
    react.message
      .reply(
        `não foi possivel executar. \n comando: addReaction \n error: ${error}`
      )
      .then(msg => setTimeout(() => msg.delete(), 5000))
  })
})

client.on('messageReactionRemove', async (react, user) => {
  emojiToClass({ AR: false, react: react, user: user })
})

keepRunning()
client.login(token)
