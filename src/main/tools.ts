export const removeFilePathPattern = (path: string) => {
  const pattern = /\/files\/\d+\//
  return path.replace(pattern, '')
}
