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
 *      isLooping,
 *      idleTimeoutId,
 * }
 */


 class AudioState{
    /**
     * 
     * @param {VoiceConnection} connection 
     * @param {AudioPlayer} player
     * @param {Array<Song>} songQueue
     * @param {boolean} isLooping
     * @param {NodeJS.Timeout} idleTimeoutId
     */
    constructor (connection,player,songQueue,isLooping = false,idleTimeoutId = null){
        this.connection = connection;
        this.player = player;
        this.songQueue = songQueue;
        this.isLooping = isLooping;
        this.idleTimeoutId = idleTimeoutId;
    }  
}

export default AudioState;