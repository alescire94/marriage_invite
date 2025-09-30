export async function downloadPDF(fileName?: string) {
    // For now rely on print to PDF (browser-native). Users can choose destination "Save as PDF".
    // Keeps the project dependency-free and works on static hosting.
    window.print()
}
