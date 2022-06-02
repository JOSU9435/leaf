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