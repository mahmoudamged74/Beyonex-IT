import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/** Ensure app CSS loads after vendor CSS so our overrides win in production. */
function cssOrderPlugin() {
  return {
    name: 'css-link-order',
    enforce: 'post',
    transformIndexHtml(html) {
      const linkRe = /<link\b[^>]*rel="stylesheet"[^>]*>/gi
      const links = html.match(linkRe) || []
      if (links.length < 2) return html

      const vendor = []
      const app = []
      for (const link of links) {
        if (/vendor-/i.test(link)) vendor.push(link)
        else app.push(link)
      }

      const ordered = [...vendor, ...app]
      let i = 0
      return html.replace(linkRe, () => ordered[i++])
    },
  }
}

export default defineConfig({
  plugins: [react(), cssOrderPlugin()],
  optimizeDeps: {
    include: [
      '@reduxjs/toolkit',
      '@reduxjs/toolkit/query',
      '@reduxjs/toolkit/query/react',
      'react-redux',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) {
              return 'vendor-react'
            }
            if (id.includes('@reduxjs') || id.includes('react-redux')) {
              return 'vendor-redux'
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n'
            }
            if (id.includes('swiper')) {
              return 'vendor-swiper'
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons'
            }
            if (id.includes('bootstrap')) {
              return 'vendor-bootstrap'
            }
            if (id.includes('react-phone-input-2')) {
              return 'vendor-phone'
            }
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
