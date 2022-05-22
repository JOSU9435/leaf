import dotenv from "dotenv";
import { Client, Intents, MessageEmbed } from "discord.js";
import handleJoin from "./utils/join.js";
import handlePlay from "./utils/play.js";
import { AudioPlayerStatus } from "@discordjs/voice";
import handleSearch from "./utils/search.js";
import disconnect from "./utils/disconnect.js";
import handleQueue from "./commandHandlers/queue.js";


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
                
                if(!audioState) return;
            }
    
            const song = await handleSearch(args);

            if(!song){
                const songNotfoundMessage = new MessageEmbed();
                songNotfoundMessage.setTitle("Song not found").setColor("WHITE");

                msg?.channel?.send({embeds: [songNotfoundMessage]});

                return;
            }

            songQueue.push(song);

            const queueMessageContent = new MessageEmbed();
            queueMessageContent.setTitle(`Queued :-\n${song.title}`).setColor("WHITE");

            msg?.channel?.send({embeds: [queueMessageContent]});
                        
            if(audioState?.player?.state?.status===AudioPlayerStatus.Idle && songQueue.length!==0){
                handlePlay(songQueue,audioState,msg);

                const handlePlayerIdle = () => {
                    songQueue.shift();
                    if(songQueue.length!==0){
                        handlePlay(songQueue,audioState,msg);
                    }else{
                        audioState.player.off(AudioPlayerStatus.Idle,handlePlayerIdle);
                    }
                }

                audioState.player.on(AudioPlayerStatus.Idle, handlePlayerIdle);
            }
        }
        else if(command===`${prefix}queue` || command===`${prefix}q`){

            // const queueMessageContent = new MessageEmbed();
            
            // let descriptionStr = "";
            
            // songQueue.forEach((elem,idx) => {
            //     descriptionStr+=`**${idx+1}.** ${elem.title}\n`;
            // });
            
            // queueMessageContent.setTitle("Queue").setColor("WHITE").setDescription(descriptionStr);

            // msg?.channel?.send({embeds: [queueMessageContent]});
            
            handleQueue(msg,songQueue);
        }
        else if(command===`${prefix}skip` || command===`${prefix}next` || command===`${prefix}n`){
            
        }
        else if(command===`${prefix}disconnect`){

            disconnect(audioState,songQueue,msg);
        }
        
    } catch (error) {
        console.log(error.message);
    }

})

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.BOT_TOKEN);