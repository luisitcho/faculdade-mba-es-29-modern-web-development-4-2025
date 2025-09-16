import React from "react";
import { Nutritionist } from "../models/Nutritionist";

function renderizaTabelaIMC(imc: number) {
  const intervals = [
    { min: 0, max: 18.4, classification: "Abaixo do peso" },
    { min: 18.4, max: 24.9, classification: "Peso normal" },
    { min: 24.9, max: 29.9, classification: "Sobrepeso" },
    { min: 29.9, max: Infinity, classification: "Obesidade" }
  ];

  let html = "<table id='tabela-imc'><thead><tr><th>Classifica&ccedil;&atilde;o</th><th>IMC</th></tr></thead><tbody>";
  intervals.forEach((x) => {
    const intervalo = `${x.min} - ${x.max}`;
    html += `<tr class='${imc >= x.min && imc < x.max ? "destaque-imc" : ""}'><td>${x.classification}</td><td>${intervalo}</td></tr>`;
  });
  html += "</tbody></table>";

  const container = document.getElementById("tabela-imc-container");
  if (container) container.innerHTML = html;
}

export default function CalculateButton() {

  const calculateIMC = async (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    const heightEl = document.getElementById("height") as HTMLInputElement | null;
    const weightEl = document.getElementById("weight") as HTMLInputElement | null;
   
    if (!heightEl || !weightEl) {
      alert("Campos não encontrados");
      return;
    }

    const height = parseFloat(heightEl.value);
    const weight = parseFloat(weightEl.value);

    try {
      const nutritionist = new Nutritionist(height, weight);
      await nutritionist.imc();

      const imcSpan = document.getElementById("imc");
      if (imcSpan) {
        imcSpan.textContent = `${nutritionist.imcValue} - ${nutritionist.imcDescription}`;
      }
      renderizaTabelaIMC(nutritionist.imcValue);
    } catch (e: any) {
      alert(e?.message ?? "Erro ao calcular IMC");
    }
  };

  return (
    <div className="row">
      <button onClick={calculateIMC}>Calcular IMC</button>
    </div>
  );
}
