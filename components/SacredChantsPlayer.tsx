'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Locale } from '../lib/types';
import { Play, Pause, Volume2, VolumeX, Sparkles, Music, RotateCcw } from 'lucide-react';

interface Verse {
  number: number;
  title: { en: string; hi: string; gu: string };
  originalText: string;
  transliteration: string;
  meaning: { en: string; hi: string; gu: string };
}

interface ChantData {
  festivalSlug: string;
  chantName: { en: string; hi: string; gu: string };
  tradition: { en: string; hi: string; gu: string };
  verses: Verse[];
}

const PLAYER_LABELS = {
  en: {
    badge: 'Sacred Chants, Hymns & Folk Verses',
    playBtn: 'Listen with Tanpura Drone',
    pauseBtn: 'Pause Meditative Drone',
    moolPatha: 'Original Verse',
    meaningLabel: 'Meaning & Cultural Context',
    playingState: 'Meditative Drone Active • 136.1 Hz Om',
    readyState: 'Ready to Read & Listen',
    muteTitle: 'Mute sound',
    unmuteTitle: 'Unmute sound',
    restartTitle: 'Restart timer',
    versePrefix: 'Verse',
  },
  hi: {
    badge: 'पावन स्तोत्र, शबद व लोकगीत',
    playBtn: 'नाद (ॐ गुंजन) के साथ सुनें',
    pauseBtn: 'ध्वनि रोकें',
    moolPatha: 'मूल पाठ',
    meaningLabel: 'भावार्थ एवं सांस्कृतिक संदर्भ',
    playingState: 'ध्यान नाद सक्रिय • 136.1 Hz',
    readyState: 'पठन एवं श्रवण के लिए तैयार',
    muteTitle: 'ध्वनि बंद करें',
    unmuteTitle: 'ध्वनि चालू करें',
    restartTitle: 'पुनः प्रारंभ करें',
    versePrefix: 'पद',
  },
  gu: {
    badge: 'પવિત્ર સ્તોત્ર, શબદ અને લોકગીત',
    playBtn: 'નાદ સાથે શ્રવણ કરો',
    pauseBtn: 'નાદ થોભાવો',
    moolPatha: 'મૂળ પાઠ',
    meaningLabel: 'ભાવાર્થ અને સાંસ્કૃતિક સંદર્ભ',
    playingState: 'ધ્યાન નાદ સક્રિય • 136.1 Hz',
    readyState: 'વાંચન અને શ્રવણ માટે તૈયાર',
    muteTitle: 'અવાજ બંધ કરો',
    unmuteTitle: 'અવાજ ચાલુ કરો',
    restartTitle: 'ફરી શરૂ કરો',
    versePrefix: 'કડી',
  },
};

