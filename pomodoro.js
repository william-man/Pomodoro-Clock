var increment = 60000; //60000ms in 1 min;
var decrement = 60000;
var startTime = new Date().getTime();
var endTime = startTime + increment*25;
var breakEndTime = startTime + increment*5;
var currentTime = endTime - startTime;
var breakCurrentTime = breakEndTime - startTime;
var timerSwitch = false;
var userSessionTime = startTime + increment*25;
var userBreakTime = startTime  + increment*5;



$(document).ready(function(){
    $("#session_timer").text = displayTime();

    $("#session-start").on("click",function(){
        timerSwitch = true;
        document.getElementById("session-start").disabled=true;
        $("#sessionstate").fadeTo(500,1);
        disableBreakButtons();
        sessionTimer();
    })

    function sessionTimer() {
        var countdown = setInterval(function() {
            
            if (timerSwitch === false) {  
                clearInterval(countdown);
                displayTime();
            } else if (currentTime === 0 && timerSwitch === true) {
                $("#sessionstate").fadeTo(500,0);
                $("#breakstate").fadeTo(500,1);
                disableSessionButtons();
                enableBreakButtons();
                document.getElementById("break-start").disabled=true;
                clearInterval(countdown);
                sessionAlarm();
                sessionLoop();
                updateCurrent();
                breakTimer();
            } else {
                endTime -= 1000;
                currentTime = endTime - startTime;
                displayTime(); 
            }
            
        },1000);
    }
    var alarm = document.getElementById("sessionAlarm");
    alarm.volume = 0.1;
    function sessionAlarm() {
        
        alarm.play();
        var playAlarm = setInterval(function() {
            alarm.pause();
            alarm.currentTime = 0;
            clearInterval(playAlarm);
        }, 1200);
        
    }
    
    function displayTime() {
        var hours = Math.floor((currentTime%(1000*60*60*24)) / (1000*60*60));
        var minutes = Math.floor((currentTime%(1000*60*60))/(1000*60));
        var seconds = Math.floor((currentTime%(1000*60))/(1000));
        var hoursDisplay = "";
        var minutesDisplay = "";
        var secondsDisplay = "";
        if (hours< 10) {
            hoursDisplay = "0" + String(hours);
        } else {
            hoursDisplay = String(hours);
        }
        if (minutes < 10) {
            minutesDisplay = "0" + String(minutes);
        } else {
            minutesDisplay  = String(minutes);
        }
        if (seconds < 10) {
            secondsDisplay = "0" + String(seconds);
        } else {
            secondsDisplay = String(seconds);
        }
        document.getElementById("session_timer").innerHTML = hoursDisplay + " : " + minutesDisplay + " : " + secondsDisplay;
    }

    function updateCurrent() {
        currentTime = endTime - startTime;
        displayTime();
    }

    $("#session-stop").on("click", function() {
        enableBreakButtons();
        document.getElementById("session-start").disabled=false;
        $("#sessionstate").fadeTo(500,0);
        timerSwitch = false; 
    })

    $("#session-reset").on("click",function() {
        $("#sessionstate").fadeTo(500,0);
        enableBreakButtons();
        document.getElementById("session-start").disabled=false;
        timerSwitch=false;
        startTime = new Date().getTime();
        endTime = startTime + increment*25;
        userSessionTime = startTime + increment*25;
        currentTime = endTime - startTime;
        alarm.currentTime = 0;
        displayTime();
    })

    function sessionLoop() {
        endTime = userSessionTime;
        updateCurrent();
    }

    $("#add-time").on("click",function() {
        endTime += 1000*60;
        userSessionTime += 1000*60
        updateCurrent();

        if (currentTime > 1000*60*60) {
            endTime = startTime + increment*60;
            userSessionTime = startTime + increment*60;
            updateCurrent();
        }
    })
    $("#minus-time").on("click",function() {
        endTime -= 1000*60;
        userSessionTime -= 1000*60;
        updateCurrent()

        if (currentTime <0) {
            endTime = startTime;
            userSessionTime = startTime;
            updateCurrent();
        }
    })
    
    function disableBreakButtons() {
        document.getElementById("break-start").disabled=true;
        document.getElementById("break-stop").disabled=true;
        document.getElementById("break-reset").disabled=true;

    }
    function enableBreakButtons() {
        document.getElementById("break-start").disabled=false;
        document.getElementById("break-stop").disabled=false;
        document.getElementById("break-reset").disabled=false;
    }

    //--------------------------------------------------------//

    $("#break_timer").text = displayBreakTime();

    $("#break-start").on("click",function(){
        timerSwitch = true;
        $("#breakstate").fadeTo(500,1);
        disableSessionButtons()
        document.getElementById("break-start").disabled=true; 
        breakTimer(); 
    })
    function breakTimer() {
        var countdown = setInterval(function() {  
            if (timerSwitch === false) {
                clearInterval(countdown);
                displayBreakTime();
            } else if (breakCurrentTime === 0 && timerSwitch === true) {
                $("#breakstate").fadeTo(500,0);
                $("#sessionstate").fadeTo(500,1);
                disableBreakButtons();
                enableSessionButtons();
                document.getElementById("session-start").disabled=true;
                clearInterval(countdown);
                sessionAlarm();
                breakLoop();
                updateBreakCurrent();
                sessionTimer();
            } else {
                breakEndTime -= 1000;
                breakCurrentTime = breakEndTime - startTime;
                displayBreakTime(); 
            }
            
        },1000);
    }
    function displayBreakTime() {
        var hours = Math.floor((breakCurrentTime%(1000*60*60*24)) / (1000*60*60));
        var minutes = Math.floor((breakCurrentTime%(1000*60*60))/(1000*60));
        var seconds = Math.floor((breakCurrentTime%(1000*60))/(1000));
        var hoursDisplay = "";
        var minutesDisplay = "";
        var secondsDisplay = "";
        if (hours< 10) {
            hoursDisplay = "0" + String(hours);
        } else {
            hoursDisplay = String(hours);
        }
        if (minutes < 10) {
            minutesDisplay = "0" + String(minutes);
        } else {
            minutesDisplay  = String(minutes);
        }
        if (seconds < 10) {
            secondsDisplay = "0" + String(seconds);
        } else {
            secondsDisplay = String(seconds);
        }
        document.getElementById("break_timer").innerHTML = hoursDisplay + " : " + minutesDisplay + " : " + secondsDisplay;
    }
    
    $("#break-stop").on("click", function() {
        enableSessionButtons()
        $("#breakstate").fadeTo(500,0);
        document.getElementById("break-start").disabled=false;
        timerSwitch = false;
    })
    
    $("#break-reset").on("click",function() {
        enableSessionButtons()
        $("#breakstate").fadeTo(500,0);
        document.getElementById("break-start").disabled=false;
        timerSwitch=false;
        startTime = new Date().getTime();
        breakEndTime = startTime + increment*5;
        breakCurrentTime = breakEndTime - startTime;
        userBreakTime = startTime + increment*5;
        alarm.currentTime = 0;
        displayBreakTime();
    })
    function breakLoop() {
        breakEndTime = userBreakTime;
        updateBreakCurrent();
    }
    function updateBreakCurrent() {
        breakCurrentTime = breakEndTime - startTime;
        displayBreakTime();
    }
    $("#break-add-time").on("click",function() {
        breakEndTime += 1000*60;
        userBreakTime += 1000*60
        updateBreakCurrent();

        if (breakCurrentTime > 1000*60*60) {
            breakEndTime = startTime + increment*60;
            userBreakTime = startTime + increment*60;
            updateBreakCurrent();
        }
    })

    $("#break-minus-time").on("click",function() {
        
        breakEndTime -= 1000*60;
        userBreakTime -= 1000*60;
        updateBreakCurrent();

        if (breakCurrentTime <0) {
            breakEndTime = startTime;
            userBreakTime = startTime;
            updateBreakCurrent();
        }
    })

    function disableSessionButtons() {
        document.getElementById("session-start").disabled=true;
        document.getElementById("session-stop").disabled=true;
        document.getElementById("session-reset").disabled=true;

    }

    function enableSessionButtons() {
        document.getElementById("session-start").disabled=false;
        document.getElementById("session-stop").disabled=false;
        document.getElementById("session-reset").disabled=false;
    }
})








