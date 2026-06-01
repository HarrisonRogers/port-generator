export const __assign = Object.assign

export function __rest<
  T extends Record<PropertyKey, unknown>,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  K extends keyof T,
>(source: T, excluded: Array<K>) {
  const target: Partial<T> = {}

  for (const property in source) {
    if (Object.prototype.hasOwnProperty.call(source, property)) {
      const key = property as keyof T

      if (!excluded.includes(key as K)) {
        target[key] = source[key]
      }
    }
  }

  if (typeof Object.getOwnPropertySymbols === 'function') {
    for (const symbol of Object.getOwnPropertySymbols(source)) {
      if (
        excluded.includes(symbol as K) ||
        !Object.prototype.propertyIsEnumerable.call(source, symbol)
      ) {
        continue
      }

      const key = symbol as keyof T
      target[key] = source[key]
    }
  }

  return target
}

export function __spreadArray<T>(
  target: Array<T>,
  source: ArrayLike<T>,
  pack?: boolean,
) {
  if (pack || arguments.length === 2) {
    for (let index = 0, length = source.length; index < length; index += 1) {
      target.push(source[index])
    }

    return target
  }

  return target.concat(Array.prototype.slice.call(source))
}
