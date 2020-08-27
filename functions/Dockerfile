ARG REACT_BASE_TAG
FROM bayesimpact/react-base:${REACT_BASE_TAG:-latest} as dev

COPY functions/package.json .
RUN node node_modules/.bin/yarn-lazy-lock && yarn install

COPY functions/src src/
COPY .eslintrc.json .eslintignore custom.d.ts functions/tsconfig.json ./

FROM dev AS test
RUN npm run lint
