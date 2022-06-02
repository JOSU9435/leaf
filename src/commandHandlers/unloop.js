import { Message, MessageEmbed } from "discord.js";
import AudioState from "../models/AudioState.js";

/**
 * @description makes the isLooping flag false to disable looping of the songQueue
 * @param {AudioState} audioState 
 * @param {Message} msg 
 */
const handleUnLoop = (audioState,msg) => {
    
    if(!audioState?.isLooping) return;

    audioState.isLooping = false;

    const unLoopingMessage = new MessageEmbed();
    unLoopingMessage.setTitle("Not Looping").setColor("WHITE");

    msg?.channel?.send({embeds: [unLoopingMessage]});
}

export default handleUnLoop;