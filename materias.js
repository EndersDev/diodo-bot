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

export const verifySem = ({
  usuario,
  semestre,
  materias,
  arNum,
  addRemove
}) => {
  if (
    semestre ===
    (process.env.SEM_1_ID ||
      process.env.SEM_2_ID ||
      process.env.SEM_3_ID ||
      process.env.SEM_4_ID ||
      process.env.SEM_5_ID ||
      process.env.SEM_6_ID ||
      process.env.SEM_OPT_ID)
  ) {
    let perm = userFlags.reduce(
      (obj, item) => ((obj[item] = addRemove), obj),
      {}
    )

    console.log(perm)
    //if (t.length > 1) console.log('\n array:', t[2].name)
    //else console.log('\n array:', t[0].name)

    for (let i in materias) {
      console.log(`[${i}]:${materias[i].name}`)
    }

    console.log(`indice: ${arNum}`)
    console.log(`user: ${usuario}`)

    materias[arNum].updateOverwrite(usuario, perm)
  }
}
