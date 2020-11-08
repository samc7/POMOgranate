var productivityTimer;
var breakTimer;
var isOn;
var isBreak;
var endTime;
var currentInterval;
var totalIntervals;

document.addEventListener('DOMContentLoaded', documentEvents  , false);

function documentEvents() {
  document.getElementById('starty').addEventListener('click',
      function() { startTimer();
      });

  document.getElementById('endy').addEventListener('click',
      function() { endTimer();
      });
}

function startTimer(){
  if (isOn == "false"){
    var now = new Date().getTime();
    isOn = "true"
    isBreak = "false"
    currentInterval = 1
    endTime = now + productivityTimer
    localStorage.setItem("isOn", isOn);
    localStorage.setItem("isBreak", isBreak);
    localStorage.setItem("endTime", endTime);
    localStorage.setItem("currentInterval", currentInterval);
  }
}

function endTimer(){
  if (isOn == "true"){
    isOn = "false"
    isBreak = "false"
    localStorage.setItem("isOn", isOn);
    localStorage.setItem("isBreak", isBreak);
    localStorage.setItem("endTime", 0);
  }
}

$(document).ready(function() {
  var init = localStorage.getItem("init")
  if (init == null){
    localStorage.setItem("isOn", false);
    localStorage.setItem("isBreak", false);
    localStorage.setItem("endTime", 0);
    localStorage.setItem("productivityTimer", 15000);
    localStorage.setItem("breakTimer", 3000);
    localStorage.setItem("init", true);
    localStorage.setItem("currentInterval", 1);
    localStorage.setItem("totalIntervals", 3);
  }else{
    isOn = localStorage.getItem("isOn");
    endTime = parseInt(localStorage.getItem("endTime"));
    productivityTimer = parseInt(localStorage.getItem("productivityTimer"));
    breakTimer = parseInt(localStorage.getItem("breakTimer"));
    currentInterval = parseInt(localStorage.getItem("currentInterval"));
    totalIntervals = parseInt(localStorage.getItem("totalIntervals"));
  }
});

var x = setInterval(function() {
  if (isOn == "true"){
    if (isBreak ==  "true"){
      $(".status").text("Status: Break")
    }else{
      $(".status").text("Status: Work")
    }
    var now = new Date().getTime();
    var dist = endTime - now
    var minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((dist % (1000 * 60)) / 1000);
    $(".timer").text(minutes + ":" + seconds)
    $(".interval").text(currentInterval + "/" + totalIntervals)
    if (dist <= 0){
      $(".timer").text("0:00")
      if (isBreak == "true"){
        endTime = now + productivityTimer
        isBreak = "false"

        currentInterval += 1
      }else{
        $(".timer").text("0:00")
        endTime = now + breakTimer
        isBreak = "true"
      }

      localStorage.setItem("isBreak", isBreak);
      localStorage.setItem("currentInterval", currentInterval);
      if (currentInterval == totalIntervals){
        endTimer();
      }

    }
  }else{
    $(".timer").text("0:00")
    $(".status").text("Status: Inactive")
  }
}, 100)