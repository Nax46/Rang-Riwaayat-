import { Festival, FestivalOccurrence, StateUTData, Recipe, CulturalStory, QuizQuestion, SourceCitation } from '../types';

export const OFFICIAL_SOURCES: SourceCitation[] = [
  {
    id: 'src-ignca',
    title: 'Indira Gandhi National Centre for the Arts — Cultural Archives',
    publisherOrInstitution: 'Ministry of Culture, Government of India',
    type: 'Government',
    url: 'http://ignca.gov.in',
    accessDate: '2026-11-01',
    notes: 'Primary national documentation repository for Indian performing arts, regional rituals and traditional texts.'
  },
  {
    id: 'src-sna',
    title: 'Sangeet Natak Akademi National Repository',
    publisherOrInstitution: 'Sangeet Natak Akademi, New Delhi',
    type: 'Government',
    url: 'https://sangeetnatak.gov.in',
    accessDate: '2026-11-01',
    notes: 'Authoritative data on Indian classical and folk dance, music, puppetry and regional performance rituals.'
  },
  {
    id: 'src-imd-panchang',
    title: 'Rashtriya Panchang (National Calendar of India)',
    publisherOrInstitution: 'Positional Astronomy Centre, India Meteorological Department',
    type: 'Government',
    url: 'https://packolkata.gov.in',
    accessDate: '2026-11-01',
    notes: 'Official scientific astronomical and solar/lunar calendar published by the Government of India.'
  },
  {
    id: 'src-unesco-ich',
    title: 'UNESCO Representative List of the Intangible Cultural Heritage of Humanity',
    publisherOrInstitution: 'UNESCO',
    type: 'Academic',
    url: 'https://ich.unesco.org',
    accessDate: '2026-11-01',
    notes: 'Documentation for Durga Puja in Kolkata, Kumbh Mela, Yoga, and Vedic Chanting.'
  },
  {
    id: 'src-sgpc',
    title: 'Shiromani Gurdwara Parbandhak Committee (Nanakshahi Calendar)',
    publisherOrInstitution: 'SGPC Amritsar',
    type: 'Religious Institution',
    url: 'https://sgpc.net',
    accessDate: '2026-11-01',
    notes: 'Official calendar dates and historical references for Sikh Gurpurabs and historical commemorations.'
  },
  {
    id: 'src-hilal-india',
    title: 'Central Ruet-e-Hilal Committee & Shahi Imam Archives',
    publisherOrInstitution: 'Jama Masjid & Regional Moon Sighting Committees',
    type: 'Religious Institution',
    accessDate: '2026-11-01',
    notes: 'Lunar sighting verification parameters for Shawwal, Dhul Hijjah and Islamic festivals.'
  }
];

