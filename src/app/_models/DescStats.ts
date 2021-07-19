export class DescStats {
    name: string;
    max: number;
    min: number;
    average: number;
    median: number;
    variance: number;
    sd: number;


  constructor(name: string, max: number, min: number, average: number, median: number, variance: number, sd: number) {
    this.name = name;
    this.max = max;
    this.min = min;
    this.average = average;
    this.median = median;
    this.variance = variance;
    this.sd = sd;
  }
}
