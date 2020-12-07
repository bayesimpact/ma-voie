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

To **fetch configuration** (e.g. basic authentication passwords), run

```
docker-compose run --rm server firebase --project=$project functions:config:get $config
```

Where `$project` is either `prod`, `demo` or `dev`, and `$config` is the config key you want (e.g. `basicauth` or `basicauth.job-ready`).

To (re)create basic authentication passwords **for all partners**, run

```
docker-compose run --rm server firebase --project=$project functions:config:set $(python server/create_passwords.py)
```

This will change all the passwords for all partners, so don't do it in production, unless you know what you're doing.

If you need to set **for one partner**:

```
docker-compose run --rm server firebase --project=$project functions:config:set $credentials
```
Where credentials are the one of the partner, e.g `basicauth.job-ready=passwordForThisPartner`

## Add a new partner

* Create it in `staticPartners`
* Create it in `partners.json` file
* Generate random credentials with this command: `python3 server/create_passwords.py` (extract the key of the concerning partner - launch it twice to get 2 credentials: 1 demo and 1 dev)
* Add the credentials to the right environment (see above)
* Add the partner in the `authorized rules` (in `firestore.rules`)
* Send the credentials to the partner for demo / prod