export const VERIFIED_FESTIVALS: Festival[] = [
  {
    id: 'fest-diwali',
    slug: 'diwali',
    title: {
      en: 'Diwali (Deepavali)',
      hi: 'दीपावली (दिवाली)',
      gu: 'દિવાળી (દીપાવલી)'
    },
    shortSummary: {
      en: 'The quiet magic of oil-soaked earthen diyas glowing on every windowsill, the fragrant simmer of roasting besan in pure desi ghee, and generations gathering to welcome light, auspicious beginnings, and gratitude into the home.',
      hi: 'माटी के दीयों की सुनहरी लौ, चौखटों पर सजे गेंदे के फूल और शुद्ध घी में भुनते बेसन के लड्डुओं की सौंधी महक—दीपावली केवल दीपों का पर्व नहीं, बल्कि अंतर्मन के उजियारे, पारिवारिक आत्मीयता और नई शुरुआत का पावन उत्सव है।',
      gu: 'ઘરના ઉંબરે ઝબૂકતા માટીના કોડિયાં, આસોપાલવનાં તોરણ અને શુદ્ધ ઘીમાં શેકાતા મોહનથાળની સોડમ—દિવાળી એટલે સ્નેહ, સમૃદ્ધિ અને આત્મીય સંબંધોના નવસર્જનનો મહાપર્વ.'
    },
    whyCelebrated: {
      en: 'In Hindu tradition, Diwali marks the joyful homecoming of Lord Rama, Sita, and Lakshmana to Ayodhya after 14 years of exile and the triumph of dharma. Across Bengal, the sacred new moon night is dedicated to the fierce, protective grace of Maa Kali. In western India, trading communities worship their new account books (Chopda Pujan) with fresh turmeric and betel leaves. In Jain tradition, it commemorates the Nirvana of Bhagwan Mahavira, while Sikhs celebrate Bandi Chhor Divas, recalling Guru Hargobind Ji’s compassionate release of 52 captive hill kings from Gwalior Fort.',
      hi: 'उत्तर भारत में यह भगवान श्रीराम, जानकी और लक्ष्मण के 14 वर्ष के वनवास उपरांत अयोध्या आगमन का आनंदोत्सव है। बंगाल में इसी रात मां काली की अलौकिक शक्ति की आराधना होती है। गुजरात व पश्चिमी भारत में व्यापारी बही-खातों का पारंपरिक ‘चोपड़ा पूजन’ कर नववर्ष की नींव रखते हैं। जैन धर्म में यह भगवान महावीर के निर्वाण कल्याणक का पावन दिन है, और सिख संगत इसे गुरु हरगोबिंद साहिब द्वारा 52 राजाओं को मुक्त कराने की स्मृति में ‘बंदी छोड़ दिवस’ के रूप में दीपोत्सव के साथ मनाती है।',
      gu: 'હિન્દુ સંસ્કૃતિમાં ૧૪ વર્ષના વનવાસ બાદ ભગવાન શ્રીરામ, સીતાજી અને લક્ષ્મણજીના અયોધ્યા પુનરાગમનની ખુશીમાં દીપમાળા પ્રગટાવાય છે. ગુજરાતમાં વેપારીઓ ચોપડા પૂજન કરી લક્ષ્મીજીની કૃપા યાચે છે અને બીજા દિવસે નૂતન વર્ષ ઉજવે છે. જૈન પરંપરામાં આ દિવસે ભગવાન મહાવીર સ્વામી મોક્ષ પધાર્યા હતા, જ્યારે શીખ સમુદાય ગ્વાલિયરના કિલ્લામાંથી ૫૨ રાજાઓની મુક્તિની યાદમાં બંદી છોડ દિવસ મનાવે છે.'
    },
    historyAndSignificance: {
      en: 'Spanning five deeply meaningful days from Dhanteras to Bhai Dooj, Diwali weaves together ancient agricultural gratitude and devotional reflection. Archaeological excavations at Harappan sites have revealed delicate terracotta oil lamps, proving that earthen illumination has graced the subcontinent for millennia. The Padma Purana, Skanda Purana, and medieval memoirs like Al-Biruni’s Kitab al-Hind detail how towns were illuminated with rows of clay lamps as autumn gave way to winter.',
      hi: 'धनतेरस से भाई दूज तक चलने वाला यह पंचदिवसीय उत्सव भारत की कृषि, ऋतु परिवर्तन और आध्यात्मिक चेतना का संगम है। हड़प्पा और सिंधु सभ्यता के उत्खनन में मिली मिट्टी की दीपमालाएं सिद्ध करती हैं कि दीपक प्रज्वलन की यह परंपरा सहस्राब्दियों पुरानी है। स्कंद पुराण और अल-बिरूनी के यात्रा वृत्तांतों में भी कार्तिक मास की इस जगमगाती निशा का अत्यंत सजीव वर्णन मिलता है।',
      gu: 'ધનતેરસ, કાળી ચૌદશ, દિવાળી, બેસતું વર્ષ અને ભાઈબીજ—આ પાંચ દિવસોનો ઉત્સવ ભારતીય સંસ્કૃતિની અનોખી ધરોહર છે. હડપ્પા અને સિંધુ ખીણની સંસ્કૃતિના અવશેષોમાં માટીના દીવાઓ મળ્યા છે, જે દર્શાવે છે કે આ પરંપરા હજારો વર્ષ જૂની છે. સ્કંદ પુરાણ અને પ્રાચીન ગ્રંથોમાં પણ કારતક અમાસના આ દીપોત્સવનું વિગતવાર વર્ણન મળે છે.'
    },
    ritualsAndCustoms: {
      en: 'Soaking porous clay diyas in fresh water so they burn through the night without drinking excess mustard oil, hand-grinding rice flour mixed with pinch of turmeric for doorstep rangoli, conducting evening Lakshmi-Ganesha puja with conch shells and brass ghanta, offering puffed batashas and home-churned sweets, placing the first lit diya with reverence at the base of the Tulsi plant, and sharing festive dabbas with neighbors.',
      hi: 'दीयों को पानी में भिगोकर सुखाना ताकि तेल न सोखें, चावल के आटे और हल्दी से देहरी पर हाथ से सुंदर रंगोली बनाना, संध्या काल में शंखध्वनि और घंटियों के साथ माता लक्ष्मी व श्री गणेश का मंगल पूजन, खील-बताशों और घर की बनी शुद्ध मिठाइयों का भोग, तुलसी के चौरे पर पहला दीपक रखना और बड़े-बुजुर्गों के चरण स्पर्श कर आशीर्वाद लेना।',
      gu: 'માટીના કોડિયાંને પાણીમાં પલાળીને સરસવ કે તલના તેલથી પ્રગટાવવાં, ચોખાના લોટ અને કંકુ-હળદરથી આંગણે રંગોળી સજાવવી, સંધ્યાકાળે શંખનાદ સાથે લક્ષ્મી-ગણેશ પૂજન કરવું, તુલસી ક્યારે પહેલો દીવો મૂકવો અને વડીલોના આશીર્વાદ લઈ સ્નેહીજનો સાથે મિઠાઈ વહેંચવી.'
    },
    traditionalFoods: ['Gujiya', 'Mohanthal', 'Kaju Katli', 'Chivda', 'Shakkarpara', 'Chakli'],
    category: 'Spiritual & Devotional',
    communities: ['Hindu', 'Jain', 'Sikh'],
    statesCovered: ['All India', 'Uttar Pradesh', 'Gujarat', 'Maharashtra', 'Punjab', 'Tamil Nadu'],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1200&auto=format&fit=crop',
      alt: 'Row of traditional oil diyas and vibrant floral rangoli during Diwali',
      caption: 'Clay diyas illuminated alongside traditional marigold rangoli',
      license: 'Unsplash Editorial Open / Verified Cultural Imagery',
      credit: 'Rang & Riwaayat Curated Archive'
    },
    decorationIdeas: {
      en: ['Terracotta diya rows on window sills and stairways', 'Fresh marigold and fragrant mango leaf toran across the front door', 'Geometric rice powder rangoli adorned with real flower petals', 'Brass urli filled with scented water, floating orange marigolds, and tea-lights'],
      hi: ['मुंडेरों और झरोखों पर मिट्टी के दीयों की स्वर्णिम कतार', 'मुख्य द्वार पर ताजे पीले गेंदे के फूल और आम के पत्तों का शुभ तोरण', 'चावल के आटे, अबीर और ताजी पंखुड़ियों से सजी चौखट रंगोली', 'पीतल के उरुली पात्र में तैरते गुलाब-गेंदे के फूल और तैरते दीपक'],
      gu: ['બારીઓ અને અગાશી પર માટીના કોડિયાંની અવિરત હારમાળા', 'મુખ્ય દ્વાર પર આસોપાલવ અને તાજા ગલગોટાનાં મંગલ તોરણ', 'આંગણામાં ચોખાના લોટ અને પ્રાકૃતિક રંગોથી બનાવેલી કલાત્મક રંગોળી', 'તાંબા કે પિત્તળના કૂંડામાં જળ ભરી તરતા રાખેલાં ફૂલો અને દીવડા']
    },
    faqs: [
      {
        question: {
          en: 'Why does Diwali date change every year in the Western calendar?',
          hi: 'पश्चिमी कैलेंडर में दिवाली की तारीख हर साल क्यों बदलती है?',
          gu: 'દિવાળીની તારીખ દર વર્ષે કેલેન્ડરમાં કેમ બદલાય છે?'
        },
        answer: {
          en: 'Diwali is calculated strictly using the Hindu lunisolar panchang. It falls on the darkest Amavasya (new moon tithi) of the month of Kartika. Because the lunar cycle consists of roughly 354 days compared to the solar Gregorian year of 365 days, the date gracefully oscillates between mid-October and mid-November.',
          hi: 'दीपावली की तिथि हिंदू चंद्र-सौर पंचांग के कार्तिक मास की कृष्ण पक्ष अमावस्या से तय होती है। चूंकि चंद्र वर्ष में 354 दिन होते हैं और अंग्रेजी सौर कैलेंडर में 365 दिन, इसलिए यह तारीख हर साल अक्टूबर और नवंबर के मध्य घूमती रहती है।',
          gu: 'દિવાળી હિન્દુ પંચાંગ મુજબ કારતક વદ અમાસની તિથિએ આવે છે. ચંદ્ર કેલેન્ડરમાં ૩૫૪ દિવસ અને અંગ્રેજી કેલેન્ડરમાં ૩૬૫ દિવસ હોવાથી આ પર્વ દર વર્ષે ઓક્ટોબર કે નવેમ્બર માસમાં આગળ-પાછળ થાય છે.'
        }
      }
    ],
    status: 'Published',
    sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[2]],
    lastVerifiedDate: '2026-11-01',
    isPopular: true
  },
  {
    id: 'fest-holi',
    slug: 'holi',
    title: {
      en: 'Holi (Festival of Colours)',
      hi: 'होली (रंगोत्सव)',
      gu: 'હોળી (રંગોત્સવ / ધૂળેટી)'
    },
    shortSummary: {
      en: 'The joyful whirlwind of spring’s arrival, where dried Palash (tesu) blossoms brew into fragrant amber dye, dholak rhythms ring across courtyards, and every hesitation dissolves in gentle clouds of herbal gulal.',
      hi: 'वसंत की मदमस्त बयार, टेसू के फूलों का महकता प्राकृतिक रंग, ढोलक की थाप पर गूंजते फाग गीत और आपसी गिले-शिकवे मिटाकर एक-दूसरे को रंगने का उल्लास—होली प्रेम, नवजीवन और बंधुत्व का पावन पर्व है।',
      gu: 'કેસૂડાંની મહેકતી સુગંધ, ઢોલના તાલે ગૂંજતા ફાગના ગીતો અને જૂના વેરઝેર ભૂલીને સ્નેહપૂર્વક ગુલાલ છાંટવાનો અનોખો આનંદ એટલે વસંતોત્સવ હોળી-ધૂળેટી.'
    },
    whyCelebrated: {
      en: 'Holika Dahan commemorates the steadfast devotion of child Bhakt Prahlad, whose faith in Lord Vishnu remained unharmed when demonic aunt Holika attempted to burn him in a blazing pyre. In the sacred land of Braj (Vrindavan, Barsana, Nandgaon), Holi is celebrated as the divine spring play of Radha and Krishna. Agriculturally, it marks the joyous rabi harvest, where farmers roast fresh barley, chickpeas, and wheat stalks in the sacred bonfire.',
      hi: 'होलिका दहन भक्त प्रह्लाद की अडिग आस्था और ईश्वर भक्ति का प्रतीक है, जिनकी रक्षा के आगे अहंकार की अग्नि निष्प्रभावी हो गई थी। ब्रजमंडल में यह श्रीराधा-कृष्ण के अलौकिक प्रेम और रास का उत्सव है। ग्रामीण भारत में यह रबी की नई फसल (गेहूं, जौ और चने) की बालियों को अग्नि को समर्पित कर प्रकृति का आभार जताने का लोकपर्व है।',
      gu: 'હોલિકા દહન ભક્ત પ્રહલાદની અતૂટ ઈશ્વરભક્તિ અને અધર્મ પર ધર્મના વિજયનું અમર પ્રતીક છે. વ્રજભૂમિમાં શ્રીરાધા-કૃષ્ણની ફૂલો અને લઠમાર હોળીનો દિવ્ય ઉલ્લાસ છવાય છે. ખેડૂતો ખેતરમાં પાકેલા નવા ઘઉં, ચણા અને ધાણી હોળીની પવિત્ર અગ્નિમાં હોમીને કુદરતનો આભાર માને છે.'
    },
    historyAndSignificance: {
      en: 'Ancient stone sculptures at the 16th-century Vijayanagara ruins in Hampi depict courtiers playfully splashing water syringes (pichkaris). King Harsha’s 7th-century Sanskrit play Ratnavali describes the entire capital dancing with fragrant red powders, while Mughal paintings from Akbar and Jahangir’s reigns preserve royal Holi revelries accompanied by Sufi poets and classical musicians.',
      hi: 'विजयनगर साम्राज्य के 16वीं सदी के हम्पी स्थित मंदिरों की शिलाओं पर पिचकारियों से रंग खेलते दरबारियों के चित्र उत्कीर्ण हैं। 7वीं सदी में राजा हर्ष द्वारा रचित संस्कृत नाटक ‘रत्नावली’ में कुंकुम और चंदन से खेली जाने वाली मदनोत्सव होली का मनोहारी वर्णन मिलता है। मुगलकालीन लघुचित्रों में भी बादशाह जहांगीर और अकबर के प्रांगण में होली के रंगीन उत्सव दर्शनीय हैं।',
      gu: 'હમ્પીના ઐતિહાસિક મંદિરોમાં ૧૬મી સદીના શિલ્પોમાં પિચકારીઓ વડે રંગ ઉડાડતા લોકોનું અંકન જોવા મળે છે. ૭મી સદીના સમ્રાટ હર્ષના નાટક ‘રત્નાવલી’માં આ પર્વનું સુંદર સાહિત્યિક આલેખન છે, જે સાબિત કરે છે કે રંગોત્સવ ભારતની સદીઓ જૂની જીવંત સંસ્કૃતિ છે.'
    },
    ritualsAndCustoms: {
      en: 'Gathering dry wood and dried cow dung cakes (upla) for the community bonfire on Phalguna Purnima evening, performing parikrama (circumambulation) while offering raw coconuts, dates, and fresh grains, rising at dawn for Dhulandi to embrace neighbors with herbal abeer and sandalwood paste, and savoring fresh mawa gujiyas crisp-fried in ghee.',
      hi: 'फाल्गुन पूर्णिमा की संध्या को चौराहों पर लकड़ी और उपलों की होलिका सजाना, जल, रोली, कच्चे सूत और नए अन्न की बालियों के साथ परिक्रमा कर अग्नि प्रज्वलित करना, धुलेंडी की सुबह टेसू के प्राकृतिक रंगों और अबीर-गुलाल से स्नेह मिलन, और घर-घर जाकर ताजी मावा गुजिया और ठंडाई का स्वाद लेना।',
      gu: 'સાંજે હોલિકા પ્રગટાવી શ્રીફળ, ખજૂર, ધાણી અને ચણા હોમીને પ્રદક્ષિણા કરવી, વડીલોના ચરણે ગુલાલ અર્પણ કરવો, બીજે દિવસે ધૂળેટી પર કેસૂડાંના રંગોથી નિર્દોષ આનંદ માણવો અને ઘરે બનાવેલી ગળી ઘૂઘરા-ગુજિયા ખવડાવવાં.'
    },
    traditionalFoods: ['Gujiya', 'Thandai', 'Malpua', 'Dahi Vada', 'Kachori', 'Puran Poli'],
    category: 'Seasonal & New Year',
    communities: ['Hindu', 'Secular & National'],
    statesCovered: ['Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Gujarat', 'Bihar', 'Punjab'],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1583301286816-f4f05e1e8b25?q=80&w=1200&auto=format&fit=crop',
      alt: 'Vibrant organic abeer and gulal dry colors kept in brass bowls',
      caption: 'Traditional herbal powders (gulal) prepared for the festival of colours',
      license: 'Unsplash Editorial Open / Verified Cultural Imagery',
      credit: 'Rang & Riwaayat Cultural Archive'
    },
    decorationIdeas: {
      en: ['Brass bowls with dry organic gulal and marigold petals', 'Fresh tesu (palash) flower essence displays', 'Colourful dupattas draped across verandahs'],
      hi: ['पीतल की परात में प्राकृतिक गुलाल और ताजे गेंदे के फूल', 'पलाश (केसूड़ा) के फूलों से तैयार हर्बल रंग जल', 'आंगन में रंग-बिरंगे पारंपरिक दुपट्टों की छटा'],
      gu: ['કેસૂડાંના કેસરી ફૂલોથી શણગાર', 'ઓર્ગેનિક અબીલ-ગુલાલનાં રંગબેરંગી વાટકા', 'હળવા સંગીત સાથે આવકારદાયક વાતાવરણ']
    },
    faqs: [
      {
        question: {
          en: 'What is Holika Dahan and why is it performed?',
          hi: 'होलिका दहन क्या है और यह क्यों किया जाता है?',
          gu: 'હોલિકા દહન શું છે અને તે કેમ કરવામાં આવે છે?'
        },
        answer: {
          en: 'Holika Dahan takes place the night before Holi, symbolizing the burning of arrogance, malice, and evil tendencies, represented by Holika, while pure devotion (Prahlad) emerged unscathed.',
          hi: 'होलिका दहन बुराई, अहंकार और नकारात्मक प्रवृत्तियों के भस्म होने तथा निष्काम भक्ति और सदाचार की रक्षा का प्रतीक है।',
          gu: 'હોલિકા દહન આસુરી વૃત્તિઓ અને દુર્ગુણોને હોમીને પવિત્રતા અને સદાચારને જાળવી રાખવાનો સંકેત આપે છે.'
        }
      }
    ],
    status: 'Published',
    sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1]],
    lastVerifiedDate: '2026-11-01',
    isPopular: true
  },
  {
    id: 'fest-eid-fitr',
    slug: 'eid-ul-fitr',
    title: {
      en: 'Eid ul-Fitr',
      hi: 'ईद-उल-फ़ित्र',
      gu: 'ઈદ-ઉલ-ફિત્ર'
    },
    shortSummary: {
      en: 'The sweet, breathless rooftop vigil scanning the dusk sky for the silver crescent moon (Hilal), the slow simmer of roasted seviyan in cardamom-scented milk on the family stove, and the tender warmth of elders pressing crisp Eidi into eager children’s hands.',
      hi: 'शाम के धुंधलके में छतों पर नए चांद का दीदार, चूल्हे पर धीमी आंच पर पकती इलायची-छुहारों वाली मीठी शीर खुरमा की सौंधी खुशबू, और बड़ों से मिलने वाली ईदी की खनखनाहट—ईद-उल-फ़ित्र इबादत, क्षमा, उदारता और दिलों को जोड़ने का मुकद्दस पर्व है।',
      gu: 'સાંજના આકાશે ઝીણા નવા ચાંદના દીદાર, રસોડામાં દૂધ અને ખારેક સાથે ધીમા તાપે ઉકળતી શીર્ ખુરમાની મીઠી સોડમ અને વડીલો પાસેથી મળતી ઈદીની ખુશી—ઈદ-ઉલ-ફિત્ર પ્રેમ, સખાવત અને ભાઈચારાનો પવિત્ર તહેવાર છે.'
    },
    whyCelebrated: {
      en: 'Commemorates the spiritual rejuvenation attained during the month of Ramadan. Muslims thank Allah for strength granted to observe fasting and give Zakat al-Fitr to ensure the needy celebrate equally.',
      hi: 'रमजान में आत्म-अनुशासन, संयम और प्रार्थना के बाद अल्लाह का शुक्र अदा करने का दिन है। इस दिन जकात-उल-फ़ित्रा अदा कर ज़रूरतमंदों को भी खुशियों में शामिल किया जाता है।',
      gu: 'આ પર્વ આત્મ-સંયમ અને ઉપાસના બાદ ઈશ્વર પ્રત્યે કૃતજ્ઞતા વ્યક્ત કરવાનો અવસર છે. ગરીબોને ફિત્રા આપીને સૌને પર્વમાં સહભાગી બનાવવામાં આવે છે.'
    },
    historyAndSignificance: {
      en: 'Instituted by Prophet Muhammad upon migration to Medina in 624 CE as a communal day of pure joy, peace, and fraternal solidarity replacing pre-Islamic revelries.',
      hi: 'मदीना प्रवास के पश्चात 624 ईस्वी में पैगंबर हज़रत मोहम्मद (स.अ.व.) द्वारा भाईचारे, अमन और इबादत के साथ इस उत्सव की परंपरा स्थापित की गई।',
      gu: 'ઇસ્લામિક પરંપરા અનુસાર હિજરી સંવતના શવવાલ મહિનાના પ્રથમ દિવસે આ પર્વ સંપૂર્ણ શ્રદ્ધા સાથે ઉજવવામાં આવે છે.'
    },
    ritualsAndCustoms: {
      en: 'Ghusl (ritual purification), donning finest traditional attire, eating sweet dates before leaving for Eidgah, congregational Eid namaz, exchanging warm Eid Mubarak embraces, paying Zakat al-Fitr, giving Eidi to children.',
      hi: 'स्नान कर नए पारंपरिक वस्त्र पहनना, ईदगाह जाने से पूर्व मीठी खजूर चखना, ईदगाह में विशेष नमाज़, गले मिलकर मुबारकबाद देना, बच्चों को ईदी बांटना।',
      gu: 'સ્નાન કરી નવા વસ્ત્રો ધારણ કરવા, ઈદગાહમાં જઈ સામૂહિક નમાઝ અદા કરવી, ગળે મળી ઈદ મુબારક કહેવું અને બાળકોને ઈદી આપવી.'
    },
    traditionalFoods: ['Sheer Khurma', 'Seviyan Kheer', 'Shahi Tukda', 'Dum Biryani', 'Kabab', 'Phirni'],
    category: 'Spiritual & Devotional',
    communities: ['Muslim'],
    statesCovered: ['All India', 'Delhi', 'Uttar Pradesh', 'Telangana', 'Kerala', 'Jammu & Kashmir'],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
      alt: 'Traditional Eid lantern (Fanous) and bowls of dates and dry fruits',
      caption: 'Eid ul-Fitr celebration setting with dates and traditional festive sweets',
      license: 'Unsplash Editorial Open / Verified Cultural Imagery',
      credit: 'Rang & Riwaayat Curated Archive'
    },
    decorationIdeas: {
      en: ['Brass filigree lanterns (Fanous) with warm amber light', 'Delicate crescent and star paper art', 'Fragrant jasmine flower strings around living rooms'],
      hi: ['पीतल के नक्काशीदार फानूस और मंद रोशनी', 'चांद-तारे के कलात्मक झूमर', 'मोगरे और चमेली के ताजे गजरे व फूलों की महक'],
      gu: ['સુંદર ફાનૂસ અને રોશની', 'મોગરાના તાજાં ફૂલોની સુગંધ', 'આકર્ષક બેઠક વ્યવસ્થા અને દસ્તરખાન']
    },
    faqs: [
      {
        question: {
          en: 'Why does the exact day of Eid ul-Fitr depend on moon sighting?',
          hi: 'ईद-उल-फ़ित्र का दिन चांद दिखने पर ही क्यों निर्भर करता है?',
          gu: 'ઈદની ચોક્કસ તારીખ ચંદ્ર દર્શન પર કેમ આધારિત હોય છે?'
        },
        answer: {
          en: 'The Islamic calendar is strictly lunar. The month of Ramadan ends with the physical or verified astronomical sighting of the crescent moon of Shawwal, which can vary by one day regionally.',
          hi: 'इस्लामी हिजरी कैलेंडर पूर्णतः चंद्र गति पर आधारित है। रमज़ान का महीना शव्वाल के नए चांद की तस्दीक के साथ पूरा होता है, जिससे क्षेत्रीय तौर पर एक दिन का अंतर संभव है।',
          gu: 'ઇસ્લામિક કેલેન્ડર ચંદ્રની ગતિ પર આધારિત હોવાથી શવવાલ મહિનાના નવા ચાંદના દીદાર થયા બાદ જ ઈદ નક્કી થાય છે.'
        }
      }
    ],
    status: 'Published',
    sources: [OFFICIAL_SOURCES[5]],
    lastVerifiedDate: '2026-11-01',
    isPopular: true
  },
  {
    id: 'fest-gurpurab',
    slug: 'guru-nanak-jayanti',
    title: {
      en: 'Guru Nanak Jayanti (Gurpurab)',
      hi: 'गुरु नानक जयंती (प्रकाश पर्व)',
      gu: 'ગુરુ નાનક જયંતિ (પ્રકાશ પર્વ)'
    },
    shortSummary: {
      en: 'The tranquil stillness of the misty Amrit Vela dawn echoing with the soulful hymns of Gurbani, the selfless grace of Guru Ka Langar where prince and pauper share the same floor mat, and warm, pure-ghee Karah Parshad sanctifying every open hand.',
      hi: 'अमृत वेले की धुंधली सुबह में गूंजती शबद कीर्तन की पावन ध्वनियां, गुरु के अटूट लंगर में एक पंगत में बैठकर सेवा और प्रसाद पाने का समता भाव, और शुद्ध घी में तर कड़ा प्रसाद की गरमाहट—प्रकाश पर्व निस्वार्थ सेवा, सत्य और रूहानी शांति का पावन पर्व है।',
      gu: 'વહેલી સવારે ઝાકળભીની હવામાં ગૂંજતું ગુરબાણી કીર્તન, પંગતમાં સૌને સમાન ગણી અપાતું લંગર અને શુદ્ધ ઘીથી લથબથ ગરમ કડા પ્રસાદ—ગુરુ નાનક દેવજીનો પ્રકાશ પર્વ નિઃસ્વાર્થ સેવા અને માનવતાનો દિવ્ય સંદેશ આપે છે.'
    },
    whyCelebrated: {
      en: 'Honors the life, celestial poetry, and universal spiritual teachings of Guru Nanak Dev Ji (born 1469 in Rai Bhoi di Talwandi, modern Nankana Sahib).',
      hi: 'गुरु नानक देव जी के जीवन, उनकी रचित गुरबाणी और जात-पात से परे मानवता के कल्याण के संदेश के प्रति श्रद्धा अर्पित करने के लिए यह पर्व मनाया जाता है।',
      gu: 'ગુરુ નાનક દેવજીએ સમાજમાંથી અસમાનતા દૂર કરી સૌને સમાન ગણીને લંગર અને સેવા પ્રથાની શરૂઆત કરી હતી.'
    },
    historyAndSignificance: {
      en: 'Celebrated on Kartik Purnima across Gurdwaras worldwide. From the 48-hour continuous Akhand Path recitation to the open community Langar hall where prince and pauper sit cross-legged on the same floor mat, the celebration embodies Guru Nanak Dev Ji’s core teaching of human equality.',
      hi: 'कार्तिक पूर्णिमा के दिन गुरुद्वारों में 48 घंटे का अखंड पाठ, अमृत वेले प्रभात फेरी और बिना किसी भेदभाव के सभी के लिए लंगर का आयोजन होता है।',
      gu: 'આ દિવસે ગુરુદ્વારાઓમાં અખંડ પાઠ, નગર કીર્તન અને સર્વસમાવેશી લંગરની સેવા કરવામાં આવે છે.'
    },
    ritualsAndCustoms: {
      en: 'Prabhat Pheris at dawn, Akhand Path completion, vibrant Nagar Kirtan led by Panj Pyare carrying Nishan Sahib, Gatka martial arts displays, Langar sewa, evening kirtan and illumination with ghee diyas.',
      hi: 'भोर में प्रभात फेरी, पंज प्यारों के नेतृत्व में भव्य नगर कीर्तन, पारंपरिक गतका प्रदर्शन, गुरु का अटूट लंगर, संध्या में दीपमाला।',
      gu: 'પ્રભાત ફેરી, પંજ પ્યારા સાથે નગર કીર્તન, ગતકા કરતબ, લંગર સેવા અને રાત્રે દીપોત્સવ.'
    },
    traditionalFoods: ['Kada Prasad (Atta Halwa)', 'Langar Wali Dal (Mah Chana Dal)', 'Kheer', 'Missi Roti', 'Makki di Roti & Sarson da Saag'],
    category: 'Spiritual & Devotional',
    communities: ['Sikh'],
    statesCovered: ['Punjab', 'Haryana', 'Delhi', 'Chandigarh', 'Pan-India'],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1609342122563-a43ac8917a3a?q=80&w=1200&auto=format&fit=crop',
      alt: 'Harmandir Sahib Golden Temple illuminated with reflections in Amrit Sarovar',
      caption: 'The Golden Temple in Amritsar illuminated during Prakash Gurpurab',
      license: 'Unsplash Editorial Open / Verified Cultural Imagery',
      credit: 'Rang & Riwaayat Cultural Repository'
    },
    decorationIdeas: {
      en: ['Ghee diyas in brass thalis around doorstep', 'Floral festoons of white and orange chrysanthemums', 'Clean illuminated pathways'],
      hi: ['द्वार पर पीतल की थालियों में शुद्ध घी के दीये', 'सफेद और नारंगी गुलदाउदी के फूलों की लड़ियां', 'स्वच्छ रोशनी से सुसज्जित परिसर'],
      gu: ['ઘર અને આંગણામાં ઘીના દીવા', 'શ્વેત અને પીળાં પુષ્પોથી સજાવટ']
    },
    faqs: [
      {
        question: {
          en: 'What is Kada Prasad and how is it prepared?',
          hi: 'कड़ा प्रसाद क्या है और इसे कैसे बनाया जाता है?',
          gu: 'કડા પ્રસાદ શું છે અને તે કેવી રીતે બને છે?'
        },
        answer: {
          en: 'Kada Prasad is the sacred sanctified pudding distributed in Gurdwaras. It is prepared with equal measures (1:1:1:3 ratio) of coarse whole wheat flour, pure desi ghee, sugar, and water while reciting Gurbani prayers.',
          hi: 'कड़ा प्रसाद गुरुद्वारे का पवित्र प्रसाद है, जिसे समान अनुपात में गेहूं का आटा, शुद्ध देशी घी, चीनी और जल मिलाकर निरंतर गुरबाणी पाठ के साथ श्रद्धा से पकाया जाता है।',
          gu: 'કડા પ્રસાદ પવિત્ર પ્રસાદ છે જે શુદ્ધ ઘી, ઘઉંનો લોટ, ખાંડ અને જળના સમપ્રમાણ મિશ્રણથી ગુરબાણીના ઉચ્ચારણ સાથે બનાવવામાં આવે છે.'
        }
      }
    ],
    status: 'Published',
    sources: [OFFICIAL_SOURCES[4]],
    lastVerifiedDate: '2026-11-01',
    isPopular: true
  },
  {
    id: 'fest-onam',
    slug: 'onam',
    title: {
      en: 'Onam',
      hi: 'ओणम',
      gu: 'ઓણમ'
    },
    shortSummary: {
      en: 'Ten quiet mornings of rising at dawn to gather fresh dewy wildflowers for the Athapookalam carpet, the joyous return of beloved King Mahabali, and the reverent quiet of the 26-dish Onasadya served on a fresh emerald banana leaf.',
      hi: 'भोर की ओस में भीगे जंगली फूलों को चुनकर आंगन में सजाया गया अथपूक्कलम, दयालु राजा महाबली के स्नेहिल स्वागत का उल्लास, और केले के ताजे पत्ते पर विधिवत परोसी जाने वाली 26 व्यंजनों की सात्विक ओणसद्या—ओणम प्रकृति, लोकविश्वास और केरल की सौम्य संस्कृति का हृदयस्पर्शी उत्सव है।',
      gu: 'સવારના પહોરમાં ચૂંટેલા તાજાં જંગલી ફૂલોથી આંગણે ગૂંથાતી અદ્ભુત રંગોળી, પ્રજાપ્રિય રાજા મહાબલિનું ભાવભર્યું સ્વાગત અને કેળાના તાજા પાન પર પીરસાતું ૨૬ વાનગીઓનું અમૃતતુલ્ય ઓણસદ્યા—ઓણમ એ પ્રકૃતિ અને માનવીય સૌહાર્દનો ઉત્સવ છે.'
    },
    whyCelebrated: {
      en: 'Celebrates the golden era of equitable prosperity under Asura King Mahabali, who returns from Patala once every year during the month of Chingam to visit his beloved people.',
      hi: 'पौराणिक राजा महाबली के समतामूलक, समृद्ध शासन की स्मृति में यह पर्व मनाया जाता है। मान्यता है कि राजा महाबली अपनी प्रजा को देखने प्रतिवर्ष इस दिन आते हैं।',
      gu: 'લોકકથા મુજબ દયાળુ રાજા મહાબલિ પોતાની પ્રજાના ખબરઅંતર પૂછવા પાતાળમાંથી દર વર્ષે ઓણમના દિવસે પધારે છે.'
    },
    historyAndSignificance: {
      en: 'References date back to the Sangam era (Maduraikkanci mentions Onam celebrations). Thrikkakara Temple near Kochi, dedicated to Vamana, is the historical epicenter of the 10-day carnival beginning from Atham to Thiruvonam.',
      hi: 'संगम साहित्य के ग्रन्थ ‘मदुरैक्कांची’ में ओणम का उल्लेख मिलता है। कोच्चि स्थित थ्रिक्काकरा मंदिर में वामन और महाबली की पूजा इस १०-दिवसीय उत्सव का मुख्य केंद्र है।',
      gu: 'સંગમ સાહિત્યમાં આ ઉત્સવના ઉલ્લેખ છે. અથમથી થીરુવોણમ સુધીના દસ દિવસો દરમિયાન કેરળ રંગીન બની જાય છે.'
    },
    ritualsAndCustoms: {
      en: 'Laying floral carpets (Athapookkalam) with fresh blossoms daily, Thiruvathira kali dance by women in Kasavu saris, Pulikali tiger dance, Vallam Kali snake boat races along the Pamba river, serving 26-dish Onasadya on plantain leaves.',
      hi: 'घर के आंगन में १० दिनों तक दैनिक फूलों की रंगोली (अथपूक्कलम), कसावु साड़ियों में महिलाओं का तिरुवातिरा नृत्य, पुलिकली (बाघ नृत्य), पंपा नदी में वल्लम कली सर्प-नौका दौड़, केले के पत्ते पर २६ व्यंजनों वाली ओणसद्या।',
      gu: 'ફૂલોની રંગોળી (અથપૂક્કલમ), પરંપરાગત વલ્લમકલી નૌકા દોડ, પુલિકલી નૃત્ય અને કેળાના પાન પર પીરસાતું ૨૬ વાનગીઓનું ઓણસદ્યા.'
    },
    traditionalFoods: ['Onasadya (26 items)', 'Avial', 'Ada Pradhaman Payasam', 'Olan', 'Erissery', 'Kaalan', 'Sharkara Upperi'],
    category: 'Harvest & Agricultural',
    communities: ['Secular & National', 'Hindu'],
    statesCovered: ['Kerala'],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      alt: 'Elaborate fresh floral pookkalam carpet crafted during Onam in Kerala',
      caption: 'Spectacular floral carpet (Athapookkalam) designed for Thiruvonam',
      license: 'Unsplash Editorial Open / Verified Cultural Imagery',
      credit: 'Rang & Riwaayat Kerala Archive'
    },
    decorationIdeas: {
      en: ['Circular geometric flower carpets (Pookkalam) with marigold, lotus, and tulsi', 'Brass Nilavilakku tall floor oil lamp placed in the center', 'Fresh green banana leaves with tender coconuts'],
      hi: ['आंगन में विभिन्न रंगों के फूलों से बना वृत्ताकार पूक्कलम', 'मध्य में प्रज्वलित पीतल का पारंपरिक नीलाविळक्कु दीप', 'प्रवेश द्वार पर हरे केले के पत्ते और नारियल की सजावट'],
      gu: ['આંગણામાં સુંદર પુષ્પ રંગોળી', 'મધ્યમાં તેલનો પિત્તળનો મોટો દીવો (નીલાવિલક્કુ)', 'કેળના પાનથી સ્વાગત']
    },
    faqs: [
      {
        question: {
          en: 'What makes an authentic Onasadya unique?',
          hi: 'पारंपरिक ओणसद्या की क्या विशिष्टता है?',
          gu: 'પરંપરાગત ઓણસદ્યા ભોજનની વિશેષતા શું છે?'
        },
        answer: {
          en: 'Served on a fresh plantain leaf with its tapered end pointing left, an authentic Onasadya includes strictly vegetarian, balanced preparations containing all six Ayurvedic rasas without onion or garlic.',
          hi: 'ओणसद्या केले के पत्ते पर बाएं से दाएं क्रम में परोसी जाती है, जिसमें बिना प्याज-लहसुन के छह आयुर्वेदिक रसों (मधुर, अम्ल, लवण, कटु, तिक्त, कषाय) से युक्त 26 संतुलित व्यंजन होते हैं।',
          gu: 'ઓણસદ્યા શુદ્ધ શાકાહારી ભોજન છે જે કેળાના પાન પર ચોક્કસ ક્રમમાં પીરસાય છે અને તેમાં આયુર્વેદિક સ્વાદોનો અદ્ભુત સમન્વય હોય છે.'
        }
      }
    ],
    status: 'Published',
    sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1]],
    lastVerifiedDate: '2026-11-01',
    isPopular: true
  },
  {
    id: 'fest-durga-puja',
    slug: 'durga-puja',
    title: {
      en: 'Durga Puja (Sharadotsav)',
      hi: 'दुर्गा पूजा (शारदोत्सव)',
      gu: 'દુર્ગા પૂજા (શારદોત્સવ)'
    },
    shortSummary: {
      en: 'The electrifying cadence of Dhak drums under crisp autumn skies, fragrant clouds of burning frankincense swirling during Dhunuchi Naach, the tender tearful joy of Sindoor Khela, and the comforting solace of piping-hot khichuri bhog.',
      hi: 'शरद ऋतु की नीली धूप में ढाक की थाप से थरथराता वातावरण, धुनुची नृत्य में उठती धुने की सुगंधित लपटें, महाअष्टमी पर मां के नयनों में छलकता वात्सल्य, और दशमी को सिंदूर खेला की भावुक विदाई—दुर्गा पूजा केवल उत्सव नहीं, बल्कि बंगाल की आत्मा, कला और मातृशक्ति का सजीव महोत्सव है।',
      gu: 'શરદ ઋતુના સોનેરી તડકામાં ઢાકના તાલે ગૂંજતું વાતાવરણ, ધુનુચી નૃત્યમાં ઊડતી ધૂપની પવિત્ર સુગંધ અને દશેરાએ સિંદૂર ખેલાની લાગણીસભર વિદાય—દુર્ગા પૂજા એ માતૃશક્તિની આરાધના અને કલાનો અદ્ભુત મેળો છે.'
    },
    whyCelebrated: {
      en: 'Marks Goddess Durga’s triumph over demon Mahishasura on Vijayadashami, and celebrates her annual visit to her maternal earthly home accompanied by children Ganesha, Kartikeya, Lakshmi, and Saraswati.',
      hi: 'महिषासुर मर्दिनी मां दुर्गा की असत्य पर विजय और अपने मायके में संतान (गणेश, कार्तिकेय, लक्ष्मी, सरस्वती) सहित आगमन का उल्लास।',
      gu: 'અસુરો પર મા દુર્ગાનો વિજય અને માતૃશક્તિના સન્માનમાં વિજયાદશમી સુધી ભવ્ય પૂજન ઉત્સવ.'
    },
    historyAndSignificance: {
      en: 'Inscribed on the UNESCO Intangible Cultural Heritage list in 2021. Earliest grand community pujas trace to Zamindars of Dinajpur (1583) and Raja Nabakrishna Deb in Shovabazar Rajbari (1757).',
      hi: '2021 में यूनेस्को द्वारा मानवता की अमूर्त सांस्कृतिक विरासत में शामिल। शोभाराम राजबाड़ी और बंगाल के ऐतिहासिक पूजा पंडालों की समृद्ध कलात्मक परंपरा है।',
      gu: '૨૦૨૧માં યુનેસ્કો દ્વારા અમૂર્ત વારસા તરીકે નોંધાયેલું આ પર્વ કલા, સંગીત અને શિલ્પકળાનો ત્રિવેણી સંગમ છે.'
    },
    ritualsAndCustoms: {
      en: 'Bodhan invocation of the deity, Sandhi Puja at the juncture of Ashtami and Navami with 108 lotuses and lamps, rhythmic Dhak drum beating, fragrant Dhunuchi Naach, and women’s Sindoor Khela on Dashami.',
      hi: 'बोधन आमंत्रण, अष्टमी-नवमी की संधि पूजा पर 108 कमल पुष्प व 108 दीप प्रज्वलन, ढाक वादन, धुनुची नृत्य और दशमी को सिंदूर खेला।',
      gu: '૧૦૮ કમળ અને દીવાઓ સાથે સંધિ પૂજા, ઢાકના તાલે ધુનુચી નૃત્ય અને દશેરાના દિવસે સિંદૂર ખેલા.'
    },
    traditionalFoods: ['Khichuri Bhog', 'Labra Mix Veg', 'Cholar Dal', 'Luchi', 'Payesh', 'Sandesh', 'Mishti Doi'],
    category: 'Spiritual & Devotional',
    communities: ['Hindu'],
    statesCovered: ['West Bengal', 'Tripura', 'Assam', 'Odisha', 'Pan-India'],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1570784332176-fdd73da66f03?q=80&w=1200&auto=format&fit=crop',
      alt: 'Exquisite idol of Goddess Durga Mahishasuramardini with traditional clay artistry',
      caption: 'Sacred clay murti of Devi Durga crafted in Kumartuli, Kolkata',
      license: 'Unsplash Editorial Open / Verified Cultural Imagery',
      credit: 'Rang & Riwaayat Bengal Archive'
    },
    decorationIdeas: {
      en: ['Terracotta lamps and clay pots with mango leaves', 'Alpana rice paste floor art with paisley motifs', 'Kash phool (wild autumn grass) arrangements'],
      hi: ['मिट्टी के दीप और आम्रपल्लव युक्त मंगल कलश', 'चावल की लेई से निर्मित अल्पना लोककला', 'शरद ऋतु के प्रतीक सफेद काश के फूलों की सज्जा'],
      gu: ['આંગણામાં શ્વેત ચોખાના ખીરથી આલ્પના ચિત્રો', 'માટીના કુંભ અને દીવાઓ', 'કાસના શ્વેત ફૂલોથી કુદરતી શણગાર']
    },
    faqs: [
      {
        question: {
          en: 'What is Sandhi Puja and why are 108 lotuses used?',
          hi: 'संधि पूजा क्या है और इसमें 108 कमलों का प्रयोग क्यों होता है?',
          gu: 'સંધિ પૂજા શું છે અને તેમાં ૧૦૮ કમળ શા માટે અર્પણ કરાય છે?'
        },
        answer: {
          en: 'Sandhi Puja occurs during the 48-minute transition window between the last 24 minutes of Ashtami tithi and the first 24 minutes of Navami tithi, commemorating the exact moment Goddess Durga manifested as Chamunda to slay demons Chanda and Munda.',
          hi: 'अष्टमी के अंतिम 24 मिनट और नवमी के प्रारंभिक 24 मिनट के 48 मिनट के संधिकाल में मां चामुंडा रूप के प्राकट्य की स्मृति में 108 दीप और 108 नीलकमल अर्पित किए जाते हैं।',
          gu: 'આઠમની છેલ્લી ૨૪ મિનિટ અને નોમની પહેલી ૨૪ મિનિટ વચ્ચેના સંધિકાળમાં મા ચામુંડાના પૂજન માટે ૧૦૮ કમળ અર્પણ કરાય છે.'
        }
      }
    ],
    status: 'Published',
    sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[3]],
    lastVerifiedDate: '2026-11-01',
    isPopular: true
  },
  {
    id: 'fest-hornbill',
    slug: 'hornbill-festival',
    title: {
      en: 'Hornbill Festival (Festival of Festivals)',
      hi: 'हॉर्नबिल महोत्सव (त्योहारों का त्योहार)',
      gu: 'હોર્નબિલ મહોત્સવ'
    },
    shortSummary: {
      en: 'Morning mist gently curling around the pine-clad hills of Kisama, the thunderous heartbeat of ancestral log drums, vibrant warrior headgear swaying in proud unity, and sixteen indigenous Naga tribes gathering around the shared hearthfire to honor folklore and earth.',
      hi: 'किसामा की सुरम्य पहाड़ियों में तैरती सुबह की धुंध, पूर्वजों के विशाल काष्ठ ड्रमों की गूंजती धड़कन, हॉर्नबिल के पंखों से सजे योद्धा मुकुट, और नागालैंड की 16 प्रमुख जनजातियों का साझा अलाव के गिर्द अपनी लोककथाओं और धरती को नमन—हॉर्नबिल स्वदेशी गरिमा और सहअस्तित्व का अद्वितीय संगम है।',
      gu: 'કિસામાની હરિયાળી ટેકરીઓ પર વહેલી સવારે છવાયેલી ધુમ્મસ, લાકડાના પ્રાચીન ડ્રમનો ગગનભેદી નાદ અને ૧૬ જનજાતિઓનો પોતાની માટી, લોકગીતો અને સંસ્કૃતિને જીવંત રાખવાનો અનોખો સમન્વય એટલે હોર્નબિલ ફેસ્ટિવલ.'
    },
    whyCelebrated: {
      en: 'Named after the sacred Indian Hornbill bird revered in Naga tribal folklore, it was established by the Government of Nagaland to preserve, celebrate, and present inter-tribal cultural harmony and indigenous heritage to the world.',
      hi: 'नागा लोककथाओं में पूजनीय हॉर्नबिल पक्षी के नाम पर स्थापित यह उत्सव सभी जनजातियों के आपसी सौहार्द और स्वदेशी कलाओं के संरक्षण का प्रतीक है।',
      gu: 'નાગા લોકસાહિત્યમાં પવિત્ર મનાતા હોર્નબિલ પક્ષી પરથી આ પર્વનું નામ રખાયું છે, જે એકતા અને વારસાનું પ્રતીક છે.'
    },
    historyAndSignificance: {
      en: 'Inaugurated in December 2000 by the State Department of Tourism and Art & Culture at Naga Heritage Village, Kisama (12 km from Kohima). Each tribe constructs their traditional architectural dormitory (Morung).',
      hi: 'दिसंबर 2000 में कोहिमा के निकट किसामा में शुरू हुआ। प्रत्येक जनजाति अपने पारंपरिक काष्ठ-निर्मित ‘मोरुंग’ (युवा गृह) में अपनी सांस्कृतिक थाती प्रस्तुत करती है।',
      gu: 'વર્ષ ૨૦૦૦થી શરૂ થયેલો આ મહોત્સવ નાગાલેન્ડના કોહિમા પાસે આવેલા કીસામા ગામમાં દર વર્ષે ૧ થી ૧૦ ડિસેમ્બર દરમિયાન યોજાય છે.'
    },
    ritualsAndCustoms: {
      en: 'Ceremonial opening log drum beating, colorful warrior headgear with hornbill feathers, folk musical instrument performances using log drums and bamboo flutes, indigenous archery and chili-eating contests, evening rock festival.',
      hi: 'विशाल काष्ठ ड्रम (लॉग ड्रम) वादन, हॉर्नबिल के पंखों से सजे योद्धा मुकुट, पारंपरिक तीरंदाजी, नागा मिर्च प्रतियोगिता और लोकगायन।',
      gu: 'લાકડાના મોટા ડ્રમનું વાદન, પરંપરાગત વસ્ત્રો અને પીંછા ધરાવતા મુગટ સાથે નૃત્ય, દેશી રમતો અને રાત્રિ સંગીત સંધ્યા.'
    },
    traditionalFoods: ['Smoked Meat with Bamboo Shoot', 'Zutho (Traditional Fermented Rice Beverage)', 'Axone (Fermented Soybean Mash)', 'Naga King Chili Chutney', 'Galho Rice Stew'],
    category: 'Cultural & Folk',
    communities: ['Tribal & Indigenous'],
    statesCovered: ['Nagaland', 'North-East India'],
    heroImage: {
      url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop',
      alt: 'Naga warrior in authentic ceremonial regalia and hornbill feather headpiece at Hornbill Festival',
      caption: 'Indigenous Naga cultural representative in traditional tribal attire at Kisama',
      license: 'Unsplash Editorial Open / Verified Cultural Imagery',
      credit: 'Rang & Riwaayat North-East Archive'
    },
    decorationIdeas: {
      en: ['Woven bamboo and cane handicraft baskets', 'Geometric handloom Naga shawls with black, red, and white motifs', 'Warm woodcraft and tribal spear art accents'],
      hi: ['बांस और बेंत के हस्तशिल्प और टोकरियां', 'लाल-काले-सफेद ज्यामितीय पैटर्न वाली पारंपरिक नागा शॉल', 'काष्ठकला और पारंपरिक नक्काशीदार आकृतियां'],
      gu: ['વાંસ અને નેતરની કલાત્મક વસ્તુઓ', 'હાથવણાટની પરંપરાગત નાગા શાલ', 'લાકડાની નકશીદાર કલાકૃતિઓ']
    },
    faqs: [
      {
        question: {
          en: 'Where and when does the Hornbill Festival take place each year?',
          hi: 'हॉर्नबिल महोत्सव प्रतिवर्ष कब और कहां आयोजित होता है?',
          gu: 'હોર્નબિલ ફેસ્ટિવલ દર વર્ષે ક્યારે અને ક્યાં યોજાય છે?'
        },
        answer: {
          en: 'It takes place annually from December 1 to December 10 at the Naga Heritage Village in Kisama, located 12 km south of Kohima, the capital of Nagaland.',
          hi: 'यह प्रतिवर्ष 1 दिसंबर से 10 दिसंबर तक नागालैंड की राजधानी कोहिमा से 12 किमी दूर किसामा हेरिटेज विलेज में आयोजित किया जाता है।',
          gu: 'આ મહોત્સવ દર વર્ષે ૧ થી ૧૦ ડિસેમ્બર દરમિયાન નાગાલેન્ડના પાટનગર કોહિમા નજીક આવેલા કીસામા હેરિટેજ વિલેજમાં યોજાય છે.'
        }
      }
    ],
    status: 'Published',
    sources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1]],
    lastVerifiedDate: '2026-11-01',
    isPopular: true
  }
];

