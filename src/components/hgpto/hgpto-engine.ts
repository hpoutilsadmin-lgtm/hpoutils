// @ts-nocheck
/* ============================================================
   HGPTO — moteur de la mascotte (vie, interactions, Pixel,
   questions, visite guidée, jeu caché Serpents et échelles).
   Portage fidèle du prototype validé par Hugo (artefact
   « hgpto-mascotte-hp », état final du 22 oct. 2026).
   Adaptations au vrai site, et seulement celles-là :
   · sélecteur de retrait sur les vrais éléments (main/header/footer) ;
   · « Fermer HGPTO » ferme la mascotte pour la session ;
   · « Montre-moi… » et la visite guidée naviguent vers les vraies
     routes (la visite se poursuit après chaque changement de page,
     état gardé en session seulement) ;
   · « Accompagne-moi » commente aussi les arrivées sur les pages ;
   · les données vivent dans hgpto-data.ts (importées ci-dessous).
   Aucune donnée personnelle n'est lue ni conservée.
   ============================================================ */
import { JOKES, GAME_PITCHES, BOOK_PITCHES, KIT_PITCHES, ATELIER_PITCHES, PITCHES, TICKLE_LINES, TICKLE_BIG, SLEEP_LINES, TINKER_LINES, WAVE_LINES, COOK_LINES, COOK_TASTE, RECETTES_LINE, EVENING_LINES, COMPANION_LINES, MEALS, HUGO_LINES, EMOJI_LINES, QC_HISTORY, ANECDOTES, PHILO, EMPATHY, NEWS_LINES, JANITOR, INTRO, STARTLE_LINES, BUCKET_LINES, YAWN_LINE, MORNING_LINE, NIGHTFALL_LINE, SITE_FACTS, FALLBACK, KB, SYNONYMS, STOPWORDS, AIRS_ORIGINAUX, HUGO_SONGS, CHOIX_LINES, ETHIQUE_LINES, GRUMBLES, BESOIN_SUGGESTIONS, ALT_LINES, BUNDLE_MATH, DWELL_SUGGESTIONS } from "./hgpto-data";

