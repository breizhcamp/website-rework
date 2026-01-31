# Site BreizhCamp

Le site Web du BreizCamp est un site statique, généré avec [Svelte](https://svelte.dev/). Svelte est un framework web qui utilise un compilateur pour vous permettre d'écrire des composants concis, en utilisant les API natives des langages que vous connaissez déjà - HTML, CSS et JavaScript !

La majorité des contenus est écrite en Markdown. Il est facile d'y contribuer directement depuis l'interface de GitHub.

Ami·es du BreizhCamp, n'hésitez pas à proposer des PR si vous voulez améliorer ce site!

Pour lancer le site sur votre machine, Vous pouvez

- soit installer Node.js et pnpm,
- soit utiliser l'image Docker si vous ne souhaitez pas déployer ces outils directement sur votre OS.

## Développement avec Node.js et pnpm

### Installer node.js et pnpm

**1. Cloner le projet **

```sh
git clone git@github.com:breizhcamp/website-rework.git
```

**2. Installer Node.js **

https://nodejs.org/fr/download

**3. Installer pnpm **

```sh
corepack enable pnpm
```

### Installer les dépendances

```sh
cd website-rework
pnpm i
```

### Démarrer le site en local

```sh
pnpm dev
```

Le site sera accessible sur l'url http://localhost:5173 et va s'ouvrir automatiquement dans le navigateur par défaut.

### Générer le site statique et le lancer en local

```sh
pnpm build
pnpm preview
```

Le site sera accessible sur l'url http://localhost:4173 et va s'ouvrir automatiquement dans le navigateur par défaut.

## Développement avec Docker

**Prérequis** : Docker ou un équivalent (Podman, Colima, etc)

**1. Cloner le projet **

```sh
git clone git@github.com:breizhcamp/website-rework.git
```

**2. Construire l'image Docker**

```sh
cd website-rework
make docker-image
```

**3. Lancer le serveur de développement**

```sh
make docker-dev
```

Le site sera accessible sur l'URL http://localhost:5173.

### Générer le site statique et le lancer en local

```sh
make docker-build
```

Le site généré sera accessible sur l'URL http://localhost:4173.

## Contribution

Les évolutions sont les bienvenues. Merci d'en discuter avec l'équipe du BreizhCamp en direct ou via une issue avant.

Vous pouvez forker le repo et ouvrir une PR. Au moment du commit, des actions automatiques seront déclenchées : formatage, vérification de syntaxe, etc.

## Actions classiques

### Ouverture / Fermeture du CFP

### Ouverture / Fermeture de la billetterie

### Récupération des talks pour le programme

## Mise en production
