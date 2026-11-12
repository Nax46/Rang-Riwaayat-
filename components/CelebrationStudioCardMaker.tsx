'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Locale } from '../lib/types';
import { getDictionary } from '../lib/i18n';
import { FESTIVAL_WISHES_DATA } from '../lib/data/verified-seeds';
import { Download, Share2, Undo2, Redo2, Sparkles, Check, Eye, Edit3, Image as ImageIcon } from 'lucide-react';
import { DiyaIcon } from './MotifDecoration';

interface CardMakerProps {
  locale: Locale;
  initialFestivalSlug?: string;
}

interface CardState {
  festival: string;
  template: 'royal-vermilion' | 'antique-gold' | 'ivory-minimal' | 'peacock-emerald';
  recipient: string;
  sender: string;
  message: string;
  fontFamily: 'serif' | 'sans' | 'devanagari' | 'gujarati';
  textColor: string;
  sticker: 'diya' | 'mandala' | 'lotus' | 'none';
  textPosition: 'center' | 'top' | 'bottom';
}

export function CelebrationStudioCardMaker({ locale, initialFestivalSlug = 'diwali' }: CardMakerProps) {
  const dict = getDictionary(locale);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const initialCard: CardState = {
    festival: initialFestivalSlug,
    template: 'royal-vermilion',
    recipient: locale === 'hi' ? 'प्रिय परिवारजन' : locale === 'gu' ? 'સ્નેહી શ્રી' : 'Dear Family & Friends',
    sender: locale === 'hi' ? 'सस्नेह, आपका मित्र' : locale === 'gu' ? 'લિ. આપના સ્નેહી' : 'With Warm Wishes',
    message: FESTIVAL_WISHES_DATA[0].captions[0][locale],
    fontFamily: locale === 'hi' ? 'devanagari' : locale === 'gu' ? 'gujarati' : 'serif',
    textColor: '#FAF5ED',
    sticker: 'diya',
    textPosition: 'center',
  };

  const [cardState, setCardState] = useState<CardState>(initialCard);
  const [history, setHistory] = useState<CardState[]>([initialCard]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [copiedNotification, setCopiedNotification] = useState<boolean>(false);
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  const updateCard = (partial: Partial<CardState>) => {
    const nextState = { ...cardState, ...partial };
    setCardState(nextState);

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(nextState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCardState(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCardState(history[historyIndex + 1]);
    }
  };

  // Re-draw canvas whenever cardState updates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas scale (1200 x 1200) for crisp printing and social sharing
    canvas.width = 1200;
    canvas.height = 1200;

    // 1. Background fill based on template
    if (cardState.template === 'royal-vermilion') {
      const grad = ctx.createLinearGradient(0, 0, 1200, 1200);
      grad.addColorStop(0, '#8F3026');
      grad.addColorStop(0.5, '#6E221A');
      grad.addColorStop(1, '#501A14');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 1200);
    } else if (cardState.template === 'antique-gold') {
      const grad = ctx.createLinearGradient(0, 0, 1200, 1200);
      grad.addColorStop(0, '#F4ECD4');
      grad.addColorStop(0.5, '#D6A84B');
      grad.addColorStop(1, '#966E20');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 1200);
    } else if (cardState.template === 'peacock-emerald') {
      const grad = ctx.createLinearGradient(0, 0, 1200, 1200);
      grad.addColorStop(0, '#0D5C75');
      grad.addColorStop(0.5, '#083B4C');
      grad.addColorStop(1, '#04222C');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1200, 1200);
    } else {
      // ivory-minimal
      ctx.fillStyle = '#FAF5ED';
      ctx.fillRect(0, 0, 1200, 1200);
    }

    // 2. Ornate Traditional Borders
    ctx.strokeStyle = cardState.template === 'antique-gold' ? '#6E221A' : '#D6A84B';
    ctx.lineWidth = 14;
    ctx.strokeRect(50, 50, 1100, 1100);

    ctx.lineWidth = 3;
    ctx.strokeRect(70, 70, 1060, 1060);

    // Corner Mandala Accents
    const drawCornerKalka = (cx: number, cy: number) => {
      ctx.save();
      ctx.fillStyle = '#D6A84B';
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, 2 * Math.PI);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, 2 * Math.PI);
      ctx.strokeStyle = '#D6A84B';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    };
    drawCornerKalka(70, 70);
    drawCornerKalka(1130, 70);
    drawCornerKalka(70, 1130);
    drawCornerKalka(1130, 1130);

    // 3. Header Stamp
    ctx.textAlign = 'center';
    ctx.fillStyle = cardState.template === 'antique-gold' ? '#8F3026' : '#D6A84B';
    ctx.font = 'bold 22px "Inter", sans-serif';
    ctx.fillText('RANG & RIWAAYAT • TRADITIONAL GREETING', 600, 130);

    // 4. Center Festive Motif
    if (cardState.sticker === 'diya') {
      const diyaY = cardState.textPosition === 'top' ? 760 : 250;
      // Diya Base
      ctx.fillStyle = '#D6A84B';
      ctx.beginPath();
      ctx.ellipse(600, diyaY, 80, 42, 0, 0, Math.PI);
      ctx.fill();

      // Flame
      ctx.fillStyle = '#FFAE33';
      ctx.beginPath();
      ctx.moveTo(600, diyaY - 70);
      ctx.quadraticCurveTo(630, diyaY - 20, 600, diyaY - 5);
      ctx.quadraticCurveTo(570, diyaY - 20, 600, diyaY - 70);
      ctx.fill();

      // Inner Flame Core
      ctx.fillStyle = '#FFF5CC';
      ctx.beginPath();
      ctx.moveTo(600, diyaY - 55);
      ctx.quadraticCurveTo(615, diyaY - 25, 600, diyaY - 10);
      ctx.quadraticCurveTo(585, diyaY - 25, 600, diyaY - 55);
      ctx.fill();
    } else if (cardState.sticker === 'mandala') {
      const mY = cardState.textPosition === 'top' ? 760 : 250;
      ctx.strokeStyle = '#D6A84B';
      ctx.lineWidth = 3;
      for (let r = 20; r <= 80; r += 20) {
        ctx.beginPath();
        ctx.arc(600, mY, r, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }

    // 5. Recipient Name
    let textStartY = cardState.textPosition === 'top' ? 380 : cardState.textPosition === 'bottom' ? 520 : 450;

    ctx.fillStyle = cardState.textColor;
    ctx.font = 'bold 44px "Merriweather", Georgia, serif';
    ctx.fillText(cardState.recipient, 600, textStartY);

    // 6. Main Message Text wrapping
    ctx.font = '32px "Inter", "Noto Sans Devanagari", "Noto Sans Gujarati", sans-serif';
    const words = cardState.message.split(' ');
    let line = '';
    const maxWidth = 900;
    const lineHeight = 52;
    let y = textStartY + 80;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, 600, y);
        line = words[n] + ' ';
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 600, y);

    // 7. Sender name at bottom
    ctx.font = 'italic 34px "Merriweather", Georgia, serif';
    ctx.fillStyle = '#D6A84B';
    ctx.fillText(cardState.sender, 600, Math.min(y + 110, 1040));
  }, [cardState]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Rang-and-Riwaayat-${cardState.festival}-Card.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'festive-card.png', { type: 'image/png' });
          if (navigator.canShare && !navigator.canShare({ files: [file] })) {
            return;
          }
          await navigator.share({
            title: 'Festive Greeting from Rang & Riwaayat',
            text: cardState.message,
            files: [file],
          });
        });
        return;
      } catch (err) {
        // user cancelled or fallback
      }
    }

    // Fallback: Copy link
    navigator.clipboard.writeText(window.location.href);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 3000);
  };

  const templates = [
    { id: 'royal-vermilion', label: 'Royal Vermilion', color: 'bg-vermilion' },
    { id: 'antique-gold', label: 'Antique Gold', color: 'bg-gold' },
    { id: 'peacock-emerald', label: 'Peacock Emerald', color: 'bg-cyan-800' },
    { id: 'ivory-minimal', label: 'Ivory Minimal', color: 'bg-ivory border border-gold/40' },
  ];

  return (
    <div className="bg-ivory-surface rounded-3xl p-4 sm:p-8 lg:p-10 border border-gold/40 shadow-editorial max-w-7xl mx-auto">
      {/* Mobile-Friendly Tabs Switcher for handheld screens */}
      <div className="lg:hidden flex items-center p-1.5 mb-6 bg-ivory rounded-2xl border border-gold/40">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all min-h-[44px] ${
            mobileTab === 'editor'
              ? 'bg-vermilion text-ivory-light shadow-sm'
              : 'text-charcoal hover:text-vermilion'
          }`}
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Design & Words</span>
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all min-h-[44px] ${
            mobileTab === 'preview'
              ? 'bg-vermilion text-ivory-light shadow-sm'
              : 'text-charcoal hover:text-vermilion'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>Live Preview & Save</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Controls & Customization */}
        <div className={`lg:col-span-6 space-y-6 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <div className="flex items-center justify-between pb-4 border-b border-gold/20">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal">{dict.studio.title}</h3>
              <p className="text-xs text-charcoal-muted mt-1">{dict.studio.subtitle}</p>
            </div>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={handleUndo}
                disabled={historyIndex === 0}
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-gold/40 disabled:opacity-30 hover:bg-gold/15 text-charcoal"
                title="Undo"
                aria-label="Undo edit"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1}
                className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl border border-gold/40 disabled:opacity-30 hover:bg-gold/15 text-charcoal"
                title="Redo"
                aria-label="Redo edit"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Festival Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-2">
              {dict.studio.selectFestival}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FESTIVAL_WISHES_DATA.map((fest) => (
                <button
                  key={fest.festivalSlug}
                  onClick={() =>
                    updateCard({
                      festival: fest.festivalSlug,
                      message: fest.captions[0][locale],
                    })
                  }
                  className={`p-3 min-h-[48px] rounded-xl text-xs font-semibold border transition-all text-left flex items-center space-x-1.5 ${
                    cardState.festival === fest.festivalSlug
                      ? 'bg-vermilion text-ivory-light border-vermilion shadow-sm font-bold'
                      : 'bg-ivory-light hover:bg-gold/15 border-gold/30 text-charcoal'
                  }`}
                >
                  <span className="truncate">{fest.title[locale]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Visual Palette Template */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-2">
              {dict.studio.selectTemplate}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() =>
                    updateCard({
                      template: tpl.id as any,
                      textColor: tpl.id === 'ivory-minimal' ? '#24201D' : '#FAF5ED',
                    })
                  }
                  className={`p-3 min-h-[48px] rounded-xl flex items-center space-x-2 text-xs font-medium border transition-all ${
                    cardState.template === tpl.id
                      ? 'border-vermilion ring-2 ring-vermilion/30 font-bold bg-ivory-light'
                      : 'border-gold/30 hover:border-gold'
                  }`}
                >
                  <span className={`w-4 h-4 rounded-full shrink-0 ${tpl.color}`} />
                  <span className="truncate">{tpl.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recipient & Sender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                {dict.studio.recipientName}
              </label>
              <input
                type="text"
                value={cardState.recipient}
                onChange={(e) => updateCard({ recipient: e.target.value })}
                placeholder={dict.studio.recipientPlaceholder}
                className="w-full px-3.5 py-2.5 text-sm bg-ivory-light border border-gold/40 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-vermilion min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                {dict.studio.senderName}
              </label>
              <input
                type="text"
                value={cardState.sender}
                onChange={(e) => updateCard({ sender: e.target.value })}
                placeholder={dict.studio.senderPlaceholder}
                className="w-full px-3.5 py-2.5 text-sm bg-ivory-light border border-gold/40 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-vermilion min-h-[44px]"
              />
            </div>
          </div>

          {/* Pre-curated Festive Blessings Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-2">
              {dict.studio.chooseWishes}
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {FESTIVAL_WISHES_DATA.flatMap((f) => f.captions).map((cap, idx) => (
                <button
                  key={idx}
                  onClick={() => updateCard({ message: cap[locale] })}
                  className="w-full text-left p-3 rounded-xl border border-gold/30 hover:bg-gold/15 text-xs text-charcoal transition-all leading-snug min-h-[44px]"
                >
                  {cap[locale]}
                </button>
              ))}
            </div>
          </div>

          {/* Personal Message textarea */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
              {dict.studio.message}
            </label>
            <textarea
              rows={3}
              value={cardState.message}
              onChange={(e) => updateCard({ message: e.target.value })}
              placeholder={dict.studio.messagePlaceholder}
              className="w-full px-3.5 py-2.5 text-sm bg-ivory-light border border-gold/40 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-vermilion"
            />
          </div>

          {/* Motifs & Alignment */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Decorative Motif
              </label>
              <select
                value={cardState.sticker}
                onChange={(e) => updateCard({ sticker: e.target.value as any })}
                className="w-full px-3 py-2.5 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-hidden min-h-[44px]"
              >
                <option value="diya">Auspicious Diya (Deepam)</option>
                <option value="mandala">Sacred Mandala Pattern</option>
                <option value="none">Minimal (No Motif)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-muted mb-1">
                Text Position
              </label>
              <select
                value={cardState.textPosition}
                onChange={(e) => updateCard({ textPosition: e.target.value as any })}
                className="w-full px-3 py-2.5 text-xs bg-ivory-light border border-gold/40 rounded-xl focus:outline-hidden min-h-[44px]"
              >
                <option value="center">Centered</option>
                <option value="top">Top Oriented</option>
                <option value="bottom">Lower Anchored</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Side: High-Res Interactive Canvas Preview & Export */}
        <div className={`lg:col-span-6 flex flex-col items-center w-full ${mobileTab === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="w-full max-w-[440px] aspect-square rounded-2xl shadow-editorial-lg overflow-hidden border-2 border-gold/50 bg-charcoal relative">
            <canvas
              ref={canvasRef}
              className="w-full h-full object-contain block"
            />
          </div>

          {/* Export Action Controls */}
          <div className="w-full max-w-[440px] mt-6 flex items-center space-x-3">
            <button
              onClick={handleDownload}
              className="flex-1 min-h-[48px] bg-vermilion hover:bg-vermilion-600 text-ivory-light font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center space-x-2 text-xs sm:text-sm transition-all hover:scale-[1.02]"
            >
              <Download className="w-4 h-4 text-gold shrink-0" />
              <span>{dict.studio.downloadBtn}</span>
            </button>
            <button
              onClick={handleShare}
              className="min-h-[48px] bg-gold hover:bg-gold-300 text-charcoal font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center space-x-2 text-xs sm:text-sm transition-all hover:scale-[1.02]"
            >
              <Share2 className="w-4 h-4 shrink-0" />
              <span>{dict.studio.shareBtn}</span>
            </button>
          </div>

          {copiedNotification && (
            <div className="mt-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-3 py-1.5 rounded-lg flex items-center space-x-1.5 animate-fadeIn">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>{dict.studio.copiedAlert}</span>
            </div>
          )}
          <p className="text-[11px] text-charcoal-muted mt-3 text-center">
            🔒 Privacy First: All cards render 100% locally on your browser. Zero tracking, zero data transmission.
          </p>
        </div>
      </div>
    </div>
  );
}
