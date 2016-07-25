/*
 * Scripts for index.html
*/


document.addEventListener("DOMContentLoaded", function () { 
    var btn1 = document.getElementById('btn1'),
        btn2 = document.getElementById('btn2'),
        user = {name: "", email: ""};


    function validate (param, str) {
    /*
     * Function to validate entered data (name and email)
    */
        switch(param) {
            case 'name':
                if (str.search(/^[\w\d]{1,15}$/) !== -1) { return true }
                break;
            case 'email':
                if (str.search(/^.+@.+$/) !== -1) { return true }
                break;
        }
        return false;
    }
    
    function endDialog () {
    /*
     * Function to send data to a server, end dialog with user 
     * and show result message
    */
        var xhttp = new XMLHttpRequest();
        
        xhttp.onreadystatechange = function() {
            var markChecked = document.createElement('span'),
                message = document.createTextNode("You're on. Talk soon.");
        
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                if (xhttp.responseText === "ok") {
                    markChecked.className = "sprite  checked";
                    
                    btn1.className = btn1.className.replace(/(?:^|\s)sw-dialog(?!\S)/, "");
                    btn1.className += " sw-ok";
                    
                    btn1.innerHTML = "";
                    btn1.appendChild(markChecked);
                    btn1.appendChild(message);
                    btn2.parentNode.replaceChild(btn1.cloneNode(true), btn2);
                }
            }
        }

        xhttp.open("GET", "test.asp?params=" + JSON.stringify(user), true);
        xhttp.send();
    }

    function toggleToDialog () {
    /*
     * Function to start dialog with user 
    */
        var input = document.createElement('input'),
            markNext = document.createElement('span');
        
        input.type = "text";
        input.placeholder = "What's your name?";
        markNext.className = "sprite  down-sm";
        
        btn1.className = btn1.className.replace(/(?:^|\s)sw-main(?!\S)/, "");
        btn1.className += " sw-dialog";
        
        btn1.innerHTML = "";
        btn1.appendChild(markNext);
        btn1.appendChild(input);
        input.focus();
        
        btn1.removeEventListener("click", toggleToDialog, false);
        markNext.addEventListener("click", function () {
            var value = input.value;
                
            if (user.name === "") {
                if (validate('name', value)) { 
                    user.name = value;
                    input.value = "";
                    input.placeholder = "...and your email?";
                    input.focus();
                }
            } else {
                if (validate('email', value)) { 
                    user.email = value;
                    endDialog();
                }
            }
        }, false);
    }


    btn1.addEventListener("click", toggleToDialog, false);
    btn2.addEventListener("click", function () {
        if (user.name === "") {
            toggleToDialog();
        } else {
            document.querySelector("#btn1 input").focus();
        }
    }, false);
}, false);