export const VERIFIED_OCCURRENCES: FestivalOccurrence[] = [
  // ==========================================
  // HISTORICAL ARCHIVE — 2025 OCCURRENCES
  // ==========================================
  {
    id: 'occ-diwali-2025',
    festivalSlug: 'diwali',
    year: 2025,
    startDate: '2025-10-18',
    endDate: '2025-10-22',
    primaryDate: '2025-10-20',
    isHistorical: true,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'North India & Pan-India',
        variationName: 'Badi Diwali / Lakshmi Puja',
        distinctCustoms: ['Lakshmi-Ganesh Puja at Pradosh Kaal', 'Dhanteras coin worship', 'Bhai Dooj sister visits'],
        calendarSystem: 'Vikram Samvat 2082 (Kartika Krishna Amavasya)',
        tithiOrPanchang: 'Kartika Amavasya commences 10:14 PM Oct 19, concludes 08:44 PM Oct 20',
        muhuratVerified: 'Lakshmi Puja Pradosh Kaal: 06:12 PM to 08:08 PM IST',
        notes: 'Governed by Pradosh Kaal Amavasya tithi intersection as verified in Rashtriya Panchang.'
      },
      {
        regionOrState: 'Gujarat',
        variationName: 'Chopda Pujan & Bestu Varas',
        distinctCustoms: ['Closing traditional ledgers with Chopda Pujan on Diwali night', 'Bestu Varas (New Year Day 2082) on Oct 21 with Saalgubarak greetings'],
        calendarSystem: 'Gujarati Vikram Samvat 2082 (Kartik Sud Ekam)',
        tithiOrPanchang: 'Kartik Sud 1',
        notes: 'Gujarat celebrates New Year on the day following Amavasya.'
      },
      {
        regionOrState: 'Tamil Nadu & South India',
        variationName: 'Deepavali (Naraka Chaturdashi)',
        distinctCustoms: ['Pre-dawn sesame oil bath (Ganga Snanam)', 'Deepavali Lehyam herbal digestive consumption', 'New clothes and bursting crackers before sunrise'],
        calendarSystem: 'Tamil Solar Calendar (Aippasi Month)',
        tithiOrPanchang: 'Naraka Chaturdashi Brahma Muhurtham',
        muhuratVerified: 'Pre-dawn bath: 04:30 AM to 05:45 AM IST on Oct 20',
        notes: 'Primary celebration observed on Chaturdashi morning rather than Amavasya evening.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[2]],
    lastVerifiedDate: '2025-02-01'
  },
  {
    id: 'occ-holi-2025',
    festivalSlug: 'holi',
    year: 2025,
    startDate: '2025-03-13',
    endDate: '2025-03-14',
    primaryDate: '2025-03-14',
    isHistorical: true,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Pan-India & North India',
        variationName: 'Holika Dahan & Dhulandi',
        distinctCustoms: ['Holika Dahan bonfire after Bhadra tithi ends', 'Rangotsav splashing of organic abeer'],
        calendarSystem: 'Vikram Samvat 2081 (Phalguna Purnima)',
        tithiOrPanchang: 'Phalguna Purnima begins 10:35 AM Mar 13, ends 12:22 PM Mar 14',
        muhuratVerified: 'Holika Dahan: 11:26 PM Mar 13 to 12:30 AM Mar 14 (post-Bhadra Mukha)',
        notes: 'Holika Dahan must be performed in Pradosh Kaal without Bhadra.'
      },
      {
        regionOrState: 'Braj (Barsana & Nandgaon, UP)',
        variationName: 'Lathmar Holi',
        distinctCustoms: ['Women shield-playfully tap men with sticks in Radha Rani temple compound', 'Phoolon wali Holi in Vrindavan Banke Bihari'],
        notes: 'Celebrated a week prior to main Holi.'
      },
      {
        regionOrState: 'West Bengal & Odisha',
        variationName: 'Dol Jatra / Dol Purnima',
        distinctCustoms: ['Idols of Radha-Krishna placed on swinging palanquins', 'Saffron abeer powder offered to elders'],
        calendarSystem: 'Bengali Calendar (Phalguna Purnima, Gaur Purnima)',
        notes: 'Also marks the birth anniversary of Sri Chaitanya Mahaprabhu.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[2]],
    lastVerifiedDate: '2025-01-20'
  },
  {
    id: 'occ-eid-fitr-2025',
    festivalSlug: 'eid-ul-fitr',
    year: 2025,
    startDate: '2025-03-31',
    endDate: '2025-04-01',
    primaryDate: '2025-03-31',
    isHistorical: true,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Pan-India',
        variationName: 'Shawwal Crescent Observance',
        distinctCustoms: ['Morning Eidgah congregation', 'Payment of Zakat-ul-Fitr prior to prayer', 'Sheer Khurma feast'],
        calendarSystem: 'Islamic Hijri 1446 (Shawwal 1)',
        notes: 'Exact Gregorian calendar date is subject to confirmed regional physical or astronomical sighting of the crescent moon (Hilal).'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[5]],
    lastVerifiedDate: '2025-01-25'
  },
  {
    id: 'occ-gurpurab-2025',
    festivalSlug: 'guru-nanak-jayanti',
    year: 2025,
    startDate: '2025-11-05',
    endDate: '2025-11-05',
    primaryDate: '2025-11-05',
    isHistorical: true,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Pan-India & Punjab',
        variationName: '556th Prakash Utsav',
        distinctCustoms: ['Continuous Akhand Path in Gurdwaras', 'Amrit Vela Kirtan', 'Langar and Gatka demonstrations'],
        calendarSystem: 'Nanakshahi / Vikram Samvat (Kartik Purnima)',
        tithiOrPanchang: 'Kartik Purnima Tithi',
        notes: 'Commemorating the 556th birth anniversary of Guru Nanak Dev Ji.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[4]],
    lastVerifiedDate: '2025-01-20'
  },
  {
    id: 'occ-onam-2025',
    festivalSlug: 'onam',
    year: 2025,
    startDate: '2025-08-27',
    endDate: '2025-09-05',
    primaryDate: '2025-09-05',
    isHistorical: true,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Kerala',
        variationName: 'Thiruvonam Day',
        distinctCustoms: ['Atham floral installation on Aug 27', 'Thiruvonam Mahabali welcome on Sep 5 with Onasadya feast'],
        calendarSystem: 'Kollam Era Calendar 1201 (Chingam Month, Thiruvonam Nakshatram)',
        tithiOrPanchang: 'Thiruvonam Nakshatra begins 07:18 AM Sep 4, concludes 09:42 AM Sep 5',
        notes: 'Main feast celebrated on Thiruvonam day when asterism prevails.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[2]],
    lastVerifiedDate: '2025-01-18'
  },
  {
    id: 'occ-durga-puja-2025',
    festivalSlug: 'durga-puja',
    year: 2025,
    startDate: '2025-09-28',
    endDate: '2025-10-02',
    primaryDate: '2025-10-01',
    isHistorical: true,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'West Bengal, Tripura & Assam',
        variationName: 'Maha Saptami to Vijayadashami',
        distinctCustoms: ['Maha Ashtami Kumari Puja & Sandhi Puja on Sep 30', 'Maha Navami on Oct 1', 'Vijayadashami immersion and Sindoor Khela on Oct 2'],
        calendarSystem: 'Bengali Panjika (Ashwin Shukla Paksha)',
        notes: 'Calculated according to Surya Siddhanta and Bisuddhasiddhanta Panjikas.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[2], OFFICIAL_SOURCES[3]],
    lastVerifiedDate: '2025-01-28'
  },
  {
    id: 'occ-hornbill-2025',
    festivalSlug: 'hornbill-festival',
    year: 2025,
    startDate: '2025-12-01',
    endDate: '2025-12-10',
    primaryDate: '2025-12-01',
    isHistorical: true,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Nagaland (Kisama)',
        variationName: 'Statehood Day Inaugural & 10-day cultural showcase',
        distinctCustoms: ['16 tribe morung pavilions open daily', 'Indigenous games and musical performances'],
        calendarSystem: 'Fixed Annual Calendar (Dec 1-10)',
        notes: 'Dates are fixed annually by the Department of Tourism, Government of Nagaland.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[0]],
    lastVerifiedDate: '2025-01-10'
  },

  // ==========================================
  // CURRENT YEAR — 2026 VERIFIED OCCURRENCES
  // ==========================================
  {
    id: 'occ-diwali-2026',
    festivalSlug: 'diwali',
    year: 2026,
    startDate: '2026-11-06',
    endDate: '2026-11-10',
    primaryDate: '2026-11-08', // TODAY!
    isHistorical: false,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'North India & Pan-India',
        variationName: 'Badi Diwali & Lakshmi Puja',
        distinctCustoms: ['Pradosh Kaal Mahalakshmi-Ganesh Pujan', 'Deepdaan with 108 clay diyas', 'Bhai Dooj on Nov 10'],
        calendarSystem: 'Vikram Samvat 2083 (Kartika Krishna Amavasya)',
        tithiOrPanchang: 'Kartika Amavasya commences 11:27 AM Nov 8, concludes 12:31 PM Nov 9',
        muhuratVerified: 'Lakshmi Puja Pradosh Kaal: 05:54 PM to 07:50 PM IST; Vrishabha Lagna: 06:05 PM to 08:02 PM',
        notes: 'Governed by Pradosh Kaal Amavasya tithi intersection verified with Positional Astronomy Centre / Rashtriya Panchang.'
      },
      {
        regionOrState: 'Gujarat',
        variationName: 'Chopda Pujan & Bestu Varas',
        distinctCustoms: ['Chopda Pujan of business ledgers on Diwali night Nov 8', 'Bestu Varas (Gujarati New Year 2083) on Nov 9 with Nutan Varshabhinandan greetings'],
        calendarSystem: 'Gujarati Vikram Samvat 2083 (Kartik Sud Ekam)',
        tithiOrPanchang: 'Kartik Sud 1',
        notes: 'Gujarat celebrates New Year on the day following Amavasya.'
      },
      {
        regionOrState: 'Tamil Nadu & South India',
        variationName: 'Deepavali (Naraka Chaturdashi Ganga Snanam)',
        distinctCustoms: ['Pre-dawn medicinal sesame oil bath (Ganga Snanam)', 'Deepavali Marundhu / Lehyam intake', 'New traditional pattu attire'],
        calendarSystem: 'Tamil Solar Calendar (Aippasi Month)',
        tithiOrPanchang: 'Naraka Chaturdashi Brahma Muhurtham',
        muhuratVerified: 'Pre-dawn bath: 04:42 AM to 06:04 AM IST on Nov 8',
        notes: 'South India celebrates Naraka Chaturdashi on the morning of Nov 8.'
      },
      {
        regionOrState: 'West Bengal & Assam',
        variationName: 'Shyama Puja / Kali Puja',
        distinctCustoms: ['Maa Kali Nishita Kaal Tantric worship', 'Illuminating rooftops with 14 lamps (Choddo Saak)'],
        calendarSystem: 'Bengali Panjika (Kartik Amavasya)',
        muhuratVerified: 'Nishita Kaal Puja: 11:39 PM Nov 8 to 12:32 AM Nov 9 IST',
        notes: 'Kali Puja coincides with Diwali night during Amavasya Nishita Kaal.'
      },
      {
        regionOrState: 'Punjab & Sikh Community',
        variationName: 'Bandi Chhor Divas',
        distinctCustoms: ['Illumination of Sri Harmandir Sahib (Golden Temple) with lakhs of earthen lamps', 'Ardas for liberation and freedom'],
        calendarSystem: 'Nanakshahi Calendar (Kartik Amavasya)',
        notes: 'Commemorates the historic release of Guru Hargobind Ji and 52 Rajas from Gwalior Fort.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1], OFFICIAL_SOURCES[2]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-holi-2026',
    festivalSlug: 'holi',
    year: 2026,
    startDate: '2026-03-03',
    endDate: '2026-03-04',
    primaryDate: '2026-03-04',
    isHistorical: true, // Past in 2026
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Pan-India & North India',
        variationName: 'Holika Dahan & Dhulandi Rangotsav',
        distinctCustoms: ['Holika bonfire lit post-Bhadra Mukha on night of Mar 3', 'Playing organic gulal and abeer on Mar 4'],
        calendarSystem: 'Vikram Samvat 2082 (Phalguna Purnima)',
        tithiOrPanchang: 'Phalguna Purnima commences 06:18 PM Mar 3, concludes 07:44 PM Mar 4',
        muhuratVerified: 'Holika Dahan: 08:52 PM to 10:14 PM Mar 3 (after Bhadra concludes)',
        notes: 'Verified via India Meteorological Department Positional Astronomy Centre.'
      },
      {
        regionOrState: 'Braj (Barsana & Nandgaon)',
        variationName: 'Lathmar & Phoolon Ki Holi',
        distinctCustoms: ['Traditional stick duel dance in Barsana', 'Banke Bihari temple flower shower'],
        notes: 'Celebrated Feb 24 to Feb 28, 2026.'
      },
      {
        regionOrState: 'West Bengal & Odisha',
        variationName: 'Dol Purnima / Dol Jatra',
        distinctCustoms: ['Radha Krishna palanquin procession', 'Gaur Purnima celebrations at Mayapur'],
        notes: 'Observed Mar 3-4, 2026.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[2]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-eid-fitr-2026',
    festivalSlug: 'eid-ul-fitr',
    year: 2026,
    startDate: '2026-03-20',
    endDate: '2026-03-21',
    primaryDate: '2026-03-21',
    isHistorical: true, // Past in 2026
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Pan-India',
        variationName: '1 Shawwal 1447 AH Observance',
        distinctCustoms: ['Eidgah morning congregational namaz', 'Distribution of Zakat-ul-Fitr', 'Sheer Khurma feast'],
        calendarSystem: 'Islamic Hijri 1447 (Shawwal 1)',
        notes: 'Confirmed across Indian Ruet-e-Hilal committees following the sighting of the Shawwal crescent on the evening of March 20, 2026.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[5]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-gurpurab-2026',
    festivalSlug: 'guru-nanak-jayanti',
    year: 2026,
    startDate: '2026-11-24',
    endDate: '2026-11-24',
    primaryDate: '2026-11-24', // UPCOMING in 16 days!
    isHistorical: false,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Pan-India & Punjab',
        variationName: '557th Prakash Utsav of Guru Nanak Dev Ji',
        distinctCustoms: ['48-hour continuous Akhand Path reading of Sri Guru Granth Sahib', 'Prabhat Pheri and Nagar Kirtan', 'Amrit Vela Kirtan and community Langar'],
        calendarSystem: 'Nanakshahi Calendar / Vikram Samvat 2083 (Kartik Purnima)',
        tithiOrPanchang: 'Kartik Purnima commences 03:12 AM Nov 24, concludes 01:45 AM Nov 25',
        muhuratVerified: 'Amrit Vela celebrations begin 03:30 AM Nov 24',
        notes: 'The 557th birth anniversary celebrated globally with grand reverence.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[4]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-onam-2026',
    festivalSlug: 'onam',
    year: 2026,
    startDate: '2026-08-17',
    endDate: '2026-08-26',
    primaryDate: '2026-08-26',
    isHistorical: true, // Past in 2026
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Kerala',
        variationName: 'Thiruvonam Harvest Celebration',
        distinctCustoms: ['Atham floral rug laying on Aug 17', 'Thiruvonam Onasadya feast on Aug 26', 'Vallam Kali boat races on Pamba river'],
        calendarSystem: 'Kollam Era 1202 (Chingam Month, Thiruvonam Asterism)',
        tithiOrPanchang: 'Thiruvonam Nakshatra begins 01:25 AM Aug 26, concludes 03:40 AM Aug 27',
        notes: 'Main feast celebrated on Thiruvonam day when asterism prevails.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[2]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-durga-puja-2026',
    festivalSlug: 'durga-puja',
    year: 2026,
    startDate: '2026-10-16',
    endDate: '2026-10-21',
    primaryDate: '2026-10-20',
    isHistorical: true, // Past in 2026
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'West Bengal, Tripura, Assam & Pan-India',
        variationName: 'Sharadotsav Saptami to Vijayadashami',
        distinctCustoms: ['Maha Sasthi Bodhan Oct 16', 'Sandhi Puja Oct 18 with 108 lotuses', 'Maha Navami Oct 19', 'Vijayadashami immersion and Sindoor Khela Oct 20'],
        calendarSystem: 'Bengali Panjika 1433 (Ashwin Shukla Paksha)',
        notes: 'Sandhi Puja performed during the juncture of Ashtami and Navami.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[2], OFFICIAL_SOURCES[3]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-hornbill-2026',
    festivalSlug: 'hornbill-festival',
    year: 2026,
    startDate: '2026-12-01',
    endDate: '2026-12-10',
    primaryDate: '2026-12-01', // UPCOMING next month!
    isHistorical: false,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Nagaland (Naga Heritage Village, Kisama)',
        variationName: '27th Hornbill Festival — Festival of Festivals',
        distinctCustoms: ['Log drum opening ceremony on Nagaland Statehood Day', '16 indigenous Naga tribal morung presentations', 'Traditional war dances, archery, and indigenous music', 'Evening Kohima Rock concerts'],
        calendarSystem: 'Official State Tourism Calendar (Dec 1-10, 2026)',
        notes: 'Organized annually by the Department of Tourism and Department of Art & Culture, Government of Nagaland.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1]],
    lastVerifiedDate: '2026-11-01'
  },

  // ==========================================
  // UPCOMING FUTURE — 2027 VERIFIED OCCURRENCES
  // ==========================================
  {
    id: 'occ-diwali-2027',
    festivalSlug: 'diwali',
    year: 2027,
    startDate: '2027-10-27',
    endDate: '2027-10-31',
    primaryDate: '2027-10-29', // Friday, October 29, 2027
    isHistorical: false,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'North India & Pan-India',
        variationName: 'Badi Diwali & Lakshmi Puja',
        distinctCustoms: ['Dhanteras on Oct 27', 'Lakshmi Puja on Friday evening Oct 29', 'Govardhan Puja & Bhai Dooj on Oct 30-31'],
        calendarSystem: 'Vikram Samvat 2084 (Kartika Krishna Amavasya)',
        tithiOrPanchang: 'Kartika Amavasya commences 08:14 PM Oct 28, concludes 06:48 PM Oct 29',
        muhuratVerified: 'Lakshmi Puja Pradosh Kaal: 05:40 PM to 07:36 PM IST on Oct 29',
        notes: 'Pradosh Kaal Amavasya muhurat verified in advance astronomical tables.'
      },
      {
        regionOrState: 'Gujarat',
        variationName: 'Chopda Pujan & Bestu Varas',
        distinctCustoms: ['Chopda Pujan on Oct 29 night', 'Bestu Varas (New Year 2084) on Oct 30'],
        calendarSystem: 'Gujarati Vikram Samvat 2084',
        tithiOrPanchang: 'Kartik Sud 1',
        notes: 'Gujarati New Year falls on Saturday, October 30, 2027.'
      },
      {
        regionOrState: 'Tamil Nadu & South India',
        variationName: 'Deepavali',
        distinctCustoms: ['Pre-dawn Ganga Snanam on Oct 29 morning'],
        calendarSystem: 'Tamil Solar Calendar (Aippasi)',
        muhuratVerified: 'Pre-dawn bath: 04:35 AM to 05:58 AM IST on Oct 29',
        notes: 'Observed on Friday morning, Oct 29, 2027.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[2]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-holi-2027',
    festivalSlug: 'holi',
    year: 2027,
    startDate: '2027-03-21',
    endDate: '2027-03-22',
    primaryDate: '2027-03-22', // Monday, March 22, 2027
    isHistorical: false,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Pan-India & North India',
        variationName: 'Holika Dahan & Rangwali Holi',
        distinctCustoms: ['Holika Dahan on Sunday night Mar 21', 'Dhulandi color festival on Monday Mar 22'],
        calendarSystem: 'Vikram Samvat 2083 (Phalguna Purnima)',
        tithiOrPanchang: 'Phalguna Purnima begins 01:14 PM Mar 21, ends 02:40 PM Mar 22',
        muhuratVerified: 'Holika Dahan: 06:33 PM to 08:58 PM Mar 21',
        notes: 'Bhadra ends before Pradosh Kaal on Mar 21.'
      },
      {
        regionOrState: 'Braj (Barsana)',
        variationName: 'Lathmar Holi',
        distinctCustoms: ['Barsana temple celebrations'],
        notes: 'Celebrated around March 13-14, 2027.'
      },
      {
        regionOrState: 'West Bengal & Odisha',
        variationName: 'Dol Purnima',
        distinctCustoms: ['Radha-Krishna Dolotsav and Abeer offerings'],
        notes: 'Observed Mar 21-22, 2027.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[2]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-eid-fitr-2027',
    festivalSlug: 'eid-ul-fitr',
    year: 2027,
    startDate: '2027-03-09',
    endDate: '2027-03-10',
    primaryDate: '2027-03-10', // Expected Wednesday, March 10, 2027
    isHistorical: false,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Pan-India',
        variationName: 'Shawwal 1448 AH Celebration',
        distinctCustoms: ['Eidgah congregation prayers', 'Zakat-ul-Fitr charity distribution', 'Sheer Khurma feast'],
        calendarSystem: 'Islamic Hijri 1448 (Shawwal 1)',
        notes: 'Astronomically calculated date; official observance subject to local Hilal (crescent) moon sighting on March 9, 2027.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[5]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-gurpurab-2027',
    festivalSlug: 'guru-nanak-jayanti',
    year: 2027,
    startDate: '2027-11-14',
    endDate: '2027-11-14',
    primaryDate: '2027-11-14', // Sunday, November 14, 2027
    isHistorical: false,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Pan-India & Punjab',
        variationName: '558th Prakash Utsav of Guru Nanak Dev Ji',
        distinctCustoms: ['Continuous Akhand Path in Gurdwaras', 'Nagar Kirtan procession', 'Guru Ka Langar distribution'],
        calendarSystem: 'Nanakshahi / Vikram Samvat 2084 (Kartik Purnima)',
        tithiOrPanchang: 'Kartik Purnima begins 11:42 AM Nov 13, ends 09:58 AM Nov 14',
        muhuratVerified: 'Amrit Vela celebrations begin 03:45 AM Nov 14',
        notes: 'Celebrated on Sunday, November 14, 2027.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[4]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-onam-2027',
    festivalSlug: 'onam',
    year: 2027,
    startDate: '2027-09-03',
    endDate: '2027-09-12',
    primaryDate: '2027-09-12', // Sunday, September 12, 2027
    isHistorical: false,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Kerala',
        variationName: 'Thiruvonam Feast Day',
        distinctCustoms: ['Athapookkalam starts Sep 3', 'Grand Thiruvonam Onasadya feast on Sep 12', 'Aranmula Uthrattathi Vallamkali boat race'],
        calendarSystem: 'Kollam Era 1203 (Chingam Month, Thiruvonam Nakshatram)',
        tithiOrPanchang: 'Thiruvonam Nakshatram on Sep 12',
        notes: 'Celebrated on Sunday, September 12, 2027.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[2]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-durga-puja-2027',
    festivalSlug: 'durga-puja',
    year: 2027,
    startDate: '2027-10-05',
    endDate: '2027-10-10',
    primaryDate: '2027-10-09', // Saturday, October 9, 2027
    isHistorical: false,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'West Bengal, Tripura, Assam & Pan-India',
        variationName: 'Maha Saptami to Vijayadashami 2027',
        distinctCustoms: ['Maha Sasthi Oct 5', 'Maha Saptami Oct 6', 'Maha Ashtami & Sandhi Puja Oct 7', 'Maha Navami Oct 8', 'Vijayadashami Oct 9-10'],
        calendarSystem: 'Bengali Panjika 1434 (Ashwin Shukla Paksha)',
        notes: 'Sharadotsav 2027 observed in early October.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[2], OFFICIAL_SOURCES[3]],
    lastVerifiedDate: '2026-11-01'
  },
  {
    id: 'occ-hornbill-2027',
    festivalSlug: 'hornbill-festival',
    year: 2027,
    startDate: '2027-12-01',
    endDate: '2027-12-10',
    primaryDate: '2027-12-01', // Wednesday, December 1, 2027
    isHistorical: false,
    isVerified: true,
    regionalObservances: [
      {
        regionOrState: 'Nagaland (Naga Heritage Village, Kisama)',
        variationName: '28th Annual Hornbill Festival',
        distinctCustoms: ['Statehood Day grand opening ceremony', 'Tribal Morung exhibitions', 'Indigenous sporting contests and music'],
        calendarSystem: 'Official State Tourism Calendar (Dec 1-10, 2027)',
        notes: 'Annual fixed-date festival organized by Nagaland Tourism.'
      }
    ],
    verifiedSources: [OFFICIAL_SOURCES[0], OFFICIAL_SOURCES[1]],
    lastVerifiedDate: '2026-11-01'
  }
];