const CHANTS_CATALOG: Record<string, ChantData> = {
  diwali: {
    festivalSlug: 'diwali',
    chantName: {
      en: 'Mahalakshmi Ashtakam',
      hi: 'महालक्ष्मी अष्टकम्',
      gu: 'મહાલક્ષ્મી અષ્ટકમ્',
    },
    tradition: {
      en: 'Padma Purana Tradition • Evening Lakshmi Puja Stotram',
      hi: 'पद्म पुराण परंपरा • दीपावली संध्या लक्ष्मी पूजन स्तोत्र',
      gu: 'પદ્મ પુરાણ પરંપરા • દિવાળી સંધ્યા લક્ષ્મી પૂજન સ્તોત્ર',
    },
    verses: [
      {
        number: 1,
        title: {
          en: 'Salutations to Shri Maha Lakshmi',
          hi: 'जगज्जननी महालक्ष्मी वंदना',
          gu: 'જગતજનની મહાલક્ષ્મી વંદના',
        },
        originalText: 'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते ।\nशङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते ॥',
        transliteration: 'Namastestu Maha-Maye Shree-Peethe Sura-Poojite |\nShankha-Chakra-Gada-Haste Maha-Lakshmi Namostu Te ||',
        meaning: {
          en: 'Salutations to You, O Mahamaya, who dwells in the auspicious seat of grace and is revered by the devas. Holding the conch, discus, and mace in Your hands, O Goddess Mahalakshmi, my salutations to You.',
          hi: 'हे महामाये! श्रीपीठ पर विराजमान और देवताओं द्वारा पूजित देवी! अपने करकमलों में शंख, चक्र और गदा धारण करने वाली भगवती महालक्ष्मी, आपको मेरा बारंबार नमन है।',
          gu: 'હે મહામાયા! શ્રીપીઠ પર બિરાજમાન અને દેવો દ્વારા પૂજાયેલાં, હાથમાં શંખ, ચક્ર અને ગદા ધારણ કરનારાં હે મહાલક્ષ્મી માતા, આપને વારંવાર નમસ્કાર.',
        },
      },
      {
        number: 2,
        title: {
          en: 'Remover of Sorrow and Darkness',
          hi: 'कष्ट व अंधकार निवारक स्तुति',
          gu: 'કષ્ટ અને અંધકાર નિવારણ સ્તુતિ',
        },
        originalText: 'नमस्ते गरुडारूढे कोलासुरभयङ्करि ।\nसर्वपापहरे देवि महालक्ष्मि नमोऽस्तु ते ॥',
        transliteration: 'Namaste Garuda-Aaroodhe Kolasura-Bhayankari |\nSarva-Paapa-Hare Devi Maha-Lakshmi Namostu Te ||',
        meaning: {
          en: 'Salutations to You who rides upon Garuda, who struck terror into the demon Kolasura, and who removes all impurities and sorrow. O Devi Mahalakshmi, salutations to You.',
          hi: 'गरुड़ पर आरूढ़ होकर कोलासुर का भय दूर करने वाली तथा समस्त कष्टों और पापों का शमन करने वाली देवी महालक्ष्मी, आपको नमन है।',
          gu: 'ગરુડ પર આરૂઢ થઈ કોલાસુરનો સંહાર કરનારાં અને સર્વ પાપો તથા દુઃખ હરનારાં હે મહાલક્ષ્મી દેવી, આપને વંદન.',
        },
      },
    ],
  },
  holi: {
    festivalSlug: 'holi',
    chantName: {
      en: 'Aaj Biraj Mein Hori Re Rasiya',
      hi: 'आज बिरज में होरी रे रसिया',
      gu: 'આજ બિરજ મેં હોરી રે રસિયા',
    },
    tradition: {
      en: 'Traditional Braj Folk Hori Refrain • Mathura & Vrindavan',
      hi: 'पारंपरिक ब्रज लोकगीत • मथुरा व वृंदावन की होरी गायन परंपरा',
      gu: 'પારંપરિક વ્રજ લોકગીત • મથુરા અને વૃંદાવનની હોરી પરંપરા',
    },
    verses: [
      {
        number: 1,
        title: {
          en: 'Joyful Opening Refrain of Braj',
          hi: 'ब्रज रंगोत्सव का पारंपरिक मुखड़ा',
          gu: 'વ્રજ રંગોત્સવનો પારંપરિક મુખડો',
        },
        originalText: 'आज बिरज में होरी रे रसिया ।\nहोरी रे रसिया, बरजोरी रे रसिया ॥',
        transliteration: 'Aaj Biraj Mein Hori Re Rasiya |\nHori Re Rasiya, Barjori Re Rasiya ||',
        meaning: {
          en: 'Today, Holi is celebrated across the lanes of Braj, O beloved Krishna! Sung in courtyard gatherings to the rhythm of the dholak and jhaanjh, this centuries-old refrain welcomes spring’s unguarded warmth and community joy.',
          hi: 'हे रसिया कृष्ण! आज पूरे ब्रज मंडल में होली का उल्लास छाया है। ढोलक और झांझ की थाप पर चौपालों में गाया जाने वाला यह पारंपरिक लोकगीत ब्रज की आत्मीय ठिठोली और वसंत के स्वागत का प्रतीक है।',
          gu: 'હે રસિયા કૃષ્ણ! આજે સમગ્ર વ્રજમાં હોળીનો ઉમંગ છવાયો છે. ઢોલક અને ઝાંઝના તાલે ગવાતું આ લોકગીત વ્રજની પ્રેમાળ મજાક અને વસંતના આનંદને જીવંત કરે છે.',
        },
      },
    ],
  },
  'durga-puja': {
    festivalSlug: 'durga-puja',
    chantName: {
      en: 'Aigiri Nandini (Mahishasuramardini Stotram)',
      hi: 'अयि गिरिनंदिनी (महिषासुरमर्दिनी स्तोत्रम्)',
      gu: 'અયિ ગિરિનંદિની (મહિષાસુરમર્દિની સ્તોત્રમ્)',
    },
    tradition: {
      en: 'Classical Sanskrit Stotram • Sharadotsav Devotional Tradition',
      hi: 'शास्त्रीय संस्कृत स्तोत्र • शारदोत्सव भक्ति परंपरा',
      gu: 'શાસ્ત્રીય સંસ્કૃત સ્તોત્ર • શારદોત્સવ ભક્તિ પરંપરા',
    },
    verses: [
      {
        number: 1,
        title: {
          en: 'Daughter of the Himalayas',
          hi: 'पर्वतराजनंदिनी वंदना',
          gu: 'પર્વતરાજ પુત્રી સ્તુતિ',
        },
        originalText: 'अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दिनुते ।\nगिरिवरविन्ध्यशिरोधिनिवासिनि विष्णुविलासिनि जिष्णुनुते ॥',
        transliteration: 'Ayi Giri-Nandini Nandita-Medini Vishva-Vinodini Nandi-Nute |\nGiri-Vara-Vindhya-Shirodhi-Nivasini Vishnu-Vilasini Jishnu-Nute ||',
        meaning: {
          en: 'O Daughter of the Mountain, who fills the earth with joy, delights the cosmos, and is praised by Nandi; who dwells upon the heights of the Vindhyas and is revered by Indra and the celestials—victory and salutations to You.',
          hi: 'हे गिरिराज हिमालय की पुत्री! संपूर्ण धरा को आनंदित करने वाली, विश्व का कल्याण करने वाली, विंध्याचल के शिखरों पर निवास करने वाली भगवती दुर्गा, आपको प्रणाम है।',
          gu: 'હે પર્વતરાજની પુત્રી! સમસ્ત પૃથ્વીને આનંદ આપનારાં, વિશ્વનું કલ્યાણ કરનારાં અને વિંધ્યાચળના શિખરો પર બિરાજમાન મા દુર્ગા, આપને વંદન.',
        },
      },
    ],
  },
  'guru-nanak-jayanti': {
    festivalSlug: 'guru-nanak-jayanti',
    chantName: {
      en: 'Mool Mantar (Opening Verse of Guru Granth Sahib Ji)',
      hi: 'मूल मंतर (श्री गुरु ग्रंथ साहिब जी)',
      gu: 'મૂલ મંતર (શ્રી ગુરુ ગ્રંથ સાહેબ જી)',
    },
    tradition: {
      en: 'Sri Guru Granth Sahib Ji (Ang 1) • Revealed by Guru Nanak Dev Ji',
      hi: 'श्री गुरु ग्रंथ साहिब जी (अंग १) • गुरु नानक देव जी की मूल वाणी',
      gu: 'શ્રી ગુરુ ગ્રંથ સાહેબ જી (અંગ ૧) • ગુરુ નાનક દેવજીની મૂળ વાણી',
    },
    verses: [
      {
        number: 1,
        title: {
          en: 'The Primal Statement of Oneness',
          hi: 'मूल उद्घोष (गुरमुखी मूल पाठ)',
          gu: 'મૂળ ઉદ્ઘોષ (ગુરમુખી મૂળ પાઠ)',
        },
        originalText: 'ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ\nਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ ॥',
        transliteration: 'Ik Onkaar Sat Naam Kartaa Purakh Nirbhau Nirvair\nAkaal Moorat Ajooni Saibhan Gur Prasaad ||',
        meaning: {
          en: 'There is One Universal Creator; Truth is the Eternal Name; the Creative Being Personified; Without Fear; Without Hatred; Timeless in Form; Beyond Birth and Death; Self-Existent; Realized by the Grace of the True Guru.',
          hi: 'एक ओंकार (ईश्वर एक है), उसका नाम सत्य है, वह सृष्टिकर्ता है, वह भय से रहित है, किसी से वैर नहीं रखता, उसका स्वरूप काल से परे है, वह जन्म-मरण से अतीत और स्वयंभू है, तथा गुरु की कृपा से प्राप्त होता है।',
          gu: 'ઈશ્વર એક છે, તેનું નામ સત્ય છે, તે સર્જનહાર છે, નિર્ભય છે, વેરભાવ રહિત છે, કાળથી પર છે, જન્મ-મરણથી મુક્ત સ્વયંભૂ છે અને ગુરુની કૃપાથી જ તેની પ્રાપ્તિ થાય છે.',
        },
      },
    ],
  },
  'eid-ul-fitr': {
    festivalSlug: 'eid-ul-fitr',
    chantName: {
      en: 'Takbirat al-Eid (Morning Eid Proclamation)',
      hi: 'तकबीरात अल-ईद',
      gu: 'તકબીરાત અલ-ઈદ',
    },
    tradition: {
      en: 'Sunnah Tradition • Recited en route to the Eidgah',
      hi: 'सुन्नत परंपरा • ईदगाह जाते समय पढ़ी जाने वाली तकबीर',
      gu: 'સુન્નત પરંપરા • ઈદગાહ જતી વખતે પઢાતી તકબીર',
    },
    verses: [
      {
        number: 1,
        title: {
          en: 'Praise and Gratitude on Eid Morning',
          hi: 'ईद की सुबह की प्रशंसा व कृतज्ञता',
          gu: 'ઈદની સવારની પ્રશંસા અને કૃતજ્ઞતા',
        },
        originalText: 'اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ\nوَاللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، وَلِلَّهِ الْحَمْدُ',
        transliteration: 'Allahu Akbar, Allahu Akbar, La ilaha illallah\nWa Allahu Akbar, Allahu Akbar, wa lillahi-l-hamd',
        meaning: {
          en: 'God is the Greatest, God is the Greatest, there is no deity worthy of worship except Allah; God is the Greatest, God is the Greatest, and to God alone belongs all gratitude and praise.',
          hi: 'अल्लाह सबसे महान है, अल्लाह सबसे महान है, अल्लाह के सिवा कोई माबूद नहीं। अल्लाह सबसे महान है, अल्लाह सबसे महान है और समस्त प्रशंसा व शुक्र केवल उसी के लिए है।',
          gu: 'અલ્લાહ સૌથી મહાન છે, તેના સિવાય કોઈ પૂજનીય નથી. તમામ પ્રશંસા અને આભાર માત્ર ઈશ્વરને જ અર્પણ છે.',
        },
      },
    ],
  },
  onam: {
    festivalSlug: 'onam',
    chantName: {
      en: 'Maveli Nadu Vaneedum Kalam',
      hi: 'मावेली नाडु वाणीदुम कालम',
      gu: 'માવેલી નાડુ વાણીદુમ કાલમ',
    },
    tradition: {
      en: 'Traditional Malayalam Onappattu Folk Song • Kerala',
      hi: 'पारंपरिक मलयालम ओणप्पाट्टु लोकगीत • केरल',
      gu: 'પારંપરિક મલયાલમ ઓણપ્પાટ્ટુ લોકગીત • કેરળ',
    },
    verses: [
      {
        number: 1,
        title: {
          en: 'When King Mahabali Ruled with Equality',
          hi: 'जब न्यायप्रिय राजा महाबली का शासन था',
          gu: 'જ્યારે પ્રજાપ્રેમી રાજા મહાબલિનું શાસન હતું',
        },
        originalText: 'മാവേലി നാടു വാണീടും കാലം\nമാനുഷരെല്ലാരുമൊന്നുപോലെ ॥',
        transliteration: 'Maveli naadu vaaneedum kaalam\nMaanusharellaarum onnupole ||',
        meaning: {
          en: '“During the era when Maveli (Mahabali) ruled the land, all human beings lived as equals; there was joy and abundance in every home, with neither deceit nor falsehood.” This cherished Onam song is sung across Kerala around floral Athapookalam carpets.',
          hi: '“जब राजा महाबली इस धरती पर राज करते थे, तब सभी मनुष्य एक समान थे; हर ओर आनंद और सद्भाव था, न कोई छल था न कोई भेदभाव।” केरल में फूलों की रंगोली के चारों ओर यह प्रिय लोकगीत गाया जाता है।',
          gu: '“જ્યારે રાજા મહાબલિ આ ધરતી પર રાજ કરતા હતા, ત્યારે સર્વ માનવો સમાન હતા; દરેક ઘરમાં આનંદ અને સુખ હતું, કોઈ છળ-કપટ નહોતું.” કેરળમાં ફૂલોની રંગોળી ફરતે આ લોકગીત ગવાય છે.',
        },
      },
    ],
  },
};

