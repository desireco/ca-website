import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_D9JkN7MC.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/404.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/blueprint.astro.mjs');
const _page3 = () => import('./pages/confirmation.astro.mjs');
const _page4 = () => import('./pages/digital_help.astro.mjs');
const _page5 = () => import('./pages/digital_products.astro.mjs');
const _page6 = () => import('./pages/disclaimer.astro.mjs');
const _page7 = () => import('./pages/homes/mobile-app.astro.mjs');
const _page8 = () => import('./pages/homes/personal.astro.mjs');
const _page9 = () => import('./pages/homes/saas.astro.mjs');
const _page10 = () => import('./pages/homes/startup.astro.mjs');
const _page11 = () => import('./pages/mission.astro.mjs');
const _page12 = () => import('./pages/momentum_club.astro.mjs');
const _page13 = () => import('./pages/not_used_pages/pricing.astro.mjs');
const _page14 = () => import('./pages/not_used_pages/services.astro.mjs');
const _page15 = () => import('./pages/pricing.astro.mjs');
const _page16 = () => import('./pages/privacy.astro.mjs');
const _page17 = () => import('./pages/resources.astro.mjs');
const _page18 = () => import('./pages/rss.xml.astro.mjs');
const _page19 = () => import('./pages/sprint.astro.mjs');
const _page20 = () => import('./pages/start.astro.mjs');
const _page21 = () => import('./pages/terms.astro.mjs');
const _page22 = () => import('./pages/_---blog_/_category_/_---page_.astro.mjs');
const _page23 = () => import('./pages/_---blog_/_tag_/_---page_.astro.mjs');
const _page24 = () => import('./pages/_---blog_/_---page_.astro.mjs');
const _page25 = () => import('./pages/index.astro.mjs');
const _page26 = () => import('./pages/_---blog_.astro.mjs');
const pageMap = new Map([
    ["src/pages/404.astro", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/blueprint.astro", _page2],
    ["src/pages/confirmation.astro", _page3],
    ["src/pages/digital_help.mdx", _page4],
    ["src/pages/digital_products.mdx", _page5],
    ["src/pages/disclaimer.md", _page6],
    ["src/pages/homes/mobile-app.astro", _page7],
    ["src/pages/homes/personal.astro", _page8],
    ["src/pages/homes/saas.astro", _page9],
    ["src/pages/homes/startup.astro", _page10],
    ["src/pages/mission.mdx", _page11],
    ["src/pages/momentum_club.astro", _page12],
    ["src/pages/not_used_pages/pricing.astro", _page13],
    ["src/pages/not_used_pages/services.astro", _page14],
    ["src/pages/pricing.mdx", _page15],
    ["src/pages/privacy.mdx", _page16],
    ["src/pages/resources.md", _page17],
    ["src/pages/rss.xml.ts", _page18],
    ["src/pages/sprint.astro", _page19],
    ["src/pages/start.astro", _page20],
    ["src/pages/terms.md", _page21],
    ["src/pages/[...blog]/[category]/[...page].astro", _page22],
    ["src/pages/[...blog]/[tag]/[...page].astro", _page23],
    ["src/pages/[...blog]/[...page].astro", _page24],
    ["src/pages/index.astro", _page25],
    ["src/pages/[...blog]/index.astro", _page26]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "5e1befa8-16f5-4d2f-a294-15b0f6a9a542"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
