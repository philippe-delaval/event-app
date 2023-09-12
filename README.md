# Event App

## Lancer le projet en local

Vous devez avoir d'installé sur votre machine :

- Node (v18+)
- Docker

Lancer l'application :

```bash
npm install
docker compose up
```

À noter qu'il est nécessaire de lancer ces commandes à chaque fois qu'on pull de nouvelles migrations (dossier `migrations`) ou de nouveaux seeds (dossier `seeds`).

```bash
npm i -g knex # À faire si le CLI knex n'est pas installé en local
knex migrate:up
knex seed:run
```
