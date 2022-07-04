import { ICommand } from "wokcommands";

export default {
    category: 'Testing',
    description: 'Replies with pong',

    slash: 'both',

    callback: ({}) => {
        return 'Pong!'
    },
} as ICommand

// !ping
// /ping