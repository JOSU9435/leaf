import { Message, MessageEmbed } from "discord.js"
import AudioState from "../models/AudioState.js";
/**
 * @description destroys the connection from the voice channel, stops the audio player and clears the songQueue
 * @param {AudioState} audioState 
 * @param {Message} msg 
 */

const disconnect = (audioState, msg) => {

    const {connection, player, songQueue} = audioState;

    if(audioState?.idleTimeoutId){
        clearTimeout(audioState?.idleTimeoutId);
        audioState.idleTimeoutId=null;
    }

    player?.stop();
    connection?.destroy();
    delete audioState?.connection;
    delete audioState?.player;
    
    const queueSize = songQueue.length;

    for(let i=0;i<queueSize;i++) songQueue.shift();

    const disconnectMessageContent = new MessageEmbed();
    disconnectMessageContent.setTitle("Disconnected").setColor("WHITE");

    msg?.channel?.send({embeds: [disconnectMessageContent]});
}

export default disconnect;