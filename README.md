# Zooniverse ML Subject Assistant

Machine Learning-assisted web app for processing Zooniverse Subjects.

http://subject-assistant.zooniverse.org/app/

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
- **TODO**

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
