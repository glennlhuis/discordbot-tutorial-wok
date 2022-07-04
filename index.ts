import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', ()=>{
    console.log('The Bot is ready')

    // Guild
    const guildId = "993006483816058982"
    const guild = client.guilds.cache.get(guildId)
    let commands

    if(guild){
        commands = guild.commands
    }
    else{
        commands = client.application?.commands
    }

    commands?.create({
        name: 'ping',
        description: 'Replies with pong'

    })
    // Global
})

client.on('interactionCreate',async (interaction) => {
    if(!interaction.isCommand()){
        return
    }

    const {commandName, options} = interaction

    if(commandName === 'ping'){
        interaction.reply({
            content: 'pong',
            ephemeral: true,
        })
    }
})

// client.on('messageCreate', (message) => {
//     if(message.content === 'ping'){
//         message.reply({
//             content: 'pong',
//         })
//     }
// })

client.login(process.env.TOKEN)