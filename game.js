var buttonColor = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(".button").click(function() {
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour)

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
})

$(document).keypress(function() {
    if (!started) {
        nextSequence();
        started = true;
    }
})

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        // WRONG ANSWER //
        console.log("wrong");

        playSound("wrong");

        $("h1").text("Game Over, Press Any Key to Restart");

        $(document.body).addClass("game-over");
        setTimeout(function() {
            $(document.body).removeClass("game-over");
        }, 200)

        startOver();
    }
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed")
    }, 100)
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".wav");
    audio.play();
    audio.volume = 0.1;
}

function nextSequence() {
    $("h1").text("Level " + level);

    level++;

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColor[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

    userClickedPattern = [];
    console.log("gamePattern : " + gamePattern)

}