import { Message, MessageEmbed } from "discord.js";
import AudioState from "../models/AudioState.js";

/**
 * 
 * @param {AudioState} audioState 
 * @param {Message} msg 
 * @returns {boolean}
 * 
 * @description checks if the user is in the same channel as the bot if the user is in the same channel as the bot returns true otherwise false
 */
const authorityCheck = (audioState,msg) => {

    if(audioState?.connection?.joinConfig?.channelId === msg?.member?.voice?.channelId){
        return true;   
    }

    const notAuthoriseMessage = new MessageEmbed();
    
    notAuthoriseMessage.setTitle("You need to be in the same VC as the bot to use commands").setColor("WHITE");

    msg.reply({embeds: [notAuthoriseMessage]});

    return false;
}

export default authorityCheck;