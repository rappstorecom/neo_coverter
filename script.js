// NEO Converter 🔄 – Powered by Next Evolution of Oneness

const categorySelect = document.getElementById("category");
const fromSelect = document.getElementById("from");
const toSelect = document.getElementById("to");
const inputField = document.getElementById("input");
const resultDiv = document.getElementById("result");

const units = {
  length: {
    Meter: 1,
    Kilometer: 1000,
    Mile: 1609.34,
    Inch: 0.0254,
    Foot: 0.3048,
  },
  temperature: {
    Celsius: "C",
    Fahrenheit: "F",
    Kelvin: "K",
  },
  weight: {
    Kilogram: 1,
    Gram: 0.001,
    Pound: 0.453592,
    Ounce: 0.0283495,
  },
  time: {
    Second: 1,
    Minute: 60,
    Hour: 3600,
    Day: 86400,
    Week: 604800,
  },
  volume: {
    Liter: 1,
    Milliliter: 0.001,
    Gallon: 3.78541,
    "Cubic Meter": 1000,
  },
  area: {
    "Square Meter": 1,
    "Square Kilometer": 1e6,
    "Square Mile": 2.59e6,
    Acre: 4046.86,
  },
  speed: {
    "Meter/Second": 1,
    "Kilometer/Hour": 0.277778,
    "Miles/Hour": 0.44704,
  },
  energy: {
    Joule: 1,
    Calorie: 4.184,
    "Kilowatt Hour": 3.6e6,
  },
  pressure: {
    Pascal: 1,
    Bar: 100000,
    PSI: 6894.76,
    Atmosphere: 101325,
  }
};

categorySelect.addEventListener("change", () => {
  const category = categorySelect.value;
  populateUnits(category);
  resultDiv.textContent = "💡 Result will appear here...";
  inputField.value = "";
});

function populateUnits(category) {
  fromSelect.innerHTML = "";
  toSelect.innerHTML = "";
  if (!units[category]) return;

  const keys = Object.keys(units[category]);
  keys.forEach(unit => {
    let optionFrom = document.createElement("option");
    let optionTo = document.createElement("option");
    optionFrom.value = unit;
    optionFrom.text = unit;
    optionTo.value = unit;
    optionTo.text = unit;
    fromSelect.add(optionFrom);
    toSelect.add(optionTo);
  });
  toSelect.selectedIndex = 1; // Default: different than from
}

function convert() {
  const category = categorySelect.value;
  const from = fromSelect.value;
  const to = toSelect.value;
  const inputValue = parseFloat(inputField.value);

  if (!category || !from || !to || isNaN(inputValue)) {
    resultDiv.textContent = "⚠️ Please enter all fields correctly.";
    return;
  }

  // Temperature special case
  if (category === "temperature") {
    const result = convertTemperature(from, to, inputValue);
    resultDiv.textContent = `🌡️ ${inputValue}° ${from} = ${result}° ${to}`;
    return;
  }

  const factorFrom = units[category][from];
  const factorTo = units[category][to];

  const baseValue = inputValue * factorFrom;
  const converted = baseValue / factorTo;

  resultDiv.textContent = `✅ ${inputValue} ${from} = ${converted.toFixed(4)} ${to}`;
}

function convertTemperature(from, to, value) {
  let tempK;

  // Convert to Kelvin first
  if (from === "Celsius") tempK = value + 273.15;
  else if (from === "Fahrenheit") tempK = (value - 32) * 5 / 9 + 273.15;
  else tempK = value;

  // Convert from Kelvin to target
  if (to === "Celsius") return (tempK - 273.15).toFixed(2);
  if (to === "Fahrenheit") return ((tempK - 273.15) * 9 / 5 + 32).toFixed(2);
  return tempK.toFixed(2); // Kelvin
}