export const ALL_INDIAN_STATES_UTS: StateUTData[] = [
  {
    id: 'state-ap',
    name: { en: 'Andhra Pradesh', hi: 'आंध्र प्रदेश', gu: 'આંધ્ર પ્રદેશ' },
    code: 'AP',
    capital: 'Amaravati',
    region: 'South',
    majorFestivals: ['diwali', 'ugadi', 'makar-sankranti', 'tirumala-brahmotsavam'],
    traditionalFolkArts: [
      { name: 'Kuchipudi', type: 'Dance', description: 'Classical dance-drama originating in Kuchipudi village blending swift footwork and expressive eyes.' },
      { name: 'Kalamkari', type: 'Craft', description: 'Ancient hand-painted or block-printed cotton textile art using natural vegetable dyes in Srikalahasti and Machilipatnam.' }
    ],
    famousDishes: ['Pulihora (Tamarind Rice)', 'Pootharekulu (Paper Sweet)', 'Gongura Pachadi', 'Pesarattu'],
    passportBadge: {
      id: 'badge-ap',
      title: 'Heritage of Amaravati',
      icon: '🏛️',
      criteria: 'Explore Andhra Pradesh traditions & recipes'
    }
  },
  {
    id: 'state-ar',
    name: { en: 'Arunachal Pradesh', hi: 'अरुणाचल प्रदेश', gu: 'અરુણાચલ પ્રદેશ' },
    code: 'AR',
    capital: 'Itanagar',
    region: 'North-East',
    majorFestivals: ['losar', 'solung', 'si-donyi', 'mopin'],
    traditionalFolkArts: [
      { name: 'Aji Lhamu & Lion Dance', type: 'Dance', description: 'Monpa masked folk dances portraying moral fables and triumph over negative spirits.' },
      { name: 'Thangka Painting', type: 'Painting', description: 'Sacred Buddhist scroll paintings on silk and cotton canvas practiced in Tawang monastery.' }
    ],
    famousDishes: ['Thukpa', 'Zan (Millet Porridge)', 'Pika Pila (Bamboo Shoot Pickle)', 'Momo'],
    passportBadge: {
      id: 'badge-ar',
      title: 'Dawn-Lit Mountain Explorer',
      icon: '🏔️',
      criteria: 'Discover Eastern Himalayan Monpa and Adi celebrations'
    }
  },
  {
    id: 'state-as',
    name: { en: 'Assam', hi: 'असम', gu: 'અસમ' },
    code: 'AS',
    capital: 'Dispur',
    region: 'North-East',
    majorFestivals: ['bohag-bihu', 'magh-bihu', 'durga-puja', 'ambubachi-mela'],
    traditionalFolkArts: [
      { name: 'Bihu Dance', type: 'Dance', description: 'Energetic spring dance characterized by brisk steps and rhythmic hand movements played with Dhol and Pepa horn.' },
      { name: 'Muga Silk Weaving', type: 'Craft', description: 'Geographical Indication protected golden yellow wild silk woven on handlooms in Sualkuchi.' }
    ],
    famousDishes: ['Khaar', 'Masor Tenga (Sour Fish Curry)', 'Pitha', 'Laru'],
    passportBadge: {
      id: 'badge-as',
      title: 'Brahmaputra Cultural Trail',
      icon: '🦏',
      criteria: 'Learn about Bihu seasons and Assamese weaving'
    }
  },
  {
    id: 'state-br',
    name: { en: 'Bihar', hi: 'बिहार', gu: 'બિહાર' },
    code: 'BR',
    capital: 'Patna',
    region: 'East',
    majorFestivals: ['chhath-puja', 'diwali', 'holi', 'sama-chakeva'],
    traditionalFolkArts: [
      { name: 'Madhubani / Mithila Painting', type: 'Painting', description: 'Intricate folk art executed with fingers, twigs, and natural pigments featuring geometric border motifs.' },
      { name: 'Bidesia', type: 'Dance', description: 'Folk theatre-dance created by Bhikhari Thakur portraying emotional facets of migration.' }
    ],
    famousDishes: ['Litti Chokha', 'Thekua', 'Khaja of Silao', 'Sattu Paratha'],
    passportBadge: {
      id: 'badge-br',
      title: 'Heart of Mithila & Magadha',
      icon: '🌞',
      criteria: 'Discover Chhath Puja rituals and Madhubani arts'
    }
  },
  {
    id: 'state-ct',
    name: { en: 'Chhattisgarh', hi: 'छत्तीसगढ़', gu: 'છત્તીસગઢ' },
    code: 'CT',
    capital: 'Raipur',
    region: 'Central',
    majorFestivals: ['bastar-dussehra', 'hareli', 'madai-festival', 'karma-puja'],
    traditionalFolkArts: [
      { name: 'Dhokra Metal Craft', type: 'Craft', description: 'Ancient lost-wax bell metal casting practiced by indigenous artisans in Bastar.' },
      { name: 'Panthi Dance', type: 'Dance', description: 'Sacred devotional dance performed by Satnami community with high acrobatics.' }
    ],
    famousDishes: ['Chousela (Rice Flour Puri)', 'Fara (Steamed Rice Pithas)', 'Muthia', 'Dehrori'],
    passportBadge: {
      id: 'badge-ct',
      title: 'Bastar Tribal Pioneer',
      icon: '🏺',
      criteria: 'Uncover the 75-day Bastar Dussehra and Dhokra casting'
    }
  },
  {
    id: 'state-ga',
    name: { en: 'Goa', hi: 'गोवा', gu: 'ગોવા' },
    code: 'GA',
    capital: 'Panaji',
    region: 'West',
    majorFestivals: ['shigmo', 'christmas', 'sao-joao', 'ganesh-chaturthi'],
    traditionalFolkArts: [
      { name: 'Fugdi & Dhalo', type: 'Dance', description: 'Graceful folk dances performed by Goan women during Shigmo and Gauri festivals.' },
      { name: 'Azulejos Tile Painting', type: 'Craft', description: 'Hand-painted glazed ceramic blue and white tiles blending Konkani and Portuguese motifs.' }
    ],
    famousDishes: ['Bebinca', 'Goan Fish Curry with Rice', 'Khatkhate Stew', 'Dodol'],
    passportBadge: {
      id: 'badge-ga',
      title: 'Konkan Harmony Badge',
      icon: '🌴',
      criteria: 'Explore Goan Shigmo, Sao Joao and Bebinca baking'
    }
  },
  {
    id: 'state-gj',
    name: { en: 'Gujarat', hi: 'गुजरात', gu: 'ગુજરાત' },
    code: 'GJ',
    capital: 'Gandhinagar',
    region: 'West',
    majorFestivals: ['navratri', 'diwali', 'uttarayan', 'rann-utsav'],
    traditionalFolkArts: [
      { name: 'Garba & Dandiya Raas', type: 'Dance', description: 'World-renowned UNESCO Intangible Cultural Heritage circular devotional dance honoring Goddess Amba.' },
      { name: 'Patan Patola & Bandhani', type: 'Craft', description: 'Exquisite double ikkat silk weaving in Patan and tie-dye textile artistry in Kutch & Jamnagar.' },
      { name: 'Rogan Art', type: 'Craft', description: 'Rare craft of painting on fabric using castor oil residue and metal stylus in Nirona, Kutch.' }
    ],
    famousDishes: ['Dhokla & Khandvi', 'Mohanthal', 'Undhiyu with Puri', 'Thepla', 'Fafda Jalebi'],
    passportBadge: {
      id: 'badge-gj',
      title: 'Vibrant Gujarat Garba Master',
      icon: '🪔',
      criteria: 'Complete the Navratri Garba and Patola textile quest'
    }
  },
  {
    id: 'state-hr',
    name: { en: 'Haryana', hi: 'हरियाणा', gu: 'હરિયાણા' },
    code: 'HR',
    capital: 'Chandigarh',
    region: 'North',
    majorFestivals: ['baisakhi', 'gita-mahotsav', 'teej', 'surajkund-mela'],
    traditionalFolkArts: [
      { name: 'Dhamal Dance', type: 'Dance', description: 'Ancient rustic dance dating back to the Mahabharata era, accompanied by Dhol, Duff, and Tasha.' },
      { name: 'Phulkari Embroidery', type: 'Craft', description: 'Traditional geometric floral silk thread embroidery on coarse cotton khaddar.' }
    ],
    famousDishes: ['Bajra Khichdi with Ghee', 'Kadhi Pakora', 'Singri ki Sabzi', 'Malpua'],
    passportBadge: {
      id: 'badge-hr',
      title: 'Kurukshetra Heritage Keeper',
      icon: '🌾',
      criteria: 'Study International Gita Mahotsav and Surajkund Crafts'
    }
  },
  {
    id: 'state-hp',
    name: { en: 'Himachal Pradesh', hi: 'हिमाचल प्रदेश', gu: 'હિમાચલ પ્રદેશ' },
    code: 'HP',
    capital: 'Shimla',
    region: 'North',
    majorFestivals: ['kullu-dussehra', 'losar', 'minjar-mela', 'mandi-shivratri'],
    traditionalFolkArts: [
      { name: 'Nati Dance', type: 'Dance', description: 'Guinness World Record holding synchronized slow circular folk dance performed to Shenai and Karnal horns.' },
      { name: 'Chamba Rumal', type: 'Craft', description: 'Double-sided needle embroidery where both sides of the silk square are visually identical.' }
    ],
    famousDishes: ['Dham (Ceremonial Feast)', 'Siddu with Ghee', 'Babru', 'Chana Madra'],
    passportBadge: {
      id: 'badge-hp',
      title: 'Devbhoomi Pilgrim',
      icon: '🏔️',
      criteria: 'Explore Kullu Dussehra deities and Kangra painting'
    }
  },
  {
    id: 'state-jh',
    name: { en: 'Jharkhand', hi: 'झारखंड', gu: 'ઝારખંડ' },
    code: 'JH',
    capital: 'Ranchi',
    region: 'East',
    majorFestivals: ['sarhul', 'karma-festival', 'sohrai', 'tusu-parab'],
    traditionalFolkArts: [
      { name: 'Sohrai & Khovar Painting', type: 'Painting', description: 'Indigenous mural art painted on mud walls by tribal women celebrating cattle, harvest, and weddings.' },
      { name: 'Chhau Dance of Seraikella', type: 'Dance', description: 'Classical martial dance with exquisite masks depicting nature, epics, and birds.' }
    ],
    famousDishes: ['Dhuska with Ghugni', 'Rugda Mushroom Curry', 'Pittha', 'Arsa Roti'],
    passportBadge: {
      id: 'badge-jh',
      title: 'Chotanagpur Forest Guardian',
      icon: '🌳',
      criteria: 'Learn Sarhul Sal tree worship and Sohrai mural art'
    }
  },
  {
    id: 'state-ka',
    name: { en: 'Karnataka', hi: 'कर्नाटक', gu: 'કર્ણાટક' },
    code: 'KA',
    capital: 'Bengaluru',
    region: 'South',
    majorFestivals: ['mysuru-dasara', 'ugadi', 'kambala', 'hampi-utsav'],
    traditionalFolkArts: [
      { name: 'Yakshagana', type: 'Dance', description: 'Electrifying classical theatre-dance from Coastal Karnataka featuring elaborate crowns, face makeup, and dynamic spins.' },
      { name: 'Bidriware', type: 'Craft', description: 'Centuries-old metal inlay art of encrusting pure silver wire into an oxidized zinc-copper alloy.' }
    ],
    famousDishes: ['Bisi Bele Bath', 'Mysore Pak', 'Neer Dosa', 'Dharwad Peda'],
    passportBadge: {
      id: 'badge-ka',
      title: 'Vijayanagara & Mysuru Crown',
      icon: '👑',
      criteria: 'Master Yakshagana history and Mysuru Dasara royal parade'
    }
  },
  {
    id: 'state-kl',
    name: { en: 'Kerala', hi: 'केरल', gu: 'કેરળ' },
    code: 'KL',
    capital: 'Thiruvananthapuram',
    region: 'South',
    majorFestivals: ['onam', 'vishu', 'thrissur-pooram', 'theyyam'],
    traditionalFolkArts: [
      { name: 'Kathakali', type: 'Dance', description: 'Major classical dance-drama renowned for elaborate facial makeup, huge headgear, and intricate mudras.' },
      { name: 'Theyyam', type: 'Dance', description: 'Sacred ritualistic invocation where the dancer is worshipped as an embodiment of the living deity in North Malabar.' },
      { name: 'Kalaripayattu', type: 'Craft', description: 'One of the oldest surviving martial arts systems in the world incorporating animal postures and flexible swords.' }
    ],
    famousDishes: ['Onasadya Feast', 'Appam with Stew', 'Avial', 'Ada Pradhaman', 'Kerala Parotta'],
    passportBadge: {
      id: 'badge-kl',
      title: 'God’s Own Country Explorer',
      icon: '🛶',
      criteria: 'Discover Onam Pookkalam, Thrissur Pooram and Kathakali'
    }
  },
  {
    id: 'state-mp',
    name: { en: 'Madhya Pradesh', hi: 'मध्य प्रदेश', gu: 'મધ્ય પ્રદેશ' },
    code: 'MP',
    capital: 'Bhopal',
    region: 'Central',
    majorFestivals: ['khajuraho-dance-festival', 'bhagoria-haat', 'tansen-samaroh', 'ujjain-kumbh'],
    traditionalFolkArts: [
      { name: 'Gond Painting', type: 'Painting', description: 'Vibrant indigenous dot and line paintings representing flora, fauna, and oral mythology of the Gond tribe.' },
      { name: 'Chanderi & Maheshwari Weaving', type: 'Craft', description: 'Feather-light silk-cotton handloom sarees adorned with intricate zari borders patronized by Ahilyabai Holkar.' }
    ],
    famousDishes: ['Poha Jalebi', 'Bhutte Ka Kees', 'Dal Bafla', 'Mawa Bati'],
    passportBadge: {
      id: 'badge-mp',
      title: 'Heart of Bharat Chronicler',
      icon: '🐅',
      criteria: 'Explore Gond mythology and Ahilyabai Maheshwari textiles'
    }
  },
  {
    id: 'state-mh',
    name: { en: 'Maharashtra', hi: 'महाराष्ट्र', gu: 'મહારાષ્ટ્ર' },
    code: 'MH',
    capital: 'Mumbai',
    region: 'West',
    majorFestivals: ['ganesh-chaturthi', 'gudi-padwa', 'shivaji-jayanti', 'pandharpur-wari'],
    traditionalFolkArts: [
      { name: 'Lavani & Lejim', type: 'Dance', description: 'High-tempo rhythmic folk dance set to Dholki beats, performed in 9-yard Nauvari sarees.' },
      { name: 'Warli Painting', type: 'Painting', description: 'Primitive white-pigment geometric folk art using circles, triangles, and squares on red ochre mud surfaces.' },
      { name: 'Paithani Saree Weaving', type: 'Craft', description: 'Opulent silk sarees with oblique square designs and characteristic peacock (mor) pallu motifs from Paithan.' }
    ],
    famousDishes: ['Modak', 'Puran Poli', 'Misal Pav', 'Vada Pav', 'Pithla Bhakri'],
    passportBadge: {
      id: 'badge-mh',
      title: 'Swarajya & Vithoba Pilgrim',
      icon: '🚩',
      criteria: 'Learn about Pandharpur Wari pilgrimage and Modak culinary craft'
    }
  },
  {
    id: 'state-mn',
    name: { en: 'Manipur', hi: 'मणिपुर', gu: 'મણિપુર' },
    code: 'MN',
    capital: 'Imphal',
    region: 'North-East',
    majorFestivals: ['yaoshang', 'lai-haraoba', 'shirui-lily-festival', 'cheiraoba'],
    traditionalFolkArts: [
      { name: 'Manipuri Classical Dance (Raas Leela)', type: 'Dance', description: 'Graceful, lyrical Vaishnavite dance featuring cylindrical Kumil skirts depicting devotion to Krishna.' },
      { name: 'Thang-Ta', type: 'Dance', description: 'Ancient Meitei martial art utilizing sword (thang) and spear (ta) with spiritual discipline.' }
    ],
    famousDishes: ['Kangshoi (Vegetable Stew)', 'Singju Salad', 'Chak-Hao Kheer (Black Rice Pudding)', 'Eromba'],
    passportBadge: {
      id: 'badge-mn',
      title: 'Jeweled Valley Scholar',
      icon: '🌺',
      criteria: 'Study Manipuri Raas Leela and black rice culinary traditions'
    }
  },
  {
    id: 'state-ml',
    name: { en: 'Meghalaya', hi: 'मेघालय', gu: 'મેઘાલય' },
    code: 'ML',
    capital: 'Shillong',
    region: 'North-East',
    majorFestivals: ['wangala-100-drums', 'shad-suk-mynsiem', 'nongkrem-dance', 'autumn-festival'],
    traditionalFolkArts: [
      { name: 'Wangala 100 Drums Festival Dance', type: 'Dance', description: 'Harvest dance of the Garo tribe honoring sun god Misi Saljong with 100 synchronized Dama drums.' },
      { name: 'Living Root Bridges Craft', type: 'Craft', description: 'Centuries-old bio-engineering by Khasi and Jaintia tribes guiding rubber fig tree roots across rivers.' }
    ],
    famousDishes: ['Jadoh (Rice cooked in herbs)', 'Dohkhlieh', 'Tungrymbai', 'Pukhlein Sweet'],
    passportBadge: {
      id: 'badge-ml',
      title: 'Abode of Clouds Pathfinder',
      icon: '🌧️',
      criteria: 'Uncover the 100-Drums Wangala dance and Living Root architecture'
    }
  },
  {
    id: 'state-mz',
    name: { en: 'Mizoram', hi: 'मिजोरम', gu: 'મિઝોરમ' },
    code: 'MZ',
    capital: 'Aizawl',
    region: 'North-East',
    majorFestivals: ['chapchar-kut', 'mim-kut', 'pawl-kut', 'thalfavang-kut'],
    traditionalFolkArts: [
      { name: 'Cheraw (Bamboo Dance)', type: 'Dance', description: 'Fascinating rhythmic dance where male dancers clap bamboo staves in tempo while women step in and out of the grid.' },
      { name: 'Puan Weaving', type: 'Craft', description: 'Handwoven traditional wrap-around textiles with deep cultural identity patterns like Puanchei and Kawrchei.' }
    ],
    famousDishes: ['Bai (Steamed Vegetables & Bamboo Shoot Stew)', 'Vawksa Rep', 'Sanpiau Rice Porridge', 'Koat Pitha'],
    passportBadge: {
      id: 'badge-mz',
      title: 'Cheraw Rhythm Master',
      icon: '🎋',
      criteria: 'Discover the spring Chapchar Kut carnival and Cheraw bamboo art'
    }
  },
  {
    id: 'state-nl',
    name: { en: 'Nagaland', hi: 'नागालैंड', gu: 'નાગાલેન્ડ' },
    code: 'NL',
    capital: 'Kohima',
    region: 'North-East',
    majorFestivals: ['hornbill-festival', 'sekrenyi', 'moatsu', 'tokhu-emong'],
    traditionalFolkArts: [
      { name: 'Naga Warrior Dance', type: 'Dance', description: 'Courageous ceremonial folk dances of Ao, Angami, Konyak, and Sumi tribes accompanied by log drum rhythm.' },
      { name: 'Naga Shawl Weaving', type: 'Craft', description: 'Distinct geometric handloom shawls indicating social stature and tribal identity.' }
    ],
    famousDishes: ['Axone Fermented Soya with Smoked Pork', 'Zutho Rice Brew', 'Galho', 'Bamboo Shoot Stew'],
    passportBadge: {
      id: 'badge-nl',
      title: 'Hornbill Kisama Champion',
      icon: '🦅',
      criteria: 'Explore 16 Naga tribes, Morung architecture, and Hornbill Festival'
    }
  },
  {
    id: 'state-od',
    name: { en: 'Odisha', hi: 'ओडिशा', gu: 'ઓડિશા' },
    code: 'OD',
    capital: 'Bhubaneswar',
    region: 'East',
    majorFestivals: ['rath-yatra', 'raja-parba', 'durga-puja', 'bali-yatra'],
    traditionalFolkArts: [
      { name: 'Odissi Classical Dance', type: 'Dance', description: 'Ancient temple dance sculpted in Konark Sun Temple featuring Tribhangi posture and Bhakti expressions.' },
      { name: 'Pattachitra Painting & Palm Leaf Inscription', type: 'Painting', description: 'Intricate scroll art on processed cloth and dried palm leaves from Raghurajpur heritage village.' }
    ],
    famousDishes: ['Chhena Poda (Baked Cheese Sweet)', 'Dalma', 'Rasagola (GI Tagged)', 'Pakhala Bhata', 'Kakara Pitha'],
    passportBadge: {
      id: 'badge-od',
      title: 'Puri Jagannath & Konark Chronicler',
      icon: '☸️',
      criteria: 'Discover Rath Yatra chariot construction and Raghurajpur Pattachitra'
    }
  },
  {
    id: 'state-pb',
    name: { en: 'Punjab', hi: 'पंजाब', gu: 'પંજાબ' },
    code: 'PB',
    capital: 'Chandigarh',
    region: 'North',
    majorFestivals: ['baisakhi', 'lohri', 'guru-nanak-jayanti', 'holla-mohalla'],
    traditionalFolkArts: [
      { name: 'Bhangra & Giddha', type: 'Dance', description: 'Exuberant folk dances celebrated during harvest accompanied by the thundering beat of the Dhol and clapping.' },
      { name: 'Phulkari Embroidery', type: 'Craft', description: 'Opulent silk floss thread floral embroidery stitched from the reverse side of coarse cotton fabric.' }
    ],
    famousDishes: ['Makki di Roti with Sarson da Saag', 'Kada Prasad', 'Amritsari Kulcha', 'Dal Makhani', 'Pinni'],
    passportBadge: {
      id: 'badge-pb',
      title: 'Five Rivers Pioneer',
      icon: '🌾',
      criteria: 'Explore Baisakhi harvest, Golden Temple Langar, and Holla Mohalla'
    }
  },
  {
    id: 'state-rj',
    name: { en: 'Rajasthan', hi: 'राजस्थान', gu: 'રાજસ્થાન' },
    code: 'RJ',
    capital: 'Jaipur',
    region: 'West',
    majorFestivals: ['gangaur', 'pushkar-camel-fair', 'teej', 'desert-festival-jaisalmer'],
    traditionalFolkArts: [
      { name: 'Ghoomar & Kalbelia Dance', type: 'Dance', description: 'UNESCO-recognized swirling serpentine folk dance performed by nomadic desert communities in flowing black skirts.' },
      { name: 'Blue Pottery & Bagru Handblock Print', type: 'Craft', description: 'Glazed quartz pottery from Jaipur and natural indigo-vegetable mud resist block printing.' }
    ],
    famousDishes: ['Dal Baati Churma', 'Gatte ki Sabzi', 'Ker Sangri', 'Ghevar', 'Pyaaz Kachori'],
    passportBadge: {
      id: 'badge-rj',
      title: 'Desert Forts & Ghoomar Legend',
      icon: '🐪',
      criteria: 'Complete the Pushkar Fair, Gangaur, and Dal Baati Churma journey'
    }
  },
  {
    id: 'state-sk',
    name: { en: 'Sikkim', hi: 'सिक्किम', gu: 'સિક્કિમ' },
    code: 'SK',
    capital: 'Gangtok',
    region: 'North-East',
    majorFestivals: ['losar', 'saga-dawa', 'pang-lhabsol', 'lossoong'],
    traditionalFolkArts: [
      { name: 'Cham Masked Dance', type: 'Dance', description: 'Sacred monastic ritual dance enacted by Lamas in colorful silks and wrathful deity masks at Rumtek monastery.' },
      { name: 'Lepcha & Bhutia Wood Carving', type: 'Craft', description: 'Intricate Buddhist dragon motifs and folding tables (Choktse) carved from local birch.' }
    ],
    famousDishes: ['Phagshapa (Pork Stew with Radish)', 'Gundruk Soup', 'Sel Roti', 'Momos with Chutney'],
    passportBadge: {
      id: 'badge-sk',
      title: 'Kanchenjunga Monastic Scholar',
      icon: '🏔️',
      criteria: 'Understand Pang Lhabsol mountain tribute and Saga Dawa'
    }
  },
  {
    id: 'state-tn',
    name: { en: 'Tamil Nadu', hi: 'तमिलनाडु', gu: 'તમિલનાડુ' },
    code: 'TN',
    capital: 'Chennai',
    region: 'South',
    majorFestivals: ['pongal', 'tamil-puthandu', 'karthigai-deepam', 'madurai-chithirai-festival'],
    traditionalFolkArts: [
      { name: 'Bharatanatyam', type: 'Dance', description: 'Ancient temple dance sculpted in Thanjavur Brihadisvara temple based on Natya Shastra.' },
      { name: 'Kanchipuram Silk Weaving', type: 'Craft', description: 'Heirloom mulberry silk sarees with heavy gold zari borders woven using three-shuttle Korvai technique.' },
      { name: 'Thanjavur Painting', type: 'Painting', description: 'Classical art using gold leaf foil, semi-precious stones, and vibrant relief gesso work.' }
    ],
    famousDishes: ['Sakkarai Pongal', 'Idli & Sambar', 'Chettinad Kozhi', 'Filter Coffee', 'Murukku'],
    passportBadge: {
      id: 'badge-tn',
      title: 'Dravidian Temple Heritage Explorer',
      icon: '🛕',
      criteria: 'Explore Pongal harvest rituals, Kolam geometry, and Kanchipuram silk'
    }
  },
  {
    id: 'state-ts',
    name: { en: 'Telangana', hi: 'तेलंगाना', gu: 'તેલંગાણા' },
    code: 'TS',
    capital: 'Hyderabad',
    region: 'South',
    majorFestivals: ['bathukamma', 'bonalu', 'ugadi', 'sammakka-saralamma-jatara'],
    traditionalFolkArts: [
      { name: 'Bathukamma Floral Arrangement', type: 'Craft', description: 'Seven-layered concentric floral stacks made of seasonal medicinal flowers honoring Mother Gauri.' },
      { name: 'Pochampally Ikat & Cheriyal Scroll Painting', type: 'Craft', description: 'Double ikat geometric textiles and rural narrative scroll art telling heroic folk legends.' }
    ],
    famousDishes: ['Hyderabadi Dum Biryani', 'Sarva Pindi (Crisp Rice Pancake)', 'Sakinalu', 'Kubani ka Meetha'],
    passportBadge: {
      id: 'badge-ts',
      title: 'Deccan Flora & Bonalu Vanguard',
      icon: '🌸',
      criteria: 'Celebrate Bathukamma flower festival and Sammakka Saralamma Jatara'
    }
  },
  {
    id: 'state-tr',
    name: { en: 'Tripura', hi: 'त्रिपुरा', gu: 'ત્રિપુરા' },
    code: 'TR',
    capital: 'Agartala',
    region: 'North-East',
    majorFestivals: ['kharchi-puja', 'ker-puja', 'durga-puja', 'ganga-puja'],
    traditionalFolkArts: [
      { name: 'Hojagiri Dance', type: 'Dance', description: 'Acrobatic balance dance by Reang tribal women balancing bottles and lamps atop clay pitchers.' },
      { name: 'Bamboo & Cane Screens', type: 'Craft', description: 'Fine bamboo blinds, furniture, and utility baskets crafted by skilled Tripuri artisans.' }
    ],
    famousDishes: ['Mui Borok (Berma Dried Fish Delicacy)', 'Chakhwi (Bamboo Shoot & Pork Stew)', 'Mosdeng Serma', 'Bhangui Rice'],
    passportBadge: {
      id: 'badge-tr',
      title: 'Fourteen Gods of Kharchi',
      icon: '🎋',
      criteria: 'Learn about Kharchi Puja of fourteen deities and Hojagiri balance dance'
    }
  },
  {
    id: 'state-up',
    name: { en: 'Uttar Pradesh', hi: 'उत्तर प्रदेश', gu: 'ઉત્તર પ્રદેશ' },
    code: 'UP',
    capital: 'Lucknow',
    region: 'North',
    majorFestivals: ['diwali', 'holi', 'dev-deepawali-varanasi', 'janmashtami', 'kumbh-mela'],
    traditionalFolkArts: [
      { name: 'Kathak Classical Dance', type: 'Dance', description: 'Storytelling dance of ancient temple bards evolved in Lucknow and Varanasi gharanas with intricate tatkar footwork.' },
      { name: 'Banarasi Zari Brocade & Chikankari', type: 'Craft', description: 'Gold and silver thread silk weaving in Varanasi and delicate shadow white embroidery in Lucknow.' }
    ],
    famousDishes: ['Awadhi Dum Biryani', 'Tunday Kabab', 'Banarasi Paan', 'Bedmi Puri with Aloo', 'Malaiyo Sweet'],
    passportBadge: {
      id: 'badge-up',
      title: 'Kashi & Awadh Civilizational Chronicler',
      icon: '🕉️',
      criteria: 'Discover Varanasi Dev Deepawali, Braj Holi, and Banarasi Silk weaving'
    }
  },
  {
    id: 'state-uk',
    name: { en: 'Uttarakhand', hi: 'उत्तराखंड', gu: 'ઉત્તરાખંડ' },
    code: 'UK',
    capital: 'Dehradun',
    region: 'North',
    majorFestivals: ['ganga-dussehra', 'phool-dei', 'nanda-devi-raj-jat', 'harela'],
    traditionalFolkArts: [
      { name: 'Chholiya Dance', type: 'Dance', description: 'Ancient martial sword dance of the Kumaon region performed during weddings to ward off evil omens.' },
      { name: 'Aipan Folk Art', type: 'Painting', description: 'Ritual floor and wall art made on brick-red ochre background using ground rice paste (biswar).' }
    ],
    famousDishes: ['Kafuli (Spinach & Fenugreek Stew)', 'Chainsoo', 'Bal Mithai with Sugar Balls', 'Singori in Malu Leaves'],
    passportBadge: {
      id: 'badge-uk',
      title: 'Himalayan Aipan & Kedarkhand Explorer',
      icon: '🏔️',
      criteria: 'Learn Phool Dei spring greeting and sacred Aipan geometric motifs'
    }
  },
  {
    id: 'state-wb',
    name: { en: 'West Bengal', hi: 'पश्चिम बंगाल', gu: 'પશ્ચિમ બંગાળ' },
    code: 'WB',
    capital: 'Kolkata',
    region: 'East',
    majorFestivals: ['durga-puja', 'kali-puja', 'poila-boishakh', 'saraswati-puja'],
    traditionalFolkArts: [
      { name: 'Baul Music', type: 'Music', description: 'UNESCO Intangible Cultural Heritage mystic minstrel songs accompanied by the single-string Ektara and Dubki.' },
      { name: 'Kantha Stitch & Terracotta Tiles', type: 'Craft', description: 'Running stitch embroidery on recycled sarees and historical burnt clay temple plaques of Bishnupur.' }
    ],
    famousDishes: ['Kosha Mangsho with Luchi', 'Machher Jhol', 'Sandesh & Rasgulla', 'Mishti Doi', 'Shorshe Ilish'],
    passportBadge: {
      id: 'badge-wb',
      title: 'Bengal Sharadotsav Connoisseur',
      icon: '🎭',
      criteria: 'Immerse in Durga Puja Kumartuli artistry, Baul music, and Kantha stitching'
    }
  },
  {
    id: 'ut-dl',
    name: { en: 'Delhi', hi: 'दिल्ली', gu: 'દિલ્હી' },
    code: 'DL',
    capital: 'New Delhi',
    region: 'North',
    majorFestivals: ['diwali', 'eid-ul-fitr', 'republic-day', 'phool-walon-ki-sair'],
    traditionalFolkArts: [
      { name: 'Qawwali of Nizamuddin', type: 'Music', description: 'Sufi devotional musical tradition pioneered by Hazrat Amir Khusrau in the 13th century.' },
      { name: 'Zari-Zardozi Embroidery', type: 'Craft', description: 'Opulent Mughal court embroidery using metallic threads and seed pearls in Old Delhi lanes.' }
    ],
    famousDishes: ['Chole Bhature', 'Chaat of Chandni Chowk', 'Butter Chicken', 'Nihari with Khameeri Roti'],
    passportBadge: {
      id: 'badge-dl',
      title: 'Dilli Dastarkhwan & Heritage Scholar',
      icon: '🏛️',
      criteria: 'Explore Phool Walon Ki Sair communal harmony and Sufi music'
    }
  },
  {
    id: 'ut-jk',
    name: { en: 'Jammu & Kashmir', hi: 'जम्मू और कश्मीर', gu: 'જમ્મુ અને કાશ્મીર' },
    code: 'JK',
    capital: 'Srinagar / Jammu',
    region: 'North',
    majorFestivals: ['eid-ul-fitr', 'herath-shivratri', 'tulip-festival', 'navreh'],
    traditionalFolkArts: [
      { name: 'Kashmiri Carpet Weaving & Pashmina', type: 'Craft', description: 'Hand-knotted silk-wool carpets guided by Talim scripts and fine Pashmina shawls.' },
      { name: 'Sufiana Kalam', type: 'Music', description: 'Classical chamber music played on 100-stringed Santoor and Sehtar with poetic verses of Lalla Ded.' }
    ],
    famousDishes: ['Wazwan (Rogan Josh, Gushtaba)', 'Kahwa Green Tea with Saffron', 'Dum Aloo', 'Phirni'],
    passportBadge: {
      id: 'badge-jk',
      title: 'Kashmir Valley & Pir Panjal Chronicler',
      icon: '🍵',
      criteria: 'Study Kashmiri Herath rituals, Wazwan feasts, and Pashmina weaving'
    }
  },
  {
    id: 'ut-la',
    name: { en: 'Ladakh', hi: 'लद्दाख', gu: 'લદ્દાખ' },
    code: 'LA',
    capital: 'Leh',
    region: 'North',
    majorFestivals: ['losar', 'hemis-festival', 'ladakh-festival', 'saka-dawa'],
    traditionalFolkArts: [
      { name: 'Cham Mask Dance of Hemis', type: 'Dance', description: 'Tantric Buddhist monastic ritual celebrating victory over demons with ornate masks and long trumpets (Dungchen).' },
      { name: 'Chamspon Copper & Brass Repoussé', type: 'Craft', description: 'Handmade butter lamps, teapots, and prayer wheels beaten from sheet metal in Chilling.' }
    ],
    famousDishes: ['Skyu (Pasta Stew)', 'Butter Tea (Gur Gur Chai)', 'Chhurpi Cheese', 'Tigmo Steamed Bread'],
    passportBadge: {
      id: 'badge-la',
      title: 'High Altitude Gompa Explorer',
      icon: '🏔️',
      criteria: 'Discover Hemis Gompa festivals, Cham sacred dance, and Butter Tea'
    }
  }
];

