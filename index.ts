import DiscordJS, { Intents } from 'discord.js'
import WOKCommands from 'wokcommands'
import path from 'path'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import testSchema from './test-schema'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES
    ]
})

client.on('ready', async ()=>{

    // Legacy type of connecting to Mongoose Db
    await mongoose.connect(process.env.MONGO_URI || '',
    {
        keepAlive: true
    })

    console.log('The Bot is ready')

    new WOKCommands(client,{
        commandsDir: path.join(__dirname, 'commands'),
        typeScript: true,
        // mongoUri: process.env.MONGO_URI || '',
        // dbOptions: {
        //     keepAlive: true,
        // }
    })

    setTimeout(async() => {
        await new testSchema({
            message: 'Hello World!',
        }).save()
    }, 1000)
})

client.login(process.env.TOKEN)