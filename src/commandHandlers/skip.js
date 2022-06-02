import { Message, MessageEmbed } from "discord.js";
import AudioState from "../models/AudioState.js";
import handlePlay from "../utils/play.js";

/**
 * @description skips the current song and plays the next song from the songQueue if it is not empty
 * @param {AudioState} audioState
 * @param {Message} msg 
 */
const handleSkip = (audioState,msg) => {

    const {player, songQueue, isLooping} = audioState;

    if(songQueue.length===0) return;

    const skipMessage = new MessageEmbed();
    skipMessage.setTitle("Skiped :-").setDescription(songQueue[0].title).setColor("WHITE");

    const currSong = songQueue.shift();
    isLooping && songQueue.push(currSong);
    if(songQueue.length!==0){

        handlePlay(audioState,msg);
    }else{
        player?.stop();

        const queueEndMessage = new MessageEmbed();

        queueEndMessage.setTitle("End of queue").setColor("WHITE");
        msg?.channel?.send({embeds: [queueEndMessage]});
    }
}

export default handleSkip;