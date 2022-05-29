import Discord, { Message, MessageEmbed } from "discord.js";
import { AudioPlayer, createAudioPlayer, joinVoiceChannel, VoiceConnection, VoiceConnectionStatus } from "@discordjs/voice";
import AudioState from "../models/AudioState.js";
import disconnect from "../commandHandlers/disconnect.js";

/**
 * 
 * @param {Message} msg 
 * @returns {AudioState}
 */

const handleJoin = (msg) => {

    try {
        
        const memberVoiceChannel = msg?.member?.voice?.channel;
        if(!memberVoiceChannel){
            const enterVcMessage = new MessageEmbed();
            enterVcMessage.setTitle("You need to be in a VC first").setColor("WHITE");
    
            msg.reply({embeds: [enterVcMessage]});
            return {};
        }
    
        const songQueue = [];
    
        const connection = joinVoiceChannel({
            channelId: memberVoiceChannel.id,
            guildId: memberVoiceChannel.guild.id,
            adapterCreator: memberVoiceChannel.guild.voiceAdapterCreator,
        })
    
        const player = createAudioPlayer();
    
        connection.subscribe(player);
    
        connection.on(VoiceConnectionStatus.Disconnected,() => {
            disconnect(audioState,msg);
        })
    
        const audioState = new AudioState(connection,player,songQueue);
    
        return audioState;

    } catch (error) {
        disconnect(audioState,msg);
    }

}

export default handleJoin;