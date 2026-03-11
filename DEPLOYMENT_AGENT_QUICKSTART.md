# 🚀 Deployment Agent Quick Start

Your self-iterating deployment loop agent is installed and ready!

## ⚡ 3-Step Setup (5 minutes)

### Step 1️⃣ : Get Your Vercel Token

1. Open: https://vercel.com/account/tokens
2. Click **"Create"** button
3. Name: `trades-deployment-agent`
4. Access: Select "Full Access"  
5. Click **"Create Token"**
6. **Copy the token** (shows only once!)

### Step 2️⃣ : Get Your Project ID

1. Open: https://vercel.com/dashboard
2. Click the **trades-landing-template** project
3. Go to **Settings** → **General**
4. Find **Project ID** and copy it

### Step 3️⃣ : Configure .env File

Edit the file `.env` in your project root:

```env
VERCEL_TOKEN=<paste_your_token_here>
VERCEL_PROJECT_ID=<paste_your_project_id_here>
VERCEL_PROJECT_NAME=trades-landing-template
```

## 🎯 Run the Agent

```powershell
# Install dependencies (if not already done)
npm install

# Launch the deployment agent
npm run deploy:agent
```

## 📊 What Happens

The agent will:

1. **✅ Build** - Compiles your Next.js app
2. **🔧 Auto-Fix** - Installs missing deps if needed
3. **🚀 Deploy** - Triggers Vercel production deployment
4. **⏳ Monitor** - Watches deployment progress (5 min timeout)
5. **🏥 Verify** - Checks if app is live & healthy
6. **📈 Report** - Shows success/failure/progress

## 🎉 Expected Output

```
🚀 Universal Auto-Deploy Loop Agent Activated
==================================================

🎯 Mission: Deploy app until live and healthy
🔄 Auto-retry: Up to 3 cycles
🤖 Auto-fix: Missing deps, build errors

🔄 CYCLE 1: Assess Current State
───────────────────────────────

📊 Checking existing deployments...
Latest deployment: trades-landing-template.vercel.app
State: READY

📦 Building application...
✅ Building application succeeded!

🚀 Triggering Vercel deployment...
   Deployment initiated: dpl_abc123def
   URL: trades-landing-template-xyz789.vercel.app

⏳ Monitoring deployment...
   ⏳ Deployment status: BUILDING (1/30)
   ⏳ Deployment status: READY (2/30)
   ✅ Deployment complete!

🏥 Verifying app health...
   ✅ App health: 200

📊 Self-Grade: ✅ SUCCESS

🎉 DEPLOYMENT COMPLETE!

🌐 Live URL: https://trades-landing-template-xyz789.vercel.app
```

## 🆘 Troubleshooting

| Error | Solution |
|-------|----------|
| `VERCEL_TOKEN not found` | Fill in `.env` file with your token |
| `Failed to trigger deployment` | Check token & project ID are correct |
| `Deployment takes 5+ minutes` | Normal - agent will retry automatically |
| Build fails locally | Run `npm run build` to debug |
| Health check fails | App may still be initializing, agent retries |

## 📁 Files Added

```
tools/vercel-agent/
├── agent.ts         ← Main deployment loop
├── vercelClient.ts  ← Vercel API client
└── README.md        ← Full documentation

.env.example        ← Template (commit to git)
.env               ← Your secrets (ignored by git - DON'T commit!)
```

## 🔐 Security Notes

✅ `.env` is automatically ignored by git  
✅ Your Vercel token never leaves your machine  
✅ Agent only calls official Vercel API  
✅ If token is leaked: Regenerate at https://vercel.com/account/tokens  

## 📚 Advanced Usage

**Full documentation**: See `tools/vercel-agent/README.md`

**Manual Vercel deployment**: 
```bash
vercel deploy --prod
```

**Check deployment status**:
```bash
npm run deploy:check
```

---

**Ready?** Run `npm run deploy:agent` now! 🚀
