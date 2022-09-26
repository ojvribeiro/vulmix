![vulmix-logo](https://user-images.githubusercontent.com/8026741/192224953-9fad0854-0610-4c71-bcf0-55f40206bea8.svg)

Vue(3) SPA meta-framework that uses [Laravel Mix](https://www.npmjs.com/package/laravel-mix).

> ⚠️ This is just an experimental work and should not be used in production (yet). Use instead well tested and faster tools like [Vite](https://github.com/vitejs/vite). Or, if you need the auto-import functionality, you can use [Nuxt](https://nuxtjs.org/) instead.

## ✨ Features

- Components auto-import;
- File based routing;
- Image asset optimization with the `<Image />` built-in component;
- Sass and Tailwind out-of-the-box;

## 📦 Installation

The easiest way to get started with Vulmix is by running:

```bash
npx create-vulmix-app your-app-name
```

...and follow the instructions on the terminal.

## 🟢 Running the project

Run the project locally by `cd`ing into the project directory and then running the following command:

```bash
# With NPM
npm run dev

# Or with Yarn
yarn dev
```

This should open your project on the port `3000` with fast refresh.

## 🤔 Serving without fast refresh

If you don't want fast refresh for some reason, you can serve your project with this command:

```bash
# With NPM
npm run serve

# Or with Yarn
yarn serve
```

This should serve your project onto the port `8000` _without_ fast refresh.

> ⚠️ You need to `npm run build` in a separate terminal to recompile your files without serving them.

## 🚀 Preparing for production

To compile an optimized code, you need to run the following command:

```bash
# With NPM
npm run prod

# Or with Yarn
yarn prod
```

This will minify and optimize your project code in the `_dist` folder which you can deploy its contents on any host.
