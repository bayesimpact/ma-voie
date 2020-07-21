# ma-voie-internal
TODO(cyrille): Add a description.

### Running the application locally (development mode)

To run the application locally, just run `docker-compose up -d dev`, then use `http://localhost.ma-voie-dev.bayes.org:9707`.

You may need to work with an HTTPS certificate. Here's how to do it locally

* Get or refresh the SSL certificates files in the `ssl` folder. We use `localhost.ma-voie-dev.bayes.org` as hostname as it can easily be generated/refreshed by our Demo Server:
  * Create or refresh a demo with the specified hostname, the tag does not matter as we only aim to create a server to get the certificate.
  * Download its certificate from the demo server using scp: `scp ma-voie-demo.bayes.org:/etc/ssl/certs/letsencrypt/localhost.ma-voie-dev.bayes.org/*.pem ssl/`
* Update your `/etc/hosts` file and update the line containing `localhost` by appending ` localhost.ma-voie-dev.bayes.org`.
* Develop from [ localhost.ma-voie-dev.bayes.org:9707 ](https://localhost.ma-voie-dev.bayes.org:9707).

We recommend that you install the [React Developr
Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
as well as the [Redux Devtools
extension](https://github.com/zalmoxisus/redux-devtools-extension).

To see the stdout of the WebPack dev server (the one that compiles the jsx into
client Javascript), look at `docker-compose logs dev`.

To test the application on mobile in dev-mode, you may use a tunneling application such as [ngrok](https://ngrok.com/).
Just run `TUNNEL_TESTING=1 docker-compose up -d dev` and attach your tunnel to the `9707` port with http protocol.
For ngrok, this is done by running the command `ngrok http 9707`. Use the url given by your tunnel provider to develop on mobile.

### Deploying the application

The prod application runs on AWS CloudFront, to deploy you need to update the files on the S3 bucket
that is behind.

To deploy properly use the `release/deploy.sh` script.
