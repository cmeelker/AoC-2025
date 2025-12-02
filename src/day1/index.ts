import { Day } from "../day";

type Direction = "Left" | "Right";

type Instruction = {
  direction: Direction;
  steps: number;
};

class Day1 extends Day {
  startPosition = 50;
  maxValue = 99;
  passedZeroCount = 0;

  constructor() {
    super(1);
  }

  parseLines(lines: string[]): Instruction[] {
    return lines.map((line) => {
      let direction: Direction;
      switch (line.charAt(0)) {
        case "L":
          direction = "Left";
          break;
        default:
          direction = "Right";
      }
      const steps = parseInt(line.slice(1));
      return { direction, steps };
    });
  }

  rotate(currentPosition: number, direction: Direction, steps: number): number {
    let position = currentPosition;

    for (let i = 0; i < steps; i++) {
      if (position === 0) {
        this.passedZeroCount++;
      }

      if (direction === "Left") {
        position--;
        if (position < 0) {
          position = this.maxValue;
        }
      } else {
        position++;
        if (position > this.maxValue) {
          position = 0;
        }
      }
    }
    return position;
  }

  solveForPartOne(input: string): string {
    const instructions = this.parseLines(input.split("\n"));

    let currentPosition = this.startPosition;
    const positions = instructions.map((instruction) => {
      if (instruction.direction) {
        currentPosition = this.rotate(
          currentPosition,
          instruction.direction,
          instruction.steps
        );
      }
      return currentPosition;
    });

    return positions.filter((v) => v === 0).length.toString();
  }

  solveForPartTwo(input: string): string {
    return this.passedZeroCount.toString();
  }
}

export default new Day1();
