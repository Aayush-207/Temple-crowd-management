// PostCSS configuration to enable Tailwind CSS processing in Vite
// Tailwind v4 works zero-config, but Vite needs the PostCSS plugin to be registered.
import tailwindcss from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    tailwindcss(),
    autoprefixer(),
  ],
}


