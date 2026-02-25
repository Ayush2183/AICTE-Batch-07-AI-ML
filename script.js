document.getElementById("plannerForm").addEventListener("submit", async function(e){
    e.preventDefault();

    const data = {
        destination: document.getElementById("destination").value,
        budget: document.getElementById("budget").value,
        days: document.getElementById("days").value,
        interests: document.getElementById("interests").value
    };

    const res = await fetch("/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    let html = `
        <h2>📍 ${result.destination}</h2>
        <p><b>Transport:</b> ${result.transport}</p>
        <p><b>Stay:</b> ${result.stay}</p>
        <p><b>Estimated Budget:</b> ₹${result.estimatedCost}</p>
        <h3>🗓 Itinerary</h3>
    `;

    result.itinerary.forEach(day=>{
        html += `<p><b>Day ${day.day}</b>: ${day.activities.join(", ")}</p>`;
    });

    document.getElementById("result").innerHTML = html;
});