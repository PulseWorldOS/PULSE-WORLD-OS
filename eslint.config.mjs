import globals from "globals";

export default [

  // ============================================================
  // ⭐ 0. UNIVERSAL HTML + TXT — extract ALL JS, warn more
  // ============================================================
  {
    files: ["**/*.html", "**/*.txt"],
    plugins: ["html"],
    processor: "html/html",

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser
      }
    },

    rules: {
      // Real bugs
      "no-undef": "error",
      "no-dupe-keys": "error",
      "no-dupe-args": "error",

      // More visibility
      "no-unreachable": "warn",
      "no-constant-condition": "warn",
      "no-extra-semi": "warn",

      // Loosened
      "camelcase": "off",
      "no-unused-vars": "warn",
      "no-prototype-builtins": "off",
      "no-empty": ["warn", { allowEmptyCatch: true }]
    }
  },

  // ============================================================
  // ⭐ 1. GLOBAL — modern defaults, MORE visibility, LESS blocking
  // ============================================================
  {
    files: ["**/*.js", "**/*.cjs", "**/*.mjs", "**/*.jsx"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },

    rules: {
      // ⭐ REAL BUGS ONLY
      "no-undef": "error",
      "no-dupe-keys": "error",
      "no-dupe-args": "error",
      "preserve-caught-error": "error",

      // ⭐ Modern JS — but loosened
      "no-var": "warn",
      "prefer-const": "warn",
      "prefer-template": "warn",

      // ⭐ Allow randomness + time again
      "no-restricted-properties": "off",
      "no-restricted-globals": "off",

      // ⭐ Pulse dialect naming — fully relaxed
      "camelcase": "off",

      // ⭐ Unused vars — show more, block less
      "no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^(Pulse|OS|u|_|log|warn|error|err)",
          argsIgnorePattern: "^(Pulse|OS|u|_|log|warn|error|err)"
        }
      ],

      // ⭐ Show more warnings, block less
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-useless-assignment": "warn",
      "no-self-assign": "warn",
      "no-useless-escape": "warn",
      "no-unreachable": "warn",
      "no-extra-semi": "warn",
      "no-constant-condition": "warn",

      // ⭐ Allow async everywhere
      "no-await-in-loop": "off",
      "no-return-await": "off",

      // ⭐ Allow dynamic architecture
      "no-prototype-builtins": "off",
      "no-new": "off",
      "no-eval": "off",
      "no-implied-eval": "off",

      // ⭐ Allow mutation patterns (PulseWorld OS style)
      "no-param-reassign": "off"
    }
  },

  // ============================================================
  // ⭐ 2. IMMUNE / PROXY / MEMBRANE — full freedom
  // ============================================================
  {
    files: [
      "**/*WBC*.js",
      "**/*Immune*.js",
      "**/*Healer*.js",
      "**/*Membrane*.js",
      "**/*Proxy*.js",
      "**/*Spine*.js",
      "**/*Vault*.js",
      "**/*Wallet*.js",
      "**/*Point*.js",
      "**/*LongTermMemory*.js"
    ],
    rules: {
      "no-param-reassign": "off",
      "no-restricted-properties": "off",
      "no-restricted-globals": "off",
      "no-unused-vars": "off",
      "no-constant-condition": "off",
      "no-empty": "off"
    }
  },

  // ============================================================
  // ⭐ 3. MULTIVERSE / WORLD / GALAXY — strict but modern
  // ============================================================
  {
    files: [
      "PULSE-WORLD-OS/**/*.js",
      "PULSE-MULTIVERSE/**/*.js",
      "PULSE-UNIVERSE/**/*.js",
      "PULSE-GALAXY/**/*.js",
      "PULSE-WORLD/**/*.js"
    ],
    rules: {
      "no-param-reassign": [
        "warn",
        {
          props: true,
          ignorePropertyModificationsFor: [
            "Pulse",
            "OS",
            "world",
            "universe",
            "galaxy"
          ]
        }
      ],

      // More visibility
      "no-unused-vars": "warn",
      "no-empty": ["warn", { allowEmptyCatch: true }]
    }
  },

  // ============================================================
  // ⭐ 4. BOOT LAYER — JSX support
  // ============================================================
  {
    files: [
      "PULSE-MULTIVERSE/**/*.js",
      "PULSE-MULTIVERSE/**/*.jsx"
    ],
    plugins: ["react"],
    rules: {
      "react/prop-types": "off",
      "react/display-name": "off",

      // More visibility
      "no-unused-vars": "warn"
    }
  }

];
