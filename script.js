let score = 0;
let current = 0;
let time = 10;
let timer;
const MIN_SCORE = 30;
let rotation = 0;

const questions = [
    { q: "HYV seeds give?", o:["Low yield","High yield"], a:1 },
    { q: "Drip irrigation saves?", o:["Water","Labour"], a:0 },
    { q: "Biological control uses?", o:["Chemicals","Predators"], a:1 },
    { q: "Poultry provides?", o:["Milk","Eggs"], a:1 }
];

const bonusQ = { q:"Organic farming is?", o:["Eco-friendly","Harmful"], a:0 };

const dares = [
    "🐄 Moo like a cow",
    "🌱 Act like planting seeds",
    "🐔 Act like a chicken",
    "🌍 Say 'Save the soil!' loudly"
];

const sounds = [
    correctSound, wrongSound, winSound
];

function setVolume(v){ sounds.forEach(s=>s.volume=v); }

function loadQuestion(){
    if(current >= questions.length){
        endGame();
        return;
    }
    let q = questions[current];
    question.innerText = q.q;
    options.innerHTML = "";

    q.o.forEach((t,i)=>{
        let d = document.createElement("div");
        d.className="option";
        d.innerText=t;
        d.onclick=()=>checkAnswer(i,q);
        options.appendChild(d);
    });

    startTimer();
}

function startTimer(){
    clearInterval(timer);
    time = 10;
    timerFill.style.width="100%";

    timer = setInterval(()=>{
        time--;
        timerFill.style.width=(time*10)+"%";
        if(time===0){
            clearInterval(timer);
            wrongSound.play();
            score-=5;
            next();
        }
    },1000);
}

function checkAnswer(i,q){
    clearInterval(timer);
    if(i===q.a){
        correctSound.play();
        score+=10;
    } else {
        wrongSound.play();
        score-=5;
    }
    next();
}

function next(){
    scoreDiv();
    current++;
    loadQuestion();
}

function scoreDiv(){
    score.innerText="Score: "+score;
}

function endGame(){
    if(score>=MIN_SCORE){
        winSound.play();
        resultBox.classList.remove("hidden");
        finalScore.innerText="Final Score: "+score;
    } else {
        spinnerBox.classList.remove("hidden");
    }
}

function spinWheel(){
    let wheel = spinnerWheel;
    let spin = Math.floor(Math.random()*360)+1080;
    rotation += spin;
    wheel.style.transform=`rotate(${rotation}deg)`;

    setTimeout(()=>{
        let pos = rotation % 360;
        let yes = (pos<60 || (pos>180 && pos<240));
        spinnerBox.classList.add("hidden");
        yes ? bonusRound() : dareRound();
    },3000);
}

function bonusRound(){
    question.innerText = bonusQ.q;
    options.innerHTML="";
    bonusQ.o.forEach((t,i)=>{
        let d=document.createElement("div");
        d.className="option";
        d.innerText=t;
        d.onclick=()=>{
            if(i===bonusQ.a) score+=10;
            score>=MIN_SCORE ? endGame() : dareRound();
        }
        options.appendChild(d);
    });
}

function dareRound(){
    dareBox.classList.remove("hidden");
    dareText.innerText = dares[Math.floor(Math.random()*dares.length)];
}

function restartGame(){
    location.reload();
}

loadQuestion();
