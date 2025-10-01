import { el } from '../../lib/dom'
import { loadConfig } from '../../lib/config'
import './envelope.css'
import lottie from 'lottie-web'

export async function renderEnvelope(root: HTMLElement) {
    const cfg = await loadConfig()
    const brandBg: string = (cfg as any)?.brand?.bg || '#f8fafc'
        ; (root as HTMLElement).style.backgroundColor = brandBg
    root.className = 'flex items-center justify-center min-h-screen px-4'

    const BASE: string = (import.meta as any).env?.BASE_URL || '/'
    const v = (import.meta as any).env?.DEV ? `?v=${Date.now()}` : ''
    const jsonPath = `${BASE}assets/envelope/envelope.json${v}`
    const coupleJsonPath = `${BASE}assets/envelope/Wedding.json${v}`

    // wrapper scena
    const scene = el('div', 'envelope-scene select-none')
    scene.setAttribute('tabindex', '0')

    // contenitore Lottie
    const lottieBox = el('div', 'lottie-envelope')
    const coupleBox = el('div', 'lottie-couple')
    // opzionale: mostra un bordo debug se vuoi verificare il box
    // lottieBox.style.outline = '1px dashed #ddd'

    scene.appendChild(lottieBox)
    scene.appendChild(coupleBox)
    root.innerHTML = ''
    root.append(scene)

    // carica l’animazione
    const anim = lottie.loadAnimation({
        container: lottieBox,   // DOM element
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: jsonPath
    })

    const couple = lottie.loadAnimation({
        container: coupleBox,
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: coupleJsonPath
    })

    // stato per evitare doppi click
    let playing = false
    const start = () => {
        if (playing) return
        playing = true
        coupleBox.style.opacity = '1'
        anim.goToAndStop(0, true)
        couple.goToAndStop(0, true)
        anim.play()
        couple.play()
    }

    let envDone = false
    let coupleDone = false
    let coupleFailed = false

    const maybeGo = () => {
        if (envDone && (coupleDone || coupleFailed)) {
            location.hash = '#/invite'
        }
    }

    // click o invio/spazio fanno partire l’animazione
    scene.addEventListener('click', start)
    scene.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); start() }
    })

    // al termine vai alla landing
    anim.addEventListener('complete', () => {
        envDone = true
        maybeGo()
    })

    couple.addEventListener('complete', () => {
        coupleDone = true
        maybeGo()
    })

    couple.addEventListener('data_failed', () => {
        console.error('[lottie] failed to load:', coupleJsonPath)
        coupleFailed = true
        maybeGo()
    })

    // fallback se il JSON non carica
    anim.addEventListener('data_failed', () => {
        console.error('[lottie] failed to load:', jsonPath)
        // fallback immediato: vai alla landing
        location.hash = '#/invite'
    })
}