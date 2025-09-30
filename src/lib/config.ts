export type InviteConfig = {
    brand?: {
        primary?: string
        bg?: string
        text?: string
        fontDisplay?: string
        fontMono?: string
    }
    envelope?: {
        title?: string
        subtitle?: string
        stampText?: string
    }
    invite: {
        bride: string
        groom: string
        date: string        // ISO or readable
        time: string        // e.g., "16:30"
        venueName: string
        address: string
        mapsUrl: string
        ibanLabel?: string
        iban: string
        note?: string
    }
    pdf?: {
        mode?: 'print' | 'canvas' // 'print' uses window.print; 'canvas' (future) could use html2canvas+jsPDF
        fileName?: string
    }
}

let cached: InviteConfig | null = null

export async function loadConfig(): Promise<InviteConfig> {
    if (cached) return cached
    const res = await fetch('./config.json', { cache: 'no-store' })
    if (!res.ok) throw new Error(`Failed to load config.json: ${res.status}`)
    cached = await res.json() as InviteConfig
    return cached
}
