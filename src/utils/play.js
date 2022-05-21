import Discord from "discord.js";
import { AudioPlayerStatus, createAudioPlayer, createAudioResource } from "@discordjs/voice";
import ytdl from "ytdl-core";

const play = async (url, connection) => {
    // console.log(url);

    const stream = await ytdl(url,{filter: "audioonly",})
    // console.log(stream)

    const player = createAudioPlayer();

    const audioResource = await createAudioResource(stream,{ inlineVolume: 1});

    // const audioResource = createAudioResource("/home/josu/Downloads/test.mpeg", {
    //     inlineVolume: 1,
    // });
    
    player.play(audioResource);
    
    connection.subscribe(player);

    // console.log(audioResource);

    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
    })
}

export default play;