import http from 'http';
import { spawn } from 'child_process';

async function testRoute(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        });
      });
    }).on('error', reject);
  });
}

async function run() {
  console.log('[PROBE] Starting Node server on port 3000...');
  const serverProc = spawn('node', ['server.js'], {
    env: { ...process.env, PORT: '3000', NODE_ENV: 'production', HOST: '127.0.0.1' },
    stdio: 'pipe',
  });

  serverProc.stdout.on('data', (d) => {
    const msg = d.toString();
    if (msg.includes('ready') || msg.includes('Server ready')) {
      console.log('[SERVER LOG]', msg.trim());
    }
  });

  serverProc.stderr.on('data', (d) => {
    console.error('[SERVER ERR]', d.toString());
  });

  // Wait 4 seconds for server boot
  await new Promise((r) => setTimeout(r, 4000));

  try {
    console.log('\n--- 1. Testing Health Endpoint ---');
    const health = await testRoute('http://127.0.0.1:3000/api/health');
    console.log(`HTTP ${health.statusCode} - Status: ${health.body.slice(0, 100)}`);
    const healthJson = JSON.parse(health.body);
    if (healthJson.status !== 'healthy') throw new Error('Health probe failed!');

    console.log('\n--- 2. Testing Google AdSense ads.txt ---');
    const adsTxt = await testRoute('http://127.0.0.1:3000/ads.txt');
    console.log(`HTTP ${adsTxt.statusCode} Content-Type: ${adsTxt.headers['content-type']}`);
    console.log(`Body excerpt: ${adsTxt.body.trim()}`);
    if (!adsTxt.body.includes('google.com') || !adsTxt.body.includes('f08c47fec0942fa0')) {
      throw new Error('ads.txt verification string missing!');
    }

    console.log('\n--- 3. Testing Humanized English Home Page ---');
    const enHome = await testRoute('http://127.0.0.1:3000/en');
    console.log(`HTTP ${enHome.statusCode}`);
    if (!enHome.body.includes('Where Every Tradition Finds a Home')) {
      throw new Error('English humanized hero heading missing!');
    }
    console.log('✓ Found humanized English hero: "Where Every Tradition Finds a Home & Every Celebration Finds a Voice"');

    console.log('\n--- 4. Testing Humanized Hindi Home Page ---');
    const hiHome = await testRoute('http://127.0.0.1:3000/hi');
    console.log(`HTTP ${hiHome.statusCode}`);
    if (!hiHome.body.includes('जहाँ हर परंपरा पाती है अपना घर')) {
      throw new Error('Hindi humanized hero heading missing!');
    }
    console.log('✓ Found heartfelt Hindi hero: "जहाँ हर परंपरा पाती है अपना घर..."');

    console.log('\n--- 5. Testing Humanized Gujarati Home Page ---');
    const guHome = await testRoute('http://127.0.0.1:3000/gu');
    console.log(`HTTP ${guHome.statusCode}`);
    if (!guHome.body.includes('જ્યાં દરેક પરંપરાને મળે છે પોતાનું ઘર')) {
      throw new Error('Gujarati humanized hero heading missing!');
    }
    console.log('✓ Found authentic Gujarati hero: "જ્યાં દરેક પરંપરાને મળે છે પોતાનું ઘર..."');

    console.log('\n--- 6. Testing Diwali Festival Page Storytelling ---');
    const diwali = await testRoute('http://127.0.0.1:3000/en/festivals/diwali');
    console.log(`HTTP ${diwali.statusCode}`);
    if (!diwali.body.includes('The quiet magic of oil-soaked earthen diyas')) {
      throw new Error('Diwali humanized prose missing!');
    }
    console.log('✓ Verified Diwali rich storytelling and sensory detail');

    console.log('\n--- 7. Testing Celebration Studio Responsive Mobile UI ---');
    const studio = await testRoute('http://127.0.0.1:3000/en/studio');
    console.log(`HTTP ${studio.statusCode}`);
    if (!studio.body.includes('Edit Design &amp; Words') && !studio.body.includes('Edit Design & Words')) {
      throw new Error('Studio mobile tabs missing!');
    }
    console.log('✓ Verified Celebration Studio responsive mobile tab switcher & controls');

    console.log('\n--- 8. Testing Multiplayer Quiz Arena ---');
    const quiz = await testRoute('http://127.0.0.1:3000/en/quiz');
    console.log(`HTTP ${quiz.statusCode}`);
    if (!quiz.body.includes('Fun Zone &amp; Multiplayer Game Arena') && !quiz.body.includes('Fun Zone & Multiplayer Game Arena')) {
      throw new Error('Quiz arena heading missing!');
    }
    console.log('✓ Verified Multiplayer Game Arena is mounted and accessible');

    console.log('\n======================================================');
    console.log('🎉 ALL 8 FULL-STACK PRODUCTION VERIFICATION TESTS PASSED!');
    console.log('======================================================\n');
  } finally {
    serverProc.kill();
  }
}

run().catch((err) => {
  console.error('[PROBE ERROR]', err);
  process.exit(1);
});

