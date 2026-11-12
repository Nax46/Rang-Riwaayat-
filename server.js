process.chdir(__dirname);
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');

const dev = process.env.NODE_ENV === 'development';
const hostname = process.env.HOST || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

const app = next({ dev });
const handle = app.getRequestHandler();

// In-Memory Ephemeral Room State (Server-Authoritative Game Store)
const rooms = new Map();

// Sample Verified Question Pool for Realtime Games
const QUESTION_BANK = [
  {
    id: 'rt-1',
    category: 'battle',
    question: {
      en: 'Which festival commemorates the release of Guru Hargobind Ji and 52 Hindu Kings from Gwalior Fort?',
      hi: 'किस पर्व के दिन गुरु हरगोबिंद जी और 52 राजाओं की ग्वालियर किले से रिहाई की स्मृति मनाई जाती है?',
      gu: 'કયા પર્વ પર ગુરુ હરગોબિંદજી અને ૫૨ રાજાઓની મુક્તિની યાદમાં બંદી છોડ દિવસ ઉજવાય છે?'
    },
    options: {
      en: ['Bandi Chhor Divas', 'Vaisakhi', 'Holla Mohalla', 'Maghi'],
      hi: ['बंदी छोड़ दिवस', 'बैसाखी', 'होला मोहल्ला', 'माघी'],
      gu: ['બંદી છોડ દિવસ', 'વૈશાખી', 'હોલા મોહલ્લા', 'માઘી']
    },
    correctOptionIndex: 0,
    explanation: 'Bandi Chhor Divas aligns with Diwali and commemorates Guru Hargobind Ji freeing 52 captive rajas.',
    citation: 'SGPC Historical Sikh Records'
  },
  {
    id: 'rt-2',
    category: 'battle',
    question: {
      en: 'In which state is the ancient 10-day carnival of Onam celebrated with the Onasadya feast?',
      hi: 'केरल के किस प्रसिद्ध 10-दिवसीय पर्व में ओणसद्या महाभोज का आयोजन होता है?',
      gu: 'ઓણસદ્યા ભોજન સાથે ૧૦ દિવસનો ઓણમ મહોત્સવ કયા રાજ્યમાં ઉજવાય છે?'
    },
    options: {
      en: ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh'],
      hi: ['तमिलनाडु', 'कर्नाटक', 'केरल', 'आंध्र प्रदेश'],
      gu: ['તમિલનાડુ', 'કર્ણાટક', 'કેરળ', 'આંધ્ર પ્રદેશ']
    },
    correctOptionIndex: 2,
    explanation: 'Onam is Kerala’s state harvest festival celebrating benevolent King Mahabali.',
    citation: 'Government of Kerala Cultural Affairs'
  },
  {
    id: 'rt-3',
    category: 'guess',
    question: {
      en: 'Clue: 108 Lotuses, Dhunuchi Naach, UNESCO Inscribed, Clay murtis crafted in Kumartuli. Which festival is this?',
      hi: 'संकेत: 108 नीलकमल, धुनुची नृत्य, यूनेस्को अमूर्त धरोहर, कुमारतुली में बनी मिट्टी की प्रतिमाएं। यह कौन सा उत्सव है?',
      gu: 'સંકેત: ૧૦૮ કમળ, ધુનુચી નૃત્ય, યુનેસ્કો માન્યતા, કુમારતુલીમાં બનેલી માટીની મૂર્તિઓ. આ કયો તહેવાર છે?'
    },
    options: {
      en: ['Ganesh Chaturthi', 'Durga Puja', 'Chhath Puja', 'Kumbh Mela'],
      hi: ['गणेश चतुर्थी', 'दुर्गा पूजा', 'छठ पूजा', 'कुंभ मेला'],
      gu: ['ગણેશ ચતુર્થી', 'દુર્ગા પૂજા', 'છઠ પૂજા', 'કુંભ મેળો']
    },
    correctOptionIndex: 1,
    explanation: 'Durga Puja in Kolkata was inscribed by UNESCO in 2021.',
    citation: 'UNESCO Representative List of Intangible Heritage'
  },
  {
    id: 'rt-4',
    category: 'food',
    question: {
      en: 'Which sweet dish is prepared on Eid ul-Fitr using roasted vermicelli, full cream milk, and soaked dates?',
      hi: 'ईद-उल-फ़ित्र पर भुनी सेंवई, दूध और छुहारों से बनने वाला शाही मीठा व्यंजन कौन सा है?',
      gu: 'ઈદ પર સેવ, દૂધ અને ખારેકમાંથી બનતી શાહી વાનગી કઈ છે?'
    },
    options: {
      en: ['Phirni', 'Sheer Khurma', 'Shahi Tukda', 'Basundi'],
      hi: ['फिरनी', 'शीर खुरमा', 'शाही टुकड़ा', 'बासुंदी'],
      gu: ['ફિરની', 'શીર્ ખુરમા', 'શાહી ટુકડા', 'બાસુંદી']
    },
    correctOptionIndex: 1,
    explanation: 'Sheer Khurma translates from Persian literally as "milk and dates".',
    citation: 'Traditional Awadhi & Hyderabadi Culinary Archives'
  },
  {
    id: 'rt-5',
    category: 'map',
    question: {
      en: 'The 10-day Hornbill Festival celebrating 16 indigenous tribes takes place at Kisama in which state?',
      hi: '16 जनजातियों का 10-दिवसीय हॉर्नबिल महोत्सव किसामा में किस राज्य में आयोजित होता है?',
      gu: '૧૬ જનજાતિઓનો ૧૦-દિવસીય હોર્નબિલ ફેસ્ટિવલ કયા રાજ્યમાં યોજાય છે?'
    },
    options: {
      en: ['Mizoram', 'Nagaland', 'Meghalaya', 'Manipur'],
      hi: ['मिजोरम', 'नागालैंड', 'मेघालय', 'मणिपुर'],
      gu: ['મિઝોરમ', 'નાગાલેન્ડ', 'મેઘાલય', 'મણિપુર']
    },
    correctOptionIndex: 1,
    explanation: 'Hornbill Festival is organized annually in Kohima / Kisama, Nagaland.',
    citation: 'Nagaland Tourism Department'
  }
];

