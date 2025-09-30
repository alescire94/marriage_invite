export type Route = {
    path: string
    render: (root: HTMLElement) => void | Promise<void>
}

export function createRouter(root: HTMLElement, routes: Route[], fallback: string) {
    const byPath = new Map(routes.map(r => [r.path, r]))
    async function render() {
        const hash = location.hash || '#/'
        const route = byPath.get(hash)
        if (!route) {
            location.hash = fallback
            return
        }
        root.innerHTML = ''
        await route.render(root)
    }
    window.addEventListener('hashchange', render)
    render()
}
