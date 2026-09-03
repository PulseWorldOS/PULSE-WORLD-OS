// ============================================================================
//  PulseSkeletalClient-v30-IMMORTAL++
//  THE REAL SQL CLIENT (ENGINE-AGNOSTIC, RESILIENT, METRIC-AWARE)
//  --------------------------------------------------------------------------
//  • SQL Server–first, but engine-pluggable
//  • Deterministic connection + pool lifecycle
//  • Config-driven retries, backoff, circuit breaker
//  • Structured logging + metrics hooks
//  • Future-safe for Postgres/MySQL migration
// ============================================================================

//
//  ██████╗ ██╗   ██╗██╗     ███████╗███████╗██╗    ██╗ ██████╗ ██████╗ ██╗     ██████╗
//  ██╔══██ ██║   ██║██║     ██╔════╝██╔════╝██║    ██║██╔═══██╗██╔══██╗██║     ██╔══██╗
//  ██████  ██║   ██║██║     ███████╗█████╗  ██║ █╗ ██║██║   ██║██████╔╝██║     ██║  ██║
//  ██╔══   ██║   ██║██║     ╚════██║██╔══╝  ██║███╗██║██║   ██║██╔══██╗██║     ██║  ██║
//  ██      ╚██████╔╝███████╗███████║███████╗╚███╔███╔╝╚██████╔╝██║  ██║███████╗██████╔╝
//  ╚╝       ╚═════╝ ╚══════╝╚═════╝ ╚══════╝ ╚══╝╚══╝  ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝


const PulseRealm = globalThis.PulseRealm ?? (globalThis.PulseRealm = {});

async function sql(query, params = {}) {
  const response = await fetch("/.netlify/functions/PULSE-SERVER-SQL.js", {
    method: "POST",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query, params })
  });

  const result = await response.json();
  return result;
}


// ============================================================================
//  ENGINE ENUM
// ============================================================================

export const PulseSqlEngine = {
  SQL_SERVER: "sqlserver",
  POSTGRES: "postgres",
  MYSQL: "mysql",
};

// ============================================================================
//  DEFAULT CONFIG (v30 BEAST MODE)
// ============================================================================

export const DefaultSqlConfigV30 = {
  engine: PulseSqlEngine.SQL_SERVER,

  server: "YOUR-SERVER-IP-OR-HOSTNAME",
  database: "YOUR_DATABASE_NAME",
  user: "YOUR_USERNAME",
  password: "YOUR_PASSWORD",

  pool: {
    max: 100,
    min: 10,
    idleTimeoutMillis: 30000,
    acquireTimeoutMillis: 15000,
  },

  options: {
    encrypt: false,
    trustServerCertificate: true,
    enableArithAbort: true,

    connectionTimeout: 15000,
    requestTimeout: 30000,

    packetSize: 32768,

    isolationLevel: "READ_COMMITTED", // semantic; mapped per engine
    readOnlyIntent: false,
  },

  resiliency: {
    retryAttempts: 3,
    retryDelay: 250,
    jitter: true,
    backoffMultiplier: 2.0,
    circuitBreaker: {
      enabled: true,
      failureThreshold: 5,
      resetAfterMs: 30000,
    },
  },

  logging: {
    verbose: true,
    slowQueryThreshold: 200,
    logger: console, // { log, info, warn, error }
  },

  metrics: {
    enabled: true,
    // onQuery({ sql, durationMs, success, attempt })
    onQuery: null,
    // onError({ sql, error, attempt })
    onError: null,
  },
};

// ============================================================================
//  INTERNAL: RANDOM JITTER
// ============================================================================

function withJitter(baseMs, jitterEnabled) {
  if (!jitterEnabled) return baseMs;
  const delta = baseMs * 0.25;
  const offset = (Math.random() * 2 - 1) * delta;
  return Math.max(0, baseMs + offset);
}

