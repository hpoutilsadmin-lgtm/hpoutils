/* Sir H. Gepeto — structure HTML de la surcouche (figure, Pixel, bulles, dock,
   panneau Questions, carte souvenir, jeu caché), portée telle quelle du
   prototype validé. Injectée côté client par Hgpto.tsx. */
export const HGPTO_MARKUP = `
<div id="decor" aria-hidden="true"></div>
    <div class="bot-layer" id="botlayer">
      <div class="graffiti" id="graffiti" hidden aria-hidden="true">
        <svg viewBox="0 0 210 92" width="210" height="92">
          <path d="M34 26 C34 14 52 12 58 24 C64 12 82 14 82 26 C82 40 58 52 58 52 C58 52 34 40 34 26 Z" fill="none" stroke="#b97f24" stroke-width="4" stroke-linejoin="round" opacity=".85"/>
          <path d="M102 14 l3 7.5 7.5 3 -7.5 3 -3 7.5 -3 -7.5 -7.5 -3 7.5 -3 z" fill="none" stroke="#b97f24" stroke-width="3.4" stroke-linejoin="round"/>
          <text x="14" y="78" font-family="Georgia,serif" font-size="17" font-style="italic" font-weight="700" fill="#2b2118" opacity=".78">Sir H. Gepeto était là !</text>
        </svg>
      </div>
      <div class="bot" id="bot" data-state="idle" data-expr="happy" role="button" tabindex="0"
           aria-label="Sir H. Gepeto, l'assistant virtuel du site HP Outils. Touchez-le pour le chatouiller, glissez-le pour le déplacer.">
        <div class="bubble" id="bubble" aria-live="polite"></div>        <div class="zzz" aria-hidden="true"><span>Z</span><span>Z</span><span>Z</span></div>
        <div class="burst" id="burst" aria-hidden="true"></div>
        <div class="bot-inner">
          <img class="bot-img" src="/images/hgepeto-base-definitive.png" alt="Sir H. Gepeto" draggable="false">
        </div>
        <div class="hgpto-tie" aria-hidden="true"><svg viewBox="0 0 24 64" width="24" height="64"><polygon points="12,2 19,8 15,14 12,12 9,14 5,8" fill="#1f3a5f"/><polygon points="9,14 15,14 19,34 12,62 5,34" fill="#1f3a5f"/><g fill="#d89532"><circle cx="12" cy="24" r="1.8"/><circle cx="12" cy="34" r="1.8"/><circle cx="12" cy="44" r="1.8"/></g></svg></div>
        <div class="hgpto-case" aria-hidden="true"><svg viewBox="0 0 48 34" width="48" height="34"><path d="M16 10 V6 a4 4 0 0 1 4 -4 h8 a4 4 0 0 1 4 4 v4" fill="none" stroke="#2b2118" stroke-width="2.6"/><rect x="2" y="10" width="44" height="22" rx="4" fill="#6b4a2f" stroke="#2b2118" stroke-width="2.4"/><rect x="20" y="10" width="8" height="7" rx="1.5" fill="#d89532" stroke="#2b2118" stroke-width="1.6"/></svg></div>
      </div>
      <!-- Pastille de repli (24 oct. 2026) : quand le visiteur replie Sir H. Gepeto
           à la main, le robot et Pixel se cachent et cette pastille reste
           — un tap la rouvre. Jamais automatique. -->
      <button type="button" id="bot-pastille" aria-label="Rouvrir Sir H. Gepeto">Sir H. Gepeto</button>
      <!-- PIXEL, la chatte de Sir H. Gepeto : elle vit ici, au chaud -->
      <div class="cat" id="cat" data-state="sleep" role="button" tabindex="0"
           aria-label="Pixel, la chatte de Sir H. Gepeto. Touchez-la doucement pour la flatter.">
        <div class="burst" id="cat-burst" aria-hidden="true"></div>
        <div class="cat-inner">
          <svg class="cat-svg" viewBox="0 0 120 92" aria-hidden="true">
            <ellipse cx="60" cy="85" rx="34" ry="4.5" fill="rgba(43,33,24,.20)"/>
            <g id="poseStand">
              <path class="cat-tail" d="M90 60 Q114 56 110 29" fill="none" stroke="#6f757f" stroke-width="9" stroke-linecap="round"/>
              <rect x="38" y="66" width="8" height="14" rx="3" fill="#7d8593" stroke="var(--botink)" stroke-width="2.2"/>
              <rect x="52" y="66" width="8" height="14" rx="3" fill="#7d8593" stroke="var(--botink)" stroke-width="2.2"/>
              <rect x="72" y="66" width="8" height="14" rx="3" fill="#7d8593" stroke="var(--botink)" stroke-width="2.2"/>
              <rect x="84" y="66" width="8" height="14" rx="3" fill="#7d8593" stroke="var(--botink)" stroke-width="2.2"/>
              <rect x="28" y="44" width="64" height="28" rx="13" fill="#9aa1ae" stroke="var(--botink)" stroke-width="3"/>
              <g stroke="#6f757f" stroke-width="3" stroke-linecap="round">
                <path d="M50 47 v8"/><path d="M62 47 v8"/><path d="M74 47 v8"/>
              </g>
              <g class="cat-head">
                <path d="M13 27 L18 7 L33 19 Z" fill="#9aa1ae" stroke="var(--botink)" stroke-width="2.6" stroke-linejoin="round"/>
                <path d="M41 19 L56 7 L61 27 Z" fill="#9aa1ae" stroke="var(--botink)" stroke-width="2.6" stroke-linejoin="round"/>
                <path d="M19 21 L21 12 L28 18 Z" fill="#d98a9e"/>
                <path d="M47 18 L54 12 L56 21 Z" fill="#d98a9e"/>
                <circle cx="37" cy="35" r="19" fill="#9aa1ae" stroke="var(--botink)" stroke-width="3"/>
                <g stroke="#6f757f" stroke-width="2.4" stroke-linecap="round">
                  <path d="M31 19 v6"/><path d="M38 18 v6"/><path d="M45 19 v6"/>
                </g>
                <g class="eyes-open">
                  <circle cx="29" cy="35" r="2.7" fill="#20242c"/><circle cx="45" cy="35" r="2.7" fill="#20242c"/>
                  <circle cx="30" cy="34" r="0.9" fill="#fff"/><circle cx="46" cy="34" r="0.9" fill="#fff"/>
                </g>
                <g class="eyes-shut" fill="none" stroke="var(--botink)" stroke-width="2.2" stroke-linecap="round">
                  <path d="M24 35 Q29 38.5 34 35"/><path d="M40 35 Q45 38.5 50 35"/>
                </g>
                <path d="M34 41 h6 l-3 4 z" fill="#d98a9e" stroke="var(--botink)" stroke-width="1.6" stroke-linejoin="round"/>
                <path d="M37 45 q-3 3 -6 1.5 M37 45 q3 3 6 1.5" fill="none" stroke="var(--botink)" stroke-width="1.8" stroke-linecap="round"/>
                <g stroke="#c9cdd4" stroke-width="1.6" stroke-linecap="round">
                  <path d="M18 40 L4 37"/><path d="M18 44 L5 45"/><path d="M56 40 L70 37"/><path d="M56 44 L69 45"/>
                </g>
                <path d="M21 50 Q37 58 53 50" fill="none" stroke="#b97f24" stroke-width="5" stroke-linecap="round"/>
                <circle cx="37" cy="55" r="3.6" fill="var(--gold)" stroke="var(--botink)" stroke-width="1.8"/>
              </g>
            </g>
            <g id="poseCurl">
              <ellipse cx="60" cy="68" rx="37" ry="15" fill="#9aa1ae" stroke="var(--botink)" stroke-width="3"/>
              <g stroke="#6f757f" stroke-width="3" stroke-linecap="round">
                <path d="M52 57 q2 5 0 9"/><path d="M66 56 q2 6 0 10"/>
              </g>
              <path d="M94 72 Q62 84 28 77" fill="none" stroke="#6f757f" stroke-width="7" stroke-linecap="round"/>
              <circle cx="28" cy="64" r="12" fill="#9aa1ae" stroke="var(--botink)" stroke-width="2.6"/>
              <path d="M19 57 L22 45 L31 53 Z" fill="#9aa1ae" stroke="var(--botink)" stroke-width="2.2" stroke-linejoin="round"/>
              <path class="eyes-shut" d="M21 64 Q25 66.5 29 64" fill="none" stroke="var(--botink)" stroke-width="2" stroke-linecap="round"/>
              <path d="M18 73 Q28 78 38 74" fill="none" stroke="#b97f24" stroke-width="4" stroke-linecap="round"/>
              <circle cx="30" cy="76" r="3" fill="var(--gold)" stroke="var(--botink)" stroke-width="1.6"/>
            </g>
          </svg>
        </div>
        <div class="scratch" id="scratch" hidden aria-hidden="true">
          <svg viewBox="0 0 34 30" width="34" height="30">
            <g fill="none" stroke="#c0392b" stroke-width="2.6" stroke-linecap="round">
              <path d="M6 4 Q12 14 8 26"/><path d="M16 2 Q22 13 18 27"/><path d="M26 4 Q31 14 28 25"/>
            </g>
          </svg>
        </div>
      </div>
      <div class="bowl" id="bowl" hidden aria-hidden="true">
        <svg viewBox="0 0 54 26" width="54" height="26">
          <g fill="#7a5230"><circle cx="16" cy="8" r="3.4"/><circle cx="27" cy="6.5" r="3.8"/><circle cx="38" cy="8" r="3.4"/></g>
          <path d="M3 9 h48 l-6 13 a4 4 0 0 1 -4 3 H13 a4 4 0 0 1 -4 -3 Z" fill="#b97f24" stroke="var(--botink)" stroke-width="2.6" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="kibble" id="kibble" hidden aria-hidden="true">
        <svg viewBox="0 0 30 16" width="30" height="16">
          <g fill="#8a5a2b" stroke="#6e4520" stroke-width="1.4">
            <circle cx="7" cy="9" r="4.4"/><circle cx="16" cy="6.5" r="4.8"/><circle cx="24" cy="10" r="4.2"/>
          </g>
        </svg>
      </div>
    </div>

    <!-- Panneau des questions fréquentes -->
    <div class="qa" id="qa" hidden>
      <div class="qa-head">
        <span>Pose-moi une question !</span>
        <button type="button" id="qa-close" aria-label="Fermer les questions">✕</button>
      </div>
      <div class="qa-suggestion" id="qa-suggestion" hidden></div>
      <div class="qa-chips" id="qa-chips"></div>
      <div class="qa-stamps" aria-label="Les approbations officielles de Sir H. Gepeto">
        <div class="qa-stamps-title">Mes approbations officielles</div>
        <div class="stampcard">
          <div class="hstamp">Approuvé<br>par Sir H. Gepeto</div>
          <div class="sv"><b>Montgolfière</b> — « C'est MON jeu. Je monte, je zigzague entre les mouettes, je pogne les anneaux dorés — et oui, des fois je me trompe de bord et je ris de moi. Viens jouer une manche contre moi ! »<br>
          <button type="button" id="stamp-mg">Jouer avec Sir H. Gepeto</button></div>
        </div>
        <div class="stampcard">
          <div class="hstamp">Approuvé<br>par Sir H. Gepeto</div>
          <div class="sv"><b>Trio élément</b> — « Trois éléments, des duels rapides, zéro triche : ça se joue en riant et ça se perd sans chigner. Tamponné avec fierté, parole de boulon. »<br>
          <a href="https://hp-outils.com/jeux" target="_blank" rel="noopener">Le voir parmi les jeux</a></div>
        </div>
      </div>
      <form class="qa-form" id="qa-form">
        <input type="text" id="qa-input" maxlength="140" autocomplete="off"
               placeholder="Ou écris ta question ici…" aria-label="Écris ta question à Sir H. Gepeto">
        <button type="submit">Demander</button>
      </form>
      <div class="qa-actions">
        <button type="button" id="qa-tour">Fais-moi visiter</button>
        <button type="button" id="qa-photo">Photo souvenir</button>
        <button type="button" id="qa-read">Lis-moi ça</button>
        <button type="button" id="qa-voice" aria-pressed="true">Voix : oui</button>
        <button type="button" id="qa-helium" aria-pressed="true">Hélium : oui</button>
      </div>
      <div class="qa-hugo" id="qa-hugo" hidden>
        <div class="qa-hugo-title">Pour HP — questions sans réponse, à valider :</div>
        <ul id="qa-hugo-list"></ul>
      </div>
      <button type="button" id="qa-play" class="qa-play">Sir H. Gepeto, joue avec moi !</button>
      <button type="button" id="qa-2h" class="qa-preview">Prévisualiser la scène des 2 heures</button>
      <button type="button" id="qa-barbouille" class="qa-preview">Prévisualiser le barbouillage de la photo</button>
      <button type="button" id="qa-sauts" class="qa-preview">Pixel : prévisualiser les sauts de blocs</button>
    </div>

    <!-- ===== Le jeu caché : Serpents et échelles ===== -->
    <div class="game" id="game" hidden>
      <div class="game-top">
        <div class="game-title">Serpents et échelles — contre Sir H. Gepeto</div>
        <button type="button" id="game-quit">Revenir au site</button>
      </div>
      <div class="board-wrap" id="board-wrap">
        <div class="board" id="board"></div>
        <svg class="board-art" id="board-art" viewBox="0 0 800 800" aria-hidden="true"></svg>
        <div class="pawn pawn-you" id="pawn-you"><i>TOI</i></div>
        <div class="pawn pawn-bot" id="pawn-bot"></div>
        <div class="confetti" id="confetti"></div>
      </div>
      <div class="game-bar">
        <div class="die" id="die" aria-live="polite">–</div>
        <div class="game-status" id="game-status">À toi de lancer !</div>
        <button type="button" id="game-roll">Lancer le dé</button>
      </div>
      <div class="gcard" id="game-card" hidden>
        <h2 id="card-title">Partie terminée !</h2>
        <p id="card-line"></p>
        <div class="card-mini" id="card-mini" aria-hidden="true"></div>
        <p id="card-stats"></p>
        <div class="card-share" id="card-share"></div>
        <div class="card-btns">
          <button type="button" id="card-copy">Copier le texte de partage</button>
          <button type="button" id="card-photo">Photo souvenir</button>
          <button type="button" id="card-close">Revenir au site</button>
        </div>
        <p class="card-note" id="card-copied" hidden>Copié ! Tu peux le coller où tu veux.</p>
      </div>
    </div>

    <div class="game mgame" id="mg" hidden>
      <div class="game-top">
        <div class="game-title">Montgolfière — toi contre Sir H. Gepeto</div>
        <button type="button" id="mg-quit">Quitter la manche</button>
      </div>
      <div class="mg-wrap" id="mg-wrap">
        <canvas id="mg-canvas"></canvas>
        <div class="mg-toast" id="mg-toast" role="status"></div>
        <div class="mg-hud">
          <span id="mg-alt">Altitude : 0 m</span>
          <span id="mg-rings">Anneaux — Toi 0 · Sir H. Gepeto 0</span>
          <span id="mg-score">Manches — Toi 0 · Sir H. Gepeto 0</span>
        </div>
      </div>
      <p class="mg-help">Glisse ton doigt ou ta souris sur le ciel (ou les flèches ← →) pour piloter TON ballon. Sir H. Gepeto pilote le sien tout seul, selon ses règles — et des fois, il se trompe. Premier ballon qui pète perd la manche !</p>
      <div class="gcard" id="mg-card" hidden>
        <h2 id="mg-card-title">Manche terminée !</h2>
        <p id="mg-card-line"></p>
        <p id="mg-card-stats"></p>
        <div class="card-share" id="mg-card-share"></div>
        <div class="card-btns">
          <button type="button" id="mg-card-copy">Copier le texte de partage</button>
          <button type="button" id="mg-card-again">Revanche !</button>
          <button type="button" id="mg-card-close">Revenir au site</button>
        </div>
        <p class="card-note" id="mg-card-copied" hidden>Copié ! Tu peux le coller où tu veux.</p>
      </div>
    </div>

    <!-- Carte postale souvenir (pose du moment, date, marque) -->
    <div class="gcard scard" id="souvenir" hidden>
      <h2>Photo souvenir !</h2>
      <div class="scard-bot" id="scard-bot" aria-hidden="true"></div>
      <p class="scard-meta" id="scard-meta"></p>
      <p id="scard-line"></p>
      <div class="card-share" id="scard-share"></div>
      <div class="card-btns">
        <button type="button" id="scard-copy">Copier le texte</button>
        <button type="button" id="scard-close">Fermer</button>
      </div>
      <p class="card-note" id="scard-copied" hidden>Copié ! Tu peux le coller où tu veux.</p>
    </div>

    <div class="bot-controls" id="bot-controls" role="group" aria-label="Contrôles de la mascotte">
      <button type="button" id="btn-dock" aria-label="Ouvrir les contrôles de Sir H. Gepeto" aria-expanded="false">•••</button>
      <button type="button" id="btn-games" aria-label="Aller aux jeux">Jeux</button>
      <button type="button" id="btn-ask">Une question ?</button>
      <button type="button" id="btn-read">Lis-moi ça</button>
      <button type="button" id="btn-accompany" aria-pressed="false">Accompagne-moi</button>
      <button type="button" id="btn-tickle">Chatouiller</button>
      <button type="button" id="btn-bucket">Seau d'eau</button>
      <button type="button" id="btn-kibble">Croquette</button>
      <button type="button" id="btn-fleur">Une fleur</button>
      <button type="button" id="btn-pixel-jeu">Joue avec Pixel</button>
      <button type="button" id="btn-bataille">Une Bataille ?</button>
      <button type="button" id="btn-calm" aria-pressed="false">Mode calme</button>
      <button type="button" id="btn-pause" aria-pressed="false">Pause</button>
      <button type="button" id="btn-reduire" aria-label="Réduire Sir H. Gepeto en pastille">Réduire</button>
      <button type="button" id="btn-zoom-moins" aria-label="Sir H. Gepeto plus petit">Petit</button>
      <button type="button" id="btn-zoom-plus" aria-label="Sir H. Gepeto plus grand">Grand</button>
      <button type="button" id="btn-sound" aria-pressed="true">Son : fort</button>
      <select id="sel-mood" aria-label="Mode de Sir H. Gepeto — choisis comment je me comporte">
        <option value="defaut">Mode : comme d'habitude</option>
        <option value="vendeur">Vendeur pro actif</option>
        <option value="ami">Ami</option>
        <option value="grognon">Grognon drôle</option>
      </select>
      <select id="sel-weather" aria-label="Météo — aperçu des tenues de Sir H. Gepeto">
        <option value="auto">Météo : auto</option>
        <option value="froid">Froid</option>
        <option value="doux">Doux</option>
        <option value="chaud">Chaud</option>
        <option value="pluie">Pluie</option>
      </select>
      <button type="button" id="btn-hide">Fermer Sir H. Gepeto</button>
    </div>
`;
