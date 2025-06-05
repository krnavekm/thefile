
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const bodyParser = require('body-parser');

const DISCORD_TOKEN = 'MTM4MDExMTI3NTU2ODE0MDM2OA.G4HiqA.Q59ydj4HQAtC0wfVL4_Od9McdAH9zejKjxvYYo';
const GUILD_ID = '1379908489966649344';
const CHANNEL_ID = '1379908490578886759';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const app = express();
app.use(bodyParser.json());

client.once('ready', () => {
  console.log(`✅ Bot is online as ${client.user.tag}`);
});

client.login(DISCORD_TOKEN);

app.post('/webhook', async (req, res) => {
  try {
    const guild = await client.guilds.fetch(GUILD_ID);
    const channel = await guild.channels.fetch(CHANNEL_ID);
    const invite = await channel.createInvite({
      maxUses: 1,
      unique: true,
      maxAge: 86400 // platnost 1 den
    });

    console.log(`🎟️ New invite created: ${invite.url}`);
    res.status(200).send('Invite created');
  } catch (err) {
    console.error('❌ Error creating invite:', err);
    res.status(500).send('Error');
  }
});

app.listen(3000, () => {
  console.log('🚀 Webhook server running on http://localhost:3000');
});
