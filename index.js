const { create } = require('venom-bot');
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

let sessionId = process.env.SESSION_ID || null;

app.get('/', (req, res) => {
  res.send('QUEEN BELLA Backend is Running');
});

app.post('/start', async (req, res) => {
  sessionId = req.body.sessionId || sessionId;

  if (!sessionId) {
    return res.status(400).json({ error: 'Session ID required' });
  }

  try {
    const client = await create(sessionId, undefined, undefined, {
      headless: true,
      useChrome: false,
    });
    startBot(client);
    res.json({ message: 'QUEEN BELLA started successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to start bot' });
  }
});

function startBot(client) {
  client.onMessage(async (message) => {
    if (!message.body.startsWith('.')) return;

    const command = message.body.toLowerCase().trim();

    if (command === '.menu') {
      await client.sendText(message.from, `╭────────────⊷
┋ ʙᴏᴛ ɴᴀᴍᴇ : 🖥️𝐐𝐔𝐄𝐄𝐍 𝐁𝐄𝐋𝐋𝐀
┋ ᴘʀᴇғɪx : [ . ]
┋ ᴍᴏᴅᴇ : private
╰────────────⊷
┃
┃ .menu
┃ .owner
┃ .autostatus
┃ .react
┃ .chatbot on/off
┃ .ping
┃ .alive
┃ .source
┃ .status
┃ .typing
┃ .greet
┃ .getinfo
┃ .version
┃ .info
┃ .linkgroup
┃ .report
┃ .help
┃ .rules
┃ .support
┃ .restart
┃ .updates
┃
╰────────────⊷
*View Channel*: https://whatsapp.com/channel/0029VbBH9IGCnA7l7rdZlB0e
━━━「 Made by Rodgers 」━━━`);
    }

    if (command === '.owner') {
      await client.sendText(message.from, `┏━ OWNER DETAILS ━┓
Name: RODGERS ONYANGO
Home: KISUMU KENYA
Status: SINGLE
CONT: 0755660053
AGE: 17 YEARS
EDU..: BACHELOR DEGREE
INST: EGERTON
┗━━━━━━━━━━━━━━┛`);
    }

    if (command === '.ping') {
      await client.sendText(message.from, `QUEEN BELLA is active ✅`);
    }

    if (command === '.alive') {
      await client.sendText(message.from, `✅ QUEEN BELLA is alive and working perfectly.`);
    }

    if (command === '.chatbot on') {
      await client.sendText(message.from, `Chatbot enabled. Rodgers is currently unavailable, can we chat? I am a bot.`);
    }

    if (command === '.chatbot off') {
      await client.sendText(message.from, `Chatbot disabled.`);
    }
  });

  client.onStateChange((state) => {
    console.log('Bot state:', state);
  });
                            }
