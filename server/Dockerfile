ARG REACT_BASE_TAG
FROM bayesimpact/react-base:${REACT_BASE_TAG:-latest} as base

COPY server/package.json .
RUN node node_modules/.bin/yarn-lazy-lock && yarn install

FROM base as dev

COPY .eslintrc.json .eslintignore server/.firebaserc server/entrypoint.sh server/firebase.json server/firestore.indexes.json server/firestore.rules server/tsconfig.json ./
COPY server/src src/

FROM base AS test
RUN apt-get update -qqy && apt-get install -qqy jq openjdk-8-jdk-headless && \
  node_modules/.bin/firebase emulators:exec --only firestore 'echo "Emulator preloaded"'

COPY .eslintrc.json .eslintignore server/.firebaserc server/clean_dependencies.sh server/entrypoint.sh server/firebase.json server/firestore.indexes.json server/firestore.rules server/tsconfig.json ./
COPY server/src src/
COPY server/test test/

RUN npm run lint
RUN npm run build
RUN npm run test
RUN ./clean_dependencies.sh
