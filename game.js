var userClickedPattern=[];
var gameStart=false;
var levelCount=0;
var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
function nextSequence() {
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(randomChosenColour);
    levelCount++;
    $("h1").text("Level "+levelCount);
    $("#"+randomChosenColour).animate({opacity: '20%'},100).animate({opacity: '100%'},100);

}
$(".btn").click(function () {
    if(gameStart==true) {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor);
        animatePress(userChosenColor);
        if (checkAnswer(levelCount)) {
            setTimeout(function () {
                nextSequence();
            }, 200);

        }
    }
    console.log(userClickedPattern);
})
$(document).keypress(function (event) {
    if(gameStart==false){
        gameStart=true;
        $("h1").text("Level "+levelCount);
        if(checkAnswer(levelCount)) {
            setTimeout(function () {
                nextSequence();
            },200);

        }
    }
})

function playSound(color) {
    var audio = new Audio('sounds/'+color+'.mp3');
    audio.play();
}
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColour).removeClass("pressed");
    },100);

}
function checkAnswer(level) {
    if(userClickedPattern.length<=level) {
        for (var i = 0; i < userClickedPattern.length; i++) {
            if (userClickedPattern[i] != gamePattern[i]) {
                gameStart = false;
                $("h1").text("Press any key to restart !");
                gamePattern = [];
                userClickedPattern = [];
                $("body").addClass("game-over");
                setTimeout(function () {
                    $("body").removeClass("game-over");
                },200)
                var audio = new Audio('wrong.mp3');
                audio.play();
                levelCount = 0;
                return false;
            }
        }
        if(userClickedPattern.length==level) {
            userClickedPattern = [];
            return true;
        }
    }
    return false;
}



