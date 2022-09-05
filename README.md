# vue-mix

Tiny boilerplate to work with Vue and Laravel Mix.

> ⚠️ This is just an experimental work and should not, under any circumstances, be used in production. Use instead well tested and faster tools like [Vite](https://github.com/vitejs/vite). Or, if you need the auto import functionality, you can use [Nuxt](https://nuxtjs.org/) instead.

## Installation

First clone the repository:

```bash
git clone https://github.com/ojvribeiro/vue-mix
```

> 📌 Tip:
>
> You can clone the repository into an existing folder by `cd`ing to your project folder, then running the `clone` command with a `.` at the end.
>
> ```bash
> cd path/to/project
>
> git clone https://github.com/ojvribeiro/vue-mix .
> ```

Install the dependencies:

```bash
# With NPM
npm install

# Or with Yarn
yarn install
```

Run the project locally:

```bash
# With NPM
npm run dev

# Or with Yarn
yarn dev
```

This should open your project on the port `3000` with fast refresh.

If you don't want fast refresh for some reason, you can serve your project with this command:

```bash
# With NPM
npm run serve

# Or with Yarn
yarn serve
```

This should serve your project onto the port `8000` _without_ fast refresh.

> ⚠️ You need to `npm run build` or `npm run watch` in a separate terminal to recompile your files without serving them.

## Preparing for production

To compile a optimized code, you need to run the following command:

```bash
# With NPM
npm run prod

# Or with Yarn
yarn prod
```

This will minify and optimize your project code.
