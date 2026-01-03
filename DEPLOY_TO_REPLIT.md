# 🚀 Deploy Your Telegram Bot to Replit (100% FREE)

## ✅ Your bot is now ready for Replit deployment!

### Why Replit?
- ✅ **Completely FREE** - No credit card required
- ✅ **Super easy setup** - Import from GitHub in 1 click
- ✅ **Always online** - Built-in deployment (with UptimeRobot)
- ✅ **Code editor included** - Edit your bot directly in browser
- ✅ **Great community** - Millions of developers use Replit

---

## 📋 Step-by-Step Deployment Guide:

### 1️⃣ Import Your Project to Replit

1. Go to **https://replit.com** and sign up/log in
   - You can sign in with GitHub (recommended)
2. Click **"+ Create Repl"** button (top left)
3. Select **"Import from GitHub"** tab
4. Paste your repository URL: `https://github.com/kajiraw06/telegram-bot`
5. Click **"Import from GitHub"** button
6. Wait 10-30 seconds for import and setup

### 2️⃣ Set Your Bot Token (Secret Environment Variable)

1. In your Repl, look for the **"Tools"** panel on the left sidebar
2. Click on **"Secrets"** (🔒 lock icon)
3. Add a new secret:
   - **Key**: `BOT_TOKEN`
   - **Value**: Your bot token from @BotFather
4. To get your token: Message @BotFather on Telegram and send `/token`
5. Click **"Add new secret"**

⚠️ **Important**: Use "Secrets" not the `.env` file! Secrets are private and secure.

### 3️⃣ Run Your Bot

1. Click the big green **"Run"** button at the top
2. Replit will automatically:
   - Install dependencies (`npm install`)
   - Start your bot (`node index.js`)
3. Check the **Console** panel to see logs
4. You should see: `✅ Keep-alive server running on port 3000`
5. Test your bot on Telegram - send `/start`!

### 4️⃣ Keep Your Bot Running 24/7

**Option A: Replit Always-On (Paid - $7/month)**
- Click "Deploy" → Enable "Always On"
- Your bot stays online forever
- Recommended if you can afford it

**Option B: UptimeRobot (FREE - Recommended)**
1. After clicking "Run", Replit will show you a web preview
2. Copy the URL (looks like: `https://telegram-bot.username.repl.co`)
3. Go to **https://uptimerobot.com** (free account, no credit card)
4. Click **"Add New Monitor"**
5. Settings:
   - **Monitor Type**: HTTP(s)
   - **Friendly Name**: Telegram Bot
   - **URL**: Your Replit URL from step 2
   - **Monitoring Interval**: 5 minutes
6. Click **"Create Monitor"**
7. Done! Your bot will ping every 5 minutes and stay awake 24/7

**Option C: Run Manually**
- Just click "Run" whenever you want your bot online
- Good for testing, not for production

---

## 🔧 What's Included:

✅ `.replit` - Configuration file for Replit  
✅ `replit.nix` - Defines Node.js environment  
✅ HTTP keep-alive server (built into `index.js`)  
✅ Automatic dependency installation  
✅ Port 3000 configured and ready

---

## 💻 Editing Your Bot on Replit

One of the best things about Replit - you can edit code right in your browser!

1. Click any file in the file tree (left sidebar)
2. Make your changes
3. Click "Run" again to restart with changes
4. Test immediately!

No need to push to GitHub, commit, or redeploy. Perfect for quick fixes!

---

## 🆘 Troubleshooting

**Bot not responding?**
- Check Console for errors
- Verify `BOT_TOKEN` secret is set correctly
- Make sure your token is current (not revoked)
- Try stopping and running again

**"Module not found" error?**
- Replit should auto-install dependencies
- If not, open the Shell tab and run: `npm install`
- Then click "Run" again

**"409 Conflict" error?**
- You have another instance running somewhere
- Stop any local instances or other deployments
- Only ONE instance can use polling at a time

**Bot goes to sleep?**
- Set up UptimeRobot (see Step 4 above)
- Make sure you're pinging the correct Replit URL
- Check UptimeRobot dashboard to verify it's working

**Import failed?**
- Make sure your GitHub repo is public
- Try refreshing the page and importing again
- Check that you're logged into Replit

**"Cannot find BOT_TOKEN"?**
- Make sure you added it in "Secrets" not `.env`
- Check spelling: must be exactly `BOT_TOKEN`
- Try removing and re-adding the secret

---

## 🎨 Replit Features

**Built-in Shell:**
- Click "Shell" tab to run commands
- Install packages, check logs, debug

**Multiplayer:**
- Share your Repl with others
- Collaborate in real-time

**Version Control:**
- Replit has built-in Git support
- Or continue using GitHub

**Mobile App:**
- Edit and run your bot from your phone!
- Available for iOS and Android

---

## 🔒 Security Best Practices

✅ **Always use Secrets** for sensitive data (BOT_TOKEN)  
✅ **Never put tokens in code** or `.env` file  
✅ Secrets are encrypted and never exposed  
✅ The HTTP server doesn't expose sensitive data  
✅ Only basic status shown on public URL

---

## 📊 Monitoring Your Bot

**Check if it's running:**
- Visit your Replit URL in a browser
- You should see: "Telegram Bot is running! 🤖"

**Check logs:**
- Click "Console" tab in Replit
- See real-time logs from your bot

**Check uptime:**
- Use UptimeRobot dashboard
- See uptime percentage and response times

---

## 🎉 Your Bot is Live!

Once deployed with UptimeRobot, your bot runs 24/7 for FREE!

**Available Commands:**
- `/start` - Welcome message
- `/playnow` - Play Time2bet game
- `/airdrop [seconds]` - Create timed airdrop challenge

---

## 💡 Pro Tips

1. **Bookmark your Repl** - Easy access to edit anytime
2. **Use Secrets for all sensitive data** - Not just bot tokens
3. **Check Console regularly** - Monitor for errors or issues
4. **Keep UptimeRobot monitor active** - Ensures 24/7 uptime
5. **Star your Repl** - Makes it easier to find later
6. **Join Replit Discord** - Get help from the community

---

## 🆚 Replit vs Glitch vs Others

| Feature | Replit | Glitch | Render |
|---------|--------|--------|--------|
| **Free Tier** | ✅ Yes | ✅ Yes | ❌ No (for workers) |
| **Credit Card** | ❌ Not needed | ❌ Not needed | ✅ Required |
| **Browser Editor** | ✅ Excellent | ✅ Good | ❌ No |
| **Keep-Alive** | UptimeRobot | UptimeRobot | N/A |
| **Mobile App** | ✅ Yes | ❌ No | ❌ No |
| **Community** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🔄 Updating Your Bot

**Method 1: Edit on Replit (Quick changes)**
1. Edit files directly in Replit
2. Click "Run" to restart

**Method 2: Push to GitHub (Recommended)**
1. Make changes locally or on GitHub
2. In Replit Shell, run: `git pull`
3. Click "Run" to restart with updates

---

Your bot is production-ready and 100% FREE! 🎊

**Need help?** Check the Replit docs or ask in their Discord community!
