//-------------------phone validation-------------------

// clear form onload page
window.onload = (function() {
    $('#phone_number').val(null);
    $("input[id='phone_number']").val('');
}); 


$(document).ready(function() {

    // clear form onload page
    $("input[id='phone_number']").val('');

    // keypress enter - false
    $('#phone_number').keypress(function (e) {
        var key = e.which;
        if(key == 13) {
            return false;  
        }
    });  


    // maxlength
    $('#phone_number').on('blur keydown keyup change', function(){
        validateLength();
    });  

    let lengthVal = false;

    function validateLength() {
        const inputNum = $('#phone_number');
        var minLength = 10;
        var maxLength = 15;
        var char = inputNum.val();
        var charLength = inputNum.val().length;
        var input = document.querySelector('#phone_number');

        function duplicateVal(){
            if (input.value.match(/(.)\1{5,}/g)){
                // console.log('duplicate');
                $('#phone_number').removeClass('valid');
                $('#phone_number').removeClass('invalid');
                $('.valid_info').text('The entered number is invalid, many of the same characters').css('color', 'red');
                $('#phone_number').addClass('invalid'); 
                lengthVal = false;
                return false;
            }
        }

        if (input.value.match(/[\+]/g)) {
            if (input.value.match(+38)) {
                if (input.value.length<13) {
                    $('#phone_number').removeClass('valid');
                    $('#phone_number').removeClass('invalid');
                    $('.valid_info').text('The entered number is invalid, a minimum of 13 characters is required').css('color', 'red');
                    $('#phone_number').addClass('invalid'); 
                    duplicateVal();
                    lengthVal = false;
                    return false;
                }
                else {
                    $('#phone_number').removeClass('valid');
                    $('#phone_number').removeClass('invalid');
                    $('.valid_info').text('The entered number is valid').css('color', 'green');
                    $('#phone_number').addClass('valid'); 
                    duplicateVal();
                    lengthVal = true;
                    return true;
                }
            } 
            else {
                if (input.value.length<12) {
                    $('#phone_number').removeClass('valid');
                    $('#phone_number').removeClass('invalid');
                    $('.valid_info').text('The entered number is invalid, a minimum of 12 characters is required').css('color', 'red');
                    $('#phone_number').addClass('invalid');  
                    duplicateVal(); 
                    lengthVal = false;
                    return false;
                }  
                else {
                    $('#phone_number').removeClass('valid');
                    $('#phone_number').removeClass('invalid');
                    $('.valid_info').text('The entered number is valid').css('color', 'green');
                    $('#phone_number').addClass('valid');
                    duplicateVal();  
                    lengthVal = true;
                    return true; 
                }
            } 
        }
        else{
            if (charLength == maxLength){
                $('#phone_number').removeClass('valid');
                $('#phone_number').removeClass('invalid');
                $('.valid_info').text('The entered number is valid').css('color', 'green');
                $('#phone_number').addClass('valid');
                duplicateVal();
                lengthVal = true;
                return true;
            } 
            else if (charLength < minLength) {
                $('#phone_number').removeClass('valid');
                $('#phone_number').removeClass('invalid');
                $('.valid_info').text('The entered number is invalid, a minimum of '+minLength+' characters is required').css('color', 'red');
                $('#phone_number').addClass('invalid'); 
                if(charLength == 0) {
                    $('#phone_number').removeClass('valid');
                    $('#phone_number').removeClass('invalid');
                    $('.valid_info').text('');
                    lengthVal = false;
                    return false;
                }
                duplicateVal(); 
                lengthVal = false;
                return false;
            }
            else if (charLength > maxLength) {
                $('#phone_number').removeClass('valid');
                $('#phone_number').removeClass('invalid'); 
                inputNum.val(char.substring(0, maxLength));
                lengthVal = false;
                return false;
            }
            else if (input.value.match(/(.)\1{5,}/g)){
                $('#phone_number').removeClass('valid');
                $('#phone_number').removeClass('invalid');
                $('.valid_info').text('The entered number is invalid, many of the same characters').css('color', 'red');
                $('#phone_number').addClass('invalid'); 
                lengthVal = false;
                return false;
            }  
            else {
                $('#phone_number').removeClass('valid');
                $('#phone_number').removeClass('invalid');
                $('.valid_info').text('The entered number is valid').css('color', 'green');
                $('#phone_number').addClass('valid');
                lengthVal = true;
                return true;
            }
        }
    }


    // only-numeric
    $('#phone_number').on('blur keydown keyup change', function(){
        validateNumber();
    });  

    let valNum = true;

    function validateNumber() {
        document.oninput = function() {
            var input = document.querySelector('#phone_number');
            var firstValue = input.value.slice(0,1).replace(/[^\+]/g,'');
            var restValue = input.value.replace(/[^0-9\d]/g,'');
        
            if (input.value == 1) {
                input.value = firstValue;
            }
            else if (input.value.length > 1) {
                input.value = restValue;
                valNum = true;
            }

            input.value = firstValue + restValue;

            //duplicate numb
            if (input.value.match(/(.)\1{5,}/g)){
                $('#phone_number').removeClass('valid');
                $('#phone_number').removeClass('invalid');
                $('.valid_info').text('The entered number is invalid, many of the same characters').css('color', 'red');
                $('#phone_number').addClass('invalid'); 
                valNum = false;
                return false;
            }
        }
    }
    

    // remove emoji
    $(document).ready(function(){
        var ranges = [
            '[\u00A0-\u269f]',
            '[\u26A0-\u329f]',
            // The following characters could not be minified correctly
            // if specifed with the ES6 syntax \u{1F400}
            '[🀄-🧀]',
            '[\u{1F004}-\u{1F9C0}]',
            '\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
            '\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
            '\ud83d[\ude80-\udeff]',
            '[\uE000-\uF8FF]',
            '[\u2011-\u26FF]',
            '\uD83E[\uDD10-\uDDFF]'
        ];
            
        $('#phone_number').on('keydown keyup change', function() {
            removeInvalidChars();
        });
        
        function removeInvalidChars() {
            var str = $('#phone_number').val();
            str = str.replace(new RegExp(ranges.join('|'), 'ug'), '');
            $("#phone_number").val(str);
        }
    });


    //check validation
    $('#phone_number').on('blur keyup change', function(){
        validateLength();
        validateNumber();
 
        if (lengthVal == true && valNum == true) {
            $('#btn_next').prop('disabled', false).attr("onclick", "window.location.href='#';"); 

            $('#phone_number').keypress(function (e) {
                if (lengthVal == true && valNum == true ) {
                    var key = e.which;
                    if(key == 13) {
                        $('#btn_next').click();
                        return false;  
                    }
                }
            });   
            return true;
        } 
        else {
            $('#btn_next').prop('disabled', true);

            $('#phone_number').keypress(function (e) {
                var key = e.which;
                if(key == 13) {
                    return false;  
                }
            });   
            return false;
        }
    });
});