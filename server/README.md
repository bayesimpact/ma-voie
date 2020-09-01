# Ma Voie Server

Make a simple API for Ma Voie partners to update the relevant info in users.

## Development

To start the server locally, run

```
docker-compose up -d server
```

This will start the API on http://localhost:5001/ma-voie-dev/europe-west1/user

You can also see the emulator UI at http://localhost:4000

To fetch configuration (e.g. basic authentication passwords), run

```
docker-compose run --rm server firebase --project=$project functions:config:get $config
```

Where `$project` is either `prod`, `demo` or `dev`, and `$config` is the config key you want (e.g. `basicauth`).
