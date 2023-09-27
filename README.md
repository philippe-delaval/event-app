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

Ensuite, les services web suivants deviennent accessibles :

- Le front [NextJS](https://nextjs.org/docs) sur http://localhost:3000
- L'administrateur de base de données [Adminer](https://www.adminer.org/) sur http://localhost:8080
- L'intercepteur d'emails [Mailcatcher](https://mailcatcher.me/) sur http://localhost:1080