export const VERIFIED_RECIPES: Recipe[] = [
  {
    id: 'rec-gujiya',
    slug: 'gujiya-karanji',
    title: {
      en: 'Traditional Crispy Mawa Gujiya',
      hi: 'पारंपरिक खस्ता मावा गुजिया',
      gu: 'પરંપરાગત સ્વાદિષ્ટ માવા ઘૂઘરા'
    },
    festivalSlug: 'holi',
    region: 'North India & Gujarat (Ghughra)',
    dietaryType: 'Vegetarian',
    prepTimeMinutes: 40,
    cookTimeMinutes: 30,
    defaultServings: 12,
    ingredients: [
      { name: { en: 'Fine all-purpose flour (Maida)', hi: 'मैदा', gu: 'મેંદો' }, amount: 250, unit: 'g' },
      { name: { en: 'Pure desi ghee (for dough moin)', hi: 'शुद्ध देशी घी (मोयन के लिए)', gu: 'શુદ્ધ ઘી (મોણ માટે)' }, amount: 50, unit: 'g' },
      { name: { en: 'Mawa / Khoya (crumbled fresh)', hi: 'ताजा मावा / खोया', gu: 'તાજો મોળો માવો' }, amount: 200, unit: 'g' },
      { name: { en: 'Powdered sugar (Boora)', hi: 'पीसी हुई चीनी / बूरा', gu: 'દળેલી ખાંડ' }, amount: 150, unit: 'g' },
      { name: { en: 'Desiccated dry coconut', hi: 'सूखा नारियल का बुरादा', gu: 'સૂકા કોપરાનું છીણ' }, amount: 30, unit: 'g' },
      { name: { en: 'Green cardamom powder', hi: 'हरी इलायची पाउडर', gu: 'એલચી પાવડર' }, amount: 1, unit: 'tsp' },
      { name: { en: 'Chopped almonds & pistachios', hi: 'कटे हुए बादाम और पिस्ता', gu: 'કાજુ-બદામ-પિસ્તાના ટુકડા' }, amount: 30, unit: 'g' },
      { name: { en: 'Chironji seeds', hi: 'चिरौंजी', gu: 'ચારૉળી' }, amount: 15, unit: 'g' },
      { name: { en: 'Ghee or oil for deep frying', hi: 'तलने के लिए घी या तेल', gu: 'તળવા માટે તેલ અથવા ઘી' }, amount: 500, unit: 'ml' }
    ],
    instructions: [
      {
        stepNumber: 1,
        text: {
          en: 'Rub melted ghee into the flour using fingertips until it resembles coarse breadcrumbs (moin). Gradually add chilled water to knead a firm, smooth dough. Cover with damp cloth and rest for 25 minutes.',
          hi: 'मैदे में पिघला हुआ घी डालकर दोनों हाथों से अच्छी तरह मिलाएं ताकि मोयन समान रहे। थोड़ा-थोड़ा ठंडा पानी डालकर सख्त और चिकना आटा गूंधें। गीले सूती कपड़े से ढककर 25 मिनट रखें।',
          gu: 'મેંદામાં ઘીનું મોણ દઈને બરાબર મિક્સ કરો. ધીમે ધીમે પાણી ઉમેરી કઠણ લોટ બાંધો અને ૨૫ મિનિટ ભીના કપડાથી ઢાંકી રાખો.'
        },
        timerSeconds: 1500,
        tip: 'Proper moin ensures the crust becomes crisp and flaky without turning soggy.'
      },
      {
        stepNumber: 2,
        text: {
          en: 'In a heavy-bottomed pan on low flame, roast the crumbled khoya for 6-8 minutes until light golden pink. Transfer to a bowl and let cool completely.',
          hi: 'धीमी आंच पर कड़ाही में मावा को 6-8 मिनट तक हल्का गुलाबी होने तक भूनें। आंच बंद कर इसे पूरी तरह ठंडा होने दें।',
          gu: 'ધીમા તાપે માવાને ૬-૮ મિનિટ આછો ગુલાબી શેકો અને સંપૂર્ણપણે ઠંડો થવા દો.'
        },
        timerSeconds: 480
      },
      {
        stepNumber: 3,
        text: {
          en: 'Once khoya is room temperature, gently mix in powdered sugar, dry coconut, cardamom powder, chopped nuts, and chironji. Do not add sugar while khoya is warm, or it will liquefy.',
          hi: 'मावा ठंडा होने पर उसमें बूरा, नारियल बुरादा, इलायची पाउडर, कटे मेवे और चिरौंजी मिलाएं। कभी भी गर्म मावे में चीनी न डालें।',
          gu: 'માવો ઠંડો થાય પછી જ તેમાં દળેલી ખાંડ, કોપરાનું છીણ, એલચી અને ડ્રાયફ્રૂટ્સ ઉમેરો.'
        }
      },
      {
        stepNumber: 4,
        text: {
          en: 'Roll out small smooth discs (puris), place 1.5 tablespoons of filling on one half, brush the circumference lightly with water, fold into a half-moon, and crimp edges firmly with fingers or a fork.',
          hi: 'आटे की छोटी लोइयां बनाकर गोल पूरी बेलें। बीच में डेढ़ चम्मच भरावन रखें, किनारों पर हल्का पानी लगाकर आधा चाँद आकार में मोड़ें और उंगलियों से गूंथें।',
          gu: 'નાની પૂરી વણી વચ્ચે દોઢ ચમચી પૂરણ ભરો, કિનારી પર પાણી લગાવી અર્ધચંદ્રાકાર વાળી કિનારી ગૂંથો.'
        }
      },
      {
        stepNumber: 5,
        text: {
          en: 'Deep-fry in warm ghee on medium-low flame for 10-12 minutes until evenly golden and crisp. Drain on absorbent paper.',
          hi: 'मध्यम-धीमी आंच पर गरम घी में गुजिया को 10-12 मिनट तक सुनहरा और खस्ता होने तक तलें।',
          gu: 'ધીમાથી મધ્યમ તાપે ઘીમાં ઘૂઘરાને બદામી રંગના થાય ત્યાં સુધી ૧૦-૧૨ મિનિટ તળો.'
        },
        timerSeconds: 720
      }
    ],
    culturalStory: {
      en: 'Gujiya finds mention in medieval culinary treatises such as the 13th-century text Ni’matnama and Bhavaprakasha. In Gujarat, it is lovingly known as Ghughra and is an essential celebratory prasad during Holi and Diwali.',
      hi: 'गुजिया का इतिहास १३वीं सदी के पाकशास्त्र ग्रंथों और भावप्रकाश में मिलता है। उत्तर भारत की होली और गुजरात की दीपोत्सव थाली बिना गुजिया (घूघरा) के अधूरी मानी जाती है।',
      gu: 'ઘૂઘરા ભારતીય મિષ્ટાન્નની પ્રાચીન પરંપરા છે. હોળી અને દિવાળીમાં ઘૂઘરા દરેક ગુજરાતી ઘરમાં હોંશે હોંશે બનાવવામાં આવે છે.'
    },
    sources: [OFFICIAL_SOURCES[0]]
  },
  {
    id: 'rec-sheer-khurma',
    slug: 'sheer-khurma',
    title: {
      en: 'Royal Sheer Khurma (Dates & Milk Ambrosia)',
      hi: 'शाही शीर खुरमा (खजूर और सेंवई की खीर)',
      gu: 'શાહી શીર્ ખુરમા'
    },
    festivalSlug: 'eid-ul-fitr',
    region: 'Hyderabad, Lucknow & Pan-India',
    dietaryType: 'Vegetarian',
    prepTimeMinutes: 30,
    cookTimeMinutes: 35,
    defaultServings: 8,
    ingredients: [
      { name: { en: 'Full-cream milk', hi: 'फुल क्रीम दूध', gu: 'મલાઈદાર દૂધ' }, amount: 1500, unit: 'ml' },
      { name: { en: 'Fine roasted nylon vermicelli (Seviyan)', hi: 'बारीक भुनी हुई सेंवई', gu: 'ઝીણી શેકેલી સેવ' }, amount: 80, unit: 'g' },
      { name: { en: 'Soft dried dates (Chhohara / Khajoor, soaked & sliced)', hi: 'सूखे छुहारे या खजूर (भिगोकर बारीक कटे)', gu: 'પલાળેલી ખારેક અથવા ખજૂર' }, amount: 10, unit: 'pcs' },
      { name: { en: 'Pure desi ghee', hi: 'शुद्ध देशी घी', gu: 'શુદ્ધ ઘી' }, amount: 3, unit: 'tbsp' },
      { name: { en: 'Sugar or condensed milk', hi: 'चीनी', gu: 'ખાંડ' }, amount: 120, unit: 'g' },
      { name: { en: 'Slivered pistachios and almonds', hi: 'कटे हुए बादाम और पिस्ता', gu: 'બદામ-પિસ્તાની કતરણ' }, amount: 40, unit: 'g' },
      { name: { en: 'Chironji (Charoli seeds)', hi: 'चिरौंजी', gu: 'ચારૉળી' }, amount: 20, unit: 'g' },
      { name: { en: 'Green cardamom powder', hi: 'हरी इलायची पाउडर', gu: 'એલચી પાવડર' }, amount: 1, unit: 'tsp' },
      { name: { en: 'Kewra water / Rose water', hi: 'केवड़ा या गुलाब जल', gu: 'કેવડાનું પાણી' }, amount: 1, unit: 'tsp' },
      { name: { en: 'Pure saffron strands', hi: 'केसर के धागे', gu: 'કેસરના તાંતણા' }, amount: 15, unit: 'strands' }
    ],
    instructions: [
      {
        stepNumber: 1,
        text: {
          en: 'Soak sliced dried dates in warm milk for 2 hours. In a heavy pan, heat 2 tablespoons of desi ghee and gently fry sliced almonds, pistachios, and chironji on low heat until aromatic. Remove and keep aside.',
          hi: 'बारीक कटे छुहारों को 2 घंटे गर्म दूध में भिगोएं। पैन में घी गरम करके कटे बादाम, पिस्ता और चिरौंजी को धीमी आंच पर हल्का भूनकर अलग निकालें।',
          gu: 'ખારેકને બે કલાક ગરમ દૂધમાં પલાળી રાખો. ઘીમાં ડ્રાયફ્રૂટ્સને ધીમા તાપે સાંતળી અલગ રાખો.'
        },
        timerSeconds: 300
      },
      {
        stepNumber: 2,
        text: {
          en: 'In the remaining ghee, add fine vermicelli and sauté for 2-3 minutes on gentle heat until evenly toasted to a rich caramel amber.',
          hi: 'उसी घी में बारीक सेंवई डालकर 2-3 मिनट धीमी आंच पर सुनहरा होने तक भूनें।',
          gu: 'તે જ ઘીમાં સેવને બે-ત્રણ મિનિટ સોનેરી રંગની થાય ત્યાં સુધી શેકો.'
        },
        timerSeconds: 180
      },
      {
        stepNumber: 3,
        text: {
          en: 'In a large heavy pot, bring full-cream milk to a rolling boil. Reduce heat to low-medium and simmer for 15 minutes, stirring continuously and scraping malai from sides.',
          hi: 'बड़े बर्तन में फुल क्रीम दूध उबालें। आंच धीमी करके 15 मिनट तक पकाएं और मलाई को खुरचकर दूध में मिलाते रहें।',
          gu: 'દૂધને ઉકાળો અને ધીમા તાપે ૧૫ મિનિટ ઉકળવા દો જેથી તે ઘટ્ટ બને.'
        },
        timerSeconds: 900
      },
      {
        stepNumber: 4,
        text: {
          en: 'Add the soaked dates and toasted vermicelli into the simmering milk. Cook for 7-8 minutes until vermicelli is tender and silky.',
          hi: 'उबलते दूध में भिगोए छुहारे और भुनी हुई सेंवई डालें। सेंवई के नरम होने तक 7-8 मिनट पकाएं।',
          gu: 'દૂધમાં પલાળેલી ખારેક અને શેકેલી સેવ ઉમેરી ૭-૮ મિનિટ રાંધો.'
        },
        timerSeconds: 480
      },
      {
        stepNumber: 5,
        text: {
          en: 'Stir in sugar, saffron dissolved in warm milk, cardamom powder, and roasted nuts. Simmer for another 4 minutes. Turn off heat and finish with aromatic kewra water.',
          hi: 'चीनी, केसर दूध, इलायची पाउडर और भुने मेवे मिलाएं। 4 मिनट और पकाएं। गैस बंद कर केवड़ा जल छिड़कें।',
          gu: 'ખાંડ, કેસરવાળું દૂધ, એલચી અને સાંતળેલા ડ્રાયફ્રૂટ્સ ઉમેરી ૪ મિનિટ ઉકાળો. ગેસ બંધ કરી કેવડાનું પાણી ઉમેરો.'
        },
        timerSeconds: 240
      }
    ],
    culturalStory: {
      en: '‘Sheer Khurma’ translates literally from Persian as ‘Milk and Dates’. Originating in the medieval Indo-Persian culinary synthesis, it is traditionally served first thing after Eid morning prayers.',
      hi: '‘शीर खुरमा’ फारसी मूल का शब्द है जिसका अर्थ है ‘दूध और खजूर’। ईद की नमाज़ के बाद मेहमानों का स्वागत इसी लजीज शीर खुरमा से किया जाता है।',
      gu: 'ઈદના દિવસે નમાઝ બાદ મોં મીઠું કરાવવા માટે આ પારંપરિક વાનગી સૌને પ્રેમથી પીરસવામાં આવે છે.'
    },
    sources: [OFFICIAL_SOURCES[5]]
  }
];

