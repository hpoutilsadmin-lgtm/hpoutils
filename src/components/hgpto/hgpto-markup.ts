/* HGPTO — structure HTML de la surcouche (robot, Pixel, bulles, dock,
   panneau Questions, carte souvenir, jeu caché), portée telle quelle du
   prototype validé. Injectée côté client par Hgpto.tsx. */
export const HGPTO_MARKUP = `
<div id="decor" aria-hidden="true"></div>
    <div class="bot-layer" id="botlayer">
      <div class="graffiti" id="graffiti" hidden aria-hidden="true">
        <svg viewBox="0 0 210 92" width="210" height="92">
          <path d="M34 26 C34 14 52 12 58 24 C64 12 82 14 82 26 C82 40 58 52 58 52 C58 52 34 40 34 26 Z" fill="none" stroke="#b97f24" stroke-width="4" stroke-linejoin="round" opacity=".85"/>
          <path d="M102 14 l3 7.5 7.5 3 -7.5 3 -3 7.5 -3 -7.5 -7.5 -3 7.5 -3 z" fill="none" stroke="#b97f24" stroke-width="3.4" stroke-linejoin="round"/>
          <text x="14" y="78" font-family="Georgia,serif" font-size="17" font-style="italic" font-weight="700" fill="#2b2118" opacity=".78">HGPTO était là !</text>
        </svg>
      </div>
      <div class="bot" id="bot" data-state="idle" data-expr="happy" role="button" tabindex="0"
           aria-label="HGPTO, la mascotte d'HP Outils. Touchez-le pour le chatouiller, glissez-le pour le déplacer.">
        <div class="bubble" id="bubble" aria-live="polite"></div>        <div class="zzz" aria-hidden="true"><span>Z</span><span>Z</span><span>Z</span></div>
        <div class="burst" id="burst" aria-hidden="true"></div>
        <div class="bot-inner">
          <svg class="bot-svg" viewBox="0 0 220 212" aria-hidden="true">
            <defs>
              <pattern id="stub" width="3.4" height="3.4" patternUnits="userSpaceOnUse">
                <circle cx="0.9" cy="0.9" r="0.7" fill="#444851"/><circle cx="2.5" cy="2.3" r="0.7" fill="#c3c7ce"/><circle cx="2.4" cy="0.7" r="0.5" fill="#8a8f99"/>
              </pattern>
              <pattern id="plaid" width="18" height="18" patternUnits="userSpaceOnUse">
                <rect width="18" height="18" fill="#8e2f26"/><rect width="9" height="18" fill="rgba(0,0,0,.35)"/><rect width="18" height="9" fill="rgba(0,0,0,.35)"/><rect y="8" width="18" height="2" fill="rgba(255,240,200,.5)"/><rect x="8" width="2" height="18" fill="rgba(255,240,200,.5)"/>
              </pattern>
              <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f1f3f6"/><stop offset="1" stop-color="#a9b0bc"/></linearGradient>
            </defs>

            <!-- ombre -->
            <ellipse class="shadow-el" cx="110" cy="205" rx="54" ry="6" fill="rgba(43,33,24,.22)"/>

            <!-- jambes qui marchent -->
            <g class="leg leg-l"><rect x="88" y="172" width="15" height="24" rx="5" fill="#4a5671" stroke="var(--botink)" stroke-width="3"/><ellipse cx="93" cy="198" rx="11" ry="5" fill="#2f3850" stroke="var(--botink)" stroke-width="2.6"/></g>
            <g class="leg leg-r"><rect x="117" y="172" width="15" height="24" rx="5" fill="#4a5671" stroke="var(--botink)" stroke-width="3"/><ellipse cx="127" cy="198" rx="11" ry="5" fill="#2f3850" stroke="var(--botink)" stroke-width="2.6"/></g>
            <!-- minuscule skateboard -->
            <g class="skateboard">
              <rect x="54" y="196" width="112" height="7" rx="3.5" fill="#b97f24" stroke="var(--botink)" stroke-width="3"/>
              <circle cx="74" cy="207" r="4.5" fill="var(--botink)"/>
              <circle cx="146" cy="207" r="4.5" fill="var(--botink)"/>
            </g>

            <!-- bras gauche (+ mouchoir, cuillère, pancarte) -->
            <g class="arm arm-l">
              <rect x="56" y="120" width="14" height="42" rx="7" fill="#2b4470" stroke="var(--botink)" stroke-width="3"/>
              <circle cx="63" cy="165" r="7" fill="#cfd3da" stroke="var(--botink)" stroke-width="2.8"/>
              <g class="hanky">
                <path d="M48 172 l15 -3 3 12 -15 3z" fill="#fffdf6" stroke="var(--botink)" stroke-width="2.4" stroke-linejoin="round"/>
                <path d="M52 174 l11 -2" stroke="#b9a888" stroke-width="2"/>
              </g>
              <g class="spoon">
                <line x1="61" y1="170" x2="54" y2="182" stroke="var(--botink)" stroke-width="4" stroke-linecap="round"/>
                <ellipse cx="52" cy="185" rx="4.5" ry="6" transform="rotate(18 52 185)" fill="#c9c9c9" stroke="var(--botink)" stroke-width="2.6"/>
              </g>
              <g class="sign">
                <line x1="60" y1="158" x2="50" y2="118" stroke="var(--botink)" stroke-width="4" stroke-linecap="round"/>
                <rect x="0" y="84" width="94" height="32" rx="6" fill="#fffaf0" stroke="var(--botink)" stroke-width="3.5"/>
                <text id="signText" x="47" y="104.5" text-anchor="middle"
                      font-family="Georgia,serif" font-size="11.5" font-weight="700" fill="#2b2118">PAR ICI →</text>
              </g>
            </g>
            <!-- bras droit (+ outil, linge, canette) -->
            <g class="arm arm-r">
              <rect x="150" y="120" width="14" height="42" rx="7" fill="#2b4470" stroke="var(--botink)" stroke-width="3"/>
              <circle cx="157" cy="165" r="7" fill="#cfd3da" stroke="var(--botink)" stroke-width="2.8"/>
              <g class="tool">
                <path d="M166 142 l4 14 -5 3 -4 -13 z" fill="#c9c9c9" stroke="var(--botink)" stroke-width="2.8" stroke-linejoin="round"/>
                <circle cx="167" cy="138" r="6" fill="none" stroke="var(--botink)" stroke-width="3.2"/>
              </g>
              <g class="cloth">
                <path d="M160 148 q12 -8 19 1 q-1 13 -11 16 q-10 -3 -8 -17z" fill="#fffdf6" stroke="var(--botink)" stroke-width="3" stroke-linejoin="round"/>
              </g>
              <g class="spraycan">
                <rect x="161" y="140" width="13" height="19" rx="3" fill="#b97f24" stroke="var(--botink)" stroke-width="3"/>
                <rect x="164" y="134" width="7" height="6" rx="1.5" fill="#c9c9c9" stroke="var(--botink)" stroke-width="2.4"/>
                <rect x="161" y="148" width="13" height="4" fill="#fdf3da" opacity=".85"/>
              </g>
            </g>

            <!-- cou + torse : CHANDAIL québécois (ajout du propriétaire, 22 oct.)
                 porté par-dessus le torse — bleu, fleur de lys blanche à la
                 poitrine (rendu original, un seul lys, tracé simple et propre),
                 et la LED vit à l'encolure. Il remplace l'ancien écran-ventre. -->
            <rect x="98" y="94" width="24" height="24" fill="#7d869a" stroke="var(--botink)" stroke-width="3.2"/>
            <rect x="70" y="114" width="80" height="62" rx="12" fill="#31517f" stroke="var(--botink)" stroke-width="4.5"/>
            <!-- encolure ronde crème + LED d'humeur -->
            <path d="M90 114 Q110 129 130 114 L130 123 Q110 137 90 123 Z" fill="#fdf6e3" stroke="var(--botink)" stroke-width="3" stroke-linejoin="round"/>
            <circle class="led" cx="110" cy="121" r="3.4" fill="#6ee7a8" stroke="var(--botink)" stroke-width="1.4"/>
            <!-- fleur de lys : pétale central, deux pétales latéraux, bandeau, base -->
            <g fill="#fdf6e3" stroke="var(--botink)" stroke-width="2.1" stroke-linejoin="round">
              <path d="M110 130 C105.5 137 104.5 143 110 150 C115.5 143 114.5 137 110 130 Z"/>
              <path d="M107.5 141 C99 135.5 92.5 139.5 94.5 147 C96 152.5 103 153 106 148.5 C107 146.5 107.5 143.5 107.5 141 Z"/>
              <path d="M112.5 141 C121 135.5 127.5 139.5 125.5 147 C124 152.5 117 153 114 148.5 C113 146.5 112.5 143.5 112.5 141 Z"/>
              <rect x="99" y="153.5" width="22" height="4.4" rx="2.2"/>
              <path d="M103.5 160.5 h13 l-2.6 6.5 h-7.8 Z"/>
            </g>
            <path d="M74 170.5 h72" stroke="#24405f" stroke-width="3" opacity=".5"/>
            <circle cx="80" cy="167" r="3" fill="var(--gold)" stroke="var(--botink)" stroke-width="1.8"/>
            <circle cx="140" cy="167" r="3" fill="var(--gold)" stroke="var(--botink)" stroke-width="1.8"/>

            <!-- tête de robot explorateur adulte, en métal -->
            <g class="head">
              <circle cx="55" cy="60" r="7.5" fill="#9aa1ae" stroke="var(--botink)" stroke-width="3"/>
              <circle cx="55" cy="60" r="2" fill="#6d7482"/>
              <circle cx="165" cy="60" r="7.5" fill="#9aa1ae" stroke="var(--botink)" stroke-width="3"/>
              <circle cx="165" cy="60" r="2" fill="#6d7482"/>
              <ellipse cx="110" cy="58" rx="53" ry="47" fill="url(#metal)" stroke="#3a3f4a" stroke-width="3"/>
              <!-- CHAUVE, cheveux rasés de 2 jours (retouche du propriétaire,
                   22 oct.) : crâne en métal poli qui brille, avec une ombre de
                   repousse en pointillé fin (même famille que la barbe, plus
                   courte et discrète) sur le dessus arrière et les côtés.
                   Aucun cheveu long, aucun toupet — et aucun chapeau. -->
              <path d="M59 48 Q57 12 110 10 Q163 12 161 48 Q154 25 110 23 Q66 25 59 48 Z" fill="url(#stub)" opacity=".5"/>
              <ellipse cx="61.5" cy="54" rx="4.6" ry="11" fill="url(#stub)" opacity=".42"/>
              <ellipse cx="158.5" cy="54" rx="4.6" ry="11" fill="url(#stub)" opacity=".42"/>
              <ellipse cx="82" cy="28" rx="15" ry="5.5" fill="#fff" opacity=".55" transform="rotate(-22 82 28)"/>
              <!-- barbe un peu plus longue (retouche du propriétaire, 22 oct.) :
                   de « six jours » vers une courte barbe fournie — menton plus
                   couvert, contour qui descend plus bas, moustache conservée
                   et reliée -->
              <path d="M57 60 Q56 107 110 114 Q164 107 163 60 Q147 84 110 84 Q73 84 57 60Z" fill="#5a5f68" opacity=".28"/>
              <path d="M57 60 Q56 107 110 114 Q164 107 163 60 Q147 84 110 84 Q73 84 57 60Z" fill="url(#stub)"/>
              <ellipse cx="110" cy="88" rx="21" ry="4.8" fill="#5a5f68" opacity=".4"/>
              <ellipse cx="110" cy="88" rx="21" ry="4.8" fill="url(#stub)"/>

              <!-- yeux vivants : blancs selon l'expression + pupilles qui suivent le pointeur -->
              <g class="eyes-all">
                <g class="expr expr-happy">
                  <ellipse cx="88" cy="60" rx="13" ry="11" fill="#fff" stroke="#6d7482" stroke-width="1.2"/>
                  <ellipse cx="132" cy="60" rx="13" ry="11" fill="#fff" stroke="#6d7482" stroke-width="1.2"/>
                </g>
                <g class="expr expr-laugh" fill="none" stroke="var(--botink)" stroke-width="5" stroke-linecap="round">
                  <path d="M74 61 Q88 47 102 61"/>
                  <path d="M118 61 Q132 47 146 61"/>
                </g>
                <g class="expr expr-sleep" fill="none" stroke="var(--botink)" stroke-width="4.5" stroke-linecap="round">
                  <path d="M75 59 Q88 65 101 59"/>
                  <path d="M119 59 Q132 65 145 59"/>
                </g>
                <g class="expr expr-focus">
                  <ellipse cx="88" cy="62" rx="12" ry="9" fill="#fff" stroke="#6d7482" stroke-width="1.2"/>
                  <ellipse cx="132" cy="62" rx="12" ry="9" fill="#fff" stroke="#6d7482" stroke-width="1.2"/>
                </g>
                <g class="expr expr-wide">
                  <circle cx="88" cy="60" r="15" fill="#fffdf6" stroke="#555c66" stroke-width="2.5"/>
                  <circle cx="132" cy="60" r="15" fill="#fffdf6" stroke="#555c66" stroke-width="2.5"/>
                </g>
                <g class="expr expr-angry">
                  <ellipse cx="88" cy="62" rx="12" ry="10" fill="#fff" stroke="#6d7482" stroke-width="1.2"/>
                  <ellipse cx="132" cy="62" rx="12" ry="10" fill="#fff" stroke="#6d7482" stroke-width="1.2"/>
                  <path d="M74 55 h28 M118 55 h28" stroke="#9aa3b0" stroke-width="6"/>
                </g>
                <g class="expr expr-sad">
                  <ellipse cx="88" cy="62" rx="12" ry="10.5" fill="#fff" stroke="#6d7482" stroke-width="1.2"/>
                  <ellipse cx="132" cy="62" rx="12" ry="10.5" fill="#fff" stroke="#6d7482" stroke-width="1.2"/>
                </g>
                <g id="pupils">
                  <circle cx="88" cy="61" r="5.5" fill="#20242c"/><circle cx="132" cy="61" r="5.5" fill="#20242c"/>
                  <circle cx="90" cy="58.5" r="1.7" fill="#fff"/><circle cx="134" cy="58.5" r="1.7" fill="#fff"/>
                </g>
              </g>
              <path d="M110 66 L107.5 78 Q110 81 113.5 78" fill="none" stroke="#7d8593" stroke-width="2.4" stroke-linecap="round"/>

              <!-- AUCUNE lunette de soleil — jamais (correction de la direction, 22 oct.).
                   Ses seuls verres : les lunettes de LECTURE, pour lire seulement. -->
              <!-- lunettes de lecture : SEULEMENT pendant la vignette lecture -->
              <g class="readglasses" fill="rgba(255,255,255,.10)" stroke="var(--botink)" stroke-width="4">
                <circle cx="88" cy="60" r="21"/>
                <circle cx="132" cy="60" r="21"/>
                <path d="M109 55 Q110 49.5 111 55" fill="none"/>
                <path d="M67 55 L57 50 M153 55 L163 50" fill="none" stroke-linecap="round"/>
                <path d="M79 51 l7 -7" stroke="#fffdf6" stroke-width="3" stroke-linecap="round" opacity=".75" fill="none"/>
              </g>

              <!-- bouches -->
              <path class="mouthv mouth-smile" d="M92 90 Q110 104 128 89" fill="none" stroke="var(--botink)" stroke-width="4.5" stroke-linecap="round"/>
              <g class="mouthv mouth-laugh">
                <path d="M90 88 Q110 112 130 88 Q110 99 90 88z" fill="var(--botink)"/>
                <path d="M100 102 Q110 108 120 102" fill="#e2795b"/>
              </g>
              <circle class="mouthv mouth-o" cx="110" cy="95" r="5" fill="none" stroke="var(--botink)" stroke-width="3.6"/>
              <ellipse class="mouthv mouth-yawn" cx="110" cy="96" rx="7" ry="10" fill="var(--botink)"/>
              <path class="mouthv mouth-flat" d="M99 95 h22" stroke="var(--botink)" stroke-width="4.5" stroke-linecap="round"/>
              <path class="mouthv mouth-grumble" d="M96.5 97 q4.5 -5 9 0 q4.5 5 9 0 q4.5 -5 9 0" fill="none" stroke="var(--botink)" stroke-width="4" stroke-linecap="round"/>
              <path class="mouthv mouth-sad" d="M99 101 Q110 92 121 101" fill="none" stroke="var(--botink)" stroke-width="4" stroke-linecap="round"/>

              <!-- GROS SOURCILS NOIRS ÉBOURIFFÉS, encore plus velus/poilus
                   (directives de la direction, 22 oct.) : épais, broussailleux, poils
                   rebelles — ce sont EUX qui portent les émotions -->
              <g fill="none" stroke="#1d1710" stroke-width="15.5" stroke-linecap="round">
                <g class="browv brow-happy">
                  <path d="M63 38 Q86 26 107 36"/>
                  <path d="M113 36 Q134 26 157 38"/>
                </g>
                <g class="browv brow-laugh">
                  <path d="M63 30 Q86 15 107 28"/>
                  <path d="M113 28 Q134 15 157 30"/>
                </g>
                <g class="browv brow-sleep">
                  <path d="M65 44 Q87 50 105 42"/>
                  <path d="M115 42 Q133 50 155 44"/>
                </g>
                <g class="browv brow-focus">
                  <path d="M66 33 L106 45"/>
                  <path d="M154 33 L114 45"/>
                </g>
                <g class="browv brow-wide">
                  <path d="M65 26 Q87 14 107 24"/>
                  <path d="M113 24 Q133 14 155 26"/>
                </g>
                <g class="browv brow-angry">
                  <path d="M64 26 L108 46"/>
                  <path d="M156 26 L112 46"/>
                </g>
                <g class="browv brow-sad">
                  <path d="M63 42 Q85 32 107 27"/>
                  <path d="M113 27 Q135 32 157 42"/>
                </g>
              </g>
              <!-- les poils rebelles : ça dépasse de partout, comme il faut -->
              <g fill="none" stroke="#1d1710" stroke-width="3.9" stroke-linecap="round">
                <path d="M70 30 l-4 -7"/><path d="M84 23 l-1 -8"/><path d="M98 25 l4 -7"/>
                <path d="M63 36 l-7 -3"/><path d="M107 33 l7 -4"/>
                <path d="M122 23 l1 -8"/><path d="M136 25 l4 -7"/><path d="M150 30 l4 -7"/>
                <path d="M113 33 l-7 -4"/><path d="M157 36 l7 -3"/>
                <path d="M76 26 l-6 -6"/><path d="M91 22 l0 -8"/><path d="M104 28 l6 -6"/>
                <path d="M116 28 l-6 -6"/><path d="M129 22 l0 -8"/><path d="M144 26 l6 -6"/>
                <path d="M66 40 l-8 0"/><path d="M154 40 l8 0"/>
                <path d="M88 31 l-3 -6"/><path d="M132 31 l3 -6"/>
              </g>

              <!-- vapeur de colère aux oreilles -->
              <g class="angersteam" fill="#cfc4ae">
                <circle cx="44" cy="40" r="6"/><circle cx="36" cy="28" r="4.5"/>
                <circle cx="176" cy="40" r="6"/><circle cx="184" cy="28" r="4.5"/>
              </g>
              <!-- grosses larmes (brèves) -->
              <g class="tears" fill="#6ea8d8" stroke="var(--botink)" stroke-width="1.6">
                <path d="M76 74 q-6 10 0 14 q6 -4 0 -14z"/>
                <path d="M144 74 q-6 10 0 14 q6 -4 0 -14z"/>
              </g>
            </g>

            <!-- ZÉRO CHAPEAU (retouche du propriétaire, 22 oct., catégorique) :
                 ni bonnet de nuit (il dort tête nue), ni tuque (le foulard au
                 cou suffit pour le froid), ni casquette, ni béret de mime.
                 Tête nue, toujours — si le propriétaire veut les ramener,
                 il le dira. -->

            <!-- garde-robe : foulard (froid) et imper (pluie) -->
            <g class="scarf">
              <path d="M57 106 Q110 121 163 106 L163 120 Q110 135 57 120 Z" fill="var(--gold)" stroke="var(--botink)" stroke-width="3.6" stroke-linejoin="round"/>
              <path d="M138 118 l9 26 -14 3 -5 -25 Z" fill="var(--gold)" stroke="var(--botink)" stroke-width="3.4" stroke-linejoin="round"/>
            </g>
            <g class="raincoat">
              <path d="M69 112 h82 l8 66 h-98 Z" fill="var(--gold)" stroke="var(--botink)" stroke-width="3.6" stroke-linejoin="round" opacity=".97"/>
              <path d="M110 120 v50" stroke="var(--botink)" stroke-width="2.6"/>
              <circle cx="110" cy="132" r="2.2" fill="var(--botink)"/><circle cx="110" cy="146" r="2.2" fill="var(--botink)"/><circle cx="110" cy="160" r="2.2" fill="var(--botink)"/>
            </g>
            <!-- ceinture du lutteur (poses seulement !) -->
            <g class="belt">
              <rect x="66" y="154" width="88" height="14" rx="4" fill="var(--gold)" stroke="var(--botink)" stroke-width="3"/>
              <circle cx="110" cy="161" r="9.5" fill="var(--gold)" stroke="var(--botink)" stroke-width="3"/>
              <path d="M110 155 l1.9 3.8 3.8 1.9 -3.8 1.9 -1.9 3.8 -1.9 -3.8 -3.8 -1.9 3.8 -1.9z" fill="#b97f24"/>
            </g>

            <!-- DÉGUISEMENTS CONTEXTUELS (lot nº 2, 22 oct.) : un seul à la
                 fois (attribut data-costume posé par le moteur selon la page
                 et le calendrier des fêtes du Québec). Dessins 100 %
                 originaux ; la silhouette reste lisible : crâne chauve,
                 gros sourcils, barbe et fleur de lys ne sont jamais cachés. -->
            <!-- /en-cuisine/ : tablier + mitaines de four -->
            <g class="costume costume-apron">
              <path d="M93 110 Q110 124 127 110" fill="none" stroke="var(--botink)" stroke-width="3.4"/>
              <path d="M86 116 h48 l7 60 a8 8 0 0 1 -8 9 h-46 a8 8 0 0 1 -8 -9 z" fill="#fffdf6" stroke="var(--botink)" stroke-width="3.4" stroke-linejoin="round"/>
              <rect x="97" y="148" width="26" height="17" rx="3.5" fill="none" stroke="#b9a888" stroke-width="2.4"/>
              <circle cx="110" cy="133" r="5.5" fill="#c0392b"/><path d="M110 127.5 q1 -4 5 -4.5" fill="none" stroke="#2e6b34" stroke-width="2.2" stroke-linecap="round"/>
              <g fill="#b3392f" stroke="var(--botink)" stroke-width="3">
                <rect x="49" y="146" width="25" height="33" rx="11"/>
                <rect x="146" y="146" width="25" height="33" rx="11"/>
              </g>
              <g fill="#fffdf6" stroke="var(--botink)" stroke-width="2.4">
                <rect x="52" y="172" width="19" height="7" rx="3"/>
                <rect x="149" y="172" width="19" height="7" rx="3"/>
              </g>
            </g>
            <!-- /jeux : super-héros — cape bleue et masque doré ; l'emblème,
                 c'est la fleur de lys de son chandail, bien visible -->
            <g class="costume costume-hero">
              <path d="M72 106 C44 120 33 152 39 197 C45 206 59 203 63 190 C58 158 61 128 76 114 Z" fill="#24405f" stroke="var(--botink)" stroke-width="3.4" stroke-linejoin="round"/>
              <path d="M148 106 C176 120 187 152 181 197 C175 206 161 203 157 190 C162 158 159 128 144 114 Z" fill="#24405f" stroke="var(--botink)" stroke-width="3.4" stroke-linejoin="round"/>
              <path fill-rule="evenodd" fill="var(--gold)" stroke="var(--botink)" stroke-width="3"
                    d="M58 44 h104 a11 11 0 0 1 11 11 v12 a11 11 0 0 1 -11 11 h-104 a11 11 0 0 1 -11 -11 v-12 a11 11 0 0 1 11 -11 z
                       M75 60 a13 10.5 0 1 0 26 0 a13 10.5 0 1 0 -26 0
                       M119 60 a13 10.5 0 1 0 26 0 a13 10.5 0 1 0 -26 0"/>
            </g>
            <!-- /jeux : lutteur — bandeau de champion, bracelets, et la
                 ceinture (.belt) s'affiche aussi via le CSS du costume -->
            <g class="costume costume-wrestler">
              <rect x="55" y="3" width="110" height="18" rx="9" fill="#b3392f" stroke="var(--botink)" stroke-width="3.2"/>
              <path d="M110 5.5 l1.9 4.4 4.4 1.9 -4.4 1.9 -1.9 4.4 -1.9 -4.4 -4.4 -1.9 4.4 -1.9z" fill="#fffdf6"/>
              <g fill="#b3392f" stroke="var(--botink)" stroke-width="2.8">
                <rect x="54" y="136" width="17" height="13" rx="4.5"/>
                <rect x="149" y="136" width="17" height="13" rx="4.5"/>
              </g>
            </g>
            <!-- Halloween : cape noire + médaille citrouille sous le lys -->
            <g class="costume costume-halloween">
              <path d="M72 106 C44 120 33 152 39 197 C45 206 59 203 63 190 C58 158 61 128 76 114 Z" fill="#2b2118" stroke="var(--botink)" stroke-width="3.4" stroke-linejoin="round"/>
              <path d="M148 106 C176 120 187 152 181 197 C175 206 161 203 157 190 C162 158 159 128 144 114 Z" fill="#2b2118" stroke="var(--botink)" stroke-width="3.4" stroke-linejoin="round"/>
              <path d="M97 120 Q110 156 110 178 M123 120 Q110 156 110 178" fill="none" stroke="var(--botink)" stroke-width="1.8"/>
              <circle cx="110" cy="189" r="11.5" fill="#e07b2a" stroke="var(--botink)" stroke-width="2.8"/>
              <path d="M110 177.5 q1.5 -4 6 -4.5" fill="none" stroke="#2e6b34" stroke-width="2.4" stroke-linecap="round"/>
              <path d="M103.5 186 l3.5 -1 -1.5 3.5 z M116.5 186 l-3.5 -1 1.5 3.5 z" fill="var(--botink)"/>
              <path d="M103 194 l3 -2.5 3 2.5 3 -2.5 3 2.5 2 -2 -1 4.5 h-12 l-1 -4.5z" fill="var(--botink)"/>
            </g>
            <!-- Noël : foulard rouge + guirlande lumineuse sous le lys -->
            <g class="costume costume-noel">
              <path d="M57 106 Q110 121 163 106 L163 120 Q110 135 57 120 Z" fill="#b3392f" stroke="var(--botink)" stroke-width="3.6" stroke-linejoin="round"/>
              <path d="M138 118 l9 26 -14 3 -5 -25 Z" fill="#b3392f" stroke="var(--botink)" stroke-width="3.4" stroke-linejoin="round"/>
              <path d="M64 112 Q110 126 156 112 M141 124 l6 20" stroke="#fffdf6" stroke-width="2.2" fill="none" opacity=".8"/>
              <path d="M79 148 Q110 170 141 148" fill="none" stroke="#2e6b34" stroke-width="3"/>
              <g stroke="var(--botink)" stroke-width="1.6">
                <circle cx="85" cy="153" r="3.6" fill="#b3392f"/><circle cx="97" cy="159" r="3.6" fill="var(--gold)"/>
                <circle cx="110" cy="161" r="3.6" fill="#6ea8d8"/><circle cx="123" cy="159" r="3.6" fill="#e2795b"/>
                <circle cx="135" cy="153" r="3.6" fill="#b3392f"/>
              </g>
            </g>
            <!-- Saint-Jean (24 juin) : écharpe blanche aux bords bleus, lys bleu -->
            <g class="costume costume-stjean">
              <polygon points="83,114 98,114 141,178 126,178" fill="#fffdf6" stroke="var(--botink)" stroke-width="3" stroke-linejoin="round"/>
              <path d="M86 116 L129 176 M95 116 L138 176" stroke="#24405f" stroke-width="2.2"/>
              <g transform="translate(83.2,104.6) scale(0.28)" fill="#24405f">
                <path d="M110 130 C105.5 137 104.5 143 110 150 C115.5 143 114.5 137 110 130 Z"/>
                <path d="M107.5 141 C99 135.5 92.5 139.5 94.5 147 C96 152.5 103 153 106 148.5 C107 146.5 107.5 143.5 107.5 141 Z"/>
                <path d="M112.5 141 C121 135.5 127.5 139.5 125.5 147 C124 152.5 117 153 114 148.5 C113 146.5 112.5 143.5 112.5 141 Z"/>
                <rect x="99" y="153.5" width="22" height="4.4" rx="2.2"/>
                <path d="M103.5 160.5 h13 l-2.6 6.5 h-7.8 Z"/>
              </g>
            </g>
            <!-- Temps des sucres : chemise carreautée par-dessus, lys par-dessus -->
            <g class="costume costume-sucres">
              <rect x="70" y="114" width="80" height="62" rx="12" fill="url(#plaid)" opacity=".94"/>
              <path d="M90 114 Q110 129 130 114 L130 123 Q110 137 90 123 Z" fill="#fdf6e3" stroke="var(--botink)" stroke-width="3" stroke-linejoin="round"/>
              <g fill="#fdf6e3" stroke="var(--botink)" stroke-width="2.1" stroke-linejoin="round">
                <path d="M110 130 C105.5 137 104.5 143 110 150 C115.5 143 114.5 137 110 130 Z"/>
                <path d="M107.5 141 C99 135.5 92.5 139.5 94.5 147 C96 152.5 103 153 106 148.5 C107 146.5 107.5 143.5 107.5 141 Z"/>
                <path d="M112.5 141 C121 135.5 127.5 139.5 125.5 147 C124 152.5 117 153 114 148.5 C113 146.5 112.5 143.5 112.5 141 Z"/>
                <rect x="99" y="153.5" width="22" height="4.4" rx="2.2"/>
                <path d="M103.5 160.5 h13 l-2.6 6.5 h-7.8 Z"/>
              </g>
            </g>
            <!-- Rentrée (septembre) : sac à dos et crayon bien rangé -->
            <g class="costume costume-rentree">
              <g transform="rotate(22 45 104)">
                <rect x="42" y="92" width="6.5" height="24" fill="#f0c16d" stroke="var(--botink)" stroke-width="2"/>
                <path d="M42 92 h6.5 l-3.2 -7.5 z" fill="#f6d7a8" stroke="var(--botink)" stroke-width="1.8" stroke-linejoin="round"/>
              </g>
              <rect x="18" y="116" width="35" height="63" rx="12" fill="#b97f24" stroke="var(--botink)" stroke-width="3.4"/>
              <path d="M18 140 h35 v9 h-35 z" fill="#8a5f1a"/>
              <rect x="26" y="150" width="19" height="21" rx="4.5" fill="#d9a441" stroke="var(--botink)" stroke-width="2.6"/>
            </g>
            <!-- mur invisible du mime -->
            <g class="mimewall">
              <rect x="186" y="28" width="9" height="150" rx="4.5" fill="#ffffff" opacity=".4" stroke="var(--botink)" stroke-width="2" stroke-dasharray="5 5"/>
            </g>

            <!-- étincelles du bricolage -->
            <g class="sparks" fill="var(--gold)" stroke="var(--botink)" stroke-width="1.4">
              <path class="spark s1" d="M206 96 l2.2 5.2 5.2 2.2 -5.2 2.2 -2.2 5.2 -2.2 -5.2 -5.2 -2.2 5.2 -2.2 z"/>
              <path class="spark s2" d="M176 78 l1.7 4 4 1.7 -4 1.7 -1.7 4 -1.7 -4 -4 -1.7 4 -1.7 z"/>
              <path class="spark s3" d="M214 128 l1.5 3.6 3.6 1.5 -3.6 1.5 -1.5 3.6 -1.5 -3.6 -3.6 -1.5 3.6 -1.5 z"/>
            </g>
            <!-- nuage de peinture du graffiti -->
            <g class="spraydots" fill="#b97f24">
              <circle cx="184" cy="140" r="2.6"/><circle cx="193" cy="150" r="2"/><circle cx="180" cy="154" r="1.8"/>
              <circle cx="196" cy="132" r="1.7"/><circle cx="188" cy="162" r="2.2"/><circle cx="176" cy="132" r="1.5"/>
            </g>

            <!-- livre de lecture -->
            <g class="book">
              <path d="M110 133 C96 125 74 123 63 127 L63 161 C74 157 96 159 110 165 C124 159 146 157 157 161 L157 127 C146 123 124 125 110 133 Z"
                    fill="var(--gold)" stroke="var(--botink)" stroke-width="3.5" stroke-linejoin="round"/>
              <path d="M110 136 C97 129 77 127 67 130 L67 157 C77 154 97 155 110 161 C123 155 143 154 153 157 L153 130 C143 127 123 129 110 136 Z"
                    fill="#fffdf6"/>
              <path class="pageflip" d="M110 136 C123 129 143 127 153 130 L153 157 C143 154 123 155 110 161 Z" fill="#f3ead2"/>
              <g stroke="#b9a888" stroke-width="2" stroke-linecap="round">
                <path d="M73 137 h30 M73 144 h30 M73 151 h24"/>
                <path d="M117 137 h30 M117 144 h30 M117 151 h24"/>
              </g>
              <path d="M110 136 v25" stroke="var(--botink)" stroke-width="2.4"/>
              <g>
                <rect x="60" y="164" width="100" height="12.5" rx="3" fill="#fffaf0" stroke="var(--botink)" stroke-width="2.4"/>
                <text id="bookTitle" x="110" y="173.5" text-anchor="middle" font-family="Georgia,serif" font-size="8" font-style="italic" font-weight="700" fill="#2b2118">Horizon Québec</text>
              </g>
            </g>

            <!-- petit chaudron (cuisine) -->
            <g class="pot">
              <ellipse cx="32" cy="201" rx="26" ry="4.5" fill="rgba(43,33,24,.18)"/>
              <g class="steam" fill="none" stroke="#a89a80" stroke-width="3.2" stroke-linecap="round">
                <path d="M20 158 q-4 -7 0 -13 q4 -6 0 -11"/>
                <path d="M32 159 q-4 -7 0 -13 q4 -6 0 -11"/>
                <path d="M44 158 q-4 -7 0 -13 q4 -6 0 -11"/>
              </g>
              <path d="M9 170 h47 l-4.5 24 a6 6 0 0 1 -6 5 h-26 a6 6 0 0 1 -6 -5 z" fill="#3a2c1e" stroke="var(--botink)" stroke-width="3.5" stroke-linejoin="round"/>
              <rect x="5.5" y="163" width="54" height="8.5" rx="4" fill="var(--gold)" stroke="var(--botink)" stroke-width="3"/>
              <circle cx="32" cy="184" r="3.4" fill="var(--gold)"/>
            </g>
            <!-- gros nuage de fumée (cuisine ratée) -->
            <g class="smoke" fill="#8d8578">
              <circle cx="18" cy="118" r="10" opacity=".75"/>
              <circle cx="34" cy="106" r="14" opacity=".85"/>
              <circle cx="50" cy="118" r="9" opacity=".7"/>
            </g>

            <!-- gouttelettes après le seau d'eau -->
            <g class="drops" fill="#6ea8d8" stroke="var(--botink)" stroke-width="1.6">
              <path d="M84 98 q-5 8 0 11 q5 -3 0 -11z"/>
              <path d="M140 94 q-5 8 0 11 q5 -3 0 -11z"/>
              <path d="M64 58 q-5 8 0 11 q5 -3 0 -11z"/>
              <path d="M158 70 q-5 8 0 11 q5 -3 0 -11z"/>
              <path d="M104 124 q-5 8 0 11 q5 -3 0 -11z"/>
            </g>

            <!-- garde-robe : parapluie et pluie -->
            <g class="rain" stroke="#6ea8d8" stroke-width="2.6" stroke-linecap="round">
              <line x1="18" y1="60" x2="15" y2="74"/><line x1="52" y1="44" x2="49" y2="58"/>
              <line x1="196" y1="52" x2="193" y2="66"/><line x1="206" y1="88" x2="203" y2="102"/>
              <line x1="8" y1="104" x2="5" y2="118"/><line x1="168" y1="36" x2="165" y2="50"/>
            </g>
            <!-- parapluie relevé (retouche 22 oct.) : le dôme flotte nettement
                 AU-DESSUS de la tête, hampe visible — jamais posé comme un
                 chapeau (zéro chapeau, partout, même sous la pluie) -->
            <g class="umbrella" transform="translate(0,-16)">
              <path d="M110 2 v52 q0 12 12 12 q10 0 10 -9" fill="none" stroke="var(--botink)" stroke-width="4" stroke-linecap="round"/>
              <path d="M26 34 Q110 -24 194 34 Q170 18 147 33 Q124 17 110 31 Q93 16 71 32 Q48 18 26 34 Z"
                    fill="#b97f24" stroke="var(--botink)" stroke-width="4" stroke-linejoin="round"/>
              <circle cx="110" cy="-14" r="4" fill="var(--gold)" stroke="var(--botink)" stroke-width="2.6"/>
            </g>
            <!-- étoiles de la chute (tapotage rapide) -->
            <g class="stars" fill="var(--gold)" stroke="var(--botink)" stroke-width="1.6">
              <path d="M40 8 l2.2 4.8 4.8 2.2 -4.8 2.2 -2.2 4.8 -2.2 -4.8 -4.8 -2.2 4.8 -2.2z"/>
              <path d="M178 2 l1.8 4 4 1.8 -4 1.8 -1.8 4 -1.8 -4 -4 -1.8 4 -1.8z"/>
              <path d="M196 34 l1.5 3.4 3.4 1.5 -3.4 1.5 -1.5 3.4 -1.5 -3.4 -3.4 -1.5 3.4 -1.5z"/>
            </g>
            <!-- le doigt discret… (décrottage de nez, quand il se croit seul) -->
            <g class="nosefinger">
              <rect x="111" y="62" width="7.5" height="17" rx="3.75" transform="rotate(36 115 70)" fill="#cfd3da" stroke="var(--botink)" stroke-width="2.4"/>
            </g>
            <!-- plumeau du gérant (posé près de sa main levée) -->
            <g class="duster">
              <line x1="190" y1="134" x2="198" y2="112" stroke="var(--botink)" stroke-width="4" stroke-linecap="round"/>
              <g fill="#e8dfc8" stroke="var(--botink)" stroke-width="2">
                <ellipse cx="201" cy="100" rx="6" ry="11" transform="rotate(18 201 100)"/>
                <ellipse cx="210" cy="104" rx="5" ry="9" transform="rotate(42 210 104)"/>
                <ellipse cx="193" cy="96" rx="5" ry="9" transform="rotate(-8 193 96)"/>
              </g>
            </g>
            <!-- balai du gérant -->
            <g class="broom">
              <line x1="60" y1="156" x2="40" y2="190" stroke="#8a6a3a" stroke-width="5" stroke-linecap="round"/>
              <path d="M40 188 L24 206 Q40 212 56 206 Z" fill="#d9b45c" stroke="var(--botink)" stroke-width="2.6" stroke-linejoin="round"/>
            </g>
            <!-- la balloune (gag hélium) : il la tient à la main droite quand
                 elle est là ; la toucher, c'est risquer la voix d'écureuil -->
            <g class="pballoon">
              <path d="M161 163 Q176 140 186 112" fill="none" stroke="var(--botink)" stroke-width="2.2" stroke-dasharray="4 3"/>
              <g class="balloon-body">
                <ellipse cx="190" cy="82" rx="25" ry="30" fill="#e2543e" stroke="var(--botink)" stroke-width="3.2"/>
                <ellipse cx="181" cy="70" rx="7.5" ry="11" fill="#fff" opacity=".45" transform="rotate(-18 181 70)"/>
                <path d="M186 111 h8 l-4 6 z" fill="#b97f24" stroke="var(--botink)" stroke-width="2.2" stroke-linejoin="round"/>
              </g>
              <circle class="hit" id="balloon-hit" cx="190" cy="82" r="38" fill="rgba(0,0,0,0)"/>
            </g>
          </svg>
        </div>
      </div>
      <!-- PIXEL, la chatte d'HGPTO : elle vit ici, au chaud -->
      <div class="cat" id="cat" data-state="sleep" role="button" tabindex="0"
           aria-label="Pixel, la chatte d'HGPTO. Touchez-la doucement pour la flatter.">
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
      <div class="qa-stamps" aria-label="Les approbations officielles d'HGPTO">
        <div class="qa-stamps-title">Mes approbations officielles</div>
        <div class="stampcard">
          <div class="hstamp">Approuvé<br>par HGPTO</div>
          <div class="sv"><b>Montgolfière</b> — « C'est MON jeu. Je monte, je zigzague entre les mouettes, je pogne les anneaux dorés — et oui, des fois je me trompe de bord et je ris de moi. Viens jouer une manche contre moi ! »<br>
          <button type="button" id="stamp-mg">Jouer avec HGPTO</button></div>
        </div>
        <div class="stampcard">
          <div class="hstamp">Approuvé<br>par HGPTO</div>
          <div class="sv"><b>Trio élément</b> — « Trois éléments, des duels rapides, zéro triche : ça se joue en riant et ça se perd sans chigner. Tamponné avec fierté, parole de boulon. »<br>
          <a href="https://hp-outils.com/jeux" target="_blank" rel="noopener">Le voir parmi les jeux</a></div>
        </div>
      </div>
      <form class="qa-form" id="qa-form">
        <input type="text" id="qa-input" maxlength="140" autocomplete="off"
               placeholder="Ou écris ta question ici…" aria-label="Écris ta question à HGPTO">
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
      <button type="button" id="qa-play" class="qa-play">HGPTO, joue avec moi !</button>
      <button type="button" id="qa-2h" class="qa-preview">Prévisualiser la scène des 2 heures</button>
      <button type="button" id="qa-barbouille" class="qa-preview">Prévisualiser le barbouillage de la photo</button>
      <button type="button" id="qa-sauts" class="qa-preview">Pixel : prévisualiser les sauts de blocs</button>
    </div>

    <!-- ===== Le jeu caché : Serpents et échelles ===== -->
    <div class="game" id="game" hidden>
      <div class="game-top">
        <div class="game-title">Serpents et échelles — contre HGPTO</div>
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
        <div class="game-title">Montgolfière — toi contre HGPTO</div>
        <button type="button" id="mg-quit">Quitter la manche</button>
      </div>
      <div class="mg-wrap" id="mg-wrap">
        <canvas id="mg-canvas"></canvas>
        <div class="mg-toast" id="mg-toast" role="status"></div>
        <div class="mg-hud">
          <span id="mg-alt">Altitude : 0 m</span>
          <span id="mg-rings">Anneaux — Toi 0 · HGPTO 0</span>
          <span id="mg-score">Manches — Toi 0 · HGPTO 0</span>
        </div>
      </div>
      <p class="mg-help">Glisse ton doigt ou ta souris sur le ciel (ou les flèches ← →) pour piloter TON ballon. HGPTO pilote le sien tout seul, selon ses règles — et des fois, il se trompe. Premier ballon qui pète perd la manche !</p>
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
      <button type="button" id="btn-dock" aria-label="Ouvrir les contrôles d'HGPTO" aria-expanded="false">•••</button>
      <button type="button" id="btn-games" aria-label="Aller aux jeux">Jeux</button>
      <button type="button" id="btn-ask">Une question ?</button>
      <button type="button" id="btn-read">Lis-moi ça</button>
      <button type="button" id="btn-accompany" aria-pressed="false">Accompagne-moi</button>
      <button type="button" id="btn-tickle">Chatouiller</button>
      <button type="button" id="btn-bucket">Seau d'eau</button>
      <button type="button" id="btn-kibble">Croquette</button>
      <button type="button" id="btn-calm" aria-pressed="false">Mode calme</button>
      <button type="button" id="btn-pause" aria-pressed="false">Pause</button>
      <button type="button" id="btn-sound" aria-pressed="true">Son : fort</button>
      <select id="sel-mood" aria-label="Mode d'HGPTO — choisis comment je me comporte">
        <option value="defaut">Mode : comme d'habitude</option>
        <option value="vendeur">Vendeur pro actif</option>
        <option value="ami">Ami</option>
        <option value="grognon">Grognon drôle</option>
      </select>
      <select id="sel-weather" aria-label="Météo — aperçu des tenues d'HGPTO">
        <option value="auto">Météo : auto</option>
        <option value="froid">Froid</option>
        <option value="doux">Doux</option>
        <option value="chaud">Chaud</option>
        <option value="pluie">Pluie</option>
      </select>
      <button type="button" id="btn-hide">Fermer HGPTO</button>
    </div>
`;
