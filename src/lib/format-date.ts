export function formatDate(iso: string): string {
    return new Intl.DateTimeFormat('en-GH', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(iso))
}

export function formatMonthYear(iso: string): string {
    return new Intl.DateTimeFormat('en-GH', {
        month: 'long',
        year: 'numeric',
    }).format(new Date(iso))
}
