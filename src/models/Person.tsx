export default class Person {
  height: number;
  weight: number;

  constructor(height: number, weight: number) {
    if (height == null || isNaN(height) || weight == null || isNaN(weight)) {
      throw new Error("Altura e peso são obrigatórios");
    }
    this.height = height;
    this.weight = weight;
  }
}