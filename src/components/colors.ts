// Helper functions for colors
// TODO(cyrille): Test this file.

export const colorToComponents = (color: string): [number, number, number] => {
  if (color.length === 7) {
    return [
      Number.parseInt(color.slice(1, 3), 16),
      Number.parseInt(color.slice(3, 5), 16),
      Number.parseInt(color.slice(5, 7), 16),
    ]
  }
  return [
    Number.parseInt(color.slice(1, 2), 16) * 0x11,
    Number.parseInt(color.slice(2, 3), 16) * 0x11,
    Number.parseInt(color.slice(3, 4), 16) * 0x11,
  ]
}

// Change #rrggbb color to rgba(r, g, b, alpha)
export const colorToAlpha = (color: string|undefined, alpha: number): string => {
  if (!color) {
    return ''
  }
  const [red, green, blue] = colorToComponents(color)
  return `rgba(${red}, ${green}, ${blue}, ${alpha === 0 ? 0 : alpha || 1})`
}
