import { MessageEmbed } from "discord.js";
import yts from "yt-search";
import ytdl from "ytdl-core";
import Song from "../models/Song.js";
import disconnect from "../commandHandlers/disconnect.js";

/**
 * 
 * @param {string} args 
 * @returns {Song | null} 
 */
const handleSearch = async (args) => {
    try {
        let url;
        if(!args) return null;
    
        if(ytdl.validateURL(args)){
            url = args;
        }else{
            const videos = (await yts(args))?.all;
            url = videos[0]?.url;
        }

        if(!ytdl.validateURL(url)){
            return null;
        }
        
        const video = await yts({videoId: url.substring(url.indexOf("?v=")+3)});

        const song =  new Song(url,video.title,video.duration.toString());

        return song;
    } catch (error) {
        console.log(error.message);
    }
}

export default handleSearch;