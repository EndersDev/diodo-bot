import dotenv from 'dotenv'
dotenv.config()
const userFlags = ['VIEW_CHANNEL', 'CONNECT', 'SPEAK']
//PERMISSIONS ARRAY
/* [
  'CREATE_INSTANT_INVITE', 'KICK_MEMBERS',
  'BAN_MEMBERS',           'ADMINISTRATOR',
  'MANAGE_CHANNELS',       'MANAGE_GUILD',
  'ADD_REACTIONS',         'VIEW_AUDIT_LOG',
  'PRIORITY_SPEAKER',      'STREAM',
  'VIEW_CHANNEL',          'SEND_MESSAGES',
  'SEND_TTS_MESSAGES',     'MANAGE_MESSAGES',
  'EMBED_LINKS',           'ATTACH_FILES',
  'READ_MESSAGE_HISTORY',  'MENTION_EVERYONE',
  'USE_EXTERNAL_EMOJIS',   'VIEW_GUILD_INSIGHTS',
  'CONNECT',               'SPEAK',
  'MUTE_MEMBERS',          'DEAFEN_MEMBERS',
  'MOVE_MEMBERS',          'USE_VAD',
  'CHANGE_NICKNAME',       'MANAGE_NICKNAMES',
  'MANAGE_ROLES',          'MANAGE_WEBHOOKS',
  'MANAGE_EMOJIS'
] */

export const verifySem = ({ usuario, semestre, materia, addRemove }) => {
  if (addRemove) {
    switch (semestre) {
      case process.env.SEM_1_ID:
        console.log('1º SEMESTRE:')
        console.log(semestre)
        console.log('\n reaction:')
        console.log(materia[0]) //if (react.emoji.name == '📐') console.log('sim :')
        let perm = userFlags.reduce(
          (obj, item) => ((obj[item] = addRemove), obj),
          {}
        )
        //console.log(perm)
        materia[1].updateOverwrite(usuario, perm)
        break

      case process.env.SEM_2_ID:
        break
      case process.env.SEM_3_ID:
        break
      case process.env.SEM_4_ID:
        break
      case process.env.SEM_5_ID:
        break
      case process.env.SEM_6_ID:
        break
      case process.env.SEM_OPT_ID:
        break
      default:
        break
    }
  } else {
    switch (semestre) {
      case process.env.SEM_1_ID:
        console.log('1º SEMESTRE:')
        console.log(semestre)
        console.log('\n reaction:')
        console.log(materia[0]) //if (react.emoji.name == '📐') console.log('sim :')
        verifyClass({ user: usuario, sem: 1, mat: materia[1], AR: addRemove })
        break

      case process.env.SEM_2_ID:
        break
      case process.env.SEM_3_ID:
        break
      case process.env.SEM_4_ID:
        break
      case process.env.SEM_5_ID:
        break
      case process.env.SEM_6_ID:
        break
      case process.env.SEM_OPT_ID:
        break
      default:
        break
    }
  }
}
