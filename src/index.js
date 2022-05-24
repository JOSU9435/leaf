import dotenv from "dotenv";
import { Client, Intents, MessageEmbed } from "discord.js";
import handleJoin from "./utils/join.js";
import handlePlay from "./utils/play.js";
import { AudioPlayerStatus, VoiceConnectionStatus } from "@discordjs/voice";
import handleSearch from "./utils/search.js";
import disconnect from "./commandHandlers/disconnect.js";
import handleQueue from "./commandHandlers/queue.js";
import handleSkip from "./commandHandlers/skip.js";
import handlePause from "./commandHandlers/pause.js";
import handleResume from "./commandHandlers/resume.js";
import handleHelp from "./commandHandlers/help.js";


dotenv.config({path: "./src/.env"});

const client = new Client({ intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_VOICE_STATES",
] })

const prefix = "-";

const audioStateMap = new Map();

client.on("messageCreate", async (msg) => {

    try {

        let audioState = audioStateMap.get(msg.guildId);

        const [command, args] = msg.content.indexOf(" ")===-1 ? [msg.content,""] : [msg.content.substring(0,msg.content.indexOf(" ")), msg.content.substring(msg.content.indexOf(" ")+1).trim()];
    
        if(command===`${prefix}play` || command===`${prefix}p`){
            if(!audioState?.connection){
                audioState = handleJoin(msg);
                
                if(!audioState?.connection) return;
            }
    
            const song = await handleSearch(args);

            const {songQueue} = audioState;

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
                handlePlay(audioState,msg);

                const handlePlayerIdle = () => {
                    songQueue.shift();
                    if(songQueue.length!==0){
                        handlePlay(audioState,msg);
                    }else{
                        audioState.player.off(AudioPlayerStatus.Idle,handlePlayerIdle);
                    }
                }

                audioState.player.on(AudioPlayerStatus.Idle, handlePlayerIdle);
            }
        }
        else if(command===`${prefix}help` || command===`${prefix}h`){
            handleHelp(msg);
        }
        else if(audioState?.connection?.state?.status !== VoiceConnectionStatus.Ready){
            return;
        }
        else if(command===`${prefix}queue` || command===`${prefix}q`){

            handleQueue(msg,audioState?.songQueue);
        }
        else if(command===`${prefix}skip` || command===`${prefix}next` || command===`${prefix}n`){
            
            handleSkip(audioState,msg);
        }
        else if(command===`${prefix}pause`){
            handlePause(audioState,msg);
        }
        else if(command===`${prefix}resume` || command===`${prefix}unpause`){
            handleResume(audioState,msg);
        }
        else if(command===`${prefix}disconnect` || command===`${prefix}dc`){

            disconnect(audioState,msg);
        }
        
        audioStateMap.set(msg.guildId,audioState);

    } catch (error) {
        console.log(error.message);
    }

})

client.on('ready', async () => {
    const guilds = await client.guilds.fetch();

    guilds.forEach((val,key) => {
        audioStateMap.set(key,{});
    })

    console.log(`Logged in as ${client.user.tag}!`);
});
client.login(process.env.BOT_TOKEN);