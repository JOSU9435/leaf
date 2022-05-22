import { Message, MessageEmbed } from "discord.js";
import AudioState from "../models/AudioState.js";
import Song from "../models/Song.js";
import handlePlay from "../utils/play.js";

/**
 * @param {AudioState} audioState
 * @param {Array<Song>} songQueue 
 * @param {Message} msg 
 */
const handleSkip = (audioState,songQueue,msg) => {

    if(songQueue.length===0) return;

    const skipMessage = new MessageEmbed();
    skipMessage.setTitle("Skiped :-").setDescription(songQueue[0].title).setColor("WHITE");

    songQueue.shift();
    if(songQueue.length!==0){

        handlePlay(songQueue,audioState,msg);
    }else{
        audioState.player.stop();
        const queueEndMessage = new MessageEmbed();

        queueEndMessage.setTitle("End of queue").setColor("WHITE");
        msg?.channel?.send({embeds: [queueEndMessage]});
    }
}

export default handleSkip;