import { Message, MessageEmbed } from "discord.js";
import { createAudioPlayer, joinVoiceChannel, VoiceConnectionStatus } from "@discordjs/voice";
import AudioState from "../models/AudioState.js";
import disconnect from "../commandHandlers/disconnect.js";

/**
 * @description initialize the connection to the voice channel, the audio player and the songQueue returns a audioState with the player instance and the connection instance and the songQueue and returns an empty object if any err is occured.
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

        if(!memberVoiceChannel?.joinable){
            const unableJoinMessage = new MessageEmbed();
        
            unableJoinMessage.setTitle("Unable to join the VC").setColor("WHITE");
            msg?.channel?.send({embeds: [unableJoinMessage]});

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
        const audioState = new AudioState(connection,player,songQueue);
        
        connection.on(VoiceConnectionStatus.Disconnected,() => {
            disconnect(audioState,msg);
        })
        
        player.on("error", (error) => {
            const errMessage = new MessageEmbed();
            errMessage.setTitle("Something went Wrong").setColor("WHITE");

            msg?.channel?.send({embeds: [errMessage]});

            disconnect(audioState,msg);
            console.log("play.js err",error.resource.ended);
        })
        
        return audioState;

    } catch (error) {
        const unableJoinMessage = new MessageEmbed();
        
        unableJoinMessage.setTitle("Unable to join the VC").setColor("WHITE");
        msg?.channel?.send({embeds: [unableJoinMessage]});
    }

}

export default handleJoin;