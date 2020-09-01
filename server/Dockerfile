ARG REACT_BASE_TAG
FROM bayesimpact/react-base:${REACT_BASE_TAG:-latest} as dev

COPY server/package.json .
RUN node node_modules/.bin/yarn-lazy-lock && yarn install

COPY .eslintrc.json .eslintignore server/.firebaserc server/entrypoint.sh server/firebase.json server/tsconfig.json ./
COPY server/src src/

FROM dev AS test
RUN npm run lint
