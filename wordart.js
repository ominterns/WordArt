var letterelements = [];
var phrase = "";
var inworkspace = false;
var chosen;

$(function () {
    $("#toolbar").hide();
    $("#workspace").hide();
    
    for (var i=36; i<=72; i=i+2) { //creates the font size select bar
        var option = $("<option></option>").text(i);
        $(option).attr('value', i.toString()+"px");
        $(option).attr('class', 'size');
        $("#font-size").append(option);
    }
    
    $("#phrase").keypress(function (e) { //Uses the enter key to determine the phrase
        if (e.keyCode == 13) {
            $("#phrase").hide();
            $("#toolbar").show();
            $("#workspace").show();
            displayWord();
        }
    });
    
    $("#workspace").droppable({
        drop: function (event, ui) {
            //just a method to check things!
        }
    });
    
    $("#background").tap( function () { //changes the background color
        $("#workspace").css("background-color", $("#workspace-color").val());
    });
    
    $("#random").tap( function() { // randomizes all the values
        var rand1 = Math.floor(Math.random()*23);  
        var rand2 = Math.floor(Math.random()*24);   
        var rand3 = Math.floor(Math.random()*24);
        var rand4 = Math.floor(Math.random()*24);
        $(".font").each( function(index) {
            if (rand1 == index)
                $("#font-family").val($(this).val());
        });
        $(".size").each( function(index) {
            if (rand2 == index)
                $("#font-size").val($(this).val());
        });
        $(".color").each( function(index) {
            if (rand3 == index)
                $("#color").val($(this).val());
            if (rand4 == index) 
                $("#workspace-color").val($(this).val());
        });
        $("#font-family").change(); //changes the sample writing to match
        $("#color").change();
        $("#font-size").change();
        $("#workspace-color").change();
    });
    
    $("#font-family").change (function() { //changes the font of the sample 
        $("#fontsample").css("font-family", $(this).val());
    });
    $("#font-size").change( function() { //changes the font of the sample
        $("#fontsample").css("font-size", $(this).val());
    });
    $("#color").change( function() { //changes the font of the sample
        $("#fontsample").css("color", $(this).val());
    });
    $("#workspace-color").change( function() {
        $("#workspace").css("background-color", $(this).val()); 
    });
    
    $("#everything").tap( function() {
        $(".letter").each( function(index) {
            $(".letter").css("font-family", $("#font-family").val());
            $(".letter").css("font-size", $("#font-size").val());
            $(".letter").css("color", $("#color").val());
        });
        $("#workspace").css("background-color", $("#workspace-color").val());
    });
    
    $("#clear").tap( function() { //clears all the css changes of the letters
        $("#font-family").val("Font").change();
        $("#font-size").val("Size").change();
        $("#color").val("Color").change();
        $("#workspace-color").val("Background Color").change();
        
        $(".letter").each( function(index) { // returns elements to original position
            $(".letter").css("font-family", "Times New Roman");
            $(".letter").css("font-size", "36px");
            $(".letter").css("color", "black");
        });
        $("#workspace").css("background-color", "white");
        
        $("#fontsample").css("font-family", "Times New Roman");
        $("#fontsample").css("font-size", "36px");
        $("#fontsample").css("color", "black");
    });
    
    $("#new").tap( function() { //resets, and allows for the creation of a new word
        $(".letter").each( function() {
            $(this).remove(); 
        });
        letterelements = []; //essentially deletes all the letters
        $("#font-family").val("Font").change(); //this resets lots of qualities
        $("#font-size").val("Size").change();
        $("#color").val("Color").change();
        $("#workspace-color").val("Background Color").change();
        $("#workspace").css("background-color", "white");
        $("#fontsample").css("font-family", "Times New Roman");
        $("#fontsample").css("font-size", "36px");
        $("#fontsample").css("color", "black");
        
        $("#phrase").show();
        $("#toolbar").hide();
        $("#workspace").hide();
    });
});

function Letter (text, inspace, selected, index) { //constructor for the Letter object
    this.text = text;
    this.inspace = inspace;
    this.selected = selected;
    this.index = index;
}

function displayWord() { //Shows the word, each letter being broken up into elements
    phrase = $("#phrase").val();   
    console.log(phrase + " - "+phrase.length);
    
    for (var i=0; i<phrase.length; i++) {
        var letter = new Letter(phrase.charAt(i), false, false, i); //creates a letter object
        var letterhtml = $("<td></td>").text(phrase.charAt(i)); //creates an html object of each letter
        letterelements[i] = [letter, letterhtml]; // adds to letterelements   
    }
    
    setAttributes(letterelements);
    
    for (var i=0; i<letterelements.length; i++) { //adds each element to the top
        $("#letters").append(letterelements[i][1]);   
        
    }
}

function setAttributes(elements) { //makes elements draggable and tappable
    for (var i=0; i<elements.length; i++) {
        $(elements[i][1]).attr("class", "letter"); 
        $(elements[i][1]).attr("id", "letter"+i.toString());
        $(elements[i][1]).draggable({appendTo: "#workspace"});
        $(elements[i][1]).css("font-size", "36px");
        $(elements[i][1]).css("width", "20px");
        $(elements[i][1]).css("font-weight", "bold");
        $(elements[i][1]).tap( function () { //changes css attributes to reflect the chosen changes
            for (var i=0; i<elements.length; i++) {
                if ($(this).attr('id') == $(elements[i][1]).attr('id')) { //finds the proper value
                    console.log($(this).text() + " " + $(elements[i][1]).attr('id'));
                    $(letterelements[i][1]).css("font-family", $("#font-family").val());
                    $(letterelements[i][1]).css("font-size", $("#font-size").val());
                    $(letterelements[i][1]).css("color", $("#color").val());
                }
            }
        });
        
        console.log(elements[i][0].text+" - ID: "+$(elements[i][1]).attr('id')+", Class: "+$(elements[i][1]).attr('class'));
    }
}