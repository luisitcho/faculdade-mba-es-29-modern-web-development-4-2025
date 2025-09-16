import Person from "./Person";

export interface ImcResponse {
  imc: number;
  imcDescription: string;
}

export interface INutritionistLike {
  height: number;
  weight: number;
}

export async function calculaImc(nutritionist: INutritionistLike): Promise<ImcResponse> {
  const res = await fetch("http://localhost:3000/imc/calculate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ height: nutritionist.height, weight: nutritionist.weight })
  });
  if (!res.ok) throw new Error("Erro ao calcular IMC");
  return res.json();
}

export class Nutritionist extends Person {
  imcValue = 0;
  imcDescription = "";

  async imc(): Promise<void> {
    const imcResponse = await calculaImc({ height: this.height, weight: this.weight });
    this.imcValue = imcResponse.imc;
    this.imcDescription = imcResponse.imcDescription;
  }
}