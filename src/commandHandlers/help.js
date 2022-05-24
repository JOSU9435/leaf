import { Message, MessageEmbed } from "discord.js";


/**
 * 
 * @param {Message} msg 
 */
const handleHelp = (msg) => {

    const helpContent = [
        {
            command: "-help, -h",
            description: "prints help mannual",
        },
        {
            command: "-play, -p",
            description: "plays any song using a url or youTube search",
        },
        {
            command: "-queue, -q",
            description: "prints the song queue",
        },
        {
            command: "-skip, -next, -n",
            description: "plays the next song in the queue",
        },
        {
            command: "-pause",
            description: "pauses the current playing song",
        },
        {
            command: "-resume, -unpause",
            description: "resumes the current playing song",
        },
    ]

    const helpMessage = new MessageEmbed();
    helpMessage.setTitle("Help").setColor("WHITE");

    helpContent.forEach((elem) => {
        const {command, description} = elem;
        helpMessage.addField(command,description);
    })

    msg?.channel?.send({embeds: [helpMessage]});
}

export default handleHelp;