import { Message, MessageEmbed } from "discord.js";
import Song from "../models/Song.js";

/**
 * 
 * @param {Message} msg 
 * @param {Array<Song>} songQueue 
 */
const handleQueue = (msg,songQueue) => {
    const queueMessageContent = new MessageEmbed();
    
    let descriptionStr = "";
    
    songQueue.forEach((elem,idx) => {
        descriptionStr+=`**${idx+1}.** ${elem.title}\n`;
    });
    
    queueMessageContent.setTitle("Queue").setColor("WHITE").setDescription(descriptionStr);

    msg?.channel?.send({embeds: [queueMessageContent]});
}

export default handleQueue;