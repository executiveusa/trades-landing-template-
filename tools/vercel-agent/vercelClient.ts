import 'dotenv/config';

const VERCEL_TOKEN = process.env.VERCEL_TOKEN;
const RAW_VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID?.trim();
const VERCEL_PROJECT_NAME = process.env.VERCEL_PROJECT_NAME?.trim();
const VERCEL_API = 'https://api.vercel.com';

const VALID_PROJECT_ID = /^prj_[A-Za-z0-9]+$/;
const PLACEHOLDER_VALUES = new Set([
  'your_project_id_here',
  '<paste_your_project_id_here>',
  'project_id_here',
]);

function getProjectSelector(): string {
  if (
    RAW_VERCEL_PROJECT_ID &&
    !PLACEHOLDER_VALUES.has(RAW_VERCEL_PROJECT_ID) &&
    VALID_PROJECT_ID.test(RAW_VERCEL_PROJECT_ID)
  ) {
    return RAW_VERCEL_PROJECT_ID;
  }

  if (VERCEL_PROJECT_NAME) {
    return VERCEL_PROJECT_NAME;
  }

  throw new Error(
    'No valid Vercel project selector is configured. Set VERCEL_PROJECT_NAME, or set VERCEL_PROJECT_ID to a real value beginning with "prj_".'
  );
}

interface DeploymentResponse {
  id: string;
  url: string;
  state?: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED';
  readyState?: 'BUILDING' | 'READY' | 'ERROR' | 'CANCELED';
}

async function vercelFetch(endpoint: string, options: RequestInit = {}) {
  if (!VERCEL_TOKEN) {
    throw new Error('VERCEL_TOKEN not found in .env');
  }

  const response = await fetch(`${VERCEL_API}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${VERCEL_TOKEN}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Vercel API error (${response.status}): ${error}`);
  }

  return response.json();
}

export async function triggerDeploy(): Promise<DeploymentResponse> {
  const project = getProjectSelector();
  console.log(`   Triggering deployment for project: ${project}`);

  try {
    return await vercelFetch('/v13/deployments', {
      method: 'POST',
      body: JSON.stringify({
        name: VERCEL_PROJECT_NAME || project,
        project,
        target: 'production',
      }),
    });
  } catch (error: any) {
    throw new Error(`Failed to trigger deployment: ${error.message}`);
  }
}

export async function getDeploymentStatus(deploymentId: string): Promise<DeploymentResponse> {
  return vercelFetch(`/v13/deployments/${deploymentId}`);
}

export async function listDeployments(limit: number = 5): Promise<DeploymentResponse[]> {
  try {
    const project = encodeURIComponent(getProjectSelector());
    const data = await vercelFetch(`/v9/projects/${project}/deployments?limit=${limit}`);
    return data.deployments || [];
  } catch (error: any) {
    throw new Error(`Failed to list deployments: ${error.message}`);
  }
}

export async function getDeploymentLogs(deploymentId: string): Promise<string[]> {
  try {
    const data = await vercelFetch(`/v2/deployments/${deploymentId}/events`);
    return (data || []).map((event: any) => event.text || '').filter(Boolean);
  } catch {
    return [];
  }
}