export function SacredChantsPlayer({ festivalSlug, locale }: { festivalSlug: string; locale: Locale }) {
  const chant = CHANTS_CATALOG[festivalSlug];
  const labels = PLAYER_LABELS[locale] || PLAYER_LABELS.en;

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(120);
  const [isMuted, setIsMuted] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch {
          // ignore cleanup errors
        }
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {
          // ignore cleanup errors
        }
      }
    };
  }, []);

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (gainNodeRef.current && audioContextRef.current) {
      try {
        gainNodeRef.current.gain.setTargetAtTime(
          nextMuted ? 0.0001 : 0.07,
          audioContextRef.current.currentTime,
          0.1
        );
      } catch {
        // ignore audio node errors
      }
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
          oscillatorRef.current = null;
        } catch {
          // ignore cleanup
        }
      }
      gainNodeRef.current = null;
      setIsPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(136.1, ctx.currentTime); // Cosmic Om / C# earth tone

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(isMuted ? 0.0001 : 0.07, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsPlaying(true);
      } catch {
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          if (oscillatorRef.current) {
            try {
              oscillatorRef.current.stop();
              oscillatorRef.current.disconnect();
              oscillatorRef.current = null;
            } catch {
              // ignore cleanup
            }
          }
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  if (!chant) return null;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentVerse = chant.verses[activeVerseIndex] || chant.verses[0];

  return (
    <section
      aria-label={chant.chantName[locale]}
      className="my-10 bg-gradient-to-br from-charcoal via-[#2F1F1C] to-charcoal text-ivory-light rounded-3xl p-5 sm:p-10 border-2 border-gold/40 shadow-editorial relative overflow-hidden"
    >
      {/* Subtle Background Warmth */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-vermilion/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 bg-gold/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-gold/30 gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 bg-gold/20 text-gold-200 border border-gold/40 text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5 text-gold shrink-0" />
            <span>{labels.badge}</span>
          </div>
          <h3 className="font-serif text-xl sm:text-3xl font-bold text-ivory-light tracking-tight">
            {chant.chantName[locale]}
          </h3>
          <p className="text-xs text-gold/80 font-mono tracking-wide">
            {chant.tradition[locale]}
          </p>
        </div>

        {/* Toggle Audio Drone Button */}
        <button
          type="button"
          onClick={toggleAudio}
          className={`w-full sm:w-auto flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all min-h-[48px] ${
            isPlaying
              ? 'bg-amber-400 text-charcoal hover:bg-amber-300'
              : 'bg-vermilion hover:bg-vermilion-600 text-ivory-light border border-gold/40'
          }`}
        >
          {isPlaying ? <Pause className="w-4 h-4 fill-current shrink-0" /> : <Play className="w-4 h-4 fill-current shrink-0" />}
          <span>{isPlaying ? labels.pauseBtn : labels.playBtn}</span>
        </button>
      </div>

      {/* Verse Navigation Tabs */}
      {chant.verses.length > 1 && (
        <div className="relative z-10 flex items-center space-x-2 overflow-x-auto py-4 no-scrollbar touch-pan-x">
          {chant.verses.map((v, idx) => (
            <button
              key={v.number}
              type="button"
              onClick={() => setActiveVerseIndex(idx)}
              className={`px-4 py-2 min-h-[44px] rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeVerseIndex === idx
                  ? 'bg-gold text-charcoal font-bold shadow-sm'
                  : 'bg-ivory/10 hover:bg-ivory/20 text-ivory-light/90 border border-gold/30'
              }`}
            >
              {labels.versePrefix} {v.number}: {v.title[locale]}
            </button>
          ))}
        </div>
      )}

      {/* Sacred Text Display */}
      <div className="relative z-10 my-6 bg-charcoal/65 backdrop-blur-md rounded-2xl p-5 sm:p-8 border border-gold/30 space-y-5">
        <div className="text-center space-y-3">
          <div className="text-[11px] uppercase tracking-widest text-gold font-bold flex items-center justify-center space-x-1.5 opacity-90">
            <span>✧</span>
            <span>{labels.moolPatha}</span>
            <span>✧</span>
          </div>
          <p className="font-serif text-lg sm:text-2xl font-semibold text-amber-200 leading-relaxed whitespace-pre-line tracking-wide">
            {currentVerse.originalText}
          </p>
        </div>

        <div className="text-center pt-3 border-t border-gold/20">
          <p className="text-xs sm:text-sm font-mono text-ivory-light/85 italic leading-relaxed whitespace-pre-line">
            {currentVerse.transliteration}
          </p>
        </div>

        <div className="pt-4 border-t border-gold/20 bg-ivory/5 p-4 rounded-xl">
          <div className="text-[10px] uppercase tracking-wider text-gold font-bold mb-1">
            {labels.meaningLabel}:
          </div>
          <p className="text-xs sm:text-sm text-ivory-light/95 leading-relaxed font-sans">
            {currentVerse.meaning[locale]}
          </p>
        </div>
      </div>

      {/* Bottom Integrated Audio Player Bar */}
      <div className="relative z-10 bg-black/40 rounded-2xl p-4 border border-gold/30 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={toggleAudio}
            className="w-12 h-12 rounded-full bg-gold hover:bg-gold-300 text-charcoal flex items-center justify-center shadow-md transition-all shrink-0"
            aria-label={isPlaying ? labels.pauseBtn : labels.playBtn}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>
          <div className="min-w-0">
            <div className="text-xs font-bold text-ivory-light flex items-center space-x-1.5 truncate">
              <Music className="w-3.5 h-3.5 text-gold shrink-0" />
              <span className="truncate">{currentVerse.title[locale]}</span>
            </div>
            <div className="text-[10px] text-gold/75 font-mono truncate">
              {isPlaying ? labels.playingState : labels.readyState}
            </div>
          </div>
        </div>

        {/* Interactive Scrub Slider */}
        <div className="w-full sm:flex-1 max-w-md flex items-center space-x-3">
          <span className="text-[10px] font-mono text-gold/80 min-w-[32px] text-right">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            aria-label="Audio playback progress"
            className="flex-1 accent-amber-400 h-2 bg-ivory/20 rounded-lg cursor-pointer"
          />
          <span className="text-[10px] font-mono text-gold/80 min-w-[32px]">{formatTime(duration)}</span>
        </div>

        <div className="flex items-center space-x-1 self-end sm:self-center">
          <button
            type="button"
            onClick={toggleMute}
            className="text-ivory-light/80 hover:text-gold min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors"
            title={isMuted ? labels.unmuteTitle : labels.muteTitle}
            aria-label={isMuted ? labels.unmuteTitle : labels.muteTitle}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={() => setCurrentTime(0)}
            className="text-ivory-light/80 hover:text-gold min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl transition-colors"
            title={labels.restartTitle}
            aria-label={labels.restartTitle}
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
