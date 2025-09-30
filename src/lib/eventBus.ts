export type EventMap = Record<string, unknown>
export class EventBus<EM extends EventMap = EventMap> {
    private listeners = new Map<keyof EM, Set<(payload: any) => void>>()
    on<K extends keyof EM>(event: K, handler: (payload: EM[K]) => void) {
        if (!this.listeners.has(event)) this.listeners.set(event, new Set())
        this.listeners.get(event)!.add(handler as any)
    }
    off<K extends keyof EM>(event: K, handler: (payload: EM[K]) => void) {
        this.listeners.get(event)?.delete(handler as any)
    }
    emit<K extends keyof EM>(event: K, payload: EM[K]) {
        this.listeners.get(event)?.forEach(fn => fn(payload))
    }
}
