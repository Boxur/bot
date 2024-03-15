require('dotenv').config();
const {REST , Routes ,ApplicationCommandOptionType}  = require('discord.js');

const commands = [
    {
        name: 'run',
        description: 'run a script',
        options:[
            {
                name: 'first',
                description: 'first argument',
                type: ApplicationCommandOptionType.String,
                required: true
            }
        ]
    }
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("registering application commands...");
        await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID,process.env.GUILD_ID),
            { body: commands }
        );
        console.log('Successfully registered application commands.');
    }catch (e) {
        console.log(e);
    }

})();