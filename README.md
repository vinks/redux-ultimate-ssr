# <div align="center"><img src="https://cloud.githubusercontent.com/assets/697410/26205879/c8e50a8c-3beb-11e7-9073-dc30b504d60a.png" height="250px" alt="Redux Ultimate" /></div>

Starter boilerplate for creating your own  [universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9#.mtjf14xy5) complex app with backend api. It built on the top of [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/),
[Knex](http://knexjs.org/),
[Objection](http://vincit.github.io/objection.js/), [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux) and [React Router v4](https://reacttraining.com/react-router/). Includes all the hot stuff and modern web development tools such as [Webpack 2](https://webpack.js.org/), [Babel](https://babeljs.io/), [PostCSS](https://github.com/postcss/postcss-loader), [React Hot Loader 3](https://github.com/gaearon/react-hot-loader) and [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension).

## Goals

  * Client-side Redux reducer hot reloading
  * Server-side Redux reducer hot reloading
  * Client-side React component hot reloading
  * Server-side React component hot reloading
  * Server-side express routes hot reloading
  * Using mostly ES6 module syntax, except where dynamic loading is needed
  * Data fetching through a remote or local API
  * Multiple pages via Routing
  * Backend rest API

## Requirements

* [node](https://nodejs.org/en/) >= 5.0
* [npm](https://www.npmjs.com/) >= 3.0

## Getting Started

**1. You can start by clone the repository on your local machine by running:**

```bash
git clone https://github.com/vinks/redux-ultimate-ssr.git
cd redux-ultimate-ssr
```

**2. Install all of the dependencies:**

```bash
yarn install
```

**3. Populate development database:**

```bash
yarn migrate
yarn seed
```

**4. Populate production database:**

```bash
yarn migrate:prod
yarn seed:prod
```

**5. Start to run it:**

```bash
yarn start:production    # Building bundle and running production server
```

**6. Begin develop:**

```bash
yarn start  # You need run yarn run build at first run
```

## NPM Script Commands
 All of the scripts are listed as following:

`yarn <script>`|Description
------------------|-----------
`start`|Run your app on the development server at `localhost:3000`. HMR will be enabled.
`start:production`|Bundles the app to `./build` and run it on the production server at `localhost:8080`.
`start:prod`|Run your app on the production server only at `localhost:8080`.
`build`|Remove the previous client and server bundled stuff and bundle them to `./build`.
`build:client`|Remove the previous client bundled stuff and bundle it to `./build/public/assets`.
`build:server`|Remove the previous server bundled stuff and bundle it to `./build`.
`lint`|Lint all `.js` and `.scss` files.
`lint:js`|Lint all `.js` files.
`lint:style`|Lint all `.scss` files.
`test`|Run testing once (with code coverage reports).
`clean:all`|Remove the client/server bundled stuff and the coverage report.
`clean:client`|Remove the `./build/public/assets` folder to clean the client bundled stuff.
`clean:server`|Remove the server bundled stuff from the `./build` folder.
`clean:test`|Remove the `./coverage` folder to clean the code coverage report.
`migrate`|Runs migrations for development db.
`rollback`|Rollback development db migrations
`seed`|Seed development database
`migrate:prod`|Runs migrations for production db.
`rollback:prod`|Rollback production db migrations
`seed:prod`|Seed production database
