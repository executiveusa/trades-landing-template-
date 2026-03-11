import { execSync } from 'child_process';
import { triggerDeploy, getDeploymentStatus, listDeployments } from './vercelClient.js';

type Grade = 'SUCCESS' | 'PROGRESS' | 'FAILURE';

interface CycleResult {
  cycle: number;
  action: string;
  grade: Grade;
  errors: string[];
  nextAction: string;
}

const MAX_CYCLES = 3;
const MAX_DEPLOY_WAIT = 30;

function runCommand(command: string, description: string): { success: boolean; output: string } {
  console.log(`\n📦 ${description}...`);
  try {
    const output = execSync(command, { encoding: 'utf-8', stdio: 'pipe' });
    console.log(`✅ ${description} succeeded!`);
    return { success: true, output };
  } catch (error: any) {
    console.log(`❌ ${description} failed!`);
    return { success: false, output: error.message };
  }
}

async function waitForDeployment(deploymentId: string): Promise<Grade> {
  console.log(`\n⏳ Monitoring deployment...`);
  console.log(`   Deployment ID: ${deploymentId}`);
  
  for (let i = 0; i < MAX_DEPLOY_WAIT; i++) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    
    try {
      const status = await getDeploymentStatus(deploymentId);
      const state = status.state || status.readyState;
      console.log(`   ⏳ Deployment status: ${state} (${i + 1}/${MAX_DEPLOY_WAIT})`);
      
      if (state === 'READY') {
        console.log(`   ✅ Deployment complete!`);
        return 'SUCCESS';
      }
      
      if (state === 'ERROR' || state === 'CANCELED') {
        console.log(`   ❌ Deployment failed!`);
        return 'FAILURE';
      }
    } catch (error) {
      console.log(`   ⚠️ Error checking status: ${error}`);
    }
  }
  
  console.log(`   ⚠️ Deployment timeout after 5 minutes`);
  return 'PROGRESS';
}

async function verifyHealth(url: string): Promise<boolean> {
  console.log(`\n🏥 Verifying app health...`);
  console.log(`   Testing: https://${url}`);
  
  try {
    const response = await fetch(`https://${url}`, { timeout: 10000 } as any);
    const isHealthy = response.ok;
    console.log(`   ${isHealthy ? '✅' : '❌'} App health: ${response.status}`);
    return isHealthy;
  } catch (error) {
    console.log(`   ❌ Health check failed: ${error}`);
    return false;
  }
}

async function agenticBuildTestDeployLoop(): Promise<void> {
  console.log('🚀 Universal Auto-Deploy Loop Agent Activated');
  console.log('='.repeat(50));
  console.log('');
  console.log('🎯 Mission: Deploy app until live and healthy');
  console.log('🔄 Auto-retry: Up to 3 cycles');
  console.log('🤖 Auto-fix: Missing deps, build errors');
  console.log('');
  
  const results: CycleResult[] = [];
  
  for (let cycle = 1; cycle <= MAX_CYCLES; cycle++) {
    console.log(`\n🔄 CYCLE ${cycle}: Assess Current State`);
    console.log('─'.repeat(50));
    
    console.log('\n📊 Checking existing deployments...');
    try {
      const deployments = await listDeployments(3);
      if (deployments.length > 0) {
        const latest = deployments[0];
        const state = latest.state || latest.readyState;
        console.log(`Latest deployment: ${latest.url}`);
        console.log(`State: ${state}`);
      } else {
        console.log('No existing deployments found.');
      }
    } catch (error: any) {
      console.log(`⚠️ Could not check existing deployments: ${error.message}`);
    }
    
    // Step: Build
    const buildResult = runCommand(
      'npm run build',
      'Building application'
    );
    
    if (!buildResult.success) {
      console.log('\n🔧 Auto-fix attempt: Installing dependencies...');
      runCommand('npm install', 'Installing dependencies');
      
      const retryBuild = runCommand('npm run build', 'Retrying build');
      
      if (!retryBuild.success) {
        results.push({
          cycle,
          action: 'build',
          grade: 'FAILURE',
          errors: [buildResult.output],
          nextAction: 'escalate'
        });
        console.log('\n📊 Self-Grade: ❌ FAILURE');
        console.log('Decision: Cannot proceed without successful build.');
        continue;
      }
    }
    
    // Step: Deploy
    console.log('\n🚀 Triggering Vercel deployment...');
    try {
      const deployment = await triggerDeploy();
      console.log(`   Deployment initiated: ${deployment.id}`);
      console.log(`   URL: ${deployment.url}`);
      
      const deployGrade = await waitForDeployment(deployment.id);
      
      if (deployGrade === 'SUCCESS') {
        const isHealthy = await verifyHealth(deployment.url);
        
        if (isHealthy) {
          results.push({
            cycle,
            action: 'deploy',
            grade: 'SUCCESS',
            errors: [],
            nextAction: 'complete'
          });
          
          console.log('\n📊 Self-Grade: ✅ SUCCESS');
          console.log(`\n🎉 DEPLOYMENT COMPLETE!`);
          console.log(`\n🌐 Live URL: https://${deployment.url}`);
          break;
        } else {
          results.push({
            cycle,
            action: 'health-check',
            grade: 'FAILURE',
            errors: ['Health check failed'],
            nextAction: 'retry'
          });
          console.log('\n📊 Self-Grade: ❌ FAILURE (Health Check)');
        }
      } else {
        results.push({
          cycle,
          action: 'deploy',
          grade: deployGrade,
          errors: [],
          nextAction: deployGrade === 'PROGRESS' ? 'retry' : 'escalate'
        });
        console.log('\n📊 Self-Grade: 🟡 PROGRESS or ❌ FAILURE');
      }
    } catch (error: any) {
      results.push({
        cycle,
        action: 'deploy',
        grade: 'FAILURE',
        errors: [error.message],
        nextAction: 'retry'
      });
      console.log(`\n❌ Deployment error: ${error.message}`);
    }
  }
  
  console.log('\n\n📈 FINAL REPORT');
  console.log('='.repeat(50));
  results.forEach(r => {
    console.log(`Cycle ${r.cycle}: ${r.action} → ${r.grade}`);
  });
}

agenticBuildTestDeployLoop().catch(console.error);
