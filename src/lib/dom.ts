export const qs = <T extends Element = Element>(s: string, root: ParentNode = document) => root.querySelector(s) as T | null
export const qsa = <T extends Element = Element>(s: string, root: ParentNode = document) => Array.from(root.querySelectorAll(s)) as T[]
export const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string) => {
    const e = document.createElement(tag)
    if (className) e.className = className
    return e
}