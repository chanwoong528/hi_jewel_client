# HI JEWEL Client Page (React + TypeScript + Vite)

_[HI JEWEL URL](https://hi-jewel.netlify.app/)_

_[BACKEND REPO](https://github.com/chanwoong528/hi_jewel_server)_

## ⚒️ Tech Stack

- Main: React
- State Management: React-Query, Zustand
- Style: tailwind + shadcn
- Deploy: netlify => AWS(S3/cloudFront) will be migrated soon

## 📚 Main Library

- "react-dnd": "^16.0.1",
- "react-router-dom": "^6.22.0",
- "suneditor": "^2.45.1",
- "zod": "^3.22.4",
- "react-hook-form": "^7.51.0",
- "tailwind"
- "shadcn"

## 📂 Folder Structure

```
project
│   README.md
│   deploy.sh -> aws cold deploy setting
|   appspec.yml -> aws cold deploy setting
│
└─── page
│   about.tsx
│   admin.tsx
│   home.tsx
|   ... Each page representation
│
└─── components
│   └─── ui   (shadcn ui lib)
│   └─── modal (wrapper for modal)
│   └─── form (form using react-hook-form + zod)
│   └─── list (list of each category ex:post, product, etc mostly like table)
└─── http
│   └─── fetchApi (api classified as domains)
│   | http = axios custom settings (for auto login / refresh<-> access token config, etc)
│   └─── service (React-query hook forms)
└─── store (zustand store)
└─── utils (Constant / util function like date converter)
└─── style (Global style)
```

## 📏 Code Convention

- JS/React Code
- Style Rule

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```
