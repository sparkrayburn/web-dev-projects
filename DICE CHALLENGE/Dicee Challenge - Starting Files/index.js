var randomNumber1 = Math.ceil (Math.random() * 6);
var randomNumber2 = Math.ceil (Math.random() * 6);
var randomDiceImage = "images/dice" + randomNumber1 + ".png";

var randomDiceImage2 = "images/dice" + randomNumber2 + ".png";

//this is a comment
document.querySelectorAll("img")[0].setAttribute("src", randomDiceImage);

document.querySelectorAll("img")[1].setAttribute("src", randomDiceImage2);

if (randomNumber1 > randomNumber2) {
    document.querySelector("h1").textContent = "Player 1 winss!!!"
    
} 

else if(randomNumber1 < randomNumber2) {
    document.querySelector("h1").textContent = "Player 2 winss!!!"
    
} 

else {
    document.querySelector("h1").textContent = "Retryyyy!!!"
}