export function initHgpto() {
      "use strict";
      if (window.__hgptoBooted) return;
      window.__hgptoBooted = true;
      var bot = document.getElementById('bot');
      var bubble = document.getElementById('bubble');
      var burst = document.getElementById('burst');
      var signText = document.getElementById('signText');
      var btnPause = document.getElementById('btn-pause');
      var btnHide = document.getElementById('btn-hide');
      var btnAsk = document.getElementById('btn-ask');
      var btnSound = document.getElementById('btn-sound');
      var qaPanel = document.getElementById('qa');
      var qaChips = document.getElementById('qa-chips');
      var qaClose = document.getElementById('qa-close');
      var bookTitle = document.getElementById('bookTitle');
      var graffiti = document.getElementById('graffiti');
      var btnTickle = document.getElementById('btn-tickle');
      var btnBucket = document.getElementById('btn-bucket');
      var btnCalm = document.getElementById('btn-calm');
      var selWeather = document.getElementById('sel-weather');
      var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var pupils = document.getElementById('pupils');
      document.addEventListener('pointermove', function(e){
        if (!pupils) return;
        var r = bot.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width/2)) / (window.innerWidth || 1);
        var dy = (e.clientY - (r.top + r.height*0.32)) / (window.innerHeight || 1);
        var px = Math.max(-3.6, Math.min(3.6, dx*7));
        var py = Math.max(-2.4, Math.min(2.4, dy*5));
        pupils.style.transform = 'translate(' + px.toFixed(1) + 'px,' + py.toFixed(1) + 'px)';
      }, { passive:true });
      /* ---------- Panneau « Pour Hugo » : discret (lot nº 2) ----------
         La section « questions sans réponse, à valider » ne doit PAS être
         visible des visiteurs du site public. La consignation continue en
         arrière-plan (mémoire de session) et la bulle signature reste
         publique, mais la section elle-même est RETIRÉE du DOM — sauf si
         l'URL porte le paramètre discret ?pourhugo=1 (accès pour Hugo
         seul, sans mot de passe ni compte : juste discret). */
      var pourHugo = false;
      try { pourHugo = /[?&]pourhugo=1(&|$)/.test(window.location.search || ''); } catch(e) {}
      if (!pourHugo){
        var qaHugoEl = document.getElementById('qa-hugo');
        if (qaHugoEl) qaHugoEl.remove();
      }
      (function blinkLoop(){
        setTimeout(function(){
          bot.classList.add('blink');
          setTimeout(function(){ bot.classList.remove('blink'); }, 130);
          blinkLoop();
        }, 2300 + Math.random()*2800);
      })();

      /* ---------- Contenu : blagues originales + catalogue réel ----------
         Textes regroupés et paramétrables : les recommandations du panneau
         de spécialistes s'appliqueront ici (textes, fréquences, durées).
         JOURNAL DES AJOUTS :
         · 2026-10-21 — base : accueil, promenade, salut, sieste, bricolage, chatouille.
         · 2026-10-21 — cuisine (réussie/ratée), lecture, graffiti, cycle jour/nuit.
         · 2026-10-21 — questions/réponses (specs réelles du dépôt du site), voix charabia.
         · 2026-10-21 — dock (seau d'eau), garde-robe météo, accompagnateur, scène 2 h.
         · 2026-10-21 — skate, lutteur, mime ; panneau : bulles ≥ 8 s, mode calme,
                        « Repose-toi », produits par la vie, honnêteté jouée, blagues ×3.
         · 2026-10-21 — jeu caché « Serpents et échelles » (dés équitables, zéro rétention).
         · 2026-10-22 — redesign adulte (barbe, lunettes de lecture seulement) + pack personnalité.
         · 2026-10-22 — lot « cerveau + lecture » : base de faits formalisée (SITE_FACTS),
                        questions tapées + journal « Pour Hugo », visite guidée et
                        commentaires de sections, mode « Accompagne-moi », journal de bord,
                        photo souvenir, défi d'ami sur la carte, jeu rééquilibré (~5 min),
                        charabia plafonné et adouci, blagues portées à 62, et la banque de
                        lecture : faits historiques du Québec vérifiés, anecdotes d'ici,
                        petites pensées (paraphrasées, aucune citation inventée), empathie.
                        Règle d'or du lot : gaffeur sur SES affaires, jamais sur les produits —
                        aucun prix, aucun contenu, aucun fait n'est jamais déformé pour une blague.
                        (Étage 3 du cerveau — IA en laisse courte : phase site, pas construit ici.)
         · 2026-10-22 — VISAGE, version DÉFINITIVE (2e correction d'Hugo, qui annule la
                        précédente) : sourcils GROS, NOIRS et ÉBOURIFFÉS, poils rebelles
                        compris — ce sont eux qui portent les expressions, partout (le pion
                        du jeu aussi). AUCUNE lunette de soleil, jamais : ses seuls verres
                        sont les lunettes de LECTURE, pour lire seulement. La LED change
                        de couleur selon l'humeur, en appui. (À l'époque : tenue
                        chaude = casquette — retirée par la retouche look du
                        22 oct. : zéro chapeau, partout.)
         · 2026-10-22 — PIXEL, sa chatte (2 ans, rescapée de l'extérieur un hiver) : elle vit
                        sur le site — suit HGPTO, se frotte contre ses jambes, zoomies, siestes
                        lovées, fascination pour les décos ; il la nourrit et joue avec elle ;
                        le visiteur peut la flatter (ronron) mais trop vite = petite griffe +
                        son intervention mot pour mot, puis elle revient se faire pardonner ;
                        elle le console quand il est triste et partage ses siestes. Animal :
                        miaulements et ronrons seulement, jamais de parole.
         · 2026-10-22 — RÈGLE D'OR du propriétaire (à respecter dans TOUTES ses
                        bulles) : « L'utilité crée la confiance, la personnalité
                        crée l'attachement. Le charme ne doit jamais ralentir la
                        tâche. » Ses 3 traits constants : FRANC (il dit vrai),
                        GÉNÉREUX (il aide et donne d'abord), ESPIÈGLE-RÉSILIENT
                        (il rit de lui-même et se relève). Son défaut attachant,
                        le seul, signature : gaffeur-maladroit. Voix constante :
                        deux mots fétiches officiels — « On avance ! » et
                        « Minute ! J't'en pause. » — salutations en emojis,
                        tournures québécoises stables d'une bulle à l'autre.
                        Moments signature : saluer (main levée + charabia),
                        célébrer (sa petite célébration de victoire, notamment
                        aux dés), et dire « je ne sais pas » à SA façon : « Là,
                        je sais pas — mais je le note pour Hugo ! » (relié au
                        journal « Pour Hugo » des questions sans réponse).
                        Continuité : la SESSION en cours seulement (partie en
                        cours, questions posées, sections visitées) — jamais de
                        mémoire entre visites, jamais de données personnelles.
         · 2026-10-22 — RETOUCHE LOOK du propriétaire : ZÉRO chapeau partout
                        (ni bonnet de nuit — il dort tête nue —, ni tuque — le
                        foulard au cou reste pour le froid —, ni casquette, ni
                        béret de mime, pion du jeu compris) ; crâne CHAUVE en
                        métal poli avec ombre de repousse rasée de ~2 jours
                        (pointillé fin, dessus arrière + côtés) ; barbe un peu
                        plus longue (courte barbe fournie, moustache reliée) ;
                        sourcils encore plus velus/poilus, toujours lisibles ;
                        taille réduite : 132 px bureau, 106 px mobile (Pixel
                        suit : 76 px au téléphone), cibles du dock ≥ 44 px.
                        IL EST QUÉBÉCOIS : chandail bleu par-dessus le torse,
                        fleur de lys blanche à la poitrine (un seul lys, tracé
                        simple), LED déménagée à l'encolure — partout, pion du
                        jeu compris. Silhouette lisible en 1 seconde, même en
                        très petit : crâne chauve + gros sourcils ébouriffés +
                        barbe + lys à la poitrine.
         · 2026-10-22 — LOT Nº 2 (go d'Hugo : « pousse ça, c'est très bon ») :
                        (1) FREDONNAGE pendant ses moments calmes — airs
                        ORIGINAUX composés pour lui + CADRE pour les chansons
                        d'Hugo (transcription auto des masters jugée non
                        fiable : aucune mélodie inventée, voir hgpto-data.ts) ;
                        (2) influenceur maison : « Le choix d'HGPTO », faits
                        réels, gratuit d'abord, dose faible (reco nº 8) ;
                        (3) savoir-vendre ÉTHIQUE HP : hésitation détectée →
                        faits + lien direct + sortie facile, zéro pression ;
                        (4) INTELLIGENCE ÉMOTIONNELLE de session seulement :
                        pressé / flâneur / nuit profonde / routes sensibles /
                        hésitation / perdu — le confort et l'aide, JAMAIS un
                        levier de vente ; (5) DÉGUISEMENTS contextuels :
                        tablier+mitaines en cuisine, super-héros/lutteur aux
                        jeux, costumes des fêtes du Québec ; (6) panneau
                        « Pour Hugo » (questions sans réponse) CACHÉ aux
                        visiteurs : la consignation continue en session, la
                        bulle signature reste publique, et la section ne
                        réapparaît qu'avec le paramètre d'URL ?pourhugo=1
                        (accès discret pour Hugo, sans mot de passe).
         · 2026-10-22 — LOT Nº 3 « vendeur, version HP » (mandat d'Hugo :
                        « vraiment faire de la vente, de la suggestion et
                        répondre aux clients ») : système de suggestions à
                        plafonds (1 par page, jamais le même produit 2× par
                        session, « Non merci » fait taire le produit, jamais
                        deux collées, gratuit d'abord, JAMAIS sur un signal
                        émotif — pressé/perdu/nuit restent des signaux de
                        CONFORT seulement) ; suggestions par besoin exprimé
                        (la question tapée nomme le besoin → le produit qui
                        fait ça, specs et prix vrais) ; alternative gratuite
                        après les réponses payantes ; calcul honnête du
                        bundle au 2e intérêt kits ; une suggestion douce à
                        la fin de la visite, jamais après un arrêt demandé ;
                        ses GROGNES signature quand ça rate dans SA vie
                        (« Saleté d'crème ! » / « Ti pépère jaune moutarde
                        m'en dira tant. », ~1 fois sur 2, alternées, puis
                        résilience) ; visite guidée TRANQUILLE : textes qui
                        EXPLIQUENT chaque endroit, rythme apaisé. */
      var COMPANION_EVERY = 0.16;              // part des bulles « accompagnateur »
      var TWO_HOURS_MS = 2 * 60 * 60 * 1000;   // scène des 2 heures, une seule fois
      var pitchPoolIdx = 0;
      function endVignette(pool, prob){
        if (pool && Math.random() < (prob == null ? 0.55 : prob)){
          var p = pool[pitchPoolIdx % pool.length]; pitchPoolIdx++;
          setState(reduced ? 'idle' : 'walk');
          busyUntil = 0;
          // Lot nº 3 : les invitations de vie passent par les plafonds du
          // système de suggestions (1 par page, jamais le même produit
          // 2× par session, refus respecté). Refusée par le plafond, la
          // vignette se termine en douceur, sans rien afficher.
          doSuggest(p);
        } else {
          setState(reduced ? 'idle' : 'walk');
        }
      }
      var readIdx = 0;
      function nextReading(){
        readIdx++;
        var cat = readIdx % 4;
        if (cat === 0) return { kind:'fait', t: pick(QC_HISTORY) };
        if (cat === 1) return { kind:'pensée', t: pick(PHILO) };
        if (cat === 2) return { kind:'anecdote', t: pick(ANECDOTES) };
        return { kind:'fait', t: pick(QC_HISTORY) };
      }
      function shareReading(mood){
        var r = nextReading();
        var intro = r.kind === 'fait' ? "J'ai lu ça, écoute : "
                  : r.kind === 'pensée' ? "" : "J'ai lu ça tantôt : ";
        showBubble(esc(intro + r.t), 9000, mood || 'talk');
        logDay(r.kind === 'fait' ? "lu un fait d'histoire du Québec" : (r.kind === 'pensée' ? "lu une petite pensée" : "lu une anecdote d'ici"));
      }

      /* ---------- Son journal de bord (SA journée à lui, jamais celle du visiteur) ---------- */
      var dayLog = [];
      function logDay(what){
        var line = "• " + what;
        if (dayLog.indexOf(line) === -1) dayLog.push(line);
      }
      function journalText(){
        var h = new Date().getHours();
        var moment = h < 11 ? "Ma matinée" : h < 16 ? "Ma journée, jusqu'ici" : "Ma journée";
        var acts = dayLog.length ? dayLog.slice(0, 6).join("\n") : "• me promener, saluer le monde et tenir le site beau";
        return moment + ", côté robot :\n" + acts + "\nEt ce n'est pas fini — je suis un robot occupé, moi !";
      }

      /* ---------- Jour / nuit (heure locale du visiteur) ---------- */
      function isNight(){ var h = new Date().getHours(); return h >= 21 || h < 7; }
      function applyPeriod(){ document.body.classList.toggle('night', isNight()); }
      var wasNight = isNight();
      applyPeriod();

      /* ---------- État ---------- */
      var BOT_W = window.innerWidth <= 560 ? 106 : 132;
      var state = 'idle';  // idle|wave|walk|tinker|cook|invite|sleep|tickle|tickle-big|startle|stretch
      var x = 0, dir = 1, speed = 26; // px/s
      var paused = false, isHidden = false, docHidden = false;
      var calm = false, cornerUntil = 0, gameOn = false, byeDone = false;
      var busyUntil = 0;
      var guideTarget = null;   // x visé quand il « marche jusqu'à » une section
      var jokeIdx = 0, pitchIdx = 0, alternate = 0;
      var tickleCombo = 0, tickleTimer = null;
      var lastInteract = Date.now();
      var bubbleTimer = null, talkTimer = null, waveTimer = null, lifeTimer = null;

      function vw(){ return window.innerWidth || 390; }
      function minX(){ return 6; }
      function botW(){ var m = window.innerWidth <= 560; return calm ? (m ? 128 : 160) : (bot.classList.contains('big') ? (m ? 120 : 152) : BOT_W); }
      function maxX(){ return Math.max(minX(), vw() - botW() - 6); }
      function clampX(v){ return Math.min(maxX(), Math.max(minX(), v)); }

      function setState(s){ state = s; bot.setAttribute('data-state', s); }
      function setExpr(e){ bot.setAttribute('data-expr', e); }
      function busy(ms){ busyUntil = Date.now() + ms; }
      function isBusy(){ return Date.now() < busyUntil; }
      function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;'); }
      function pick(a){ return a[Math.floor(Math.random()*a.length)]; }

      function place(){
        bot.style.transform = 'translateX(' + x + 'px)';
        var c = x + botW()/2;
        bubble.classList.toggle('edge-l', c < 140);
        bubble.classList.toggle('edge-r', c > vw() - 140);
      }

      /* ---------- Sa voix : un charabia de petit robot (WebAudio) ----------
         Des blips formantiques doux, synchronisés avec le texte de la bulle.
         Le son ne peut démarrer qu'après un premier geste du visiteur. */
      var actx = null, muted = false;
      function ensureAudio(){
        if (!actx){
          var AC = window.AudioContext || window.webkitAudioContext;
          if (AC){ try { actx = new AC(); } catch(e){ actx = null; } }
        }
        if (actx && actx.state === 'suspended') actx.resume();
      }
      function tone(t0, f0, f1, dur, vol, type){
        if (!actx) return;
        var o = actx.createOscillator(), g = actx.createGain(), fl = actx.createBiquadFilter();
        o.type = type || 'triangle';
        fl.type = 'bandpass'; fl.frequency.value = 950; fl.Q.value = 1.1;
        o.frequency.setValueAtTime(f0, t0);
        o.frequency.exponentialRampToValueAtTime(Math.max(40, f1), t0 + dur);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + dur*0.25);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(fl); fl.connect(g); g.connect(actx.destination);
        o.start(t0); o.stop(t0 + dur + 0.02);
      }
      function plainText(html){
        var d = document.createElement('div');
        d.innerHTML = html;
        return (d.textContent || '').replace(/\s+/g,' ').trim();
      }
      function speak(text, mood){
        if (!actx || muted || docHidden || !text || mood === 'none') return;
        // Passe audio 2026-10-22 : hauteur PLAFONNÉE (jamais strident), volume
        // doux, et il baisse pendant qu'on lit une réponse (mood 'answer').
        // Le charabia se groupe en petits « mots » de 3-4 syllabes, séparés par
        // des souffles — allo, hello, hola, ciao vivent dans le rythme, dosés.
        var base = mood === 'sleep' ? 175 : mood === 'joke' ? 392 : mood === 'answer' ? 318 : 292;
        var step = mood === 'sleep' ? 0.22 : mood === 'joke' ? 0.1 : 0.12;
        var vol = mood === 'sleep' ? 0.03 : (mood === 'answer' ? 0.033 : 0.046);
        var n = Math.max(2, Math.min(24, Math.round(text.length / 6)));
        var tt = actx.currentTime + 0.02;
        for (var i=0;i<n;i++){
          var f = Math.min(470, base * (0.9 + Math.random()*0.32));
          var f1 = f * (0.92 + Math.random()*0.2);
          if (mood === 'question' && i >= n-2){ f *= 1.12; f1 = f * 1.24; }
          tone(tt, f, f1, step*0.92, vol, 'triangle');
          tt += step + ((i % 4 === 3) ? step*0.85 : 0);   // le souffle entre les « mots »
        }
      }
      function giggle(){
        if (!actx || muted || docHidden) return;
        var t = actx.currentTime + 0.02;
        for (var i=0;i<6;i++){
          var f = 540 + Math.random()*170;   // rire plafonné : mignon, jamais agaçant
          tone(t + i*0.085, f, f*1.15, 0.07, 0.04, 'square');
        }
      }
      function yawnSound(){
        if (!actx || muted) return;
        var t = actx.currentTime + 0.02;
        tone(t, 420, 130, 0.8, 0.045, 'sine');
        tone(t + 0.85, 200, 120, 0.4, 0.028, 'sine');
      }
      function snore(){
        if (!actx || muted || docHidden) return;
        var t = actx.currentTime + 0.02;
        tone(t, 130, 90, 0.5, 0.026, 'sine');
        tone(t + 0.62, 300, 345, 0.16, 0.018, 'triangle'); // le petit « bip » du zzz-bip
      }
      /* ---------- Fredonnage (lot nº 2) : il fredonne dans ses moments
         calmes — en balayant, en bricolant, en marchant. Deux sources
         seulement : ses airs ORIGINAUX composés pour lui, et les chansons
         d'Hugo quand leur mélodie aura été transcrite et validée à
         l'oreille (HUGO_SONGS : cadre vide pour l'instant, voir
         hgpto-data.ts — aucune mélodie inventée). Voix douce en legato,
         jamais pendant une tâche du visiteur, muet respecté. ---------- */
      var humSeq = 0;
      function humTone(t0, midi, dur){
        if (!actx) return;
        var f = 440 * Math.pow(2, (midi - 69) / 12);
        var o = actx.createOscillator(), g = actx.createGain(), fl = actx.createBiquadFilter();
        o.type = 'sine';
        fl.type = 'lowpass'; fl.frequency.value = 1150;
        o.frequency.setValueAtTime(f * 0.995, t0);
        o.frequency.exponentialRampToValueAtTime(f, t0 + Math.min(0.09, dur * 0.3));
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.034, t0 + 0.07);
        g.gain.setValueAtTime(0.034, t0 + Math.max(0.07, dur - 0.09));
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(fl); fl.connect(g); g.connect(actx.destination);
        o.start(t0); o.stop(t0 + dur + 0.03);
      }
      function doHum(){
        if (!actx || muted || docHidden || paused || isHidden || qaOpen || calm || gameOn) return;
        if (state === 'sleep' || isBusy()) return;
        var songs = HUGO_SONGS.filter(function(s){ return s.notes && s.notes.length; });
        var fromHugo = songs.length && Math.random() < 0.45;
        var air = fromHugo ? pick(songs) : pick(AIRS_ORIGINAUX);
        var notes = air.notes;
        if (!notes || !notes.length) return;
        var mySeq = ++humSeq;
        setExpr('happy');
        if (fromHugo){
          showBubble(esc("🎵 Ça, c'est une des chansons d'Hugo : « " + air.titre + " » !") +
            linkHtml({ u:"https://hp-outils.com/balado", l:"Le balado et ses chansons" }), 7000, 'none');
          logDay("fredonné une chanson d'Hugo (« " + air.titre + " »)");
        } else if (Math.random() < 0.5){
          showBubble("🎵 Un petit air de mon cru, " + air.titre + "…", 5200, 'none');
          logDay("fredonné un de mes airs (" + air.titre + ")");
        }
        var t = actx.currentTime + 0.05;
        notes.forEach(function(nd){
          if (mySeq !== humSeq) return;
          humTone(t, nd[0], nd[1] * 0.96);
          t += nd[1];
        });
      }
      /* ---------- Influenceur maison : « Le choix d'HGPTO » (lot nº 2) ---
         Dans sa vie, à dose faible (max 2 par session, espacés), il
         présente un produit/jeu réel de sa base de faits. Gratuit d'abord,
         une seule invitation à la fois — reco nº 8. ---------- */
      var choixIdx = 0, choixCount = 0, choixLastAt = 0;
      function doChoix(asked){
        if (paused || isHidden || docHidden || qaOpen || calm || gameOn) return;
        if (state === 'sleep' || isBusy()) return;
        if (Date.now() - lastBubbleAt < 9000) return;
        // Lot nº 3 : « Le choix d'HGPTO » passe par les mêmes plafonds que
        // toutes les suggestions. Demandé explicitement par le visiteur
        // (puce « C'est quoi, ton choix du moment ? »), les plafonds de
        // page et d'espacement sautent — mais un produit REFUSÉ (« Non
        // merci ») ne revient jamais : on passe au choix suivant.
        for (var tries = 0; tries < CHOIX_LINES.length; tries++){
          var p = CHOIX_LINES[choixIdx % CHOIX_LINES.length]; choixIdx++;
          if (!canSuggest(p, { asked: !!asked })) continue;
          choixCount++; choixLastAt = Date.now();
          logDay("présenté mon choix du moment, comme un vrai influenceur de boulons");
          doSuggest(p, { asked: !!asked, pre:true });
          return;
        }
      }
      function scheduleChoix(){
        setTimeout(function(){
          if (choixCount < 2 && Date.now() - choixLastAt > 150000) doChoix();
          if (choixCount < 2) scheduleChoix();
        }, 150000 + Math.random() * 90000);
      }
      /* Météo intérieure : soupir, reniflement, petit « prout » de mouchoir */
      function sighSound(){
        if (!actx || muted) return;
        tone(actx.currentTime + 0.02, 320, 130, 0.55, 0.04, 'sine');
      }
      function sniffSound(){
        if (!actx || muted) return;
        var t = actx.currentTime + 0.02;
        tone(t, 300, 520, 0.11, 0.03, 'sine');
        tone(t + 0.2, 300, 520, 0.11, 0.03, 'sine');
      }
      function tootSound(){
        if (!actx || muted) return;
        var t = actx.currentTime + 0.02;
        tone(t, 170, 85, 0.32, 0.05, 'square');
        tone(t + 0.05, 150, 80, 0.3, 0.04, 'square');
      }
      /* Colère comique et brève — toujours contre SES affaires, jamais le visiteur */
      function doAngry(line, dur){
        setState('angry'); setExpr('angry'); busy(dur || 3000);
        if (line) showBubble(esc(line), dur || 3000, 'none');
      }
      /* Désespoir théâtral et bref : il s'assoit, soupire… puis repart */
      function doDespair(dur){
        setState('despair'); setExpr('sad'); busy(dur || 2400);
        catConsole();   // Pixel s'approche quand ça ne va pas
        sighSound();
        showBubble("Pffff…", dur || 2400, 'none');
      }
      /* Pleurs touchants et courts : larmes, mouchoir, et il se secoue */
      function doCry(then){
        setState('cry'); setExpr('sad'); busy(4700);
        catConsole();   // Pixel vient se coucher près de lui, sans un mot
        showBubble("Snif… snif…", 2200, 'none');
        setTimeout(sniffSound, 700);
        setTimeout(tootSound, 2500);
        setTimeout(function(){
          if (state !== 'cry') return;
          bot.classList.add('shakeoff');
          setExpr('happy');
          showBubble("Bon. Ça va mieux. On avance !", 2600, 'joke');
          setTimeout(function(){ bot.classList.remove('shakeoff'); }, 600);
        }, 3600);
        setTimeout(function(){
          if (state === 'cry'){ setState(reduced ? 'idle' : 'walk'); if (then) then(); }
        }, 4700);
      }

      /* ---------- Bulles ---------- */
      var lastBubbleAt = 0;
      function showBubble(html, dur, mood){
        bubble.innerHTML = html;
        bubble.classList.add('show');
        lastBubbleAt = Date.now();
        speak(plainText(html), mood || (state === 'sleep' ? 'sleep' : 'talk'));
        if (bubbleTimer) clearTimeout(bubbleTimer);
        if (dur) bubbleTimer = setTimeout(hideBubble, Math.max(dur, 8000)); // reco panneau : bulle ≥ ~8 s
      }
      function hideBubble(){
        bubble.classList.remove('show');
        if (bubbleTimer){ clearTimeout(bubbleTimer); bubbleTimer = null; }
      }
      function linkHtml(p){
        return '<br><a href="' + p.u + '" target="_blank" rel="noopener">' + esc(p.l) + ' →</a>';
      }

      /* ---------- Ses grognes signature (lot nº 3) ----------
         Quand quelque chose rate dans SA vie (recette ratée, chute, son
         serpent au jeu, surchauffe, boulon récalcitrant), il lâche une de
         ses deux phrases — alternées, ~1 fois sur 2, jamais deux fois
         rapprochées (≥ 90 s), toujours suivies de sa résilience. Jamais
         causées par le visiteur, jamais dirigées contre lui. */
      var grumbleIdx = 0, lastGrumbleAt = 0;
      function grumbleFires(){
        if (Date.now() - lastGrumbleAt < 90000) return false;
        if (Math.random() >= 0.5) return false;
        lastGrumbleAt = Date.now();
        return true;
      }
      function grumbleText(){
        var t = GRUMBLES[grumbleIdx % GRUMBLES.length]; grumbleIdx++;
        return t;
      }

      /* ---------- Parole : blagues, invitations, soir ---------- */
      function talk(){
        // Lot nº 3 : pendant la visite guidée, le bavardage ambiant se
        // tait — avec les textes longs de la visite tranquille, une
        // blague ou une ligne de saison écrasait le commentaire d'étape
        // en plein milieu (vu en fumée : blague à 9,7 s de l'étape 0).
        if (paused || isHidden || docHidden || qaOpen || calm || gameOn || tourOn || Date.now() < cornerUntil || state === 'sleep' || isBusy()) return;
        // Lot nº 3 — relais du dwell : sur une page produit regardée
        // longuement (≥ 40 s, avant son dodo de 50 s), le bavardage
        // ambiant cède sa place, UNE fois, au résumé argumenté de la
        // page (DWELL_SUGGESTIONS) plutôt qu'à une blague : la fenêtre
        // 40-50 s est courte et pleine de vie, le vérificateur du dwell
        // seul la manquait presque toujours (vu en fumées).
        var dp = DWELL_SUGGESTIONS[routeKey()];
        if (dp && Date.now() - dwellStart > 40000 && canSuggest(dp)){ doSuggest(dp); return; }
        if (isPresse() && Math.random() < 0.7) return;   // visiteur pressé : il se fait discret (lot nº 2)
        if (isNight() && Math.random() < 0.45){
          showBubble(esc(pick(EVENING_LINES)), 5200, 'sleep');
          alternate++;
          return;
        }
        if (Math.random() < COMPANION_EVERY){
          showBubble(esc(pick(COMPANION_LINES)), 5600, 'talk');
          alternate++;
          return;
        }
        var tr = Math.random();
        if (tr < 0.10){
          showBubble(esc(pick(HUGO_LINES)), 5600, 'talk');
          alternate++;
          return;
        }
        if (tr < 0.17){
          showBubble(pick(EMOJI_LINES), 4200, 'joke');
          alternate++;
          return;
        }
        if (tr < 0.23){
          shareReading('talk');   // un fait du Québec, une anecdote, une pensée — en cadeau
          alternate++;
          return;
        }
        if (tr < 0.28){
          showBubble(esc(pick(EMPATHY)), 7000, 'talk');   // beaucoup d'empathie, jamais de pitié
          alternate++;
          return;
        }
        if (isSensitiveRoute() && Math.random() < 0.6){
          // Route sensible (Sans Honte) : humour en sourdine, dignité d'abord.
          showBubble(esc(pick(EMPATHY)), 7000, 'talk');
          alternate++;
          return;
        }
        if (alternate % 2 === 0){
          showBubble(esc(JOKES[jokeIdx % JOKES.length]), 5200, 'joke'); jokeIdx++;
          logDay("raconté des blagues — j'en connais 62 !");
          alternate++;
        } else {
          // Reco nº 8 : plus d'invitations produit dans le bavardage —
          // elles naissent des vignettes. Ici : une deuxième blague.
          showBubble(esc(JOKES[jokeIdx % JOKES.length]), 5200, 'joke'); jokeIdx++;
          alternate++;
        }
      }
      function scheduleTalk(){
        if (talkTimer) clearTimeout(talkTimer);
        talkTimer = setTimeout(function(){
          talk();
          scheduleTalk();
        }, (isNight() ? 16000 : 11000) + Math.random()*5000);
      }

      /* ---------- Invitation : pancarte + bras qui pointe ---------- */
      function doInvite(p){
        if (paused || state === 'sleep' || isBusy()) { showBubble(esc(p.t) + (p.u ? linkHtml(p) : ''), 6000); return; }
        setState('invite'); setExpr('happy'); busy(5600);
        signText.textContent = p.s || 'PAR ICI →';
        showBubble(esc(p.t) + (p.u ? linkHtml(p) : ''), 6200);
        setTimeout(function(){
          if (state === 'invite') setState(reduced ? 'idle' : 'walk');
        }, 5600);
      }

      /* ---------- Salut ---------- */
      function doWave(line, dur){
        if (state === 'sleep' || paused || isBusy() || qaOpen) return;
        setState('wave'); setExpr('happy'); busy(2400);
        if (line) showBubble(Math.random() < 0.2 ? pick(EMOJI_LINES) : esc(line), dur || 3400);
        setTimeout(function(){
          if (state === 'wave') setState(reduced ? 'idle' : 'walk');
        }, 2400);
      }
      function scheduleWave(){
        if (waveTimer) clearTimeout(waveTimer);
        waveTimer = setTimeout(function(){
          if (!isBusy() && state !== 'sleep' && !tourOn) doWave(pick(WAVE_LINES));
          scheduleWave();
        }, 38000 + Math.random()*22000);
      }

      /* ---------- Étirement ---------- */
      function doStretch(line){
        if (paused || isBusy() || state === 'sleep') return;
        setState('stretch'); setExpr('happy'); busy(1500);
        if (line) showBubble(esc(line), 3600);
        setTimeout(function(){
          if (state === 'stretch') setState(reduced ? 'idle' : 'walk');
        }, 1500);
      }

      /* ---------- Bricolage ---------- */
      function doTinker(){
        if (state === 'sleep' || paused || isBusy() || isNight() || qaOpen) return;
        setState('tinker'); setExpr('focus'); busy(5200);
        showBubble(esc(pick(TINKER_LINES)), 4600);
        if (Math.random() < 0.2){
          setTimeout(function(){
            if (state !== 'tinker') return;
            doAngry(grumbleFires() ? grumbleText() + " Ce boulon-là ne veut RIEN savoir !" : "GRRR. Ce boulon-là ne veut RIEN savoir !", 2400);
            setTimeout(function(){
              if (state === 'angry'){ setState('tinker'); setExpr('focus'); }
            }, 2400);
          }, 1700);
        }
        setTimeout(function(){
          if (state === 'tinker'){ setExpr('happy'); endVignette(KIT_PITCHES, 0.45); }
        }, 5200);
      }
      /* ---------- Lecture : il s'installe avec un livre ---------- */
      var BOOK_TITLES = ["Horizon Québec", "La faim justifie les moyens"];
      function doRead(){
        if (state === 'sleep' || paused || isBusy() || qaOpen) return;
        bookTitle.textContent = pick(BOOK_TITLES);
        setState('read'); setExpr('happy'); busy(11000);
        logDay("lu un livre, lunettes de lecture sur le nez");
        setTimeout(function(){
          if (state !== 'read') return;
          if (Math.random() < 0.55){
            shareReading('none');   // lunettes sur le nez, il partage ce qu'il lit
          } else {
            setExpr('laugh'); giggle();
            showBubble("Hihi… ce passage-là, je l'adore.", 2600, 'none');
            setTimeout(function(){ if (state === 'read') setExpr('happy'); }, 1800);
          }
        }, 4800 + Math.random()*2200);
        setTimeout(function(){
          if (state !== 'read') return;
          if (Math.random() < 0.3){
            bot.classList.add('sleep-book');   // il s'endort sur son livre
            hideBubble(); setState('sleep'); setExpr('sleep');
          } else {
            setExpr('happy'); endVignette(BOOK_PITCHES, 0.6);
          }
        }, 11000);
      }

      /* ---------- Graffiti espiègle (rare) ---------- */
      function doGraffiti(){
        if (state === 'sleep' || paused || isBusy() || qaOpen || isNight()){ doWave(null); return; }
        graffiti.style.left = Math.min(Math.max(4, x - 30), Math.max(4, vw() - 216)) + 'px';
        setState('graffiti'); setExpr('focus'); busy(8200);
        showBubble("…personne ne regarde ?", 2400, 'question');
        setTimeout(function(){
          if (state !== 'graffiti') return;
          graffiti.hidden = false;
          requestAnimationFrame(function(){ graffiti.classList.add('show'); });
        }, 1400);
        setTimeout(function(){
          if (state !== 'graffiti') return;
          setExpr('happy');
          showBubble("Hihi… ni vu, ni connu !", 3000, 'joke');
        }, 4300);
        setTimeout(function(){
          if (state === 'graffiti') setState(reduced ? 'idle' : 'walk');
        }, 8200);
        setTimeout(function(){
          graffiti.classList.remove('show');
          setTimeout(function(){ graffiti.hidden = true; }, 1500);
        }, 26000);
      }
      function caughtGraffiti(){
        lastInteract = Date.now();
        setState('caught'); setExpr('wide'); busy(3200);
        showBubble("Moi ? Non non, je regardais le mur.", 3400, 'question');
        setTimeout(function(){
          if (state === 'caught'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 3200);
      }

      /* ---------- Perché sur un bloc ---------- */
      function doPerch(){
        if (state === 'sleep' || paused || isBusy() || qaOpen) return;
        bot.style.bottom = '158px';
        setState('idle'); setExpr('happy'); busy(9000);
        showBubble("De là-haut, je vois tout le site !", 3200);
        setTimeout(function(){
          bot.style.bottom = '8px';
          if (state === 'idle'){ endVignette(ATELIER_PITCHES, 0.35); }
        }, 9000);
      }

      /* ---------- Coucou depuis le coin ---------- */
      function doPeek(){
        if (state === 'sleep' || paused || isBusy() || qaOpen || reduced) return;
        setState('idle'); setExpr('happy'); busy(4400);
        bot.classList.remove('nosmooth');
        bot.style.transition = 'transform .7s ease';
        x = -104; place();
        setTimeout(function(){
          x = 26; place();
          setTimeout(function(){
            bot.style.transition = '';
            busyUntil = 0;
            doWave("Coucou ! Je suis là !");
          }, 760);
        }, 2500);
      }

      /* ---------- Seau d'eau froide ---------- */
      function splashSound(){
        if (!actx || muted) return;
        var t = actx.currentTime + 0.02;
        tone(t, 520, 90, 0.35, 0.05, 'triangle');
        for (var i=0;i<7;i++) tone(t + 0.05 + i*0.055, 300 + Math.random()*220, 120, 0.12, 0.035, 'sine');
      }
      function doBucket(){
        ensureAudio();
        engage();
        lastInteract = Date.now();
        if (isHidden || paused) return;
        bot.classList.remove('sleep-book');
        bot.classList.add('dripping');
        setTimeout(function(){ bot.classList.remove('dripping'); }, 7000);
        var wasHot = (heat > 40 || state === 'hot'); heat = 0;
        setState('wet'); setExpr('wide'); busy(3800);
        splashSound();
        spawnBurst(['●','◆'], 9, 'water');
        showBubble(esc(wasHot ? "Ahhh, merci ! Ça, ça refroidit un robot !" : pick(BUCKET_LINES)), 3800, 'question');
        if (wasHot) spawnBurst(['≈','○','≈'], 8, 'water');
        setTimeout(function(){
          if (state === 'wet'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 3800);
      }

      /* ---------- Skate : il roule, saute, tombe, se relève ---------- */
      function doSkate(){
        if (state === 'sleep' || paused || isBusy() || qaOpen || reduced) return;
        setState('skate'); setExpr('happy'); busy(9500);
        showBubble("Attache ta tuque, je roule !", 2600);
        setTimeout(function(){
          if (state !== 'skate') return;
          bot.classList.add('ollie');
          setTimeout(function(){ bot.classList.remove('ollie'); }, 600);
        }, 3200);
        if (Math.random() < 0.45){
          setTimeout(function(){
            if (state !== 'skate') return;
            setState('fallen'); setExpr('wide');
            var chute = function(){
              if (state !== 'fallen') return;
              showBubble(Math.random() < 0.5 ? "Même pas mal." : "Même pas mal — on avance !", 2600, 'none');
              setTimeout(function(){ if (state === 'fallen') setExpr('happy'); }, 1300);
            };
            // Lot nº 3 : sa grogne signature peut sortir d'abord (~1 fois
            // sur 2, sa chute à lui) — puis la résilience, comme toujours.
            if (grumbleFires()){ setExpr('angry'); showBubble(esc(grumbleText()), 1500, 'none'); setTimeout(chute, 1500); }
            else chute();
          }, 6400);
        }
        setTimeout(function(){
          if (state === 'skate' || state === 'fallen'){
            setExpr('happy'); setState(reduced ? 'idle' : 'walk');
          }
        }, 9500);
      }

      /* ---------- Lutteur : poses fanfaronnes, zéro violence ---------- */
      function doWrestler(){
        if (state === 'sleep' || paused || isBusy() || qaOpen) return;
        setState('wrestler'); setExpr('focus'); busy(6600);
        showBubble("Le champion des petits budgets !", 3200, 'joke');
        setTimeout(function(){
          if (state !== 'wrestler') return;
          setExpr('laugh');
          showBubble("Ceinture d'or… trouvée en spécial, évidemment.", 2800, 'joke');
        }, 3600);
        setTimeout(function(){
          if (state === 'wrestler'){
            setExpr('happy');
            endVignette(GAME_PITCHES, 0.4);
          }
        }, 6600);
      }

      /* ---------- Mime : un moment silencieux ---------- */
      function doMime(){
        if (state === 'sleep' || paused || isBusy() || qaOpen) return;
        setState('mime'); setExpr('focus'); busy(9200);
        showBubble("*palpe le mur invisible*", 2800, 'none');
        setTimeout(function(){
          if (state === 'mime') showBubble("*pris dans une boîte…*", 2800, 'none');
        }, 3000);
        setTimeout(function(){
          if (state !== 'mime') return;
          setExpr('happy');
          showBubble("*tire une corde imaginaire* …et il salue bien bas.", 3000, 'none');
        }, 6100);
        setTimeout(function(){
          if (state === 'mime'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 9200);
      }

      /* ---------- Cuisine ratée : il rit de lui-même ---------- */
      function coughSound(){
        if (!actx || muted) return;
        var t = actx.currentTime + 0.02;
        tone(t, 190, 120, 0.14, 0.05, 'square');
        tone(t + 0.22, 180, 110, 0.16, 0.05, 'square');
      }
      function doCookFail(){
        if (state === 'sleep' || paused || isBusy() || isNight() || qaOpen) return;
        // Lot nº 3 : ~1 fois sur 2, sa grogne signature s'insère entre la
        // fumée et le désespoir (la recette ratée, c'est SA vie — jamais
        // le visiteur), puis la résilience reprend la chaîne, décalée
        // d'autant. Jamais deux grognes dans la même séquence.
        var gFail = grumbleFires() ? grumbleText() : null;
        var extra = gFail ? 1900 : 0;
        setState('cookfail'); setExpr('focus'); busy(9800 + extra);
        showBubble("Ça mijote… ça mijote… hein, ça sent quoi, ça ?", 3200, 'question');
        setTimeout(function(){
          if (state !== 'cookfail') return;
          setExpr('wide'); coughSound();
          showBubble("Kof kof…", 1600, 'none');
        }, 3400);
        if (gFail){
          setTimeout(function(){
            if (state !== 'cookfail') return;
            setExpr('angry');
            showBubble(esc(gFail), 1700, 'none');
          }, 4700);
        }
        setTimeout(function(){
          if (state !== 'cookfail') return;
          doDespair(2100);   // il s'assoit, gros soupir — puis il rit de lui-même
        }, 4600 + extra);
        setTimeout(function(){
          if (state !== 'despair' && state !== 'cookfail') return;
          setState('cookfail'); setExpr('laugh'); giggle();
          showBubble(esc("Celle-là, je l'ai ratée solide… Toi, va voir les 629 recettes, elles sont pas mal plus faciles !") +
            linkHtml({ u:"https://hp-outils.com/en-cuisine/", l:"Voir les recettes" }), 3400, 'joke');
        }, 6900 + extra);
        setTimeout(function(){
          if (state === 'cookfail'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 9800 + extra);
      }

      /* ---------- Gérant du site : il le tient beau ---------- */
      function doJanitor(){
        if (state === 'sleep' || paused || isBusy() || qaOpen) return;
        var j = pick(JANITOR);
        setState(j.st); setExpr('focus'); busy(5600);
        showBubble(esc(j.t), 4800);
        setTimeout(function(){
          if (state === j.st){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 5600);
      }

      /* ---------- Petit défaut humain : il se décrotte le nez, peinard ---------- */
      function whistleSound(){
        if (!actx || muted) return;
        var t = actx.currentTime + 0.02;
        tone(t, 880, 990, 0.16, 0.03, 'sine');
        tone(t + 0.2, 990, 880, 0.16, 0.03, 'sine');
        tone(t + 0.42, 880, 990, 0.22, 0.028, 'sine');
      }
      function doNosePick(){
        if (state === 'sleep' || paused || isBusy() || qaOpen) return;
        if (Date.now() - lastInteract < 20000){ doWave(null); return; }
        setState('nosepick'); setExpr('happy'); busy(9000);
        setTimeout(function(){
          if (state === 'nosepick'){ setState(reduced ? 'idle' : 'walk'); }
        }, 9000);
      }
      function caughtPick(){
        lastInteract = Date.now();
        setState('caughtpick'); setExpr('wide'); busy(3400);
        whistleSound();
        showBubble("🎵 …moi ? Je sifflais en regardant le paysage. Rien d'autre.", 3400, 'none');
        setTimeout(function(){
          if (state === 'caughtpick'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 3400);
      }
      var lastMouseX = null;
      document.addEventListener('pointermove', function(e){
        if (state !== 'nosepick') return;
        if (lastMouseX === null){ lastMouseX = e.clientX; return; }
        if (Math.abs(e.clientX - lastMouseX) > 26){ lastMouseX = null; caughtPick(); }
      }, { passive:true });

      /* ---------- Tapotage rapide : il tombe, puis « On avance ! » ---------- */
      var tapTimes = [];
      function doTumble(){
        setState('tumble'); setExpr('wide'); busy(3600);
        showBubble("Ouille ouille…", 1400, 'none');
        setTimeout(function(){
          if (state !== 'tumble') return;
          setExpr('laugh'); giggle();
          showBubble("Même pas mal — on avance !", 2600, 'joke');
        }, 2100);
        setTimeout(function(){
          if (state === 'tumble'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 3600);
      }

      /* ---------- Frottement : il surchauffe ; le seau d'eau le refroidit ---------- */
      var heat = 0, lastRub = null;
      function doHeat(){
        setState('hot'); setExpr('wide'); busy(5600);
        // Lot nº 3 : la surchauffe, c'est SON état à lui — sa grogne
        // signature peut sortir d'abord (~1 fois sur 2), la ligne
        // normale suit juste après.
        var gHeat = grumbleFires() ? grumbleText() : null;
        if (gHeat){
          showBubble(esc(gHeat), 1500, 'none');
          setTimeout(function(){
            if (state === 'hot') showBubble("Ouf ! Tu me frottes tellement que je surchauffe ! Un petit seau d'eau, peut-être ?", 2600, 'question');
          }, 1600);
        } else {
          showBubble("Ouf ! Tu me frottes tellement que je surchauffe ! Un petit seau d'eau, peut-être ?", 4200, 'question');
        }
        setTimeout(function(){
          if (state === 'hot' && heat < 40){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 5600);
      }
      bot.addEventListener('pointermove', function(e){
        if (state === 'sleep' || paused || gameOn) return;
        if (!e.buttons && e.pointerType === 'mouse') return;
        var now = Date.now();
        if (lastRub && now - lastRub.t < 120){
          var d = Math.abs(e.clientX - lastRub.x) + Math.abs(e.clientY - lastRub.y);
          heat = Math.min(100, heat + d * 0.55);
        }
        lastRub = { t: now, x: e.clientX, y: e.clientY };
        if (heat > 62 && state !== 'hot' && !isBusy()) doHeat();
      });
      setInterval(function(){
        heat = Math.max(0, heat - 4);
        if (state === 'hot' && heat < 25){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
      }, 1200);

      /* ---------- L'horaire de sa vie : varié et imprévisible ---------- */
      function scheduleLife(){
        if (lifeTimer) clearTimeout(lifeTimer);
        lifeTimer = setTimeout(function(){
          // Lot nº 3 : pas de vignette pendant la visite guidée (elle
          // volerait la bulle et le pas du guide).
          if (!paused && !isHidden && !docHidden && !qaOpen && !calm && !gameOn && !tourOn && state !== 'sleep' && !isBusy()){
            if (isPresse() && Math.random() < 0.5){
              // Visiteur pressé : on saute la vignette, il reste tranquille.
            } else {
              var r = Math.random();
              var sensible = isSensitiveRoute();
              if (r < 0.16) doTinker();
              else if (r < 0.32) (Math.random() < 0.35 ? doCookFail() : doCook());
              else if (r < 0.44) doRead();
              else if (r < 0.52) doWrestler();
              else if (r < 0.59) doMime();
              else if (r < 0.66) doSkate();
              else if (r < 0.72) doPerch();
              else if (r < 0.78) doPeek();
              else if (r < 0.86) doJanitor();
              else if (r < 0.90) doHum();
              else if (r < 0.95) (sensible ? doJanitor() : doNosePick());
              else if (r < 0.98 && seasonDecorKind()) doDecor();
              else (sensible ? doHum() : doGraffiti());
            }
          }
          scheduleLife();
        }, 20000 + Math.random()*22000);
      }

      /* ---------- Cuisine : il se fait à manger ---------- */
      function mealForNow(){
        var h = new Date().getHours();
        if (h < 11) return { when:"Ce matin", meal:pick(MEALS.matin) };
        if (h < 16) return { when:"Ce midi", meal:pick(MEALS.midi) };
        return { when:"Ce soir", meal:pick(MEALS.soir) };
      }
      function doCook(){
        if (state === 'sleep' || paused || isBusy() || isNight() || qaOpen) return;
        setState('cook'); setExpr('focus'); busy(8200);
        var m = mealForNow();
        logDay("cuisiné " + m.meal + " (un de mes 3 repas du jour, tirés des Recettes)");
        showBubble(esc(m.when + " : " + m.meal + " — une des 629 idées de l'outil Recettes. Toi aussi, tape tes ingrédients !") + linkHtml({ u:"https://hp-outils.com/en-cuisine/", l:"Ouvrir Recettes HP" }), 5200);
        setTimeout(function(){
          if (state === 'cook'){ setExpr('happy'); showBubble(esc(COOK_TASTE), 3000); }
        }, 4600);
        setTimeout(function(){
          if (state === 'cook'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 8200);
      }
      /* ---------- Sieste ---------- */
      function goSleep(){
        if (paused || isBusy() || state === 'sleep') return;
        logDay("fait une sieste pour recharger mes gentillesses");
        catNapTogether();   // si Pixel est là, la sieste peut devenir une sieste à deux
        if (isNight()){
          setState('yawn'); setExpr('yawn'); busy(3000);
          showBubble(esc(YAWN_LINE), 2800, 'none');
          yawnSound();
          setTimeout(function(){
            if (!paused && state !== 'sleep'){ hideBubble(); setState('sleep'); setExpr('sleep'); }
          }, 3000);
        } else {
          hideBubble();
          setState('sleep'); setExpr('sleep');
        }
      }
      function wake(startled){
        if (state !== 'sleep') return;
        bot.classList.remove('sleep-book');
        if (catVisible && catState === 'sleep'){
          setTimeout(function(){ if (catState === 'sleep') setCatState('idle'); }, 900);
        }
        lastInteract = Date.now();
        if (startled){
          setState('startle'); setExpr('wide'); busy(1600);
          showBubble(esc(pick(STARTLE_LINES)), 3200);
          spawnBurst(['!','✦'], 4);
          setTimeout(function(){
            if (state === 'startle'){ setExpr('happy'); busyUntil = 0; doWave(null); }
          }, 900);
        } else {
          setExpr('happy'); setState(reduced ? 'idle' : 'walk');
        }
      }
      setInterval(function(){
        if (paused || isHidden || docHidden || qaOpen || gameOn) return;
        var idleFor = Date.now() - lastInteract;
        var threshold = isNight() ? 22000 : 50000;   // la nuit, il s'endort vite
        if (state !== 'sleep' && idleFor > threshold && !isBusy()){
          goSleep();
        } else if (state === 'sleep'){
          snore();
          if (Math.random() < 0.25) showBubble(esc(pick(SLEEP_LINES)), 4200, 'sleep');
        }
        if (cornerUntil && Date.now() > cornerUntil && state === 'idle' && !paused && !qaOpen && !calm && !gameOn){
          cornerUntil = 0;
          setState(reduced ? 'idle' : 'walk');
        }
        // Nuit profonde (0 h – 5 h) : une fois par session, il suggère le
        // repos, en douceur — le confort du visiteur, jamais de rétention.
        if (!restSaid){
          var hh = new Date().getHours();
          if (hh >= 0 && hh < 5 && state !== 'sleep' && !isBusy()){
            restSaid = true;
            showBubble("Il est très tard… le site sera encore là demain. Repose-toi bien — moi, je veille en dormant.", 8000, 'sleep');
          }
        }
      }, 4000);

      /* ---------- Changement jour / nuit pendant la visite ---------- */
      setInterval(function(){
        var n = isNight();
        if (n === wasNight) return;
        wasNight = n;
        applyPeriod();
        if (!n){
          if (state === 'sleep') wake(false);
          busyUntil = 0;
          doStretch(MORNING_LINE);
        } else if (state !== 'sleep' && !paused){
          showBubble(esc(NIGHTFALL_LINE), 4200);
        }
      }, 30000);

      /* Il grandit un peu quand on interagit avec lui (reco nº 7). */
      var bigTimer = null;
      function engage(){
        if (calm) return;
        bot.classList.add('big');
        if (bigTimer) clearTimeout(bigTimer);
        bigTimer = setTimeout(function(){ bot.classList.remove('big'); place(); }, 6000);
        place();
      }
      /* Zone de retrait : si le visiteur utilise la page, il va s'asseoir
         sagement dans son coin (reco nº 7). */
      function goCorner(){
        if (calm || qaOpen || gameOn || state === 'sleep') return;
        if (isBusy() && state !== 'walk' && state !== 'idle') return;
        cornerUntil = Date.now() + 20000;
        hideBubble();
        setState('idle'); setExpr('happy');
        bot.classList.remove('nosmooth');
        bot.style.transition = 'transform .8s ease';
        x = maxX(); place();
        setTimeout(function(){ bot.style.transition = ''; }, 850);
      }

      /* ---------- Chatouille ---------- */
      function spawnBurst(chars, n, cls){
        if (reduced) return;
        var count = n || 5;
        for (var i=0;i<count;i++){
          var s = document.createElement('i');
          if (cls) s.className = cls;
          s.textContent = chars[Math.floor(Math.random()*chars.length)];
          var ang = Math.random()*Math.PI - Math.PI;
          var dist = 42 + Math.random()*36;
          s.style.left = (56 + Math.random()*38) + 'px';
          s.style.top = (2 + Math.random()*26) + 'px';
          s.style.fontSize = (15 + Math.random()*11) + 'px';
          s.style.setProperty('--dx', Math.round(Math.cos(ang)*dist) + 'px');
          s.style.setProperty('--dy', Math.round(-Math.abs(Math.sin(ang))*dist - 18) + 'px');
          s.style.setProperty('--rot', Math.round(Math.random()*70-35) + 'deg');
          burst.appendChild(s);
          (function(el){ setTimeout(function(){ el.remove(); }, 1050); })(s);
        }
      }
      /* « Minute ! J't'en pause. » : touché pendant qu'il est occupé, il se
         fige théâtralement, le dit… puis il reprend exactement où il était.
         Dosé : parfois seulement, jamais systématique. */
      function pauseLine(){
        lastInteract = Date.now();
        if (bot.classList.contains('frozen')) return;
        bot.classList.add('frozen');
        var keep = bubble.innerHTML;
        showBubble("Minute ! J't'en pause ! 😄", 1900, 'none');
        setTimeout(function(){
          bot.classList.remove('frozen');
          if (keep && state !== 'sleep'){ bubble.innerHTML = keep; bubble.classList.add('show'); }
        }, 1950);
      }
      var BUSY_VIGNETTES = ['read','cook','cookfail','tinker','mime','wrestler','fix','dust','sweep','janitor'];
      function tickle(){
        lastInteract = Date.now();
        engage();
        if (paused || isHidden) return;
        if (state === 'nosepick'){ caughtPick(); return; }
        if (state === 'sleep'){ wake(true); return; }
        if (state === 'graffiti'){ caughtGraffiti(); return; }
        if (gameOn && Math.random() < 0.5){ pauseLine(); return; }
        if (isBusy() && BUSY_VIGNETTES.indexOf(state) !== -1 && Math.random() < 0.55){ pauseLine(); return; }
        var nowTap = Date.now();
        tapTimes = tapTimes.filter(function(t){ return nowTap - t < 1600; });
        tapTimes.push(nowTap);
        if (tapTimes.length >= 5){ tapTimes = []; doTumble(); return; }
        var wasTinker = (state === 'tinker');
        var wasCook = (state === 'cook');
        tickleCombo++;
        if (tickleTimer) clearTimeout(tickleTimer);
        tickleTimer = setTimeout(function(){ tickleCombo = 0; }, 2600);
        var big = tickleCombo >= 3;
        setState(big ? 'tickle-big' : 'tickle');
        setExpr('laugh');
        busy(big ? 2400 : 1700);
        var line = big ? TICKLE_BIG
          : (wasTinker ? "Hihi ! Attention, je bricole… enfin, je bricolais !"
          : (wasCook ? "Hihi ! Doucement, ma soupe va renverser de rire !" : pick(TICKLE_LINES)));
        showBubble(esc(line), big ? 3600 : 2800, 'none');
        giggle();
        spawnBurst(['♥','✦','♥','✧'], big ? 9 : 5);
        setTimeout(function(){
          if (state === 'tickle' || state === 'tickle-big'){
            setExpr('happy'); setState(reduced ? 'idle' : 'walk');
          }
        }, big ? 2400 : 1700);
      }
      bot.addEventListener('pointerdown', function(ev){
        if (ev.target.closest && ev.target.closest('a')) return;
        ev.preventDefault();
        tickle();
      });
      bot.addEventListener('keydown', function(ev){
        if (ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); tickle(); }
      });
      bot.addEventListener('click', function(ev){
        if (ev.target.closest && ev.target.closest('a')) return;
        ev.preventDefault();
      });

      /* ---------- Activité du visiteur ---------- */
      ['pointerdown','keydown','scroll','touchstart'].forEach(function(evt){
        document.addEventListener(evt, function(ev){
          ensureAudio();
          lastInteract = Date.now();
          if (evt === 'pointerdown' && ev.target.closest && ev.target.closest('main, header, footer')){
            goCorner();
          }
          if (state === 'sleep' && !(ev.target.closest && ev.target.closest('#bot'))){
            wake(false);
          }
        }, { passive:true });
      });

      /* ---------- Déplacement ---------- */
      var lastTs = null;
      function frame(ts){
        requestAnimationFrame(frame);
        if (lastTs === null){ lastTs = ts; return; }
        var dt = Math.min(0.05, (ts - lastTs)/1000); lastTs = ts;
        if (docHidden || paused || isHidden) return;
        if (guideTarget !== null && !gameOn && state !== 'sleep' && !calm){
          var dxg = guideTarget - x;
          if (Math.abs(dxg) < 9){ guideTarget = null; }
          else {
            x += (dxg > 0 ? 1 : -1) * speed * 1.8 * dt;
            x = clampX(x);
            bot.classList.add('nosmooth');
            place();
          }
        } else if ((state === 'walk' || state === 'skate') && !reduced && !calm && !gameOn){
          var sp = state === 'skate' ? speed * 3.4 : speed;
          x += dir * sp * dt;
          if (x <= minX()){ x = minX(); dir = 1; }
          if (x >= maxX()){ x = maxX(); dir = -1; }
          bot.classList.add('nosmooth');
          place();
        }
        /* Pixel se déplace : suivre, courir, zoomies, partir */
        if (catVisible && !docHidden){
          if (catTarget !== null){
            var cdx = catTarget - catX;
            if (Math.abs(cdx) < 7){
              catX = catTarget; catTarget = null;
              var ccb = catArrive; catArrive = null;
              if (catState === 'walk' || catState === 'zoom') setCatState('idle');
              if (ccb) ccb();
            } else {
              catX += (cdx > 0 ? 1 : -1) * catSpeed * dt;
              catEl.classList.toggle('face-l', cdx < 0);
              if (catState !== 'rub' && catState !== 'eat' && catState !== 'sleep' &&
                  catState !== 'console' && catState !== 'purr' && catState !== 'stare'){
                setCatState(catSpeed > 300 ? 'zoom' : 'walk');
              }
              catPlace();
            }
          } else if (catMode === 'follow' && catState !== 'sleep' && catState !== 'console'){
            var want = catBesideX();
            if (Math.abs(want - catX) > 30) catGo(want, 68, catArrivedFollow);
          }
        }
      }

      /* ---------- BASE DE FAITS (étage 1 du cerveau) ----------
         Source unique de vérité d'HGPTO : sur le vrai site, cette structure est
         régénérée à chaque dépôt depuis les données du catalogue — c'est pour ça
         qu'il est toujours à jour et qu'il ne peut pas inventer un prix.
         Étage 2 : la recherche par mots-clés ci-dessous. Étage 3 (IA en laisse
         courte, réponses formulées à partir de ces seuls faits) : phase site. */

      /* ---------- Mode questions ---------- */
      var qaOpen = false;
      function openQA(){
        ensureAudio();
        qaOpen = true;
        qaPanel.hidden = false;
        if (catVisible && catState !== 'sleep' && catState !== 'console') catLeave();
        lastInteract = Date.now();
        if (state === 'sleep') wake(false);
        if (paused){ paused = false; btnPause.textContent = 'Repose-toi'; btnPause.setAttribute('aria-pressed','false'); }
        setState('idle'); setExpr('focus'); busy(1200);
        showBubble("Gérant du site, à ton service ! Touche une question ci-dessous — je réponds avec les vraies infos, promis.", 6000, 'question');
      }
      function closeQA(){
        qaOpen = false;
        qaPanel.hidden = true;
        if (!paused){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
      }
      function answerQuestion(item, opts){
        lastInteract = Date.now();
        engage();
        setExpr('happy');
        if (item.fn === 'journal'){ showBubble(esc(journalText()), 11000, 'answer'); return; }
        if (item.fn === 'fact'){ var r1 = nextReading(); showBubble(esc("J'ai lu ça, écoute : " + pick(QC_HISTORY)), 11000, 'answer'); logDay("raconté un fait d'histoire du Québec"); return; }
        if (item.fn === 'philo'){ showBubble(esc(pick(PHILO)), 11000, 'answer'); return; }
        if (item.fn === 'anecdote'){ showBubble(esc("J'ai lu ça tantôt : " + pick(ANECDOTES)), 11000, 'answer'); return; }
        if (item.fn === 'empathy'){ showBubble(esc(pick(EMPATHY)), 11000, 'answer'); return; }
        if (item.fn === 'tour'){ startTour(); return; }
        if (item.fn === 'pixel'){ showBubble(esc(PIXEL_STORY), 11000, 'answer'); summonCat('follow'); return; }
        if (item.fn === 'feed'){ closeQA(); doFeedCat(); return; }
        if (item.fn === 'choix'){ closeQA(); busyUntil = 0; lastBubbleAt = 0; doChoix(true); return; }
        if (item.fn === 'choisir'){
          showBubble(esc("On y va doucement, par étapes — écoute ton besoin d'abord : jouer (c'est gratuit), cuisiner (629 recettes gratuites), ou t'organiser le quotidien (les kits, 5 $ chacun, 15 thèmes). Et si la réponse, c'est « rien pour l'instant », c'est bien correct aussi : je reste là, sans pousser.") +
            linkHtml({ u:"https://hp-outils.com/jeux", l:"Commencer par les jeux gratuits" }), 12000, 'answer');
          return;
        }
        var text = item.a || pick(JOKES);
        var html = esc(text);
        if (item.u) html += linkHtml({ u:item.u, l:item.l });
        if (opts && opts.doux) html += '<br>' + esc(pick(ETHIQUE_LINES));
        if (item.s){
          signText.textContent = item.s;
          setState('invite'); busy(3400);
          setTimeout(function(){ if (qaOpen && state === 'invite') setState('idle'); }, 3400);
        }
        showBubble(html, 11000, 'answer');
        if (item.go) guideTo(item.go, null);
        // Lot nº 3 — réponses clients renforcées : l'intérêt pour les
        // kits est compté (au 2e intérêt, le calcul honnête du bundle
        // suit) ; après une réponse « produit payant », l'alternative
        // gratuite peut suivre. Tout passe par les plafonds du système
        // de suggestions ; jamais après la sortie « doux », qui est déjà
        // la porte de sortie honnête.
        if (item.u && !item.fn && !item.go && !(opts && opts.doux)){
          if (/sans-honte/.test(item.u)){
            kitInterest++;
            if (kitInterest === 2) scheduleBundle();
            else scheduleAlt('kits');
          }
          else if (/livres-pdf/.test(item.u)) scheduleAlt('livres');
          else if (/ateliers/.test(item.u)) scheduleAlt('ateliers');
        }
      }

      /* ---------- Questions tapées : recherche dans la base de faits ----------
         Mots-clés + synonymes, réponse exacte de la base seulement. Aucune
         réponse hors base : repli courriel + consignation « Pour Hugo »
         (mémoire de session seulement, aucune donnée personnelle). */
      var unanswered = [];
      function normText(s){
        return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,' ');
      }
      function tokenHit(tokens, w){
        for (var i = 0; i < tokens.length; i++){
          if (tokens[i] === w) return true;
          if (w.length >= 5 && tokens[i].indexOf(w) === 0) return true;   // pluriels et formes longues
        }
        return false;
      }
      function searchKB(query){
        var words = normText(query).split(/\s+/).filter(function(w){ return w.length > 2 && !STOPWORDS[w]; });
        var best = null, bestScore = 0;
        KB.forEach(function(item){
          if (item.fn === 'tour') return;
          var qToks = normText(item.q + ' ' + (item.s || '')).split(/\s+/);
          var aToks = normText(item.a || '').split(/\s+/);
          var score = 0;
          words.forEach(function(w){
            var ww = SYNONYMS[w] || w;
            if (tokenHit(qToks, ww)) score += 2;
            else if (tokenHit(aToks, ww)) score += 1;
          });
          if (score > bestScore){ bestScore = score; best = item; }
        });
        return bestScore >= 2 ? best : null;
      }
      function renderUnanswered(){
        var box = document.getElementById('qa-hugo');
        var list = document.getElementById('qa-hugo-list');
        if (!box || !list) return;   // visiteur ordinaire : section absente du DOM, la consignation continue
        if (!unanswered.length){ box.hidden = true; return; }
        box.hidden = false;
        list.innerHTML = '';
        unanswered.forEach(function(q){
          var li = document.createElement('li');
          li.textContent = q;
          list.appendChild(li);
        });
      }
      document.getElementById('qa-form').addEventListener('submit', function(ev){
        ev.preventDefault();
        var input = document.getElementById('qa-input');
        var q = (input.value || '').trim();
        if (!q) return;
        input.value = '';
        lastInteract = Date.now();
        // Phrase du concept TAPÉE : « HGPTO, joue avec moi » (ou juste
        // « joue avec moi », ponctuation et casse libres) — interceptée
        // AVANT la recherche dans la base et branchée sur le même point
        // d'entrée que le bouton qa-play (décision d'Hugo, 22 oct. 2026).
        var mots = ' ' + normText(q).replace(/\s+/g, ' ').trim() + ' ';
        if (mots.indexOf(' joue avec moi ') !== -1){ startGame(); return; }
        var hit = searchKB(q);
        if (hit){
          // Savoir-vendre éthique : si la question sent l'hésitation ou la
          // comparaison et que la réponse parle d'un produit, on ajoute la
          // sortie facile — jamais de pression (lot nº 2).
          var nq = normText(q);
          var hesite = /(hesit|compar|lequel|laquelle|choisir|difference|mieux|pas sur|sais pas|vaut|trop cher)/.test(nq);
          var produit = hit.u && /(sans-honte|livres-pdf|ateliers)/.test(hit.u);
          answerQuestion(hit, (hesite && produit) ? { doux:true } : undefined);
          // Lot nº 3 : si la question exprime un besoin clair relié à un
          // produit réel et que la réponse n'en parle pas déjà, une
          // suggestion argumentée peut suivre (plafonds du système ;
          // jamais si la sortie « doux » a été ajoutée, jamais pour une
          // fonction spéciale, jamais juste après le calcul du bundle).
          if (!(hesite && produit) && !hit.fn && !hit.go){
            var bsn = matchBesoin(q);
            if (bsn && normText(hit.a || '').indexOf(bsn.dejaVu) === -1 && Date.now() - lastBundleSchedAt > 2000){
              setTimeout(function(){ doSuggest(bsn, { fromQA:true }); }, 9800);
            }
          }
          return;
        }
        // Lot nº 3 : aucune réponse exacte, mais un besoin clair relié à
        // un produit réel → il pointe LE produit qui fait ça, honnêtement
        // (« c'est celui-là qui fait ça » + lien + prix vrai). Si le
        // système de suggestions refuse (déjà suggéré, refusé par
        // « Non merci », plafond de page), le repli honnête classique
        // prend le relais ci-dessous — jamais de silence, jamais de force.
        var bsnDirect = matchBesoin(q);
        if (bsnDirect && doSuggest(bsnDirect, { fromQA:true })){
          if (unanswered.indexOf(q) === -1){ unanswered.push(q); renderUnanswered(); }
          return;
        }
        if (unanswered.indexOf(q) === -1){ unanswered.push(q); renderUnanswered(); }
        setExpr('happy');
        showBubble(esc(FALLBACK) + linkHtml({ u:"mailto:hpoutils.admin@gmail.com", l:"Écrire à Hugo" }), 11000, 'answer');
      });
      KB.forEach(function(item){
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = item.q;
        b.addEventListener('click', function(){ answerQuestion(item); });
        qaChips.appendChild(b);
      });
      btnAsk.addEventListener('click', function(){ qaOpen ? closeQA() : openQA(); });
      qaClose.addEventListener('click', closeQA);
      btnTickle.addEventListener('click', function(){ ensureAudio(); tickle(); });
      btnBucket.addEventListener('click', doBucket);

      /* ---------- Garde-robe météo (prototype : saison déduite de la date,
         ou tenue choisie dans le sélecteur pour prévisualiser) ---------- */
      function seasonOutfit(){
        var m = new Date().getMonth();
        if (m === 11 || m <= 1) return 'froid';
        if (m >= 5 && m <= 7) return 'chaud';
        if (m >= 8 && m <= 10) return 'pluie';
        return 'doux';
      }
      function applyOutfit(v){
        bot.setAttribute('data-outfit', v === 'auto' ? seasonOutfit() : v);
      }
      selWeather.addEventListener('change', function(){ applyOutfit(selWeather.value); });
      applyOutfit('auto');
      btnSound.addEventListener('click', function(){
        muted = !muted;
        btnSound.textContent = muted ? 'Son : non' : 'Son : oui';
        btnSound.setAttribute('aria-pressed', muted ? 'false' : 'true');
        if (!muted){ ensureAudio(); giggle(); }
      });

      /* ---------- Scène des 2 heures : il suggère une pause, en riant, une fois ---------- */
      var pageStart = Date.now(), twoHoursDone = false;
      function doTwoHours(){
        if (twoHoursDone || paused || isHidden) return;
        twoHoursDone = true;
        if (state === 'sleep') wake(false);
        busyUntil = 0;
        setState('wave'); setExpr('laugh'); busy(3200);
        giggle();
        showBubble("Fait 2h t'es là — ferme ça, va prendre l'air ! Je t'attends demain.", 7000, 'joke');
        setTimeout(function(){
          if (state === 'wave'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 3200);
      }
      function previewTwoHours(){
        var keep = twoHoursDone;
        twoHoursDone = false;
        doTwoHours();
        twoHoursDone = keep;
      }
      setInterval(function(){
        if (!twoHoursDone && !docHidden && Date.now() - pageStart >= TWO_HOURS_MS) doTwoHours();
      }, 30000);
      document.getElementById('qa-2h').addEventListener('click', previewTwoHours);

      /* ---------- Contrôles ---------- */
      btnPause.addEventListener('click', function(){
        paused = !paused;
        btnPause.textContent = paused ? 'Réveille-toi' : 'Repose-toi';
        btnPause.setAttribute('aria-pressed', paused ? 'true' : 'false');
        if (paused){
          hideBubble();
          if (state !== 'sleep'){ setState('idle'); setExpr('happy'); }
        } else {
          lastInteract = Date.now();
          setState(reduced ? 'idle' : 'walk'); setExpr('happy');
        }
      });
      btnCalm.addEventListener('click', function(){
        calm = !calm;
        bot.classList.toggle('calm', calm);
        btnCalm.textContent = calm ? 'Mode normal' : 'Mode calme';
        btnCalm.setAttribute('aria-pressed', calm ? 'true' : 'false');
        if (calm){
          hideBubble();
          bot.style.bottom = '8px';
          bot.classList.remove('nosmooth');
          x = maxX(); place();
          setState('idle'); setExpr('happy');
        } else {
          lastInteract = Date.now();
          setState(reduced ? 'idle' : 'walk');
        }
      });
      btnHide.addEventListener('click', function(){
        /* Portage site : « Fermer HGPTO » = fermé pour la session. */
        try { sessionStorage.setItem('hgpto-closed', '1'); sessionStorage.removeItem('hgpto-tour'); sessionStorage.removeItem('hgpto-guide'); } catch(e) {}
        isHidden = true;
        hideBubble();
        if (tourOn) stopTour(true);
        bot.classList.add('hidden');
        if (qaPanel) qaPanel.hidden = true;
        if (controlsEl) controlsEl.style.display = 'none';
        document.body.classList.add('hgpto-closed');
        document.body.classList.remove('hgpto-on');
      });

      /* ---------- Dock mobile : un seul bouton rond, le reste s'ouvre au toucher ---------- */
      var controlsEl = document.getElementById('bot-controls');
      var btnDock = document.getElementById('btn-dock');
      btnDock.addEventListener('click', function(){
        var open = controlsEl.classList.toggle('open');
        btnDock.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      controlsEl.addEventListener('click', function(ev){
        if (ev.target !== btnDock && controlsEl.classList.contains('open') && window.innerWidth <= 560){
          controlsEl.classList.remove('open');
          btnDock.setAttribute('aria-expanded','false');
        }
      });

      /* ---------- Guider pour vrai : il marche jusqu'à la section, elle brille ---------- */
      /* Portage site : correspondance sections -> routes réelles.
         Correctif visite (22 oct. 2026) : les ancres sec-* existent sur les
         vraies pages. guideTo retourne true si la section a été présentée SUR
         PLACE (défilement + brillance), false si une navigation vient d'être
         déclenchée : l'appelant décide alors quoi mémoriser pour l'arrivée
         (la visite garde son étape en cours ; un guidage ponctuel pose
         'hgpto-guide', consommé au démarrage de la page d'arrivée). Si
         l'ancre manque mais qu'on est déjà sur sa page, repli honnête : le
         haut de page est présenté plutôt que rien du tout. */
      var ROUTE_FOR = { 'sec-accueil':'/', 'sec-jeux':'/jeux', 'sec-kits':'/sans-honte',
        'sec-recettes':'/en-cuisine/', 'sec-livres':'/livres-pdf', 'sec-ateliers':'/ateliers',
        'sec-arbre':'/' };
      function routeKey(){
        var p = location.pathname.replace(/index\.html$/, '').replace(/\/+$/, '');
        return p === '' ? '/' : p;
      }
      function glowEl(el){
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block:'center' });
        el.classList.add('sec-glow');
        setTimeout(function(){ el.classList.remove('sec-glow'); }, 4600);
        var r = el.getBoundingClientRect();
        guideTarget = (r.left + r.width/2 < vw()/2) ? minX() + 8 : maxX() - 8;
      }
      function guideTo(id, after){
        var el = document.getElementById(id);
        if (!el) {
          var route = ROUTE_FOR[id];
          if (route) {
            var target = route === '/' ? '/' : route.replace(/\/+$/, '');
            if (routeKey() !== target) {
              if (!tourOn) { try { sessionStorage.setItem('hgpto-guide', id); } catch(e) {} }
              setTimeout(function(){ window.location.href = route; }, 1500);
              if (after) after();
              return false;
            }
          }
          glowEl(document.querySelector('main') || document.body);
          setTimeout(function(){ if (after) after(); }, 600);
          return true;
        }
        glowEl(el);
        setTimeout(function(){ if (after) after(); }, 600);
        return true;
      }

      /* ---------- Visite guidée : de section en section, avec commentaires ----------
         TRANQUILLE (lot nº 3) : chaque étape EXPLIQUE l'endroit (c'est
         quoi, ça sert à quoi, pour qui), au ton de quelqu'un qui fait
         visiter sa maison. Rythme apaisé : bulle ~11,5 s, pas ~11,8 s.
         Aucune vente pendant la visite — une seule suggestion douce peut
         suivre, à la toute fin d'une visite terminée d'elle-même (voir
         stopTour), jamais après un arrêt demandé par le visiteur. */
      var TOUR = [
        { id:'sec-accueil', t:"Bienvenue chez nous. Ici, c'est la pièce d'entrée : Hugo y présente HP Outils — « Des outils pour la vraie vie » — et tout ce que tu vas voir part d'ici. Moi, c'est HGPTO, le petit gérant de la place : je réponds aux questions et je connais chaque recoin. On y va tranquillement, pièce par pièce, et tu peux arrêter la visite quand tu veux." },
        { id:'sec-jeux', t:"Ici, c'est le salon : les jeux. Il y en a 26, tous gratuits, jouables tout de suite, sans inscription — pour les familles, les curieux, les soirées tranquilles. Certains font plus que divertir : LA BANQUE, par exemple, fait comprendre de l'intérieur comment fonctionne une vraie banque alimentaire." },
        { id:'sec-kits', t:"Là, ce sont les kits Sans Honte : 15 petits guides en PDF pour les affaires du quotidien qu'on remet toujours — ranger ses papiers, préparer un testament, organiser son budget. Ils coûtent 5 $ chacun, sans taxe ajoutée, et l'idée est dans le nom : jamais de honte, jamais de jugement." },
        { id:'sec-recettes', t:"La cuisine, mon endroit préféré. Ici, 629 recettes gratuites : tu écris les ingrédients que tu as déjà, et il te propose quoi cuisiner avec ça. Les portions s'ajustent de 1 à 300 personnes, et ta liste d'épicerie se prépare toute seule. C'est pensé pour les vraies cuisines, pas pour les photos." },
        { id:'sec-livres', t:"La bibliothèque : des livres en PDF, de 10 $ à 20 $, que tu télécharges tout de suite après le paiement. « La faim justifie les moyens » (10 $), c'est l'histoire vraie d'Hugo ; « Les enfants cuisinent pour faire plaisir » (20 $), c'est pour cuisiner en famille. On lit à son rythme, on garde le fichier pour toujours." },
        { id:'sec-ateliers', t:"Et ici, on sort de l'écran : les ateliers se vivent en groupe, à Terrebonne et dans les environs. « Cuisine pratique » (120 $), « Manger mieux avec moins » (150 $) — on cuisine ensemble, on apprend des choses utiles, et c'est le côté humain d'HP Outils qui se vit pour vrai, autour d'une table." },
        { id:'sec-arbre', t:"On est de retour à l'entrée — la visite est terminée, merci de m'avoir suivi. Tu as vu l'arbre au complet : chaque branche aide les autres, et rien ne se cache. Reste jaser si tu veux : pose-moi une question dans mon petit panneau, je connais toutes les réponses du site — et sinon, explore à ton rythme. Ici, la porte est toujours ouverte." }
      ];
      var tourOn = false, tourIdx = 0, tourTimer = null;
      function stopTour(silent, natural){
        tourOn = false;
        try { sessionStorage.removeItem('hgpto-tour'); sessionStorage.removeItem('hgpto-guide'); } catch(e) {}
        if (tourTimer){ clearTimeout(tourTimer); tourTimer = null; }
        document.getElementById('qa-tour').textContent = 'Fais-moi visiter';
        if (!silent) showBubble("Visite finie ! Touche « Une question ? » si tu veux que je te montre autre chose.", 6000);
        // Lot nº 3 : une visite qui se termine d'elle-même (paramètre
        // `natural` — jamais un arrêt demandé, jamais un abandon) peut
        // recevoir UNE suggestion douce, quelques secondes après le mot
        // de la fin, via les plafonds du système de suggestions.
        if (natural){
          setTimeout(function(){
            if (isPresse()) return;
            var p = CHOIX_LINES[tourEndChoix % CHOIX_LINES.length]; tourEndChoix++;
            doSuggest(p, { tourEnd:true });
          }, 9000);
        }
      }
      function tourStep(){
        if (!tourOn) return;
        if (tourIdx >= TOUR.length){ stopTour(false, true); return; }
        var step = TOUR[tourIdx];
        var here = guideTo(step.id, null);
        setExpr('happy');
        if (!here) {
          // Navigation en cours vers la page de CETTE étape : l'index gardé
          // est celui de l'étape en cours — à l'arrivée, la reprise la
          // présente sur place (commentaire lu sur la bonne page, section
          // qui défile et brille), puis la visite continue. Avant ce
          // correctif, l'étape était consommée avant le départ : son
          // commentaire partait sur la page précédente et ne se rejouait
          // jamais à l'arrivée.
          try { sessionStorage.setItem('hgpto-tour', String(tourIdx)); } catch(e) {}
          showBubble("Suis-moi, je t'y emmène !", 4000, 'talk');
          return;
        }
        showBubble(esc(step.t), 11500, 'talk');
        tourIdx++;
        try { sessionStorage.setItem('hgpto-tour', String(tourIdx)); } catch(e) {}
        tourTimer = setTimeout(tourStep, 11800);
      }
      function startTour(){
        if (tourOn){ stopTour(true); showBubble("D'accord, on arrête la visite. Je reste dans le coin si t'as besoin !", 5000); return; }
        closeQA();
        if (state === 'sleep') wake(false);
        tourOn = true; tourIdx = 0;
        try { sessionStorage.setItem('hgpto-tour', '0'); } catch(e) {}
        document.getElementById('qa-tour').textContent = 'Arrêter la visite';
        logDay("fait visiter le site, section par section");
        showBubble("En route ! Suis-moi, je te montre le site comme un gérant qui se respecte.", 5000, 'question');
        tourTimer = setTimeout(tourStep, 1600);
      }
      document.getElementById('qa-tour').addEventListener('click', startTour);

      /* ---------- Mode « Accompagne-moi » : il réagit aux clics et aux sections,
         seulement quand le visiteur l'a demandé. Quittable en un clic, et il se
         retire pendant le jeu (reco nº 7). ---------- */
      var accompany = false, commentedSecs = {}, lastAccompAt = 0;
      var SECTION_COMMENTS = {
        "sec-accueil":"Te voilà à l'accueil ! C'est ici que tout commence.",
        "sec-jeux":"Les jeux gratuits ! Veux-tu que je t'en conseille un ? Ouvre « Une question ? ».",
        "sec-kits":"Les kits Sans Honte, 5 $ chacun. Regarde-les à ton rythme, sans pression.",
        "sec-recettes":"629 recettes gratuites : parfait quand le frigo a l'air vide mais ne l'est pas.",
        "sec-livres":"Nos livres ! « Horizon Québec » est mon préféré… mais je suis partial, je le lis tout le temps.",
        "sec-ateliers":"Les ateliers, à Terrebonne : cuisiner ensemble, ça rapproche.",
        "sec-mascotte":"C'est ma carte, ça ! Gérant, informateur, et champion de la chatouille subie.",
        "sec-arbre":"L'arbre HP Outils : chaque branche aide les autres à pousser."
      };
      var btnAccompany = document.getElementById('btn-accompany');
      btnAccompany.addEventListener('click', function(){
        accompany = !accompany;
        btnAccompany.textContent = accompany ? 'Arrêter l\u2019accompagnement' : 'Accompagne-moi';
        btnAccompany.setAttribute('aria-pressed', accompany ? 'true' : 'false');
        lastInteract = Date.now();
        if (accompany){
          if (state === 'sleep') wake(false);
          showBubble("Je t'accompagne ! Clique sur ce qui t'intéresse : je te suis et je t'explique. Pour arrêter, touche le même bouton.", 7000, 'question');
        } else {
          showBubble("Parfait, je retourne à ma petite vie. Je suis là si t'as besoin !", 4500);
        }
      });
      if ('IntersectionObserver' in window){
        var secObs = new IntersectionObserver(function(entries){
          entries.forEach(function(en){
            if (!en.isIntersecting || !accompany || commentedSecs[en.target.id]) return;
            if (paused || isHidden || gameOn || qaOpen || state === 'sleep' || isBusy()) return;
            if (Date.now() - lastAccompAt < 9000) return;
            var line = SECTION_COMMENTS[en.target.id];
            if (!line) return;
            commentedSecs[en.target.id] = true;
            lastAccompAt = Date.now();
            guideTarget = maxX() - 8;
            showBubble(esc(line), 7000, 'talk');
          });
        }, { threshold: 0.45 });
        Object.keys(SECTION_COMMENTS).forEach(function(id){
          var el = document.getElementById(id);
          if (el) secObs.observe(el);
        });
      }
      document.addEventListener('pointerdown', function(ev){
        if (!accompany || gameOn || paused || isHidden) return;
        if (!ev.target.closest || !ev.target.closest('main')) return;
        if (Date.now() - lastAccompAt < 7000) return;
        lastAccompAt = Date.now();
        guideTarget = ev.clientX < vw()/2 ? minX() + 8 : maxX() - 8;
        var sec = ev.target.closest('[id^="sec-"]');
        if (sec && SECTION_COMMENTS[sec.id] && !commentedSecs[sec.id]){
          commentedSecs[sec.id] = true;
          showBubble(esc(SECTION_COMMENTS[sec.id]), 7000, 'talk');
        }
      }, { passive:true });

      /* ---------- Photo souvenir : sa pose du moment, la date, la marque ---------- */
      var scardEl = document.getElementById('souvenir');
      var scardText = '';
      function outfitLabel(){
        var cst = bot.getAttribute('data-costume');
        if (cst === 'apron') return "en tablier et mitaines de four";
        if (cst === 'hero') return "en super-héros, la fleur de lys en emblème";
        if (cst === 'wrestler') return "en lutteur, ceinture de champion";
        if (cst === 'halloween') return "déguisé pour l'Halloween";
        if (cst === 'noel') return "en lumières de Noël ambulantes";
        if (cst === 'stjean') return "aux couleurs de la fête nationale";
        if (cst === 'sucres') return "en carreauté du temps des sucres";
        if (cst === 'rentree') return "avec son sac à dos de la rentrée";
        var o = bot.getAttribute('data-outfit');
        if (document.body.classList.contains('night')) return "tête nue, comme toujours";
        if (o === 'froid') return "en foulard, tête nue";
        if (o === 'chaud') return "au soleil, tête nue";
        if (o === 'pluie') return "en imper, sous son parapluie";
        return "en chandail à fleur de lys, tête nue";
      }
      function openSouvenir(fromGame){
        var d = new Date();
        var months = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];
        var dateStr = d.getDate() + " " + months[d.getMonth()] + " " + d.getFullYear();
        var dec = seasonDecorKind();
        var decoStr = dec === 'halloween' ? " — décos d'Halloween installées par lui-même" : dec === 'noel' ? " — lumières de Noël installées par lui-même" : "";
        document.getElementById('scard-bot').innerHTML = MINI_BOT;
        document.getElementById('scard-meta').textContent = "HGPTO, " + outfitLabel() + decoStr;
        document.getElementById('scard-line').textContent = "Souvenir du " + dateStr + ", chez HP Outils (Terrebonne, Québec).";
        scardText = "Photo souvenir avec HGPTO, la mascotte d'HP Outils — " + outfitLabel() + ", le " + dateStr + ". " +
          (fromGame ? "Juste après notre partie de Serpents et échelles ! " : "") +
          "Des outils pour la vraie vie : hp-outils.com";
        document.getElementById('scard-share').textContent = scardText;
        document.getElementById('scard-copied').hidden = true;
        scardEl.hidden = false;
        logDay("posé pour une photo souvenir");
      }
      document.getElementById('qa-photo').addEventListener('click', function(){ openSouvenir(false); });
      document.getElementById('card-photo').addEventListener('click', function(){ openSouvenir(true); });
      document.getElementById('scard-close').addEventListener('click', function(){ scardEl.hidden = true; });
      document.getElementById('scard-copy').addEventListener('click', function(){
        var done = function(){ document.getElementById('scard-copied').hidden = false; };
        if (navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(scardText).then(done, function(){ fallbackCopyText(scardText, done); });
        } else { fallbackCopyText(scardText, done); }
      });
      function fallbackCopyText(txt, done){
        var ta = document.createElement('textarea');
        ta.value = txt;
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch(e){ /* le texte reste visible dans la carte */ }
        ta.remove();
      }

      /* ---------- Onglet inactif : on se calme ---------- */
      document.addEventListener('visibilitychange', function(){
        docHidden = document.hidden;
        lastTs = null;
        if (!docHidden){ lastInteract = Date.now(); if (state === 'sleep') wake(false); }
      });
      window.addEventListener('resize', function(){ x = clampX(x); place(); });

      /* ================= LE JEU CACHÉ : Serpents et échelles =================
         Paramètres et réactions regroupés (reco nº 10 du panneau).
         Dés équitables, aucune pub pendant la partie, sortie en tout temps. */
      var GAME_CFG = {
        goal: 64,
        // Rééquilibrage 2026-10-22 : parties d'environ 5 minutes. Les dés restent
        // parfaitement équitables ; le léger avantage du visiteur vient de la
        // DISPOSITION seulement : il joue premier, et les serpents glissent un
        // peu moins loin que les échelles ne montent (dérive douce pour tous).
        ladders: { 4:25, 12:29, 19:38, 28:47, 35:50, 44:59 },
        snakes:  { 17:7, 31:14, 39:22, 48:30, 54:38, 62:45 }
      };
      var GAME_LINES = {
        start: ["Serpents et échelles ! Premier arrivé à la case 64. Tu commences — lance le dé !",
                "Un plateau tout neuf, des dés honnêtes : bonne partie !",
                "Que les meilleurs dés gagnent !"],
        youRoll: ["Tu as fait {n} ! Beau lancer !", "{n} ! Les dés t'aiment bien.", "À toi : {n}. Avance, champion !", "{n} ! Pas mal, pas mal du tout."],
        botRoll: ["À moi… {n} !", "Je lance… {n}. Mes boulons ont tout donné.", "{n} pour moi ! On continue."],
        botRollNight: ["À moi… {n}. Même en bonnet de nuit, je joue. Enfin, presque réveillé.", "{n}… je bâille, mais je vise juste."],
        overshoot: ["Trop loin ! Il faut exactement 64 — les dés sont taquins.", "Aïe, ça dépasse ! Il te faut le compte juste : 64."],
        ladderYou: ["Une échelle ! Monte, monte !", "Bravo, l'échelle express !", "Wouah, te voilà haut !"],
        ladderBot: ["Une échelle pour moi ! Je danse de joie — intérieurement, je suis en métal.", "Je monte ! Regarde-moi ce style.", "Échelle ! Les dés et moi, on est copains."],
        snakeYou: ["Oups, un serpent gentil mais glissant…", "Glissade ! Ça arrive aux meilleurs — parole de robot.", "Le serpent t'a offert un petit voyage, disons ça comme ça."],
        snakeBot: ["Un serpent ! Je glisse… avec dignité. Enfin, presque.", "Ouille. Mes sourcils sont catastrophés.", "Je descends, mais je descends en riant. Presque."],
        youWin: ["Tu as gagné ! Bravo pour vrai — quelle partie !", "Bravo ! Je m'incline, et je ne tombe même pas."],
        botWin: ["Revanche quand tu veux !", "C'était serré — les dés ont décidé."],
        quit: "Bonne partie ! On se reprend quand tu veux."
      };
      var MINI_BOT = '<svg viewBox="0 0 100 100" aria-hidden="true"><rect x="33" y="72" width="34" height="17" rx="5" fill="#31517f" stroke="#2b2118" stroke-width="3.5"/><path d="M41 73 Q50 79.5 59 73 L59 76 Q50 82 41 76 Z" fill="#fdf6e3"/><circle cx="16" cy="46" r="4.5" fill="#9aa1ae" stroke="#2b2118" stroke-width="2.6"/><circle cx="84" cy="46" r="4.5" fill="#9aa1ae" stroke="#2b2118" stroke-width="2.6"/><ellipse cx="50" cy="44" rx="33" ry="29" fill="#c9cfda" stroke="#2b2118" stroke-width="4"/><path d="M19 36 Q19 15 50 14.5 Q81 15 81 36 Q76 21 50 20.5 Q24 21 19 36Z" fill="#444851" opacity=".35"/><path d="M18 47 Q17 72 50 75 Q83 72 82 47 Q69 61 50 61 Q31 61 18 47Z" fill="#5a5f68" opacity=".55"/><ellipse cx="50" cy="59" rx="12" ry="2.8" fill="#4a4f58"/><ellipse cx="38" cy="44" rx="8" ry="6.5" fill="#fff"/><ellipse cx="62" cy="44" rx="8" ry="6.5" fill="#fff"/><circle cx="38" cy="45" r="3.2" fill="#1f2937"/><circle cx="62" cy="45" r="3.2" fill="#1f2937"/><path d="M24 30 Q37 21 48 28 M52 28 Q63 21 76 30" stroke="#1d1710" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M30 25 l-2 -5 M41 21 l1 -5 M60 21 l2 -5 M71 25 l3 -4 M35 22.5 l-4 -4.5 M65 22.5 l4 -4.5" stroke="#1d1710" stroke-width="3.1" fill="none" stroke-linecap="round"/><path d="M43 68 Q50 73 57 68" stroke="#2b2118" stroke-width="3.2" fill="none" stroke-linecap="round"/><circle cx="50" cy="78" r="1.9" fill="#6ee7a8"/><g fill="#fdf6e3"><path d="M50 80.5 C49.2 81.8 49.2 83.2 50 84.8 C50.8 83.2 50.8 81.8 50 80.5Z"/><path d="M49.2 82.6 C47.6 81.7 46.6 82.5 47 83.6 C47.3 84.5 48.6 84.6 49.2 83.9Z"/><path d="M50.8 82.6 C52.4 81.7 53.4 82.5 53 83.6 C52.7 84.5 51.4 84.6 50.8 83.9Z"/><rect x="47.7" y="85.4" width="4.6" height="1.3" rx=".6"/></g></svg>';

      var gameEl = document.getElementById('game');
      var boardEl = document.getElementById('board');
      var boardArt = document.getElementById('board-art');
      var boardWrap = document.getElementById('board-wrap');
      var confettiEl = document.getElementById('confetti');
      var youPawn = document.getElementById('pawn-you');
      var botPawn = document.getElementById('pawn-bot');
      var dieEl = document.getElementById('die');
      var gameStatus = document.getElementById('game-status');
      var rollBtn = document.getElementById('game-roll');
      var cardEl = document.getElementById('game-card');
      var G = null;

      function cellPos(n){
        var i = n - 1, rb = Math.floor(i / 8), idx = i % 8;
        var col = (rb % 2 === 0) ? idx : 7 - idx;
        var rt = 7 - rb;
        return { sx: col * 100 + 50, sy: rt * 100 + 50, left: col * 12.5 + 6.25, top: rt * 12.5 + 6.25 };
      }
      function buildBoard(){
        boardEl.innerHTML = '';
        for (var rt = 0; rt < 8; rt++){
          for (var col = 0; col < 8; col++){
            var rb = 7 - rt;
            var idx = (rb % 2 === 0) ? col : 7 - col;
            var n = rb * 8 + idx + 1;
            var c = document.createElement('div');
            c.className = 'cell' + (((rt + col) % 2) ? ' alt' : '') + (n === 64 ? ' goal' : '');
            c.style.animationDelay = ((rt * 8 + col) * 26) + 'ms';
            c.innerHTML = '<b>' + n + '</b>';
            boardEl.appendChild(c);
          }
        }
        var s = '';
        Object.keys(GAME_CFG.ladders).forEach(function(k){
          var a = cellPos(+k), b = cellPos(GAME_CFG.ladders[k]);
          var dx = b.sx - a.sx, dy = b.sy - a.sy, len = Math.hypot(dx, dy);
          var px = -dy / len * 15, py = dx / len * 15;
          s += '<line x1="' + (a.sx - px) + '" y1="' + (a.sy - py) + '" x2="' + (b.sx - px) + '" y2="' + (b.sy - py) + '" stroke="#2b2118" stroke-width="7" stroke-linecap="round"/>';
          s += '<line x1="' + (a.sx + px) + '" y1="' + (a.sy + py) + '" x2="' + (b.sx + px) + '" y2="' + (b.sy + py) + '" stroke="#2b2118" stroke-width="7" stroke-linecap="round"/>';
          var steps = Math.floor(len / 46);
          for (var i = 1; i <= steps; i++){
            var t = i / (steps + 1);
            s += '<line x1="' + (a.sx + dx * t - px) + '" y1="' + (a.sy + dy * t - py) + '" x2="' + (a.sx + dx * t + px) + '" y2="' + (a.sy + dy * t + py) + '" stroke="#b97f24" stroke-width="6" stroke-linecap="round"/>';
          }
        });
        Object.keys(GAME_CFG.snakes).forEach(function(k){
          var a = cellPos(+k), b = cellPos(GAME_CFG.snakes[k]);
          var mx = (a.sx + b.sx) / 2 + (b.sy > a.sy ? 60 : -60), my = (a.sy + b.sy) / 2;
          s += '<path d="M' + a.sx + ' ' + a.sy + ' Q' + mx + ' ' + my + ' ' + b.sx + ' ' + b.sy + '" fill="none" stroke="#2b2118" stroke-width="17" stroke-linecap="round"/>';
          s += '<path d="M' + a.sx + ' ' + a.sy + ' Q' + mx + ' ' + my + ' ' + b.sx + ' ' + b.sy + '" fill="none" stroke="#f0c16d" stroke-width="5" stroke-dasharray="14 12" stroke-linecap="round"/>';
          s += '<circle cx="' + a.sx + '" cy="' + a.sy + '" r="17" fill="#fdf3da" stroke="#2b2118" stroke-width="4.5"/>';
          s += '<circle cx="' + (a.sx - 5) + '" cy="' + (a.sy - 3) + '" r="2.8" fill="#2b2118"/>';
          s += '<circle cx="' + (a.sx + 6) + '" cy="' + (a.sy - 3) + '" r="2.8" fill="#2b2118"/>';
          s += '<path d="M' + (a.sx - 6) + ' ' + (a.sy + 6) + ' Q' + a.sx + ' ' + (a.sy + 11) + ' ' + (a.sx + 6) + ' ' + (a.sy + 6) + '" fill="none" stroke="#2b2118" stroke-width="2.6" stroke-linecap="round"/>';
        });
        boardArt.innerHTML = s;
        botPawn.innerHTML = MINI_BOT;
      }
      function placePawn(pawn, n){
        var p = cellPos(n);
        pawn.style.left = p.left + '%';
        pawn.style.top = p.top + '%';
      }
      function gComment(line, mood){ showBubble(esc(line), 6000, mood || 'talk'); }
      function gStatus(t){ gameStatus.textContent = t; }
      function tickSound(){
        if (!actx || muted) return;
        tone(actx.currentTime + 0.01, 500, 380, 0.05, 0.02, 'triangle');
      }
      function confettiBurst(n){
        if (calm || reduced) return;
        for (var i = 0; i < (n || 22); i++){
          var c = document.createElement('i');
          c.style.left = (Math.random() * 96) + '%';
          c.style.animationDelay = (Math.random() * 0.35) + 's';
          c.style.transform = 'rotate(' + Math.round(Math.random() * 90) + 'deg)';
          if (Math.random() < 0.4) c.style.background = '#fffaf0';
          confettiEl.appendChild(c);
          (function(el){ setTimeout(function(){ el.remove(); }, 2100); })(c);
        }
      }
      function bigFx(){
        if (calm || reduced) return;
        gameEl.classList.add('shake');
        confettiBurst(16);
        setTimeout(function(){ gameEl.classList.remove('shake'); }, 500);
      }
      function startGame(){
        if (G) return;
        ensureAudio();
        if (qaOpen) closeQA();
        hideBubble();
        bot.classList.remove('sleep-book');
        gameOn = true;
        catHideNow();   // Pixel se retire pendant la partie, comme lui pendant les tâches
        applyCostume();   // costume rangé pendant la partie : il joue en chandail
        document.body.classList.add('game-on');
        document.getElementById('botlayer').style.zIndex = '80';
        gameEl.hidden = false;
        cardEl.hidden = true;
        buildBoard();
        G = { you:1, bot:1, turn:'you', busy:true, over:false, rolls:0, ladders:0, snakes:0, finished:false };
        logDay("joué une partie de Serpents et échelles (dés honnêtes, promis)");
        placePawn(youPawn, 1);
        placePawn(botPawn, 1);
        dieEl.textContent = '–';
        bot.classList.remove('nosmooth');
        bot.style.transition = 'transform .8s ease';
        x = minX(); place();
        setTimeout(function(){ bot.style.transition = ''; }, 850);
        setState('idle'); setExpr('happy'); busy(1200);
        gStatus("À toi de lancer le dé !");
        rollBtn.disabled = false;
        gComment(pick(GAME_LINES.start), 'question');
        setTimeout(function(){ if (G) G.busy = false; }, reduced ? 60 : 1000);
      }
      function rollDieAnim(cb){
        var n = 1 + Math.floor(Math.random() * 6);   // dé équitable, toujours
        if (reduced){ dieEl.textContent = n; cb(n); return; }
        var c = 0;
        var iv = setInterval(function(){
          dieEl.textContent = 1 + Math.floor(Math.random() * 6);
          if (++c >= 7){ clearInterval(iv); dieEl.textContent = n; cb(n); }
        }, 85);
      }
      function stepPawn(who, from, to, done){
        var pawn = who === 'you' ? youPawn : botPawn;
        pawn.classList.remove('slide','climb');
        var cur = from;
        var iv = setInterval(function(){
          cur++;
          placePawn(pawn, cur);
          tickSound();
          if (cur >= to){
            clearInterval(iv);
            if (who === 'you') G.you = to; else G.bot = to;
            done();
          }
        }, reduced ? 30 : 150);
      }
      function slidePawn(who, to, kind, done){
        var pawn = who === 'you' ? youPawn : botPawn;
        pawn.classList.add(kind);
        placePawn(pawn, to);
        setTimeout(function(){
          pawn.classList.remove(kind);
          if (who === 'you') G.you = to; else G.bot = to;
          done();
        }, reduced ? 60 : 850);
      }
      function endTurn(who){
        if (!G || G.over) return;
        if (who === 'you'){
          G.turn = 'bot';
          gStatus("Au tour d'HGPTO…");
          rollBtn.disabled = true;
          setTimeout(function(){ if (G && !G.over) takeTurn('bot'); }, 950);
        } else {
          G.turn = 'you';
          gStatus("À toi de lancer le dé !");
          rollBtn.disabled = false;
          G.busy = false;
        }
      }
      function takeTurn(who){
        if (!G || G.over) return;
        G.busy = true;
        rollBtn.disabled = true;
        var isYou = who === 'you';
        rollDieAnim(function(n){
          if (!G) return;
          G.rolls++;
          var from = isYou ? G.you : G.bot;
          var bank = isYou ? GAME_LINES.youRoll : (isNight() ? GAME_LINES.botRollNight : GAME_LINES.botRoll);
          gComment(pick(bank).replace('{n}', n), 'talk');
          gStatus((isYou ? 'Tu as fait ' : 'HGPTO a fait ') + n + ' !');
          var target = from + n;
          if (target > GAME_CFG.goal){
            setTimeout(function(){ gComment(pick(GAME_LINES.overshoot), 'talk'); endTurn(who); }, 700);
            return;
          }
          stepPawn(who, from, target, function(){
            if (!G) return;
            if (target === GAME_CFG.goal) return gameWin(who);
            var lad = GAME_CFG.ladders[target], snk = GAME_CFG.snakes[target];
            if (lad){
              slidePawn(who, lad, 'climb', function(){
                if (!G) return;
                if (isYou) G.ladders++;
                gComment(pick(isYou ? GAME_LINES.ladderYou : GAME_LINES.ladderBot), 'joke');
                if (!isYou){ setExpr('laugh'); setTimeout(function(){ if (gameOn) setExpr('happy'); }, 1600); }
                if (lad - target >= 20) bigFx();
                endTurn(who);
              });
            } else if (snk){
              slidePawn(who, snk, 'slide', function(){
                if (!G) return;
                if (isYou) G.snakes++;
                gComment(pick(isYou ? GAME_LINES.snakeYou : GAME_LINES.snakeBot), 'talk');
                if (target - snk >= 16) bigFx();
                if (!isYou && target - snk >= 17){
                  doCry(function(){
                    if (gameOn){ setState('idle'); setExpr('happy'); }
                    endTurn(who);
                  });
                } else if (!isYou){
                  // Lot nº 3 : la petite glissade peut valoir une grogne
                  // signature (~1 fois sur 2) avant sa ligne de serpent —
                  // la grosse glissade (≥ 17) garde son chemin de pleurs,
                  // inchangé.
                  if (grumbleFires()){
                    setExpr('angry'); gComment(grumbleText(), 'talk');
                    setTimeout(function(){
                      if (!gameOn) return;
                      setExpr('sad');
                      gComment(pick(GAME_LINES.snakeBot), 'talk');
                      setTimeout(function(){ if (gameOn){ setExpr('happy'); } endTurn(who); }, 1600);
                    }, 1500);
                  } else {
                    setExpr('sad');
                    setTimeout(function(){ if (gameOn){ setExpr('happy'); } endTurn(who); }, 1100);
                  }
                } else {
                  endTurn(who);
                }
              });
            } else if (!isYou && n === 1 && Math.random() < 0.4){
              doAngry("GRRR. Un 1 ! Ce dé-là va finir dans le tiroir à chaussettes.", 2200);
              setTimeout(function(){
                if (gameOn){ setState('idle'); setExpr('happy'); }
                endTurn(who);
              }, 2350);
            } else {
              endTurn(who);
            }
          });
        });
      }
      function gameWin(who){
        if (!G) return;
        G.over = true; G.finished = true; G.busy = true;
        var youWon = who === 'you';
        gStatus(youWon ? "Tu as gagné !" : "HGPTO a gagné !");
        rollBtn.disabled = true;
        setExpr('laugh');
        if (youWon){
          gComment(pick(GAME_LINES.youWin), 'joke');
        } else {
          gComment("Des dés chanceux, moi ! " + pick(GAME_LINES.botWin), 'joke');
        }
        confettiBurst(30);
        setTimeout(showCard, 1500);
      }
      var shareText = '';
      function showCard(){
        if (!G) return;
        var youWon = G.you === GAME_CFG.goal;
        document.getElementById('card-title').textContent = youWon ? "Tu as gagné !" : "HGPTO a gagné !";
        document.getElementById('card-line').textContent = youWon
          ? "Tu as atteint la case 64 le premier. Belle partie !"
          : "HGPTO a atteint la case 64 — des dés chanceux, rien d'autre !";
        document.getElementById('card-stats').textContent =
          "Lancers : " + G.rolls + " · Échelles montées : " + G.ladders + " · Serpents glissés : " + G.snakes;
        shareText = "J'ai joué à Serpents et échelles contre HGPTO, la mascotte d'HP Outils — " +
          (youWon ? "et j'ai gagné" : "et il a gagné, des dés chanceux") +
          " en " + G.rolls + " lancers ! Défie un ami de battre ton score ! hp-outils.com";
        document.getElementById('card-share').textContent = shareText;
        document.getElementById('card-copied').hidden = true;
        var mini = document.getElementById('card-mini');
        mini.innerHTML = '';
        for (var rt = 0; rt < 8; rt++){
          for (var col = 0; col < 8; col++){
            var rb = 7 - rt;
            var idx = (rb % 2 === 0) ? col : 7 - col;
            var n = rb * 8 + idx + 1;
            var c = document.createElement('i');
            if (n === G.you) c.className = 'you';
            if (n === G.bot) c.className = 'botp';
            mini.appendChild(c);
          }
        }
        cardEl.hidden = false;
      }
      function quitGame(finished){
        gameEl.hidden = true;
        cardEl.hidden = true;
        document.body.classList.remove('game-on');
        document.getElementById('botlayer').style.zIndex = '';
        gameOn = false;
        applyCostume();
        G = null;
        setExpr('happy');
        setState(reduced ? 'idle' : 'walk');
        if (finished){
          gComment("Revanche quand tu veux !", 'joke');
        } else {
          gComment(GAME_LINES.quit, 'talk');
        }
      }
      rollBtn.addEventListener('click', function(){
        if (G && G.turn === 'you' && !G.busy && !G.over) takeTurn('you');
      });
      document.getElementById('game-quit').addEventListener('click', function(){ quitGame(false); });
      document.getElementById('card-close').addEventListener('click', function(){ quitGame(true); });
      document.getElementById('card-copy').addEventListener('click', function(){
        var done = function(){ document.getElementById('card-copied').hidden = false; };
        if (navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(shareText).then(done, function(){ fallbackCopy(done); });
        } else {
          fallbackCopy(done);
        }
      });
      function fallbackCopy(done){
        var ta = document.createElement('textarea');
        ta.value = shareText;
        ta.style.position = 'fixed'; ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); done(); } catch(e){ /* le texte reste visible dans la carte */ }
        ta.remove();
      }
      document.getElementById('qa-play').addEventListener('click', startGame);

      /* ================= PIXEL, la chatte d'HGPTO =================
         Femelle de 2 ans, rescapée de l'extérieur un hiver : trouvée dehors
         dans le froid, elle vit maintenant au chaud sur le site. Affectueuse
         mais graffigneuse, gourmande, grande dormeuse, championne des
         « zoomies ». Elle reste un ANIMAL : miaulements et ronrons seulement,
         jamais de parole. Elle se retire pendant les tâches, comme lui. */
      var catEl = document.getElementById('cat');
      var catBurstEl = document.getElementById('cat-burst');
      var bowlEl = document.getElementById('bowl');
      var scratchEl = document.getElementById('scratch');
      var CAT_W = window.innerWidth <= 560 ? 76 : 96;
      var catX = -160, catVisible = false, catMode = 'off', catState = 'idle';
      var catTarget = null, catSpeed = 60, catArrive = null, catTimer = null;
      var PIXEL_STORY = "Pixel, c'est ma chatte : 2 ans, super féline. Je l'ai trouvée dehors, un hiver, toute petite dans le froid — depuis, elle vit au chaud, ici, avec moi. Affectueuse, gourmande, championne de la sieste… et un brin graffigneuse quand on la flatte trop. Doucement, avec elle.";
      var CAT_RUB_LINES = [
        "Elle se frotte contre mes jambes… un robot qui fond, ça fait des flaques de bonheur.",
        "Pixel ! Ma collègue préférée à quatre pattes.",
        "Doucement, doucement… voilà, comme ça, ma belle.",
        "Ce ronron-là, c'est sa façon de dire merci. Moi, je traduis."
      ];
      function setCatState(s){ catState = s; catEl.setAttribute('data-state', s); }
      function catPlace(){ catEl.style.transform = 'translateX(' + catX + 'px)'; }
      function catBesideX(){
        var right = x + botW() + 6;
        return (right + CAT_W < vw() - 4) ? right : Math.max(4, x - CAT_W - 6);
      }
      function catGo(target, speed, arrive){
        catTarget = Math.max(-CAT_W - 20, Math.min(vw() + 20, target));
        catSpeed = speed || 60;
        catArrive = arrive || null;
      }
      function summonCat(mode){
        if (gameOn) return;
        if (!catVisible){
          catVisible = true;
          catEl.classList.remove('gone');
          catX = (x > vw() / 2) ? vw() + 12 : -CAT_W - 12;
          catPlace();
        }
        catMode = mode || 'follow';
        if (catMode === 'follow') catGo(catBesideX(), 68, catArrivedFollow);
      }
      function catArrivedFollow(){
        if (catMode !== 'follow' || !catVisible) return;
        if (state === 'sleep'){ setCatState('sleep'); return; }
        setCatState('rub');
        if (!isBusy() && !qaOpen && Math.random() < 0.5){
          setExpr('happy');
          showBubble(esc(pick(CAT_RUB_LINES)), 4600, 'none');
          spawnBurst(['♥'], 3);
        }
        setTimeout(function(){
          if (catMode === 'follow' && catState === 'rub') setCatState('idle');
        }, 3800);
      }
      function catLeave(){
        if (!catVisible) return;
        catMode = 'leave';
        var edge = catX < vw() / 2 ? -CAT_W - 14 : vw() + 14;
        catGo(edge, 95, function(){
          catVisible = false; catMode = 'off';
          catEl.classList.add('gone');
          setCatState('idle');
        });
      }
      function catHideNow(){
        catVisible = false; catMode = 'off'; catTarget = null;
        catEl.classList.add('gone');
        setCatState('idle');
      }
      /* Ses sons à elle : miaou doux, ronron grave (oscillateur direct, sans
         le filtre « voix de robot ») — jamais de parole, c'est un animal. */
      function toneRaw(t0, f0, f1, dur, vol, type){
        if (!actx) return;
        var o = actx.createOscillator(), g = actx.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(f0, t0);
        o.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t0 + dur);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol, t0 + dur * 0.3);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
        o.connect(g); g.connect(actx.destination);
        o.start(t0); o.stop(t0 + dur + 0.02);
      }
      function meow(soft){
        if (!actx || muted || docHidden) return;
        var t = actx.currentTime + 0.02, v = soft ? 0.02 : 0.032;
        toneRaw(t, 540, 880, 0.16, v, 'sine');
        toneRaw(t + 0.17, 880, 430, 0.26, v, 'sine');
      }
      function purr(){
        if (!actx || muted || docHidden) return;
        var t = actx.currentTime + 0.02;
        for (var i = 0; i < 9; i++) toneRaw(t + i * 0.13, 56, 48, 0.1, 0.045, 'sawtooth');
      }
      function spawnCatBurst(chars, n){
        if (reduced) return;
        for (var i = 0; i < (n || 4); i++){
          var s = document.createElement('i');
          s.textContent = chars[Math.floor(Math.random() * chars.length)];
          var ang = Math.random() * Math.PI - Math.PI;
          var dist = 26 + Math.random() * 22;
          s.style.left = (30 + Math.random() * 36) + 'px';
          s.style.top = (Math.random() * 14) + 'px';
          s.style.fontSize = (13 + Math.random() * 8) + 'px';
          s.style.setProperty('--dx', Math.round(Math.cos(ang) * dist) + 'px');
          s.style.setProperty('--dy', Math.round(-Math.abs(Math.sin(ang)) * dist - 12) + 'px');
          s.style.setProperty('--rot', Math.round(Math.random() * 60 - 30) + 'deg');
          catBurstEl.appendChild(s);
          (function(el){ setTimeout(function(){ el.remove(); }, 1050); })(s);
        }
      }
      /* HGPTO la nourrit : il remplit son bol, elle accourt et mange avec appétit */
      function doFeedCat(){
        if (gameOn || paused || isHidden) return;
        if (state === 'sleep') wake(false);
        var bx = x + botW() + 16;
        if (bx + 60 > vw()) bx = Math.max(4, x - 76);
        bowlEl.style.left = bx + 'px';
        bowlEl.hidden = false;
        bowlEl.style.opacity = '1';
        setState('invite'); setExpr('happy'); busy(1700);
        signText.textContent = 'MIAM !';
        showBubble("À manger, ma Pixel ! Viens, c'est prêt.", 4200, 'question');
        logDay("nourri Pixel — elle mange comme quatre, cette chatte");
        summonCat('goto');
        meow();
        catGo(bx - 4, 165, function(){
          setCatState('eat');
          setTimeout(function(){
            if (catState === 'eat') setCatState('idle');
            bowlEl.style.opacity = '0';
            setTimeout(function(){ bowlEl.hidden = true; }, 450);
            if (catVisible){ catMode = 'follow'; catGo(catBesideX(), 68, catArrivedFollow); }
          }, 4300);
        });
        setTimeout(function(){
          if (state === 'invite') setState(reduced ? 'idle' : 'walk');
        }, 1700);
      }
      /* Elle le console : quand il pleure ou désespère, elle vient se coucher près de lui */
      function catConsole(){
        if (gameOn) return;
        summonCat('goto');
        catGo(catBesideX(), 175, function(){
          if (state === 'cry' || state === 'despair') setCatState('console');
        });
      }
      /* Sieste à deux : s'il s'endort et qu'elle est là, elle se love contre lui */
      function catNapTogether(){
        if (!catVisible || gameOn || catState === 'sleep') return;
        catMode = 'goto';
        catGo(catBesideX(), 85, function(){ if (state === 'sleep') setCatState('sleep'); });
      }
      /* Les décos la fascinent : les araignées d'Halloween sont en danger… */
      function catStareAtDecor(){
        if (gameOn) return;
        summonCat('goto');
        if (!catVisible) return;
        var tx = 30 + Math.random() * Math.max(30, vw() - CAT_W - 60);
        catGo(tx, 125, function(){
          setCatState('stare');
          meow(true);
          setTimeout(function(){
            if (catState === 'stare'){
              setCatState('idle');
              if (catVisible){ catMode = 'follow'; catGo(catBesideX(), 68, catArrivedFollow); }
            }
          }, 6500);
        });
      }
      /* ZOOMIES : d'un coup, elle traverse la page comme une fusée à moustaches */
      function catZoomies(){
        summonCat('goto');
        if (!catVisible) return;
        var toRight = catX < vw() / 2;
        catGo(toRight ? vw() - CAT_W - 6 : 6, 640, function(){
          setCatState('idle');
          meow(true);
          setTimeout(function(){
            if (catVisible && catMode === 'goto'){ catMode = 'follow'; catGo(catBesideX(), 68, catArrivedFollow); }
          }, 1300);
        });
      }
      /* La toucher : caresse douce = ronron ; trop de caresses rapides = petite
         griffe, HGPTO intervient, puis elle revient se faire pardonner. */
      var petTimes = [];
      function petCat(){
        ensureAudio();
        lastInteract = Date.now();
        if (!catVisible || gameOn || paused) return;
        if (catState === 'sleep' || catState === 'console'){ purr(); return; }
        var now = Date.now();
        petTimes = petTimes.filter(function(t){ return now - t < 1600; });
        petTimes.push(now);
        if (petTimes.length >= 4){ petTimes = []; catScratch(); return; }
        setCatState('purr');
        purr();
        spawnCatBurst(['♥', '✦'], 4);
        setTimeout(function(){ if (catState === 'purr') setCatState('idle'); }, 1500);
      }
      function catScratch(){
        setCatState('startle');
        scratchEl.hidden = false;
        meow();
        catMode = 'goto';
        var away = catX < vw() / 2 ? Math.min(vw() - CAT_W - 6, catX + 250) : Math.max(6, catX - 250);
        catGo(away, 330, function(){ if (catState === 'startle') setCatState('idle'); });
        setTimeout(function(){ scratchEl.hidden = true; }, 1700);
        if (state !== 'sleep' && !gameOn){
          setExpr('wide');
          showBubble("Doucement ! Elle est affectueuse, mais graffigneuse, ma Pixel.", 5200, 'talk');
        }
        logDay("recadré un visiteur trop enthousiaste avec Pixel (doucement !)");
        setTimeout(function(){
          if (catVisible && !gameOn && catMode === 'goto'){
            catMode = 'follow';
            catGo(catBesideX(), 95, catArrivedFollow);
          }
        }, 7000);
      }
      catEl.addEventListener('pointerdown', function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        petCat();
      });
      catEl.addEventListener('keydown', function(ev){
        if (ev.key === 'Enter' || ev.key === ' '){ ev.preventDefault(); petCat(); }
      });
      /* Son horaire à elle : elle passe, elle vit, elle repart — jamais envahissante */
      function scheduleCatLife(){
        if (catTimer) clearTimeout(catTimer);
        catTimer = setTimeout(function(){
          if (!paused && !isHidden && !docHidden && !gameOn && !qaOpen){
            if (!catVisible){
              if (Math.random() < 0.65) summonCat('follow');
            } else if (catState === 'sleep' || catState === 'console'){
              if (Math.random() < 0.55){
                setCatState('idle');
                catMode = 'follow';
                catGo(catBesideX(), 68, catArrivedFollow);
              }
            } else if (catMode === 'follow' || catMode === 'stay'){
              var r = Math.random();
              if (r < 0.22) catZoomies();
              else if (r < 0.40 && decorShown) catStareAtDecor();
              else if (r < 0.52) doFeedCat();
              else if (r < 0.68){
                catMode = 'goto';
                catGo(Math.random() < 0.5 ? 10 : vw() - CAT_W - 10, 72, function(){
                  setCatState('sleep');
                  setTimeout(function(){
                    if (catState === 'sleep' && state !== 'sleep' && catVisible){
                      setCatState('idle');
                      catMode = 'follow'; catGo(catBesideX(), 68, catArrivedFollow);
                    }
                  }, 17000);
                });
              }
              else if (r < 0.78) catLeave();
            }
          }
          scheduleCatLife();
        }, 26000 + Math.random() * 18000);
      }

      /* ---------- Décorations saisonnières : il les installe et les admire ---------- */
      var decorEl = document.getElementById('decor');
      var decorBuilt = false, decorShown = false;
      function seasonDecorKind(){
        var d = new Date(), m = d.getMonth(), day = d.getDate();
        if ((m === 9 && day >= 20) || (m === 10 && day <= 1)) return 'halloween';
        if (m === 11) return 'noel';
        return null;
      }
      function buildDecor(){
        if (decorBuilt) return; decorBuilt = true;
        var kind = seasonDecorKind();
        if (!kind) return;
        if (kind === 'halloween'){
          for (var i = 0; i < 3; i++){
            var sp = document.createElement('div');
            sp.className = 'spider';
            sp.style.left = (10 + i * 34 + Math.random()*8) + 'vw';
            sp.style.animationDelay = (i * 1.7) + 's';
            sp.innerHTML = '<svg viewBox="0 0 40 40" width="34" height="34"><g stroke="#2b2118" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M14 22 L4 16 M14 26 L3 26 M14 30 L5 35 M26 22 L36 16 M26 26 L37 26 M26 30 L35 35"/></g><ellipse cx="20" cy="26" rx="7.5" ry="6.5" fill="#2b2118"/><circle cx="20" cy="19" r="4.6" fill="#2b2118"/><circle cx="18.4" cy="18" r="1" fill="#f6eed9"/><circle cx="21.6" cy="18" r="1" fill="#f6eed9"/></svg>';
            decorEl.appendChild(sp);
          }
        } else {
          var row = document.createElement('div');
          row.className = 'lights';
          var bulbs = '';
          for (var j = 0; j < 18; j++) bulbs += '<span></span>';
          row.innerHTML = bulbs;
          decorEl.appendChild(row);
        }
      }
      function doDecor(){
        if (state === 'sleep' || paused || isBusy() || qaOpen) return;
        if (!seasonDecorKind()){ doJanitor(); return; }
        buildDecor();
        setState('invite'); setExpr('happy'); busy(5200);
        signText.textContent = 'DÉCO !';
        showBubble(decorShown ? "Je les admirais encore… belles, hein ?" : "Regarde en haut : c'est MOI qui ai installé les décorations !", 4600, 'joke');
        decorEl.classList.add('on'); decorShown = true;
        logDay("installé les décorations de saison, comme un bon gérant");
        if (Math.random() < 0.6) catStareAtDecor();   // les araignées sont en danger…
        setTimeout(function(){
          if (state === 'invite') setState(reduced ? 'idle' : 'walk');
        }, 5200);
      }

      /* ---------- Rituels : phrase du moment à l'accueil, salut de départ ---------- */
      function momentLine(){
        var d = new Date(), m = d.getMonth(), day = d.getDate();
        if (m === 5 && day === 24) return "Bonne fête nationale ! Ici, on fête le Québec en cuisinant et en jouant.";
        if (m === 11 && day === 25) return "Joyeuses Fêtes ! Moi, je surveille les biscuits.";
        if (m === 11 && day >= 20) return "Les Fêtes approchent — ça sent le pain maison par ici.";
        if (m === 0 && day === 1) return "Bonne année ! Mon souhait : plus de soupers partagés.";
        if (m === 9 && day === 31) return "Joyeuse Halloween ! Promis, je fais pas peur — juste des blagues.";
        if (m === 1 && day === 14) return "Bonne Saint-Valentin ! Mon cœur est un boulon, mais il bat pareil.";
        if (m >= 2 && m <= 4) return "C'est le printemps : les recettes fraîches reviennent, et moi avec.";
        if (m >= 5 && m <= 7) return "C'est l'été au Québec : profite du soleil entre deux parties de jeux !";
        if (m >= 8 && m <= 10) return "C'est l'automne : saison des soupes, des pommes et des histoires au chaud.";
        return "C'est l'hiver qui s'en vient : tuque, soupe chaude et petits jeux au chaud.";
      }
      document.documentElement.addEventListener('mouseleave', function(){
        if (byeDone || docHidden) return;
        byeDone = true;
        if (state === 'sleep' || paused || qaOpen || gameOn || calm) return;
        busyUntil = 0;
        setState('wave'); setExpr('happy'); busy(2600);
        showBubble("Va vivre ta vie, moi je fais une sieste !", 5000);
        setTimeout(function(){ if (state === 'wave') setState(reduced ? 'idle' : 'walk'); }, 2600);
      });

      /* ---------- Démarrage : arrivée + salut ---------- */
      x = clampX(Math.round(vw()/2 - BOT_W/2));
      if (vw() < 560) x = clampX(14);
      if (reduced) x = maxX();
      place();
      applyCostume();
      // Pixel est là dès l'arrivée : lovée en sieste dans un coin ensoleillé.
      catVisible = true;
      catMode = 'stay';
      catX = Math.max(6, x - CAT_W - 14);
      if (catX < 6 || x - CAT_W - 14 < 6) catX = Math.min(vw() - CAT_W - 6, x + botW() + 14);
      setCatState('sleep');
      catPlace();
      requestAnimationFrame(frame);
      setTimeout(function(){
        setState('wave'); setExpr('happy'); busy(3000);
        showBubble(esc(INTRO), 6000);
        setTimeout(function(){
          if (state !== 'wave') return;
          busyUntil = 0;
          var h = new Date().getHours();
          if (h >= 7 && h < 10){
            setState(reduced ? 'idle' : 'walk');
            doStretch(MORNING_LINE);
          } else {
            setState(reduced ? 'idle' : 'walk');
          }
          if (isNight()) lastInteract = Date.now() - 38000; // la nuit, le dodo vient vite
        }, 3000);
        scheduleTalk();
        scheduleLife();
        scheduleWave();
        scheduleCatLife();
        scheduleChoix();
        if (seasonDecorKind()) setTimeout(function(){
          if (!isBusy() && state !== 'sleep' && !qaOpen && !gameOn) doDecor();
        }, 17000);
        setTimeout(function(){
          // Lot nº 3 : jamais pendant la visite guidée (voir talk()).
          if (Date.now() - lastBubbleAt > 6500 && state !== 'sleep' && !qaOpen && !gameOn && !tourOn){
            showBubble(esc(momentLine()), 6000);
          }
        }, 9500);
        // Nouveauté du site : soulignée une seule fois, dans sa vie, sans insister.
        setTimeout(function(){
          if (state !== 'sleep' && !qaOpen && !gameOn && !paused && !tourOn && Date.now() - lastBubbleAt > 6000){
            showBubble(esc(pick(NEWS_LINES)), 7000);
            logDay("annoncé une nouveauté du site");
          }
        }, 34000);
      }, 500);

      /* ---------- Portage site : reprise de la visite guidée après navigation ---------- */
      try {
        var savedTour = sessionStorage.getItem('hgpto-tour');
        if (savedTour !== null) {
          var resumeIdx = parseInt(savedTour, 10);
          if (!isNaN(resumeIdx) && resumeIdx >= 0 && resumeIdx < TOUR.length) {
            tourOn = true; tourIdx = resumeIdx;
            document.getElementById('qa-tour').textContent = 'Arrêter la visite';
            tourTimer = setTimeout(tourStep, 2600);
          } else {
            sessionStorage.removeItem('hgpto-tour');
          }
        }
      } catch(e) {}

      /* ---------- Guidage ponctuel en attente : un « Montre-moi… » a changé
         de page ; à l'arrivée, il présente la section demandée (défilement +
         brillance). Pendant une visite, c'est la visite qui mène : on ignore. */
      try {
        var pendingGuide = sessionStorage.getItem('hgpto-guide');
        if (pendingGuide) {
          sessionStorage.removeItem('hgpto-guide');
          if (!tourOn) setTimeout(function(){ guideTo(pendingGuide, null); }, 1200);
        }
      } catch(e) {}

      /* ---------- INTELLIGENCE ÉMOTIONNELLE (lot nº 2) ----------
         Signaux de la SESSION en cours seulement : aucune donnée
         personnelle, rien n'est conservé entre les visites. Il lit le
         rythme de la visite et adapte son ton. LIGNE ROUGE : ça sert le
         confort et l'aide, JAMAIS la vente — aucun levier émotif,
         aucune culpabilité, aucune tristesse jouée. */
      var navTimes = [], visitCount = {}, summarySaid = {}, restSaid = false, lostSaidAt = 0, presseUntil = 0;
      var ROUTE_FACTS = {
        '/sans-honte': "Petit résumé calme : 15 kits à 5 $ chacun, le bundle « Choisis 10 parmi 15 » à 40 $, aucune taxe ajoutée. Prends ton temps.",
        '/livres-pdf': "Petit résumé calme : 4 livres en PDF, de 10 $ à 20 $, téléchargement immédiat après le paiement. Prends ton temps.",
        '/ateliers': "Petit résumé calme : les ateliers vont de 120 $ à 150 $, à Terrebonne et dans Lanaudière, et on répond à tes questions par courriel. Prends ton temps.",
        '/les-passeurs': "Petit résumé calme : les Passeurs, c'est 1 $ par mois pour soutenir HP Outils — et l'inscription payante arrive bientôt, en toute honnêteté. Prends ton temps."
      };
      function isSensitiveRoute(){ return routeKey() === '/sans-honte'; }
      function isPresse(){ return Date.now() < presseUntil; }
      function ieOnRoute(k){
        var now = Date.now();
        navTimes.push(now);
        navTimes = navTimes.filter(function(t){ return now - t < 30000; });
        visitCount[k] = (visitCount[k] || 0) + 1;
        // Visiteur pressé : 3 pages en moins de 25 s → il se fait bref et discret un moment.
        var recent = navTimes.filter(function(t){ return now - t < 25000; });
        if (recent.length >= 3) presseUntil = now + 90000;
        if (paused || isHidden || docHidden || gameOn || qaOpen) return;
        // Visiteur perdu : allers-retours rapides → proposer le guidage, rarement, sans l'imposer.
        if (navTimes.length >= 4 && now - lostSaidAt > 180000 && state !== 'sleep' && !isBusy() && now - lastBubbleAt > 8000){
          lostSaidAt = now;
          showBubble("Tu cherches quelque chose de précis ? Touche « Une question ? » — je te guide avec plaisir. Ou continue à ton rythme : je ne te suis pas aux talons, promis.", 9000, 'question');
          return;
        }
        // Hésitation : 3e visite de la même page produit → résumé calme des faits, une fois par page.
        if (visitCount[k] === 3 && ROUTE_FACTS[k] && !summarySaid[k]){
          summarySaid[k] = true;
          setTimeout(function(){
            if (!paused && !gameOn && !qaOpen && state !== 'sleep' && !isBusy() && Date.now() - lastBubbleAt > 7000){
              showBubble(esc(ROUTE_FACTS[k]), 10000, 'answer');
              // Lot nº 3 : ce résumé compte comme LA suggestion de la
              // page — le système de suggestions n'en ajoutera pas une
              // deuxième par-dessus (plafond de page partagé).
              suggPage[k] = 1;
            }
          }, 1400);
        }
      }

      /* ---------- LE VENDEUR, VERSION HP (lot nº 3) ----------
         Système de suggestions unifié : il propose le produit juste au
         bon moment, avec les techniques PROPRES seulement —
         recommandation argumentée (fait vrai relié au besoin exprimé),
         alternative honnête (la porte gratuite offerte après le payant),
         bundle dit vrai (le calcul réel, conditionné honnêtement).
         PLAFONDS (recommandations du panneau, non négociables) :
         · max 1 suggestion par page (le résumé calme du lot nº 2 compte
           dans le même créneau) ;
         · jamais deux fois le même produit dans une session ;
         · un refus (« Non merci », toujours offert dans la bulle) fait
           taire ce produit pour la session ;
         · jamais deux suggestions collées (≥ 75 s entre deux) ;
         · jamais pendant le jeu, le sommeil, le mode calme ; jamais
           pendant la visite (sauf sa suggestion douce de fin) ; dans le
           panneau de questions, seulement quand la suggestion RÉPOND à
           la question posée ;
         · un visiteur détecté PRESSÉ ne reçoit AUCUNE suggestion : le
           signal émotif sert le confort, jamais la vente ;
         · un besoin exprimé sur le ton de la détresse ne reçoit aucun
           produit, jamais. */
      var suggByKey = {}, suggOff = {}, suggPage = {}, suggLastAt = 0;
      var kitInterest = 0, lastBundleSchedAt = 0, tourEndChoix = 0;
      var dwellRoute = routeKey(), dwellStart = Date.now();
      function suggKey(p){ return (p.u || '') + '|' + (p.l || ''); }
      function canSuggest(p, opts){
        opts = opts || {};
        if (suggOff[suggKey(p)]) return false;
        if (!opts.asked && suggByKey[suggKey(p)]) return false;
        if (paused || isHidden || docHidden || calm || gameOn) return false;
        if (state === 'sleep') return false;
        if (tourOn && !opts.tourEnd) return false;
        if (qaOpen && !opts.fromQA && !opts.asked) return false;
        if (isPresse()) return false;
        // Les alternatives honnêtes (opts.soft) sont des courtoisies de
        // descente, pas des pitches : dédupliquées et refusables comme
        // les autres, mais elles ne consomment ni le créneau de la page
        // ni l'espacement — sinon le calcul du bundle, qui suit le 2e
        // intérêt kits, ne pourrait jamais apparaître dans le fil
        // naturel des questions.
        if (!opts.asked && !opts.tourEnd && !opts.soft){
          if (suggPage[routeKey()]) return false;
          if (Date.now() - suggLastAt < 75000) return false;
        }
        return true;
      }
      function doSuggest(p, opts){
        opts = opts || {};
        if (!opts.pre && !canSuggest(p, opts)) return false;
        suggByKey[suggKey(p)] = 1;
        if (!opts.soft){ suggPage[routeKey()] = 1; suggLastAt = Date.now(); }
        doInvite(p);
        // Le « non » aussi facile que le « oui » : un bouton « Non
        // merci » dans la bulle de chaque suggestion. Un clic = ce
        // produit se tait pour toute la session.
        var nb = document.createElement('button');
        nb.type = 'button';
        nb.className = 'bubble-no';
        nb.textContent = 'Non merci';
        nb.addEventListener('pointerdown', function(ev){ ev.stopPropagation(); });
        nb.addEventListener('click', function(){
          suggOff[suggKey(p)] = 1;
          hideBubble();
          setExpr('happy');
          showBubble("Bien correct ! Je ne t'en reparlerai pas. Je reste dans le coin si tu as besoin d'autre chose.", 6000, 'talk');
        });
        bubble.appendChild(document.createElement('br'));
        bubble.appendChild(nb);
        return true;
      }
      /* Le besoin exprimé en mots → LE produit qui fait ça. Double garde :
         un ton de détresse coupe tout (jamais de produit sur la peine), et
         sur la page des kits, la dignité passe d'abord (la base répond
         déjà aux questions de contenu ; pas de pitch ajouté là-bas). */
      function matchBesoin(q){
        var nq = ' ' + normText(q) + ' ';
        if (/(triste|decourag|deprim|angoiss|stress|epuis|desesper|plus capable|a bout)/.test(nq)) return null;
        if (routeKey() === '/sans-honte') return null;
        for (var i = 0; i < BESOIN_SUGGESTIONS.length; i++){
          var e = BESOIN_SUGGESTIONS[i], hit = false, j;
          for (j = 0; j < e.mots.length; j++){ if (nq.indexOf(e.mots[j]) !== -1){ hit = true; break; } }
          if (!hit) continue;
          if (e.aussi){
            var ok2 = false;
            for (j = 0; j < e.aussi.length; j++){ if (nq.indexOf(e.aussi[j]) !== -1){ ok2 = true; break; } }
            if (!ok2) continue;
          }
          return e;
        }
        return null;
      }
      /* L'alternative honnête : suit une réponse « produit payant » dans
         le panneau de questions, seulement si le panneau est encore
         ouvert (sinon, silence — on ne poursuit pas le visiteur). */
      function scheduleAlt(fam){
        var line = ALT_LINES[fam];
        if (!line) return;
        setTimeout(function(){
          if (!qaOpen) return;
          doSuggest(line, { fromQA:true, soft:true });
        }, 9500);
      }
      /* Le bundle, dit vrai : au 2e intérêt pour les kits dans la
         session, le calcul honnête est présenté — une seule fois. */
      function scheduleBundle(){
        lastBundleSchedAt = Date.now();
        setTimeout(function(){
          if (!qaOpen) return;
          doSuggest(BUNDLE_MATH, { fromQA:true });
        }, 9800);
      }
      /* L'hésitation regardée : sur une page produit, un visiteur qui
         regarde longuement sans rien faire reçoit UN résumé argumenté
         + l'alternative honnête (données DWELL_SUGGESTIONS). Seuil de
         40 s, PAS plus : à 50 s d'inactivité, il s'endort (règle de vie
         du site) — et on ne réveille jamais un dormeur pour vendre.
         La suggestion n'arrive que dans un moment creux (aucune bulle
         affichée). /sans-honte est exclu : route sensible, dignité
         d'abord — le résumé calme du lot nº 2 y couvre l'hésitation. */
      setInterval(function(){
        if (!DWELL_SUGGESTIONS[dwellRoute]) return;
        if (Date.now() - dwellStart < 40000) return;
        // Moment creux : aucune bulle, ou une bulle ambiante déjà âgée
        // (≥ 4 s — elle allait se retirer d'elle-même).
        if (bubble.classList.contains('show') && Date.now() - lastBubbleAt < 4000) return;
        if (isBusy() || state === 'sleep' || state === 'focus') return;
        doSuggest(DWELL_SUGGESTIONS[dwellRoute]);
      }, 2500);

      /* ---------- DÉGUISEMENTS CONTEXTUELS (lot nº 2) ----------
         Un seul costume à la fois. Priorité : le calendrier des fêtes et
         événements du Québec (assorti aux décos saisonnières déjà en
         place), puis la page : tablier + mitaines de four en cuisine,
         super-héros / lutteur en rotation douce aux jeux. Pendant une
         partie du jeu caché, il joue en chandail : costume rangé. */
      function calendarCostume(){
        var d = new Date(), m = d.getMonth(), day = d.getDate();
        if (seasonDecorKind() === 'halloween') return 'halloween';
        if (m === 11) return 'noel';
        if (m === 5 && day >= 21 && day <= 27) return 'stjean';
        if ((m === 2 && day >= 15) || m === 3) return 'sucres';
        if (m === 8 && day <= 14) return 'rentree';
        return null;
      }
      var jeuxCostumeIdx = 0;
      function applyCostume(){
        var c = calendarCostume();
        if (!c){
          var k = routeKey();
          if (k === '/en-cuisine') c = 'apron';
          else if (k === '/jeux') c = (jeuxCostumeIdx % 2) ? 'wrestler' : 'hero';
          else c = '';
        }
        if (gameOn) c = '';
        bot.setAttribute('data-costume', c || '');
      }
      setInterval(function(){
        if (routeKey() === '/jeux' && !calendarCostume()) jeuxCostumeIdx++;
        applyCostume();
      }, 45000);

      /* ---------- Portage site : « Accompagne-moi » commente les pages (routes) ---------- */
      var ROUTE_COMMENTS = {
        '/': "Te voilà à l'accueil ! C'est ici que tout commence.",
        '/jeux': "Les jeux gratuits ! Veux-tu que je t'en conseille un ? Ouvre « Une question ? ».",
        '/sans-honte': "Les kits Sans Honte, 5 $ chacun. Regarde-les à ton rythme, sans pression.",
        '/en-cuisine': "629 recettes gratuites : parfait quand le frigo a l'air vide mais ne l'est pas.",
        '/livres-pdf': "Nos livres ! « Horizon Québec » est mon préféré… mais je suis partial, je le lis tout le temps.",
        '/ateliers': "Les ateliers, à Terrebonne : cuisiner ensemble, ça rapproche.",
        '/balado': "Le balado « Futur simple » : un épisode chaque lundi, sans jargon.",
        '/les-passeurs': "Les Passeurs : les gens qui soutiennent HP Outils, 1 $ par mois."
      };
      var lastRoute = routeKey();
      setInterval(function(){
        var k = routeKey();
        if (k === lastRoute) return;
        lastRoute = k;
        dwellRoute = k; dwellStart = Date.now();
        ieOnRoute(k);
        applyCostume();
        if (!accompany || paused || isHidden || gameOn || qaOpen || state === 'sleep' || isBusy()) return;
        if (commentedSecs['route:' + k]) return;
        var line = ROUTE_COMMENTS[k];
        if (!line) return;
        if (Date.now() - lastAccompAt < 9000) return;
        commentedSecs['route:' + k] = true;
        lastAccompAt = Date.now();
        guideTarget = maxX() - 8;
        showBubble(esc(line), 7000, 'talk');
      }, 1200);

}
