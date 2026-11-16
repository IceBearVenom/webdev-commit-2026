# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
# Dapur Kos

Deskripsi singkat mengenai tujuan website ini dibuat dan masalah apa yang diselesaikannya.

🔗 **Live Demo:** [Tautan Website](https://contoh-domain-anda.vercel.app) 
---

## Tim Pengembang

**Nama Tim:** Nama Tim Anda

| Nama Anggota | NIM / ID |
| :--- | :--- | :--- |
| Azki Azziyad | 26/5279227/PA/24271 |
| Anggota 2 | 12345679 |
| Anggota 3 | 12345680 |
| Anggota 3 | 12345680 |

---

## Fitur Utama

* **Fitur 1:** Penjelasan singkat mengenai fungsi fitur pertama.
* **Fitur 2:** Penjelasan singkat mengenai fungsi fitur kedua.
* **Fitur 3:** Penjelasan singkat mengenai fungsi fitur ketiga.

---

## Teknologi yang Digunakan


---

## Petunjuk Instalasi & Menjalankan Proyek (Bila tidak di deploy)

Pastikan perangkat Anda sudah terinstal **Git** dan **Node.js** (atau runtime lain yang sesuai).

1. **Clone repositori ini:**
   ```bash
   git clone [https://github.com/username/nama-repositori.git](https://github.com/username/nama-repositori.git)
