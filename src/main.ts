import './styles.css'
import { createRouter } from './lib/router'
import { renderEnvelope } from './modules/envelope/envelope'
import { renderLanding } from './modules/landing/landing'
import config from '../public/config.json';

const root = document.getElementById('app') as HTMLElement
if (root && config.brand?.bg) {
    root.style.backgroundColor = config.brand.bg;
}

createRouter(root, [
    { path: '#/', render: renderEnvelope },
    { path: '#/invite', render: renderLanding }
], '#/')