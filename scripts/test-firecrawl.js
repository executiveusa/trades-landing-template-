import FirecrawlApp from 'firecrawl';

async function test() {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  console.log('API Key provided:', !!apiKey);
  
  if (!apiKey) {
    console.error('No API key');
    process.exit(1);
  }

  try {
    const app = new FirecrawlApp({ apiKey });
    console.log('✅ FirecrawlApp initialized');

    // Try a simpler scrape
    console.log('Testing scrape on https://example.com...');
    const result = await app.scrape('https://www.reddit.com/r/homeimprovement/');
    
    console.log('✅ Scrape succeeded!');
    console.log('Keys:', Object.keys(result));
    console.log('Preview:', JSON.stringify(result).substring(0, 200));
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Full error:', error);
  }
}

test();
