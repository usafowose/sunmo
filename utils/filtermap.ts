/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *
 * @param reqObj - An object, either request or custom, from which specific key-value pairs must be extracted.
 * @param validKeyMappingMock - A mock object whose enumerable keys constitute all valid keys to extract.
 * @returns filters: A JS Map() of type Map<T, any> in which the Map key type is the same as the provided type OR corresponds to keyof validKeyMappingMock.
 */
export const createFilterMapFromRequest = <T>(
  reqObj: Record<string, any>,
  validKeyMappingMock: Record<string, any>,
): Map<T, any> => {
  const filters: Map<T, any> = new Map();
  Object.entries(reqObj).forEach(([key, value]) => {
    if (key in validKeyMappingMock) {
      filters.set(key as unknown as T, value);
    }
  });
  return filters;
};