// ============================================================================
//  CircuitBreakerState — IMMORTAL DATA FACTORY
// ============================================================================
export const CircuitBreakerState = ({
  enabled = false,
  failureThreshold = 5,
  resetAfterMs = 30000,
  state = "CLOSED",
  failureCount = 0,
  openedAt = null
}) =>
  Object.freeze({
    enabled,
    failureThreshold,
    resetAfterMs,
    state,          // CLOSED | OPEN | HALF_OPEN
    failureCount,
    openedAt
  });

// ============================================================================
//  CircuitBreaker — IMMORTAL ORGAN
// ============================================================================
export const CircuitBreaker = (() => {

  const lane = {
    enabled: false,
    failureThreshold: 5,
    resetAfterMs: 30000,
    state: "CLOSED",
    failureCount: 0,
    openedAt: null
  };

  const init = (config = {}) => {
    lane.enabled = config.enabled ?? false;
    lane.failureThreshold = config.failureThreshold ?? 5;
    lane.resetAfterMs = config.resetAfterMs ?? 30000;
  };

  const canExecute = () => {
    if (!lane.enabled) return true;

    if (lane.state === "OPEN") {
      const now = PulseRealm.PulseNOW;
      if (now - lane.openedAt >= lane.resetAfterMs) {
        lane.state = "HALF_OPEN";
        return true;
      }
      return false;
    }

    return true;
  };

  const onSuccess = () => {
    if (!lane.enabled) return;
    lane.state = "CLOSED";
    lane.failureCount = 0;
    lane.openedAt = null;
  };

  const onFailure = () => {
    if (!lane.enabled) return;
    lane.failureCount += 1;

    if (lane.failureCount >= lane.failureThreshold && lane.state !== "OPEN") {
      lane.state = "OPEN";
      lane.openedAt = PulseRealm.PulseNOW;
    }
  };

  const snapshot = () => ({ ...lane });

  return { init, canExecute, onSuccess, onFailure, snapshot };
})();


// ============================================================================
//  ENGINE ADAPTER: SQL SERVER (v30)
//  (Postgres/MySQL adapters can be added later with same interface)
// ============================================================================

// ============================================================================
//  SqlServerAdapter — IMMORTAL ORGAN
// ============================================================================
export const SqlServerAdapter = (() => {

  const lane = {
    config: null,
    logger: console,
    pool: null
  };

  const init = (config, logger) => {
    lane.config = config;
    lane.logger = logger || console;
  };

  const connect = async () => {
    if (lane.pool) return lane.pool;

    const cfg = {
      user: lane.config.user,
      password: lane.config.password,
      server: lane.config.server,
      database: lane.config.database,
      pool: lane.config.pool,
      options: { ...lane.config.options }
    };

    lane.pool = await sql.connect(cfg);
    lane.logger.info("🔥 SQL SERVER CONNECTED (IMMORTAL)");
    return lane.pool;
  };

  const query = async (queryString, params = {}) => {
    const pool = await connect();
    const request = pool.request();

    for (const [key, value] of Object.entries(params)) {
      request.input(key, value);
    }

    const result = await request.query(queryString);
    return result.recordset;
  };

  const transaction = async (callback) => {
    const pool = await connect();
    const tx = new sql.Transaction(pool);

    await tx.begin();
    const request = new sql.Request(tx);

    try {
      const result = await callback(request);
      await tx.commit();
      return result;
    } catch (err) {
      await tx.rollback();
      throw err;
    }
  };

  return { init, connect, query, transaction };
})();


// ============================================================================
//  ADAPTER FACTORY
// ============================================================================
export const createAdapter = (config, logger) => {
  switch (config.engine) {
    case PulseSqlEngine.SQL_SERVER:
    default:
      SqlServerAdapter.init(config, logger);
      return SqlServerAdapter;
  }
};


