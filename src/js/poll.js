(function () {
    //Check focus
    $(document).on('keypress',function(e) {
        if(e.which == 13) {
            let pollQuestion = document.getElementById('poll-question').value; // what is the meaning
            $('#vote-question').html(pollQuestion); //Doublecheck on enterkey
        }
    });
})();

    
function enableBtn(event){
    let nextEl1 = $(event.target).next();
    nextEl1.removeAttr("disabled");
}

let q = 1;

function addQuestion(event) {
    //First check if inputfield has value

    //If there are no 10 answers yet, add another input
    if (q <= 9) {
        q++;
        let answer =
         `<li class="answer">
                <input id="answer-input-` + q + `" type="text" name="answer-input" placeholder="answer option" maxlength="18" onkeyup="enableBtn(event)">
                <input id="answer-btn-` + q + `" onclick="addQuestion(event)" type="button" value="Add" disabled>
            </li>`;
        let $answerOptions = $('#answer-options');
        let answerAmount = document.getElementById('answer-amount');
        let newAmount = q.toString();

        $answerOptions.append(answer);
        
        answerAmount.innerHTML = newAmount;
      
        //If two answers are set, move them to vote panel
        if(q >= 3) {
            getInputValues();
        }

    } else {
        window.alert('Max amount of questions is reached');
    }
}

v = 1;

function getInputValues(){
    v++;

    let $firstAnswer = $('#votes li:first-child');
    let answers = document.getElementsByName("answer-input");
    let pollOption = `<li class="vote">
                        <input type="radio" value="vote" id="` + v + `" name="vote">
                        <label id="vote-label-` + v + `" for="vote">vote ` + v + `</label>
                      </li>`;

    let $votesList = $('#votes');
    let $voteBtn = $('#vote-btn');

    //show first child and append second
    $firstAnswer.removeClass('hidden');
    $voteBtn.removeClass('hidden');
    $votesList.append(pollOption);

    //Create arrays for answers and votes
    var answersArray = [];

    for (var i = 0; i < answers.length; i++) {
        answersArray.push(answers[i].value); 
    }

    setVoteOptions(answersArray);
    updateVotesArray();
    chartUpdate(answersArray);
}

function setVoteOptions(answersArray) {
    let voteValues = document.getElementsByName("vote");
    let voteLabel = document.getElementsByTagName('label');

    for (var o = 0; o < voteValues.length; o++) {
        //overwrite votevalue
        voteValues[o].value = answersArray[o];

        //overwrite labeltext
        voteLabel[o].innerHTML = answersArray[o];
    }

}


function updateVotesArray(updateVal) {
    var votesArray = [];

    let $radioBtns = $('input[type="radio"]');
    let length = $radioBtns.length;

    for(var i = 0; i < length; i++) {
        votesArray.push(0);
    }

    if(updateVal) {
       var newValue =  votesArray[updateVal] + votesArray[updateVal] + 1;
       votesArray[updateVal] = newValue;
    }

  //  submitVote(votesArray);
}


function submitVote(votesArray) {
    let $radioBtns = $('input[type="radio"]');
    let $chartwrap = $('#chart-wrap');
    $chartwrap.removeClass('hidden');
    $('#chart-intro').addClass('hidden');

    if (!$("input[type='radio']:checked").val()) {
         return false;
     }
     else {
        var checkedID = $("input[type='radio']:checked").attr('id');    
        var updateVal = checkedID -1;
    }

    updateVotesArray(updateVal);

    $radioBtns.prop('checked', false);
}



/// CHART.JS
function chartUpdate(answersArray) {
    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: answersArray,
            datasets: [{
                label: 'Votes',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [3] //votesArray
            }]
        },

        // Configuration options go here
        options: {}
    });

}
