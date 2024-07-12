# ![CreateCV icon](https://github.com/Dayonel/neverminder-api/assets/10290812/b64fdd09-5297-4cf5-bb68-3d7249a9c147) Create CV

Create a CV and preview it, customize sections, colors and download a PDF. Design your best resume that stands out from the rest and find your dream job.

## Installation

Install [Nodejs](https://nodejs.org/en/download/prebuilt-installer/current)

- Version at least >=20

## Configration

Create `env.local` file with these settings

> AUTH_SECRET=\
> AUTH_GITHUB_ID=\
> AUTH_GITHUB_SECRET=\
> AUTH_GOOGLE_ID=\
> AUTH_GOOGLE_SECRET=\
> AUTH_TWITTER_ID=\
> AUTH_TWITTER_SECRET=\
> NEXT_PUBLIC_SITE_URL=\
> NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=\
> STRIPE_SECRET_KEY=\
> STRIPE_PRICE_ID=

## Run

```bash
npm i
```

```bash
npm run dev
```

## Build

To build a production version run

```bash
npm build
```

```bash
npm run start
```

## Database

Add a migration

```bash
npx drizzle-kit generate
```

Apply a migration

```bash
# Locally
npx wrangler d1 migrations apply createcv --local

# Remote
npx wrangler d1 migrations apply createcv --remote
```

Generate bindings

```bash
npx wrangler types
```
