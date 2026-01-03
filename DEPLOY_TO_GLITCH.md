# 🚀 Deploy Your Telegram Bot to Glitch.com (100% FREE)

## ✅ Your bot is now ready for Glitch deployment!

### Why Glitch?
- ✅ **Completely FREE** - No credit card required
- ✅ **Easy setup** - Import directly from GitHub
- ✅ **24/7 uptime** - With keep-alive mechanism built-in
- ✅ **Instant deployment** - Live in seconds

---

## 📋 Step-by-Step Deployment Guide:

### 1️⃣ Import Your Project to Glitch

1. Go to **https://glitch.com** and sign up/log in (you can use GitHub to sign in)
2. Click **"New Project"** button (top right)
3. Select **"Import from GitHub"**
4. Enter your repository URL: `https://github.com/kajiraw06/telegram-bot`
5. Wait 10-20 seconds for import to complete

### 2️⃣ Set Your Bot Token

1. In your Glitch project, click the **`.env`** file in the left sidebar
2. Add your bot token:
   ```
   BOT_TOKEN=YOUR_BOT_TOKEN_HERE
   ```
3. Get your token from @BotFather by sending `/token` command
4. The `.env` file is automatically private and won't be shared

### 3️⃣ Start Your Bot

1. Glitch will automatically install dependencies and start your bot
2. Check the **"Logs"** panel at the bottom to see if it's running
3. You should see: `✅ Keep-alive server running on port 3000`
4. Test your bot on Telegram - send `/start` to your bot!

### 4️⃣ Keep Your Bot Alive 24/7

Your bot has a built-in HTTP server that keeps Glitch happy. However, Glitch free projects may sleep after 5 minutes of inactivity. To prevent this:

**Option A: Use UptimeRobot (Recommended)**
1. Go to https://uptimerobot.com (free, no credit card)
2. Create a new monitor
3. Type: **HTTP(s)**
4. URL: Your Glitch project URL (e.g., `https://your-project-name.glitch.me`)
5. Interval: **5 minutes**
6. Done! Your bot will now stay awake 24/7

**Option B: Manual Keep-Alive**
- Just open your Glitch project URL in a browser every few hours
- Not recommended for production bots

---

## 🔧 What's Different for Glitch:

✅ Added `glitch.json` configuration file  
✅ Added HTTP server to keep the project alive  
✅ Uses `http` module (built into Node.js, no extra dependencies)  
✅ Listens on port 3000 (or PORT env variable)

---

## 💻 Viewing Your Bot's Logs

In Glitch:
1. Click **"Logs"** button at the bottom of the editor
2. You'll see real-time logs from your bot
3. Check for any errors or success messages

---

## 🆘 Troubleshooting

**Bot not responding?**
- Check the Logs panel for errors
- Make sure `.env` has the correct `BOT_TOKEN`
- Verify your token is current (not revoked) in @BotFather

**"409 Conflict" error?**
- You have another instance of the bot running
- Stop any local instances or other deployments
- Only ONE instance can run at a time

**Bot goes to sleep?**
- Set up UptimeRobot (see step 4 above)
- Or open your Glitch project URL occasionally

**Import failed?**
- Make sure your GitHub repo is public
- Try using the HTTPS URL format
- Check that all files are properly committed

---

## 🎨 Customizing Your Bot

You can edit your bot directly in Glitch:
1. Click on any file in the left sidebar to edit
2. Changes auto-save and restart the bot
3. Test your changes immediately

---

## 🔒 Security Notes

- ✅ Your `.env` file is private and never shared
- ✅ Never commit your bot token to GitHub
- ✅ The HTTP server doesn't expose any sensitive data
- ✅ Only basic status info is shown on the public URL

---

## 🎉 Your Bot is Live!

Once deployed, your bot will be online 24/7 (with UptimeRobot). Users can interact with it anytime!

**Available Commands:**
- `/start` - Welcome message
- `/playnow` - Play Time2bet game
- `/airdrop [seconds]` - Create timed airdrop challenge

---

## 💡 Pro Tips

- Use Glitch's built-in editor to make quick changes
- Check logs regularly to monitor bot activity
- Remix your project to create a backup
- Use descriptive project names (easier to find later)

Your bot is production-ready! 🎊
