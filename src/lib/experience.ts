// 1994'ten itibaren her yıl otomatik artar
// 2026 → 32, 2027 → 33, 2028 → 34 ...
const START_YEAR = 1994;

export function getYearsExp(): number {
  return new Date().getFullYear() - START_YEAR;
}

export function getYearsExpStr(): string {
  return `${getYearsExp()}+`;
}
