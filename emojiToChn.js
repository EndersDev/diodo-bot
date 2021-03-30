import { SEM, CHNS, ROLE } from './id.js'
import userPermissions from './userPermissions.js'

const userFlags = [
  userPermissions[10],
  userPermissions[20],
  userPermissions[21]
]

const emojiToChn = async ({ service, react, user }) => {
  //informações
  let reactUser = react.message.guild.members.cache.get(user.id)
  let reactChannel = react.message.channel
  let semestre = react.message.id
  let emoji = react.emoji.name
  let semNum = 0
  //verifica se foi reagido em uma das mensagens e no canal certo
  if (!reactChannel.id === CHNS.REG) {
    return new Error('canal errado reagido')
  }

  for (let [i, s] in SEM) {
    if (s === semestre) {
      semNum = i + 1
      break
    } else if (s === SEM[SEM.length - 1]) {
      return new Error('nenhum semestre reagido')
    }
  }

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

  //busca canal com o emoji da reação
  let targetChannels = react.message.guild.channels.cache
    .filter(chn => chn.name.includes(`${emoji}`))
    .array()

  // no caso do canal ser de calculo, verifica qual calculo, não-calculo =0
  let num = 0
  if (emoji == '📐') {
    if (semestre == SEM[2 - 1]) num = 0
    if (semestre == SEM[1 - 1]) num = 2
    if (semestre == SEM[3 - 1]) num = 1
  }
  if (emoji == '📏') {
    if (semestre == SEM[3 - 1]) num = 0
    if (semestre == SEM[1 - 1]) num = 1
  }

  console.log(`semestre:${semNum} \n emoji:${emoji}`)

  let perm = userFlags.reduce((obj, item) => ((obj[item] = service), obj), {})

  console.log(perm)
  //if (t.length > 1) console.log('\n array:', t[2].name)
  //else console.log('\n array:', t[0].name)

  for (let t in targetChannels) {
    console.log(`[${t}]:${targetChannels[t].name}`)
  }

  console.log(`indice: ${num}`)
  console.log(`user: ${reactUser}`)

  targetChannels[num].updateOverwrite(reactUser, perm)

  //add role
  if (service) {
    if (!reactUser.roles.cache.find(role => role.name)) {
      reactUser.roles.add(ROLE.ELE).catch(console.error)
    }
  }
}

export default emojiToChn