// ============================================================================
//  PULSE SQL CLIENT v30
// ============================================================================
// ============================================================================
//  PulseSqlClientV30 — IMMORTAL ORGAN
// ============================================================================
export const PulseSqlClientV30 = (() => {

  const lane = {
    config: null,
    logger: console,
    adapter: null
  };

  const init = (config = {}) => {
    lane.config = {
      ...DefaultSqlConfigV30,
      ...config,
      pool: { ...DefaultSqlConfigV30.pool, ...(config.pool || {}) },
      options: { ...DefaultSqlConfigV30.options, ...(config.options || {}) },
      resiliency: {
        ...DefaultSqlConfigV30.resiliency,
        ...(config.resiliency || {}),
        circuitBreaker: {
          ...DefaultSqlConfigV30.resiliency.circuitBreaker,
          ...(config.resiliency.circuitBreaker || {})
        }
      },
      logging: {
        ...DefaultSqlConfigV30.logging,
        ...(config.logging || {})
      },
      metrics: {
        ...DefaultSqlConfigV30.metrics,
        ...(config.metrics || {})
      }
    };

    lane.logger = lane.config.logging.logger || console;

    CircuitBreaker.init(lane.config.resiliency.circuitBreaker);
    lane.adapter = createAdapter(lane.config, lane.logger);
  };

  const connect = async () => lane.adapter.connect();

  const query = async (sqlText, params = {}) => {
    if (!CircuitBreaker.canExecute()) {
      const err = new Error("PulseSqlClientV30: circuit breaker OPEN");
      _emitError(sqlText, err, 0);
      throw err;
    }

    const {
      retryAttempts,
      retryDelay,
      jitter,
      backoffMultiplier
    } = lane.config.resiliency;

    const slowThreshold = lane.config.logging.slowQueryThreshold;

    let attempt = 0;
    let delayMs = retryDelay;

    while (attempt < retryAttempts) {
      attempt += 1;
      const start = PulseRealm.PulseNOW;

      try {
        const result = await lane.adapter.query(sqlText, params);
        const durationMs = PulseRealm.PulseNOW - start;

        CircuitBreaker.onSuccess();
        _emitMetrics(sqlText, durationMs, true, attempt);

        if (durationMs >= slowThreshold && lane.config.logging.verbose) {
          lane.logger.warn(
            `🐢 SLOW QUERY (${durationMs}ms, attempt ${attempt}): ${sqlText}`
          );
        }

        return result;
      } catch (err) {
        const durationMs = PulseRealm.PulseNOW - start;
        CircuitBreaker.onFailure();
        _emitMetrics(sqlText, durationMs, false, attempt);
        _emitError(sqlText, err, attempt);

        if (attempt >= retryAttempts) throw err;

        const sleepMs = withJitter(delayMs, jitter);
        if (lane.config.logging.verbose) {
          lane.logger.warn(
            `⚠️ SQL QUERY FAILED (attempt ${attempt}/${retryAttempts}, retrying in ${sleepMs}ms):`,
            err.message
          );
        }

        await new Promise(res => setTimeout(res, sleepMs));
        delayMs *= backoffMultiplier;
      }
    }
  };

  const transaction = async (callback) => {
    if (!CircuitBreaker.canExecute()) {
      const err = new Error("PulseSqlClientV30: circuit breaker OPEN (transaction)");
      _emitError("[TRANSACTION]", err, 0);
      throw err;
    }

    const start = PulseRealm.PulseNOW;
    try {
      const result = await lane.adapter.transaction(callback);
      const durationMs = PulseRealm.PulseNOW - start;
      CircuitBreaker.onSuccess();
      _emitMetrics("[TRANSACTION]", durationMs, true, 1);
      return result;
    } catch (err) {
      const durationMs = PulseRealm.PulseNOW - start;
      CircuitBreaker.onFailure();
      _emitMetrics("[TRANSACTION]", durationMs, false, 1);
      _emitError("[TRANSACTION]", err, 1);
      throw err;
    }
  };

  const _emitMetrics = (sqlText, durationMs, success, attempt) => {
    if (!lane.config.metrics.enabled) return;
    if (typeof lane.config.metrics.onQuery === "function") {
      try {
        lane.config.metrics.onQuery({
          sql: sqlText,
          durationMs,
          success,
          attempt
        });
      } catch {}
    }
  };

  const _emitError = (sqlText, error, attempt) => {
    if (lane.config.logging.verbose) {
      lane.logger.error(
        `❌ SQL ERROR (attempt ${attempt}): ${sqlText}`,
        error
      );
    }
    if (typeof lane.config.metrics.onError === "function") {
      try {
        lane.config.metrics.onError({
          sql: sqlText,
          error,
          attempt
        });
      } catch {}
    }
  };

  return { init, connect, query, transaction };
})();

