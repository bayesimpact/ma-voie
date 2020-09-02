# Ma Voie Server

Make a simple API for Ma Voie partners to update the relevant info in users.

## Development

To start the server locally, run

```
docker-compose up -d server
```

This will start the API on http://localhost:5001/ma-voie-dev/europe-west1/user

You can also see the emulator UI at http://localhost:4000

## Production

To deploy the server, run

```
docker-compose run --rm server deploy -- --project=prod
```

This deploys the API to Firebase Cloud Functions, and hosts it on api.mavoie.org/user.

The DNS link between Firebase and `api.mavoie.org` is done in the Firebase console `https://console.firebase.google.com/project/ma-voie/hosting/main`, with a DNS A record.

Hosting also deploys the `public` folder on `api.mavoie.org`, where there will soon be documentation for the API.
