import { el } from '../../lib/dom'
import { loadConfig, InviteConfig } from '../../lib/config'
import { downloadPDF } from '../../lib/pdf'
import * as clipboard from 'clipboard-polyfill'

function field(label: string, value: string) {
    const row = el('div', 'flex items-start gap-3')
    const l = el('div', 'w-24 shrink-0 text-sm text-gray-500 pt-1')
    l.textContent = label
    const v = el('div', 'text-base')
    v.textContent = value
    row.append(l, v)
    return row
}

function header(cfg: InviteConfig) {
    const h = el('div', 'text-center mb-6')
    const names = el('h1', 'text-3xl md:text-4xl font-semibold font-display tracking-tight')
    names.textContent = `${cfg.invite.bride} ❤ ${cfg.invite.groom}`
    const when = el('p', 'text-gray-600 mt-2')
    when.textContent = `${cfg.invite.date} — ore ${cfg.invite.time}`
    h.append(names, when)
    return h
}

export async function renderLanding(root: HTMLElement) {
    const cfg = await loadConfig()
    root.className = 'min-h-screen bg-gray-50'

    const container = el('div', 'max-w-2xl mx-auto px-4 py-10 print-block')
    const card = el('div', 'card')

    card.appendChild(header(cfg))
    card.appendChild(field('Luogo', cfg.invite.venueName))
    card.appendChild(field('Indirizzo', cfg.invite.address))

    const maps = el('a', 'inline-flex items-center gap-2 text-brand-700 underline mt-2')
    maps.href = cfg.invite.mapsUrl
    maps.target = '_blank'
    maps.rel = 'noopener'
    maps.textContent = 'Open in Google Maps'
    card.appendChild(maps)

    const hr = el('hr', 'my-6 border-gray-200')
    card.appendChild(hr)

    const ibanLabel = cfg.invite.ibanLabel ?? 'IBAN'
    const ibanRow = el('div', 'flex items-center justify-between gap-4')
    const ibanText = el('div', 'font-mono text-base break-all')
    ibanText.textContent = cfg.invite.iban
    const copyBtn = el('button', 'no-print inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-gray-50 active:scale-[.99]')
    copyBtn.innerHTML = '<span>Copy</span>'
    copyBtn.addEventListener('click', async () => {
        await clipboard.writeText(cfg.invite.iban)
        copyBtn.textContent = 'Copied!'
        setTimeout(() => copyBtn.textContent = 'Copiarlo', 1600)
    })

    const ibanWrap = el('div', 'space-y-1 w-full')
    const label = el('div', 'text-sm text-gray-500')
    label.textContent = ibanLabel
    ibanWrap.append(label, ibanText)
    const ibanLine = el('div', 'w-full flex items-center gap-3')
    ibanLine.append(ibanWrap, copyBtn)
    card.appendChild(ibanLine)

    if (cfg.invite.note) {
        const note = el('p', 'mt-6 text-sm text-gray-600 italic')
        note.textContent = cfg.invite.note
        card.appendChild(note)
    }

    const actions = el('div', 'no-print mt-8 flex items-center justify-between')

    const backBtn = el('button', 'inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm hover:bg-gray-50')
    backBtn.textContent = '← Back to the envelope'
    backBtn.onclick = () => { location.hash = '#/' }

    const pdfBtn = el('button', 'inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm bg-brand-600 text-white hover:bg-brand-700')
    pdfBtn.textContent = 'Download PDF'
    pdfBtn.onclick = () => downloadPDF(cfg.pdf?.fileName)

    actions.append(backBtn, pdfBtn)

    container.appendChild(card)
    container.appendChild(actions)
    root.appendChild(container)
}
