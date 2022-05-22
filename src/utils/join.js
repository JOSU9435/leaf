import Discord from "discord.js";
import { createAudioPlayer, joinVoiceChannel } from "@discordjs/voice";

const handleJoin = (msg) => {

    const memberVoiceChannel = msg?.member?.voice?.channel;
    if(!memberVoiceChannel){
        msg.reply("need to be in a voice channel first");
        return null;
    }

    const connection = joinVoiceChannel({
        channelId: memberVoiceChannel.id,
        guildId: memberVoiceChannel.guild.id,
        adapterCreator: memberVoiceChannel.guild.voiceAdapterCreator,
    })

    const player = createAudioPlayer();

    connection.subscribe(player);

    msg?.channel?.send("leaf joined");

    return {
        connection,
        player,
    };
}

export default handleJoin;