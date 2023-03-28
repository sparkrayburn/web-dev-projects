
var level = 1;
begin();
function begin() {
        $("body").on("keydown", function () {
    $("h1").text("level "+ level);
     colors();
});
    
   }








function colors() {
    var color = ["red", "green", "blue", "yellow"];
        var randomgen = Math.floor(Math.random(5) * 5);
        $("#"+color[randomgen]).fadeOut().fadeIn();
        makesound(color[randomgen]);
        checkclick(color[randomgen]);
    
}

function makesound(key) 
{  
    switch (key) {
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;            
    
        default:
            break;
    }
    
}


function checkclick(keycolor) {
    console.log(keycolor);
    $(".btn").click(function (e) { 
        if ( (e.target.id) == keycolor) {
            console.log("right");
            colors();
        }
        else{
            $("h1").text("Game over");
        }
        
    });
}










