# Mohammad Nabrawi — Portfolio (React + Vite)

Modern cybersecurity-themed portfolio built with **React**, **Vite**, **Framer Motion**, and **React Icons**.

## File Structure

```
nabrawi-portfolio/
├── index.html                 # HTML entry
├── package.json               # Dependencies & scripts
├── vite.config.js             # Vite config
├── public/                    # Static assets
└── src/
    ├── main.jsx               # React entry point
    ├── index.css              # Global styles + CSS variables
    ├── App.jsx                # Root component
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── About.jsx
        ├── Skills.jsx
        ├── Experience.jsx
        ├── Projects.jsx
        ├── Education.jsx
        ├── Contact.jsx
        └── Footer.jsx
```

## How to run (VS Code)

1. Open the folder `nabrawi-portfolio` in VS Code
2. Open terminal inside the folder
3. Run:
   ```bash
   npm install
   npm run dev
   ```
4. Open the URL shown (usually http://localhost:5173)

## Build for production

```bash
npm run build
npm run preview
```

The `dist/` folder can be deployed to Vercel, Netlify, or GitHub Pages.
