# Paris

A tiny toolkit for hosting remote components and sharing them between apps. Ships with a CLI and a Vite plugin for quick federation.

### Here's a simple example:

```ts
// main.ts
import { defineRemoteComponent } from '@kennyromanov/paris';

export default defineRemoteComponent({
  onInject(name, val) {
    if (name === 'someData') store.setSomeData(val);
  },
  async onMount(el) {
    createApp(Component).mount(el);
  },
});
```

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import paris from 'paris-vite-plugin';

export default defineConfig({
  plugins: [
    vue(),
    paris({
      name: 'remote',
      exposes: {
        './entry': resolve(__dirname, './src/main.ts'),
      },
    }),
  ],
});
```
### Shell host:

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import paris from 'paris-vite-plugin';

export default defineConfig({
  plugins: [
    vue(),
    paris({
      name: 'shell',
      remotes: {
        foo: 'https://cdn.example/app.js',
      },
    }),
  ],
});
```

```ts
<!-- ShellHost.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { mountRemoteComponent } from '@kennyromanov/paris';

const el = ref<any>(null);

onMounted(async () => {
  const component = await import('foo/entry');
  mountRemoteComponent(component?.default, el.value);
});
</script>

<template>
  <div class="shell" ref="el" />
</template>
```
---

## Installation

1. The project requires Node v18 or higher. Install the packages with **npm**:

```shell
npm i @kennyromanov/paris
npm i -D paris-vite-plugin paris-cli
```

2. Define your **remote components** and pass them to the plugin.

3. Start the dev server:

```shell
paris
```

**You're all set!**

---

## Tips & Tricks

1. Use `provide` with `onInject` to receive values from the host shell.
2. Use `paris-cli` and `paris-vite-plugin` to serve your application with minimalistic environment.
3. Override options via CLI flags:

```shell
paris --port 3000
```

---

**Paris**  
by Kenny Romanov

