import { Message, MessageEmbed } from "discord.js";
import AudioState from "../models/AudioState.js";

/**
 * 
 * @param {AudioState} audioState 
 * @param {Message} msg 
 */
const handleLoop = (audioState,msg) => {

    if(audioState?.isLooping) return;

    audioState.isLooping = true;

    const loopingMessage = new MessageEmbed();
    loopingMessage.setTitle("Looping").setColor("WHITE");

    msg?.channel?.send({embeds: [loopingMessage]});
}

export default handleLoop;