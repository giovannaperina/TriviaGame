/* global jQuery */ /* <-- isso é só pro Cloud9 parar de encher o saco */

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
        timerInterval = clearInterval(timerInterval); // Parar o Timer
        var correctAnswerIndex = triviaQuestion[currentQuestion].correctAnswer; // pego o index da resposta correta
        var correctAnswerText  = triviaQuestion[currentQuestion].answersList[correctAnswerIndex]; // usando o index, eu pego o TEXTO da resposta correta
        
        if(answer == 'TIMEOUT') { // Se a resposta for TIMEOUT (que vem da linha 111, caso o tempo acabe)
            $('#answerMessage').text('Timeout!'); 
            var gif = timeoutGif[Math.floor(Math.random()*timeoutGif.length)]; // pego um Gif Randomico do Array de Timeout Gifs
            $('#gif').attr('src', `assets/images/gifs/${gif}.gif`); // defino o SRC da imagem #gif
            $('#correctAnswer').html(''); // Limpo o texto de Correct Answer porque Timeout não da a resposta correta
            
            timeoutAnswers++; // adiciono +1 a pontuação de Timeout
            
        } else if(answer == correctAnswerText) { // Se a resposta passada for IGUAL a resposta correta
            $('#answerMessage').text('Correct!');
            var gif = correctGif[Math.floor(Math.random()*correctGif.length)]; // pego um Gif Randomico do Array de Correct Gifs
            $('#gif').attr('src', `assets/images/gifs/${gif}.gif`); // defino o SRC da imagem #gif
            $('#correctAnswer').html(''); // Limpo o texto de Correct Answer porque Correct não da a resposta correta
            
            rightAnswers++; // adiciono +1 a pontuação de Right Answers
            
        } else { // Se não.. a resposta está incorreta...
            $('#answerMessage').text('Wrong...');
            var gif = incorrectGif[Math.floor(Math.random()*incorrectGif.length)]; // pego um Gif Randomico do Array de Incorrect Gifs
            $('#gif').attr('src', `assets/images/gifs/${gif}.gif`); // defino o SRC da imagem #gif
            $('#correctAnswer').html(`The correct answer is: <strong>${correctAnswerText}</strong>`); // Mostro a resposta correta
            
            wrongAnswers++; // adiciono +1 a pontuação de Wrong Answers
        }
        
        // Depois de checar se está correto ou não.. mando o usuário para a tela aonde tem o Gif
        changeScreen('answer-screen');
        
        setTimeout(function() { // Depois de 4 segundos, eu sumo com a tela do GIF
            currentQuestion++; // adiciono +1 ao currentQuestion, que faz com que mudamos para a PROXIMA PERGUNTA
            
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
        changeScreen('score-screen'); // mudo a tela para Score Screen
        // alimento os spans com as pontuações de corretas, incorretas e timeout
        $('#scoreCorrect').text(rightAnswers);
        $('#scoreIncorrect').text(wrongAnswers);
        $('#scoreTimeout').text(timeoutAnswers);
    }
    
    
    /* BUTTON EVENTS */
    
    // Ao clicar em alguma Resposta:
    $('body').on('click', '.answer-item', function() {
        var answer = $(this).text(); // Pego o texto da resposta Clicada
        checkAnswer(answer); // Mando o texto para a função checkAnswer
    });
    
    // ao clicar no botão Start ou Restart, chama a função Start Game
    $('#startBtn, #restartBtn').click(function() {
       startGame(); 
    });
    
    
    // Start the Game for the First Time
    changeScreen('start-screen');
    // startGame();
});
