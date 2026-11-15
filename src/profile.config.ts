export type UptimeUnit = 'y' | 'm' | 'd';

export interface UptimeValue {
  type?: 'uptime';
  birthDate: string;
  units?: UptimeUnit[];
  short?: boolean;
}

export type GithubMetric = 'repos' | 'stars' | 'commits' | 'contributions' | 'followers';

export interface GithubStatsValue {
  type: 'github';
  username: string;
  metrics?: GithubMetric[];
  /** Optional minimum/override values if you want to include private repos without a PAT */
  minRepos?: number;
}

export interface ShaderModeValue {
  type: 'shader';
}

export interface TimezoneValue {
  type: 'timezone';
  timeZone: string;
}

export type InfoItemValue = string | UptimeValue | GithubStatsValue | ShaderModeValue | TimezoneValue;

export type InfoRow =
  | {
      label: string;
      value: InfoItemValue;
    }
  | {
      type: 'divider';
      title?: string;
    };

export type ShaderPreset = 'plasma' | 'pumpkin' | 'snow' | 'heart' | 'matrix' | 'fireworks';

export interface ShaderPresetConfig {
  /** Semantic color classes (c0..c9) used to render the ASCII shader in Light theme */
  colorsLight: readonly string[];
  /** Semantic color classes (c0..c9) used to render the ASCII shader in Dark theme */
  colorsDark: readonly string[];
  /** 6 color swatches displayed at the bottom of the terminal matching this shader */
  swatches: readonly [string, string, string, string, string, string];
  /** Optional holiday/event greeting shown in the terminal when this preset is active */
  greeting?: string;
}

export interface ShaderScheduleRule {
  name: string;
  shader: ShaderPreset;
  /** MM-DD range (inclusive), e.g. '12-20' to '01-10' */
  from: `${number}-${number}`;
  to: `${number}-${number}`;
  /** Optional custom greeting override for this event */
  greeting?: string;
}

