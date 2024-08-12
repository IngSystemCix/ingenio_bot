import { SlashCommandBuilder } from "discord.js";
import { EmbedBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Displays help information."),
  async execute(interaction: {
    member: any;
    reply: (arg0: { embeds: EmbedBuilder[] }) => any;
  }) {
    const allowedRoles = ["founder", "admin", "moderator"];

    const hasRole = interaction.member.roles.cache.some(
      (role: { name: string }) => allowedRoles.includes(role.name)
    );

    if (!hasRole) {
      return await interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle("❌ Error")
            .setDescription("You do not have permission to use this command!")
            .setColor(0xff0000)
            .setTimestamp(Date.now()),
        ],
      });
    }

    const embed = new EmbedBuilder()
      .setTitle("Help")
      .setDescription("This is a help command!")
      .setColor(0x3fa2f6)
      .setTimestamp(Date.now())
      .addFields(
        {
          name: "Command /help",
          value: "Displays help information.",
          inline: true,
        },
        {
          name: "Command /mute <user> <time>",
          value: "Mutes a user.",
          inline: true,
        },
        {
          name: "Command /unmute <user>",
          value: "Unmutes a user.",
          inline: true,
        }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
