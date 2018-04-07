/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function() {
    this.receivedEvent('deviceready');
  },

  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

app.initialize();

//Tap and long tap detection initialization
var detectionRange = window.self;
var mc = new Hammer(detectionRange);
mc.add(new Hammer.Tap());
mc.add(new Hammer.Press({
  event: 'press',
  pointer: 1,
  threshold: 9,
  time: 500,
}));

// listen to events...
mc.on("tap pressup press", function(ev) {
  console.log(ev.type);
});

mc.on("tap", function(ev){
  tap();
})

mc.on("press", function(ev){
  init();
})

//Helper Functions
function toMinute(time) {
  var minute = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  return minute + " : " + seconds;
}

function vibrate(value) {
  // enable vibration support
  navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

  if (navigator.vibrate) {
    navigator.vibrate(value);
  }
}

function init() {
  $(document).ready(function() {
    time = 0;
    currentTally = 0;
    timerOn = false;
    tapInnefective = false;
    $("body").css("background", "#f44141");

    $("#time").html(toMinute(0));

    $("#tally0").html(0);
    $("#tally1").html(0);
    $("#tally2").html(0);

    $("#currentTally").html(0);
  });
}

function tap() {
  if (!timerOn) {
    $("body").css("background", "#4268f4");
    timerOn = true;
    set = setInterval(startCount, 1000);
  } else if (!tapInnefective) {
    currentTally++;
    $("#currentTally").html(currentTally);
  }
}

init();

function startCount() {
  if (timerOn) {

    time += 1;

    $(document).ready(function() {
      $("#time").html(toMinute(time));

      if (time == 60) {
      // if (time == 10) {
        vibrate(1000);
        $("#tally0").html(currentTally);
        currentTally = 0;
        $("#currentTally").html(currentTally);
      } else if (time == 120) {
      // } else if (time == 20) {
        vibrate(1000);
        $("#tally1").html(currentTally);
        currentTally = 0;
        $("#currentTally").html(currentTally);
      } else if (time == 180) {
      // } else if (time == 30) {
        vibrate(1000);
        $("#tally2").html(currentTally);
        currentTally = 0;
        $("#currentTally").html(currentTally);
        tapInnefective = true;
        $("body").css("background", "#42f465");
        window.clearInterval(set);
      }
    });
  }

}