PulseRealm.TranslatorSkeletalClient = {
  PulseSqlClientV30,
  SqlServerAdapter,
  CircuitBreaker,
  CircuitBreakerState,
  DefaultSqlConfigV30,
  PulseSqlEngine
}

// ============================================================================
//  WHY SQL SERVER IS PERFECT FOR YOUR 2025++ BEAST HARDWARE
// ============================================================================
//
//  • Best ACID engine
//  • Best transaction model
//  • Best stored procedure engine
//  • Best query optimizer
//  • Best indexing system
//  • Best deterministic behavior
//  • Perfect for enterprise-grade workloads
//  • Perfect for LAN-based high-speed servers
//
//  Your hardware LOVES SQL Server.
// ============================================================================




// ============================================================================
//  WHY YOU *MIGHT* SWITCH TO MYSQL SOMEDAY
// ============================================================================
//
//  • Cheap hosting
//  • Easy deployment
//  • Lightweight
//  • Fast simple reads
//  • Works everywhere
//
//  But:
//    - Weak transactions
//    - Weak stored procedures
//    - Weak optimizer
//    - Weak JSON
//
//  MySQL is a sports car.
//  SQL Server is a tank.
// ============================================================================




// ============================================================================
//  WHY YOU *MIGHT* SWITCH TO POSTGRES SOMEDAY
// ============================================================================
//
//  • Best JSON support (jsonb)
//  • Best concurrency model
//  • Best indexing (GIN/GiST/BRIN)
//  • Best open-source ACID engine
//  • Best for cloud/distributed systems
//  • Best for AI workloads
//
//  Postgres is the modern king.
// ============================================================================




// ============================================================================
//  FINAL NOTES FOR FUTURE YOU
// ============================================================================
//
//  • THIS FILE IS THE SQL CLIENT.
//  • THIS FILE CONNECTS.
//  • THIS FILE RUNS.
//  • THIS FILE EXECUTES.
//  • THIS FILE IS THE ENGINE.
//  • THIS FILE IS THE ADAPTER.
//  • THIS FILE IS THE SKELETON.
//
//  If you ever switch engines:
//    - Keep this file as reference.
//    - Swap the connection logic.
//    - Keep the organism untouched.
//
// ============================================================================
// ============================================================================
//  SQL SERVER 2026 INSTANCE SETTINGS (EXPLAINED LIKE YOU KNOW NOTHING)
// ============================================================================
//
//  These are NOT JavaScript settings.
//  These are NOT Node settings.
//  These are NOT config settings.
//
//  THESE ARE THE REAL SETTINGS INSIDE SQL SERVER ITPulseRealm.
//
//  You change these in:
//    • SQL Server Management Studio (SSMS)
//    • or by running the T-SQL commands shown
//
//  WHY THIS SECTION EXISTS:
//  ------------------------
//  Because SQL Server has 100+ settings, and 90% of them are useless.
//  These are the 30 that ACTUALLY MATTER for performance, stability,
//  concurrency, and making your organism FAST and DETERMINISTIC.
//
//  I explain each one in PLAIN ENGLISH so you understand EXACTLY what it does.
// ============================================================================




