import yts from "yt-search";
import ytdl from "ytdl-core";
import Song from "../models/Song.js";

/**
 * 
 * @param {string} args 
 */
const handleSearch = async (args) => {
    try {
        let url;
    
        if(ytdl.validateURL(args)){
            url = args;
        }else{
            const videos = (await yts(args))?.all;
            url = videos[0]?.url;
        }

        if(!ytdl.validateURL(url)){
            throw new Error("song not found");
        }
        
        const video = await yts({videoId: url.substring(url.indexOf("?v=")+3)});

        const song =  new Song(url,video.title,video.duration.toString());

        return song;
    } catch (error) {
        console.log(error.message);
    }
}

export default handleSearch;