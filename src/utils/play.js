import Discord, { Message } from "discord.js";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource } from "@discordjs/voice";
import ytdl from "ytdl-core";
import yts from "yt-search";

/**
 * @param {Array} songQueue
 * @param {AudioPlayer} player 
 * @param {Message} msg
 */

const handlePlay = async (songQueue, player, msg) => {
    
    try {

        if(songQueue.length===0) throw new Error("end of queue");        

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
        console.log(error.message);
    }
}

export default handlePlay;