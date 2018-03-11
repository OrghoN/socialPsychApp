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


window.onclick = function() {
  tap();
}

function toMinute(time) {
  var minute = Math.floor(time / 60);
  var seconds = Math.floor(time % 60);
  return minute + " : " + seconds;
}

function init() {
  $(document).ready(function() {
    time = 0;
    currentTally = 0;
    timerOn = false;
    $("body").css("background", "#990000");
  });
}

function reset() {
  $("#time").html(toMinute(0));

  $("#tally0").html(0);
  $("#tally1").html(0);
  $("#tally2").html(0);

  $("#currentTally").html(0);
}

function tap() {
  if (!timerOn) {
    $("body").css("background", "#0d0a43");
    timerOn = true;
    reset();
    set = setInterval(startCount, 1000);
  } else {
    currentTally++;
    $("#currentTally").html(currentTally);

  }
}

init();

function vibrate(value){
	// enable vibration support
			navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

			if (navigator.vibrate) {
			navigator.vibrate(value);
			}
}

function startCount() {
  if (timerOn) {

    time += 1;

    $(document).ready(function() {
      $("#time").html(toMinute(time));

      if (time == 60) {
        vibrate(1000);
        $("#tally0").html(currentTally);
        currentTally = 0;
        $("#currentTally").html(currentTally);
      } else if (time == 120) {
        vibrate(1000);
        $("#tally1").html(currentTally);
        currentTally = 0;
        $("#currentTally").html(currentTally);
      } else if (time == 180) {
        vibrate(1000);
        $("#tally2").html(currentTally);
        currentTally = 0;
        $("#currentTally").html(currentTally);
        init();
        window.clearInterval(set);
      }
    });
  }

}
