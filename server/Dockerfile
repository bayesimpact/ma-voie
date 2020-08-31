ARG REACT_BASE_TAG
FROM bayesimpact/react-base:${REACT_BASE_TAG:-latest} as dev

COPY server/package.json .
RUN node node_modules/.bin/yarn-lazy-lock && yarn install

COPY server/src src/
COPY .eslintrc.json .eslintignore server/.firebaserc server/firebase.json server/tsconfig.json ./

FROM dev AS test
RUN npm run lint
