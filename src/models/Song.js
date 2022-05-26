/**
 * @description
 * class for a song 
 * 
 * @example
 * {
 *      url,
 *      title,
 *      duration,
 * }
 */

class Song{
    /**
     * 
     * @param {string} url 
     * @param {string} title 
     * @param {string} duration 
     */
    constructor (url,title, duration){
        this.url = url;
        this.title = title;
        this.duration = duration;
    }  
}

export default Song;