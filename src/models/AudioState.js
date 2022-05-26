import { AudioPlayer, VoiceConnection } from "@discordjs/voice";
import Song from "./Song.js";
/**
 * @description
 * class with the VoiceConnection and the player object
 * 
 * @example
 * {
 *      connection,
 *      player,
 *      songQueue[],
 * }
 */


 class AudioState{
    /**
     * 
     * @param {VoiceConnection} connection 
     * @param {AudioPlayer} player
     * @param {Array<Song>} songQueue
     * @param {boolean} isLooping
     */
    constructor (connection,player,songQueue,isLooping = false){
        this.connection = connection;
        this.player = player;
        this.songQueue = songQueue;
        this.isLooping = isLooping;
    }  
}

export default AudioState;