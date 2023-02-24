var string = "Hello world!";
var shuffles = 10;
var frames = 800;

//-----------------------------------------------------------------

$(document).ready(function() {

    // add text
    function text() {
        $(".random span").remove();
        var str = string.split("");
        $.each(str, function(i) {
            if (str[i] === " ") {
                $(".random").append("<span>" + "&nbsp;" + "</span>");
            }
            else {
                $(".random").append("<span>" + str[i] + "</span>");
            }   
        });
       
    }

    text();


    // shuffle animation on button click
    $(".btn").on("click", function () {
        
        var time = 0;
        text();

        var loop;
        var array = ["А", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
                    " ", "№", "#", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "'", "!", "?", "-",];
             
                        
        // animation for each character
        $(document).ready(function() {
            $(".random").find("span").each(function() {
                var obj = $(this);

                setTimeout(function() {
                    shuffleText(obj, obj.text(), shuffles, frames);
                }, time);

                time = time + 300;
            });

        });


        // shuffle function
        function shuffleText(obj, letter, shuffles, frames) {
            var i = 0;
            var loop = setInterval(function() {
            if (i < shuffles) {
                var random = Math.floor(Math.random() * (array.length+1));
                obj.text(array[random]);
            } 
            else {
                for (var e = 0; e < array.length; e++) {
                    if (array[e] !== letter) {
                        obj.text(letter);
                        break;
                    }
                }
                myClear(loop);
            }
            i++;
            }, frames/shuffles);
        }


            // clear timer
            function myClear(loop) {
                window.clearInterval(loop);
            }

    });

});