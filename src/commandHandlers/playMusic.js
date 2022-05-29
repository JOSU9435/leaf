import { AudioPlayerStatus } from "@discordjs/voice";
import { Message, MessageEmbed } from "discord.js";
import AudioState from "../models/AudioState.js";
import handlePlay from "../utils/play.js";
import handleSearch from "../utils/search.js";

/**
 * 
 * @param {AudioState} audioState 
 * @param {Message} msg 
 * @param {string} args 
 */
const handlePlayMusic = async (audioState,msg,args) => {

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
                audioState.player.off(AudioPlayerStatus.Idle,handlePlayerIdle);
            }
        }

        audioState.player.on(AudioPlayerStatus.Idle, handlePlayerIdle);
    }
}

export default handlePlayMusic;