export const tryParseArray = (value: any): any[] => {
  if (!value) return [];

  try {
    if (Array.isArray(value)) return value;
    return JSON.parse(value);
  } catch {
    return [];
  }
};
