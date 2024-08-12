import { Client, GatewayIntentBits } from "discord.js";
import dotenv from 'dotenv';
const client = new Client({intents: [GatewayIntentBits.Guilds]});

dotenv.config();

client.once('ready', () => {
    console.log(`${TextColor.colorize("✅ Start: ", "fgGreen")} Logged in as ${client.user?.tag}!`);
});

client.login(process.env.APP_TOKEN);