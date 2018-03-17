jQuery(document).ready(function($) {
    
     /* GIFS */
    var correctGif      = ["right2", "right3"];
    var incorrectGif    = ["wrong1", "wrong2", "wrong3"];
    var timeoutGif      = ["timeout1", 'timeout2'];
    
    /* GENERAL */
    var rightAnswers = 0;
    var wrongAnswers = 0;
    var timeoutAnswers = 0;
    var currentQuestion = 0;
    var timerValue = 10;
    
    var timerInterval = null;
    
    /* QUESTIONS */
   var triviaQuestion = [{
        question: "What is the capital of United States?",
        answersList: ['New York' , 'Boston', 'Seattle', 'Washington, D.C.' ],
        correctAnswer: 3
    },{
        question: "What is the capital of Ecuador?",
        answersList: ['Quito' , 'Cuenca', 'Guayaquil', 'Salinas' ],
        correctAnswer: 0
    },{
        question: "What is the capital of Sweden?",
        answersList: ['Uppsala' , 'Malmö', 'Gothenburg', 'Stockholm' ],
        correctAnswer: 3
    },{
        question: "What is the capital of Germany?",
        answersList:['Frankfurt' , 'Berlin', 'Munich', 'Weimar' ],
        correctAnswer: 1
    },{
        question: "What is the capital of Japan?",
        answersList:['Kyoto' , 'Tokyo', 'Yokohama', 'Hiroshima' ],
        correctAnswer: 1
    },{
        question: "What is the capital of Brazil?",
        answersList: ['Brasilia' , 'Rio de Janeiro', 'Sao Paulo ', 'Salvador ' ],
        correctAnswer: 0
    },{
        question: "What is the capital of Switzerland?",
        answersList: ['Montreux' , 'St. Gallen ', 'Bern', 'Thun' ],
        correctAnswer: 2
    },{
        question: "What is the capital of Canada?",
        answersList: ['Montreal' , 'Calgary', 'Vancouver', 'Ottawa' ],
        correctAnswer: 3
    },{
        question: "What is the capital of Bangladesh?",
        answersList: ['Dhaka' , 'Chittagong', 'Khulna', 'Comilla' ],
        correctAnswer: 0
    },{
        question: "What is the capital of Afghanistan?",
        answersList: ['Kandahar' , 'Kabul', 'Ghazni', 'Herat' ],
        correctAnswer: 1
    }];
    
    
    // Resetting all vars
    function resetVars() {
        rightAnswers = 0;
        wrongAnswers = 0;
        timeoutAnswers = 0;
        currentQuestion = 0;
    }
    
    function startGame() {
        resetVars();
        nextQuestion();
    }
    
    function nextQuestion() {
        changeScreen('question-screen');
        
        var totalQuestions = triviaQuestion.length;
        
        // if it's last question, go to Score Screen
        if(currentQuestion >= totalQuestions) {
            scoreScreen();
            return;
        }
        
        // Load Question Screen
        var questionText    = triviaQuestion[currentQuestion].question; // get question text from triviaQuestion
        var answersList     = triviaQuestion[currentQuestion].answersList; // get list of answers
        
        $('#questionText').text(questionText);
        
        $('#answersList').html(''); // Removing Old <li>
        
        for( var i = 0; i < answersList.length; i++ ) { // loop over all Answer Options
            $('#answersList').append(`<button class="list-group-item answer-item">${answersList[i]}</button>`); 
        }
        
        $('#currentQuestion').text(`Question ${currentQuestion + 1} / ${totalQuestions}`);
        
        // Initiate Timer
        timerValue = 10;
        
        $('#timer').text(timerValue);
        
        timerInterval = setInterval(function() {
            timerValue--;
            $('#timer').text(timerValue);

            if(timerValue <= 0) {
                checkAnswer('TIMEOUT');
            }
        }, 1000);
    }
    
    function checkAnswer(answer) {
        timerInterval = clearInterval(timerInterval); 
        var correctAnswerIndex = triviaQuestion[currentQuestion].correctAnswer; 
        var correctAnswerText  = triviaQuestion[currentQuestion].answersList[correctAnswerIndex]; 
        
        if(answer == 'TIMEOUT') { 
            $('#answerMessage').text('Timeout!'); 
            var gif = timeoutGif[Math.floor(Math.random()*timeoutGif.length)]; 
            $('#gif').attr('src', `assets/images/gifs/${gif}.gif`); 
            $('#correctAnswer').html('');
            
            timeoutAnswers++; 
            
        } else if(answer == correctAnswerText) { 
            $('#answerMessage').text('Correct!');
            var gif = correctGif[Math.floor(Math.random()*correctGif.length)]; 
            $('#gif').attr('src', `assets/images/gifs/${gif}.gif`); 
            $('#correctAnswer').html(''); 
            
            rightAnswers++; 
            
        } else { 
            $('#answerMessage').text('Wrong...');
            var gif = incorrectGif[Math.floor(Math.random()*incorrectGif.length)]; 
            $('#gif').attr('src', `assets/images/gifs/${gif}.gif`); 
            $('#correctAnswer').html(`The correct answer is: <strong>${correctAnswerText}</strong>`); 
            
            wrongAnswers++; 
        }
        
        
        changeScreen('answer-screen');
        
        setTimeout(function() { 
            currentQuestion++; 
            
            $('#answerMessage').text(''); // clean answerMessage
            $('#gif').attr('src', '');    // clean Gif
            
            nextQuestion();
        }, 4000);
    }
    
    /* SCREENS */
    function changeScreen(screen) {
        // Hide all Screens first
        $('.screen').hide();
        
        // Show screen
        $('#' + screen).show();
    }
    
    function scoreScreen() {
        changeScreen('score-screen');
        $('#scoreCorrect').text(rightAnswers);
        $('#scoreIncorrect').text(wrongAnswers);
        $('#scoreTimeout').text(timeoutAnswers);
    }
    
    
    /* BUTTON EVENTS */
    
   
    $('body').on('click', '.answer-item', function() {
        var answer = $(this).text(); 
        checkAnswer(answer); 
    });
    
    
    $('#startBtn, #restartBtn').click(function() {
       startGame(); 
    });
    
    
    // Start the Game for the First Time
    changeScreen('start-screen');
    // startGame();
});
