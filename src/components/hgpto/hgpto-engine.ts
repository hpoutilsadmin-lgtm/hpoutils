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
import { JOKES, GAME_PITCHES, BOOK_PITCHES, KIT_PITCHES, ATELIER_PITCHES, PITCHES, TICKLE_LINES, TICKLE_BIG, SLEEP_LINES, TINKER_LINES, WAVE_LINES, COOK_LINES, COOK_TASTE, RECETTES_LINE, EVENING_LINES, COMPANION_LINES, MEALS, HUGO_LINES, EMOJI_LINES, QC_HISTORY, ANECDOTES, PHILO, EMPATHY, NEWS_LINES, JANITOR, INTRO, STARTLE_LINES, BUCKET_LINES, YAWN_LINE, MORNING_LINE, NIGHTFALL_LINE, SITE_FACTS, FALLBACK, KB, SYNONYMS, STOPWORDS, AIRS_ORIGINAUX, HUGO_SONGS, CHOIX_LINES, ETHIQUE_LINES, GRUMBLES, BESOIN_SUGGESTIONS, ALT_LINES, BUNDLE_MATH, DWELL_SUGGESTIONS, VENDEUR_HOOKS, MOOD_LINES, BUMP_LINE, BUMP_END, GNOME_LINES, GNOME_LINES_GROGNON, ESCALATION_LINE, ESCALATION_EMPATHY, REFUND_POLICY, LIEN_PERDU_TEXT, RETURN_WINK_LINES, SURPRISE_WINK_LINES, SURPRISE_MED_LINES, SURPRISE_BIG_LINES } from "./hgpto-data";

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
      var btnGames = document.getElementById('btn-games');
      var btnSound = document.getElementById('btn-sound');
      var selMood = document.getElementById('sel-mood');
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
                        EXPLIQUENT chaque endroit, rythme apaisé.
         · 2026-10-22 — LOT Nº 4 « contrôles + humeurs » (demandes d'Hugo :
         · 2026-10-23 — lot « HGPTO joueur » (porté de l'artefact vérifié) :
                        tampons officiels au panneau, « Jouer avec HGPTO » à
                        Montgolfière, « Lis-moi ça » (Web Speech), gag hélium,
                        flash info avant les infos produit demandées.
                        « il manque des endroits pour revenir aux jeux,
                        faire pause, ajuster le son » + le sélecteur
                        d'humeur) : rangée de contrôles complétée — bouton
                        JEUX (guideTo sec-jeux, la mécanique de guidage
                        existante), bouton PAUSE qui fige sa VIE avec sa
                        bulle (« Je suis en pause — touche Pause pour
                        repartir ») sans bloquer ni les questions ni le
                        jeu en cours, SON en trois niveaux (Fort → Doux →
                        Muet, facteur appliqué à la voix, aux sons et au
                        fredonnage), et le sélecteur d'HUMEUR choisi par le
                        visiteur (session seulement) : Normal (défaut) /
                        Vendeur (accroches franches en tête des suggestions
                        + fréquence au maximum permis — plafonds du lot
                        nº 3 INCHANGÉS, annonce honnête du mode) / Drôle
                        (blagues et vignettes comiques rapprochées, plus
                        aucune suggestion spontanée — seulement en réponse
                        à une question) / Grognon (comique, jamais contre
                        le visiteur : ses grognes deviennent fréquentes,
                        grawlix « (%#!!) » et tape-du-pied sur SES
                        malchances, mini-scène de l'encadré de porte,
                        résilience intacte). */
      var COMPANION_EVERY = 0.16;              // part des bulles « accompagnateur »
      var TWO_HOURS_MS = 2 * 60 * 60 * 1000;   // scène des 2 heures, une seule fois
      var pitchPoolIdx = 0;
      function endVignette(pool, prob){
        // Lot nº 4, humeur Vendeur : la probabilité d'essayer une
        // suggestion en fin de vignette monte au maximum — les plafonds
        // du lot nº 3 (canSuggest) décident toujours, eux, inchangés.
        if (mood === 'vendeur') prob = Math.max(prob == null ? 0.55 : prob, 0.95);
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
      var mood = 'normal';   // lot nº 4 : humeur choisie par le visiteur, session seulement
      var hgMode = 'defaut';   // phase 2 (23 oct. 2026) : le MODE choisi par le visiteur — 'defaut' (comportement actuel, inchangé) | 'vendeur' | 'ami' | 'grognon' ; pilote `mood` + les couches propres à chaque mode ; session seulement (sessionStorage 'hgpto-mode')
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
      /* Lot nº 4 : le son devient un réglage en trois niveaux — Fort →
         Doux → Muet — appliqué à TOUT ce qu'il émet (voix charabia,
         petits sons, fredonnage, sons de Pixel) via volMul(), lu au
         point unique d'émission. `muted` reste le garde historique des
         fonctions de son : il vaut vrai exactement au niveau Muet.
         Session seulement, comme tout chez lui. */
      var soundLevel = 2;   // 2 = fort, 1 = doux, 0 = muet
      function volMul(){ return soundLevel === 2 ? 1 : soundLevel === 1 ? 0.45 : 0; }
      function syncMuted(){ muted = soundLevel === 0; }
      function ensureAudio(){
        if (!actx){
          var AC = window.AudioContext || window.webkitAudioContext;
          if (AC){ try { actx = new AC(); } catch(e){ actx = null; } }
        }
        if (actx && actx.state === 'suspended') actx.resume();
      }
      function tone(t0, f0, f1, dur, vol, type){
        if (!actx || soundLevel === 0) return;
        var o = actx.createOscillator(), g = actx.createGain(), fl = actx.createBiquadFilter();
        o.type = type || 'triangle';
        fl.type = 'bandpass'; fl.frequency.value = 950; fl.Q.value = 1.1;
        o.frequency.setValueAtTime(f0, t0);
        o.frequency.exponentialRampToValueAtTime(Math.max(40, f1), t0 + dur);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol * volMul(), t0 + dur*0.25);
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
        var base = mood === 'sleep' ? 175 : mood === 'joke' ? 392 : mood === 'answer' ? 318 : mood === 'helium' ? 615 : 292;
        var step = mood === 'sleep' ? 0.22 : mood === 'joke' ? 0.1 : 0.12;
        var vol = mood === 'sleep' ? 0.03 : (mood === 'answer' ? 0.033 : (mood === 'helium' ? 0.034 : 0.046));
        var n = Math.max(2, Math.min(24, Math.round(text.length / 6)));
        var tt = actx.currentTime + 0.02;
        for (var i=0;i<n;i++){
          var f = Math.min(mood === 'helium' ? 860 : 470, base * (0.9 + Math.random()*0.32));
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
        if (!actx || soundLevel === 0) return;
        var hv = 0.034 * volMul();   // lot nº 4 : le fredonnage suit le niveau de son choisi
        var f = 440 * Math.pow(2, (midi - 69) / 12);
        var o = actx.createOscillator(), g = actx.createGain(), fl = actx.createBiquadFilter();
        o.type = 'sine';
        fl.type = 'lowpass'; fl.frequency.value = 1150;
        o.frequency.setValueAtTime(f * 0.995, t0);
        o.frequency.exponentialRampToValueAtTime(f, t0 + Math.min(0.09, dur * 0.3));
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(hv, t0 + 0.07);
        g.gain.setValueAtTime(hv, t0 + Math.max(0.07, dur - 0.09));
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
        // Lot nº 4, humeur Drôle : le « choix » SPONTANÉ se tait (il
        // passe par doSuggest en mode pre, hors canSuggest) — demandé
        // explicitement par la puce, il répond comme avant.
        if (mood === 'drole' && !asked) return;
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
          // Lot nº 4, humeur Vendeur : l'espacement du « choix » descend
          // au plancher du lot nº 3 (75 s) — jamais en-dessous, et le
          // maximum de 2 par session ne bouge pas.
          var gap = mood === 'vendeur' ? 75000 : 150000;
          if (choixCount < 2 && Date.now() - choixLastAt > gap) doChoix();
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
      /* Correctif lecture (Hugo, 23 oct. 2026) : avant, une bulle vivait
         le temps plat passé par l'appelant (plancher de 8 s, aucun lien
         avec la longueur) et n'importe quelle réplique suivante
         l'écrasait instantanément — mesuré : l'intro de la visite
         disparaissait après 1,6 s, une étape de 340 caractères tenait
         11,6 s, les répliques des scènes se remplaçaient toutes les
         1,5 à 4 s. Maintenant : durée PROPORTIONNELLE au texte
         (minimum 8 s — reco du panneau pour les aînés — + ~50 ms par
         caractère, plafond 45 s pour les très longues réponses), et
         une réplique ambiante ne peut plus écraser une bulle encore
         dans son temps de lecture garanti : elle attend son tour dans
         une file — les répliques se succèdent, sans se chevaucher.
         Les réponses demandées par le visiteur (mood « answer » /
         « question ») et les réactions immédiates à ses gestes
         (opts.now) passent tout de suite, comme avant. */
      var bubbleFreeAt = 0;
      var bubbleQueue = [];
      var bubbleFlushTimer = null;
      function bubbleReadMs(html, dur){
        var len = plainText(html).length;
        // Mode Ami (phase 2) : lecture plus lente, pensée pour les
        // jeunes et les aînés — plancher relevé à 10 s et ~70 ms par
        // caractère au lieu de ~50.
        var base = hgMode === 'ami' ? 10000 : 8000;
        var per = hgMode === 'ami' ? 70 : 50;
        var ms = Math.max(dur || 0, base + len * per);
        return Math.min(ms, 45000);
      }
      function renderBubble(html, dur, mood, onShow){
        bubble.innerHTML = html;
        bubble.classList.add('show');
        lastBubbleAt = Date.now();
        speak(plainText(html), mood || (state === 'sleep' ? 'sleep' : 'talk'));
        if (onShow) onShow();
        if (bubbleTimer) clearTimeout(bubbleTimer);
        bubbleTimer = null;
        if (dur){
          var ms = bubbleReadMs(html, dur);
          bubbleFreeAt = Date.now() + ms;
          bubbleTimer = setTimeout(expireBubble, ms);
          return ms;
        }
        bubbleFreeAt = 0;
        return 0;
      }
      function expireBubble(){
        bubbleTimer = null;
        bubble.classList.remove('show');
        bubbleFreeAt = 0;
        flushBubbleQueue();
      }
      function flushBubbleQueue(){
        if (bubbleFlushTimer){ clearTimeout(bubbleFlushTimer); bubbleFlushTimer = null; }
        if (!bubbleQueue.length) return;
        // Le jeu, le panneau, la visite et le sommeil ont leurs propres
        // canaux : la file ambiante se vide plutôt que de s'y immiscer.
        if (gameOn || qaOpen || tourOn || state === 'sleep' || paused){ bubbleQueue.length = 0; return; }
        var next = bubbleQueue.shift();
        renderBubble(next.html, next.dur, next.mood, next.onShow);
      }
      function showBubble(html, dur, mood, opts){
        var priority = (mood === 'answer' || mood === 'question') || (opts && opts.now);
        var onShow = opts && opts.onShow;
        if (!priority && dur && bubble.classList.contains('show') && Date.now() < bubbleFreeAt){
          bubbleQueue.push({ html:html, dur:dur, mood:mood, onShow:onShow });
          if (bubbleQueue.length > 5) bubbleQueue.shift();
          if (bubbleFlushTimer) clearTimeout(bubbleFlushTimer);
          bubbleFlushTimer = setTimeout(flushBubbleQueue, Math.max(50, bubbleFreeAt - Date.now()));
          return 0;
        }
        if (priority) bubbleQueue.length = 0;
        return renderBubble(html, dur, mood, onShow);
      }
      function hideBubble(){
        bubble.classList.remove('show');
        if (bubbleTimer){ clearTimeout(bubbleTimer); bubbleTimer = null; }
        if (bubbleFlushTimer){ clearTimeout(bubbleFlushTimer); bubbleFlushTimer = null; }
        bubbleQueue.length = 0;
        bubbleFreeAt = 0;
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
        // Lot nº 4, humeur Grognon : ses grognes deviennent FRÉQUENTES
        // (~85 %, rappel ramené à 20 s) — comiques, dans SA vie
        // seulement. Dans les autres humeurs, le dosage du lot nº 3
        // (~1 fois sur 2, ≥ 90 s) reste exactement le même.
        var cd = mood === 'grognon' ? 20000 : 90000;
        var pr = mood === 'grognon' ? 0.85 : 0.5;
        if (Date.now() - lastGrumbleAt < cd) return false;
        if (Math.random() >= pr) return false;
        lastGrumbleAt = Date.now();
        return true;
      }
      function grumbleText(){
        var t = GRUMBLES[grumbleIdx % GRUMBLES.length]; grumbleIdx++;
        if (mood === 'grognon'){
          // Le grawlix du grognon comique, et le tape-du-pied qui va
          // avec : la classe réutilise l'animation « stomp » existante
          // (celle de sa colère brève), trois petits coups de pied.
          bot.classList.add('stomping');
          setTimeout(function(){ bot.classList.remove('stomping'); }, 950);
          return t + " (%#!!)";
        }
        return t;
      }

      /* ---------- Surprises et retour de page (service client, 23 oct. 2026) ----------
         Continuité de SESSION seulement (sessionStorage, comme
         « hgpto-closed ») : les pages déjà vues et celles déjà
         clin-d'œillées vivent le temps de la visite, pas plus.
         Portes de probabilité par occasion de bavardage, décision
         d'Hugo : micro-clin d'œil 1/15, surprise moyenne 1/35, grosse
         surprise 1/80 — tirées en cascade (la plus rare d'abord) et
         jamais rapprochées (≥ 90 s entre deux surprises). */
      function loadSet(key){
        try { var v = JSON.parse(sessionStorage.getItem(key) || '[]'); return Array.isArray(v) ? v : []; }
        catch(e){ return []; }
      }
      function saveSet(key, arr){
        try { sessionStorage.setItem(key, JSON.stringify(arr)); } catch(e){}
      }
      var visitedRoutes = loadSet('hgpto-visited');
      var winkedRoutes = loadSet('hgpto-winked');
      var returnWinkPending = false;
      var lastSurpriseAt = 0;
      function markWinked(k){
        if (winkedRoutes.indexOf(k) === -1){ winkedRoutes.push(k); saveSet('hgpto-winked', winkedRoutes); }
      }
      function rollSurprise(){
        if (Date.now() - lastSurpriseAt < 90000) return null;
        var r = Math.random();
        // Mode Grognon drôle (phase 2) : les surprises partent trois
        // fois plus souvent — les bêtises, c'est son mode.
        var boost = hgMode === 'grognon' ? 3 : 1;
        var tier = null;
        if (r < boost * (1/80)) tier = 'big';
        else if (r < boost * (1/80 + 1/35)) tier = 'med';
        else if (r < boost * (1/80 + 1/35 + 1/15)) tier = 'wink';
        if (!tier) return null;
        lastSurpriseAt = Date.now();
        return { tier:tier, line: tier === 'big' ? pick(SURPRISE_BIG_LINES) : tier === 'med' ? pick(SURPRISE_MED_LINES) : pick(SURPRISE_WINK_LINES) };
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
        if (dp && Date.now() - dwellStart > dwellThreshold() && canSuggest(dp)){ doSuggest(dp); return; }
        if (isPresse() && Math.random() < 0.7) return;   // visiteur pressé : il se fait discret (lot nº 2)
        // Clin d'œil de retour (service client, 23 oct. 2026) : le
        // visiteur revient sur une page déjà vue CETTE visite-ci —
        // un clin d'œil court, une fois par page et par session,
        // jamais sur une route sensible ; les gardes en tête de
        // talk() assurent déjà « jamais pendant une tâche ».
        if (returnWinkPending){
          returnWinkPending = false;
          if (!isSensitiveRoute()){
            markWinked(routeKey());
            showBubble(esc(pick(RETURN_WINK_LINES)), 6000, 'talk');
            alternate++;
            return;
          }
        }
        // Surprises probabilisées (1/15, 1/35, 1/80 — voir rollSurprise) :
        // cosmétiques seulement, jamais sur une route sensible, et le
        // visiteur pressé ci-dessus garde sa tranquillité 70 % du temps.
        if (!isSensitiveRoute()){
          var surp = rollSurprise();
          if (surp){
            if (surp.tier === 'big'){
              // Grosse surprise rare : le salut du lutteur — état « wave »
              // existant, aucun nouvel état inventé.
              setState('wave'); setExpr('laugh'); busy(2400);
              spawnBurst(['✦','⭐','✧'], 8);
              showBubble(esc(surp.line), 6600, 'joke');
              setTimeout(function(){ if (state === 'wave'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); } }, 2450);
            } else if (surp.tier === 'med'){
              spawnBurst(['♪','♫','✦'], 5);
              showBubble(esc(surp.line), 5800, 'talk');
            } else {
              showBubble(esc(surp.line), 5000, 'talk');
            }
            alternate++;
            return;
          }
        }
        // Lot nº 4, humeur Drôle — et mode Grognon drôle (phase 2) :
        // l'espièglerie passe devant — une chance sur deux, le
        // bavardage devient directement une blague.
        if ((mood === 'drole' || hgMode === 'grognon') && Math.random() < 0.5){
          showBubble(esc(JOKES[jokeIdx % JOKES.length]), 5200, 'joke'); jokeIdx++;
          logDay("raconté des blagues — j'en connais 62 !");
          alternate++;
          return;
        }
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
        }, (isNight() ? 16000 : (hgMode === 'ami' ? 20000 : ((mood === 'drole' || hgMode === 'grognon') ? 6500 : 11000))) + Math.random()*5000);
      }

      /* ---------- Invitation : pancarte + bras qui pointe ---------- */
      function doInvite(p, onShow, immediate){
        if (paused || state === 'sleep' || isBusy()) { showBubble(esc(p.t) + (p.u ? linkHtml(p) : ''), 6000, null, { onShow:onShow, now:immediate }); return; }
        setState('invite'); setExpr('happy'); busy(5600);
        signText.textContent = p.s || 'PAR ICI →';
        showBubble(esc(p.t) + (p.u ? linkHtml(p) : ''), 6200, null, { onShow:onShow, now:immediate });
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

      /* ---------- Barbouiller la photo d'Hugo (ajout d'Hugo, 22 oct.
         2026) : vignette RARE, seulement sur les pages qui hébergent
         la photo d'Hugo avec son système de déguisements (détection
         ci-dessous). Il s'approche de la photo, joue l'artiste
         (posture « graffiti », sans l'élément graffiti), puis émet
         l'événement fenêtre `hgpto:barbouille-photo` — c'est le
         système photo, de son côté, qui applique son état
         « barbouillage » (chapeau melon + lunettes griffonnés).
         Plafonds de session : 2 fois au plus, jamais à moins de
         8 minutes d'intervalle — jamais en boucle. */
      var barbouilleCount = 0, lastBarbouilleAt = 0;
      function photoSystemEl(){
        return document.querySelector('[data-deguisements], [data-hugo-photo], img[src*="photo-hp"]');
      }
      function canBarbouille(){
        if (barbouilleCount >= 2) return false;
        if (Date.now() - lastBarbouilleAt < 8 * 60 * 1000) return false;
        return !!photoSystemEl();
      }
      function doBarbouille(){
        var el = photoSystemEl();
        if (!el || state === 'sleep' || paused || isBusy() || qaOpen || gameOn || tourOn || isNight()) return;
        barbouilleCount++; lastBarbouilleAt = Date.now();
        var rect = el.getBoundingClientRect();
        var target = Math.max(4, Math.min(vw() - botW() - 4, rect.left + rect.width / 2 - botW() / 2));
        setState('idle'); setExpr('focus'); busy(9500);
        showBubble("Chuuut… l'artiste travaille.", 2600, 'question');
        if (reduced){ x = target; place(); }
        else {
          bot.classList.remove('nosmooth');
          bot.style.transition = 'transform .9s ease';
          x = target; place();
          setTimeout(function(){ bot.style.transition = ''; }, 950);
        }
        setTimeout(function(){
          if (state !== 'idle' || gameOn || tourOn) return;
          setState('graffiti'); setExpr('focus');
          logDay("barbouillé la photo d'Hugo — chapeau melon et lunettes, signés HGPTO");
        }, 1200);
        setTimeout(function(){
          // Le geste est fait : on prévient le système photo. (S'il
          // s'est fait prendre sur le fait — état « caught » — le
          // barbouillage a quand même eu lieu.)
          if (state === 'graffiti' || state === 'caught'){
            window.dispatchEvent(new CustomEvent('hgpto:barbouille-photo'));
          }
        }, 3600);
        setTimeout(function(){
          if (state !== 'graffiti') return;
          setExpr('laugh'); giggle();
          showBubble("Tadam ! Je lui ai dessiné un chapeau melon et des lunettes — regarde sa photo !", 3600, 'joke');
        }, 4100);
        setTimeout(function(){
          if (state === 'graffiti'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 9500);
      }
      function previewBarbouille(){
        lastBarbouilleAt = 0; barbouilleCount = 0;
        // Le bouton vit dans le panneau de questions : on le referme
        // et on libère l'occupation d'ouverture, sinon les gardes de
        // la vignette (qaOpen, isBusy) la bloqueraient à tout coup.
        if (qaOpen) closeQA();
        busyUntil = 0;
        doBarbouille();
      }
      document.getElementById('qa-barbouille').addEventListener('click', previewBarbouille);

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
        showBubble("🎵 …moi ? Je sifflais en regardant le paysage. Rien d'autre.", 3400, 'none', { now:true });
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
        showBubble("Ouille ouille…", 1400, 'none', { now:true });
        setTimeout(function(){
          if (state !== 'tumble') return;
          setExpr('laugh'); giggle();
          showBubble("Même pas mal — on avance !", 2600, 'joke', { now:true });
        }, 2100);
        setTimeout(function(){
          if (state === 'tumble'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 3600);
      }

      /* ---------- L'encadré de porte (lot nº 4) : il se cogne, grogne, repart ----------
         Mini-scène légère de SA vie : en marchant, il se cogne sur un
         encadré de porte imaginaire. Petit sursaut, puis — selon le tirage
         des grognes (fréquent et grawlixé en humeur Grognon) — sa phrase
         signature OU la ligne de la scène, et toujours la résilience au
         bout. Jamais causée par le visiteur, jamais contre lui. */
      function doBump(){
        if (state === 'sleep' || paused || isBusy() || qaOpen) return;
        setState('startle'); setExpr('wide'); busy(4800);
        showBubble("Aïe !", 1500, 'none');
        setTimeout(function(){
          if (state !== 'startle') return;
          setExpr('angry');
          if (grumbleFires()){
            showBubble(esc(grumbleText()) + " " + esc(BUMP_LINE), 2600, 'none');
          } else {
            showBubble(esc(BUMP_LINE), 2600, 'none');
          }
        }, 1300);
        setTimeout(function(){
          if (state !== 'startle') return;
          setExpr('happy');
          showBubble(esc(BUMP_END), 2600, 'joke');
        }, 3700);
        setTimeout(function(){
          if (state === 'startle'){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
        }, 4800);
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
          showBubble(esc(gHeat), 1500, 'none', { now:true });
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
              // Lot nº 4, humeur Drôle : les vignettes comiques passent
              // régulièrement devant les autres (lutteur, mime, skate).
              var drolePick = false;
              if ((mood === 'drole' || hgMode === 'grognon') && Math.random() < 0.35){
                var cp = Math.random();
                if (cp < 0.4) doWrestler();
                else if (cp < 0.7) doMime();
                else doSkate();
                drolePick = true;
              }
              if (drolePick){
                // déjà servi : on ne tire pas une deuxième vignette
              }
              else if (r < 0.05 && canBarbouille()) doBarbouille();
              else if (r < 0.16) doTinker();
              else if (r < 0.32) (Math.random() < 0.35 ? doCookFail() : doCook());
              else if (r < 0.44) doRead();
              else if (r < 0.52) doWrestler();
              else if (r < 0.59) doMime();
              else if (r < 0.66) doSkate();
              else if (r < 0.72) doPerch();
              else if (r < 0.78) doPeek();
              else if (r < 0.83) doJanitor();
              else if (r < 0.86) doBump();
              else if (r < 0.90) (hgMode === 'grognon' && Math.random() < 0.5 ? doBump() : doHum());   // Grognon drôle : l'encadré de porte, sa bêtise signature, revient souvent
              else if (r < 0.95) (sensible ? doJanitor() : doNosePick());
              else if (r < 0.98 && seasonDecorKind()) doDecor();
              else if (r < 0.995) doBalloon();
              else (sensible ? doHum() : doGraffiti());
            }
          }
          scheduleLife();
        }, (mood === 'drole' ? 12000 : 20000) + Math.random() * (mood === 'drole' ? 12000 : 22000));
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
          showBubble(esc(pick(STARTLE_LINES)), 3200, null, { now:true });
          spawnBurst(['!','✦'], 4);
          setTimeout(function(){
            if (state === 'startle'){ setExpr('happy'); busyUntil = 0; doWave(null); }
          }, 900);
        } else {
          setExpr('happy'); setState(reduced ? 'idle' : 'walk');
        }
      }
      setInterval(function(){
        if (paused || isHidden || docHidden || qaOpen || gameOn || tourOn) return;
        var idleFor = Date.now() - lastInteract;
        var threshold = isNight() ? 22000 : 50000;   // la nuit, il s'endort vite
        // Correctif lecture (23 oct. 2026) : tant qu'une bulle est dans
        // son temps de lecture garanti, il est en train de PARLER, pas
        // inactif — il ne s'endort plus au milieu d'une longue réponse
        // (la nuit, le seuil de 22 s la coupait avant la fin).
        if (state !== 'sleep' && idleFor > threshold && !isBusy() && Date.now() >= bubbleFreeAt){
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
        showBubble("Minute ! J't'en pause ! 😄", 1900, 'none', { now:true });
        setTimeout(function(){
          bot.classList.remove('frozen');
          if (keep && state !== 'sleep'){ bubble.innerHTML = keep; bubble.classList.add('show'); }
        }, 1950);
      }
      var BUSY_VIGNETTES = ['read','cook','cookfail','tinker','mime','wrestler','fix','dust','sweep','janitor'];
      /* Micro-célébration (pack taquin du document, 23 oct. 2026) :
         quand le visiteur TROUVE ce qu'il cherchait — un lien de
         réponse cliqué, une section montrée qui existe — une toute
         petite pluie d'étincelles, moins d'une seconde, non bloquante,
         jamais sonore. spawnBurst respecte déjà le mode réduit. */
      function microCelebrate(){
        if (gameOn || tourOn) return;
        spawnBurst(['✦','✧','✦'], 4);
      }

      /* Chatouillage de trop (pack taquin du document, 23 oct. 2026) :
         après le grand fou rire (combo ≥ 3), si ça continue (combo ≥ 5),
         il rit, prévient en riant… et s'échappe ~2 s avant de revenir,
         avec la réplique du document. Aucun nouvel état : un simple
         déplacement avec l'idiome de transition déjà utilisé ailleurs
         (startGame), puis retour à sa place. */
      var tickleEscaping = false;
      function tickleEscape(){
        tickleEscaping = true;
        setExpr('laugh'); giggle();
        var prevX = x;
        bot.style.transition = 'transform .45s ease';
        x = maxX(); place();
        setTimeout(function(){
          x = prevX; place();
          setTimeout(function(){
            bot.style.transition = '';
            tickleEscaping = false;
            showBubble("OK, là je suis officiellement chatouillé à pleine capacité. On avance ?", 4200, 'none', { now:true });
          }, 480);
        }, 1550);
      }
      function tickle(){
        lastInteract = Date.now();
        engage();
        if (paused || isHidden) return;
        if (tickleEscaping) return;
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
        if (tickleCombo >= 5){ tickleCombo = 0; tickleEscape(); return; }
        tickleTimer = setTimeout(function(){ tickleCombo = 0; }, 2600);
        var big = tickleCombo >= 3;
        setState(big ? 'tickle-big' : 'tickle');
        setExpr('laugh');
        busy(big ? 2400 : 1700);
        var line = big ? TICKLE_BIG
          : (wasTinker ? "Hihi ! Attention, je bricole… enfin, je bricolais !"
          : (wasCook ? "Hihi ! Doucement, ma soupe va renverser de rire !" : pick(TICKLE_LINES)));
        showBubble(esc(line), big ? 3600 : 2800, 'none', { now:true });
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
        if (paused){ paused = false; btnPause.textContent = 'Pause'; btnPause.setAttribute('aria-pressed','false'); }
        setState('idle'); setExpr('focus'); busy(1200);
        showBubble("Gérant du site, à ton service ! Touche une question ci-dessous — je réponds avec les vraies infos, promis.", 6000, 'question');
      }
      function closeQA(){
        qaOpen = false;
        qaPanel.hidden = true;
        if (!paused){ setExpr('happy'); setState(reduced ? 'idle' : 'walk'); }
      }
      /* Fermeture « réponse » (correctif Hugo, 23 oct. 2026) : le
         panneau se referme dès qu'HGPTO répond ou qu'une scène part,
         pour laisser voir la scène et sa bulle — le panneau (z-index
         62, quasi plein écran sur mobile) couvrait l'étage du robot
         (z-index 60) et tout se jouait invisible derrière. Contrairement
         à closeQA (fermeture manuelle), la pose en cours est préservée :
         il continue ce qu'il faisait (pancarte, guidage…) en répondant.
         Le visiteur rouvre le panneau quand il veut (bouton
         « Une question ? » / dock), rien n'est perdu. */
      function dismissQA(){
        qaOpen = false;
        qaPanel.hidden = true;
      }
      function answerQuestion(item, opts){
        lastInteract = Date.now();
        engage();
        setExpr('happy');
        if (reading.on) stopReading(false);   // on change d'activité : la lecture s'arrête proprement
        if (item.fn === 'mg'){ closeQA(); startMG(); return; }
        if (item.fn === 'read'){ dismissQA(); readPage(); return; }
        if (item.fn === 'journal'){ dismissQA(); showBubble(esc(journalText()), 11000, 'answer'); return; }
        if (item.fn === 'fact'){ dismissQA(); var r1 = nextReading(); showBubble(esc("J'ai lu ça, écoute : " + pick(QC_HISTORY)), 11000, 'answer'); logDay("raconté un fait d'histoire du Québec"); return; }
        if (item.fn === 'philo'){ dismissQA(); showBubble(esc(pick(PHILO)), 11000, 'answer'); return; }
        if (item.fn === 'anecdote'){ dismissQA(); showBubble(esc("J'ai lu ça tantôt : " + pick(ANECDOTES)), 11000, 'answer'); return; }
        if (item.fn === 'empathy'){ dismissQA(); showBubble(esc(pick(EMPATHY)), 11000, 'answer'); return; }
        if (item.fn === 'tour'){ startTour(); return; }
        if (item.fn === 'pixel'){ dismissQA(); showBubble(esc(PIXEL_STORY), 11000, 'answer'); summonCat('follow'); return; }
        if (item.fn === 'feed'){ closeQA(); doFeedCat(); return; }
        if (item.fn === 'choix'){ closeQA(); busyUntil = 0; lastBubbleAt = 0; doChoix(true); return; }
        if (item.fn === 'choisir'){ startAideChoix(); return; }
        dismissQA();
        var text = item.a || pick(JOKES);
        var deliver = function(prefix){
          var html = esc(prefix + text);
          if (item.u) html += linkHtml({ u:item.u, l:item.l });
          if (opts && opts.doux) html += '<br>' + esc(pick(ETHIQUE_LINES));
          if (item.s){
            signText.textContent = item.s;
            setState('invite'); busy(3400);
            setTimeout(function(){ if (state === 'invite') setState(qaOpen ? 'idle' : (reduced ? 'idle' : 'walk')); }, 3400);
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
        };
        // Flash info : seulement avant une vraie info produit demandée
        // (lien produit, « montre-moi » ou drapeau info). Les suggestions
        // nées des vignettes passent par doInvite — jamais de flash là.
        var isInfo = !!item.info || !!item.go ||
          (!!item.u && item.u.indexOf('mailto:') !== 0);
        if (isInfo) flashInfo(deliver);
        else deliver('');
      }

      /* ---------- Aide au choix — méthode closer façon HP
         (document service client, décisions d'Hugo du 23 oct. 2026) ------
         Service d'abord : DEUX questions maximum (pour qui, pour faire
         quoi), puis UNE seule recommandation honnête — y compris « le
         gratuit fait la job » quand c'est vrai. Le bon calcul du lot
         (40 $ plutôt que 10 × 5 $ = 50 $) seulement là où il est réel.
         Sortie propre partout : annuler restaure les questions, et chaque
         recommandation se ferme sur une ligne d'éthique (non tout aussi
         facile que le oui). Jamais d'invitation pendant cette séquence
         au-delà de la recommandation elle-même. */
      function choixOptions(head, options, onPick){
        qaChips.innerHTML = '';
        var h = document.createElement('div');
        h.className = 'qa-choix-head';
        h.textContent = head;
        qaChips.appendChild(h);
        options.forEach(function(opt){
          var b = document.createElement('button');
          b.type = 'button';
          b.textContent = opt.label;
          b.addEventListener('click', function(){ onPick(opt.key); });
          qaChips.appendChild(b);
        });
        var back = document.createElement('button');
        back.type = 'button';
        back.textContent = '← Toutes les questions';
        back.addEventListener('click', function(){ buildQAChips(); });
        qaChips.appendChild(back);
      }
      function startAideChoix(){
        showBubble("Avec plaisir — deux petites questions, pas plus, et je te fais UNE recommandation honnête. Même si la réponse, c'est « rien pour l'instant ».", 10000, 'answer');
        choixOptions("1 sur 2 — C'est pour qui ?", [
          { key:'moi', label:"Pour moi" },
          { key:'enfants', label:"Pour mes enfants" },
          { key:'offrir', label:"Pour offrir" }
        ], function(pourQui){ choixQ2(pourQui); });
      }
      function choixQ2(pourQui){
        choixOptions("2 sur 2 — Tu cherches quoi, surtout ?", [
          { key:'jouer', label:"Jouer, sans payer" },
          { key:'cuisiner', label:"Cuisiner" },
          { key:'organiser', label:"M'organiser au quotidien" },
          { key:'atelier', label:"Un atelier en vrai" }
        ], function(quoi){ choixReco(pourQui, quoi); });
      }
      function choixReco(pourQui, quoi){
        var t = "", p = null;
        if (quoi === 'jouer'){
          t = "Mon honnête recommandation : commence par les jeux gratuits — 34 jeux, aucun compte, rien à payer. Le gratuit fait la job pour jouer, promis.";
          p = { u:"https://hp-outils.com/jeux", l:"Voir les jeux gratuits" };
        } else if (quoi === 'cuisiner'){
          if (pourQui === 'enfants'){
            t = "Mon honnête recommandation : le livre « Les enfants cuisinent pour faire plaisir » (10 $) — fait pour cuisiner EN famille, avec des recettes pensées pour les petites mains. Et les recettes gratuites du site sont parfaites pour essayer avant.";
            p = { u:"https://hp-outils.com/en-cuisine", l:"Voir la cuisine" };
          } else {
            t = "Mon honnête recommandation : commence par les 629 recettes gratuites du site — ça coûte zéro et ça dépanne pour vrai. Si tu veux un livre ensuite, « La faim justifie les moyens » est à 10 $.";
            p = { u:"https://hp-outils.com/en-cuisine", l:"Voir les recettes gratuites" };
          }
        } else if (quoi === 'organiser'){
          t = "Mon honnête recommandation : un seul kit Sans Honte pour ton besoin le plus pressant — 5 $, pas plus. Et le vrai calcul, si un jour tu en vises plusieurs : pris un par un, 10 kits = 50 $ ; le lot « choisis 10 parmi 15 » est à 40 $. Pas besoin de décider ça aujourd'hui.";
          p = { u:"https://hp-outils.com/sans-honte", l:"Voir les kits Sans Honte" };
        } else {
          t = "Mon honnête recommandation : un atelier avec Hugo, en vrai — Cuisine de base à 120 $, ou Pain maison (à l'atelier à 150 $, à domicile à 120 $), à Terrebonne et dans Lanaudière. Écris-lui en disant pour qui c'est, combien de personnes et quand tu vises : c'est lui qui confirme, en personne, sous 3 jours ouvrables.";
          p = { u:"mailto:hpoutils.admin@gmail.com", l:"Écrire à Hugo" };
        }
        showBubble(esc(t) + linkHtml(p) + '<br>' + esc(pick(ETHIQUE_LINES)), 14000, 'answer');
        buildQAChips();
        dismissQA();
      }

      /* ---------- Questions tapées : recherche dans la base de faits ----------
         Mots-clés + synonymes, réponse exacte de la base seulement. Aucune
         réponse hors base : repli courriel + consignation « Pour Hugo »
         (mémoire de session seulement, aucune donnée personnelle). */
      var unanswered = [];
      var qaSeq = 0;
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
      /* ---------- La réplique « mascotte » (ajout validé par Hugo,
         22 oct. 2026) : HGPTO déteste « mascotte » — il se prend pour
         un « gnome magique érudit ». Détection prudente : le mot doit
         lui être ADRESSÉ (2e personne, apostrophe, compliment, ou
         message très court) ; un usage non adressé (« je cherche une
         mascotte pour mon équipe ») laisse la question primer, comme
         toute vraie question produit (gardes dans le submit).
         Rotation sans répétition immédiate, session seulement. */
      var lastGnome = -1;
      /* ---------- Escalades service client (23 oct. 2026) ----------
         Document « Service client HP Outils » : une plainte, un cas de
         remboursement ou un lien perdu = porte humaine. HGPTO accueille
         (phrase de repli EXACTE du document), il ne tranche jamais un
         cas, il ne promet aucun délai ni montant de remboursement, il
         n'invente aucun rabais. La question de POLITIQUE, elle, reçoit
         le cadre factuel adopté par Hugo. Une escalade résolue n'est
         PAS consignée dans « Pour Hugo » (même précédent que le gnome :
         ce n'est pas une question sans réponse). */
      function escalationIntent(q){
        var n = normText(q);
        var has = function(list){ return list.some(function(w){ return n.indexOf(w) >= 0; }); };
        var refundish = has(['rembours','echange','echanger']);
        // Question de politique (pas un cas) : le cadre factuel adopté.
        if (refundish && has(['politique','comment ca marche','comment ca fonctionne','conditions','regle','regles','principe'])) return 'refund-policy';
        // Plainte / insatisfaction : accueil + phrase de repli.
        if (has(['pas content','pas contente','mecontent','decu','decevant','arnaque','escroquerie','plainte','scandaleux','inacceptable','pas satisfait','insatisfait','service pourri','c est nul','vraiment nul','nul ton','honteux']))
          return 'plainte';
        // Problème de lien / de téléchargement : marche à suivre.
        if (has(['perdu mon lien','perdu le lien','lien casse','lien mort','lien ne marche','lien marche pas','pas recu mon lien','pas recu le lien','ou est mon lien','ou est mon telechargement','telechargement ne marche','telechargement marche pas','jamais recu mon','pas recu mon achat','impossible a ouvrir','impossible d ouvrir','ne s ouvre pas','s ouvre pas']))
          return 'lien';
        // Cas personnel de remboursement / d'échange : phrase de repli.
        if (has(['rembourse moi','remboursez','je veux etre rembourse','veux un remboursement','veux me faire rembourser','rembourser','rembourse','mauvais produit','pas le bon produit','erreur de produit','produit defectueux','echanger','echange mon','echange le']))
          return 'refund-case';
        // Le mot « remboursement » tout seul = question de politique.
        if (has(['remboursement'])) return 'refund-policy';
        return null;
      }

      function mascotteJab(q){
        var n = normText(q).replace(/\s+/g, ' ').trim();
        if (!/(^| )mascottes?( |$)/.test(n)) return false;
        if (/(cherche|recherche|veux|voudrais|besoin|acheter|achete|trouver|embaucher|engager|pour mon|pour notre|pour une equipe|pour l equipe|c est quoi|qu est ce|definition)/.test(n)) return false;
        if (/(t es|tu es|es tu|c est tu|petite? mascotte|cute|belle mascotte|la mascotte|allo mascotte|salut mascotte|bonjour mascotte)/.test(n)) return true;
        return n.split(' ').length <= 4;
      }
      function gnomeReply(immediate){
        var lines = (mood === 'grognon') ? GNOME_LINES_GROGNON : GNOME_LINES;
        var i = Math.floor(Math.random() * lines.length);
        if (lines.length > 1 && i === lastGnome) i = (i + 1) % lines.length;
        lastGnome = i;
        if (mood === 'grognon'){
          setExpr('angry');
          setTimeout(function(){ if (!isBusy()) setExpr('happy'); }, 2600);
        } else if (mood === 'drole'){
          setExpr('laugh');
          giggle();
        } else {
          setExpr('happy');
        }
        showBubble(esc(lines[i]), 9000, mood === 'drole' ? 'joke' : 'talk', immediate ? { now:true } : undefined);
      }
      document.getElementById('qa-form').addEventListener('submit', function(ev){
        ev.preventDefault();
        var input = document.getElementById('qa-input');
        var q = (input.value || '').trim();
        if (!q) return;
        input.value = '';
        lastInteract = Date.now();
        var mySeq = ++qaSeq;
        // Phrase du concept TAPÉE : « HGPTO, joue avec moi » (ou juste
        // « joue avec moi », ponctuation et casse libres) — interceptée
        // AVANT la recherche dans la base et branchée sur le même point
        // d'entrée que le bouton qa-play (décision d'Hugo, 22 oct. 2026).
        var mots = ' ' + normText(q).replace(/\s+/g, ' ').trim() + ' ';
        if (mots.indexOf(' joue avec moi ') !== -1){ startGame(); return; }
        // Escalades service client (23 oct. 2026) : plainte, cas de
        // remboursement, lien perdu — interceptées AVANT la base de
        // faits : la porte humaine d'abord, mot pour mot du document.
        var escKind = escalationIntent(q);
        if (escKind){
          dismissQA();
          setExpr('happy');
          var mailLink = linkHtml({ u:"mailto:hpoutils.admin@gmail.com", l:"Écrire à Hugo" });
          if (escKind === 'plainte') showBubble(esc(ESCALATION_EMPATHY + ' ' + ESCALATION_LINE) + mailLink, 14000, 'answer');
          else if (escKind === 'refund-case') showBubble(esc(ESCALATION_LINE) + mailLink, 14000, 'answer');
          else if (escKind === 'refund-policy') showBubble(esc(REFUND_POLICY) + mailLink, 14000, 'answer');
          else showBubble(esc(LIEN_PERDU_TEXT) + mailLink, 14000, 'answer');
          return;
        }
        var jab = mascotteJab(q);
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
          // Ajout « mascotte » : le message le traitait de mascotte ET
          // la réponse n'est pas un produit (aucun lien, aucune
          // fonction, aucun besoin servi → aucun suivi de suggestion
          // ne peut être écrasé) : la grogne du gnome suit en
          // post-scriptum léger, jamais à la place de la réponse.
          if (jab && !hit.u && !hit.fn && !hit.go && !matchBesoin(q)){
            setTimeout(function(){
              if (qaSeq === mySeq && !gameOn && !tourOn) gnomeReply();
            }, 12500);
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
        if (bsnDirect){
          dismissQA();
          if (doSuggest(bsnDirect, { fromQA:true, now:true })){
            if (unanswered.indexOf(q) === -1){ unanswered.push(q); renderUnanswered(); }
            return;
          }
        }
        // Ajout « mascotte » : aucune réponse dans la base, aucun
        // besoin produit servi — si le mot lui était adressé, la
        // réplique du gnome remplace le repli (ce n'est pas une
        // question à consigner pour Hugo).
        if (jab){ dismissQA(); gnomeReply(true); return; }
        if (unanswered.indexOf(q) === -1){ unanswered.push(q); renderUnanswered(); }
        dismissQA();
        setExpr('happy');
        showBubble(esc(FALLBACK) + linkHtml({ u:"mailto:hpoutils.admin@gmail.com", l:"Écrire à Hugo" }), 11000, 'answer');
      });
      /* Construction des chips de questions — extraite en fonction
         (lot service client, 23 oct. 2026) : l'aide au choix remplace
         temporairement les chips par ses propres boutons, puis les
         restaure avec buildQAChips(). */
      function buildQAChips(){
        qaChips.innerHTML = '';
        KB.forEach(function(item){
          var b = document.createElement('button');
          b.type = 'button';
          b.textContent = item.q;
          b.addEventListener('click', function(){ answerQuestion(item); });
          qaChips.appendChild(b);
        });
      }
      buildQAChips();
      btnAsk.addEventListener('click', function(){ qaOpen ? closeQA() : openQA(); });
      // Micro-célébration : un clic sur un lien DANS une bulle de
      // réponse = le visiteur suit le chemin trouvé (23 oct. 2026).
      bubble.addEventListener('click', function(ev){
        if (ev.target && ev.target.closest && ev.target.closest('a')) microCelebrate();
      });
      qaClose.addEventListener('click', closeQA);
      btnTickle.addEventListener('click', function(){ ensureAudio(); tickle(); });
      btnBucket.addEventListener('click', doBucket);
      /* Lot nº 4 : retour direct aux jeux — on réutilise guideTo()
         (la mécanique « Montre-moi… ») : sur place, la section des
         jeux défile et brille ; ailleurs, il emmène le visiteur sur
         /jeux et présente la section à l'arrivée. Pendant une partie
         du jeu caché ou une visite guidée, le bouton ne dérange rien
         (le jeu et le guide ont déjà la main). */
      btnGames.addEventListener('click', function(){
        ensureAudio();
        lastInteract = Date.now();
        if (gameOn || tourOn) return;
        if (qaOpen) closeQA();
        if (paused){ paused = false; btnPause.textContent = 'Pause'; btnPause.setAttribute('aria-pressed','false'); }
        if (state === 'sleep') wake(false);
        guideTo('sec-jeux', null);
      });

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
      /* Lot nº 4 : le bouton Son devient un cycle Fort → Doux → Muet.
         Le niveau s'applique partout via volMul() (voir la section
         voix) ; l'étiquette dit toujours l'état, et un petit rire
         confirme le nouveau niveau à l'oreille quand il y a du son. */
      var SOUND_LABELS = ['Son : muet', 'Son : doux', 'Son : fort'];
      function refreshSoundBtn(){
        btnSound.textContent = SOUND_LABELS[soundLevel];
        btnSound.setAttribute('aria-pressed', soundLevel > 0 ? 'true' : 'false');
      }
      btnSound.addEventListener('click', function(){
        soundLevel = (soundLevel + 2) % 3;   // 2 fort → 1 doux → 0 muet → 2 fort…
        syncMuted();
        refreshSoundBtn();
        if (soundLevel > 0){ ensureAudio(); giggle(); }
      });
      refreshSoundBtn();

      /* ---------- MODES (phase 2, Hugo 23 oct. 2026) ----------
         L'ancien sélecteur d'humeur (lot nº 4) devient une vraie
         OPTION DE MODE, claire et nommée : « Vendeur pro actif »,
         « Ami », « Grognon drôle » — et « comme d'habitude », le
         comportement actuel, qui reste le DÉFAUT tant que le
         visiteur n'a rien choisi. Le mode tient pour la SESSION
         seulement (sessionStorage, règle du panneau) ; le sélecteur
         affiche en permanence le mode actif. Au changement, il
         ANNONCE ce qui change dans sa bulle. Chaque mode pilote les
         systèmes existants : `mood` (vendeur/grognon du lot nº 4)
         plus sa couche propre — proactivité (dwellThreshold),
         accompagnement et zéro vente (Ami), bêtises (Grognon drôle).
         Aucun garde-fou n'est contourné : les plafonds de
         suggestions, le gratuit d'abord et le retrait pendant les
         tâches s'appliquent dans tous les modes. */
      function dwellThreshold(){
        // Mode Vendeur pro actif : il prend l'initiative plus tôt —
        // le résumé honnête de la page regardée part à ~18 s plutôt
        // qu'à ~40 s. Une fois par page, comme toujours (plafonds).
        return hgMode === 'vendeur' ? 18000 : 40000;
      }
      function setAccompany(v){
        accompany = v;
        btnAccompany.textContent = v ? 'Arrêter l\u2019accompagnement' : 'Accompagne-moi';
        btnAccompany.setAttribute('aria-pressed', v ? 'true' : 'false');
      }
      function applyMode(m, announce){
        if (['defaut','vendeur','ami','grognon'].indexOf(m) === -1) m = 'defaut';
        hgMode = m;
        mood = m === 'vendeur' ? 'vendeur' : m === 'grognon' ? 'grognon' : 'normal';
        bot.setAttribute('data-mode', m);
        bot.setAttribute('data-mood', mood);
        selMood.value = m;
        try { sessionStorage.setItem('hgpto-mode', m); } catch(e) {}
        lastInteract = Date.now();
        // Mode Ami : l'accompagnement pas à pas s'ouvre AVEC le mode —
        // c'est son geste signature — et se referme quand on le quitte.
        setAccompany(m === 'ami');
        if (!announce) return;
        if (m === 'vendeur'){
          showBubble(esc(MOOD_LINES.vendeur), 9000, 'talk', { now:true });
          logDay("passé en mode Vendeur pro actif — honnêtement annoncé, comme il se doit");
        } else if (m === 'ami'){
          showBubble(esc(MOOD_LINES.ami), 9000, 'talk', { now:true });
          logDay("passé en mode Ami — accompagnement ouvert, aucune vente");
        } else if (m === 'grognon'){
          setExpr('angry');
          showBubble(esc(MOOD_LINES.grognon), 9000, 'talk', { now:true });
          setTimeout(function(){ if (!isBusy()) setExpr('happy'); }, 2600);
          logDay("passé en mode Grognon drôle — bêtises au maximum, jamais contre le visiteur");
        } else {
          showBubble(esc(MOOD_LINES.defaut), 8000, 'talk', { now:true });
        }
      }
      selMood.addEventListener('change', function(){
        ensureAudio();
        applyMode(selMood.value, true);
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
        // Même précédent que le barbouillage : la scène se joue À VUE —
        // le panneau se referme dès le tap, sinon elle passe derrière.
        if (qaOpen) closeQA();
        busyUntil = 0;
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
      /* Lot nº 4 : « Pause » met sa VIE en pause, pour vrai — la même
         variable `paused` que l'ancien « Repose-toi » (tout le moteur
         la respecte déjà : promenades, vignettes, bavardage et Pixel
         figent ; le cadre d'animation s'arrête). Elle ne bloque ni les
         questions/réponses (ouvrir le panneau la lève, comme avant) ni
         le jeu caché en cours (sa logique n'en dépend pas). Bouton
         bascule Pause / Reprendre, avec sa bulle prescrite. */
      function setLifePause(v){
        paused = v;
        btnPause.textContent = paused ? 'Reprendre' : 'Pause';
        btnPause.setAttribute('aria-pressed', paused ? 'true' : 'false');
        if (paused){
          if (state !== 'sleep'){ setState('idle'); setExpr('happy'); }
          showBubble("Je suis en pause — touche Pause pour repartir.", 8000, 'none', { now:true });
        } else {
          lastInteract = Date.now();
          if (state !== 'sleep'){ setState(reduced ? 'idle' : 'walk'); setExpr('happy'); }
          showBubble("On repart !", 2600, 'joke', { now:true });
        }
      }
      btnPause.addEventListener('click', function(){ setLifePause(!paused); });
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
        microCelebrate();
        setTimeout(function(){ if (after) after(); }, 600);
        return true;
      }

      /* ---------- Visite guidée : de section en section, avec commentaires ----------
         TRANQUILLE (lot nº 3) : chaque étape EXPLIQUE l'endroit (c'est
         quoi, ça sert à quoi, pour qui), au ton de quelqu'un qui fait
         visiter sa maison. Rythme apaisé : chaque commentaire reste le
         temps d'être LU (durée proportionnelle au texte — correctif
         lecture du 23 oct. 2026) et le pas suivant attend la fin de
         cette durée avant de partir.
         Aucune vente pendant la visite — une seule suggestion douce peut
         suivre, à la toute fin d'une visite terminée d'elle-même (voir
         stopTour), jamais après un arrêt demandé par le visiteur. */
      var TOUR = [
        { id:'sec-accueil', t:"Bienvenue chez nous. Ici, c'est la pièce d'entrée : Hugo y présente HP Outils — « Des outils pour la vraie vie » — et tout ce que tu vas voir part d'ici. Moi, c'est HGPTO, le petit gérant de la place : je réponds aux questions et je connais chaque recoin. On y va tranquillement, pièce par pièce, et tu peux arrêter la visite quand tu veux." },
        { id:'sec-jeux', t:"Ici, c'est le salon : les jeux. Il y en a 26, tous gratuits, jouables tout de suite, sans inscription — pour les familles, les curieux, les soirées tranquilles. Certains font plus que divertir : LA BANQUE, par exemple, fait comprendre de l'intérieur comment fonctionne une vraie banque alimentaire." },
        { id:'sec-kits', t:"Là, ce sont les kits Sans Honte : 15 petits guides en PDF pour les affaires du quotidien qu'on remet toujours — ranger ses papiers, préparer un testament, organiser son budget. Ils coûtent 5 $ chacun, sans taxe ajoutée, et l'idée est dans le nom : jamais de honte, jamais de jugement." },
        { id:'sec-recettes', t:"La cuisine, mon endroit préféré. Ici, 629 recettes gratuites : tu écris les ingrédients que tu as déjà, et il te propose quoi cuisiner avec ça. Les portions s'ajustent de 1 à 300 personnes, et ta liste d'épicerie se prépare toute seule. C'est pensé pour les vraies cuisines, pas pour les photos." },
        { id:'sec-livres', t:"La bibliothèque : des livres en PDF, de 10 $ à 15 $, que tu télécharges tout de suite après le paiement. « La faim justifie les moyens » (10 $), c'est l'histoire vraie d'Hugo ; « Les enfants cuisinent pour faire plaisir » (10 $), c'est pour cuisiner en famille. On lit à son rythme, on garde le fichier pour toujours." },
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
        var stepMs = showBubble(esc(step.t), 11500, 'talk', { now:true });
        tourIdx++;
        try { sessionStorage.setItem('hgpto-tour', String(tourIdx)); } catch(e) {}
        tourTimer = setTimeout(tourStep, (stepMs || 11500) + 900);
      }
      function startTour(){
        if (tourOn){ stopTour(true); showBubble("D'accord, on arrête la visite. Je reste dans le coin si t'as besoin !", 5000, null, { now:true }); return; }
        closeQA();
        if (state === 'sleep') wake(false);
        tourOn = true; tourIdx = 0;
        try { sessionStorage.setItem('hgpto-tour', '0'); } catch(e) {}
        document.getElementById('qa-tour').textContent = 'Arrêter la visite';
        logDay("fait visiter le site, section par section");
        var introMs = showBubble("En route ! Suis-moi, je te montre le site comme un gérant qui se respecte.", 5000, 'question');
        tourTimer = setTimeout(tourStep, (introMs || 5000) + 400);
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
          showBubble("Parfait, je retourne à ma petite vie. Je suis là si t'as besoin !", 4500, null, { now:true });
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
      document.getElementById('qa-photo').addEventListener('click', function(){ if (qaOpen) closeQA(); openSouvenir(false); });
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
        snakes:  { 17:7, 31:14, 39:22, 48:30, 54:38, 62:45 },
        // Surprises du jeu caché (pack taquin du document, 23 oct. 2026) :
        // cases libres (ni échelle, ni serpent) à effet PUREMENT
        // cosmétique — les dés et les positions ne changent jamais.
        // 23 = la tournée de Pixel ; 51 = la case sieste d'HGPTO.
        surprises: { 23:'pixel', 51:'sieste' }
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
        pixelCross: ["🐾 Pixel traverse la planche ! Elle change rien à ton dé, promis — elle fait juste sa tournée.", "🐾 Regarde : Pixel passe sur la planche, toute fière. Les dés n'ont pas bougé d'un poil. Enfin, de boulon."],
        siesteBot: ["Case sieste… je m'endors une seconde sur ma case. Une. Seconde. 💤"],
        siesteYou: ["La case sieste ! Tu passes doucement — c'est là qu'HGPTO fait ses micro-siestes entre deux parties."],
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
      function gComment(line, mood){ showBubble(esc(line), 6000, mood || 'talk', { now:true }); }
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
            } else if (GAME_CFG.surprises[target] === 'pixel'){
              // Surprise cosmétique (23 oct. 2026) : Pixel traverse la
              // planche — un commentaire, une courte pause, rien d'autre
              // ne bouge (ni dé, ni position).
              gComment(pick(GAME_LINES.pixelCross), 'joke');
              setTimeout(function(){ if (gameOn) endTurn(who); }, 1400);
            } else if (GAME_CFG.surprises[target] === 'sieste'){
              if (!isYou){
                // HGPTO atterrit sur SA case sieste : il somnole ~1 s
                // avant de passer le tour — le visiteur, lui, ne perd
                // rien, et aucun dé n'est touché.
                gComment(pick(GAME_LINES.siesteBot), 'talk');
                setTimeout(function(){ if (gameOn) endTurn(who); }, 2100);
              } else {
                gComment(pick(GAME_LINES.siesteYou), 'talk');
                endTurn(who);
              }
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

      /* ================= VOIX RÉELLE, LECTURE, FLASH INFO, HÉLIUM =================
         Réglages de SESSION seulement (rien n'est conservé entre visites) :
         voix activée/désactivée, gag hélium activé/désactivé. La lecture ne
         part JAMAIS toute seule : seulement sur demande explicite. */
      var TTS = ('speechSynthesis' in window) ? window.speechSynthesis : null;
      var voiceOn = true, heliumOn = true, frVoice = null;
      function pickFrVoice(){
        if (!TTS) return;
        var vs = [];
        try { vs = TTS.getVoices() || []; } catch(e){ vs = []; }
        var fr = vs.filter(function(v){ return /^fr/i.test(v.lang || ''); });
        if (!fr.length){ frVoice = null; return; }
        var male = ['thomas','paul','henri','nicolas','mathieu','jacques','daniel','antoine','loic','jean','pierre','luc','remi'];
        var female = ['amelie','audrey','julie','hortense','marie','virginie','lea','aurelie','chloe','celia','anna','sophie'];
        function has(v, list){ var n = (v.name || '').toLowerCase(); return list.some(function(w){ return n.indexOf(w) >= 0; }); }
        frVoice = null;
        for (var i = 0; i < fr.length && !frVoice; i++) if (has(fr[i], male)) frVoice = fr[i];
        if (!frVoice) for (var j = 0; j < fr.length && !frVoice; j++) if (!has(fr[j], female)) frVoice = fr[j];
        if (!frVoice) frVoice = fr[0];
      }
      if (TTS){ pickFrVoice(); TTS.onvoiceschanged = pickFrVoice; }
      function speakTTS(text, opts){
        if (!TTS || !voiceOn || !text) return false;
        try {
          if (opts && opts.interrupt) TTS.cancel();
          var u = new SpeechSynthesisUtterance(text);
          u.lang = 'fr-FR';
          if (frVoice) u.voice = frVoice;
          u.rate = (opts && opts.rate) || 1;
          u.pitch = (opts && opts.pitch) || 1;
          TTS.speak(u);
          return true;
        } catch(e){ return false; }
      }
      /* Sa voix d'écureuil : la synthèse vocale, pitch ~1,9 — sinon, repli
         honnête sur son charabia monté d'une octave (même gag, autre tuyau). */
      function heliumSpeak(text){
        if (!text) return;
        if (!speakTTS(text, { pitch: 1.9, rate: 1.13 })) speak(text, 'helium');
      }

      /* ---------- Lecture à voix haute du site (sur demande seulement) ---------- */
      var reading = { on:false, chunks:[], i:0 };
      var btnRead = document.getElementById('qa-read');
      var btnReadDock = document.getElementById('btn-read');
      function setReadLabels(t){ btnRead.textContent = t; btnReadDock.textContent = t; }
      function pageText(){
        var parts = [];
        function grab(sel){
          var els = document.querySelectorAll(sel);
          for (var i = 0; i < els.length; i++){
            if (els[i].closest && els[i].closest('.hgpto-host')) continue;   // jamais sa propre interface
            var t = (els[i].textContent || '').replace(/\s+/g, ' ').trim();
            if (t) parts.push(t);
          }
        }
        // Adaptation au site (portage) : la page démo de l'artefact avait
        // ses propres classes (.hero, .card, .band). Sur le vrai site, on
        // lit le contenu principal de la page (<main> : titres, puis
        // paragraphes), avec repli sur la page entière si la route n'a
        // pas de <main> (page autonome « En cuisine »).
        grab('main h1'); grab('main h2'); grab('main p');
        if (!parts.length){ grab('h1'); grab('h2'); grab('p'); }
        return parts.join('. ');
      }
      function chunkText(t){
        var raw = t.split(/(?<=[.!?…])\s+/), out = [], cur = '';
        raw.forEach(function(s){
          if ((cur + ' ' + s).length > 170 && cur){ out.push(cur); cur = s; }
          else cur = cur ? cur + ' ' + s : s;
        });
        if (cur) out.push(cur);
        return out;
      }
      function readChunk(){
        if (!reading.on || !TTS) return;
        if (reading.i >= reading.chunks.length){ finishReading(); return; }
        var u = new SpeechSynthesisUtterance(reading.chunks[reading.i]);
        u.lang = 'fr-FR';
        if (frVoice) u.voice = frVoice;
        u.rate = 1; u.pitch = 1;   // voix homme standard, débit normal — jamais d'hélium ici
        u.onend = function(){ reading.i++; readChunk(); };
        u.onerror = function(){ reading.i++; readChunk(); };
        TTS.speak(u);
      }
      function readPage(){
        dismissQA();   // la lecture se regarde : le panneau se referme (le bouton du dock permet aussi d'arrêter)
        if (reading.on){ stopReading(true); return; }
        if (!TTS){
          showBubble("Ton appareil n'a pas de voix de lecture intégrée — je ne peux pas te lire ça à voix haute ici. Mais tout est écrit sur la page !", 7000, 'answer');
          return;
        }
        if (!voiceOn){
          showBubble("Ma voix est fermée dans mes réglages — rouvre-la avec le bouton « Voix » et je te lis ça avec plaisir.", 7000, 'answer');
          return;
        }
        ensureAudio();
        pickFrVoice();
        reading.chunks = chunkText(pageText());
        reading.i = 0; reading.on = true;
        setReadLabels('Arrête la lecture');
        if (state === 'sleep') wake(false);
        setState('read'); setExpr('focus');
        showBubble("Je te lis la page — mes lunettes de lecture sont de sortie. Bouton « Arrête la lecture » quand t'en as assez !", 5000, 'none');
        logDay("lu la page à voix haute, sur demande");
        readChunk();
      }
      function stopReading(manual){
        if (TTS) { try { TTS.cancel(); } catch(e){} }
        var was = reading.on;
        reading.on = false; reading.chunks = []; reading.i = 0;
        setReadLabels('Lis-moi ça');
        if (was && state === 'read') setState(reduced ? 'idle' : 'walk');
        if (was && manual) showBubble("Ok, j'arrête là. Le reste est écrit sur la page !", 4200, 'talk', { now:true });
      }
      function finishReading(){
        reading.on = false; reading.chunks = []; reading.i = 0;
        setReadLabels('Lis-moi ça');
        if (state === 'read') setState(reduced ? 'idle' : 'walk');
        showBubble("Et voilà, c'est lu ! Autre chose ?", 4600, 'talk');
      }
      btnRead.addEventListener('click', function(){ readPage(); });
      btnReadDock.addEventListener('click', function(){ ensureAudio(); readPage(); });
      var btnVoice = document.getElementById('qa-voice');
      btnVoice.addEventListener('click', function(){
        voiceOn = !voiceOn;
        btnVoice.textContent = voiceOn ? 'Voix : oui' : 'Voix : non';
        btnVoice.setAttribute('aria-pressed', voiceOn ? 'true' : 'false');
        if (!voiceOn){ if (reading.on) stopReading(false); if (TTS) { try { TTS.cancel(); } catch(e){} } }
        else { pickFrVoice(); showBubble("Voix rouverte ! Demande-moi « Lis-moi ça » quand tu veux.", 4200, 'talk', { now:true }); }
      });

      /* ---------- Flash info : avant chaque info produit demandée ----------
         Trois dings + « mes excuses — flash info : », puis l'info suit
         immédiatement. Voix NORMALE toujours — jamais d'hélium ici. Si la
         voix est coupée (ou absente), version texte dans la bulle. Une
         seule fois par livraison d'info. */
      function dingDing(){
        if (!actx || muted) return;
        var t = actx.currentTime + 0.02;
        [0, 0.17, 0.34].forEach(function(d){
          toneRaw(t + d, 1568, 1568, 0.22, 0.05, 'sine');
          toneRaw(t + d, 2093, 2093, 0.16, 0.018, 'sine');
        });
      }
      function flashInfo(deliver){
        if (voiceOn && TTS){
          dingDing();
          speakTTS("Mes excuses — flash info :", { interrupt: true });
          setTimeout(function(){ deliver(''); }, 520);
        } else {
          deliver("Ding ding ding — mes excuses — flash info : ");
        }
      }

      /* ---------- Le gag hélium : rare, bref, jamais en mode sérieux ---------- */
      var heliumLines = 0, heliumTimer = null, balloonUntil = 0, balloonTimer = null;
      function balloonSqueak(){
        if (!actx || muted) return;
        var t = actx.currentTime + 0.02;
        toneRaw(t, 880, 1560, 0.13, 0.028, 'sine');
        toneRaw(t + 0.15, 1250, 660, 0.11, 0.024, 'sine');
      }
      function heliumGag(src){
        if (reading.on || gameOn || mgOn || heliumLines > 0 || paused || state === 'sleep') return;
        if (!heliumOn){
          if (src === 'touch') showBubble("Le gag d'hélium est fermé dans mes réglages — ma balloune et moi, on reste sages. Presque.", 4600, 'talk');
          return;
        }
        bot.classList.add('has-balloon', 'helium');
        balloonUntil = Date.now() + 30000;
        setExpr('laugh');
        balloonSqueak();
        giggle();
        heliumLines = 2;   // cette réplique + la suivante, pas plus
        if (heliumTimer) clearTimeout(heliumTimer);
        heliumTimer = setTimeout(endHelium, 12000);
        showBubble(esc(src === 'touch'
          ? "Oups ! J'ai respiré trop près de ma balloune… écoute ma voix !"
          : "Minute ! J't'en pause… je viens de prendre une bouffée d'hélium de ma balloune !"), 5200, 'talk');
        logDay("fait mon gag d'hélium (voix d'écureuil, deux phrases max)");
      }
      function endHelium(){
        if (heliumTimer){ clearTimeout(heliumTimer); heliumTimer = null; }
        heliumLines = 0;
        if (!bot.classList.contains('helium')) return;
        bot.classList.remove('helium');
        giggle();
        showBubble("Hihi ! Je ris de moi — voix normale revenue, promis.", 4300, 'joke');
        scheduleBalloonOff();
      }
      function scheduleBalloonOff(){
        if (balloonTimer) clearTimeout(balloonTimer);
        balloonTimer = setTimeout(function(){
          if (!bot.classList.contains('helium') && Date.now() >= balloonUntil)
            bot.classList.remove('has-balloon');
        }, 2600);
      }
      /* Vignette rare : il se promène avec sa balloune — et des fois, il
         respire trop près. La toucher déclenche le gag à tout coup. */
      function doBalloon(){
        if (state === 'sleep' || paused || isBusy() || qaOpen || gameOn || mgOn) return;
        if (bot.classList.contains('has-balloon')) return;
        bot.classList.add('has-balloon');
        balloonUntil = Date.now() + 26000;
        setExpr('happy'); busy(1500);
        showBubble("Regarde, j'ai ma balloune ! Touche-la… si tu oses. Moi, je respire de l'autre côté. Normalement.", 5600, 'talk');
        setTimeout(function(){
          if (bot.classList.contains('has-balloon') && !bot.classList.contains('helium') && Math.random() < 0.3)
            heliumGag('random');
        }, 6500);
        setTimeout(function(){
          balloonUntil = Date.now();
          if (!bot.classList.contains('helium')) bot.classList.remove('has-balloon');
          else scheduleBalloonOff();
        }, 26000);
      }
      document.getElementById('balloon-hit').addEventListener('pointerdown', function(ev){
        ev.stopPropagation();
        ev.preventDefault();
        ensureAudio();
        lastInteract = Date.now();
        if (bot.classList.contains('helium')){ giggle(); return; }
        heliumGag('touch');
      });
      var btnHelium = document.getElementById('qa-helium');
      btnHelium.addEventListener('click', function(){
        heliumOn = !heliumOn;
        btnHelium.textContent = heliumOn ? 'Hélium : oui' : 'Hélium : non';
        btnHelium.setAttribute('aria-pressed', heliumOn ? 'true' : 'false');
        if (!heliumOn && bot.classList.contains('helium')){
          if (heliumTimer){ clearTimeout(heliumTimer); heliumTimer = null; }
          heliumLines = 0;
          bot.classList.remove('helium');
          showBubble("Gag fermé, voix normale. Sage comme une image de robot.", 4000, 'talk');
        }
      });
      document.getElementById('stamp-mg').addEventListener('click', function(){ closeQA(); startMG(); });

      /* ================= MONTGOLFIÈRE — HGPTO JOUE AVEC TOI =================
         Mécaniques recopiées du vrai jeu (public/apps/montgolfiere/
         montgolfiere-v1.0.html, dépôt hpoutils) : PX_PER_M = 6 ; montée
         min(70 + altitude × 0,055 ; 250) px/s ; obstacles toutes les
         1,15 s → 0,42 s selon l'altitude ; probabilités par altitude
         (orage 0 sous 250 m, puis jusqu'à 0,24 ; abeille 0,10 → 0,24 ;
         nuage blanc 0,26, non mortel mais voile la vue ; sinon mouette) ;
         orage : charge 0,85 s puis éclair, couloir mortel de 17 px ;
         anneau doré toutes les 7 à 12 s, +25 si le centre de l'enveloppe
         passe à moins de 32 px ; vent : annonce 1 s, bourrasque de
         175 px/s pendant 2,6 à 4 s ; jalons aux mêmes altitudes.
         Un contact = le ballon est fini (manche perdue). HGPTO pilote son
         ballon avec les MÊMES limites de vitesse que le joueur ; il vise
         les anneaux, esquive les dangers — et son défaut de gaffeur le
         fait parfois choisir le mauvais bord : il le reconnaît en riant.
         Il ne « apprend » pas : il joue selon ses règles, point. Les
         manches sont comptées pour la session en cours seulement. */
      var mgOn = false;
      var mgSession = { you:0, bot:0, rounds:0 };
      var mgEl = document.getElementById('mg');
      var mgWrap = document.getElementById('mg-wrap');
      var mgCanvas = document.getElementById('mg-canvas');
      var mgCtx = mgCanvas.getContext('2d');
      var mgAltEl = document.getElementById('mg-alt');
      var mgRingsEl = document.getElementById('mg-rings');
      var mgScoreEl = document.getElementById('mg-score');
      var mgToastEl = document.getElementById('mg-toast');
      var mgCard = document.getElementById('mg-card');
      var mgW = 0, mgH = 0, mgRaf = null, mgLastTs = 0, mgShareText = '';
      var MG = null;
      var MG_MILESTONES = [
        [500,"500 m — Au-dessus des toits !"],[1000,"1 000 m — Tu chatouilles les nuages !"],
        [1500,"1 500 m — Les mouettes te regardent passer…"],[2000,"2 000 m — L'air se fait plus rare, tiens bon !"],
        [3000,"3 000 m — Brrr, ça pince là-haut !"],[4000,"4 000 m — Plus haut que le mont… ben, pas mal de monts !"],
        [5000,"5 000 m — T'es rendu dans le grand ciel pâle !"],[6500,"6 500 m — Les avions te saluent de loin."],
        [8000,"8 000 m — Altitude de croisière, rien de moins !"],[10000,"10 000 m — Tabarnouche, t'es haut !"]
      ];
      var MG_CAUSES = {
        gull:"une mouette kamikaze", bee:"une abeille (une petite bête, un très gros trou)",
        storm:"un nuage d'orage, en plein dedans", bolt:"la foudre, rapide comme toujours"
      };
      function mgClimbPx(){ return Math.min(70 + MG.alt * 0.055, 250); }
      function mgSpawnInterval(){ return Math.max(1.15 - MG.alt / 5200, 0.42); }
      function mgResize(){
        var r = mgCanvas.getBoundingClientRect();
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        mgW = Math.max(280, r.width); mgH = Math.max(280, r.height);
        mgCanvas.width = Math.round(mgW * dpr);
        mgCanvas.height = Math.round(mgH * dpr);
        mgCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      function mgToast(txt){
        mgToastEl.textContent = txt;
        mgToastEl.classList.add('show');
        if (mgToastEl._t) clearTimeout(mgToastEl._t);
        mgToastEl._t = setTimeout(function(){ mgToastEl.classList.remove('show'); }, 2600);
      }
      function mgTone(f0, f1, dur, vol, type){
        if (!actx || muted) return;
        toneRaw(actx.currentTime + 0.01, f0, f1, dur, vol, type || 'sine');
      }
      function mgComment(line){
        if (Date.now() - MG.lastComment < 6500) return;
        MG.lastComment = Date.now();
        showBubble(esc(line), 5200, 'talk', { now:true });
      }
      function mgSpawnObstacle(){
        var alt = MG.alt, roll = Math.random();
        var x = 40 + Math.random() * (mgW - 80), y = -70;
        var pStorm = alt < 250 ? 0 : Math.min(0.10 + alt / 9000, 0.24);
        var pBee = alt < 120 ? 0.10 : 0.24;
        var pCloud = 0.26;
        if (roll < pStorm){
          MG.obs.push({ type:'storm', x:x, y:y, r:44, baseX:x, state:'idle', timer:1.2 + Math.random() * 2.2 });
        } else if (roll < pStorm + pBee){
          MG.obs.push({ type:'bee', x:x, y:y, r:15, baseX:x, phase:Math.random() * 6.28, drift:(Math.random() < 0.5 ? -1 : 1) * (14 + Math.random() * 22) });
        } else if (roll < pStorm + pBee + pCloud){
          MG.obs.push({ type:'cloud', x:x, y:y, r:46, s:0.8 + Math.random() * 0.5, drift:(Math.random() - 0.5) * 10 });
        } else {
          var d = Math.random() < 0.5 ? -1 : 1;
          MG.obs.push({ type:'gull', x:d < 0 ? -50 : mgW + 50, y:y + Math.random() * 60, r:20,
            vx:-d * (55 + Math.random() * 55 + alt * 0.012), phase:Math.random() * 6.28, flap:5 + Math.random() * 2 });
        }
      }
      function mgBalloon(cx){ return { x:cx, vx:0, tilt:0, dead:false, rings:0, bonus:0, fog:0 }; }
      function mgResetRound(){
        MG = {
          alt:0, scroll:0, t:0, nextMs:500, spawnT:0.6, ringT:4.5,
          obs:[], bolts:[], rings:[], parts:[], floaters:[],
          wind:{ state:'calm', timer:9, dir:1 }, windLines:[],
          you:mgBalloon(mgW * 0.36), bot:mgBalloon(mgW * 0.64),
          over:false, winner:null, endAt:0, cardShown:false, lastComment:0,
          think:0, target:mgW / 2, gaffeAt:0, gaffeT:0, gaffeV:0, desVx:0
        };
        mgCard.hidden = true;
        document.getElementById('mg-card-copied').hidden = true;
        mgHud();
      }
      function mgHud(){
        if (!MG) return;
        mgAltEl.textContent = 'Altitude : ' + Math.floor(MG.alt).toLocaleString('fr-CA') + ' m';
        mgRingsEl.textContent = 'Anneaux — Toi ' + MG.you.rings + ' · HGPTO ' + MG.bot.rings;
        mgScoreEl.textContent = 'Manches — Toi ' + mgSession.you + ' · HGPTO ' + mgSession.bot;
      }
      function startMG(){
        if (mgOn || G) return;
        ensureAudio();
        stopReading(false);
        if (qaOpen) closeQA();
        hideBubble();
        bot.classList.remove('sleep-book');
        mgOn = true; gameOn = true;
        catHideNow();
        document.body.classList.add('game-on');
        document.getElementById('botlayer').style.zIndex = '80';
        mgEl.hidden = false;
        mgResize();
        mgResetRound();
        logDay("joué à Montgolfière contre un visiteur (je pilote mon ballon tout seul)");
        bot.classList.remove('nosmooth');
        bot.style.transition = 'transform .8s ease';
        x = minX(); place();
        setTimeout(function(){ bot.style.transition = ''; }, 850);
        setState('idle'); setExpr('happy'); busy(1200);
        showBubble("Montgolfière, pour vrai ! Tu pilotes ton ballon, je pilote le mien — je joue selon mes règles, et des fois je me trompe. Premier ballon qui pète perd la manche. On avance !", 7000, 'talk');
        mgLastTs = 0;
        if (mgRaf) cancelAnimationFrame(mgRaf);
        mgRaf = requestAnimationFrame(mgFrame);
        // Chien de garde : si l'animation est affamée (onglet en arrière-plan,
        // navigateur qui throttle), un minuteur relance la boucle — le dt
        // réel, plafonné à 0,05 s, garde la vitesse du jeu exacte.
        if (mgWatchdog) clearInterval(mgWatchdog);
        mgWatchdog = setInterval(function(){
          if (mgOn && MG && performance.now() - mgLastFrameAt > 120) mgFrame(performance.now());
        }, 100);
      }
      function quitMG(finished){
        if (mgRaf) cancelAnimationFrame(mgRaf);
        mgRaf = null;
        if (mgWatchdog){ clearInterval(mgWatchdog); mgWatchdog = null; }
        mgEl.hidden = true;
        mgCard.hidden = true;
        document.body.classList.remove('game-on');
        document.getElementById('botlayer').style.zIndex = '';
        mgOn = false; gameOn = false; MG = null;
        setExpr('happy');
        setState(reduced ? 'idle' : 'walk');
        showBubble(finished ? "Revanche quand tu veux !" : "Manche interrompue — on se reprend quand tu veux !", 4600, finished ? 'joke' : 'talk');
      }
      /* Le cerveau de pilote d'HGPTO : à chaque réflexion, il simule SA
         propre trajectoire sous plusieurs vitesses candidates pendant
         ~1,5 s, contre les trajectoires réelles des obstacles (même
         géométrie de collision que le jeu : enveloppe + nacelle), et il
         choisit la vitesse qui garde la plus grande distance de sécurité.
         À égalité, il préfère celle qui le rapproche de sa patrouille ou
         d'un anneau. Mêmes caps de vitesse et d'accélération que le
         joueur. Et parfois, gaffe : il prend la deuxième meilleure
         vitesse pendant une fraction de seconde — jamais quand un danger
         est à moins d'une seconde (instinct de survie). Il reste
         battable, et il le sait. Dans le brouillard, il voit moins loin. */
      function mgThink(){
        var b = MG.bot, by = mgH * 0.62, envY = by - 46, basY = by + 34;
        var speed = Math.max(40, mgClimbPx());
        var base = mgW / 2 + Math.sin(MG.t * 0.45) * mgW * 0.16;
        if (MG.rings.length && MG.obs.length < 4) base = MG.rings[0].x;
        var horizon = b.fog > 0 ? 0.8 : 1.5, step = 0.1;
        var vBase = Math.max(-720, Math.min(720, (base - b.x) * 2.2));
        var cands = [-720, -430, -180, 0, 180, 430, 720, vBase];
        var windPush = MG.wind.state === 'gust' ? MG.wind.dir * 175 : 0;
        var imminent = false, dangerNear = false;
        MG.obs.forEach(function(o){
          if (o.type === 'cloud') return;
          var tA = (envY - o.y) / speed;
          if (tA > -0.5 && tA < 0.9 && Math.abs(o.x - b.x) - o.r < 130) imminent = true;
          if (Math.abs(o.x - b.x) - o.r < 150 && o.y > envY - 360 && o.y < envY + 88) dangerNear = true;
        });
        function scoreV(v){
          var x = b.x, vx = b.vx, minD = 1e9;
          for (var ts = step; ts <= horizon + 0.001; ts += step){
            var dv = v - vx, mx = 2600 * step;
            vx += Math.max(-mx, Math.min(mx, dv));
            x += (vx + windPush) * step;
            if (x < 34){ x = 34; vx = 0; }
            if (x > mgW - 34){ x = mgW - 34; vx = 0; }
            for (var i = 0; i < MG.obs.length; i++){
              var o = MG.obs[i];
              if (o.type === 'cloud') continue;
              var oy = o.y + speed * ts;
              if (oy < envY - 120 || oy > basY + 130) continue;
              var ox = o.type === 'gull' ? o.x + o.vx * ts : o.x;
              var dE = Math.sqrt((ox - x) * (ox - x) + (oy - envY) * (oy - envY)) - (o.r + 26);
              var dB = Math.sqrt((ox - x) * (ox - x) + (oy - basY) * (oy - basY)) - (o.r + 8);
              var d = Math.min(dE, dB);
              if (o.type === 'storm' && o.state === 'charging') d = Math.min(d, Math.abs(ox - x) - 23);
              if (d < minD) minD = d;
            }
            for (var j = 0; j < MG.bolts.length; j++){
              var dBolt = Math.abs(MG.bolts[j].x - x) - 23;
              if (dBolt < minD) minD = dBolt;
            }
          }
          return minD;
        }
        var scored = cands.map(function(v){ return { v:v, s:scoreV(v) - Math.abs(v - vBase) * 0.012 }; });
        scored.sort(function(a, c){ return c.s - a.s; });
        var chosen = scored[0].v;
        if (imminent) MG.gaffeT = 0;                          // coupe-circuit de survie
        if (MG.gaffeT > 0){
          MG.gaffeT -= 0.12;
          chosen = MG.gaffeV;
        } else {
          var gaffeP = b.fog > 0 ? 0.05 : 0.02;
          if (!imminent && !dangerNear && Math.random() < gaffeP && scored.length > 1){
            MG.gaffeAt = Date.now();
            MG.gaffeV = scored[1].v;
            MG.gaffeT = 0.35;
            chosen = MG.gaffeV;
            if (Math.random() < 0.4) mgComment("Oups, mauvais bord ! Minute, je corrige…");
          }
        }
        MG.desVx = Math.max(-720, Math.min(720, chosen));
        MG.target = Math.max(40, Math.min(mgW - 40, b.x + MG.desVx * 0.5));
      }
      function mgMoveBalloon(b, dt, isBot){
        var maxV = 560;
        if (isBot){
          // Même physique que le joueur au clavier : accélération
          // 2600 px/s² vers la vitesse choisie par son pilote, cap 784.
          var dvB = MG.desVx - b.vx, mxB = 2600 * dt;
          b.vx += Math.max(-mxB, Math.min(mxB, dvB));
          b.vx = Math.max(-maxV * 1.4, Math.min(maxV * 1.4, b.vx));
        } else if (mgPointer.active){
          b.vx = Math.max(-maxV * 1.4, Math.min(maxV * 1.4, (mgPointer.x - b.x) * 9));
        } else if (mgKeys.l || mgKeys.r){
          if (mgKeys.l) b.vx -= 2600 * dt;
          if (mgKeys.r) b.vx += 2600 * dt;
          b.vx = Math.max(-maxV, Math.min(maxV, b.vx));
        } else {
          b.vx *= Math.pow(0.0018, dt);
          if (Math.abs(b.vx) < 2) b.vx = 0;
        }
        b.x += b.vx * dt;
        if (MG.wind.state === 'gust') b.x += MG.wind.dir * 175 * dt;
        if (b.x < 34){ b.x = 34; b.vx = 0; }
        if (b.x > mgW - 34){ b.x = mgW - 34; b.vx = 0; }
        var tiltT = (b.vx / maxV) * 0.16 + (MG.wind.state === 'gust' ? MG.wind.dir * 0.09 : 0);
        b.tilt += (tiltT - b.tilt) * Math.min(1, dt * 8);
      }
      function mgDie(b, who, cause){
        if (b.dead) return;
        b.dead = true;
        mgTone(320, 55, 0.9, 0.16, 'sawtooth');
        var by = mgH * 0.62;
        var colors = ['#e2543e','#f7f3e6','#2a9d8f','#f4b942'];
        for (var i = 0; i < 34; i++){
          var a = Math.random() * 6.283, sp = 60 + Math.random() * 240;
          MG.parts.push({ x:b.x, y:by - 46, vx:Math.cos(a) * sp, vy:Math.sin(a) * sp - 60,
            life:0.9 + Math.random() * 0.6, max:1.5, c:colors[i % 4], r:2.5 + Math.random() * 3.5 });
        }
        if (MG.over){ MG.winner = 'draw'; return; }   // les deux, en même temps
        MG.over = true;
        MG.winner = who === 'you' ? 'bot' : 'you';
        MG.endAt = Date.now() + 1050;
        if (who === 'bot'){
          if (Date.now() - MG.gaffeAt < 3000)
            showBubble("Ma faute, pour vrai : " + MG_CAUSES[cause] + " m'a eu parce que je regardais ailleurs. Je joue selon mes règles, et des fois je me trompe — hihi !", 7000, 'joke');
          else
            showBubble("Patatras pour moi ! " + MG_CAUSES[cause] + " m'a eu. Bien joué, champion — revanche ?", 6500, 'joke');
          setExpr('laugh');
        } else {
          showBubble("Patatras ! " + MG_CAUSES[cause] + " t'a eu — une manche pour moi, mais tu montais comme un pro. Revanche ?", 6500, 'joke');
          setExpr('laugh');
        }
      }
      function mgEndRound(){
        mgSession.rounds++;
        if (MG.winner === 'you') mgSession.you++;
        else if (MG.winner === 'bot') mgSession.bot++;
        var alt = Math.floor(MG.alt);
        var title = MG.winner === 'you' ? "Tu gagnes la manche !" :
                    MG.winner === 'bot' ? "HGPTO gagne la manche !" : "Égalité — les deux en même temps !";
        document.getElementById('mg-card-title').textContent = title;
        document.getElementById('mg-card-line').textContent =
          MG.winner === 'you' ? "Son ballon a pété le premier — le tien vole encore. Belle manche !" :
          MG.winner === 'bot' ? "Ton ballon a pété le premier — le sien vole encore. Il joue selon ses règles, et des fois il se trompe… pas cette fois !" :
          "Les deux ballons ont pété en même temps — les mouettes gagnent, cette manche-là.";
        document.getElementById('mg-card-stats').textContent =
          "Altitude atteinte : " + alt.toLocaleString('fr-CA') + " m · Anneaux — Toi " + MG.you.rings + " (+" + MG.you.bonus + ") · HGPTO " + MG.bot.rings + " (+" + MG.bot.bonus + ") · Manches de la session — Toi " + mgSession.you + " · HGPTO " + mgSession.bot;
        mgShareText = "Montgolfière contre HGPTO, la mascotte d'HP Outils : " +
          (MG.winner === 'you' ? "j'ai gagné la manche" : MG.winner === 'bot' ? "il a gagné la manche" : "égalité, les deux ballons en même temps") +
          " à " + alt.toLocaleString('fr-CA') + " m d'altitude ! Anneaux : moi " + MG.you.rings + ", lui " + MG.bot.rings +
          ". Manches de notre session : moi " + mgSession.you + ", lui " + mgSession.bot + ". À toi de le défier ! hp-outils.com/jeux";
        document.getElementById('mg-card-share').textContent = mgShareText;
        mgCard.hidden = false;
        mgHud();
      }
      function mgDist2(ax, ay, bx, by){ var dx = ax - bx, dy = ay - by; return dx * dx + dy * dy; }
      function mgUpdate(dt){
        MG.t += dt;
        var speed = mgClimbPx(), by = mgH * 0.62, envY = by - 46;
        if (!MG.over){
          MG.scroll += speed * dt;
          MG.alt = MG.scroll / 6;
          for (var m = 0; m < MG_MILESTONES.length; m++){
            if (MG.alt >= MG_MILESTONES[m][0] && MG.nextMs === MG_MILESTONES[m][0]){
              mgToast(MG_MILESTONES[m][1]);
              mgTone(880, 880, 0.3, 0.08); mgTone(1318, 1318, 0.4, 0.07);
              MG.nextMs = (m + 1 < MG_MILESTONES.length) ? MG_MILESTONES[m + 1][0] : Infinity;
              break;
            }
          }
          // Vent : calme → annonce (1 s) → bourrasque → calme
          var w = MG.wind;
          w.timer -= dt;
          if (w.state === 'calm' && w.timer <= 0){ w.state = 'announce'; w.timer = 1.0; w.dir = Math.random() < 0.5 ? -1 : 1; }
          else if (w.state === 'announce' && w.timer <= 0){ w.state = 'gust'; w.timer = 2.6 + Math.random() * 1.4; }
          else if (w.state === 'gust' && w.timer <= 0){ w.state = 'calm'; w.timer = 11 + Math.random() * 8; }
          if (w.state === 'gust' && Math.random() < dt * 26 && MG.windLines.length < 22){
            MG.windLines.push({ x:w.dir > 0 ? -110 : mgW + 20, y:30 + Math.random() * (mgH - 60), len:40 + Math.random() * 55, vx:w.dir * (520 + Math.random() * 380) });
          }
          MG.think -= dt;
          if (MG.think <= 0){ mgThink(); MG.think = 0.12; }
          if (!MG.you.dead) mgMoveBalloon(MG.you, dt, false);
          if (!MG.bot.dead) mgMoveBalloon(MG.bot, dt, true);
          MG.spawnT -= dt;
          if (MG.spawnT <= 0){ mgSpawnObstacle(); MG.spawnT = mgSpawnInterval() * (0.75 + Math.random() * 0.5); }
          // Obstacles
          for (var i = MG.obs.length - 1; i >= 0; i--){
            var o = MG.obs[i];
            o.y += speed * dt;
            if (o.type === 'gull'){
              o.x += o.vx * dt;
              o.y += Math.sin(MG.t * 3 + o.phase) * 14 * dt;
            } else if (o.type === 'bee'){
              o.phase += dt * 9;
              o.x = o.baseX + Math.sin(o.phase * 0.55) * 34 + o.drift * Math.sin(o.phase * 0.21);
              o.y += Math.sin(o.phase) * 26 * dt;
            } else if (o.type === 'cloud'){
              o.x += o.drift * dt;
              if (o.x < 30) o.drift = Math.abs(o.drift);
              if (o.x > mgW - 30) o.drift = -Math.abs(o.drift);
            } else if (o.type === 'storm'){
              o.x = o.baseX + Math.sin(MG.t * 0.5 + o.r) * 8;
              o.timer -= dt;
              if (o.state === 'idle' && o.timer <= 0){ o.state = 'charging'; o.timer = 0.85; }
              else if (o.state === 'charging' && o.timer <= 0){
                o.state = 'idle'; o.timer = 1.4 + Math.random() * 2.4;
                MG.bolts.push({ x:o.x, y0:o.y + 26, life:0.32, seed:Math.random() * 100 });
                mgTone(1400, 90, 0.22, 0.07, 'square');
              }
            }
            // Collisions (enveloppe puis nacelle), comme le vrai jeu
            ['you','bot'].forEach(function(who){
              var b = MG[who];
              if (b.dead) return;
              if (o.type === 'cloud'){
                if (mgDist2(o.x, o.y, b.x, envY) < (o.r + 30) * (o.r + 30)) b.fog = 1.5;
              } else {
                if (mgDist2(o.x, o.y, b.x, envY) < (o.r + 26) * (o.r + 26)) mgDie(b, who, o.type);
                else if (mgDist2(o.x, o.y, b.x, by + 34) < (o.r + 8) * (o.r + 8)) mgDie(b, who, o.type);
              }
            });
            if (MG.over) return;
            // Presque-touché d'HGPTO : il le remarque, sans ralentir
            if (!o.nm && o.y > envY + 52){
              o.nm = true;
              if (o.type !== 'cloud' && !MG.bot.dead && Math.abs(o.x - MG.bot.x) < 54)
                mgComment(pick(["Ouille ! C'était proche — mes sourcils ont frisé.", "Fiou ! Passé à un boulon de me pincer.", "Celui-là, il m'a rasé la barbe !"]));
            }
            if (o.y > mgH + 110 || o.x < -130 || o.x > mgW + 130) MG.obs.splice(i, 1);
          }
          // Éclairs : couloir vertical mortel
          for (var j = MG.bolts.length - 1; j >= 0; j--){
            var bo = MG.bolts[j];
            bo.y0 += speed * dt;
            bo.life -= dt;
            ['you','bot'].forEach(function(who){
              var b = MG[who];
              if (!b.dead && Math.abs(b.x - bo.x) < 17 && envY > bo.y0 - 10) mgDie(b, who, 'bolt');
            });
            if (MG.over) return;
            if (bo.life <= 0) MG.bolts.splice(j, 1);
          }
          // Anneaux dorés : +25, manquer ne coûte rien
          MG.ringT -= dt;
          if (MG.ringT <= 0){
            MG.rings.push({ x:56 + Math.random() * (mgW - 112), y:-70, r:36, phase:Math.random() * 6.28 });
            MG.ringT = 7 + Math.random() * 5;
          }
          for (var ri = MG.rings.length - 1; ri >= 0; ri--){
            var rg = MG.rings[ri];
            rg.y += speed * dt;
            var caught = null;
            if (!MG.you.dead && mgDist2(rg.x, rg.y, MG.you.x, envY) < 32 * 32) caught = 'you';
            else if (!MG.bot.dead && mgDist2(rg.x, rg.y, MG.bot.x, envY) < 32 * 32) caught = 'bot';
            if (caught){
              MG[caught].rings++; MG[caught].bonus += 25;
              MG.floaters.push({ x:rg.x, y:rg.y - 34, life:1.1, max:1.1 });
              mgTone(1046, 1046, 0.2, 0.09); mgTone(1568, 1568, 0.35, 0.08);
              if (caught === 'bot') mgComment(pick(["Anneau pour moi ! +25 — on avance !", "Pogné ! Les anneaux, c'est ma spécialité. Enfin, une de mes spécialités."]));
              else mgComment(pick(["Bel anneau ! Tu me donnes chaud.", "Beau +25 ! On avance, tous les deux."]));
              MG.rings.splice(ri, 1);
              mgHud();
              continue;
            }
            if (rg.y > mgH + 90) MG.rings.splice(ri, 1);
          }
          ['you','bot'].forEach(function(who){ if (MG[who].fog > 0) MG[who].fog -= dt; });
        }
        // Textes flottants, lignes de vent, particules
        for (var fi = MG.floaters.length - 1; fi >= 0; fi--){
          var fl = MG.floaters[fi]; fl.y -= 46 * dt; fl.life -= dt;
          if (fl.life <= 0) MG.floaters.splice(fi, 1);
        }
        for (var wl = MG.windLines.length - 1; wl >= 0; wl--){
          MG.windLines[wl].x += MG.windLines[wl].vx * dt;
          if (MG.windLines[wl].x < -160 || MG.windLines[wl].x > mgW + 160) MG.windLines.splice(wl, 1);
        }
        for (var p = MG.parts.length - 1; p >= 0; p--){
          var pt = MG.parts[p];
          pt.vy += 320 * dt; pt.x += pt.vx * dt; pt.y += pt.vy * dt; pt.life -= dt;
          if (pt.life <= 0) MG.parts.splice(p, 1);
        }
        if (MG.over && !MG.cardShown && Date.now() >= MG.endAt){
          MG.cardShown = true;
          mgEndRound();
        }
        mgHudAlt();
      }
      var mgAltCache = '';
      function mgHudAlt(){
        var t = 'Altitude : ' + Math.floor(MG.alt).toLocaleString('fr-CA') + ' m';
        if (t !== mgAltCache){ mgAltCache = t; mgAltEl.textContent = t; }
      }
      /* ----- Dessin (style encre de l'artefact, formes du vrai jeu) ----- */
      function mgSky(){
        var stops = [
          { a:0, top:[66,110,178], bot:[168,196,228] }, { a:1200, top:[104,142,200], bot:[190,212,236] },
          { a:3000, top:[146,172,216], bot:[214,230,244] }, { a:6000, top:[178,198,228], bot:[232,240,248] }
        ];
        var a = MG.alt, c1 = stops[0], c2 = stops[stops.length - 1];
        for (var i = 0; i < stops.length - 1; i++){
          if (a <= stops[i + 1].a){ c1 = stops[i]; c2 = stops[i + 1]; break; }
        }
        var t = c2.a === c1.a ? 0 : Math.max(0, Math.min(1, (a - c1.a) / (c2.a - c1.a)));
        function mix(u, v){ return 'rgb(' + Math.round(u[0] + (v[0] - u[0]) * t) + ',' + Math.round(u[1] + (v[1] - u[1]) * t) + ',' + Math.round(u[2] + (v[2] - u[2]) * t) + ')'; }
        var g = mgCtx.createLinearGradient(0, 0, 0, mgH);
        g.addColorStop(0, mix(c1.top, c2.top));
        g.addColorStop(1, mix(c1.bot, c2.bot));
        mgCtx.fillStyle = g;
        mgCtx.fillRect(0, 0, mgW, mgH);
      }
      function mgCloudShape(x, y, s, fill, alpha){
        var cs = [[0,0,30],[-30,6,22],[30,6,24],[-12,-12,22],[14,-10,20]];
        mgCtx.save();
        mgCtx.globalAlpha = alpha;
        mgCtx.fillStyle = fill;
        for (var i = 0; i < cs.length; i++){
          mgCtx.beginPath();
          mgCtx.arc(x + cs[i][0] * s, y + cs[i][1] * s, cs[i][2] * s, 0, 6.283);
          mgCtx.fill();
        }
        mgCtx.restore();
      }
      function mgDrawBalloon(b, isBot){
        if (b.dead) return;
        var by = mgH * 0.62;
        mgCtx.save();
        mgCtx.translate(b.x, by);
        mgCtx.rotate(b.tilt);
        mgCtx.save();
        mgCtx.beginPath();
        mgCtx.ellipse(0, -46, 34, 38, 0, 0, 6.283);
        mgCtx.clip();
        if (isBot){
          mgCtx.fillStyle = '#31517f';
          mgCtx.fillRect(-36, -86, 72, 80);
          mgCtx.fillStyle = '#fdf6e3';
          mgCtx.beginPath(); mgCtx.arc(0, -48, 7, 0, 6.283); mgCtx.fill();
        } else {
          var stripes = ['#e2543e','#f7f3e6','#2a9d8f','#f7f3e6','#e2543e'];
          var sw = 68 / stripes.length;
          for (var i = 0; i < stripes.length; i++){
            mgCtx.fillStyle = stripes[i];
            mgCtx.fillRect(-34 + i * sw, -86, sw + 1, 80);
          }
        }
        mgCtx.restore();
        mgCtx.strokeStyle = '#241b10'; mgCtx.lineWidth = 2.6;
        mgCtx.beginPath(); mgCtx.ellipse(0, -46, 34, 38, 0, 0, 6.283); mgCtx.stroke();
        mgCtx.strokeStyle = 'rgba(70,50,30,.8)'; mgCtx.lineWidth = 1.6;
        mgCtx.beginPath();
        mgCtx.moveTo(-15, -20); mgCtx.lineTo(-9, 16);
        mgCtx.moveTo(15, -20); mgCtx.lineTo(9, 16);
        mgCtx.moveTo(0, -15); mgCtx.lineTo(0, 16);
        mgCtx.stroke();
        if (!MG.over){
          var fl = 0.6 + Math.sin(MG.t * 31) * 0.25 + Math.random() * 0.15;
          mgCtx.fillStyle = 'rgba(255,150,40,.9)';
          mgCtx.beginPath(); mgCtx.ellipse(0, 8, 4.2 * fl + 1.5, 8.5 * fl + 2, 0, 0, 6.283); mgCtx.fill();
        }
        mgCtx.fillStyle = '#a06a34';
        mgCtx.fillRect(-12, 16, 24, 17);
        mgCtx.strokeStyle = '#241b10'; mgCtx.lineWidth = 1.6;
        mgCtx.strokeRect(-12, 16, 24, 17);
        if (isBot){
          // mini-HGPTO dans la nacelle : tête métal, gros sourcils, lys
          mgCtx.beginPath(); mgCtx.arc(0, 12, 8.5, 0, 6.283);
          mgCtx.fillStyle = '#c9cfda'; mgCtx.fill();
          mgCtx.strokeStyle = '#241b10'; mgCtx.lineWidth = 1.6; mgCtx.stroke();
          mgCtx.strokeStyle = '#1d1710'; mgCtx.lineWidth = 3; mgCtx.lineCap = 'round';
          mgCtx.beginPath();
          mgCtx.moveTo(-6.5, 7.5); mgCtx.lineTo(-1.5, 6);
          mgCtx.moveTo(1.5, 6); mgCtx.lineTo(6.5, 7.5);
          mgCtx.stroke();
          mgCtx.fillStyle = '#20242c';
          mgCtx.beginPath(); mgCtx.arc(-3, 11, 1.4, 0, 6.283); mgCtx.arc(3, 11, 1.4, 0, 6.283); mgCtx.fill();
        } else {
          mgCtx.fillStyle = '#2f6fb2';
          mgCtx.fillRect(13, 8, 11, 7.5);
          mgCtx.fillStyle = '#fff';
          mgCtx.fillRect(17.6, 8, 1.8, 7.5);
          mgCtx.fillRect(13, 11, 11, 1.8);
        }
        mgCtx.restore();
        if (b.fog > 0){
          mgCtx.save();
          mgCtx.globalAlpha = 0.5;
          mgCtx.fillStyle = '#fff';
          for (var fi2 = 0; fi2 < 5; fi2++){
            mgCtx.beginPath();
            mgCtx.arc(b.x + Math.sin(MG.t * 1.3 + fi2 * 2.4) * 44, by - 46 + Math.cos(MG.t * 1.7 + fi2 * 1.9) * 30, 26 + fi2 * 5, 0, 6.283);
            mgCtx.fill();
          }
          mgCtx.restore();
        }
      }
      function mgRender(){
        mgSky();
        var by = mgH * 0.62;
        // Soleil gravé, qui pâlit avec l'altitude
        var sunA = Math.max(0.25, 1 - MG.alt / 9000);
        mgCtx.save();
        mgCtx.globalAlpha = 0.5 * sunA + 0.15;
        mgCtx.fillStyle = '#f6d47c';
        mgCtx.beginPath(); mgCtx.arc(mgW - 56, 66, 24, 0, 6.283); mgCtx.fill();
        mgCtx.globalAlpha = 0.55 * sunA + 0.2;
        mgCtx.strokeStyle = '#241b10'; mgCtx.lineWidth = 2.2;
        mgCtx.beginPath(); mgCtx.arc(mgW - 56, 66, 24, 0, 6.283); mgCtx.stroke();
        mgCtx.restore();
        // Sol au tout début, comme dans le vrai jeu
        var groundY = by + MG.alt * 6 + 96;
        if (groundY < mgH + 40){
          var bands = ['#8aa653','#c9a44e','#7c9a4b','#b98d45'];
          for (var row = 0; groundY + row * 46 < mgH + 46; row++){
            mgCtx.fillStyle = bands[row % 4];
            mgCtx.fillRect(0, groundY + row * 46, mgW, 46);
          }
          mgCtx.fillStyle = '#241b10';
          mgCtx.fillRect(0, groundY - 2, mgW, 4);
        }
        // Éclairs
        MG.bolts.forEach(function(bo){
          mgCtx.save();
          mgCtx.globalAlpha = Math.min(1, bo.life / 0.32 + 0.3);
          mgCtx.strokeStyle = '#ffe95e'; mgCtx.lineWidth = 4.5; mgCtx.lineJoin = 'round';
          mgCtx.shadowColor = '#ffd83d'; mgCtx.shadowBlur = 14;
          mgCtx.beginPath();
          var yy = bo.y0, xx = bo.x;
          mgCtx.moveTo(xx, yy);
          while (yy < mgH + 20){
            yy += 46;
            xx = bo.x + Math.sin(yy * 0.05 + bo.seed) * 15;
            mgCtx.lineTo(xx - 6, yy - 23);
            mgCtx.lineTo(xx, yy);
          }
          mgCtx.stroke();
          mgCtx.restore();
        });
        // Obstacles
        MG.obs.forEach(function(o){
          if (o.type === 'gull'){
            var flap = Math.sin(MG.t * o.flap * 2 + o.phase) * 0.55;
            var dir = o.vx > 0 ? 1 : -1;
            mgCtx.save();
            mgCtx.translate(o.x, o.y); mgCtx.scale(dir, 1);
            mgCtx.strokeStyle = '#fbfdfe'; mgCtx.lineWidth = 5; mgCtx.lineCap = 'round';
            mgCtx.beginPath();
            mgCtx.moveTo(-2, -2); mgCtx.quadraticCurveTo(-16, -10 - flap * 12, -27, -4 - flap * 17);
            mgCtx.moveTo(2, -2); mgCtx.quadraticCurveTo(13, -12 - flap * 10, 22, -16 - flap * 14);
            mgCtx.stroke();
            mgCtx.fillStyle = '#fbfdfe';
            mgCtx.beginPath(); mgCtx.ellipse(0, 0, 15, 6.4, 0, 0, 6.283); mgCtx.fill();
            mgCtx.strokeStyle = '#241b10'; mgCtx.lineWidth = 1.6;
            mgCtx.beginPath(); mgCtx.ellipse(0, 0, 15, 6.4, 0, 0, 6.283); mgCtx.stroke();
            mgCtx.fillStyle = '#f39c2c';
            mgCtx.beginPath(); mgCtx.moveTo(17.5, -3.4); mgCtx.lineTo(24.5, -2); mgCtx.lineTo(17.5, -0.8); mgCtx.closePath(); mgCtx.fill();
            mgCtx.restore();
          } else if (o.type === 'bee'){
            mgCtx.save();
            mgCtx.translate(o.x, o.y);
            mgCtx.fillStyle = 'rgba(255,255,255,.7)';
            mgCtx.beginPath(); mgCtx.ellipse(-4, -11, 8, 4.4, -0.6, 0, 6.283); mgCtx.fill();
            mgCtx.beginPath(); mgCtx.ellipse(5, -11, 8, 4.4, 0.6, 0, 6.283); mgCtx.fill();
            mgCtx.save();
            mgCtx.beginPath(); mgCtx.ellipse(0, 0, 13.5, 10, 0, 0, 6.283); mgCtx.clip();
            mgCtx.fillStyle = '#f6c945'; mgCtx.fillRect(-14, -11, 28, 22);
            mgCtx.fillStyle = '#22242a';
            mgCtx.fillRect(-8, -11, 5.4, 22); mgCtx.fillRect(0.5, -11, 5.4, 22); mgCtx.fillRect(9, -11, 5, 22);
            mgCtx.restore();
            mgCtx.strokeStyle = '#241b10'; mgCtx.lineWidth = 2;
            mgCtx.beginPath(); mgCtx.ellipse(0, 0, 13.5, 10, 0, 0, 6.283); mgCtx.stroke();
            mgCtx.restore();
          } else if (o.type === 'cloud'){
            mgCloudShape(o.x, o.y, o.s * 1.05, '#ffffff', 0.96);
          } else if (o.type === 'storm'){
            var flash = o.state === 'charging' && Math.sin(MG.t * 34) > 0;
            mgCloudShape(o.x, o.y, 1.15, flash ? '#5b6572' : '#454e5a', 1);
            mgCloudShape(o.x - 16, o.y + 9, 0.8, flash ? '#525c68' : '#3c444f', 1);
          }
        });
        // Anneaux dorés
        MG.rings.forEach(function(rg){
          var pulse = 1 + Math.sin(MG.t * 3.2 + rg.phase) * 0.045;
          mgCtx.save();
          mgCtx.translate(rg.x, rg.y);
          mgCtx.shadowColor = 'rgba(244,185,66,.85)'; mgCtx.shadowBlur = 16;
          mgCtx.strokeStyle = '#f4b942'; mgCtx.lineWidth = 7;
          mgCtx.beginPath(); mgCtx.arc(0, 0, rg.r * pulse, 0, 6.283); mgCtx.stroke();
          mgCtx.shadowBlur = 0;
          mgCtx.strokeStyle = '#241b10'; mgCtx.lineWidth = 2;
          mgCtx.beginPath(); mgCtx.arc(0, 0, rg.r * pulse + 4.5, 0, 6.283); mgCtx.stroke();
          mgCtx.restore();
        });
        // Lignes de vent
        if (MG.windLines.length){
          mgCtx.save();
          mgCtx.lineCap = 'round';
          mgCtx.strokeStyle = 'rgba(36,27,16,.55)'; mgCtx.lineWidth = 2.6;
          MG.windLines.forEach(function(l){
            mgCtx.beginPath(); mgCtx.moveTo(l.x, l.y); mgCtx.lineTo(l.x + l.len, l.y + 3); mgCtx.stroke();
          });
          mgCtx.restore();
        }
        mgDrawBalloon(MG.bot, true);
        mgDrawBalloon(MG.you, false);
        // Particules d'enveloppe éclatée
        MG.parts.forEach(function(pt){
          mgCtx.save();
          mgCtx.globalAlpha = Math.max(0, pt.life / pt.max);
          mgCtx.fillStyle = pt.c;
          mgCtx.beginPath(); mgCtx.arc(pt.x, pt.y, pt.r, 0, 6.283); mgCtx.fill();
          mgCtx.restore();
        });
        // +25 flottants
        MG.floaters.forEach(function(fl){
          mgCtx.save();
          mgCtx.globalAlpha = Math.max(0, fl.life / fl.max);
          mgCtx.font = "900 22px 'Trebuchet MS','Segoe UI',sans-serif";
          mgCtx.textAlign = 'center';
          mgCtx.lineWidth = 4; mgCtx.strokeStyle = 'rgba(16,48,79,.85)';
          mgCtx.strokeText('+25', fl.x, fl.y);
          mgCtx.fillStyle = '#f4b942';
          mgCtx.fillText('+25', fl.x, fl.y);
          mgCtx.restore();
        });
        // Flèche VENT (annonce + bourrasque)
        if (MG.wind.state !== 'calm'){
          var announcing = MG.wind.state === 'announce';
          var blink = 0.55 + 0.45 * Math.sin(MG.t * 12);
          var dir = MG.wind.dir, cx = dir > 0 ? 42 : mgW - 42, cy = mgH * 0.34;
          mgCtx.save();
          mgCtx.globalAlpha = announcing ? 0.4 + 0.45 * blink : 0.92;
          mgCtx.translate(cx, cy); mgCtx.scale(dir, 1);
          mgCtx.fillStyle = '#241b10';
          mgCtx.beginPath();
          mgCtx.moveTo(-20, -7); mgCtx.lineTo(4, -7); mgCtx.lineTo(4, -15); mgCtx.lineTo(24, 0);
          mgCtx.lineTo(4, 15); mgCtx.lineTo(4, 7); mgCtx.lineTo(-20, 7);
          mgCtx.closePath(); mgCtx.fill();
          mgCtx.restore();
          mgCtx.save();
          mgCtx.globalAlpha = announcing ? 0.55 + 0.45 * blink : 0.95;
          mgCtx.fillStyle = '#241b10';
          mgCtx.font = "800 12px 'Trebuchet MS','Segoe UI',sans-serif";
          mgCtx.textAlign = 'center';
          mgCtx.fillText('VENT', cx, cy - 30);
          mgCtx.restore();
        }
        // Étiquettes sous les nacelles
        mgCtx.save();
        mgCtx.font = "800 12px 'Trebuchet MS','Segoe UI',sans-serif";
        mgCtx.textAlign = 'center';
        mgCtx.fillStyle = 'rgba(36,27,16,.85)';
        if (!MG.you.dead) mgCtx.fillText('TOI', MG.you.x, by + 52);
        if (!MG.bot.dead) mgCtx.fillText('HGPTO', MG.bot.x, by + 52);
        mgCtx.restore();
      }
      var mgLastFrameAt = 0, mgWatchdog = null;
      function mgFrame(ts){
        if (!mgOn || !MG) return;
        mgLastFrameAt = ts;
        mgRaf = requestAnimationFrame(mgFrame);
        if (!mgLastTs) mgLastTs = ts;
        var dt = (ts - mgLastTs) / 1000;
        mgLastTs = ts;
        if (dt > 0.05) dt = 0.05;
        if (dt > 0){ mgUpdate(dt); mgRender(); }
      }
      /* Entrées du joueur : doigt / souris sur le ciel, flèches au clavier */
      var mgPointer = { active:false, x:0 };
      var mgKeys = { l:false, r:false };
      function mgPointerSet(e){
        var rect = mgCanvas.getBoundingClientRect();
        var cx = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
        mgPointer.x = cx - rect.left;
      }
      mgCanvas.addEventListener('pointerdown', function(e){
        mgPointer.active = true; mgPointerSet(e);
        try { mgCanvas.setPointerCapture(e.pointerId); } catch(err){}
      });
      mgCanvas.addEventListener('pointermove', function(e){ if (mgPointer.active) mgPointerSet(e); });
      window.addEventListener('pointerup', function(){ mgPointer.active = false; });
      mgCanvas.addEventListener('touchstart', function(e){ e.preventDefault(); }, { passive:false });
      mgCanvas.addEventListener('touchmove', function(e){ e.preventDefault(); }, { passive:false });
      window.addEventListener('keydown', function(e){
        if (!mgOn) return;
        if (e.key === 'ArrowLeft' || e.key === 'a'){ mgKeys.l = true; e.preventDefault(); }
        if (e.key === 'ArrowRight' || e.key === 'd'){ mgKeys.r = true; e.preventDefault(); }
      });
      window.addEventListener('keyup', function(e){
        if (e.key === 'ArrowLeft' || e.key === 'a') mgKeys.l = false;
        if (e.key === 'ArrowRight' || e.key === 'd') mgKeys.r = false;
      });
      window.addEventListener('resize', function(){ if (mgOn) mgResize(); });
      document.getElementById('mg-quit').addEventListener('click', function(){ quitMG(false); });
      document.getElementById('mg-card-close').addEventListener('click', function(){ quitMG(true); });
      document.getElementById('mg-card-again').addEventListener('click', function(){
        mgCard.hidden = true;
        mgResetRound();
        showBubble("Revanche ! Même ciel, mêmes mouettes — on avance !", 4600, 'joke');
      });
      document.getElementById('mg-card-copy').addEventListener('click', function(){
        var done = function(){ document.getElementById('mg-card-copied').hidden = false; };
        if (navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(mgShareText).then(done, function(){ fallbackCopyText(mgShareText, done); });
        } else {
          fallbackCopyText(mgShareText, done);
        }
      });


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
        if (!actx || soundLevel === 0) return;
        var o = actx.createOscillator(), g = actx.createGain();
        o.type = type || 'sine';
        o.frequency.setValueAtTime(f0, t0);
        o.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t0 + dur);
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(vol * volMul(), t0 + dur * 0.3);
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
      /* ---------- Pixel saute de bloc en bloc (ajout d'Hugo, 22 oct.
         2026) : comportement OCCASIONNEL et bref — au plus une
         séquence par ~4 minutes. Elle quitte le sol, enchaîne 2 à
         4 sauts sur le HAUT de blocs de contenu (sections « sec-* »
         quand elles existent, sinon grands blocs visibles),
         atterrissage propre, petit temps d'arrêt sur chaque bloc —
         parfois une micro-sieste sur le dernier — puis elle
         redescend et reprend son suivi d'HGPTO. Jamais pendant une
         tâche du visiteur, une visite guidée, le jeu caché ou la
         Pause ; pointeur désactivé le temps des sauts (elle reste
         non interactive, aucun contenu déplacé, aucun clic bloqué :
         elle ne fait que se poser sur le haut des blocs dans la
         zone fixe d'HGPTO). Si quelqu'un d'autre prend la main sur
         Pixel (elle part, elle se cache pour le jeu…), la séquence
         s'efface proprement sans lui disputer la suite. */
      var hopBusy = false, lastHopAt = Date.now(), hopBlock = null, hopSync = null;
      var hopHomeMode = 'follow', hopHomeX = 0;
      function hopTargets(){
        var out = [];
        function collect(list, minW, minH){
          Array.prototype.slice.call(list).forEach(function(el){
            if (out.indexOf(el) !== -1) return;
            var r = el.getBoundingClientRect();
            // Bloc réellement visible : une bonne partie à l'écran,
            // son haut sous le haut de la fenêtre (atterrissage
            // possible sur le haut du bloc).
            if (r.width > minW && r.height > minH && r.bottom > 120 && r.top < window.innerHeight - 30) out.push(el);
          });
        }
        collect(document.querySelectorAll('[id^="sec-"]'), 220, 60);
        if (out.length < 2){
          // Ex. l'accueil au chargement : une seule section visible,
          // mais ses grands blocs intérieurs font d'autres perchoirs.
          collect(document.querySelectorAll('main section, main article, main > div, main section > div, main section > article'), 260, 110);
        }
        return out;
      }
      function hopCleanup(){
        if (hopSync){ clearInterval(hopSync); hopSync = null; }
        hopBlock = null;
        catEl.classList.remove('hopping');
        catEl.style.transition = 'bottom .5s ease';
        catEl.style.bottom = '4px';
        setTimeout(function(){ catEl.style.transition = ''; }, 550);
        catEl.style.pointerEvents = '';
        hopBusy = false;
      }
      function catBlockHops(){
        if (hopBusy || !catVisible || catTarget !== null) return false;
        if (catMode !== 'follow' && catMode !== 'stay') return false;
        if (paused || gameOn || tourOn || qaOpen || calm || isHidden || docHidden) return false;
        if (catState === 'sleep' || catState === 'console' || catState === 'eat') return false;
        if (state === 'sleep') return false;
        var targets = hopTargets();
        if (targets.length < 2) return false;
        hopBusy = true; lastHopAt = Date.now();
        hopHomeMode = catMode; hopHomeX = catX;
        catMode = 'hop';
        catEl.style.pointerEvents = 'none';
        targets.sort(function(a, b){
          return Math.abs(a.getBoundingClientRect().left - catX) - Math.abs(b.getBoundingClientRect().left - catX);
        });
        var n = 2 + Math.floor(Math.random() * 3);   // 2 à 4 sauts
        var seq = targets.slice(0, Math.min(n, targets.length));
        var i = 0;
        var scroll0 = window.scrollY;
        function finish(){
          hopCleanup();
          if (catVisible){
            setCatState('idle');
            if (hopHomeMode === 'follow'){
              catMode = 'follow';
              catGo(catBesideX(), 230, catArrivedFollow);
            } else {
              // Elle retourne à son coin, comme elle était.
              catMode = 'stay';
              catGo(hopHomeX, 200, function(){ if (catMode === 'stay') setCatState('idle'); });
            }
          }
        }
        function step(){
          // Quelqu'un d'autre a pris la main (départ, jeu…) : on rend
          // l'élément propre, sans disputer ni le mode ni la route.
          if (catMode !== 'hop' || !catVisible){ hopCleanup(); return; }
          if (gameOn || tourOn || paused){ finish(); return; }
          if (Math.abs(window.scrollY - scroll0) > 160){ finish(); return; }
          if (i >= seq.length){
            if (Math.random() < 0.3){
              // Micro-sieste sur le dernier bloc, dans son caractère.
              setCatState('sleep');
              setTimeout(function(){
                if (catMode !== 'hop'){ hopCleanup(); return; }
                setCatState('idle');
                finish();
              }, 6000 + Math.random() * 5000);
            } else {
              setTimeout(function(){ if (catMode === 'hop') finish(); else hopCleanup(); }, 900);
            }
            return;
          }
          var el = seq[i++];
          hopBlock = el;
          var r = el.getBoundingClientRect();
          var tx = Math.max(4, Math.min(vw() - CAT_W - 4, r.left + 26));
          catEl.style.transition = 'bottom .55s cubic-bezier(.34,.56,.4,1)';
          catEl.style.bottom = Math.max(6, window.innerHeight - r.top + 2) + 'px';
          catEl.classList.remove('hopping');
          void catEl.offsetWidth;
          catEl.classList.add('hopping');
          setCatState('walk');
          catGo(tx, 330, function(){
            if (catMode !== 'hop'){ hopCleanup(); return; }
            setCatState(Math.random() < 0.4 ? 'stare' : 'idle');
            // Rester collée au haut du bloc si la page glisse un peu.
            if (hopSync) clearInterval(hopSync);
            hopSync = setInterval(function(){
              if (catMode !== 'hop' || hopBlock !== el){ if (hopSync){ clearInterval(hopSync); hopSync = null; } return; }
              var rr = el.getBoundingClientRect();
              if (rr.bottom < 0 || rr.top > window.innerHeight){ if (hopSync){ clearInterval(hopSync); hopSync = null; } finish(); return; }
              catEl.style.bottom = Math.max(6, window.innerHeight - rr.top + 2) + 'px';
            }, 300);
            setTimeout(step, 1100 + Math.random() * 900);
          });
        }
        step();
        return true;
      }
      setInterval(function(){
        if (hopBusy) return;
        if (Date.now() - lastHopAt < 4 * 60 * 1000) return;
        if (Math.random() > 0.3) return;
        catBlockHops();
      }, 30000);
      function previewCatHops(){
        // La scène des sauts exige qaOpen === false (garde de
        // catBlockHops) : sans fermer le panneau, le bouton était mort
        // ET la scène invisible. Même geste que le barbouillage.
        if (qaOpen) closeQA();
        busyUntil = 0;
        lastHopAt = 0;
        if (!catVisible || (catMode !== 'follow' && catMode !== 'stay')) summonCat('follow');
        if (catState === 'sleep') setCatState('idle');
        var tries = 0;
        var iv = setInterval(function(){
          tries++;
          if (catBlockHops() || tries > 14) clearInterval(iv);
        }, 700);
      }
      document.getElementById('qa-sauts').addEventListener('click', previewCatHops);

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
        '/livres-pdf': "Petit résumé calme : 4 livres en PDF, de 10 $ à 15 $, téléchargement immédiat après le paiement. Prends ton temps.",
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
        // Lot nº 4, humeur Drôle : les suggestions tombent au minimum —
        // plus rien de spontané (ni vignette, ni attente, ni « choix »,
        // ni fin de visite) ; seules survivent celles qui RÉPONDENT à
        // une question du visiteur (fromQA / asked), comme en normal.
        if (mood === 'drole' && !opts.fromQA && !opts.asked) return false;
        // Mode Grognon drôle (phase 2) : même retenue que Drôle — le
        // mode des bêtises n'est pas un mode de vente ; il se retire
        // dès que ça devient sérieux, et il RÉPOND toujours juste.
        if (hgMode === 'grognon' && !opts.fromQA && !opts.asked) return false;
        // Mode Ami (phase 2) : AUCUNE démarche de vente, point — il
        // répond aux questions (answerQuestion ne passe pas par ici),
        // il accompagne, il ne propose rien de lui-même. Pour les
        // jeunes : zéro vente, comme Hugo l'a tranché.
        if (hgMode === 'ami' && !opts.asked) return false;
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
        // Lot nº 4, humeur Vendeur : une accroche franche et drôle part
        // en tête de la suggestion — le produit, son prix et son lien
        // restent EXACTEMENT ceux de la base. Jamais sur les
        // alternatives honnêtes (soft) : la porte de sortie ne se vend pas.
        var pp = p;
        if (mood === 'vendeur' && !opts.soft){
          pp = { t: pick(VENDEUR_HOOKS) + p.t, u: p.u, l: p.l, s: p.s };
        }
        // Le bouton « Non merci » est ajouté via onShow : si la
        // suggestion doit attendre son tour (file des bulles, correctif
        // lecture du 23 oct. 2026), il se pose sur SA bulle au moment où
        // elle s'affiche — jamais sur celle d'une réponse en lecture.
        // Phase 2 (modes, 23 oct. 2026) : une suggestion PROACTIVE
        // (fin de vignette, attente sur une page — jamais soft, jamais
        // fromQA) s'affiche tout de suite, comme avant le correctif
        // lecture : les gardes du lot nº 3 ne la laissent passer qu'à
        // un moment calme, et la mettre en file la faisait avaler en
        // silence par la scène suivante — le créneau de la page était
        // consommé sans que le visiteur ait jamais vu l'invitation
        // (constaté en test : aucune suggestion visible en 95 s).
        doInvite(pp, function(){
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
        }, !!opts.now || (!opts.soft && !opts.fromQA));
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
        if (Date.now() - dwellStart < dwellThreshold()) return;
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
      // Service client (23 oct. 2026) — page d'arrivée : si elle a déjà
      // été vue dans CETTE session (retour après navigation), le clin
      // d'œil de retour est armé ; sinon, on la consigne comme vue.
      (function(){
        var k0 = routeKey();
        if (visitedRoutes.indexOf(k0) !== -1 && winkedRoutes.indexOf(k0) === -1) returnWinkPending = true;
        if (visitedRoutes.indexOf(k0) === -1){ visitedRoutes.push(k0); saveSet('hgpto-visited', visitedRoutes); }
      })();
      // Restauration du mode (phase 2) : le choix du visiteur tient
      // pour toute la session, d'une page à l'autre — appliqué en
      // silence au démarrage (l'annonce, c'est pour le changement,
      // pas pour chaque page).
      (function(){
        var saved = null;
        try { saved = sessionStorage.getItem('hgpto-mode'); } catch(e) {}
        if (saved && saved !== 'defaut') applyMode(saved, false);
      })();
      setInterval(function(){
        var k = routeKey();
        if (k === lastRoute) return;
        lastRoute = k;
        dwellRoute = k; dwellStart = Date.now();
        ieOnRoute(k);
        // Retour sur une page déjà vue cette session : armer le clin
        // d'œil (livré par talk(), une fois par page) et sauter le
        // commentaire de route cette fois — le clin d'œil le remplace.
        var isReturn = visitedRoutes.indexOf(k) !== -1;
        if (!isReturn){ visitedRoutes.push(k); saveSet('hgpto-visited', visitedRoutes); }
        else if (winkedRoutes.indexOf(k) === -1) returnWinkPending = true;
        applyCostume();
        if (returnWinkPending) return;
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
