# app-template

Boilerplate NextJS application with wallet integration (using Rainbowkit), mongodb, and Node server API.


## Installation

First install mongo, node, and pnpm.


## Setup mongo

mongo setup users and db


## Edit environment variables

modify .env files

## Install apps

Install the Next app.

	cd next-app
	pnpm install

And API.

	cd api
	pnpm install


# Building

Run the Next app in dev mode
	
	cd next-app
	pnpm dev

While developing the Next app, you can check for typescript errors using `pnpx tsc --noEmit --incremental`.

When a production version is ready, run:

	pnpm build

# Deployment

Install pm2.

	pnpm install -g pm2

Start the API and Next App.

	pm2 start pnpm --name "api" -- start
	pm2 start pnpm --name "next-app" -- start

