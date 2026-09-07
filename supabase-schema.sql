-- ============================================================================
-- PulseWorld OS — Supabase Schema
-- Run this ONCE in your Supabase Dashboard → SQL Editor → New Query
-- ============================================================================

CREATE TABLE IF NOT EXISTS pulse_users (
  pulse_id            TEXT PRIMARY KEY,
  name                TEXT,
  email               TEXT,
  user_email          TEXT,
  username            TEXT,
  phone               TEXT,
  country             TEXT,
  role                TEXT,
  pulse_role          TEXT,
  tier                TEXT,
  pulse_points        INTEGER DEFAULT 0,
  stripe_id           TEXT,
  stripe_url          TEXT,
  token_id            TEXT,
  drift_signature     TEXT,
  photo_url           TEXT,
  alias_photo_url     TEXT,
  biz_photo_url       TEXT,
  biz_alias_photo_url TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Fast admin queries
CREATE INDEX IF NOT EXISTS idx_pulse_users_updated ON pulse_users (updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_pulse_users_email   ON pulse_users (email);
CREATE INDEX IF NOT EXISTS idx_pulse_users_stripe  ON pulse_users (stripe_id);

-- RLS: service_role key bypasses automatically — this locks out direct public access
ALTER TABLE pulse_users ENABLE ROW LEVEL SECURITY;
