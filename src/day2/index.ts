import { Day } from "../day";

class Day2 extends Day {
  constructor() {
    super(2);
  }

  getIds(input: string): number[] {
    const ranges = input.split(",");

    return ranges.flatMap((range) => {
      const [start, end] = range.split("-").map(Number);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    });
  }

  splitString(value: string, size: number): string[] {
    return value.match(new RegExp(`.{1,${size}}`, "g")) || [];
  }

  isInvalid(value: string): boolean {
    const parts = this.splitString(value, value.length / 2);
    return parts.length > 0 && parts.every((part) => part === parts[0]);
  }

  hasRepeatingPattern(value: string): boolean {
    for (let size = 1; size <= value.length / 2; size++) {
      const parts = this.splitString(value, size);
      if (parts.every((part) => part === parts[0])) {
        return true;
      }
    }
    return false;
  }

  solveForPartOne(input: string): string {
    const ids = this.getIds(input);
    const invalidIds = ids.filter((id) => this.isInvalid(id.toString()));
    return invalidIds.reduce((a, b) => a + b, 0).toString();
  }

  solveForPartTwo(input: string): string {
    const ids = this.getIds(input);
    const invalidIds = ids.filter((id) =>
      this.hasRepeatingPattern(id.toString())
    );
    return invalidIds.reduce((a, b) => a + b, 0).toString();
  }
}

export default new Day2();
