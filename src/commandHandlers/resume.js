import { AudioPlayerStatus } from "@discordjs/voice";
import { Message, MessageEmbed } from "discord.js";
import AudioState from "../models/AudioState.js";

/**
 * @description unpauses the audio player
 * @param {AudioState} audioState 
 * @param {Message} msg 
 */
const handleResume = (audioState,msg) => {
    const {player} = audioState;

    const {status} = player.state;

    if(status===AudioPlayerStatus.Idle || status===AudioPlayerStatus.Playing) return;

    player.unpause();

    const resumeMessage = new MessageEmbed();
    resumeMessage.setTitle("resumed").setColor("WHITE");
    msg?.channel?.send({embeds: [resumeMessage]});
}

export default handleResume;