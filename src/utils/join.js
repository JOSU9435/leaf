import Discord from "discord.js";
import { joinVoiceChannel } from "@discordjs/voice";

const join = (msg) => {

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

    msg?.channel?.send("leaf joined");

    return connection;
}

export default join;