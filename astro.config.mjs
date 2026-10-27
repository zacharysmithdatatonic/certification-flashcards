import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
    site: 'https://zacharysmithdatatonic.github.io',
    base: '/certification-flashcards/',
    output: 'static',
    integrations: [react()],
});
