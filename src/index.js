import dotenv from "dotenv";
import { Client, Intents } from "discord.js";
import handleJoin from "./utils/join.js";
import handlePlay from "./utils/play.js";
import { AudioPlayerStatus } from "@discordjs/voice";
import handleSearch from "./utils/search.js";


dotenv.config({path: "./src/.env"});

const client = new Client({ intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES",
] })

const prefix = "-";

let audioState = null;
let songQueue = [];

client.on("messageCreate", async (msg) => {

    try {
        const [command, args] = msg.content.indexOf(" ")===-1 ? [msg.content,""] : [msg.content.substring(0,msg.content.indexOf(" ")), msg.content.substring(msg.content.indexOf(" ")+1).trim()];
    
        if(command===`${prefix}play`){
            if(audioState===null){
                audioState = handleJoin(msg);        
            }
    
            const song = await handleSearch(args);
            songQueue.push(song);
                        
            if(audioState?.player?.state?.status===AudioPlayerStatus.Idle && songQueue.length!==0){
                handlePlay(songQueue,audioState.player,msg);

                const handlePlayerIdle = () => {
                    songQueue.shift();
                    if(songQueue.length!==0){
                        handlePlay(songQueue,audioState.player,msg);
                    }else{
                        audioState.player.off(AudioPlayerStatus.Idle,handlePlayerIdle);
                    }
                }

                audioState.player.on(AudioPlayerStatus.Idle, handlePlayerIdle);
            }
        }
        else if(command===`${prefix}disconnect`){
            audioState.player.stop();
            audioState.connection?.destroy();
            audioState = null;
            songQueue = [];
            msg?.channel?.send("leaf disconnected");
        }
        
    } catch (error) {
        console.log(error.message);
    }

})


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.BOT_TOKEN);