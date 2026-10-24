import type { ReactNode } from "react";

/**
 * Déguisements d'Hugo — habillages dessinés (SVG 100 % originaux, archétypes
 * génériques) posés par-dessus sa photo sur /a-propos. La photo n'est jamais
 * modifiée : chaque déguisement est un calque SVG dans un repère 0–100 qui
 * épouse le cadre carré du portrait.
 *
 * Ancrages du visage mesurés sur photo-hp.jpg (960×960, affichée en carré) :
 * œil gauche (41.4, 39.7) · œil droit (59.6, 39.3) · sourcils y≈34 ·
 * nez (50.4, 49.5) · bouche (50.9, 59) · menton y≈74.7 · haut de tête y≈7.9 ·
 * oreille gauche (28.3, 45.8) · oreille droite (72, 45.4) · centre x≈50.5.
 */

export interface Deguise {
  id: string;
  legende: string;
  calque: ReactNode;
}

export const DEGUISES: Deguise[] = [
  {
    id: "clown",
    legende: "Hugo en clown !",
    calque: (
      <g>
        {/* touffes de cheveux colorées */}
        <circle cx="25" cy="21" r="6" fill="#e8433c" />
        <circle cx="21" cy="31" r="5" fill="#2f7fe0" />
        <circle cx="29" cy="30" r="4.6" fill="#ffb52e" />
        <circle cx="76" cy="21" r="6" fill="#2f7fe0" />
        <circle cx="80" cy="31" r="5" fill="#e8433c" />
        <circle cx="72" cy="30" r="4.6" fill="#ffb52e" />
        {/* joues roses */}
        <circle cx="35.5" cy="52" r="3.4" fill="#ff7d9c" opacity="0.55" />
        <circle cx="65.5" cy="52" r="3.4" fill="#ff7d9c" opacity="0.55" />
        {/* grand sourire dessiné */}
        <path d="M 38 56.5 Q 50.5 68.5 63 56.5" fill="none" stroke="#d81f26" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="37.2" cy="55.8" r="1.5" fill="#d81f26" />
        <circle cx="63.8" cy="55.8" r="1.5" fill="#d81f26" />
        {/* nez rouge */}
        <circle cx="50.4" cy="50" r="5" fill="#e5322d" stroke="#b11d18" strokeWidth="0.8" />
        <circle cx="48.4" cy="48" r="1.5" fill="#ffffff" opacity="0.75" />
      </g>
    ),
  },
  {
    id: "ange",
    legende: "Hugo en ange !",
    calque: (
      <g>
        {/* ailes blanches */}
        <path d="M 27 35 C 13 28 4 35 6 44 C 11 51 22 51 27.5 45 C 24 42 24 38 27 35 Z" fill="#ffffff" stroke="#d9d4c5" strokeWidth="0.9" />
        <path d="M 74 35 C 88 28 97 35 95 44 C 90 51 79 51 73.5 45 C 77 42 77 38 74 35 Z" fill="#ffffff" stroke="#d9d4c5" strokeWidth="0.9" />
        {/* petites étoiles */}
        <path d="M 33 14 l 1.6 3.4 3.4 1.6 -3.4 1.6 -1.6 3.4 -1.6 -3.4 -3.4 -1.6 3.4 -1.6 Z" fill="#ffe066" />
        <path d="M 68 11 l 1.3 2.8 2.8 1.3 -2.8 1.3 -1.3 2.8 -1.3 -2.8 -2.8 -1.3 2.8 -1.3 Z" fill="#ffe066" />
        {/* auréole dorée */}
        <ellipse cx="50.5" cy="4.4" rx="13" ry="3.4" fill="#ffd94d" opacity="0.35" />
        <ellipse cx="50.5" cy="4.4" rx="13" ry="3.4" fill="none" stroke="#f2b705" strokeWidth="2.6" />
      </g>
    ),
  },
  {
    id: "diable",
    legende: "Hugo en petit diable !",
    calque: (
      <g>
        {/* teinte chaude légère */}
        <ellipse cx="50.5" cy="44" rx="24" ry="37" fill="#ff4b1f" opacity="0.10" />
        {/* cornes rouges */}
        <path d="M 35 13.5 C 31 6.5 32 1.5 37.5 0.8 C 36.8 5.2 38.2 8.6 40 11.8 Z" fill="#d42a20" stroke="#a11c14" strokeWidth="0.7" />
        <path d="M 66 13.5 C 70 6.5 69 1.5 63.5 0.8 C 64.2 5.2 62.8 8.6 61 11.8 Z" fill="#d42a20" stroke="#a11c14" strokeWidth="0.7" />
        {/* sourcils espiègles */}
        <path d="M 33 33.5 L 47.5 37" stroke="#7a1f16" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 68 33.5 L 53.5 37" stroke="#7a1f16" strokeWidth="2.4" strokeLinecap="round" />
        {/* barbiche pointue */}
        <path d="M 43.5 71.5 L 50.8 82.5 L 58 71.5 C 54 75 47.5 75 43.5 71.5 Z" fill="#7a1f16" />
      </g>
    ),
  },
  {
    id: "cuisinier",
    legende: "Hugo en cuisinier !",
    calque: (
      <g>
        {/* toque blanche */}
        <circle cx="39.5" cy="10.5" r="6.5" fill="#ffffff" stroke="#d8d8d8" strokeWidth="0.8" />
        <circle cx="50.5" cy="8" r="7.5" fill="#ffffff" stroke="#d8d8d8" strokeWidth="0.8" />
        <circle cx="61.5" cy="10.5" r="6.5" fill="#ffffff" stroke="#d8d8d8" strokeWidth="0.8" />
        <path d="M 32.5 13 L 68.5 13 L 68.5 20 L 32.5 20 Z" fill="#ffffff" stroke="#d8d8d8" strokeWidth="0.8" />
        {/* moustache fournie */}
        <path d="M 50.4 54.2 C 44 50.8 36.8 52.8 35.2 57.8 C 40.8 59.4 47 58.4 50.4 56.3 C 53.8 58.4 60 59.4 65.6 57.8 C 64 52.8 56.8 50.8 50.4 54.2 Z" fill="#4a3a30" />
      </g>
    ),
  },
  {
    id: "prof",
    legende: "Hugo en prof !",
    calque: (
      <g>
        {/* lunettes rondes */}
        <circle cx="41.4" cy="39.5" r="8" fill="#ffffff" opacity="0.06" stroke="#2b2b2b" strokeWidth="1.8" />
        <circle cx="59.6" cy="39.5" r="8" fill="#ffffff" opacity="0.06" stroke="#2b2b2b" strokeWidth="1.8" />
        <path d="M 49.4 39.5 L 51.6 39.5" stroke="#2b2b2b" strokeWidth="1.8" />
        <path d="M 33.4 38.8 L 28 38" stroke="#2b2b2b" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M 67.6 38.8 L 73 38" stroke="#2b2b2b" strokeWidth="1.8" strokeLinecap="round" />
        {/* nœud papillon */}
        <path d="M 50.5 88 L 41 82.8 L 41 93.2 Z" fill="#8e2434" />
        <path d="M 50.5 88 L 60 82.8 L 60 93.2 Z" fill="#8e2434" />
        <circle cx="50.5" cy="88" r="1.9" fill="#6d1a29" />
      </g>
    ),
  },
  {
    id: "sergent",
    legende: "Sergent Hugo, à vos ordres !",
    calque: (
      <g>
        {/* casquette militaire */}
        <path d="M 29 21 C 29 9.5 38 4.5 50.5 4.5 C 63 4.5 72 9.5 72 21 L 72 23 L 29 23 Z" fill="#5a6238" stroke="#454c2a" strokeWidth="0.8" />
        <path d="M 29 23 L 72 23 L 72 26 C 60 28.6 41 28.6 29 26 Z" fill="#3e4426" />
        <path d="M 30 21.2 L 71 21.2" stroke="#d9a441" strokeWidth="1.1" />
        <circle cx="50.5" cy="12.5" r="2.2" fill="#d9a441" stroke="#a87c26" strokeWidth="0.6" />
        {/* sourcils sévères */}
        <path d="M 33 35.5 L 47.5 38.2" stroke="#26221c" strokeWidth="3" strokeLinecap="round" />
        <path d="M 68 35.5 L 53.5 38.2" stroke="#26221c" strokeWidth="3" strokeLinecap="round" />
        {/* galons d'épaule */}
        <path d="M 4 92.5 L 11 86.5 L 18 92.5" fill="none" stroke="#d9a441" strokeWidth="2" strokeLinecap="round" />
        <path d="M 4 97.5 L 11 91.5 L 18 97.5" fill="none" stroke="#d9a441" strokeWidth="2" strokeLinecap="round" />
        <path d="M 82 92.5 L 89 86.5 L 96 92.5" fill="none" stroke="#d9a441" strokeWidth="2" strokeLinecap="round" />
        <path d="M 82 97.5 L 89 91.5 L 96 97.5" fill="none" stroke="#d9a441" strokeWidth="2" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: "informaticien",
    legende: "Hugo en informaticien !",
    calque: (
      <g>
        {/* arceau du casque */}
        <path d="M 27.5 42 C 27.5 11 73.5 11 73.5 42" fill="none" stroke="#23262b" strokeWidth="3.4" strokeLinecap="round" />
        {/* écouteurs */}
        <rect x="23.3" y="36.5" width="7.4" height="13.5" rx="3" fill="#23262b" />
        <rect x="70.3" y="36.5" width="7.4" height="13.5" rx="3" fill="#23262b" />
        <circle cx="74" cy="46.8" r="1.2" fill="#53c1ff" />
        {/* micro */}
        <path d="M 74 50 C 71 58 62.5 60.8 56.5 60.3" fill="none" stroke="#23262b" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="55.2" cy="60.2" r="2" fill="#23262b" />
        {/* lunettes à reflets d'écran */}
        <rect x="32.3" y="33" width="17.8" height="12.6" rx="3.5" fill="#7fd4ff" opacity="0.22" stroke="#23262b" strokeWidth="1.6" />
        <rect x="51" y="33" width="17.8" height="12.6" rx="3.5" fill="#7fd4ff" opacity="0.22" stroke="#23262b" strokeWidth="1.6" />
        <path d="M 36 44 L 44.5 34.5" stroke="#ffffff" strokeWidth="1.6" opacity="0.75" strokeLinecap="round" />
        <path d="M 55 44 L 62.5 35.5" stroke="#ffffff" strokeWidth="1.6" opacity="0.75" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: "chien",
    legende: "Hugo en chien !",
    calque: (
      <g>
        {/* oreilles tombantes */}
        <path d="M 33.5 15 C 22 17 16.5 29.5 18.8 44 C 20.2 54.5 27 56.5 30.8 50 C 33.8 42 34.8 23 33.5 15 Z" fill="#8a5a33" stroke="#6f4525" strokeWidth="0.8" />
        <path d="M 67.5 15 C 79 17 84.5 29.5 82.2 44 C 80.8 54.5 74 56.5 70.2 50 C 67.2 42 66.2 23 67.5 15 Z" fill="#8a5a33" stroke="#6f4525" strokeWidth="0.8" />
        {/* museau */}
        <ellipse cx="50.6" cy="57" rx="11.5" ry="8.6" fill="#d9b98c" stroke="#b99568" strokeWidth="0.8" />
        <ellipse cx="50.6" cy="51.8" rx="4.6" ry="3.4" fill="#2e2320" />
        <circle cx="49" cy="50.6" r="1.1" fill="#ffffff" opacity="0.7" />
        <path d="M 50.6 55.2 L 50.6 58.6" stroke="#8a6a42" strokeWidth="1.3" strokeLinecap="round" />
        {/* langue joyeuse */}
        <path d="M 45.4 62.8 C 45.4 70.2 47.9 73.8 50.6 73.8 C 53.3 73.8 55.8 70.2 55.8 62.8 C 52.9 64.9 48.3 64.9 45.4 62.8 Z" fill="#f283a6" stroke="#d95f86" strokeWidth="0.8" />
        <path d="M 50.6 66 L 50.6 71.5" stroke="#d95f86" strokeWidth="1" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: "pixel",
    legende: "Hugo en Pixel, sa chatte !",
    calque: (
      <g>
        {/* oreilles de chat */}
        <path d="M 34.5 15.5 L 30 1.8 L 45.5 6.8 Z" fill="#3c3f45" stroke="#26282d" strokeWidth="0.7" />
        <path d="M 35.8 12.2 L 33.6 5.4 L 42.2 8.8 Z" fill="#f2a7bb" />
        <path d="M 66.5 15.5 L 71 1.8 L 55.5 6.8 Z" fill="#3c3f45" stroke="#26282d" strokeWidth="0.7" />
        <path d="M 65.2 12.2 L 67.4 5.4 L 58.8 8.8 Z" fill="#f2a7bb" />
        {/* moustaches */}
        <path d="M 34 52 L 18 49 M 34 56.5 L 19 57.5 M 35 49.3 L 22 44.3" stroke="#3c3f45" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
        <path d="M 67 52 L 83 49 M 67 56.5 L 82 57.5 M 66 49.3 L 79 44.3" stroke="#3c3f45" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
        {/* petit nez rose */}
        <path d="M 47.2 51.3 L 54 51.3 L 50.6 55 Z" fill="#f28bb0" stroke="#d96b92" strokeWidth="0.6" />
        {/* collier et clochette */}
        <path d="M 38 79.5 Q 50.5 87.5 63 79.5" fill="none" stroke="#c9333e" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="50.5" cy="86.3" r="2.6" fill="#f2b705" stroke="#c78f04" strokeWidth="0.7" />
      </g>
    ),
  },
  {
    id: "hgpto",
    legende: "Hugo en mode HGPTO !",
    calque: (
      <g>
        {/* antenne */}
        <path d="M 50.5 9.5 L 50.5 3.4" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" />
        <circle cx="50.5" cy="2.6" r="2.3" fill="#f59e0b" stroke="#6b7280" strokeWidth="0.7" />
        {/* plaque métallique au front */}
        <rect x="33" y="21" width="35" height="9.5" rx="3" fill="#9aa3ad" stroke="#6b7280" strokeWidth="1" />
        <circle cx="36.6" cy="25.7" r="1.1" fill="#6b7280" />
        <circle cx="64.4" cy="25.7" r="1.1" fill="#6b7280" />
        <circle cx="50.5" cy="25.7" r="2" fill="#ffd94d" stroke="#6b7280" strokeWidth="0.6" />
        {/* gros sourcils ébouriffés, clin d'œil au petit robot */}
        <path d="M 32 35.2 L 36.8 32.6 L 40 35.2 L 44 32.6 L 48.2 35.2" fill="none" stroke="#1c1c1e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 69 35.2 L 64.2 32.6 L 61 35.2 L 57 32.6 L 52.8 35.2" fill="none" stroke="#1c1c1e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* cache-oreilles métalliques */}
        <circle cx="27.6" cy="45.8" r="4" fill="#9aa3ad" stroke="#6b7280" strokeWidth="1" />
        <circle cx="73.4" cy="45.4" r="4" fill="#9aa3ad" stroke="#6b7280" strokeWidth="1" />
        <circle cx="27.6" cy="45.8" r="1.4" fill="#6b7280" />
        <circle cx="73.4" cy="45.4" r="1.4" fill="#6b7280" />
      </g>
    ),
  },
  {
    id: "barbouille-melon",
    legende: "HGPTO m'a barbouillé !",
    calque: (
      <g>
        {/* Barbouillage d'HGPTO : trait de marqueur irrégulier, visiblement
            griffonné à la main par un petit robot — pas le style propre
            des autres déguisements. Chapeau melon + lunettes rondes. */}
        {/* chapeau melon */}
        <path d="M 36 14.6 C 35.4 5.4 41.2 2.1 50.6 2.2 C 60.1 2.2 65.6 5.6 65.1 14.7 C 57.2 12.7 44 12.7 36 14.6 Z" fill="#2b2620" />
        <path d="M 36.8 13.2 C 44.5 11.3 56.8 11.3 64.3 13.2" fill="none" stroke="#f6edd9" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
        <path d="M 26.8 15.4 C 38 12.7 63.2 12.8 74.2 15.1 C 63.4 17.9 37.8 18.1 26.8 15.4 Z" fill="#2b2620" />
        <path d="M 27.6 17.1 C 39 14.9 62 14.9 73.4 16.8" fill="none" stroke="#2b2620" strokeWidth="0.9" opacity="0.45" strokeLinecap="round" />
        {/* lunettes rondes griffonnées (double trait tremblé) */}
        <path d="M 33.7 39.1 C 33.3 34.9 36.9 31.9 41.3 31.7 C 45.9 31.5 49.3 34.7 49.4 39.5 C 49.5 44.5 46 47.7 41.4 47.6 C 37 47.5 34.1 44.1 33.7 39.1 Z" fill="none" stroke="#2b2620" strokeWidth="2" strokeLinecap="round" />
        <path d="M 34.9 39.9 C 35 36 38 33.4 41.8 33.2" fill="none" stroke="#2b2620" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M 51.9 39.1 C 51.9 34.8 55.3 31.6 59.8 31.6 C 64.4 31.6 67.7 34.9 67.7 39.6 C 67.7 44.4 64.3 47.5 59.7 47.4 C 55.4 47.3 52.3 44.2 51.9 39.1 Z" fill="none" stroke="#2b2620" strokeWidth="2" strokeLinecap="round" />
        <path d="M 53.1 40 C 53.3 36.2 56.1 33.5 59.9 33.3" fill="none" stroke="#2b2620" strokeWidth="1" opacity="0.4" strokeLinecap="round" />
        <path d="M 49.4 38.7 C 50.4 38.1 51.1 38.2 52 38.8" fill="none" stroke="#2b2620" strokeWidth="2" strokeLinecap="round" />
        {/* la « signature » d'HGPTO, gribouillée en bas à droite */}
        <path d="M 76.5 90.5 C 79 85.8 81.8 92.3 84.8 87.2 C 86.8 83.9 88.8 89.4 91.2 86.3" fill="none" stroke="#2b2620" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      </g>
    ),
  },
  {
    id: "barbouille-moustache",
    legende: "HGPTO m'a barbouillé — moustache comprise !",
    calque: (
      <g>
        {/* Barbouillage d'HGPTO, variante signature : énorme moustache
            griffonnée + sourcils ébouriffés au marqueur. */}
        {/* sourcils ébouriffés en coups de marqueur */}
        <path d="M 32.8 33.4 L 37.2 30.6 M 38.2 31.9 L 41.8 29 M 43.4 32.3 L 46.6 30 M 47.6 33.6 L 50.2 31.7" stroke="#2b2620" strokeWidth="2" strokeLinecap="round" />
        <path d="M 68.2 33.4 L 63.8 30.6 M 62.8 31.9 L 59.2 29 M 57.6 32.3 L 54.4 30 M 53.4 33.6 L 50.8 31.7" stroke="#2b2620" strokeWidth="2" strokeLinecap="round" />
        <path d="M 33.5 35.8 C 38 33.8 44 33.6 48 35.4 M 67.5 35.8 C 63 33.8 57 33.6 53 35.4" fill="none" stroke="#2b2620" strokeWidth="1.1" opacity="0.45" strokeLinecap="round" />
        {/* moustache géante griffonnée */}
        <path d="M 50.5 54.2 C 43.2 49.6 33.2 51.4 30.6 57.4 C 31.1 60.1 34.1 60.6 37.1 59.1 C 33.6 62.7 35.2 65.8 39.7 64.7 C 45.1 63.6 48.6 59.7 50.5 56.7 C 52.4 59.7 55.9 63.6 61.3 64.7 C 65.8 65.8 67.4 62.7 63.9 59.1 C 66.9 60.6 69.9 60.1 70.4 57.4 C 67.8 51.4 57.8 49.6 50.5 54.2 Z" fill="#2b2620" />
        <path d="M 36 56.6 C 40 54.6 45 54.8 48.6 56.8 M 65 56.6 C 61 54.6 56 54.8 52.4 56.8" fill="none" stroke="#f6edd9" strokeWidth="1" opacity="0.35" strokeLinecap="round" />
        {/* petit tourbillon sur la joue, pour le plaisir */}
        <path d="M 31.2 51.5 C 33.8 49.9 36.4 51.6 36.2 54.1 C 36 56.3 33.9 57.6 32 56.7 C 30.4 55.9 30.2 53.9 31.5 52.8" fill="none" stroke="#2b2620" strokeWidth="1.2" opacity="0.75" strokeLinecap="round" />
        {/* la « signature » d'HGPTO, gribouillée en bas à gauche */}
        <path d="M 8.8 90.5 C 11.2 85.8 14 92.3 17 87.2 C 19 83.9 21 89.4 23.5 86.3" fill="none" stroke="#2b2620" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      </g>
    ),
  },
  {
    id: "vache",
    legende: "Hugo en vache !",
    calque: (
      <g>
        {/* petites cornes */}
        <path d="M 36.5 12.5 C 33.5 6.5 34.5 2.8 38.5 2 C 37.8 5.8 38.8 9.2 40.5 11.8 Z" fill="#efe6d0" stroke="#cbbfa5" strokeWidth="0.7" />
        <path d="M 64.5 12.5 C 67.5 6.5 66.5 2.8 62.5 2 C 63.2 5.8 62.2 9.2 60.5 11.8 Z" fill="#efe6d0" stroke="#cbbfa5" strokeWidth="0.7" />
        {/* oreilles */}
        <ellipse cx="24" cy="38" rx="7" ry="3.6" transform="rotate(-18 24 38)" fill="#e8e2d6" stroke="#c9bda6" strokeWidth="0.8" />
        <ellipse cx="24" cy="38" rx="3.6" ry="1.8" transform="rotate(-18 24 38)" fill="#f2a7bb" />
        <ellipse cx="77" cy="38" rx="7" ry="3.6" transform="rotate(18 77 38)" fill="#e8e2d6" stroke="#c9bda6" strokeWidth="0.8" />
        <ellipse cx="77" cy="38" rx="3.6" ry="1.8" transform="rotate(18 77 38)" fill="#f2a7bb" />
        {/* taches */}
        <ellipse cx="35.5" cy="20" rx="7" ry="5" transform="rotate(-15 35.5 20)" fill="#4b3626" opacity="0.8" />
        <ellipse cx="66.5" cy="46.5" rx="4.5" ry="3.4" transform="rotate(12 66.5 46.5)" fill="#4b3626" opacity="0.8" />
        {/* museau rose */}
        <ellipse cx="50.6" cy="58.5" rx="13.5" ry="9.5" fill="#f6c9d4" stroke="#dfa3b5" strokeWidth="0.8" />
        <ellipse cx="45.6" cy="58" rx="1.7" ry="2.4" fill="#c97e95" />
        <ellipse cx="55.6" cy="58" rx="1.7" ry="2.4" fill="#c97e95" />
        <path d="M 44 64.2 Q 50.6 67.6 57.2 64.2" fill="none" stroke="#c97e95" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: "dragon",
    legende: "Hugo en dragon !",
    calque: (
      <g>
        {/* teinte verte douce */}
        <ellipse cx="50.5" cy="44" rx="24" ry="37" fill="#3fae5a" opacity="0.10" />
        {/* petites ailes */}
        <path d="M 27.5 31 C 16.5 20.5 6.5 18 3.2 24 C 8.2 27 9.4 31.2 8.8 36.2 C 13.2 33.2 17.2 34.4 20.2 38.4 C 22 34.4 25 33.2 27.5 36.4 Z" fill="#57b96b" stroke="#2e7d46" strokeWidth="0.8" opacity="0.92" />
        <path d="M 73.5 31 C 84.5 20.5 94.5 18 97.8 24 C 92.8 27 91.6 31.2 92.2 36.2 C 87.8 33.2 83.8 34.4 80.8 38.4 C 79 34.4 76 33.2 73.5 36.4 Z" fill="#57b96b" stroke="#2e7d46" strokeWidth="0.8" opacity="0.92" />
        {/* cornes recourbées */}
        <path d="M 37.5 13.8 C 30 9.2 25.3 3.8 26.3 1 C 31 2.6 36.2 6.2 39.2 10.4 Z" fill="#2e7d46" stroke="#1f5c31" strokeWidth="0.7" />
        <path d="M 63.5 13.8 C 71 9.2 75.7 3.8 74.7 1 C 70 2.6 64.8 6.2 61.8 10.4 Z" fill="#2e7d46" stroke="#1f5c31" strokeWidth="0.7" />
        {/* arcades marquées */}
        <path d="M 33 32.5 L 47.5 35.2" stroke="#2e7d46" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M 68 32.5 L 53.5 35.2" stroke="#2e7d46" strokeWidth="2.6" strokeLinecap="round" />
        {/* petits crocs */}
        <path d="M 43.4 61.3 L 46.2 61.3 L 44.8 65.2 Z" fill="#ffffff" stroke="#cfd8cf" strokeWidth="0.4" />
        <path d="M 54.8 61.3 L 57.6 61.3 L 56.2 65.2 Z" fill="#ffffff" stroke="#cfd8cf" strokeWidth="0.4" />
      </g>
    ),
  },
  {
    id: "vampire",
    legende: "Hugo en vampire !",
    calque: (
      <g>
        {/* teinte pâle */}
        <ellipse cx="50.5" cy="44" rx="24" ry="37" fill="#ffffff" opacity="0.16" />
        {/* raie en pointe */}
        <path d="M 37.5 11.5 C 43.5 19.5 47 23.5 50.5 26.5 C 54 23.5 57.5 19.5 63.5 11.5 C 57 8 44 8 37.5 11.5 Z" fill="#20222b" opacity="0.92" />
        {/* crocs */}
        <path d="M 42.8 60.3 L 46.4 60.3 L 44.6 66.8 Z" fill="#ffffff" stroke="#d8d8d8" strokeWidth="0.4" />
        <path d="M 54.6 60.3 L 58.2 60.3 L 56.4 66.8 Z" fill="#ffffff" stroke="#d8d8d8" strokeWidth="0.4" />
        {/* col relevé */}
        <path d="M 5 100 L 19.5 75.5 L 33 92 L 29.5 100 Z" fill="#20222b" />
        <path d="M 11.5 100 L 21 83.5 L 28.5 93 L 26.5 100 Z" fill="#8e2434" />
        <path d="M 96 100 L 81.5 75.5 L 68 92 L 71.5 100 Z" fill="#20222b" />
        <path d="M 89.5 100 L 80 83.5 L 72.5 93 L 74.5 100 Z" fill="#8e2434" />
        {/* médaillon */}
        <circle cx="50.5" cy="86.5" r="2.2" fill="#c0272d" stroke="#7d1620" strokeWidth="0.6" />
      </g>
    ),
  },
  {
    id: "fantome",
    legende: "Hugo en fantôme !",
    calque: (
      <g>
        {/* voile blanc translucide au bord doux et ondulé */}
        <path d="M 50.5 1.5 C 31 1.5 22.5 15.5 22.5 34 L 22.5 73.5 C 27 69.8 30.8 77.5 35.8 73.8 C 39.8 70.4 43.8 77.8 48.3 74.3 C 52.3 71.2 56.3 77.8 60.8 74 C 65.3 70.4 69.3 77.3 73.8 73.3 L 78.5 34 C 78.5 15.5 69.5 1.5 50.5 1.5 Z" fill="#ffffff" opacity="0.34" />
        <ellipse cx="50.5" cy="38" rx="21" ry="29" fill="#ffffff" opacity="0.18" />
      </g>
    ),
  },
  {
    id: "citrouille",
    legende: "Hugo en citrouille !",
    calque: (
      <g>
        {/* teinte orangée */}
        <ellipse cx="50.5" cy="44" rx="24" ry="37" fill="#f07f13" opacity="0.15" />
        {/* rainures en filigrane */}
        <path d="M 41 12 C 36 30 36 55 41 72" fill="none" stroke="#d96a06" strokeWidth="1.6" opacity="0.35" />
        <path d="M 60 12 C 65 30 65 55 60 72" fill="none" stroke="#d96a06" strokeWidth="1.6" opacity="0.35" />
        <path d="M 50.5 9.5 C 49.2 30 49.2 55 50.5 74.5" fill="none" stroke="#d96a06" strokeWidth="1.3" opacity="0.3" />
        {/* tige */}
        <ellipse cx="50.3" cy="8.6" rx="5.2" ry="1.8" fill="#e06f08" opacity="0.8" />
        <path d="M 47.2 8.2 C 47 3.2 51 0.6 56.2 1.6 C 53.2 3.6 52.6 5.6 53.6 8.2 Z" fill="#4e7a2a" stroke="#3c5f1f" strokeWidth="0.7" />
        {/* sourire citrouille en filigrane */}
        <path d="M 38 63.2 L 44 67.8 L 48 63.8 L 52 67.8 L 56 63.8 L 60 67.8 L 64 63.2" fill="none" stroke="#d96a06" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" opacity="0.55" />
      </g>
    ),
  },
  /* ----- Nouveautés du 23 oct. 2026 (demande d'Hugo : 25 et plus,
     toujours 100 % originales, archétypes génériques dessinés ici) ----- */
  {
    id: "bucheron",
    legende: "Hugo en bûcheron — la barbe vient avec !",
    calque: (
      <g>
        {/* casquette à carreaux rouges et noirs */}
        <path d="M 31 20 C 31 8 40 3.5 50.5 3.5 C 61 3.5 70 8 70 20 L 70 22 L 31 22 Z" fill="#b3312a" />
        <path d="M 40 4.8 L 40 22 M 50.5 3.5 L 50.5 22 M 61 4.8 L 61 22" stroke="#26221c" strokeWidth="2.2" opacity="0.55" />
        <path d="M 31 13 L 70 13" stroke="#26221c" strokeWidth="2.2" opacity="0.55" />
        <path d="M 28 22 L 73 22 L 73 25.5 C 61 27.8 40 27.8 28 25.5 Z" fill="#26221c" />
        {/* grande barbe rousse (la bouche reste libre) */}
        <path
          fillRule="evenodd"
          d="M 29.5 46 C 27 74 36 95.5 50.5 96.5 C 65 95.5 74 74 71.5 46 C 67 63 60.5 70.5 50.5 70.5 C 40.5 70.5 34 63 29.5 46 Z
             M 43.5 56.5 C 47 54.8 54 54.8 57.5 56.5 C 57.5 62.5 54 65.5 50.5 65.5 C 47 65.5 43.5 62.5 43.5 56.5 Z"
          fill="#b85c1e"
        />
        <path d="M 36 74 C 39 84 44 89 50.5 89.5 M 65 74 C 62 84 57 89 50.5 89.5" fill="none" stroke="#8f4210" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        {/* moustache rousse assortie */}
        <path d="M 50.4 53.6 C 44.5 50.6 38 52.2 36.4 56.4 C 41.4 58 47 57.2 50.4 55.3 C 53.8 57.2 59.4 58 64.4 56.4 C 62.8 52.2 56.3 50.6 50.4 53.6 Z" fill="#a34d16" />
      </g>
    ),
  },
  {
    id: "pecheur-glace",
    legende: "Hugo pêcheur sur glace — ça mord… pas encore !",
    calque: (
      <g>
        {/* tuque bleue à rabats */}
        <path d="M 30 22 C 30 9 39.5 3.5 50.5 3.5 C 61 3.5 71 9 71 22 L 71 24 L 30 24 Z" fill="#2f5f8f" />
        <path d="M 30 18.5 L 71 18.5" stroke="#f6edd9" strokeWidth="2.4" />
        <circle cx="50.5" cy="3.2" r="3.2" fill="#f6edd9" />
        <rect x="24.5" y="20" width="8" height="30" rx="3.5" fill="#2f5f8f" stroke="#24496e" strokeWidth="0.8" />
        <rect x="68.5" y="20" width="8" height="30" rx="3.5" fill="#2f5f8f" stroke="#24496e" strokeWidth="0.8" />
        {/* ligne de pêche et petit poisson pendu, à droite */}
        <path d="M 84 2 C 82 14 80.5 24 79.5 34" fill="none" stroke="#3a3a3a" strokeWidth="1" opacity="0.8" />
        <path d="M 79.5 34 C 79.5 37 77.8 37.6 76.8 36.2" fill="none" stroke="#3a3a3a" strokeWidth="1.2" strokeLinecap="round" />
        <g transform="rotate(24 76 44)">
          <ellipse cx="76" cy="44" rx="3.4" ry="5.6" fill="#7fb2d9" stroke="#4d7ea6" strokeWidth="0.7" />
          <path d="M 76 38 L 72.8 33.8 L 79.2 33.8 Z" fill="#4d7ea6" />
          <circle cx="74.6" cy="46.5" r="0.8" fill="#20303c" />
        </g>
        {/* écharpe rayée */}
        <path d="M 33 90 C 44 96 57 96 68 90 L 68 99 L 33 99 Z" fill="#b3312a" />
        <path d="M 40 93.2 L 40 99 M 50.5 94.6 L 50.5 99 M 61 93.2 L 61 99" stroke="#f6edd9" strokeWidth="2" />
      </g>
    ),
  },
  {
    id: "castor",
    legende: "Hugo en castor — toujours prêt à bâtir !",
    calque: (
      <g>
        {/* oreilles rondes */}
        <circle cx="32.5" cy="11" r="6" fill="#7a4a26" stroke="#5c3519" strokeWidth="0.8" />
        <circle cx="32.5" cy="11" r="2.8" fill="#c99b6d" />
        <circle cx="68.5" cy="11" r="6" fill="#7a4a26" stroke="#5c3519" strokeWidth="0.8" />
        <circle cx="68.5" cy="11" r="2.8" fill="#c99b6d" />
        {/* museau brun */}
        <ellipse cx="50.6" cy="56.5" rx="12.5" ry="9.5" fill="#a9743f" stroke="#7a4a26" strokeWidth="0.8" />
        <ellipse cx="50.6" cy="51.5" rx="4.4" ry="3.2" fill="#2e2320" />
        <circle cx="49" cy="50.4" r="1" fill="#ffffff" opacity="0.7" />
        {/* les deux grandes dents du castor */}
        <path d="M 45.8 60.5 L 55.4 60.5 L 55.4 70 C 55.4 71.2 54.4 72 53.2 72 L 48 72 C 46.8 72 45.8 71.2 45.8 70 Z" fill="#ffffff" stroke="#cbbfa5" strokeWidth="0.7" />
        <path d="M 50.6 60.5 L 50.6 71.6" stroke="#cbbfa5" strokeWidth="0.9" />
        {/* moustaches fines */}
        <path d="M 40 54 L 29 51.5 M 40 58 L 30 58.5 M 61 54 L 72 51.5 M 61 58 L 71 58.5" stroke="#5c3519" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
      </g>
    ),
  },
  {
    id: "bonhomme-neige",
    legende: "Hugo en bonhomme de neige — ne le laissez pas au soleil !",
    calque: (
      <g>
        {/* teinte givrée */}
        <ellipse cx="50.5" cy="44" rx="24" ry="37" fill="#dceef7" opacity="0.20" />
        {/* le nez en carotte */}
        <path d="M 49.8 46.2 L 75 52.2 L 49.8 56 Z" fill="#e87e1e" stroke="#c4630d" strokeWidth="0.7" />
        <path d="M 57 48.2 L 56.4 54.2 M 63.5 49.7 L 63 55.4" stroke="#c4630d" strokeWidth="0.9" opacity="0.7" />
        {/* yeux et sourire en charbon */}
        <circle cx="41.4" cy="39.7" r="1.5" fill="#2b2b2b" opacity="0.55" />
        <circle cx="59.6" cy="39.3" r="1.5" fill="#2b2b2b" opacity="0.55" />
        {/* boutons de charbon */}
        <circle cx="50.5" cy="83" r="2.1" fill="#2b2b2b" />
        <circle cx="50.5" cy="91.5" r="2.1" fill="#2b2b2b" />
        {/* écharpe rouge */}
        <path d="M 31 74.5 C 42 80.5 59 80.5 70 74.5 L 71.5 82 C 59 88.5 42 88.5 29.5 82 Z" fill="#c22e35" />
        <path d="M 60 84.5 L 63.5 97 L 58 97.5 L 59.5 88 L 56.5 97.2 L 52 96.5 L 55.5 83.8 Z" fill="#c22e35" />
        {/* bras en brindilles */}
        <path d="M 27 62 L 13 54 M 18 57.5 L 15.5 51 M 20.5 59.5 L 21 53" stroke="#6b4a2a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M 74 62 L 88 54 M 83 57.5 L 85.5 51 M 80.5 59.5 L 80 53" stroke="#6b4a2a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: "lutin",
    legende: "Hugo en lutin — la clochette, c'est pour les cadeaux !",
    calque: (
      <g>
        {/* oreilles pointues */}
        <path d="M 29.5 40 L 16 34.5 L 25.5 49 Z" fill="#f2c9a0" stroke="#d9a878" strokeWidth="0.7" />
        <path d="M 71.5 40 L 85 34.5 L 75.5 49 Z" fill="#f2c9a0" stroke="#d9a878" strokeWidth="0.7" />
        {/* chapeau pointu vert, recourbé, à clochette */}
        <path d="M 29 22 C 33 8 48 0.5 71 1.5 C 60 4.5 55 9.5 53.5 17 C 60 12 68 11 73 13.5 L 73 22 Z" fill="#2e7d46" stroke="#1f5c31" strokeWidth="0.8" />
        <path d="M 26.5 22 L 74.5 22 L 74.5 27 L 26.5 27 Z" fill="#c22e35" />
        <circle cx="72.5" cy="2.6" r="3.1" fill="#f2b705" stroke="#c78f04" strokeWidth="0.7" />
        <path d="M 70.2 4.4 L 74.8 4.4" stroke="#c78f04" strokeWidth="0.8" />
        {/* joues rosées */}
        <circle cx="35.5" cy="52" r="3.2" fill="#ff7d9c" opacity="0.5" />
        <circle cx="65.5" cy="52" r="3.2" fill="#ff7d9c" opacity="0.5" />
      </g>
    ),
  },
  {
    id: "detective",
    legende: "Hugo détective — l'indice était sous son nez !",
    calque: (
      <g>
        {/* chapeau mou brun */}
        <path d="M 33 19 C 33 8.5 41 4 50.5 4 C 60 4 68 8.5 68 19 L 68 21.5 L 33 21.5 Z" fill="#7a5a38" stroke="#5c421f" strokeWidth="0.8" />
        <path d="M 33 15.8 L 68 15.8 L 68 19 L 33 19 Z" fill="#4a3823" />
        <ellipse cx="50.5" cy="22.5" rx="21" ry="3" fill="#7a5a38" stroke="#5c421f" strokeWidth="0.8" />
        {/* la loupe sur l'œil droit */}
        <circle cx="59.6" cy="39.3" r="10" fill="#bfe3f2" opacity="0.28" stroke="#3a3f45" strokeWidth="2.4" />
        <path d="M 66.8 46.4 L 77.5 57.1" stroke="#3a3f45" strokeWidth="3.6" strokeLinecap="round" />
        <path d="M 55 34.5 L 62 42" stroke="#ffffff" strokeWidth="1.6" opacity="0.7" strokeLinecap="round" />
      </g>
    ),
  },
  {
    id: "magicien",
    legende: "Hugo magicien — le lapin est en congé !",
    calque: (
      <g>
        {/* haut-de-forme à bande rouge */}
        <path d="M 35 1.5 L 66 1.5 L 66 16.5 L 35 16.5 Z" fill="#23242a" />
        <path d="M 35 12.5 L 66 12.5 L 66 16.5 L 35 16.5 Z" fill="#c22e35" />
        <ellipse cx="50.5" cy="18" rx="20.5" ry="3.1" fill="#23242a" />
        <ellipse cx="50.5" cy="1.5" rx="15.5" ry="2" fill="#34353d" />
        {/* étoiles magiques */}
        <path d="M 26 34 l 1.4 3 3 1.4 -3 1.4 -1.4 3 -1.4 -3 -3 -1.4 3 -1.4 Z" fill="#ffd94d" />
        <path d="M 75 30 l 1.1 2.4 2.4 1.1 -2.4 1.1 -1.1 2.4 -1.1 -2.4 -2.4 -1.1 2.4 -1.1 Z" fill="#ffd94d" />
        {/* baguette à étoile */}
        <path d="M 71 85 L 83.5 66" stroke="#23242a" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M 84.5 58.5 l 1.7 3.6 3.6 1.7 -3.6 1.7 -1.7 3.6 -1.7 -3.6 -3.6 -1.7 3.6 -1.7 Z" fill="#ffd94d" stroke="#c78f04" strokeWidth="0.5" />
      </g>
    ),
  },
  {
    id: "pirate",
    legende: "Hugo en pirate — le trésor, c'est les outils !",
    calque: (
      <g>
        {/* bandana rouge à pois, noué à droite */}
        <path d="M 30 23 C 30 9.5 39.5 3.5 50.5 3.5 C 61 3.5 71 9.5 71 23 L 71 25 L 30 25 Z" fill="#c22e35" />
        <circle cx="40" cy="12" r="1.7" fill="#f6edd9" opacity="0.85" />
        <circle cx="52" cy="8.5" r="1.7" fill="#f6edd9" opacity="0.85" />
        <circle cx="61" cy="15" r="1.7" fill="#f6edd9" opacity="0.85" />
        <circle cx="46" cy="19" r="1.7" fill="#f6edd9" opacity="0.85" />
        <path d="M 71 20 L 79 15.5 L 77.5 24 L 80.5 27.5 L 71.5 28 Z" fill="#a3242b" />
        {/* cache-œil gauche et ses cordons */}
        <path d="M 34.5 33.5 L 24 24.5 M 47.5 45.5 L 57 53" stroke="#26221c" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="41.4" cy="39.7" r="7.6" fill="#26221c" />
        <circle cx="38.8" cy="37" r="1.6" fill="#ffffff" opacity="0.25" />
        {/* boucle d'oreille dorée */}
        <circle cx="73.2" cy="53" r="3.1" fill="none" stroke="#f2b705" strokeWidth="1.7" />
        {/* sourire édenté de vieux loup de mer */}
        <path d="M 44 62.5 L 47.5 62.5 L 47.5 65.8 L 44 65.8 Z" fill="#ffffff" stroke="#cbbfa5" strokeWidth="0.4" />
      </g>
    ),
  },
  {
    id: "roi",
    legende: "Hugo, roi des petits budgets !",
    calque: (
      <g>
        {/* couronne dorée à pointes, joyaux sobres */}
        <path d="M 33 17 L 31.5 3.5 L 41 10.5 L 50.5 1.8 L 60 10.5 L 69.5 3.5 L 68 17 Z" fill="#f2b705" stroke="#c78f04" strokeWidth="0.9" strokeLinejoin="round" />
        <circle cx="31.5" cy="3" r="1.9" fill="#ffd94d" stroke="#c78f04" strokeWidth="0.6" />
        <circle cx="50.5" cy="1.6" r="1.9" fill="#ffd94d" stroke="#c78f04" strokeWidth="0.6" />
        <circle cx="69.5" cy="3" r="1.9" fill="#ffd94d" stroke="#c78f04" strokeWidth="0.6" />
        <path d="M 33 17 L 68 17 L 68 20.5 L 33 20.5 Z" fill="#e09f00" />
        <circle cx="42" cy="13.8" r="1.7" fill="#c22e35" />
        <circle cx="50.5" cy="12.8" r="1.9" fill="#2f5f8f" />
        <circle cx="59" cy="13.8" r="1.7" fill="#2e7d46" />
        {/* sceptre simple, en bas à droite */}
        <path d="M 78 96 L 84 74" stroke="#c78f04" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="85" cy="71" r="3.4" fill="#ffd94d" stroke="#c78f04" strokeWidth="0.8" />
      </g>
    ),
  },
  {
    id: "astronaute",
    legende: "Hugo astronaute — Terrebonne, on a un fou rire !",
    calque: (
      <g>
        {/* le casque : grand anneau autour du visage */}
        <circle cx="50.5" cy="45" r="37.5" fill="#ffffff" opacity="0.07" stroke="#cfd6dd" strokeWidth="3.2" />
        <circle cx="50.5" cy="45" r="33.5" fill="none" stroke="#9aa3ad" strokeWidth="0.9" opacity="0.7" />
        {/* reflet de visière */}
        <path d="M 27 27 C 32 19 41 14.5 50 14" fill="none" stroke="#ffffff" strokeWidth="2.6" opacity="0.55" strokeLinecap="round" />
        {/* boutons du col */}
        <circle cx="33" cy="76.5" r="2.2" fill="#c22e35" stroke="#8e1f24" strokeWidth="0.6" />
        <circle cx="68" cy="76.5" r="2.2" fill="#53c1ff" stroke="#2f7fb8" strokeWidth="0.6" />
        <rect x="44" y="80.5" width="13" height="3.6" rx="1.8" fill="#cfd6dd" stroke="#9aa3ad" strokeWidth="0.6" />
        {/* petite étoile, parce que l'espace */}
        <path d="M 76 20 l 1.2 2.6 2.6 1.2 -2.6 1.2 -1.2 2.6 -1.2 -2.6 -2.6 -1.2 2.6 -1.2 Z" fill="#ffd94d" />
      </g>
    ),
  },
  {
    id: "hockey",
    legende: "Hugo prêt pour le 2 contre 2 !",
    calque: (
      <g>
        {/* casque bleu */}
        <path d="M 30 25 C 30 10.5 39.5 3.5 50.5 3.5 C 61 3.5 71 10.5 71 25 L 71 27.5 L 30 27.5 Z" fill="#2050a0" stroke="#173d7c" strokeWidth="0.8" />
        <path d="M 30 21 L 71 21" stroke="#f6edd9" strokeWidth="1.6" />
        <circle cx="50.5" cy="12" r="2.4" fill="#f6edd9" />
        {/* oreillettes */}
        <rect x="25.8" y="25" width="6.4" height="10" rx="2.6" fill="#173d7c" />
        <rect x="68.8" y="25" width="6.4" height="10" rx="2.6" fill="#173d7c" />
        {/* la grille devant le bas du visage */}
        <rect x="35.5" y="53" width="30" height="26" rx="7" fill="#dfe5ea" opacity="0.16" stroke="#9aa3ad" strokeWidth="1.8" />
        <path d="M 43 54.5 L 43 77.5 M 50.5 54.8 L 50.5 78.5 M 58 54.5 L 58 77.5" stroke="#9aa3ad" strokeWidth="1.5" />
        <path d="M 36.8 61.5 L 64.2 61.5 M 36.8 69.5 L 64.2 69.5" stroke="#9aa3ad" strokeWidth="1.5" />
      </g>
    ),
  },
  {
    id: "scientifique-fou",
    legende: "Hugo en scientifique fou — ça va péter… de rire !",
    calque: (
      <g>
        {/* cheveux gris dressés en pointes */}
        <path d="M 29 26 L 24 10 L 31 16 L 30 2 L 38 11 L 41 0.5 L 47 9 L 52 1 L 57 9.5 L 63 2 L 66 12 L 73 6 L 71 18 L 76 13 L 72 27 C 60 20 41 20 29 26 Z" fill="#e8e8e8" stroke="#b9b9b9" strokeWidth="0.8" strokeLinejoin="round" />
        {/* lunettes de protection */}
        <path d="M 27 37.5 L 74 37.5" stroke="#3a3f45" strokeWidth="2.6" />
        <rect x="31.5" y="32.5" width="19" height="13" rx="4" fill="#a8e6f0" opacity="0.35" stroke="#3a3f45" strokeWidth="1.9" />
        <rect x="50.5" y="32.5" width="19" height="13" rx="4" fill="#a8e6f0" opacity="0.35" stroke="#3a3f45" strokeWidth="1.9" />
        {/* petit éclair d'expérience */}
        <path d="M 82 44 L 76.5 54 L 80.5 54 L 75.5 65 L 86 52.5 L 81.8 52.5 L 86.5 44 Z" fill="#ffd94d" stroke="#c78f04" strokeWidth="0.6" />
        {/* fiole qui bouillonne, en bas à gauche */}
        <path d="M 17 82 L 20.5 82 L 20.5 88 L 26 97.5 C 26.6 99 25.4 100 23.8 100 L 12.2 100 C 10.6 100 9.4 99 10 97.5 L 15.5 88 L 15.5 82 L 19 82" fill="#bfe3f2" opacity="0.5" stroke="#4d7ea6" strokeWidth="0.9" transform="translate(2 -1)" />
        <circle cx="17" cy="94" r="1.3" fill="#57b96b" />
        <circle cx="21.5" cy="96.5" r="1" fill="#57b96b" />
      </g>
    ),
  },
  {
    id: "super-heros",
    legende: "Hugo en super-héros — son pouvoir : les outils pour la vraie vie !",
    calque: (
      <g>
        {/* la cape, aux épaules */}
        <path d="M 4 100 L 6 74 C 12 84 16 92 18.5 100 Z" fill="#c22e35" />
        <path d="M 97 100 L 95 74 C 89 84 85 92 82.5 100 Z" fill="#c22e35" />
        {/* le masque bleu autour des yeux (archétype générique) */}
        <path d="M 28.5 33.5 C 38 29.5 45.5 31.5 50.5 35.5 C 55.5 31.5 63 29.5 72.5 33.5 L 72.5 43.5 C 63.5 48 57 45.8 50.5 42.5 C 44 45.8 37.5 48 28.5 43.5 Z" fill="#2050a0" stroke="#173d7c" strokeWidth="0.8" />
        <ellipse cx="41.4" cy="39.3" rx="4.4" ry="2.7" fill="#f6edd9" />
        <ellipse cx="59.6" cy="39.3" rx="4.4" ry="2.7" fill="#f6edd9" />
        {/* petit éclair de poitrine, discret */}
        <path d="M 51.5 84 L 47.5 92 L 50 92 L 48 98.5 L 54 90.5 L 51.2 90.5 L 53.5 84 Z" fill="#ffd94d" stroke="#c78f04" strokeWidth="0.5" />
      </g>
    ),
  },
];
