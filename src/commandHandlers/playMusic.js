import {Worker} from "node:worker_threads";
import { AudioPlayerStatus } from "@discordjs/voice";
import { Message, MessageEmbed } from "discord.js";
import AudioState from "../models/AudioState.js";
import handlePlay from "../utils/play.js";
import handleSearch from "../utils/search.js";
import disconnect from "./disconnect.js";

/**
 * @description pushes the reqested song to the songQueue sets the event listers for to handle idle state of the player 
 * @param {AudioState} audioState 
 * @param {Message} msg 
 * @param {string} args 
 */
const handlePlayMusic = async (audioState,msg,args) => {

    try {
        const {songQueue} = audioState;
        
        if(audioState?.player?.state?.status===AudioPlayerStatus.Playing){
            // uses a worker thread to search for songs when the main thread is playing a song
            const worker = new Worker("./src/threads/queueSong.js",{
                workerData: {args}
            });
            
            const queueMessageContent = new MessageEmbed();
            
            worker.on("exit", (code) => {      
                if(code!==0){
                    return;
                }
                msg?.channel?.send({embeds: [queueMessageContent]});
            })
            
            worker.on("message", (song) => {
                songQueue.push(song);
                queueMessageContent.setTitle(`Queued :-\n${song?.title}`).setColor("WHITE");
            })

            worker.on("error", (err) => {
                if(err.code === 400){
                    const songNotfoundMessage = new MessageEmbed();
                    songNotfoundMessage.setTitle("Song not found").setColor("WHITE");

                    msg?.channel?.send({embeds: [songNotfoundMessage]});
                    return;
                }
                const errMessageContent = new MessageEmbed();
                errMessageContent.setTitle("Something went wrong").setColor("WHITE");
                msg?.channel?.send({embeds: [errMessageContent]});
                disconnect(audioState,msg);
            })
        }else{
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
        }
                    
        if(audioState?.player?.state?.status===AudioPlayerStatus.Idle && songQueue.length!==0){
            handlePlay(audioState,msg);
    
            const handlePlayerIdle = () => {
                const currSong = songQueue.shift();
                audioState?.isLooping && songQueue.push(currSong);
                if(songQueue.length!==0){
                    handlePlay(audioState,msg);
                }else{
                    if(!audioState?.idleTimeoutId){

                        // setting the timeout to disconnect the bot due to inactivity.
                        audioState.idleTimeoutId = setTimeout(() => {
                            disconnect(audioState,msg);
                            const idleTimeoutMessage = new MessageEmbed();
                            idleTimeoutMessage.setTitle("due to inactivity").setColor("WHITE");
                            msg?.channel?.send({embeds: [idleTimeoutMessage]});
                        }, 1000*60*5);
                    }
                    audioState?.player?.off(AudioPlayerStatus.Idle,handlePlayerIdle);
                }
            }
    
            audioState.player.on(AudioPlayerStatus.Idle, handlePlayerIdle);
        }
    } catch (error) {
        disconnect(audioState,msg);
        console.log(error.message);
    }

}

export default handlePlayMusic;