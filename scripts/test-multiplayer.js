const io = require('socket.io-client');

async function testMultiplayer() {
  console.log('[Test] Verifying HTTP routes first...');
  const urls = [
    '/en',
    '/hi',
    '/gu',
    '/en/festivals',
    '/en/festivals/diwali',
    '/hi/festivals/diwali',
    '/gu/festivals/diwali',
    '/en/calendar',
    '/en/recipes',
    '/en/recipes/gujiya-karanji',
    '/en/studio',
    '/en/quiz',
    '/en/explorer',
    '/en/corrections',
    '/admin/login',
    '/robots.txt',
    '/sitemap.xml'
  ];
  for (const u of urls) {
    try {
      const res = await fetch(`http://localhost:3000${u}`);
      console.log(`[HTTP Test] ${u} -> ${res.status}`);
    } catch (e) {
      console.error(`[HTTP Test Error] ${u} ->`, e.message);
    }
  }

  console.log('\n[Test] Connecting client 1 (Host) to http://localhost:3000...');
  const socket1 = io('http://localhost:3000', {
    path: '/api/socketio',
    transports: ['websocket']
  });

  await new Promise((resolve, reject) => {
    socket1.on('connect', () => {
      console.log('[Test] Client 1 connected:', socket1.id);
      resolve();
    });
    socket1.on('connect_error', reject);
    setTimeout(() => reject(new Error('Connection timeout')), 5000);
  });

  // Host creates room
  const room = await new Promise((resolve) => {
    socket1.emit('create_room', {
      hostName: 'Aarav Host',
      avatar: '🪔',
      gameMode: 'battle',
      maxPlayers: 4
    }, (res) => {
      console.log('[Test] Room created successfully:', res);
      resolve(res.room);
    });
  });

  // Client 2 joins room
  console.log('[Test] Connecting client 2 (Player) to room', room.code);
  const socket2 = io('http://localhost:3000', {
    path: '/api/socketio',
    transports: ['websocket']
  });

  await new Promise((resolve, reject) => {
    socket2.on('connect', () => {
      console.log('[Test] Client 2 connected:', socket2.id);
      resolve();
    });
    setTimeout(() => reject(new Error('Connection timeout 2')), 5000);
  });

  await new Promise((resolve) => {
    socket2.emit('join_room', {
      roomCode: room.code,
      nickname: 'Diya Player',
      avatar: '🌸'
    }, (res) => {
      console.log('[Test] Player joined room successfully:', res);
      resolve(res);
    });
  });

  // Player toggles ready
  socket2.emit('toggle_ready', { roomCode: room.code });

  // Host starts game
  await new Promise((resolve) => {
    socket1.on('game_started', (data) => {
      console.log('[Test] Game started event received! Total questions:', data.totalQuestions);
      resolve(data);
    });
    console.log('[Test] Host starting game...');
    socket1.emit('start_game', { roomCode: room.code }, (res) => {
      console.log('[Test] start_game ack:', res);
    });
  });

  // Listen for question
  const question = await new Promise((resolve) => {
    socket1.on('new_question', (q) => {
      console.log('[Test] Question received:', q.index + 1, q.question);
      resolve(q);
    });
  });

  // Submit answer from client 1
  socket1.emit('submit_answer', {
    roomCode: room.code,
    optionIndex: 0,
    timeRemainingSec: 12
  });

  // Wait for round reveal
  await new Promise((resolve) => {
    socket1.on('round_revealed', (res) => {
      console.log('[Test] Round revealed! Correct answer:', res.correctIndex, 'Leaderboard:', res.leaderboard.map(p => `${p.nickname}: ${p.score}`));
      resolve(res);
    });
  });

  console.log('[Test] Multiplayer flow test verified successfully!');
  socket1.disconnect();
  socket2.disconnect();
  process.exit(0);
}

testMultiplayer().catch((err) => {
  console.error('[Test Failed]:', err);
  process.exit(1);
});
