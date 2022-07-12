var timerEl = document.querySelector("#timer");
var introEl = document.querySelector(".intro");
var quizEl = document.querySelector(".quiz");
var scoreEl = document.querySelector(".saveScore");
var scoreTxt = document.querySelector("#score");
var highScoresDivEl =document.querySelector(".highScoresDiv");
var userInitialsEl = document.querySelector("#userInitials");
var usersListEl = document.querySelector("#usersList");
var previusEl= document.querySelector("#previus");

var arrUserAnswers = [];
var secondsLeft = 60;
var index = 0;
var arrScores = [];
var sumScore = 0;
var timeInterval;

var arrQuestions = [
    {
        question: "What are the six primitive data types in Javascript?",
        answers: ["sentence, float, data, bigInt, symbol, undefined", "string, num, falsy, bigInt, symbol, undefined", "sentence, int, truthy, bigInt, symbol, undefined", "string, number, boolean, bigInt, symbol, undefined"],
        correct: 3
    },
    {
        question: "How do we declare a conditional statement in Javascript?",
        answers: ["for loop", "if ... else", "while loop", "difference ... between"],
        correct: 1
    },
    {
        question: "How do we stop a loop from repeating indefinitely?",
        answers: ["A loop will stop executing when the condition is true", "We have to explicity end the loop with the break keyword", "When we have iterated through half of the condition", "A loop will stop executing when the condition is false"],
        correct: 3
    },
    {
        question: "What are the two types of scope Javascript uses?",
        answers: ["Outside and Inside", "Surrounding and Inner", "Global and Local", "Abroad and Local"],
        correct: 2
    },
    {
        question: "What is an object method?",
        answers: ["A function associated with an object", "An array saved inside of an object", "Keys in an object that have a number assigned to it", "A function that takes an object for an argument"],
        correct: 0
    }
]

/*clears variables for a new start*/
function clearVar(){
    secondsLeft = 60;
    timerEl.textContent = secondsLeft;
    index = 0;
    arrUserAnswers = [];
    userInitialsEl.value = "";
    clearElements(quizEl); 
}

/*delete html elements, receives the father element*/
function clearElements(element) {
    if (element.childNodes.length > 0) {         
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
}

/*creates a 'p' element for each user/score in the record*/
function dispHighscores() {
    var children = usersListEl.childNodes.length;
    for (i = children; i < arrScores.length; i++) {
        var pUserName = document.createElement("p");
        var userData = document.createTextNode(arrScores[i].name + " - " + arrScores[i].score);
        pUserName.appendChild(userData);
        usersListEl.appendChild(pUserName);
    }
}

/*checks previus answer and displays if it was correct or incorrect*/
function previusAnswer(element) {
    if (arrQuestions[index - 1] != undefined) {
        previusEl.textContent = "";
        if (arrUserAnswers[index - 1] === 1) {
            previusEl.textContent = "Your previus answers was: CORRECT!";
        } else {
            previusEl.textContent = "Your previus answers was: INCORRECT!";
        }
        setTimeout(function(){
            previusEl.textContent = "";
        }, 2500);
        
    }
}

/*creates html elements dinamicly to display question and answers. Gives an id and class 
to the answers*/
function dispQuest() {
    if (arrQuestions[index] != undefined) {
        var pQuestion = document.createElement("p");        
        var txtQuestion = document.createTextNode(arrQuestions[index].question);        
        pQuestion.appendChild(txtQuestion);
        pQuestion.setAttribute("class", "txtQuestion");        
        quizEl.appendChild(pQuestion);

        for (var i = 0; i < arrQuestions[index].answers.length; i++ ){
            var p = document.createElement("p");        
            var txt = document.createTextNode(arrQuestions[index].answers[i]);        
            txt.textContent = (i + 1 + ". " + txt.textContent);
            p.appendChild(txt);
            p.setAttribute("class", "btnAnswer");
            p.setAttribute("id", i);                
            quizEl.appendChild(p);
        }
        previusAnswer(quizEl);
    } else {
        setScore();
    }
}

/*calculate score and display it*/
function setScore() {    
    quizEl.setAttribute("style", "visibility: hidden;");
    scoreEl.setAttribute("style", "visibility: visible;");
    clearInterval(timeInterval);
    timerEl.textContent = secondsLeft;
    sumScore = 0;
    for (var i = 0; i < arrUserAnswers.length; i++) {
        sumScore += arrUserAnswers[i];
    }
    sumScore *= 5;        
    scoreTxt.textContent = "Your Score is " + sumScore;
    if (secondsLeft > 0) {
        scoreEl.children[0].textContent = "Congrats! Quiz completed.";
    }else{
        scoreEl.children[0].textContent = "Time Up!";
    }
    previusAnswer(scoreEl);
};

/*starts displaying questions*/
function setQuiz() {    
    introEl.setAttribute("style", "visibility: hidden;");
    quizEl.setAttribute("style", "visibility: visible;");
    dispQuest();
};

/*timer*/
function setTime() {
     timeInterval = setInterval(function() {        
        secondsLeft--;
        timerEl.textContent = secondsLeft;
        if (secondsLeft <= 0) {            
            secondsLeft = 0;
            timerEl.textContent = secondsLeft;
            setScore();
        }
    } , 1000);
};

/*saves user's name and score*/
function saveScore() {
    arrScores.push({name: userInitialsEl.value, score: sumScore})
}

/*click on 'start' quiz:*/
start.addEventListener("click", function(){
    clearVar();
    setTime();    
    setQuiz();
            
});

/*click on an answer: saves user's answer and continue with the questions*/
quizDiv.addEventListener("click", function(event){
    var element = event.target;    
    if (element.matches(".btnAnswer")) { 
        if (parseInt(element.id) === parseInt(arrQuestions[index].correct)) {
            arrUserAnswers.push(1);
        }else {
            arrUserAnswers.push(0);
            secondsLeft -= 10;            
        } 
        if (secondsLeft > 0) {
            index++;
            clearElements(quizEl);
            dispQuest();
        }
    }
});

/*click on 'Submit': call saveScore and send us to the "highscore" screen*/
btnSubmit.addEventListener("click", function(event) {
    if (userInitialsEl.value.trim() === "") {
        alert("Please, enter your initials.");
    } else {
        scoreEl.setAttribute("style", "visibility: hidden;");
        highScoresDivEl.setAttribute("style", "visibility: visible;");
        timerEl.textContent="";
        saveScore();
        dispHighscores();
    }
});

/*click on 'go back': goes to the intro info and sets everything to begin again*/
goBack.addEventListener("click", function() {
    introEl.setAttribute("style", "visibility: visible;");
    highScoresDivEl.setAttribute("style", "visibility: hidden;");
    clearVar();
});

/*click on 'clear highscores': delete highscore record */
clearHighscores.addEventListener("click", function() {
    arrScores = [];
    clearElements(usersListEl);
});

/*click on 'view highscores': displays highscore record*/
highScores.addEventListener("click", function() {
    introEl.setAttribute("style", "visibility: hidden;");
    quizEl.setAttribute("style", "visibility: hidden;");
    scoreEl.setAttribute("style", "visibility: hidden;");
    highScoresDivEl.setAttribute("style", "visibility: visible;");
    clearInterval(timeInterval);
    timerEl.textContent = "";
    clearElements(quizEl);
    dispHighscores();    

});




