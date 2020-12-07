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


## Environment variables

We use https://firebase.google.com/docs/functions/config-env:
To fetch configuration (e.g. basic authentication passwords), run

```
docker-compose run --rm server firebase --project=$project functions:config:get $config
```

Where `$project` is either `prod`, `demo` or `dev`, and `$config` is the config key you want (e.g. `basicauth` or `basicauth.job-ready`).

To (re)create basic authentication passwords for all partners, run

```
docker-compose run --rm server firebase --project=$project functions:config:set $(python server/create_passwords.py)
```

This will change all the passwords for all partners, so don't do it in production, unless you know what you're doing.

## Add a new partner

* Create it in `staticPartners`
* Create its credentials (see paragraph above)
* Add it in the `authorized rules` (in `firestore.rules`)
* Send the credentials to the partner

