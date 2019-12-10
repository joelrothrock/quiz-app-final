function startQuiz(){
  $('#start-button').on('click', function(event){
    console.log('start has been clicked');
    generateQuestion();
  });
}

//different
function updateQuestionNumber(){
  //STORE.currentQuestion++;
  const questionNumber = $(`<span class='question-number'> ${STORE.currentQuestion +1} </span>`);
  $('.question-number').html(questionNumber);
  console.log(`next question has been updated ${STORE.currentQuestion}`);
}
//different
function updateScore(){
  const scoreDisplay = $(`<span class='score'>${STORE.score}</span>`);
  $('.score').html(scoreDisplay);
  console.log(`score has been updated  ${STORE.score}`);
}

function updateOptions(){
  console.log('update options is working');
  let question = STORE.questions[STORE.currentQuestion];
  for(let i=0; i<question.options.length; i++)
  {
    $('.js-display-options').append(`
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
        <label for="option${i+1}"> ${question.options[i]}</label> <br/>
        <span id="js-r${i+1}"></span>
    `);
  }
}

function generateQuestion(){
  let question = STORE.questions[STORE.currentQuestion];
  updateQuestionNumber();
  updateScore();
  //updateOptions(); 
  const questionHTML = $(`
    <div>

      <form id="js-questions" class="question-form">

        <fieldset>
          <div class='js-display-questions'>
          <legend>${question.question}</legend>
          </div>

          <div class='js-display-options'>
          </div>

          <div class="js-display-buttons">
              <button type = "submit" id="answer" tabindex="5">Submit</button>
              <button type = "button" id="next-question" tabindex="6"> Next</button>
          </div>

        </fieldset>
      </form>
    </div>
  `)
  $('#quiz').html(questionHTML); 
  updateOptions();
  $("#next-question").hide();
}

function displayResults() {
  let resultHtml = $(
    `<div class="results">
      <form id="js-restart-quiz">
        <fieldset>
          <div class="row">
            <div class="col-12">
              <legend>Your Score is: ${STORE.score}/${STORE.questions.length}</legend>
            </div>
          </div>
        
          <div class="row">
            <div class="col-12">
              <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </div>
        </fieldset>
    </form>
    </div>`);
    STORE.currentQuestion = 0;
    STORE.score = 0;
  $('#quiz').html(resultHtml);
}


function handleQuestions() {
  $('body').on('click','#next-question', (event) => {
    STORE.currentQuestion === STORE.questions.length?displayResults() : generateQuestion();
  });
  console.log(`the current question is` + ` ` +STORE.currentQuestion);
}



function checkAnswer() {
  $('body').on('submit','#js-questions', function(event) {
    event.preventDefault();
    console.log('SUBMIT was clicked');
    let currentQues = STORE.questions[STORE.currentQuestion];
    let playerSelection = $('input[name=options]:checked').val();
    if(!playerSelection){
      alert('Please select an answer');
      return; 
    }


     let id_num = currentQues.options.findIndex(i => i === playerSelection);
    let id = "#js-r" + ++id_num;
    $('span').removeClass("right-answer wrong-answer");
    if(playerSelection === currentQues.answer) {
      STORE.score++; 
      $(`${id}`).append(`You got it right<br/>`);
      $(`${id}`).addClass("right-answer");
    }
    else {
      $(`${id}`).append(`You got it wrong <br/> The answer is "${currentQues.answer}"<br/>`);
      $(`${id}`).addClass("wrong-answer");
    }

    STORE.currentQuestion++;
    $("#js-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
    $('#answer').hide();
    $("input[type=radio]").attr('disabled', true);
    $('#next-question').show();
  });
}

function restartQuiz() {
  $('body').on('click','#restart', (event) => {
    renderAQuestion();
  });
}

function runQuiz(){
  startQuiz();
  checkAnswer();
  handleQuestions();
}

$(runQuiz);

