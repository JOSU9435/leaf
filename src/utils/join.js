import Discord, { Message, MessageEmbed } from "discord.js";
import { AudioPlayer, createAudioPlayer, joinVoiceChannel, VoiceConnection } from "@discordjs/voice";
import AudioState from "../models/AudioState.js";

/**
 * 
 * @param {Message} msg 
 * @returns {AudioState}
 */

const handleJoin = (msg) => {

    const memberVoiceChannel = msg?.member?.voice?.channel;
    if(!memberVoiceChannel){
        const enterVcMessage = new MessageEmbed();
        enterVcMessage.setTitle("You need to be in a VC first").setColor("WHITE");

        msg.reply({embeds: [enterVcMessage]});
        return null;
    }

    const connection = joinVoiceChannel({
        channelId: memberVoiceChannel.id,
        guildId: memberVoiceChannel.guild.id,
        adapterCreator: memberVoiceChannel.guild.voiceAdapterCreator,
    })

    const player = createAudioPlayer();

    connection.subscribe(player);

    const audioState = new AudioState(connection,player)

    return audioState;
}

export default handleJoin;