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
     */
    constructor (connection,player,songQueue){
        this.connection = connection;
        this.player = player;
        this.songQueue = songQueue;
    }  
}

export default AudioState;