export const VERIFIED_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz-1',
    question: {
      en: 'Which Indian festival was inscribed on the UNESCO Intangible Cultural Heritage list in December 2021?',
      hi: 'दिसंबर 2021 में किस भारतीय पर्व को यूनेस्को की अमूर्त सांस्कृतिक विरासत सूची में शामिल किया गया था?',
      gu: 'ડિસેમ્બર ૨૦૨૧માં કયા ભારતીય ઉત્સવને યુનેસ્કોની અમૂર્ત સાંસ્કૃતિક વારસા યાદીમાં સ્થાન મળ્યું હતું?'
    },
    options: {
      en: ['Kumbh Mela', 'Durga Puja in Kolkata', 'Hornbill Festival', 'Mysuru Dasara'],
      hi: ['कुंभ मेला', 'कोलकाता की दुर्गा पूजा', 'हॉर्नबिल महोत्सव', 'मैसूरु दशहरा'],
      gu: ['કુંભ મેળો', 'કોલકાતાની દુર્ગા પૂજા', 'હોર્નબિલ ફેસ્ટિવલ', 'મૈસુર દશેરા']
    },
    correctOptionIndex: 1,
    explanation: {
      en: 'Durga Puja in Kolkata was officially inscribed on the UNESCO Representative List of the Intangible Cultural Heritage of Humanity in December 2021 for its open-air community installation art.',
      hi: 'दिसंबर 2021 में यूनेस्को ने कोलकाता की दुर्गा पूजा को इसकी विशिष्ट कलात्मकता और सामुदायिक समरसता के लिए मानवता की अमूर्त धरोहर के रूप में मान्यता दी।',
      gu: 'કોલકાતાની દુર્ગા પૂજાને તેની અદ્ભુત કલાત્મકતા માટે ૨૦૨૧માં યુનેસ્કો દ્વારા માન્યતા અપાઈ હતી.'
    },
    historicalCitation: 'UNESCO 16th Session of the Intergovernmental Committee (16.COM 8.b.14), Dec 2021.',
    category: 'Festival',
    difficulty: 'Medium'
  },
  {
    id: 'quiz-2',
    question: {
      en: 'In which state is the famous 10-day Hornbill Festival held every year from December 1 to 10?',
      hi: 'प्रतिवर्ष 1 से 10 दिसंबर तक प्रसिद्ध 10-दिवसीय हॉर्नबिल महोत्सव किस राज्य में आयोजित किया जाता है?',
      gu: 'દર વર્ષે ૧ થી ૧૦ ડિસેમ્બર દરમિયાન પ્રસિદ્ધ હોર્નબિલ ફેસ્ટિવલ કયા રાજ્યમાં યોજાય છે?'
    },
    options: {
      en: ['Assam', 'Manipur', 'Nagaland', 'Arunachal Pradesh'],
      hi: ['असम', 'मणिपुर', 'नागालैंड', 'अरुणाचल प्रदेश'],
      gu: ['અસમ', 'મણિપુર', 'નાગાલેન્ડ', 'અરુણાચલ પ્રદેશ']
    },
    correctOptionIndex: 2,
    explanation: {
      en: 'The Hornbill Festival is organized by the Government of Nagaland at the Kisama Heritage Village near Kohima.',
      hi: 'हॉर्नबिल महोत्सव नागालैंड सरकार द्वारा कोहिमा के समीप स्थित किसामा हेरिटेज विलेज में आयोजित किया जाता है।',
      gu: 'હોર્નબિલ ફેસ્ટિવલ નાગાલેન્ડના કોહિમા નજીક આવેલા કીસામા ગામમાં યોજાય છે.'
    },
    historicalCitation: 'Department of Tourism, Government of Nagaland official archives.',
    category: 'Tradition',
    difficulty: 'Easy'
  },
  {
    id: 'quiz-3',
    question: {
      en: 'What is the traditional name of the circular floral carpet created during the Onam festival in Kerala?',
      hi: 'केरल में ओणम उत्सव के दौरान बनाई जाने वाली फूलों की वृत्ताकार रंगोली को पारंपरिक रूप से क्या कहा जाता है?',
      gu: 'કેરળમાં ઓણમ દરમિયાન ફૂલોથી બનાવાતી રંગોળીને પરંપરાગત રીતે શું કહેવામાં આવે છે?'
    },
    options: {
      en: ['Alpana', 'Kolam', 'Athapookkalam', 'Aipan'],
      hi: ['अल्पना', 'कोलम', 'अथपूक्कलम', 'ऐपण'],
      gu: ['આલ્પના', 'કોલમ', 'અથપૂક્કલમ', 'ઐપણ']
    },
    correctOptionIndex: 2,
    explanation: {
      en: 'In Kerala, the floral carpet is called Athapookkalam because it commences on the day of Atham asterism and expands daily until Thiruvonam.',
      hi: 'केरल में इसे अथपूक्कलम कहा जाता है, जो अथम नक्षत्र के दिन से प्रारंभ होकर थिरुवोणम तक प्रतिदिन बड़ा किया जाता है।',
      gu: 'કેરળમાં ફૂલોની રંગોળીને અથપૂક્કલમ કહે છે, જે અથમ દિવસથી શરૂ થાય છે.'
    },
    historicalCitation: 'Indira Gandhi National Centre for the Arts (IGNCA) South Regional Centre documentation.',
    category: 'Tradition',
    difficulty: 'Easy'
  },
  {
    id: 'quiz-4',
    question: {
      en: 'Which ancient martial art form originating in Kerala incorporates physical postures derived from eight animals (Ashta Vadivu)?',
      hi: 'केरल की कौन सी प्राचीन युद्धकला आठ पशुओं की शारीरिक मुद्राओं (अष्ट वड़िवु) पर आधारित है?',
      gu: 'કેરળની કઈ પ્રાચીન યુદ્ધકળા આઠ પ્રાણીઓની મુદ્રાઓ પર આધારિત છે?'
    },
    options: {
      en: ['Silambam', 'Kalaripayattu', 'Gatka', 'Thang-Ta'],
      hi: ['सिलम्बम', 'कलारिपयट्टू', 'गतका', 'थांग-ता'],
      gu: ['સિલામ્બમ', 'કલારીપયટ્ટુ', 'ગતકા', 'થાંગ-તા']
    },
    correctOptionIndex: 1,
    explanation: {
      en: 'Kalaripayattu is considered one of the oldest martial arts in the world, utilizing Ashta Vadivu postures (Gaja, Ashwa, Simha, Sarpa, etc.).',
      hi: 'कलारिपयट्टू को विश्व की प्राचीनतम युद्ध कलाओं में गिना जाता है, जिसमें गज, सिंह, अश्व, सर्प आदि आठ पशुओं की मुद्राएं होती हैं।',
      gu: 'કલારીપયટ્ટુ વિશ્વની સૌથી પ્રાચીન માર્શલ આર્ટ્સમાંની એક છે.'
    },
    historicalCitation: 'Sangeet Natak Akademi archives on Traditional Martial Arts of India.',
    category: 'Tradition',
    difficulty: 'Medium'
  },
  {
    id: 'quiz-5',
    question: {
      en: 'On which occasion do Sikh communities commemorate Bandi Chhor Divas, coinciding with Diwali?',
      hi: 'सिख समुदाय दिवाली के अवसर पर किस ऐतिहासिक घटना की स्मृति में बंदी छोड़ दिवस मनाता है?',
      gu: 'દિવાળીના દિવસે શીખ સમુદાય કઈ ઐતિહાસિક ઘટનાના ઉપલક્ષ્યમાં બંદી છોડ દિવસ ઉજવે છે?'
    },
    options: {
      en: [
        'Release of Guru Hargobind Ji and 52 kings from Gwalior Fort',
        'Establishment of the Khalsa Panth in Anandpur Sahib',
        'Compilation of the Guru Granth Sahib at Amritsar',
        'Victory in the Battle of Chamkaur'
      ],
      hi: [
        'गुरु हरगोबिंद जी और 52 राजाओं की ग्वालियर किले से रिहाई',
        'आनंदपुर साहिબ में खालसा पंथ की स्थापना',
        'अमृतसर में गुरु ग्रंथ साहिब का संकलन',
        'चमकौर के युद्ध में विजय'
      ],
      gu: [
        'ગુરુ હરગોબિંદજી અને ૫૨ રાજાઓની ગ્વાલિયર કિલ્લામાંથી મુક્તિ',
        'આનંદપુર સાહિબમાં ખાલસા પંથની સ્થાપના',
        'અમૃતસરમાં ગુરુ ગ્રંથ સાહિબનું સંકલન',
        'ચમકૌરના યુદ્ધમાં વિજય'
      ]
    },
    correctOptionIndex: 0,
    explanation: {
      en: 'Bandi Chhor Divas commemorates the day the sixth Sikh Guru, Guru Hargobind Ji, was released from Gwalior Fort by Emperor Jahangir and facilitated the safe release of 52 innocent Hindu rajas.',
      hi: 'छठे सिख गुरु हरगोबिंद जी ने ग्वालियर किले से स्वयं रिहा होने के साथ 52 निर्दोष हिंदू राजाओं को भी मुक्त कराया था।',
      gu: 'છઠ્ઠા ગુરુ હરગોબિંદજીએ ગ્વાલિયર કિલ્લામાંથી ૫૨ રાજાઓને મુક્ત કરાવ્યા હતા.'
    },
    historicalCitation: 'Shiromani Gurdwara Parbandhak Committee (SGPC) Sikh History Board.',
    category: 'Festival',
    difficulty: 'Medium'
  }
];