// ---------------------------------------------------------------------------
// 1. MAXDOP (MAX DEGREE OF PARALLELISM)
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   How many CPU cores SQL Server is allowed to use for ONE query.
//
// WHY IT MATTERS:
//   If SQL Server uses ALL your cores for ONE query, everything else freezes.
//
// WHAT TO SET:
//   On a modern multi-core server: MAXDOP = 8
//
// HOW TO SET IT:
//   EXEC sp_configure 'max degree of parallelism', 8;
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 2. COST THRESHOLD FOR PARALLELISM
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server decides when to use multiple CPU cores.
//   The default value (5) is from the year 1998.
//
// WHY IT MATTERS:
//   With modern CPUs, SQL Server goes parallel WAY too often.
//
// WHAT TO SET:
//   50–100 is ideal for modern hardware.
//
// HOW TO SET:
//   EXEC sp_configure 'cost threshold for parallelism', 75;
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 3. MAX SERVER MEMORY
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server will eat ALL RAM unless you cap it.
//
// WHY IT MATTERS:
//   If SQL Server takes all RAM, Windows dies, everything crashes.
//
// WHAT TO SET:
//   Leave 4–8GB for Windows.
//
// EXAMPLE FOR 64GB SERVER:
//   EXEC sp_configure 'max server memory', 56000;
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 4. TEMPDB CONFIGURATION
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   TempDB is SQL Server’s “scratch pad” — it uses it CONSTANTLY.
//
// WHY IT MATTERS:
//   If TempDB is slow, EVERYTHING is slow.
//
// WHAT TO DO:
//   • Use MULTIPLE TempDB files (1 per CPU core up to 8)
//   • All files same size
//   • Enable Instant File Initialization
//   • Pre-size TempDB so it never autogrows
//
// RESULT:
//   MASSIVE performance boost.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 5. INSTANT FILE INITIALIZATION
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Lets SQL Server grow files instantly instead of slowly zeroing them out.
//
// WHY IT MATTERS:
//   Without this, SQL Server pauses for seconds/minutes during growth.
//
// HOW TO ENABLE:
//   Windows Local Security Policy → "Perform volume maintenance tasks"
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 6. AUTO-GROWTH SETTINGS
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   How SQL Server grows data/log files.
//
// WHY IT MATTERS:
//   Default settings grow in tiny chunks → fragmentation → slow DB.
//
// WHAT TO SET:
//   • Data files: grow by 512MB
//   • Log files: grow by 256MB
//
// NEVER USE PERCENTAGE GROWTH.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 7. SNAPSHOT ISOLATION + READ COMMITTED SNAPSHOT
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   A modern concurrency model (MVCC).
//
// WHY IT MATTERS:
//   Prevents blocking and deadlocks.
//   Makes reads NOT block writes.
//   Makes writes NOT block reads.
//
// WHAT TO SET:
//   ALTER DATABASE YourDB SET ALLOW_SNAPSHOT_ISOLATION ON;
//   ALTER DATABASE YourDB SET READ_COMMITTED_SNAPSHOT ON;
//
// RESULT:
//   Your organism becomes smooth and non-blocking.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 8. QUERY STORE
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server’s “black box recorder” for query performance.
//
// WHY IT MATTERS:
//   It can FORCE a good execution plan if SQL Server picks a bad one.
//
// WHAT TO DO:
//   Enable Query Store in “Force Last Good Plan” mode.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 9. CARDINALITY ESTIMATOR VERSION
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server’s brain for estimating row counts.
//
// WHY IT MATTERS:
//   Newer versions are better, but sometimes regress.
//
// WHAT TO DO:
//   • Use the latest CE (default)
//   • If performance tanks, switch to legacy CE 70
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 10. OPTIMIZE FOR AD HOC WORKLOADS
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Prevents SQL Server from caching thousands of useless one-time plans.
//
// WHY IT MATTERS:
//   Saves memory, improves performance.
//
// HOW TO ENABLE:
//   EXEC sp_configure 'optimize for ad hoc workloads', 1;
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 11. AUTO-CREATE / AUTO-UPDATE STATISTICS
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server’s way of understanding your data.
//
// WHY IT MATTERS:
//   Without good stats, SQL Server guesses wrong → slow queries.
//
// WHAT TO DO:
//   • Auto-create stats = ON
//   • Auto-update stats = ON
//   • Auto-update stats async = ON
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 12. AUTO-SHRINK = OFF
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server shrinking files automatically.
//
// WHY IT MATTERS:
//   Shrinking DESTROYS performance and fragments files.
//
// WHAT TO DO:
//   ALWAYS turn auto-shrink OFF.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 13. AUTO-CLOSE = OFF
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server closes DB files when not in use.
//
// WHY IT MATTERS:
//   Causes constant open/close cycles → slow.
//
// WHAT TO DO:
//   ALWAYS turn auto-close OFF.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 14. BACKUP COMPRESSION
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Compresses backups.
//
// WHY IT MATTERS:
//   Faster backups, smaller files.
//
// WHAT TO DO:
//   Turn it ON.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 15. COLUMNSTORE INDEXES
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Special index type for analytics.
//
// WHY IT MATTERS:
//   10x–100x faster reporting queries.
//
// WHEN TO USE:
//   • Large tables
//   • Reporting
//   • Analytics
//
// WHEN NOT TO USE:
//   • Heavy OLTP tables
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 16. MEMORY-OPTIMIZED TABLES
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Tables stored in RAM.
//
// WHY IT MATTERS:
//   INSANE speed for cache-like tables.
//
// WHEN TO USE:
//   • Session tables
//   • Caches
//   • High-frequency inserts
//
// WHEN NOT TO USE:
//   • Large persistent tables
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 17. TRACE FLAGS
// ---------------------------------------------------------------------------
// WHAT THEY ARE:
//   Hidden switches that change SQL Server behavior.
//
// USEFUL ONES:
//   • 4199 = enable optimizer hotfixes
//   • 1222 = log deadlocks
//
// MOST TRACE FLAGS ARE OBSOLETE IN 2026.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 18. DEADLOCK PRIORITY
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Lets you choose which queries “lose” deadlocks.
//
// WHY IT MATTERS:
//   You can protect important operations.
//
// EXAMPLE:
//   SET DEADLOCK_PRIORITY LOW;
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 19. LOCK TIMEOUT
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   How long SQL Server waits for a lock.
//
// WHY IT MATTERS:
//   Prevents infinite waits.
//
// EXAMPLE:
//   SET LOCK_TIMEOUT 5000;  -- 5 seconds
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 20. DATABASE COMPATIBILITY LEVEL
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Controls which SQL Server engine version your DB uses.
//
// WHAT TO SET:
//   Use the latest (160/170/180 depending on version).
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 21. READ-ONLY ROUTING (Availability Groups)
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Routes read queries to replicas.
//
// WHY IT MATTERS:
//   Offloads read traffic from primary.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 22. FILEGROUP STRATEGY
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Splitting data across multiple filegroups.
//
// WHY IT MATTERS:
//   Better performance for large tables.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 23. TEMPDB METADATA OPTIMIZATION
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server 2022+ feature that reduces contention.
//
// WHAT TO DO:
//   Ensure it’s ON.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 24. NETWORK PACKET SIZE
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Size of network packets.
//
// WHAT TO SET:
//   32768 for large result sets.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 25. PRIORITY BOOST = OFF
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   Old setting that “boosts” SQL Server priority.
//
// WHY IT MATTERS:
//   Causes instability. Never use it.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 26. SERVICE ACCOUNT TUNING
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server runs under a Windows account.
//
// WHAT TO DO:
//   Use a dedicated service account with minimal permissions.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 27. NUMA AWARENESS
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   SQL Server splits CPUs into NUMA nodes.
//
// WHAT TO DO:
//   Let SQL Server handle it automatically.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 28. PARALLELISM NOTES
// ---------------------------------------------------------------------------
// WHAT IT IS:
//   How SQL Server uses multiple cores.
//
// WHAT TO DO:
//   MAXDOP + Cost Threshold = your main tuning knobs.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 29. INDEX TUNING NOTES
// ---------------------------------------------------------------------------
// WHAT TO DO:
//   • Clustered index on ID (BIGINT)
//   • Nonclustered indexes on:
//        createdAt
//        updatedAt
//        userId
//        foreign keys
//
// WHY IT MATTERS:
//   Indexes = speed.
// ---------------------------------------------------------------------------


// ---------------------------------------------------------------------------
// 30. FUTURE MIGRATION NOTES
// ---------------------------------------------------------------------------
// SQL Server = deterministic tank
// Postgres   = cloud-native JSON king
// MySQL      = cheap and cheerful
// ---------------------------------------------------------------------------
