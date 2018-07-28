$(document).ready(function() {

    // Set global variables
    var counter = 0;
    var targetNumber = 0;
    var wins = 0;
    var losses = 0;
    var audioElementw = document.createElement("audio");
    audioElementw.setAttribute("src", "assets/sounds/TaDa.mp3");
    var audioElementl = document.createElement("audio");
    audioElementl.setAttribute("src", "assets/sounds/beep-10.mp3");

    // Reset for a new game
    function resetStatus() {
        // Reset variables here
        counter = 0;
        var numberOptions = [];

        // Need to generate a random odd number to shoot for
        targetNumber = (Math.floor(Math.random() * 5) + 15) * 2 + 1;
        $("#number-to-guess").text(targetNumber);

        // We need to generate random numbers for each crystal
        for (var c = 0; c < 4; c++) {
            var numberRandom = Math.floor(Math.random() * 8) + 3;
            if (numberOptions.indexOf(numberRandom) === -1) {
                numberOptions.push(numberRandom);
                console.log(numberRandom);
            } else {
                c--;
            }   
        }

        // Next we create a for loop to create crystals for every numberOption.
        
        // Clear the old ones first so we don't append more to the old
        $("#crystals").empty();
        
        // Add the new ones again
        for (var i = 0; i < numberOptions.length; i++) {

        // For each iteration, we will create an imageCrystal
        var imageCrystal = $("<img>");

        // First each crystal will be given the class ".crystal-image".
        // This will allow the CSS to take effect.
        imageCrystal.addClass("crystal-image");

        // Each imageCrystal will be given a src link to the crystal image
        imageCrystal.attr("src", "assets/images/crystal" + i + ".png");

        // Each imageCrystal will be given a data attribute called data-crystalValue.
        // This data attribute will be set equal to the array value.
        imageCrystal.attr("data-crystalvalue", numberOptions[i]);

        // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
        $("#crystals").append(imageCrystal);
        }
        console.log("Reset Complete");
        $("#totalscore").text(counter);

        gamepart();
    }

function gamepart() {
    // Start with waiting for clicks on crystals
    $(".crystal-image").on("click", function() {

        // Determining the crystal's value requires us to extract the value from the data attribute.
        // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
        // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
        // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

        var crystalValue = ($(this).attr("data-crystalvalue"));
        console.log("Typed " + crystalValue);
        crystalValue = parseInt(crystalValue);
        // We then add the crystalValue to the user's "counter" which is a global variable.
        // Every click, from every crystal adds to the global counter.
        counter += crystalValue;

        // All of the same game win-lose logic applies. So the rest remains unchanged.
        $("#totalscore").text(counter);

        if (counter === targetNumber) {
            $("#results").text("You Win!!");
            wins++;
            console.log("WINS " + wins);
            $("#win").text("Wins: " + wins);
            audioElementw.play();
            resetStatus();
        }
        else if (counter >= targetNumber) {
            $("#results").text("You Lost!!");
            losses++;
            console.log("LOSSES " + losses);
            $("#loss").text("Losses: " + losses);
            audioElementl.play();
            resetStatus();
        }
    });
    }

// Start with all new values

resetStatus();

});