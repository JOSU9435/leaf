import { AudioPlayerStatus } from "@discordjs/voice";
import { Message, MessageEmbed } from "discord.js";
import AudioState from "../models/AudioState.js";

/**
 * @description pauses the audio player
 * @param {AudioState} audioState 
 * @param {Message} msg 
 */
const handlePause = (audioState,msg) => {
    const {player} = audioState;

    const {status} = player.state;

    if(status===AudioPlayerStatus.Idle || status===AudioPlayerStatus.Paused) return;

    player.pause();

    const pauseMessage = new MessageEmbed();
    pauseMessage.setTitle("paused").setColor("WHITE");
    msg?.channel?.send({embeds: [pauseMessage]});
}

export default handlePause;