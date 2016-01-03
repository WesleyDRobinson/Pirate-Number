// Project Requirements:

// Done - When a game begins, there should be a random number generated between 1-100.
var pirateNumber = Math.floor(Math.random() * (101 - 1)) + 1;
var plankSteps = 6;

// Done - The user should have an input field where they can submit a guess.
var prisonerGuess;
var prisonerGuessArray = [];
var reload = function () {
    location.reload()
};

// Done - After the user submits a guess, indicate whether their guess is 'hot' or 'cold'. Let the user know if they need to guess higher or lower.

// Done -Must be HTML based (ie, .toggleClass() display:hidden or display:shown -- find Bootstrap div overlays)

// function deciding high or low
var highOrLow = function () {
    if (prisonerGuess > pirateNumber) {
        // guess lower
        $("span.higher-lower").text("Guess lower!")
    } else if (prisonerGuess < pirateNumber) {
        // guess higher
        $("span.higher-lower").text("Guess higher!")
    }
};


// Done - function deciding how hot or cold.
var hotOrCold = function () {
    var difference = Math.abs(prisonerGuess - pirateNumber)
    if (difference > 40) {
        //.not-close
        $("div.not-close").removeClass('hidden').slideDown().delay(3500).slideUp(400);
        //$("div.not-close").slideUp();
    } else if (difference > 20) {
        // .closer
        $("div.closer").removeClass('hidden').slideDown().delay(3500).slideUp(400)
    } else if (difference > 5) {
        // .almost
        $("div.almost").removeClass('hidden').slideDown().delay(3500).slideUp(400)
    } else if (difference <= 5) {
        // .very-close
        $("div.very-close").removeClass('hidden').slideDown().delay(3500).slideUp(400)
    } else {
        $("span.display-message").replaceWith("<span class='display-message'><h3>What've ye done?</h3><p>Oh, ye've really pushed me buttons.<br><strong>Walk the plank.</strong></p></span>");
        $("div.message").modal('show');
        $("button.yaaargh").on('click', reload);
    }
    highOrLow();
};

// Win conditions -- Change the background color, add an image, or do something creative when the user guesses the correct answer.
var winnerWinner = function () {
    //alert("You've beat me. Yer free to go...\nOr ye can join me crew and sail the seas!");

    $("span.display-message").replaceWith("<span class='display-message'><h3>Argh! Ye've beat me.</h3><p>Yer free to go... Or ye can join me crew and sail the seas!</p></span>");
    $("div.message").modal('show');
    $("button.yaaargh").on('click', reload);
};

// Done - What happens when guess is entered.
var whatHappens = function () {

    prisonerGuess = Number($("#prisoner-guess").val());
    //reset input immediately
    $("#prisoner-guess").val("").removeAttr("value").attr('placeholder', 'Guess again!')

    var differenceThisGuess = Math.abs(prisonerGuess - pirateNumber)
    var differencePrevGuess = Math.abs(prisonerGuessArray[prisonerGuessArray.length - 1] - pirateNumber)
// Done. Validate inputs that they are real numbers between 1-100.
    if (isNaN(prisonerGuess)) {
        $("span.display-message").replaceWith("<span class='display-message'><h3>What kinda game are ye playin'?</h3><p><strong>Walk the plank!!</strong></p></span>");
        $("div.message").modal('show');
        $("button.yaaargh").on('click', reload); // end game
    } else if (prisonerGuess === 0) {
        $("span.display-message").replaceWith("<span class='display-message'><h3>Argh... you better try harder than that.</h3></span>");
        $("div.message").modal('show');
    } else if (prisonerGuess < 1 || prisonerGuess > 100) {
        $("span.display-message").replaceWith("<span class='display-message'><h3>Ye've pushed yer luck!</h3><p><And too far!<br><strong>Walk the plank.</strong></p></span>");
        $("div.message").modal('show');
        $("button.yaaargh").on('click', reload); // end game

// Done -- Store all of the guesses and create a way to check if the guess is a repeat.
    } else if ($.inArray(prisonerGuess, prisonerGuessArray) > -1) {
        $("span.display-message").replaceWith("<span class='display-message'><h3>Ye've already guessed that number!</h3><p>Me patience is run out.<br><strong>Walk the plank!!</strong></p></span>");
        $("div.message").modal('show');
        $("button.yaaargh").on('click', reload); // end game
// Win conditions -- Change the background color, add an image, or do something creative when the user guesses the correct answer.
    } else if (prisonerGuess == pirateNumber) {
        winnerWinner(); // Win Results!
// Done - Track the user's previous guess. Let them know if they are getting “hotter” or “colder” based on their previous guess.
    } else if (differencePrevGuess !== NaN && differenceThisGuess > differencePrevGuess) {
        $("span.display-message").replaceWith("<span class='display-message'><h3>ARGH! Yer last guess was closer.</h3><p>What're ye doin'?</p></span>");
        $("div.message").modal('show');
        hotOrCold();
    } else {
        hotOrCold();
    }

    //Happens everytime
    //Add guess to the array
    prisonerGuessArray.push(prisonerGuess);


// Done - After a user guesses a number keep a visual list of Hot and Cold answers that the user can see.
    $('.guess-array-display').replaceWith("<span class='guess-array-display'>" + prisonerGuessArray.join(", ") + "</span>");

    //walk one step towards the end
    plankSteps--;


// Done. Allow the user to guess only a certain amount of times. When they run out of guesses let them know the game is over.
    if (plankSteps === 0) {
        $("span.display-message").replaceWith("<span class='display-message'><h3>That's still not it!</h3><p>Ye've lost this game.<br>Ye've lost yer life.<br>Say yer last werds and <strong>walk the plank!</strong></p></span>");


    }
    //update remaining steps
    $("#plank-steps-remaining").replaceWith("<span id='plank-steps-remaining'>" + plankSteps + "</span>");


    event.preventDefault();


    return prisonerGuess;
};


// Done - Submit the guess by pressing enter or clicking the submit button.
$("#guess").submit(whatHappens);
$("button#prisoner-guess").on('click', whatHappens);

// Done* would like updates -- Create a button that provides the answer (Give me a Hint).
$("button.answer").on('click', function () {

    //$(this).addClass('sure').text("I'm not going to play this game!").removeClass('answer');
    $("span.display-message").replaceWith("<span class='display-message'><h3>Vaery well. That suits me jest fine.</h3><p>Me number is " + pirateNumber + ".<p>Ye've lost this game.<br>Ye've lost yer life.<br>Say yer last werds and <strong>walk the plank!</strong></p></span>");
    $("div.message").modal('show');
    $("button.yaaargh").on('click', reload);
    //alert("Yer gonna make me upset!");
});
//

// I want to give the user warnings... can't get this to work.

// $("button.sure").on('click', function(){

// 	$('button.sure').addClass('final').text("I doubt it.").removeClass('sure');
// 	//alert("Yer gonna make me upset!");
// });


// $("button.final-chance").on('click', function(){
// 	alert("Ye've lost this game.\nYe've lost yer life.\nSay yer last werds and walk the plank!");
// });

// Done - In process - Create a new game button that resets the game.
$("button.reset").on('click', function () {
    $("span.display-message").replaceWith("<span class='display-message'><h3>This one's no good and a coward.</h3><p>Let'em live in shame.<br>Bring me the next prisoner!</p></span>");
    $("div.message").modal('show');
    $("button.yaaargh").on('click', reload);
});

//Show number for testing
//$("span.pirate-number").text(pirateNumber);







