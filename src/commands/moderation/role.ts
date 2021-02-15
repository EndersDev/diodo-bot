import {
  botID,
  higherRolePosition,
  highestRole,
  Role,
  Member
} from '../../../deps.ts'
import { PermissionLevels } from '../../types/commands.ts'
import { createCommand } from '../../utils/helpers.ts'

createCommand({
  name: 'cargo',
  aliases: [],
  dmOnly: false,
  guildOnly: true,
  nsfw: false,
  permissionLevels: [
    PermissionLevels.ADMIN,
    PermissionLevels.MODERATOR,
    PermissionLevels.SERVER_OWNER
  ],
  botServerPermissions: ['MANAGE_ROLES'],
  botChannelPermissions: ['SEND_MESSAGES'],
  userServerPermissions: [],
  userChannelPermissions: [],
  description: 'adms or moderators can assign the roles of the members',
  cooldown: {
    seconds: 60,
    allowedUses: 0
  },
  arguments: [
    {
      name: 'Membro/Member',
      type: 'member',
      missing: message =>
        message.reply(`Membro esta faltando/Member is missing`)
    },
    {
      name: 'Cargo/role',
      type: 'role',
      missing: message =>
        message.reply(`Esta falndo o crago para dar/Is missing a role to give.`)
    }
  ],
  execute: async (message, args, guild) => {
    // If this was the everyone role alert with a silly error
    if (args.role.id === message.guildID) {
      return message.reply(
        'O cargo @everyone não pode ser dado a todos(porque ja é de todos)./The everyone role can not be given to anyone (because its already given to everyone).'
      )
    }
    // If this is a managed role(some bots role) we can't give/remove alert with silly error
    if (args.role.managed) {
      return message.reply(
        "Dammit man, just 'cause I'm Scottish doesn't mean I can give your people managed roles."
      )
    }

    // Get the bots highest role
    const botsHighestRole = await highestRole(message.guildID, botID)

    // Check if the bot has a role higher than the role that it will try to give. If the role is too high alert the user.
    if (
      !botsHighestRole ||
      !(await higherRolePosition(
        message.guildID,
        botsHighestRole.id,
        args.role.id
      ))
    ) {
      return message.reply(
        "Okay look, asking me give a role that is higher than my highest role is ridiculous! I am the first bot to admit I don't know who these people are nor do I care to. Look, if you'd like I could take you down the hall and just point at the people who annoy me more than the rest. But that's about as useful as I get."
      )
    }

    // Check the command author's highest role
    const membersHighestRole = await highestRole(
      message.guildID,
      message.author.id
    )

    // If the author does not have a role high enough to give this role alert
    if (
      !membersHighestRole ||
      !(await higherRolePosition(
        message.guildID,
        membersHighestRole.id,
        args.role.id
      ))
    ) {
      return message.reply(
        'In my culture, whenever someone tries to give a role that is higher than their highest role, I would be well within my rights to dismember you.'
      )
    }

    // If the user has this role already we should remove it
    if (
      message.member?.guilds.get(message.guildID)?.roles.includes(args.role.id)
    ) {
      message.member.removeRole(
        message.guildID,
        args.role.id,
        `${message.author.username} used the role command to remove this role.`
      )
      // Alert the user that used the command that the user has lost the role.
      return message.reply(
        `The role **${args.role.name}** has been removed from **${args.member.tag}**.`
      )
    }

    // Add the role to the user.
    message.member?.addRole(
      message.guildID,
      args.role.id,
      `${message.author.username} used the role command to give this role.`
    )

    // Alert the user that used the command that the user has been give the role.
    return message.reply(
      `The role **${args.role.name}** has been added to **${args.member.tag}**.`
    )
  }
})

interface RoleArgs {
  role: Role
  member: Member
}
