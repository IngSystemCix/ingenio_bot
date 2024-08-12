import { Client, Events } from "discord.js";
import dotenv from 'dotenv';
import { TextColor } from "./utils/TextColor";
const client = new Client({intents: 53575421});

// Load .env file

dotenv.config();

// Register commands

client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isCommand()) return;
    
})

// Initialize bot

client.once(Events.ClientReady, () => {
    console.log(`${TextColor.colorize("✅ 200 OK: ", "fgGreen")} Logged in as ${TextColor.colorize(`${client.user?.username}`, "fgRed")}!`);
});

client.login(process.env.APP_TOKEN);