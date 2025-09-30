import './styles.css'
import { createRouter } from './lib/router'
import { renderEnvelope } from './modules/envelope/envelope'
import { renderLanding } from './modules/landing/landing'

const root = document.getElementById('app') as HTMLElement

createRouter(root, [
    { path: '#/', render: renderEnvelope },
    { path: '#/invite', render: renderLanding }
], '#/')