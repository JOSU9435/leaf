import { Message, MessageEmbed } from "discord.js";
import AudioState from "../models/AudioState.js";

/**
 * @description makes the isLooping flag true to enable the looping of the songQueue
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