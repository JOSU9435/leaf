import Discord, { Message, MessageEmbed } from "discord.js";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource } from "@discordjs/voice";
import ytdl from "ytdl-core";
import yts from "yt-search";
import disconnect from "./disconnect.js";
import AudioState from "../models/AudioState.js";

/**
 * @param {Array} songQueue
 * @param {AudioState} audioState 
 * @param {Message} msg
 */

const handlePlay = async (songQueue, audioState, msg) => {
    
    try {

        if(songQueue.length===0) return;

        const {player} = audioState;
        
        const song =  songQueue[0];

        const {url, title, duration} = song;
    
        if(!ytdl.validateURL(url)){
            return;
        }
        const stream = ytdl(url,{filter: "audioonly",});
        
        const audioResource = createAudioResource(stream,{ inlineVolume: 1});
        
        const messageContent = new Discord.MessageEmbed();
        messageContent.setTitle(`Playing :-\n${title}`);
        messageContent.setFields({
            name: "duration",
            value: duration,
        })

        messageContent.setColor("WHITE");

        msg?.channel?.send({embeds: [messageContent]})

        player.play(audioResource);

    } catch (error) {
        
        disconnect(audioState,songQueue,msg);

        const errMessageContent = new MessageEmbed();
        errMessageContent.setTitle("Something went wrong").setColor("WHITE");

        msg?.channel?.send({embeds: [errMessageContent]});

        console.log(error.message);
    }
}

export default handlePlay;