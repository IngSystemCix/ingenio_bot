import { Client, Events } from "discord.js";
import dotenv from "dotenv";
import { TextColor } from "./utils/TextColor";
import fs from "fs";
const client = new Client({ intents: 53575421 });

// Load .env file

dotenv.config();

// Clear previous slash commands
client.once(Events.ClientReady, async () => {
  if (!client.application?.owner) await client.application?.fetch();
  await client.application?.commands.set([]);
  console.log(
    `${TextColor.colorize(
      "✅ 200 OK: ",
      "fgGreen"
    )} Cleared previous slash commands!`
  );
});

// Load commands

const commandFiles = new Map();

fs.readdirSync("./src/commands").forEach((folder) => {
  const commandFolder = fs
    .readdirSync(`./src/commands/${folder}`)
    .filter((file) => file.endsWith(".ts"));
  for (const file of commandFolder) {
    const command = require(`./commands/${folder}/${file}`);
    commandFiles.set(command.data.name, command);
  }
});

// Register commands

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commandFiles.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(
      `${TextColor.colorize(
        "❌ 500 Internal Server Error: ",
        "fgRed"
      )} ${error}`
    );
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

// Initialize bot

client.once(Events.ClientReady, () => {
  console.log(
    `${TextColor.colorize(
      "✅ 200 OK: ",
      "fgGreen"
    )} Logged in as ${TextColor.colorize(`${client.user?.username}`, "fgRed")}!`
  );
});

client.login(process.env.APP_TOKEN);
