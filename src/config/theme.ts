export const theme = {
  colors: { red: '#e52335', darkRed: '#a90e20', ink: '#171719', paper: '#fffaf5', white: '#ffffff', muted: '#77747a' },
  fonts: { display: 'Impact, "Arial Black", sans-serif', body: 'Inter, "Noto Sans JP", system-ui, sans-serif' },
  breakpoints: { mobile: '640px', tablet: '768px', desktop: '1024px' },
  animation: { entrance: 0.65, stagger: 0.12, ease: [0.22, 1, 0.36, 1] as const },
} as const
