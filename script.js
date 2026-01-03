let score = 0;
let current = 0;

const questions = [
    {
        q: "Why are HYV seeds used?",
        options: ["Low yield", "High yield", "More weeds", "Less nutrition"],
        answer: 1
    },
    {
        q: "Which is a modern irrigation method?",
        options: ["Canal", "Drip irrigation", "Flooding", "Rainfall"],
        answer: 1
    },
    {
        q: "What controls pests naturally?",
        options: ["Chemical spray", "Biological control", "Fire", "Flood"],
        answer: 1
    },
    {
        q: "Poultry farming provides?",
        options: ["Milk", "Eggs & meat", "Wool", "Honey"],
        answer: 1
    }
];

function loadQuestion() {
    let q = questions[current];
    document.getElementById("question").innerText = q.q;
    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, i) => {
        let btn = document.createElement("div");
        btn.innerText = opt;
        btn.className = "option";
        btn.onclick = () => checkAnswer(i);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(selected) {
    if (selected === questions[current].answer) {
        score += 10;
        alert("✅ Correct!");
    } else {
        score -= 5;
        alert("❌ Wrong!");
    }

    document.getElementById("score").innerText = "Food Score: " + score;

    if (score >= 100) {
        alert("🏆 You saved the future of food!");
    }
}

function nextQuestion() {
    current = (current + 1) % questions.length;
    loadQuestion();
}

loadQuestion();
