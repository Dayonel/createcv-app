# ![CreateCV icon](https://github.com/Dayonel/neverminder-api/assets/10290812/b64fdd09-5297-4cf5-bb68-3d7249a9c147) Create CV

Create a CV and preview it, customize sections, colors and download a PDF. Design your best resume that stands out from the rest and find your dream job.

<img alt="image" src="https://github.com/user-attachments/assets/f4e6b18c-9b48-4b5c-b779-b25c82f023d6" />

<img alt="image" src="https://github.com/user-attachments/assets/e3218495-5141-42e2-b01f-4771f4585435" />

# Edge

This website is deployed on the Edge with a bundle size under 1MB completely free using Cloudflare Workers.

- Frontend in `React`, `Next.js`.
- Authentication with 3 providers `Google`, `Twitter`, `Credentials`.
- SQLite edge database with `drizzle`.
- Advanced drag & drop with `dnd-kit`.
- Forms & validation with `react-hook-form`, `zod`.
- Payments integration with `stripe`.
- Styling with `tailwind`.
- Design system with `carbon`.
- Rich text editing with `tiptap`.
- Email templating with `react-email`.
- Bypass edge-runtime size limits with [Functions](https://github.com/Dayonel/createcv-functions).
- Prototyping with [Figma](https://www.figma.com/design/RYudgWbt0zCdhZPTe0oJva/CreateCV?node-id=0-1&t=vAQSBEIPLc36cNpo-1).

<div align="center">
  <img width="768" height="426" alt="image" src="https://github.com/user-attachments/assets/c33ca27a-8f77-4765-88b2-3aa03134afa6" />
</div>

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
> STRIPE_PRICE_ID=\
> RESEND_API_KEY=\
> FUNCTIONS_EMAIL_URL=

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

# Bundle size

VSCode extension

- Import Cost

Next Bundle Analyzer

```
npm run analyze
```
