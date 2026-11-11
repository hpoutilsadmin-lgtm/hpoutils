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
           aria-label="Sir H. Gepeto, le gérant du site HP Outils. Touchez-le pour le chatouiller, glissez-le pour le déplacer.">
        <div class="bubble" id="bubble" aria-live="polite"></div>        <div class="zzz" aria-hidden="true"><span>Z</span><span>Z</span><span>Z</span></div>
        <div class="burst" id="burst" aria-hidden="true"></div>
        <div class="bot-inner">
          <img class="bot-img" src="/hgpto/gepeto/normal.png" alt="Sir H. Gepeto" draggable="false">
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
        <div class="pixel-scene" id="pixel-scene"><div class="pixel-jump"><div class="pixel-flip">
        <img id="c-queue" src="/hgpto/pixel/c-queue.png" alt="queue" style="position:absolute;left:198px;top:171px;width:113px;height:150px;" draggable="false">
        <img id="c-patte-arr" src="/hgpto/pixel/c-patte-arr.png" alt="patte-arr" style="position:absolute;left:176px;top:243px;width:80px;height:111px;" draggable="false">
        <img id="c-torse" src="/hgpto/pixel/c-torse.png" alt="torse" style="position:absolute;left:48px;top:171px;width:214px;height:129px;" draggable="false">
        <img id="c-patte-av-g" src="/hgpto/pixel/c-patte-av-g.png" alt="patte-av-g" style="position:absolute;left:16px;top:221px;width:96px;height:129px;" draggable="false">
        <img id="c-patte-av-d" src="/hgpto/pixel/c-patte-av-d.png" alt="patte-av-d" style="position:absolute;left:96px;top:232px;width:90px;height:121px;" draggable="false">
        <div id="tete-wrap" style="position:absolute;left:26px;top:5px;width:269px;height:195px">
        <img id="c-tete" src="/hgpto/pixel/c-tete.png" alt="tete" style="position:absolute;left:0;bottom:-10px;width:100%;height:100%" draggable="false">
        <img id="oreille-g" src="/hgpto/pixel/oreille-g.png" alt="oreille gauche" style="position:absolute;left:16.1%;top:8.6%;width:23.5%;height:27.1%" draggable="false">
        <img id="oreille-d" src="/hgpto/pixel/oreille-d.png" alt="oreille droite" style="position:absolute;left:56.6%;top:23.3%;width:21.4%;height:17.1%" draggable="false">
        <img id="oeil-cyan" src="/hgpto/pixel/oeil-cyan.png" alt="oeil cyan" style="position:absolute;left:47.6%;top:46.6%;width:28.6%;height:42%" draggable="false">
        <img id="oeil-rouge" data-src="/hgpto/pixel/oeil-rouge.png" alt="oeil rouge" style="position:absolute;left:47.6%;top:46.6%;width:28.6%;height:42%;display:none" draggable="false">
        <img id="c-tete-grognon" data-src="/hgpto/pixel/c-tete-grognon.png" alt="tete grognon" style="position:absolute;left:0;bottom:0;width:100%;display:none" draggable="false">
        <img id="c-tete-fiche-heureux" data-src="/hgpto/pixel/c-tete-fiche-heureux.png" alt="tete fiche heureux" style="position:absolute;left:42px;bottom:-20px;width:170px;display:none" draggable="false">
        <img id="c-tete-fiche-curieux" data-src="/hgpto/pixel/c-tete-fiche-curieux.png" alt="tete fiche curieux" style="position:absolute;left:49px;bottom:-14px;width:170px;display:none" draggable="false">
        <img id="c-tete-fiche-surpris" data-src="/hgpto/pixel/c-tete-fiche-surpris.png" alt="tete fiche surpris" style="position:absolute;left:56px;bottom:-11px;width:170px;display:none" draggable="false">
        </div>
        <!-- Clochette de Noël (lot Décor de Noël, 10 nov. 2026) : placée APRES tete-wrap, pas après c-torse — sinon la tête (peinte après, menton opaque) la cacherait au cou. Position au cou, à vérifier au doigt ; si elle flotte, on la retire. -->
        <img id="c-clochette" src="/hgpto/pixel/clochette-noel.png" alt="clochette de Noël" style="position:absolute;left:143px;top:178px;width:24px;height:24px;" draggable="false">
        <img id="queue-grognon" data-src="/hgpto/pixel/queue-grognon.png" alt="queue grognon" style="position:absolute;left:213px;top:156px;width:105px;display:none" draggable="false">
        <img id="panneaux" data-src="/hgpto/pixel/panneaux.png" alt="panneaux" style="position:absolute;right:-10px;top:-10px;width:130px;display:none" draggable="false">
</div></div><span id="pixel-zzz" class="pixel-zzz" aria-hidden="true" style="position:absolute;top:2px;right:12px;display:none">Zzz</span></div>
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
        <span>Sir H. Gepeto, gérant du site<br>Pose-moi une question !</span>
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
      <button type="button" id="btn-ask">Une question ?</button>
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
      <select id="sel-mood" aria-label="Mode de Sir H. Gepeto — choisissez comment je me comporte">
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
