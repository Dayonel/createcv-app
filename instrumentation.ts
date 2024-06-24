import { D1Database, up } from '@auth/d1-adapter';

export interface Env {
  // If you set another name in wrangler.toml as the value for 'binding',
  // replace "DB" with the variable name you defined.
  DB: D1Database;
}

export async function register() {
  await up(process.env.DB);
}
