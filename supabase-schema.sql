-- ============================================================================
-- PulseWorld OS — Identity, Stripe Connect & Multi-Domain Alias Schema
-- ============================================================================
-- Safe & idempotent to run in Supabase SQL Editor.
-- Works alongside the existing Supabase Stripe Wrapper foreign tables:
--   public."PulseUser"         (Stripe accounts)
--   public."PulseBank"         (Stripe balance)
--   public."PulseUserIdentity" (Stripe customers)
-- Does NOT delete any rows or drop any existing columns.
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Ensure public."PulseIdentity" exists with all required columns
CREATE TABLE IF NOT EXISTS public."PulseIdentity" (
  "userID" UUID DEFAULT gen_random_uuid(),
  email TEXT,
  name TEXT,
  "stripeID" TEXT,
  created TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW(),
  attrs JSONB DEFAULT '{}'::jsonb,
  "lastUpdated" TIMESTAMP WITHOUT TIME ZONE,
  phone TEXT,
  online BOOLEAN DEFAULT false,
  inactive BOOLEAN DEFAULT false,
  host TEXT,
  "lastOffline" TIMESTAMP WITHOUT TIME ZONE,
  "localId" TEXT,
  proximity TEXT,
  "tetherCode" TEXT,
  "tetherID" TEXT,
  "lastPage" TEXT,
  "lastProximity" TEXT
);

-- 2. Relax overly strict NOT NULL on stripeID & email so initial identity sync
--    works cleanly before Stripe Connect Express onboarding completes.
ALTER TABLE public."PulseIdentity"
  ALTER COLUMN "stripeID" DROP NOT NULL,
  ALTER COLUMN email DROP NOT NULL,
  ALTER COLUMN attrs SET DEFAULT '{}'::jsonb;

-- 3. Add Primary Key on "userID" only if the table doesn't already have one
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conrelid = 'public."PulseIdentity"'::regclass
      AND contype = 'p'
  ) THEN
    UPDATE public."PulseIdentity"
    SET "userID" = gen_random_uuid()
    WHERE "userID" IS NULL;

    ALTER TABLE public."PulseIdentity"
      ADD CONSTRAINT pulse_identity_pkey PRIMARY KEY ("userID");
  END IF;
END $$;

-- 4. Safely deduplicate any existing case-insensitive duplicate names
--    Keeps the newest row untouched and appends a short suffix to older dupes
--    (zero data loss).
WITH ranked AS (
  SELECT
    "userID",
    name,
    ROW_NUMBER() OVER (
      PARTITION BY LOWER(TRIM(name))
      ORDER BY COALESCE("lastUpdated", created, NOW()) DESC, "userID" DESC
    ) AS rn
  FROM public."PulseIdentity"
  WHERE name IS NOT NULL AND TRIM(name) <> ''
)
UPDATE public."PulseIdentity" p
SET
  name = TRIM(p.name) || '-dup-' || SUBSTRING(p."userID"::text FROM 1 FOR 4),
  attrs = COALESCE(p.attrs, '{}'::jsonb) || jsonb_build_object(
    'dedupedFrom', p.name,
    'dedupedAt', NOW()
  )
FROM ranked r
WHERE p."userID" = r."userID"
  AND r.rn > 1;

-- 5. Case-insensitive UNIQUE index on normalized identity name
CREATE UNIQUE INDEX IF NOT EXISTS idx_pulse_identity_name_unique
  ON public."PulseIdentity" (LOWER(TRIM(name)))
  WHERE name IS NOT NULL AND TRIM(name) <> '';

-- 6. Fast lookup index on Stripe Connect ID ("stripeID") for privacy-first pulls
CREATE INDEX IF NOT EXISTS idx_pulse_identity_stripe_id
  ON public."PulseIdentity" ("stripeID")
  WHERE "stripeID" IS NOT NULL AND TRIM("stripeID") <> '';

-- 7. Local browser identity deduplication indexes
CREATE UNIQUE INDEX IF NOT EXISTS idx_pulse_identity_local_id
  ON public."PulseIdentity" ((attrs->>'localId'))
  WHERE attrs ? 'localId' AND COALESCE(attrs->>'localId', '') <> '';

CREATE INDEX IF NOT EXISTS idx_pulse_identity_local_id_col
  ON public."PulseIdentity" ("localId")
  WHERE "localId" IS NOT NULL AND TRIM("localId") <> '';

-- 8. Fast alias handle & alias email lookup indexes for multi-domain email routing
CREATE INDEX IF NOT EXISTS idx_pulse_identity_alias_handle
  ON public."PulseIdentity" (LOWER(TRIM(attrs->>'aliasHandle')))
  WHERE attrs ? 'aliasHandle' AND COALESCE(attrs->>'aliasHandle', '') <> '';

CREATE INDEX IF NOT EXISTS idx_pulse_identity_alias_email
  ON public."PulseIdentity" (LOWER(TRIM(attrs->>'aliasEmail')))
  WHERE attrs ? 'aliasEmail' AND COALESCE(attrs->>'aliasEmail', '') <> '';

CREATE INDEX IF NOT EXISTS idx_pulse_identity_created
  ON public."PulseIdentity" (created DESC);

-- 9. Keep RLS enabled: browser clients never query Postgres directly;
--    Netlify functions use SUPABASE_SERVICE_ROLE_KEY which bypasses RLS.
ALTER TABLE public."PulseIdentity" ENABLE ROW LEVEL SECURITY;
