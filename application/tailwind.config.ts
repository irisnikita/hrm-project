import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--ant-color-primary)',
        default: 'var(--ant-color-text)',
      },
      transitionDuration: {
        DEFAULT: '0.3s',
      },
      width: {
        'drawer-min': '360px',
      },
    },
  },
  plugins: [],
};
export default config;
