const diagnosticForm = document.getElementById("diagnosticForm");
const diagnosticOutput = document.getElementById("diagnosticOutput");
const playDemoBtn = document.getElementById("playDemo");
const slider = document.getElementById("testimonialSlider");

const heuristics = {
  "Vibración al frenar": {
    probabilidad: "Alta (85%)",
    prioridad: "Urgente",
    tiempo: "2h · cambio discos/pastillas"
  },
  "Pérdida de potencia": {
    probabilidad: "Media (65%)",
    prioridad: "Alta",
    tiempo: "3h · diagnosis electrónica"
  },
  "Testigo motor encendido": {
    probabilidad: "Variable (40-90%)",
    prioridad: "Media",
    tiempo: "1h · lectura OBD + ajuste"
  },
  "Ruido suspensión": {
    probabilidad: "Alta (78%)",
    prioridad: "Media",
    tiempo: "2h · revisión tren delantero"
  }
};

if (diagnosticForm) {
  const updateOutput = () => {
    const data = new FormData(diagnosticForm);
    const sintoma = data.get("sintoma");
    const nota = data.get("nota")?.trim();
    const nivel = data.get("nivel");

    if (!sintoma) return;
    const info = heuristics[sintoma];
    diagnosticOutput.querySelector(".output__summary").textContent =
      `Vehículo ${data.get("tipo")} detecta "${sintoma.toLowerCase()}". Nivel ${nivel}/5. ${
        nota ? `Notas: ${nota}` : "Sin notas adicionales."
      }`;

    const [prob, priority, time] = [
      info?.probabilidad ?? "--",
      info?.prioridad ?? "--",
      info?.tiempo ?? "--"
    ];

    const items = diagnosticOutput.querySelectorAll("li strong");
    if (items.length >= 3) {
      items[0].textContent = prob;
      items[1].textContent = priority;
      items[2].textContent = time;
    }
  };

  diagnosticForm.addEventListener("input", updateOutput);
  diagnosticForm.addEventListener("change", updateOutput);
  diagnosticForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateOutput();
    diagnosticOutput.classList.add("pulse");
    setTimeout(() => diagnosticOutput.classList.remove("pulse"), 1200);
  });
}

if (playDemoBtn) {
  playDemoBtn.addEventListener("click", () => {
    document.body.classList.toggle("demo-mode");
    playDemoBtn.textContent = document.body.classList.contains("demo-mode")
      ? "Ocultar demo holográfica"
      : "Ver demo holográfica";
  });
}

if (slider) {
  const testimonials = Array.from(slider.querySelectorAll(".testimonial"));
  let index = 0;

  setInterval(() => {
    testimonials[index].classList.remove("active");
    index = (index + 1) % testimonials.length;
    testimonials[index].classList.add("active");
  }, 4000);
}

