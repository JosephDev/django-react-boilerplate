Universal Django and React/Redux, Webpack boilerplate.

This project is inspired from [Marvin's](https://github.com/workco/marvin) project.

## Table of contents

* [What is this?](#user-content-what-is-this)
* [Features](#user-content-features)
* [Setup](#user-content-setup)
* [Changelog](CHANGELOG.md)

## What is this?

Opinionated boilerplate for kicking off React/Redux on Django project.

Though we can run each django rest framework and react app, this project is created for following reasons;
- Don't want another webserver for React app like Express.js
- Sometimes we have to render html in server(ex: SEO). In this case, Django templates system is a good option.
- Since putting React and Django project in the same domain, we care less about CSRF, CORS and security issues.

This component have following features
- Django and Django [REST framework](http://www.django-rest-framework.org/)
- components (both container/views and regular ones)
- react routes and django routes too!
- reducers (redux + redux-saga)
- actions (both sync and async),
- scss loader
- dummy API
- assets (images + inline SVGs)

## Features

- [x] Django
- [x] Django REST framework
- [x] React
- [x] React router v4
- [x] Redux
- [x] Redux-Saga
- [x] Redux DevTools (you need to have [browser extension](https://github.com/zalmoxisus/redux-devtools-extension) installed)
- [x] Webpack 3 (development and production config)
- [x] Hot Module Replacement
- [x] Immutable reducer data
- [x] Babel - static props, decorators
- [x] SCSS
- [x] Linting
- [x] Git hooks - lint before push
- [x] Tree shaking build
- [x] Import SVGs as React components

## TODO

- [ ] Combine POSTCSS and SCSS
- [ ] Tests

## Setup

* React
`npm install`

* Django
`django-admin.py startproject --template=https://github.com/josephdev/django-react-template/archive/master.zip {{ project_name }}`

## npm tasks

* `server:dev` - starts django server only in development mode (use for testing server responses)
* `start` - starts client app only in development mode, using webpack dev server
* `client:dev` - same as `start`
* `client:build` - builds client application
* `client:preview` - runs client application in *production* mode, using webpack dev server (use for local testing of the client production build)

There are other tasks as well which shouldn't be used on their own.

## Running client in dev mode

```sh
npm run server:dev
npm start
# or
npm run client:dev
```

Visit `http://localhost:3000/` (support hot load) from your browser of choice.
Server is visible from the local network as well.

## Build client (production)

Build will be placed in the `build` folder.

```
npm run client:build
```
after build and you can preview production react build app on `http://localhost:8000/`