# Design System — Nova Immobilier

Document de référence pour l'identité visuelle du site. Toute la configuration
vit dans `tailwind.config.ts` et `src/index.css` ; ce fichier en donne une
lecture rapide.

## 1. Couleurs

| Rôle | Token | Usage |
|---|---|---|
| Sombre principal | `onyx-800` / `onyx-900` | Navbar, footer, boutons primaires, titres |
| Clair / ivoire | `ivory-50` / `ivory-100` / `ivory-200` | Fond de page, fond de sections, fond de cards |
| Accent | `gold-500` (+ `gold-600/700` pour hover/texte) | CTA secondaire, focus, badges, liens actifs, eyebrows |
| Texte neutre / bordures | `stone-*` (natif Tailwind) | Texte courant, bordures de champs, textes secondaires |

Volontairement 3 familles de couleurs custom seulement (onyx / ivory / gold),
complétées par le gris chaud natif `stone` — pour rester sobre et ne jamais
ressembler à un template générique multicolore.

## 2. Typographie

- **Display / titres** : `Fraunces` (serif à fort caractère) — Hero, H1, H2, H3
- **Texte courant** : `Inter` (sans-serif très lisible) — body, labels, boutons, formulaires

Classes sémantiques prêtes à l'emploi (`src/index.css`) :
`.text-display` · `.text-h1` · `.text-h2` · `.text-h3` · `.text-body` ·
`.text-body-lg` · `.text-small` · `.text-label` · `.text-eyebrow` · `.text-button`

Toutes sont responsives (taille réduite sur mobile, pleine taille à partir de `lg`).

## 3. Spacing & rythme

- Rythme vertical des sections : classe `.section-padding` (`py-16` → `py-28` selon l'écran)
- Padding horizontal du contenu : géré par `Container`, jamais de contenu collé aux bords

## 4. Container

Composant `Container` avec 4 largeurs : `sm` (texte/formulaires), `md`,
`lg` (grilles de biens, défaut), `full`. Marges latérales responsives
intégrées (`px-4` → `px-8`).

## 5. Boutons

Composant `Button` : 4 variantes (`primary`, `secondary`, `outline`, `ghost`)
× 3 tailles (`sm`, `md`, `lg`). États hover/focus-visible/active/disabled
gérés nativement ; micro-translation au survol désactivée si
`prefers-reduced-motion` est actif.

## 6. Badges

Composant `Badge` : 5 variantes (`sale`, `rent`, `exclusive`, `new`,
`favorite`) correspondant à "À vendre / À louer / Exclusivité / Nouveau /
Coup de cœur". Reste dans la palette onyx/gold/ivory.

## 7. Formulaires

Composants `Input`, `Textarea`, `Select` (+ wrapper interne `FormField`
pour label/erreur/aide). États géré : focus (anneau gold), erreur (bordure
rouge + message `role="alert"`), disabled (fond gris, curseur désactivé).

À prévoir à l'étape formulaires complets : un composant `Checkbox` suivra
la même logique visuelle (case bordée `stone-300`, coché en `gold-500`).

## 8. Iconographie

Une seule bibliothèque : `lucide-react`. Taille standard recommandée :
`h-4 w-4` (contexte texte/boutons) ou `h-5 w-5` (contexte autonome).

## 9. Animations (philosophie, implémentation aux étapes suivantes)

Avec Framer Motion : fade-in, léger slide-up (8–16px), scale très léger
(0.98 → 1), reveal d'image au scroll, stagger sur les listes/grilles.
À éviter : rotations, effets agressifs, animations en boucle infinie.
`prefers-reduced-motion: reduce` est déjà respecté globalement (voir
`src/index.css`), y compris pour les transitions CSS pures des boutons.

## 10. Responsive

Mobile-first, points de repère : 320px (mobile) · 768px `md` (tablette) ·
1024px `lg` (desktop) · 1280px `xl` (large desktop) — alignés sur les
breakpoints natifs de Tailwind.

## 11. Accessibilité

- Anneau de focus visible partout (`:focus-visible`, accent gold)
- Labels associés à chaque champ (`htmlFor` / `id`)
- Erreurs annoncées via `role="alert"` et `aria-invalid`/`aria-describedby`
- Contrastes vérifiés : texte onyx sur ivory, texte gold-700 (pas gold-500)
  sur fond clair pour rester lisible (AA)
