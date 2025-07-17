const express = require("express");
const { create } = require("venom-bot");

const app = express();
const PORT = process.env.PORT || 3000;

// Launch WhatsApp bot
create({
  session: 'QUEEN-BELLA',
})
  .then((client) => start(client))
  .catch((err) => {
    console.error("Error creating session:", err);
    process.exit(1);
  });

// Command handler
function start(client) {
  client.onMessage(async (message) => {
    if (!message.body.startsWith(".")) return;

    const command = message.body.trim().toLowerCase();

    // Main .menu command
    if (command === ".menu") {
      const menu = `
╭───────────⊷
┋ ʙᴏᴛ ɴᴀᴍᴇ : 🖥️𝐐𝐔𝐄𝐄𝐍 𝐁𝐄𝐋𝐋𝐀
┋ ᴘʀᴇғɪx : [ . ]
┋ ᴍᴏᴅᴇ : private
╰───────────⊷
│ • .autostatus
│ • .react
│ • .help
│ • .owner
│ • .menu
│ • .botinfo
│ • .status
│ • .groupinfo
│ • .quote
│ • .emoji
│ • .gif
│ • .sticker
│ • .delete
│ • .hi
│ • .bye
│ • .alive
│ • .ping
│ • .time
│ • .uptime
│ • .support
│ Made by Rodgers
╰────────────⊷
🔗 *View Channel*: https://whatsapp.com/channel/0029VbBH9IGCnA7l7rdZlB0e
      `.trim();

      client.sendText(message.from, menu);
    }

    // .owner command
    if (command === ".owner") {
      const ownerInfo = `
╭───「  OWNER INFO  」───╮
Name: RODGERS ONYANGO
Home: KISUMU KENYA
Status: SINGLE
CONT: 0755660053
AGE: 17 YEARS
EDU..: BACHELOR DEGREE
INST: EGERTON
╰─────────────────────╯
      `.trim();

      client.sendText(message.from, ownerInfo);
    }

    // You can add more command handlers here.
  });
}

// Start Express server
app.get("/", (req, res) => {
  res.send("Queen Bella Backend is running.");
});

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
});
