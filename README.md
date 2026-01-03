# 🤖 Telegram Bot - Time2bet Airdrop Bot

A Telegram bot that manages airdrops and game links for Time2bet.

## 🎯 Features

- **Airdrop Challenges**: Create timed airdrop challenges with `/airdrop [seconds]`
- **Game Integration**: Direct link to Time2bet game with `/playnow`
- **Real-time Countdown**: Live countdown timer for airdrop challenges
- **First-to-click**: Winner is the first person to click after timer ends

## 🚀 Deployment Options

### ✅ **Replit (RECOMMENDED - 100% FREE)**
- **No credit card required**
- **Best online editor** - Code in your browser
- **Easy setup** - Import from GitHub in 1 click
- **Mobile app available** - Edit from your phone

👉 **[Follow Replit Deployment Guide](DEPLOY_TO_REPLIT.md)**

---

### ✅ **Glitch.com (Alternative - 100% FREE)**
- **No credit card required**
- **Quick setup** - Import from GitHub
- See [DEPLOY_TO_GLITCH.md](DEPLOY_TO_GLITCH.md)

---

### ⚠️ Render.com (Requires Payment)
- Background Workers are **no longer free** on Render
- See [DEPLOY_TO_RENDER.md](DEPLOY_TO_RENDER.md) for legacy instructions

---

## 💻 Local Development

To run your bot locally for testing:

```bash
# Install dependencies
npm install

# Create .env file with your token
echo "BOT_TOKEN=your_bot_token_here" > .env

# Run the bot
npm start
```

## 🎮 Bot Commands

- `/start` - Welcome message and instructions
- `/playnow` - Get link to play Time2bet game
- `/airdrop [seconds]` - Create timed airdrop challenge (default: 30 seconds)

## 📝 How Airdrops Work

1. Admin creates airdrop with `/airdrop 30` (30 second timer)
2. Bot posts airdrop message with countdown
3. Timer counts down in real-time
4. First person to click AFTER timer ends wins!
5. Winner receives random amount (10-100 PHPT)

## 🔧 Configuration

All configuration is done via environment variables:

- `BOT_TOKEN` - Your Telegram bot token from @BotFather (required)
- `PORT` - HTTP server port (default: 3000, auto-set by hosting platforms)

## 📦 Dependencies

- `node-telegram-bot-api` - Telegram Bot API wrapper
- `dotenv` - Environment variable management
- `http` (built-in) - Keep-alive server for Glitch

## 🆘 Troubleshooting

**Bot not responding?**
- Check your `BOT_TOKEN` is set correctly
- Make sure only ONE instance is running (avoid 409 conflicts)
- Check logs for error messages

**Bot goes offline?**
- If using Glitch, set up UptimeRobot (see deployment guide)
- If using Render, switch to Background Worker (requires payment)

**409 Conflict error?**
- Stop all other instances of your bot
- Only ONE instance can use polling at a time
- Check if you have the bot running locally

## 🔒 Security

- ✅ Bot token stored in environment variables (never committed to code)
- ✅ `.env` file excluded from Git via `.gitignore`
- ✅ Use `.env.example` as template for local development

## 📄 License

ISC

## 🤝 Contributing

Feel free to fork and improve this bot!

---

Made with ❤️ for the Time2bet community
