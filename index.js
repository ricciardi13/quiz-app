let questionNumber = 0;
let score = 0;

const STORE = [
    {//start
        h1: "Welcome to the Doughnut Quiz",
        h2: "How much do you know about doughnuts?"
    },
    {//1
        h1: "Question 1",
        h2: "Where did doughnuts originate?",
        answer1: "Chinese settlers in California",
        answer2: "Dutch settlers in New York",
        answer3: "French settlers in Louisiana",
        answer4: "Spanish settlers in Florida",
        correctAnswer: "Dutch settlers in New York"
    },
    {//2
        h1: "Question 2",
        h2: "What color are doughnut boxes commonly found in?",
        answer1: "Blue",
        answer2: "Green",
        answer3: "Orange",
        answer4: "Pink",
        correctAnswer: "Pink"
    },
    {//3
        h1: "Question 3",
        h2: "When was the earliest known record of the word \"doughnut\"?",
        answer1: "1609",
        answer2: "1709",
        answer3: "1809",
        answer4: "1909",
        correctAnswer: "1809"
    },
    {//4
        h1: "Question 4",
        h2: "When is National Doughnut Day?",
        answer1: "First Friday in June",
        answer2: "First Tuesday in September",
        answer3: "First Thursday in July",
        answer4: "First Wednesday in May",
        correctAnswer: "First Friday in June"
    },
    {//5
        h1: "Question 5",
        h2: "What profession is commonly associated with eating doughnuts?",
        answer1: "Doctors",
        answer2: "Firefighters",
        answer3: "Police Officers",
        answer4: "Teachers",
        correctAnswer: "Police Officers"
    }
];

function start(){
    questionNumber = 0;
    score = 0;
    updateHeader();
    $(".js-answer").hide();
    $(".js-submit").html("Begin");
    $(".js-quiz-app").on("click", ".js-submit", function(event){
        event.preventDefault();
        nextQuestion();
    });
}

function updateHeader(){
    $(".js-h1").html(STORE[questionNumber].h1);
    $(".js-h2").html(STORE[questionNumber].h2);
    $(".js-h2").removeClass("correct incorrect");
}

function nextQuestion(){
    if(questionNumber === 5){
        final();
    } else {
        questionNumber++;
        updateHeader();
        $(".js-answer").show();
        updateQuestions();
        $(".js-submit").html("Submit");
        $(".js-submit").prop("disabled", true);
        $(".js-quiz-app").off("click", ".js-submit");
        $(".js-answer").removeClass("selected");
        let answer;
        $(".js-quiz-app").on("click", ".js-submit", function(event){
            event.preventDefault();
            submit(answer);
        });
        $(".js-quiz-app").on("click", ".js-answer", function(event){
            event.preventDefault();
            answer = $(this);
            $(".js-answer").removeClass("selected correctBorder incorrectBorder");
            $(this).addClass("selected");
            $(".js-submit").prop("disabled", false);
        });
    }

}

function updateQuestions(){
    $(".js-answer-1").html(STORE[questionNumber].answer1);
    $(".js-answer-2").html(STORE[questionNumber].answer2);
    $(".js-answer-3").html(STORE[questionNumber].answer3);
    $(".js-answer-4").html(STORE[questionNumber].answer4);
}

function submit(answer){
    if (answer.html() === STORE[questionNumber].correctAnswer){
        score++;
        $(".js-h2").html("Correct! " + score + "/" + questionNumber + " answers correct.")
        $(".js-h2").addClass("correct");
        answer.addClass("correctBorder");
    } else {
        $(".js-h2").html("Incorrect! " + score + "/" + questionNumber + " answers correct.")
        $(".js-h2").addClass("incorrect");
        answer.addClass("incorrectBorder");
    }

    $(".js-answer").prop("disabled", true);
    $(".js-submit").html("Next");
    $(".js-quiz-app").off("click", ".js-submit");
    $(".js-quiz-app").on("click", ".js-submit", function(event){
        event.preventDefault();
        $(".js-answer").removeClass("selected correctBorder incorrectBorder");
        $(".js-answer").prop("disabled", false); 
        nextQuestion();
    });


}

function final(){
    $(".js-h1").html("Thank You for Taking the Doughnut Quiz");
    $(".js-h2").html("You scored a " + score + "/5!");
    $(".js-h2").removeClass("correct incorrect");
    $(".js-answer").hide();
    $(".js-submit").html("Restart");
    $(".quiz-app").on("click", ".js-submit", function(event){
        event.preventDefault();
        start();
    });
}

$(start);