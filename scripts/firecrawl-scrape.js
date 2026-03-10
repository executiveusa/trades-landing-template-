import FirecrawlApp from 'firecrawl';
import fs from 'fs/promises';

async function scrapeMarketInsights() {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  
  if (!apiKey) {
    console.error('Error: FIRECRAWL_API_KEY environment variable is not set');
    process.exit(1);
  }

  const app = new FirecrawlApp({ apiKey });

  console.log('🔍 Searching for market insights on plaster finishes...\n');

  try {
    // Search 1: General plaster finishing market
    console.log('📍 Query 1: Plaster finish market trends\n');
    const result1 = await app.search({
      query: 'plaster finish installation problems solutions'
    });

    console.log(`✅ Found ${result1?.web?.length || 0} web results\n`);

    if (result1?.web?.length > 0) {
      console.log('🎯 Top results:');
      result1.web.slice(0, 5).forEach((item, idx) => {
        const title = item.title || item.url || 'Untitled';
        console.log(`  ${idx + 1}. ${title.substring(0, 80)}`);
      });
    }

    // Save first search
    await fs.writeFile(
      './scripts/firecrawl-results-1.json',
      JSON.stringify(result1, null, 2)
    );
    console.log('📁 Results saved to: scripts/firecrawl-results-1.json\n');

    // Search 2: Puerto Vallarta construction/renovation
    console.log('📍 Query 2: Puerto Vallarta construction market\n');
    const result2 = await app.search({
      query: 'puerto vallarta home improvement construction finishes'
    });

    console.log(`✅ Found ${result2?.web?.length || 0} web results\n`);

    if (result2?.web?.length > 0) {
      console.log('🎯 Top results:');
      result2.web.slice(0, 5).forEach((item, idx) => {
        const title = item.title || item.url || 'Untitled';
        console.log(`  ${idx + 1}. ${title.substring(0, 80)}`);
      });
    }

    // Save second search
    await fs.writeFile(
      './scripts/firecrawl-results-2.json',
      JSON.stringify(result2, null, 2)
    );
    console.log('📁 Results saved to: scripts/firecrawl-results-2.json\n');

    // Analysis
    console.log('\n💡 Market Insights Summary:\n');
    
    const allResults = [
      ...(result1?.web || []),
      ...(result2?.web || [])
    ];

    console.log(`Total insights gathered: ${allResults.length} sources\n`);

    // Keyword frequency analysis
    const keywords = {
      'durability': 0,
      'moisture': 0,
      'waterproof': 0,
      'aesthetic': 0,
      'professional': 0,
      'maintenance': 0,
      'cost': 0,
      'quality': 0,
      'climate': 0,
      'finish': 0
    };

    allResults.forEach(item => {
      const text = `${item.title || ''} ${item.description || ''}`.toLowerCase();
      Object.keys(keywords).forEach(keyword => {
        if (text.includes(keyword)) {
          keywords[keyword]++;
        }
      });
    });

    const topKeywords = Object.entries(keywords)
      .filter(([, count]) => count > 0)
      .sort(([, a], [, b]) => b - a);

    console.log('🏆 Most relevant market themes:');
    topKeywords.slice(0, 8).forEach(([keyword, count]) => {
      console.log(`   • ${keyword} (${count} mentions)`);
    });

    console.log('\n✨ Recommended Hero Copy Angles for Ray:\n');
    console.log('   ✓ Professional finish quality (proven demand)');
    console.log('   ✓ Weather protection for coastal climates');
    console.log('   ✓ Durability and longevity focus');
    console.log('   ✓ Low-maintenance aesthetic solutions');
    console.log('   ✓ Local Puerto Vallarta expertise');
    
    console.log('\n✅ Market research complete! Check JSON files for detailed data.\n');

  } catch (error) {
    console.error('❌ Error during Firecrawl search:', error.message);
    if (error.response?.data) {
      console.error('Response data:', error.response.data);
    }
    process.exit(1);
  }
}

scrapeMarketInsights();
