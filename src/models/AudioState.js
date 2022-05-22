/**
 * @description
 * class with the VoiceConnection and the player object
 * 
 * @example
 * {
 *      connection,
 *      player,
 * }
 */

import { AudioPlayer, VoiceConnection } from "@discordjs/voice";

 class AudioState{
    /**
     * 
     * @param {VoiceConnection} connection 
     * @param {AudioPlayer} player
     */
    constructor (connection,player){
        this.connection = connection;
        this.player = player;
    }  
}

export default AudioState;