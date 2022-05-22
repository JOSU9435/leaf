import { AudioPlayer, VoiceConnection } from "@discordjs/voice"
import { Message, MessageEmbed } from "discord.js"
import AudioState from "../models/AudioState.js";
import Song from "../models/Song.js"
/**
 * 
 * @param {AudioState | null} audioState 
 * @param {Array<Song>} songQueue
 * @param {Message} msg 
 */

const disconnect = (audioState,songQueue, msg) => {
    audioState.player.stop();
    audioState.connection.destroy();
    audioState = null;
    songQueue = [];

    const disconnectMessageContent = new MessageEmbed();
    disconnectMessageContent.setTitle("Disconnected").setColor("WHITE");

    msg?.channel?.send({embeds: [disconnectMessageContent]});
}

export default disconnect;