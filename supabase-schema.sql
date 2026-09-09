-- PulseWorld OS — identity persistence schema
-- Safe to run in Supabase SQL Editor. It uses the existing Stripe-wrapper
-- identity table; it does not create a second pulse_users table.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS public."PulseIdentity" (
  "userID" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT,
  name TEXT,
  "stripeID" TEXT,
  created TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  attrs JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Earlier projects can have the table but not every supporting field.
ALTER TABLE public."PulseIdentity"
  ADD COLUMN IF NOT EXISTS email TEXT,
  ADD COLUMN IF NOT EXISTS name TEXT,
  ADD COLUMN IF NOT EXISTS "stripeID" TEXT,
  ADD COLUMN IF NOT EXISTS created TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  ADD COLUMN IF NOT EXISTS attrs JSONB NOT NULL DEFAULT '{}'::jsonb;

-- The browser's local identity id is stored in attrs.localId. This makes
-- repeated background writes update the same database row.
CREATE UNIQUE INDEX IF NOT EXISTS idx_pulse_identity_local_id
  ON public."PulseIdentity" ((attrs->>'localId'))
  WHERE attrs ? 'localId';

CREATE INDEX IF NOT EXISTS idx_pulse_identity_created
  ON public."PulseIdentity" (created DESC);

-- Browser clients never access this table directly. The Netlify function
-- uses the server-only service-role key, which bypasses RLS.
ALTER TABLE public."PulseIdentity" ENABLE ROW LEVEL SECURITY;
