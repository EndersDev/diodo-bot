export default welcomeBye = async ({ service, member, client }) => {
  let wc = client.guild.channel.cache.filter((chn) =>
    chn.name.includes(`boas-vindas`)
  )

  let wcMsg = new Discord.MessageEmbed()
    .setColor('#000')
    .setAuthor(member.user.tag, member.user.displayAvatarURL())

    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()

  if (service)
    wcMsg
      .setTitle(
        `${member.user}, Boas-Vindas á Comunidade de Microeletrônica do Discord. Atualmente contamos com ${member.guild.memberCount}`
      )
      .setDescription(`Boas vindas ao servidor`)
      .setImage(
        'https://i.pinimg.com/originals/c4/a7/3f/c4a73fb5afc450cb3ecd2325c7c46af6.gif'
      )
  else
    wcMsg
      .setTitle(`Já vai cedo?`)
      .setDescription(`Boas vindas ao servidor`)
      .setImage(
        'https://media.tenor.com/images/8707d23ba08a43c6add9a3a2036fa581/tenor.gif'
      )

  await wc.send(wcMsg)
}
