let score = 0;
let current = 0;
let timeLeft = 20;
let timer;

const questions = [
    {
        q: "Why are HYV seeds preferred?",
        options: ["Low yield", "High yield", "More weeds", "Less nutrition"],
        answer: 1
    },
    {
        q: "Which is a modern irrigation method?",
        options: ["Flooding", "Drip irrigation", "Canal", "Rainfall"],
        answer: 1
    },
    {
        q: "Natural pest control is called?",
        options: ["Chemical control", "Biological control", "Mechanical", "Fire"],
        answer: 1
    },
    {
        q: "Poultry farming provides?",
        options: ["Milk", "Eggs and meat", "Wool", "Honey"],
        answer: 1
    }
];

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 30;

    document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

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

    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            score -= 5;
            updateScore();
            nextQuestion();
        }
    }, 1000);
}

function checkAnswer(selected) {
    clearInterval(timer);

    if (selected === questions[current].answer) {
        score += 10;
        alert("✅ Correct!");
    } else {
        score -= 5;
        alert("❌ Wrong!");
    }

    updateScore();
    nextQuestion();
}

function updateScore() {
    document.getElementById("score").innerText = `Food Score: ${score}`;
}

function nextQuestion() {
    if (score >= 100) {
        alert("🏆 Congratulations! You improved food resources!");
        return;
    }

    current = (current + 1) % questions.length;
    setTimeout(loadQuestion, 500);
}

loadQuestion();