export const PROFILE_CONFIG = {
  output: 'dist/profile.svg',
  githubUsername: 'vem225',

  // Terminal text
  terminal: {
    windowTitle: 'vem — tsx — 80×24',
    prompt: 'vem@Windows-PC ~ %',
    command: 'pnpm tsx src/profile-fetch.ts',
    userHeader: 'vem@Windows-PC',
    dividerLength: 42,
    showBottomCursor: true,
  },

  // Info rows on the right (add or remove as many as you want — window height recalculates automatically)
  info: [
    // Tech & Environment
    { label: 'Stack', value: 'Gemini, DeepSeek, ChatGPT' },
    { label: 'OS', value: 'Windows 11' },
    { label: 'Package Manager', value: 'pnpm' },
    { label: 'Shell', value: 'Bash' },
    { label: 'Editor', value: 'VS Code' },
    {
      label: 'GitHub',
      value: {
        type: 'github',
        username: 'vem225',
        metrics: ['repos', 'stars', 'commits'],
        minRepos: 13,
      },
    },

    // Section Divider
    { type: 'divider', title: 'About me' },

    // Personal Info
    { label: 'Role', value: 'Professional Prompt Engineer' },
    { label: 'Uptime', value: { type: 'uptime', birthDate: '2006-02-23', units: ['y', 'm', 'd'] } },
    { label: 'Location', value: 'Russia' },
    { label: 'Timezone', value: { type: 'timezone', timeZone: 'Europe/Moscow' } },
    { label: 'Locale', value: 'RU, EN' },
    { label: 'Status', value: 'Building some kinda cool stuff... maybe' },
  ] satisfies InfoRow[],

  // Shader selection, per-preset colors/swatches/greetings & holiday/seasonal schedule
  shader: {
    /** Set to 'auto' to pick by date schedule, or force a preset: 'plasma' | 'pumpkin' | 'snow' | 'heart' | 'matrix' | 'fireworks' */
    mode: 'auto' as 'auto' | ShaderPreset,
    default: 'plasma' as ShaderPreset,

    // Single source of truth for all shader colors (c0..c9), bottom swatches, and greetings
    presets: {
      plasma: {
        // c0: deep navy trough, c1: primary blue, c2: royal indigo, c3: amethyst violet, c4: bright periwinkle crest, c5: glowing lavender core
        colorsLight: ['#172554', '#1d4ed8', '#3730a3', '#5b21b6', '#7c3aed', '#2563eb'],
        colorsDark: ['#1d3b78', '#2D68C4', '#4B61D1', '#6E56CF', '#9381ff', '#c4b5fd'],
        swatches: ['#1d3b78', '#2D68C4', '#4B61D1', '#6E56CF', '#9381ff', '#c4b5fd'],
      },
      pumpkin: {
        // c0: stem, c1: dark contour/grooves, c2: mid orange, c3: bright orange, c4: inner rim/amber, c5: flame gold, c6: flame hot core
        colorsLight: ['#14532d', '#7c2d12', '#c2410c', '#ea580c', '#b45309', '#d97706', '#ca8a04'],
        colorsDark: ['#4ade80', '#9a3412', '#ea580c', '#f97316', '#f59e0b', '#facc15', '#fef9c3'],
        swatches: ['#9a3412', '#ea580c', '#f97316', '#f59e0b', '#facc15', '#4ade80'],
        greeting: 'Happy Halloween! Stay spooky 🎃',
      },
      snow: {
        // c0: snow white, c1: ice blue, c2: pine dark, c3: pine mid, c4: pine light, c5: gold star/garland, c6: red orn, c7: cyan orn, c8: pink orn, c9: trunk
        colorsLight: ['#0369a1', '#0284c7', '#052e16', '#14532d', '#15803d', '#b45309', '#b91c1c', '#0e7490', '#a21caf', '#451a03'],
        colorsDark: ['#f0f6fc', '#79c0ff', '#166534', '#2ea043', '#56d364', '#facc15', '#ff5f56', '#39c5cf', '#f472b6', '#b45309'],
        swatches: ['#f0f6fc', '#79c0ff', '#2ea043', '#facc15', '#ff5f56', '#39c5cf'],
        greeting: 'Happy Holidays & New Year! 🎄✨',
      },
      heart: {
        // c0: deep contour, c1: dark crimson, c2: vibrant ruby, c3: rose highlight, c4: specular shine, c5: pulse wave
        colorsLight: ['#4c0519', '#9f1239', '#be123c', '#e11d48', '#fda4af', '#db2777'],
        colorsDark: ['#9f1239', '#e11d48', '#ff2a6d', '#ff6b9d', '#fff1f2', '#f472b6'],
        swatches: ['#9f1239', '#e11d48', '#ff2a6d', '#ff6b9d', '#f472b6', '#fff1f2'],
        greeting: "Happy Valentine's Day! Spread the love ❤️",
      },
      matrix: {
        // c0: white-mint head, c1: neon green, c2: matrix green, c3: dark emerald tail
        colorsLight: ['#052e16', '#14532d', '#15803d', '#16a34a'],
        colorsDark: ['#e6ffed', '#39ff14', '#2ea043', '#196c2e'],
        swatches: ['#0d3b18', '#196c2e', '#2ea043', '#00b82e', '#39ff14', '#e6ffed'],
        greeting: "Happy Programmer's Day! Follow the white rabbit 🐇",
      },
      fireworks: {
        // c0: white-gold core, c1: gold, c2: coral-orange, c3: cyan, c4: electric blue, c5: hot pink, c6: neon violet
        colorsLight: ['#92400e', '#b45309', '#b91c1c', '#0e7490', '#1d4ed8', '#be185d', '#6d28d9'],
        colorsDark: ['#fef9c3', '#ffbd2e', '#ff7b72', '#39c5cf', '#58a6ff', '#ff5599', '#bc8cff'],
        swatches: ['#fef9c3', '#ffbd2e', '#ff7b72', '#39c5cf', '#ff5599', '#bc8cff'],
        greeting: "It's my Birthday today! Leveling up 🎉",
      },
    } satisfies Record<ShaderPreset, ShaderPresetConfig>,

    schedule: [
      {
        name: 'New Year & Winter Holidays',
        shader: 'snow',
        from: '12-20',
        to: '01-10',
        greeting: 'Happy Holidays & New Year! 🎄✨',
      },
      {
        name: "Valentine's Day",
        shader: 'heart',
        from: '02-13',
        to: '02-15',
        greeting: "Happy Valentine's Day! Spread the love ❤️",
      },
      {
        name: 'Birthday',
        shader: 'fireworks',
        from: '02-21',
        to: '02-23',
        greeting: "It's my Birthday! Another year of uptime 🎉",
      },
      {
        name: 'Programmer Day & Matrix Day',
        shader: 'matrix',
        from: '09-12',
        to: '09-14',
        greeting: "Happy Programmer's Day! Wake up, Neo... 🐇",
      },
      {
        name: 'Halloween',
        shader: 'pumpkin',
        from: '10-29',
        to: '11-01',
        greeting: 'Happy Halloween! Trick or treat 🎃',
      },
    ] as ShaderScheduleRule[],
  },

  // Shader and layout settings
  layout: {
    width: 840,
    rightColX: 430,
    /** High-res grid for ASCII shaders (60×26 fills the left column) */
    cols: 60,
    rows: 26,
    frames: 24,
    fps: 12,
    asciiRamp: ' .:-=+*#%@',
  },

  // Terminal window color themes (light / dark for GitHub)
  theme: {
    light: {
      bg: '#ffffff',
      headerBg: '#f6f8fa',
      border: '#d0d7de',
      fg: '#24292f',
      muted: '#57606a',
      accent: '#2D68C4',
      prompt: '#1a7f37',
    },
    dark: {
      bg: '#0d1117',
      headerBg: '#161b22',
      border: '#30363d',
      fg: '#c9d1d9',
      muted: '#8b949e',
      accent: '#2D68C4',
      prompt: '#3fb950',
    },
  },
} as const;