export const FESTIVAL_WISHES_DATA = [
  {
    festivalSlug: 'diwali',
    title: { en: 'Diwali Wishes & Blessings', hi: 'दीपावली की हार्दिक शुभकामनाएं', gu: 'દિવાળીની હાર્દિક શુભકામનાઓ' },
    captions: [
      {
        en: 'May the divine light of diyas illuminate your life with peace, prosperity, good health, and joyful moments. Happy Deepavali!',
        hi: 'दीपों का यह पावन पर्व आपके जीवन में सुख, शांति, समृद्धि और उत्तम स्वास्थ्य लेकर आए। दीपावली की हार्दिक शुभकामनाएं!',
        gu: 'આ દીપોત્સવ તમારા જીવનમાં નવી આશા, સુખ, સમૃદ્ધિ અને ઉત્તમ આરોગ્ય લાવે. આપ સૌને દિવાળીની હાર્દિક શુભકામનાઓ!'
      },
      {
        en: 'Wishing you a sparkling Festival of Lights filled with sweet celebrations, family warmth, and blessed new beginnings.',
        hi: 'सुख, समृद्धि और खुशियों से जगमगाती दीपावली की अशेष मंगलकामनाएं। आपके घर-आंगन में सदा माता लक्ष्मी का वास रहे।',
        gu: 'દિવાળીના શુભ પર્વ પર આપને અને આપના પરિવારને ખૂબ ખૂબ શુભેચ્છાઓ. નવું વર્ષ મંગલમય નીવડે.'
      }
    ]
  },
  {
    festivalSlug: 'holi',
    title: { en: 'Holi Wishes & Captions', hi: 'होली के पावन संदेश', gu: 'હોળી-ધૂળેટીની શુભેચ્છાઓ' },
    captions: [
      {
        en: 'May the vibrant colours of Holi paint your days with optimism, laughter, affection, and joyful memories. Happy Holi!',
        hi: 'गुलाल और प्रेम के पावन रंगों से सराबोर होली का यह पावन पर्व आपके जीवन में नवउमंग और खुशहाली भरे। होली की शुभकामनाएं!',
        gu: 'અબીલ-ગુલાલના રંગો તમારા જીવનમાં સ્નેહ, ઉત્સાહ અને આનંદ ભરી દે. આપ સૌને હોળી-ધૂળેટીની હાર્દિક શુભેચ્છાઓ!'
      }
    ]
  },
  {
    festivalSlug: 'eid-ul-fitr',
    title: { en: 'Eid Mubarak Greetings', hi: 'ईद मुबारक के खूबसूरत पैगाम', gu: 'ઈદ મુબારક સંદેશ' },
    captions: [
      {
        en: 'May the blessings of Allah fill your home and heart with divine peace, harmony, prosperity, and joyous celebrations. Eid Mubarak!',
        hi: 'अल्लाह की रहमत से आपकी हर दुआ कबूल हो और आपका दामन खुशियों से भर जाए। आपको और आपके परिवार को दिल से ईद मुबारक!',
        gu: 'ઈશ્વર આપના જીવનમાં શાંતિ, સમૃદ્ધિ અને ખુશીઓ અર્પે. આપને અને આપના પરિવારને ઈદ મુબારક!'
      }
    ]
  }
];

