const { 
  Client, GatewayIntentBits, 
  ButtonBuilder, ButtonStyle, 
  ActionRowBuilder, Events, 
  ChannelType, PermissionsBitField 
} = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let ticketCount = 0;

client.once('ready', () => {
  console.log('Bot đã online!');
});

client.on(Events.InteractionCreate, async interaction => {

  // Lệnh /panel
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === 'panel') {

      const button = new ButtonBuilder()
        .setCustomId('create_ticket')
        .setLabel('Tạo Ticket')
        .setStyle(ButtonStyle.Success);

      const row = new ActionRowBuilder().addComponents(button);

      await interaction.reply({
        content: 'Bấm nút để tạo đơn',
        components: [row]
      });
    }
  }

  // Khi bấm nút
  if (interaction.isButton()) {

    // 👉 TẠO TICKET
    if (interaction.customId === 'create_ticket') {

      const guild = interaction.guild;

const channel = await guild.channels.create({
  name: `don-${ticketCount}`,
        type: ChannelType.GuildText,
        permissionOverwrites: [
{
  id: guild.members.me.id,
  allow: [
    PermissionsBitField.Flags.ViewChannel,
    PermissionsBitField.Flags.SendMessages,
    PermissionsBitField.Flags.ReadMessageHistory,
  ],
},

          {
            id: guild.roles.everyone,
            deny: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: interaction.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
              PermissionsBitField.Flags.ReadMessageHistory,
            ],
          },
        ],
      });

ticketCount++;

      // 👉 NÚT XÓA ĐƠN
      const deleteBtn = new ButtonBuilder()
        .setCustomId('delete_channel')
        .setLabel('Xóa đơn')
        .setStyle(ButtonStyle.Danger);

      const row = new ActionRowBuilder().addComponents(deleteBtn);

      await channel.send({
        content: `Chào ${interaction.user}, đây là đơn của bạn!`,
        components: [row]
      });

      await interaction.reply({
        content: `Đã tạo ${channel}`,
        ephemeral: true
      });
    }

    // 👉 XÓA CHANNEL
    if (interaction.customId === 'delete_channel') {
      await interaction.reply({
        content: 'Đang xóa đơn...',
        ephemeral: true
      });

      setTimeout(() => {
        interaction.channel.delete();
      }, 2000);
    }
  }
});

// 👉 DÁN TOKEN CỦA BẠN VÀO ĐÂY
client.login('MTQ5Nzg5NDQ4OTkyNTIyNjU5Nw.GNU7tK.GAJLwo6Iphj1mMFaXoFLYxCqiz2EXxXYRZarC8');