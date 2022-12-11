import {parentPort, workerData} from "node:worker_threads";
import handleSearch from "../utils/search.js";

(async () => {
    
    const {args} = workerData;
        
    const song = await handleSearch(args);

    if(!song){
        const error = new Error("Song not found");
        error.code = 400;
        throw error;
    }
        
    parentPort.postMessage(song);
})();