// Demo card data
let cards = [
  { name: "Card A", price: 100 },
  { name: "Card B", price: 80 },
  { name: "Card C", price: 50 },
  { name: "Card D", price: 30 },
  { name: "Card E", price: 20 }
];

const cardList = document.getElementById("cardList");
const alertsDiv = document.getElementById("alerts");
const sortSelect = document.getElementById("sortSelect");
const simulateBtn = document.getElementById("simulateBtn");

// Render card list
function renderList() {
  cardList.innerHTML = "";
  let sorted = [...cards].sort((a,b) => 
    sortSelect.value === "desc" ? b.price - a.price : a.price - b.price
  );
  sorted.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.name}: $${c.price.toFixed(2)}`;
    cardList.appendChild(li);
  });
}

// Chart setup
const ctx = document.getElementById("priceChart").getContext("2d");
const priceChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: cards.map(c => c.name),
    datasets: [{
      label: "Price",
      data: cards.map(c => c.price),
      backgroundColor: "rgba(0, 123, 255, 0.5)"
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// Add alert
function addAlert(msg) {
  const div = document.createElement("div");
  div.textContent = msg;
  alertsDiv.prepend(div);
  return div;
}

// Simulate price change
function simulatePriceChange() {
  cards.forEach(card => {
    const old = card.price;
    const change = (Math.random() - 0.5) * 20; // -10 to +10
    card.price = Math.max(0, old + change);
    const pct = ((card.price - old)/old * 100).toFixed(1);
    if(Math.abs(pct) >= 10){
      const el = addAlert(`${card.name} moved ${pct}% — $${old.toFixed(2)} → $${card.price.toFixed(2)}`);
      el.classList.add("big-change");
    }
  });
  renderList();
  priceChart.data.datasets[0].data = cards.map(c => c.price);
  priceChart.update();
}

// Event listeners
simulateBtn.addEventListener("click", simulatePriceChange);
sortSelect.addEventListener("change", renderList);

// Auto simulate every 15s
let autoSim = setInterval(simulatePriceChange, 15000);

// Initial render
renderList();
