const TelegramBot = require('node-telegram-bot-api');
const http = require('http');
require('dotenv').config();

const token = process.env.BOT_TOKEN;
if (!token) {
  console.error('Missing BOT_TOKEN environment variable');
  process.exit(1);
}

// Create a simple HTTP server for Glitch to detect the app is running
// This prevents Glitch from putting your bot to sleep
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Telegram Bot is running! 🤖\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Keep-alive server running on port ${PORT}`);
});

const bot = new TelegramBot(token, { polling: true });

// Helpful diagnostics
bot.on('polling_error', (err) => {
  const body = err?.response?.body;
  console.error('error: [polling_error]', body ? JSON.stringify(body) : err);

  // Common cause of "nothing happens": two instances running polling (getUpdates)
  if (body?.error_code === 409) {
    console.error(
      '409 Conflict: Another instance of this bot is already polling getUpdates. ' +
        'Stop the other process/service (or delete the webhook if you intended to use webhooks) and restart.'
    );
  }
});

bot.on('webhook_error', (err) => {
  console.error('error: [webhook_error]', err);
});

// If a webhook was configured previously, remove it to avoid surprises.
// (This does NOT fix getUpdates conflicts, but it fixes webhook-vs-polling conflicts.)
bot.deleteWebHook({ drop_pending_updates: true }).catch(() => {});

// In-memory airdrops store (NOTE: this resets when your bot restarts)
// airdrops: Map<airdropId, { amount, createdAt, timerDuration, timerEndsAt, winner, messageId, chatId }>
const airdrops = new Map();
let botUsername = null;

bot.getMe().then((me) => {
  botUsername = me.username;
  console.log(`Bot username: @${botUsername}`);
});

// Set bot commands (menu buttons)
bot.setMyCommands([
  { command: 'playnow', description: '▶️ Play Time2bet game' },
  { command: 'airdrop', description: '🎁 Create an airdrop challenge' },
  { command: 'start', description: '👋 Welcome message' }
]).then(() => {
  console.log('Bot commands set successfully');
}).catch((err) => {
  console.error('Failed to set bot commands:', err);
});

// Note: For the menu button to show a Web App, you must first:
// 1. Go to @BotFather
// 2. Send /mybots -> select your bot -> Bot Settings -> Menu Button
// 3. Configure the Web App URL there
// 
// For now, the commands menu button is active (shows /playnow, /airdrop, /start)
console.log('💡 Tip: To add a persistent PLAY NOW button, configure it via @BotFather -> Bot Settings -> Menu Button');

function createAirdrop(timerSeconds = 30) {
  const airdropId = Math.random().toString(36).slice(2, 10);
  const amount = Math.floor(Math.random() * 91) + 10; // 10-100
  const now = Date.now();
  airdrops.set(airdropId, {
    amount,
    createdAt: now,
    timerDuration: timerSeconds,
    timerEndsAt: now + timerSeconds * 1000,
    winner: null,
    messageId: null,
    chatId: null,
  });
  return { airdropId, amount, timerSeconds };
}

function getRemainingTime(airdrop) {
  const remaining = Math.max(0, Math.ceil((airdrop.timerEndsAt - Date.now()) / 1000));
  return remaining;
}

function formatTime(seconds) {
  if (seconds <= 0) return '⏰ TIME\'S UP!';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return mins > 0 ? `⏱ ${mins}m ${secs}s` : `⏱ ${secs}s`;
}

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from?.id;
  const text = (msg.text || '').trim();

  // /playnow command: send a message with an inline keyboard button
  if (/^\/playnow(\s|@|$)/i.test(text)) {
    await bot.sendMessage(
      chatId,
      'Ready to play? Click below to start!',
      {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: '▶️ PLAY NOW',
                url: 'https://www.time2bet88.com/'
              }
            ]
          ]
        }
      }
    );
    return;
  }

  // /airdrop [seconds] -> post a random airdrop with countdown timer
  const airdropMatch = text.match(/^\/airdrop(?:\s+(\d+))?(\s|@|$)/i);
  if (airdropMatch) {
    const timerSeconds = parseInt(airdropMatch[1], 10) || 30; // default 30s
    const { airdropId, amount, timerSeconds: actualTimer } = createAirdrop(timerSeconds);

    const airdrop = airdrops.get(airdropId);
    const keyboard = {
      reply_markup: {
        inline_keyboard: [[{ text: '🎯 Click to Claim (after timer!)', callback_data: `claim_${airdropId}` }]],
      },
      parse_mode: 'HTML',
    };

    const sentMsg = await bot.sendMessage(
      chatId,
      `🎁 <b>Airdrop Challenge!</b>\n💰 Reward: <b>${amount} PHPT</b>\n\n${formatTime(actualTimer)}\n\n⚡ First person to click after the timer ends wins!`,
      keyboard
    );

    airdrop.messageId = sentMsg.message_id;
    airdrop.chatId = chatId;

    // Start countdown updates
    startCountdown(airdropId);
    return;
  }

  // /start [payload]
  const startMatch = text.match(/^\/start(?:\s+(.+))?$/i);
  if (startMatch) {
    const payload = (startMatch[1] || '').trim();

    if (!payload) {
      await bot.sendMessage(
        chatId,
        'Welcome!\n\nUse /airdrop [seconds] to create a timed airdrop challenge.\nExample: /airdrop 60'
      );
      return;
    }

    await bot.sendMessage(chatId, 'Unknown /start parameter.');
    return;
  }
});

// Handle button clicks
bot.on('callback_query', async (query) => {
  const chatId = query.message?.chat.id;
  const userId = query.from?.id;
  const messageId = query.message?.message_id;
  const data = query.data;

  if (data.startsWith('claim_')) {
    const airdropId = data.replace('claim_', '');
    const airdrop = airdrops.get(airdropId);

    if (!airdrop) {
      await bot.answerCallbackQuery(query.id, { text: '❌ Airdrop expired or invalid.', show_alert: true });
      return;
    }

    const remaining = getRemainingTime(airdrop);

    // Timer not finished yet
    if (remaining > 0) {
      await bot.answerCallbackQuery(query.id, {
        text: `⏱ Wait! Timer has ${remaining}s remaining.`,
        show_alert: false,
      });
      return;
    }

    // Timer finished - check if someone already won
    if (airdrop.winner) {
      await bot.answerCallbackQuery(query.id, {
        text: '❌ Someone already claimed this airdrop!',
        show_alert: true,
      });
      return;
    }

    // FIRST PERSON TO CLICK AFTER TIMER = WINNER!
    airdrop.winner = userId;
    const winnerName = query.from.first_name || 'Winner';

    await bot.answerCallbackQuery(query.id, {
      text: `🎉 You won ${airdrop.amount} PHPT!`,
      show_alert: true,
    });

    // Update the message to show winner
    await bot.editMessageText(
      `🎁 <b>Airdrop Challenge - CLAIMED!</b>\n💰 Reward: <b>${airdrop.amount} PHPT</b>\n\n🏆 Winner: <b>${winnerName}</b>\n✅ Claimed!`,
      {
        chat_id: chatId,
        message_id: messageId,
        parse_mode: 'HTML',
      }
    );

    // Optionally send a congratulations message
    await bot.sendMessage(
      chatId,
      `🎉 Congratulations <b>${winnerName}</b>! You received <b>${airdrop.amount} PHPT</b>!`,
      { parse_mode: 'HTML' }
    );

    return;
  }
});

// Countdown update function
function startCountdown(airdropId) {
  const airdrop = airdrops.get(airdropId);
  if (!airdrop) return;

  const interval = setInterval(async () => {
    const remaining = getRemainingTime(airdrop);

    if (remaining <= 0) {
      clearInterval(interval);
      // Update message to show timer ended
      try {
        await bot.editMessageText(
          `🎁 <b>Airdrop Challenge!</b>\n💰 Reward: <b>${airdrop.amount} PHPT</b>\n\n${formatTime(0)}\n\n⚡ CLICK NOW to claim!`,
          {
            chat_id: airdrop.chatId,
            message_id: airdrop.messageId,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [[{ text: '🎯 CLAIM NOW!', callback_data: `claim_${airdropId}` }]],
            },
          }
        );
      } catch (err) {
        // Message might be too old to edit
      }
      return;
    }

    // Update countdown every 5 seconds (or adjust as needed)
    if (remaining % 5 === 0 || remaining <= 5) {
      try {
        await bot.editMessageText(
          `🎁 <b>Airdrop Challenge!</b>\n💰 Reward: <b>${airdrop.amount} PHPT</b>\n\n${formatTime(remaining)}\n\n⚡ First person to click after the timer ends wins!`,
          {
            chat_id: airdrop.chatId,
            message_id: airdrop.messageId,
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [[{ text: '🎯 Click to Claim (after timer!)', callback_data: `claim_${airdropId}` }]],
            },
          }
        );
      } catch (err) {
        // Ignore if message can't be edited
      }
    }
  }, 1000); // Check every second
}

console.log('Bot is running (polling)...');
