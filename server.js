const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));

function generatePlan(destination, budget, days, interests) {

    budget = Number(budget);
    days = Number(days);

    let transport = budget < 5000 ? "Train / Bus" : "Flight or AC Train";
    let stay = budget < 5000 ? "Hostel / Budget PG" : "Budget Hotel";
    let food = "Local cafes & street food";

    let plan = [];

    for (let i = 1; i <= days; i++) {
        plan.push({
            day: i,
            activities: [
                `Explore famous places in ${destination}`,
                `Try local food (${food})`,
                `Visit ${interests || "popular"} spots`,
                "Use public transport for savings"
            ]
        });
    }

    return {
        destination,
        transport,
        stay,
        estimatedCost: budget,
        itinerary: plan
    };
}

app.post("/plan", (req, res) => {
    try {
        const { destination, budget, days, interests } = req.body;
        const result = generatePlan(destination, budget, days, interests);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));