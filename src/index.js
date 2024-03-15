require('dotenv').config();
const { exec } = require('child_process');
const { Client, IntentsBitField} = require('discord.js');

const client = new Client({ 
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers, 
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ] 
});

let uTag;

client.on('ready', (c) => {
    console.log(`Logged in as ${c.user.tag}!`);
    uTag = c.user.tag;
});

client.on('messageCreate', (msg) => {
    console.log('[%s] %s',msg.author.tag, msg.content);
    if(msg.author.tag == uTag)
        msg.react('❌')
});

client.on('interactionCreate', async (interaction) => {
    if(!interaction.isChatInputCommand()) return;
    if(interaction.commandName == 'ping') {
        interaction.reply({ content: 'pong'});
    }
    if(interaction.commandName == 'run'){
        try{
            num1 = interaction.options.get('first').value;
            exec(`${num1}`, (err,stdout,stderr) =>{if(err) return; interaction.reply(`stdout: ${stdout}`)});
        }
        catch(e){
            interaction.reply("error");
        }
    }
});

client.login(process.env.TOKEN);