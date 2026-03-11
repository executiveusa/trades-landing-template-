# Universal Auto-Deploy Loop Agent

Autonomous deployment agent that builds, tests, and deploys your app until it's live and healthy.

## Features

✅ **Automatic Build** - Runs `npm run build`  
✅ **Auto-Fix** - Installs missing dependencies automatically  
✅ **Vercel Integration** - Triggers production deployments  
✅ **Health Monitoring** - Verifies app is live and responding  
✅ **Self-Grading** - Reports success/failure/progress  
✅ **Auto-Retry** - Up to 3 deployment cycles  
✅ **Zero External Services** - Only uses Vercel API  

## Prerequisites

1. **Node.js 18+** - Already installed
2. **Vercel Account** - https://vercel.com
3. **Vercel Token** - Generate at https://vercel.com/account/tokens
4. **Project on Vercel** - Must be connected to your GitHub repo

## Setup (5 minutes)

### Step 1: Create Vercel Token

1. Go to: https://vercel.com/account/tokens
2. Click "Create"
3. Name it: `trades-deployment-agent`
4. Select "Full Access"
5. Click "Create Token"
6. Copy the token (you won't see it again!)

### Step 2: Get Project ID

1. Go to: https://vercel.com/dashboard
2. Click on your **trades-landing-template** project
3. Go to **Settings** → **General**
4. Copy the **Project ID**

### Step 3: Configure .env

Edit `.env` in project root:

```env
VERCEL_TOKEN=your_token_from_step_1
VERCEL_PROJECT_ID=your_project_id_from_step_2
VERCEL_PROJECT_NAME=trades-landing-template
```

### Step 4: Install Dependencies

```bash
npm install
```

This adds:
- `tsx` - TypeScript executor for Node.js
- `dotenv` - Environment variable loader

## Usage

### Run the Deployment Agent

```bash
npm run deploy:agent
```

The agent will:
1. **Cycle 1**: Check deployments → Build → Deploy → Monitor → Health check
2. **Cycle 2** (if needed): Retry with dependency installation
3. **Cycle 3** (if needed): Final retry attempt

Output shows real-time status:
- ✅ SUCCESS - App is live and healthy
- ⏳ PROGRESS - Building/deploying, monitoring...
- ❌ FAILURE - Build failed or deployment error

### Example Output

```
🚀 Universal Auto-Deploy Loop Agent Activated
==================================================

🎯 Mission: Deploy app until live and healthy
🔄 Auto-retry: Up to 3 cycles
🤖 Auto-fix: Missing deps, build errors

🔄 CYCLE 1: Assess Current State
──────────────────────────────────────────────────

📊 Checking existing deployments...
Latest deployment: trades-landing-template.vercel.app
State: READY

📦 Building application...
✅ Building application succeeded!

🚀 Triggering Vercel deployment...
   Deployment initiated: dpl_xxx
   URL: trades-landing-template-abc123.vercel.app

⏳ Monitoring deployment...
   Deployment ID: dpl_xxx
   ⏳ Deployment status: BUILDING (1/30)
   ⏳ Deployment status: READY (2/30)
   ✅ Deployment complete!

🏥 Verifying app health...
   Testing: https://trades-landing-template-abc123.vercel.app
   ✅ App health: 200

📊 Self-Grade: ✅ SUCCESS

🎉 DEPLOYMENT COMPLETE!

🌐 Live URL: https://trades-landing-template-abc123.vercel.app
```

## File Structure

```
tools/vercel-agent/
├── agent.ts            # Main deployment loop
├── vercelClient.ts     # Vercel API wrapper
└── README.md          # This file

.env                   # Configuration (KEEP SECRET!)
.env.example          # Configuration template
package.json          # Scripts: deploy:agent, deploy:check
```

## How It Works

### Build Phase
- Runs `npm run build`
- If fails → Auto-installs dependencies → Retries

### Deployment Phase
- Calls Vercel API to trigger new deployment
- Monitors deployment status every 10 seconds
- Waits up to 5 minutes for completion

### Health Check Phase
- Fetches app homepage
- Checks HTTP 200 status
- Confirms app is live and responsive

### Auto-Retry
- Max 3 cycles
- Each cycle: build → deploy → verify
- Stops on success or escalation

## Troubleshooting

### Error: `VERCEL_TOKEN not found in .env`
→ You haven't filled in the `.env` file. Copy values from Setup section.

### Error: `Failed to trigger deployment`
→ Check:
   - Token is correct (copy from Vercel dashboard again)
   - Project ID is correct
   - Project is connected to GitHub

### Deployment takes too long
→ Normal! First deployments can take 2-5 minutes.
→ Agent automatically retries if timeout.

### Build keeps failing
→ Check local build with: `npm run build`
→ Fix any errors locally first

### Health check fails (200 status not returned)
→ App might still be initializing
→ Agent will retry automatically

## Next Steps

After successful deployment:

1. **Test your site**: Visit the URL from agent output
2. **Custom domain**: Add domain in Vercel Settings
3. **Analytics**: Setup Google Analytics in content/tenant.json
4. **Auto-deploy**: Push to GitHub → auto-trigger on future commits

## Advanced

### Skip Health Check
Edit `agent.ts` → Comment out `verifyHealth()` section

### Change Retry Limit
Edit `agent.ts` → Change `MAX_CYCLES = 3` to desired number

### Schedule Deployments
Use GitHub Actions or cron job to run:
```bash
npm run deploy:agent
```

## Security

⚠️ **IMPORTANT**:
- `.env` contains sensitive tokens - **NEVER commit to git**
- `.gitignore` already excludes `.env`
- Keep your Vercel token secret
- If compromised: regenerate at https://vercel.com/account/tokens

---

**Status**: Ready to deploy! 🚀
