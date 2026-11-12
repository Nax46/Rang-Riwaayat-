'use client';

import React, { useState, useEffect } from 'react';
import { Locale } from '../lib/types';
import { getDictionary } from '../lib/i18n';
import { io, Socket } from 'socket.io-client';
import {
  Gamepad2,
  Users,
  Trophy,
  Clock,
  CheckCircle2,
  XCircle,
  Copy,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Shield,
  HelpCircle
} from 'lucide-react';
import { DiyaIcon, MandalaIcon } from './MotifDecoration';

interface ArenaProps {
  locale: Locale;
}

export function MultiplayerGameArena({ locale }: ArenaProps) {
  const dict = getDictionary(locale);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  // User input states
  const [nickname, setNickname] = useState('');
  const [avatar, setAvatar] = useState('🪔');
  const [roomCodeInput, setRoomCodeInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [gameMode, setGameMode] = useState('battle');
  const [activeTab, setActiveTab] = useState<'lobby' | 'singleplayer'>('lobby');

  // Room & Game state
  const [currentRoom, setCurrentRoom] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [roundTimer, setRoundTimer] = useState<number>(15);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerFeedback, setAnswerFeedback] = useState<any>(null);
  const [roundResults, setRoundResults] = useState<any>(null);
  const [finalGameOver, setFinalGameOver] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [inviteCopied, setInviteCopied] = useState(false);

  // Singleplayer practice state
  const [soloScore, setSoloScore] = useState(0);
  const [soloQIndex, setSoloQIndex] = useState(0);
  const [soloSelectedOption, setSoloSelectedOption] = useState<number | null>(null);
  const [soloShowResult, setSoloShowResult] = useState(false);

  const avatars = ['🪔', '🌺', '🕉️', '🕌', '☬', '🥁', '👑', '🥘', '🪁', '🦚'];

  useEffect(() => {
    // Connect to Socket.IO engine
    const s = io({
      path: '/api/socketio',
      transports: ['polling', 'websocket'],
    });

    s.on('connect', () => {
      setConnected(true);
    });

    s.on('disconnect', () => {
      setConnected(false);
    });

    s.on('room_updated', (room) => {
      setCurrentRoom(room);
      setErrorMessage(null);
    });

    s.on('game_started', (room) => {
      setCurrentRoom(room);
      setFinalGameOver(null);
      setRoundResults(null);
    });

    s.on('new_question', (q) => {
      setCurrentQuestion(q);
      setRoundTimer(q.timeLimitSeconds || 15);
      setSelectedOption(null);
      setAnswerFeedback(null);
      setRoundResults(null);
    });

    s.on('timer_tick', ({ secondsLeft }) => {
      setRoundTimer(secondsLeft);
    });

    s.on('answer_ack', (ack) => {
      setAnswerFeedback(ack);
    });

    s.on('round_revealed', (results) => {
      setRoundResults(results);
    });

    s.on('game_over', (overData) => {
      setFinalGameOver(overData);
      setCurrentQuestion(null);
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, []);

  const handleCreateRoom = () => {
    if (!nickname.trim()) {
      setErrorMessage('Please enter your nickname before creating a room.');
      return;
    }
    setErrorMessage(null);
    socket?.emit(
      'create_room',
      {
        hostName: nickname.trim(),
        avatar,
        gameMode,
        password: passwordInput,
        maxPlayers: 8,
      },
      (res: any) => {
        if (res.success) {
          setCurrentRoom(res.room);
        } else {
          setErrorMessage(res.error || 'Failed to create room.');
        }
      }
    );
  };

  const handleJoinRoom = () => {
    if (!nickname.trim() || !roomCodeInput.trim()) {
      setErrorMessage('Please enter both your nickname and a 6-digit Room PIN.');
      return;
    }
    setErrorMessage(null);
    socket?.emit(
      'join_room',
      {
        roomCode: roomCodeInput.trim(),
        nickname: nickname.trim(),
        avatar,
        password: passwordInput,
      },
      (res: any) => {
        if (res.success) {
          setCurrentRoom(res.room);
        } else {
          setErrorMessage(res.error || 'Could not join room.');
        }
      }
    );
  };

  const handleToggleReady = () => {
    socket?.emit('toggle_ready');
  };

  const handleStartGame = () => {
    socket?.emit('start_game');
  };

  const handleSubmitAnswer = (index: number) => {
    if (selectedOption !== null || !currentQuestion) return;
    setSelectedOption(index);
    socket?.emit('submit_answer', {
      optionIndex: index,
      clientTimeSubmitted: Date.now(),
    });
  };

  const handleRematch = () => {
    socket?.emit('rematch');
  };

  const copyInviteLink = () => {
    if (!currentRoom) return;
    const url = `${window.location.origin}/${locale}/quiz?room=${currentRoom.code}`;
    navigator.clipboard.writeText(url);
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 3000);
  };

  // Solo Practice Questions
  const soloQuestions: Array<{
    q: Record<Locale, string>;
    options: string[];
    correct: number;
    expl: string;
  }> = [
    {
      q: {
        en: 'Which UNESCO recognized floral carpet is designed during Thiruvonam in Kerala?',
        hi: 'केरल में थिरुवोणम के अवसर पर कौन सी पारंपरिक फूलों की रंगोली बनाई जाती है?',
        gu: 'કેરળમાં ઓણમ પર ફૂલોથી બનાવાતી કઈ રંગોળી વિશ્વપ્રસિદ્ધ છે?'
      },
      options: ['Athapookkalam', 'Alpana', 'Aipan', 'Mandana'],
      correct: 0,
      expl: 'Athapookkalam is laid daily during the 10 days of Onam commencing on Atham asterism.'
    },
    {
      q: {
        en: 'Which sweet is uniquely associated with the holy festival of Eid ul-Fitr?',
        hi: 'ईद-उल-फ़ित्र पर विशेष रूप से कौन सा मीठा व्यंजन बनाया जाता है?',
        gu: 'ઈદના તહેવાર સાથે કઈ મિઠાઈ વિશેષ રીતે જોડાયેલી છે?'
      },
      options: ['Sheer Khurma', 'Gujiya', 'Modak', 'Kada Prasad'],
      correct: 0,
      expl: 'Sheer Khurma is made with fine vermicelli, dates, and rich milk.'
    }
  ];

  return (
    <div className="bg-ivory-surface rounded-3xl p-6 sm:p-10 border border-gold/40 shadow-editorial">
      {/* Mode Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-gold/20 pb-4 mb-6">
        <button
          onClick={() => setActiveTab('lobby')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'lobby'
              ? 'bg-vermilion text-ivory-light shadow-md'
              : 'bg-ivory hover:bg-gold/15 text-charcoal'
          }`}
        >
          <Gamepad2 className="w-4 h-4 text-gold" />
          <span>{dict.quiz.multiplayerRooms}</span>
        </button>
        <button
          onClick={() => setActiveTab('singleplayer')}
          className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'singleplayer'
              ? 'bg-vermilion text-ivory-light shadow-md'
              : 'bg-ivory hover:bg-gold/15 text-charcoal'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-gold" />
          <span>{dict.quiz.singlePlayer}</span>
        </button>
      </div>

      {/* MULTIPLAYER TAB */}
      {activeTab === 'lobby' && (
        <div>
          {/* STATE 1: NOT IN ROOM (Create or Join) */}
          {!currentRoom && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Profile Config & Create Room */}
              <div className="bg-ivory-light p-6 rounded-2xl border border-gold/40 space-y-4">
                <div className="flex items-center space-x-2 text-vermilion font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-gold" />
                  <span>{dict.quiz.createRoom}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                    {dict.quiz.nicknamePlaceholder}
                  </label>
                  <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="e.g. Birbal99"
                    maxLength={16}
                    className="w-full px-3 py-2 text-sm bg-ivory-surface border border-gold/40 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-vermilion"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                    {dict.quiz.selectAvatar}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {avatars.map((av) => (
                      <button
                        key={av}
                        onClick={() => setAvatar(av)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg border transition-all ${
                          avatar === av
                            ? 'bg-vermilion text-ivory-light border-vermilion scale-110 shadow-xs'
                            : 'bg-ivory-surface border-gold/30 hover:border-gold'
                        }`}
                      >
                        {av}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                    Game Experience
                  </label>
                  <select
                    value={gameMode}
                    onChange={(e) => setGameMode(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-ivory-surface border border-gold/40 rounded-xl focus:outline-hidden"
                  >
                    <option value="battle">{dict.quiz.gameModes.battle}</option>
                    <option value="guess">{dict.quiz.gameModes.guess}</option>
                    <option value="food">{dict.quiz.gameModes.food}</option>
                    <option value="map">{dict.quiz.gameModes.map}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                    Room PIN Password (Optional)
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Leave blank for open room"
                    className="w-full px-3 py-2 text-sm bg-ivory-surface border border-gold/40 rounded-xl focus:outline-hidden"
                  />
                </div>

                <button
                  onClick={handleCreateRoom}
                  className="w-full bg-vermilion hover:bg-vermilion-600 text-ivory-light font-bold py-3 rounded-xl shadow-md text-sm transition-all"
                >
                  {dict.quiz.createRoom} →
                </button>
              </div>

              {/* Join Existing Room */}
              <div className="bg-ivory-light p-6 rounded-2xl border border-gold/40 space-y-4">
                <div className="flex items-center space-x-2 text-gold font-bold text-sm">
                  <Users className="w-4 h-4 text-vermilion" />
                  <span>{dict.quiz.joinRoom}</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                    {dict.quiz.roomPinPlaceholder}
                  </label>
                  <input
                    type="text"
                    value={roomCodeInput}
                    onChange={(e) => setRoomCodeInput(e.target.value.toUpperCase())}
                    placeholder="e.g. FEST25"
                    maxLength={6}
                    className="w-full uppercase font-mono tracking-widest px-3 py-2 text-base font-bold bg-ivory-surface border border-gold/40 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-vermilion text-center"
                  />
                </div>

                <p className="text-xs text-charcoal-muted">
                  Got an invitation from a friend? Enter their 6-character room code above along with your nickname.
                </p>

                <button
                  onClick={handleJoinRoom}
                  className="w-full bg-gold hover:bg-gold-300 text-charcoal font-bold py-3 rounded-xl shadow-md text-sm transition-all"
                >
                  {dict.quiz.joinRoom}
                </button>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-300 text-red-800 text-xs flex items-center space-x-2 animate-fadeIn">
              <XCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* STATE 2: IN ROOM LOBBY */}
          {currentRoom && currentRoom.status === 'LOBBY' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-ivory-light p-6 rounded-2xl border border-gold/40 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold font-bold">Private Game Room</div>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="font-mono text-3xl font-extrabold text-vermilion tracking-widest">
                      {currentRoom.code}
                    </span>
                    <button
                      onClick={copyInviteLink}
                      className="flex items-center space-x-1.5 text-xs bg-gold/20 hover:bg-gold/30 text-vermilion font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{inviteCopied ? 'Link Copied!' : 'Copy Invite Link'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  {currentRoom.players.find((p: any) => p.id === socket?.id)?.isHost ? (
                    <button
                      onClick={handleStartGame}
                      className="bg-vermilion hover:bg-vermilion-600 text-ivory-light font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-all hover:scale-105"
                    >
                      {dict.quiz.startGame} →
                    </button>
                  ) : (
                    <button
                      onClick={handleToggleReady}
                      className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        currentRoom.players.find((p: any) => p.id === socket?.id)?.isReady
                          ? 'bg-emerald-600 text-ivory-light'
                          : 'bg-gold hover:bg-gold-300 text-charcoal'
                      }`}
                    >
                      {currentRoom.players.find((p: any) => p.id === socket?.id)?.isReady ? '✓ You Are Ready' : 'Ready Up'}
                    </button>
                  )}
                </div>
              </div>

              {/* Player list in lobby */}
              <div>
                <h4 className="font-serif text-sm font-bold text-charcoal-muted uppercase tracking-wider mb-3 flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gold" />
                  <span>{dict.quiz.playersInLobby} ({currentRoom.players.length}/{currentRoom.maxPlayers})</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {currentRoom.players.map((pl: any) => (
                    <div
                      key={pl.id}
                      className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                        pl.isHost
                          ? 'bg-vermilion/10 border-vermilion'
                          : pl.isReady
                          ? 'bg-emerald-50 border-emerald-300'
                          : 'bg-ivory-light border-gold/30'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5">
                        <span className="text-xl">{pl.avatar}</span>
                        <div>
                          <div className="text-xs font-bold text-charcoal flex items-center space-x-1">
                            <span>{pl.nickname}</span>
                            {pl.isHost && (
                              <span className="text-[10px] bg-gold text-charcoal font-bold px-1.5 py-0.2 rounded-md">
                                Host
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold">
                        {pl.isReady ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : 'Waiting...'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STATE 3: PLAYING QUESTION */}
          {currentRoom && (currentRoom.status === 'PLAYING' || currentRoom.status === 'ROUND_RESULT') && currentQuestion && (
            <div className="space-y-6 animate-fadeIn">
              {/* Question progress and timer */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gold">
                  Question {currentQuestion.index} of {currentQuestion.total}
                </span>
                <div className="flex items-center space-x-1.5 text-xs font-bold text-vermilion bg-vermilion/10 px-3 py-1 rounded-full border border-vermilion/20">
                  <Clock className="w-4 h-4 animate-spin-slow" />
                  <span>{roundTimer}s</span>
                </div>
              </div>

              {/* Timer Progress Bar */}
              <div className="w-full bg-gold/20 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-vermilion h-full transition-all duration-1000 ease-linear"
                  style={{ width: `${(roundTimer / 15) * 100}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="bg-ivory-light p-6 sm:p-8 rounded-2xl border border-gold/40 text-center shadow-xs">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal leading-snug">
                  {currentQuestion.question[locale] || currentQuestion.question.en}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(currentQuestion.options[locale] || currentQuestion.options.en).map((opt: string, idx: number) => {
                  const isSelected = selectedOption === idx;
                  const isRevealed = roundResults !== null;
                  const isCorrect = isRevealed && roundResults.correctIndex === idx;
                  const isWrong = isRevealed && isSelected && !isCorrect;

                  return (
                    <button
                      key={idx}
                      disabled={selectedOption !== null || isRevealed}
                      onClick={() => handleSubmitAnswer(idx)}
                      className={`p-4 min-h-[56px] rounded-xl border-2 text-left font-medium text-sm transition-all flex items-center justify-between ${
                        isCorrect
                          ? 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold scale-[1.01]'
                          : isWrong
                          ? 'bg-red-100 border-red-500 text-red-950'
                          : isSelected
                          ? 'bg-vermilion text-ivory-light border-vermilion shadow-md'
                          : 'bg-ivory-light hover:bg-gold/15 border-gold/30 text-charcoal'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && !isRevealed && (
                        <span className="text-xs text-gold font-bold">Answered</span>
                      )}
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                      {isWrong && <XCircle className="w-5 h-5 text-red-600" />}
                    </button>
                  );
                })}
              </div>

              {/* Round Result Explanation */}
              {roundResults && (
                <div className="bg-gold/15 border-l-4 border-gold p-4 rounded-xl text-xs sm:text-sm text-charcoal space-y-1 animate-fadeIn">
                  <div className="font-bold text-vermilion">Verified Cultural Fact:</div>
                  <p>{roundResults.explanation}</p>
                  <p className="text-[11px] text-charcoal-muted">
                    Citation: {roundResults.citation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* STATE 4: GAME OVER SCREEN */}
          {finalGameOver && (
            <div className="bg-ivory-light rounded-3xl p-8 border border-gold/50 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-gold/20 mx-auto flex items-center justify-center text-3xl">
                <Trophy className="w-8 h-8 text-gold" />
              </div>

              <div>
                <h3 className="font-serif text-3xl font-extrabold text-vermilion">
                  {dict.quiz.gameOver}
                </h3>
                <p className="text-xs text-charcoal-muted mt-1">
                  Cultural Champions of Bharat!
                </p>
              </div>

              {/* Leaderboard Table */}
              <div className="max-w-md mx-auto space-y-2">
                {finalGameOver.finalLeaderboard.map((p: any, idx: number) => (
                  <div
                    key={p.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border ${
                      idx === 0
                        ? 'bg-gold/20 border-gold font-bold text-charcoal shadow-sm'
                        : 'bg-ivory-surface border-gold/20 text-charcoal'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-base font-extrabold text-vermilion">
                        #{idx + 1}
                      </span>
                      <span className="text-xl">{p.avatar}</span>
                      <span className="text-sm font-semibold">{p.nickname}</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-vermilion">
                      {p.score} pts
                    </span>
                  </div>
                ))}
              </div>

              {currentRoom?.players.find((p: any) => p.id === socket?.id)?.isHost && (
                <button
                  onClick={handleRematch}
                  className="bg-vermilion hover:bg-vermilion-600 text-ivory-light font-bold px-6 py-3 rounded-xl shadow-md text-sm transition-all"
                >
                  <RotateCcw className="w-4 h-4 inline mr-2" />
                  {dict.quiz.rematch}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* SINGLEPLAYER PRACTICE TAB */}
      {activeTab === 'singleplayer' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gold/20 pb-3">
            <span className="text-xs font-bold text-vermilion uppercase tracking-wider">
              Solo Knowledge Quest
            </span>
            <span className="text-xs font-mono font-bold text-charcoal bg-gold/20 px-3 py-1 rounded-full">
              Score: {soloScore} pts
            </span>
          </div>

          <div className="bg-ivory-light p-6 rounded-2xl border border-gold/40 text-center">
            <h3 className="font-serif text-lg font-bold text-charcoal">
              {soloQuestions[soloQIndex % soloQuestions.length].q[locale]}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {soloQuestions[soloQIndex % soloQuestions.length].options.map((opt, i) => {
              const currentQ = soloQuestions[soloQIndex % soloQuestions.length];
              const isSelected = soloSelectedOption === i;
              const isCorrect = soloShowResult && currentQ.correct === i;
              const isWrong = soloShowResult && isSelected && !isCorrect;

              return (
                <button
                  key={i}
                  disabled={soloShowResult}
                  onClick={() => {
                    setSoloSelectedOption(i);
                    setSoloShowResult(true);
                    if (i === currentQ.correct) {
                      setSoloScore((s) => s + 100);
                    }
                  }}
                  className={`p-3.5 min-h-[50px] rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${
                    isCorrect
                      ? 'bg-emerald-100 border-emerald-500 font-bold'
                      : isWrong
                      ? 'bg-red-100 border-red-500'
                      : isSelected
                      ? 'bg-vermilion text-ivory-light'
                      : 'bg-ivory-light border-gold/30 hover:bg-gold/15'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {soloShowResult && (
            <div className="bg-gold/15 p-4 rounded-xl text-xs space-y-2 animate-fadeIn">
              <p className="text-charcoal">
                💡 {soloQuestions[soloQIndex % soloQuestions.length].expl}
              </p>
              <button
                onClick={() => {
                  setSoloShowResult(false);
                  setSoloSelectedOption(null);
                  setSoloQIndex((prev) => prev + 1);
                }}
                className="bg-vermilion text-ivory-light px-4 py-2 rounded-lg text-xs font-bold"
              >
                Next Question →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
