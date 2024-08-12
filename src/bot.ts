import {
  Client,
  Events,
  ActivityType,
  PresenceUpdateStatus,
  REST,
  Routes,
} from "discord.js";
import dotenv from "dotenv";
import { TextColor } from "./utils/TextColor";
import fs from "fs";
import path from "path";

// Load .env file
dotenv.config();

const appToken = process.env.APP_TOKEN;
const appId = process.env.APP_ID;
const serverId = process.env.SERVER_ID;
if (!appToken) {
  throw new Error("APP_TOKEN environment variable is not defined.");
}
if (!appId) {
  throw new Error("APP_ID environment variable is not defined.");
}
if (!serverId) {
  throw new Error("SERVER_ID environment variable is not defined.");
}

const client = new Client({
  intents: 53575421,
  presence: {
    activities: [
      { name: "🛠 working on the server", type: ActivityType.Custom },
    ],
    status: PresenceUpdateStatus.Online,
  },
});

// Function to recursively find all command files
function getCommandFiles(dir: string): string[] {
  let files: string[] = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files = files.concat(getCommandFiles(fullPath));
    } else if (item.isFile() && fullPath.endsWith(".ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Register commands

const commands: any[] = [];
const commandFiles = getCommandFiles(path.join(__dirname, "commands"));

for (const file of commandFiles) {
  const command = require(file);
  commands.push(command.default.data.toJSON());
}

const rest = new REST().setToken(appToken);
const slashCommands = async () => {
  try {
    await rest.put(Routes.applicationGuildCommands(appId, serverId), {
      body: commands,
    });
    console.log(
      `${TextColor.colorize(
        "✅ 200 OK: ",
        "fgGreen"
      )} Registered slash commands.`
    );
  } catch (error) {
    console.error(`${TextColor.colorize("❌ Error: ", "fgRed")} ${error}`);
  }
};

slashCommands();

// Execute commands

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.find((cmd) => cmd.name === interaction.commandName);

  if (command) {
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);
      await interaction.reply({
        content: "There was an error executing this command.",
        ephemeral: true,
      });
    }
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

client.login(appToken);
