# Zooniverse ML Subject Assistant

In short: Machine Learning-assisted web app for processing Zooniverse Subjects.

In long: the Subject Assistant aims to provide (wildlife camera trap-based)
project owners an optional Machine Learning-assisted (ML) step in the Subject
upload pipeline. Powered by external ML services, project owners can, for
example, identify wildlife in photos before passing the difficult ones to
volunteers.

https://subject-assistant.zooniverse.org/

- The Subject Assistant is just the front-end that easily allows Zooniverse
  project owners to submit their Zooniverse Subjects to certain ML services,
  and pull the results for further processing.
- The ML services are external to this project.
- This repo also contains the Proxy Server, which allows the Subject Assistant
  (on a `*.zooniverse.org` domain) to download data from non-Zooniverse domains
  (i.e. the external ML services), without running into CORS errors.
- This repo is closely related to [Hamlet](https://github.com/zooniverse/hamlet),
  which is what actually uploads Subjects to external ML services. (It's a
  multi-step process that can probably optimised, but for now it works.)

**2021/22 Local Development Notes**

The current code is optimised for deployment, so some workarounds are required
to get the Subject Assistant (and the Proxy Server) working on localhost.
- ~~Since `https://hamlet-staging.zooniverse.org/` points to `production` and
  doesn't have a `staging` equivalent (despite its name!), local development
  **also points to production** (!!!)~~
  - Update: since late 2022, we now have `https://hamlet.zooniverse.org` which
    points to production. `hamlet-staging` now points to staging.
- `npm start` now sets ENV=production
- The Zooniverse oAuth app now allows `localhost` as a return URL. (This should
  be enabled/disabled as necessary!)
- On local, the Subject Assistant runs on HTTPS (for auth security) but the
  Proxy Server runs on HTTP (because there's no easy self-hosted SSL solution
  for Node.js scripts, AFAIK). To allow mixed-content, the local testing must
  be done on `localhost:3000` (and `localhost:3666`), not the usual alias of
  `local.zooniverse:3000`. This is because Chrome & Firefox are much more
  forgiving of mixed-content on `localhost` than on other domains.

**2023 Deployment Notes**

- ❗ Reminder: devs need to **manually run** `npm run build` to update the
  `/app` directory, which then gets published on GitHub pages. (See Dev Notes,
  How To Deploy.)
- As the Zooniverse team has gotten used to automated deployment for (almost)
  all of its front end repos, Subject Assistant might not behave as expected due
  to its manual deployment process. There's room for improvement here.

## Usage

Intended Users:
- Zooniverse Project Owners.

Intended Purpose:
- This web app is an experiment to see if Machine Learning systems can improve
  the quality of Subjects uploaded by science teams to the Zooniverse platform.

Intended Usage:
- The web app should allow Zooniverse project owners to process their
  Zooniverse Subjects (of wildlife camera trap images) through a Machine
  Learning (ML) service.
- These Subjects are then tagged with ML-derived metadata.
- The Subjects (or a user-selected subset) + their ML-data can then be sent to
  various endpoints: for example, to a "fast retirement" Zooniverse workflow,
  or exported as a CSV for further external processing.

Requires:
- a modern web browser (e.g. Chrome 75+, Firefox 67+) and an Internet connection
- a familiarity with the [Zooniverse](https://www.zooniverse.org) crowdsourced
  research platform
- preferably, a Zooniverse project that has already been set up with Subjects
  featuring images of animal from camera traps.

How to Use:
- Instructions are on the web app.

## Dev Notes

Project Type:
- HTML/JavaScript website/web app
- plus simple node proxy server

Intended Developers:
- Web developers (HTML/JS) who are sorta familiar with the [Zooniverse](https://github.com/zooniverse/)
  dev environment.

Requires:
- `npm` - the Node Package Manager, usually installed together with [Node](https://nodejs.org/)

Project Overview:
- The Front End app...
  - is the main user-facing app.
  - requires the Proxy Server in a live production environment to overcome CORS security issues.
  - has its code stored in `/src`
  - is hosted on GitHub Pages
  - has a custom domain of `http://subject-assistant.zooniverse.org/`
  - can be run locally by running `npm run start`
  - is built by running `npm run build` and auto-deployed on GitHub Pages as soon as changes are merged to `master`.
- The Proxy Server...
  - exists to pass information between the front end and the ML servers, to bypass the CORS security issues that prevents data fetches between different domains.
  - is purely server-side, and is used to hide secrets from the user-facing front end.
  - has its code stored in `/server`
  - is auto-deployed to our Kubernetes systems (via Jenkins, presumably) as soon as changes are merged to `master`
  - has a lot of implicit auto-deploy code set up in the `/kubernetes`

NOTE:
- By default, the Front End looks for the Proxy Server at `https://subject-assistant-proxy.zooniverse.org/`

How to Setup:
- Clone this Github repo into you computer.
- Open your favourite command line interface (CLI) such as `bash`.
- Navigate to this project's directory.
- Run `npm install` to install all the dependencies for this project.
- Run `npm start` to start the front end web app
- Run `npm run proxy-server` to start the proxy server on `http://localhost:3666`
- Visit the web app `http://localhost:3000`
- Configure the web app (via `http://localhost:3000/#/config`) to find the proxy server

How to Deploy:
- Create a branch and open a PR in this repo
- make your changes, then run `npm run build` to update the production code for the Front End
- update the PR and merge
- changes will be auto-deployed

External dependencies:
- GitHub Pages for hosting Front End app
- Zooniverse Kubernetes system for hosting Proxy Server
- Both set up to use `*.zooniverse.org` domain names.

Environmental (ENV) Config Values:
- `ORIGINS`: acceptable Zooniverse domains, which the Proxy Server accepts
  requests from. e.g. `ORIGINS=https://subject-assistant.zooniverse.org/`
- `TARGETS`: acceptable external domains/URLs, which the Proxy Server will send
  requests to. e.g. `TARGETS=http://example.com/;http://www.example.com/`
- `URL_FOR_MSML`: URL for the Microsoft Megadetector ML service. Used by the Proxy Server.
  - Note: as of 2022, the Megedetector ML service is now being hosted on the Zooniverse. The following vars supersede URL_FOR_MSML:
    - `CAMERA_TRAPS_API_SERVICE_HOST`: hostname for the Zooniverse-hosted Megadetector ML service.
    - `CAMERA_TRAPS_API_SERVICE_PATH`: path of the Zooniverse-hosted Megadetector ML service. 
- `PROXY_HOST`: URL of the Proxy Server. Used by the Subject Assistant to find
  the proxy. Can be overwritten via the Subject Assistant's in-app config.
