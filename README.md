# Nova Immobilier 🏡

Site vitrine moderne pour une agence immobilière, conçu pour présenter des biens à vendre ou à louer et faciliter la prise de contact avec les visiteurs.

## ✨ Présentation

Nova Immobilier propose une expérience web élégante et responsive, avec une identité visuelle sobre basée sur des tons onyx, ivoire et or. Le projet met l'accent sur la présentation des propriétés, une navigation claire et des formulaires accessibles.

## Fonctionnalités

- **Page d'accueil** : présentation de l'agence, biens mis en avant, statistiques, services, témoignages et appels à l'action.
- **Catalogue immobilier** : liste de biens avec filtres par type, statut, ville, nombre de chambres et fourchette de prix.
- **Tri des résultats** : classement par prix ou surface, avec mise en avant des biens sélectionnés.
- **Fiche détaillée d'un bien** : galerie d'images, caractéristiques, informations et biens similaires.
- **Présentation de l'agence** : page À propos et présentation de l'équipe.
- **Services immobiliers** : achat, vente, location et conseil immobilier.
- **Prise de rendez-vous** : parcours de réservation de rendez-vous.
- **Contact** : formulaire de contact.
- **Interface responsive** : mise en page adaptée aux mobiles, tablettes et ordinateurs.
- **Navigation multi-pages** avec React Router et page dédiée aux routes introuvables.
- **Animations discrètes** et respect de la préférence système de réduction des animations.
- **Bases SEO** : titres et descriptions spécifiques aux pages.

> **Note :** les biens et contenus sont fournis par des données locales au frontend dans cette version. Le projet ne comprend pas de backend ou de base de données connectée dans l'archive analysée. Les formulaires doivent être reliés à un service ou à une API pour traiter réellement les demandes en production.

## 🛠️ Technologies utilisées

- **React 18** — interface utilisateur
- **TypeScript** — typage statique
- **Vite** — serveur de développement et build
- **Tailwind CSS** — styles et responsive design
- **React Router** — navigation entre les pages
- **Framer Motion** — animations
- **Lucide React** — icônes
- **HTML5 / CSS3**

## 📁 Structure du projet

```text
nova-immobilier/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── DESIGN_SYSTEM.md
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── routes/          # Définition des routes
    ├── layouts/         # Layout principal
    ├── pages/           # Accueil, biens, services, contact, etc.
    ├── components/      # Composants réutilisables
    ├── data/            # Données locales des biens et contenus
    ├── types/           # Types TypeScript
    └── utils/            # Fonctions utilitaires
```

## 🚀 Installation et lancement

Prérequis : Node.js et npm installés.

1. Cloner ou télécharger le projet.
2. Ouvrir un terminal à la racine du projet.
3. Installer les dépendances :

   ```bash
   npm install
   ```

4. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

5. Ouvrir dans le navigateur l'URL affichée par Vite, généralement `http://localhost:5173`.

## Scripts disponibles

| Commande | Description |
| --- | --- |
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Vérifie les types TypeScript puis génère le build de production |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Lance ESLint |

## Pages principales

| Route | Page |
| --- | --- |
| `/` | Accueil |
| `/biens` | Catalogue des biens immobiliers |
| `/biens/:slug` | Détail d'un bien |
| `/a-propos` | Présentation de l'agence |
| `/services` | Services immobiliers |
| `/contact` | Contact |
| `/rendez-vous` | Prise de rendez-vous |

## 🎨 Identité visuelle

- **Couleurs** : onyx, ivoire et or
- **Titres** : Fraunces
- **Texte courant** : Inter
- **Icônes** : Lucide React
- **Approche** : design responsive, composants réutilisables et animations mesurées

## 📌 Objectif du projet

Ce projet met en pratique la création d'une interface frontend moderne pour une agence immobilière : organisation en composants, navigation multi-pages, filtrage et tri de données, typage TypeScript et conception responsive.

---

**Nova Immobilier** — Projet frontend de démonstration.