function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      await handle(req, res);
    } catch (e) {
      console.error('[Server Error]', e);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    path: '/api/socketio',
  });

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // CREATE ROOM
    socket.on('create_room', ({ hostName, avatar, gameMode, password, maxPlayers = 8 }, callback) => {
      let roomCode = generateRoomCode();
      while (rooms.has(roomCode)) {
        roomCode = generateRoomCode();
      }

      const hostPlayer = {
        id: socket.id,
        nickname: hostName || 'Host',
        avatar: avatar || '🪔',
        isHost: true,
        isReady: true,
        score: 0,
        answeredCurrent: false,
      };

      const newRoom = {
        code: roomCode,
        password: password || '',
        gameMode: gameMode || 'battle',
        maxPlayers: Math.min(Math.max(maxPlayers, 2), 16),
        status: 'LOBBY', // LOBBY, PLAYING, ROUND_RESULT, FINISHED
        hostId: socket.id,
        players: [hostPlayer],
        currentQuestionIndex: 0,
        questions: [...QUESTION_BANK],
        roundTimer: null,
        roundSecondsLeft: 15,
        lastActivity: Date.now(),
      };

      rooms.set(roomCode, newRoom);
      socket.join(roomCode);
      socket.data = { roomCode, playerId: socket.id };

      console.log(`[Room Created] Code: ${roomCode} by ${hostName}`);
      if (typeof callback === 'function') {
        callback({ success: true, room: sanitizeRoom(newRoom), roomCode });
      }
    });

    // JOIN ROOM
    socket.on('join_room', ({ roomCode, nickname, avatar, password }, callback) => {
      const code = (roomCode || '').toUpperCase().trim();
      const room = rooms.get(code);

      if (!room) {
        return callback && callback({ success: false, error: 'Room not found. Check code.' });
      }

      if (room.status !== 'LOBBY') {
        return callback && callback({ success: false, error: 'Game is already in progress.' });
      }

      if (room.players.length >= room.maxPlayers) {
        return callback && callback({ success: false, error: 'Room has reached maximum capacity.' });
      }

      if (room.password && room.password !== password) {
        return callback && callback({ success: false, error: 'Incorrect room password.' });
      }

      // Check duplicate nickname
      const trimmedNick = (nickname || 'Player').trim();
      if (room.players.some((p) => p.nickname.toLowerCase() === trimmedNick.toLowerCase())) {
        return callback && callback({ success: false, error: 'Nickname already taken in this room.' });
      }

      const newPlayer = {
        id: socket.id,
        nickname: trimmedNick,
        avatar: avatar || '✨',
        isHost: false,
        isReady: false,
        score: 0,
        answeredCurrent: false,
      };

      room.players.push(newPlayer);
      room.lastActivity = Date.now();
      socket.join(code);
      socket.data = { roomCode: code, playerId: socket.id };

      io.to(code).emit('room_updated', sanitizeRoom(room));
      if (typeof callback === 'function') {
        callback({ success: true, room: sanitizeRoom(room), roomCode: code });
      }
    });

    // TOGGLE READY STATUS
    socket.on('toggle_ready', () => {
      const { roomCode, playerId } = socket.data || {};
      const room = rooms.get(roomCode);
      if (!room) return;

      const player = room.players.find((p) => p.id === playerId);
      if (player && !player.isHost) {
        player.isReady = !player.isReady;
        room.lastActivity = Date.now();
        io.to(roomCode).emit('room_updated', sanitizeRoom(room));
      }
    });

    // START GAME (Server-authoritative)
    socket.on('start_game', () => {
      const { roomCode, playerId } = socket.data || {};
      const room = rooms.get(roomCode);
      if (!room || room.hostId !== playerId) return;

      room.status = 'PLAYING';
      room.currentQuestionIndex = 0;
      room.players.forEach((p) => {
        p.score = 0;
        p.answeredCurrent = false;
      });
      room.lastActivity = Date.now();

      io.to(roomCode).emit('game_started', sanitizeRoom(room));
      sendNextQuestion(room, io);
    });

    // SUBMIT ANSWER (Server Authoritative scoring)
    socket.on('submit_answer', ({ optionIndex, clientTimeSubmitted }) => {
      const { roomCode, playerId } = socket.data || {};
      const room = rooms.get(roomCode);
      if (!room || room.status !== 'PLAYING') return;

      const player = room.players.find((p) => p.id === playerId);
      if (!player || player.answeredCurrent) return;

      player.answeredCurrent = true;
      const currentQ = room.questions[room.currentQuestionIndex];

      // Validate answer server-side
      const isCorrect = optionIndex === currentQ.correctOptionIndex;
      let pointsEarned = 0;
      if (isCorrect) {
        // Points scaled by time left: base 500 + up to 500 bonus
        const timeFraction = Math.max(0, room.roundSecondsLeft) / 15;
        pointsEarned = Math.round(500 + 500 * timeFraction);
        player.score += pointsEarned;
      }

      socket.emit('answer_ack', {
        isCorrect,
        pointsEarned,
        correctIndex: currentQ.correctOptionIndex,
        explanation: currentQ.explanation,
        citation: currentQ.citation,
      });

      io.to(roomCode).emit('room_updated', sanitizeRoom(room));

      // If all players have answered, conclude round early
      const allAnswered = room.players.every((p) => p.answeredCurrent);
      if (allAnswered && room.roundTimer) {
        clearInterval(room.roundTimer);
        revealRoundResults(room, io);
      }
    });

    // REMATCH
    socket.on('rematch', () => {
      const { roomCode, playerId } = socket.data || {};
      const room = rooms.get(roomCode);
      if (!room || room.hostId !== playerId) return;

      room.status = 'LOBBY';
      room.currentQuestionIndex = 0;
      room.players.forEach((p) => {
        p.score = 0;
        p.answeredCurrent = false;
        p.isReady = p.isHost;
      });
      io.to(roomCode).emit('room_updated', sanitizeRoom(room));
    });

    // DISCONNECT
    socket.on('disconnect', () => {
      const { roomCode, playerId } = socket.data || {};
      if (!roomCode) return;
      const room = rooms.get(roomCode);
      if (!room) return;

      // Grace period: mark or remove
      room.players = room.players.filter((p) => p.id !== playerId);

      if (room.players.length === 0) {
        rooms.delete(roomCode);
        console.log(`[Room Removed] Empty room ${roomCode}`);
      } else {
        // If host left, pass host to next player
        if (room.hostId === playerId && room.players.length > 0) {
          room.players[0].isHost = true;
          room.players[0].isReady = true;
          room.hostId = room.players[0].id;
        }
        io.to(roomCode).emit('room_updated', sanitizeRoom(room));
      }
    });
  });

  // Helper functions for authoritative game progression
  function sendNextQuestion(room, io) {
    if (room.currentQuestionIndex >= room.questions.length) {
      room.status = 'FINISHED';
      io.to(room.code).emit('game_over', {
        finalLeaderboard: room.players.sort((a, b) => b.score - a.score),
      });
      return;
    }

    const q = room.questions[room.currentQuestionIndex];
    room.players.forEach((p) => (p.answeredCurrent = false));
    room.roundSecondsLeft = 15;

    // Send question without revealing correct answer index!
    const sanitizedQuestion = {
      id: q.id,
      index: room.currentQuestionIndex + 1,
      total: room.questions.length,
      question: q.question,
      options: q.options,
      category: q.category,
      timeLimitSeconds: 15,
    };

    io.to(room.code).emit('new_question', sanitizedQuestion);

    // Start 1-second interval countdown on server
    if (room.roundTimer) clearInterval(room.roundTimer);
    room.roundTimer = setInterval(() => {
      room.roundSecondsLeft -= 1;
      io.to(room.code).emit('timer_tick', { secondsLeft: room.roundSecondsLeft });

      if (room.roundSecondsLeft <= 0) {
        clearInterval(room.roundTimer);
        revealRoundResults(room, io);
      }
    }, 1000);
  }

  function revealRoundResults(room, io) {
    room.status = 'ROUND_RESULT';
    const currentQ = room.questions[room.currentQuestionIndex];

    io.to(room.code).emit('round_revealed', {
      correctIndex: currentQ.correctOptionIndex,
      explanation: currentQ.explanation,
      citation: currentQ.citation,
      leaderboard: room.players.sort((a, b) => b.score - a.score),
    });

    // 4 second pause before next question
    setTimeout(() => {
      if (rooms.has(room.code)) {
        room.currentQuestionIndex += 1;
        room.status = 'PLAYING';
        sendNextQuestion(room, io);
      }
    }, 4500);
  }

  function sanitizeRoom(room) {
    return {
      code: room.code,
      gameMode: room.gameMode,
      maxPlayers: room.maxPlayers,
      hasPassword: !!room.password,
      status: room.status,
      hostId: room.hostId,
      players: room.players.map((p) => ({
        id: p.id,
        nickname: p.nickname,
        avatar: p.avatar,
        isHost: p.isHost,
        isReady: p.isReady,
        score: p.score,
        answeredCurrent: p.answeredCurrent,
      })),
      currentQuestionIndex: room.currentQuestionIndex,
      totalQuestions: room.questions.length,
    };
  }

  // Periodic cleanup of abandoned rooms older than 30 minutes
  setInterval(() => {
    const now = Date.now();
    for (const [code, room] of rooms.entries()) {
      if (now - room.lastActivity > 30 * 60 * 1000) {
        if (room.roundTimer) clearInterval(room.roundTimer);
        rooms.delete(code);
        console.log(`[Auto Cleanup] Expired room ${code}`);
      }
    }
  }, 5 * 60 * 1000);

  server.listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Rang & Riwaayat Server ready on http://${hostname}:${port}`);
    console.log(`> Realtime Socket.IO game engine active on /api/socketio`);
  });
}).catch((err) => {
  console.error('app.prepare failed:', err);
  process.exit(1);
});
