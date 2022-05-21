import dotenv from "dotenv";
import { Client, Intents } from "discord.js";
import join from "./utils/join.js";


dotenv.config({path: "./src/.env"});

const client = new Client({ intents: [
    "GUILDS",
    "GUILD_MESSAGES",
] })

const prefix = "-";

let connection = null;

client.on("messageCreate", async (msg) => {

    const [command, args] = msg.content.indexOf(" ")===-1 ? [msg.content,""] : [msg.content.substring(0,msg.content.indexOf(" ")), msg.content.substring(msg.content.indexOf(" ")+1)];
    
    if(command===`${prefix}play`){
        if(connection!==null){
            msg.reply("already in a voice channel disconnect first");
            return;
        }
        connection = join(msg);        
    }
    else if(command===`${prefix}disconnect`){
        connection?.destroy();
        msg?.channel?.send("leaf disconnected");
        connection = null;
    }
})


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.BOT_TOKEN);