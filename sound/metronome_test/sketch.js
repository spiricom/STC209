
//try changing this variable to zero to try it using p5.sound stuff instead of directly accessing an audio context
var p5orJS = true;

var myTempo = 100;
var lastMilli = 0;
var myCount = 0;
var milli = 0;
var howMany = 0;
var osc;
var startTime;              // The start time of the entire sequence.
var current16thNote = 0;    // What note is currently last scheduled?
var tempo = 50.0;           // tempo (in beats per minute)
var lookahead = 10.0;       // How frequently to call scheduling function 
                            //(in milliseconds)
var scheduleAheadTime = 0.1;// How far ahead to schedule audio (sec)
                            // This is calculated from lookahead, and overlaps 
                            // with next interval (in case the timer is late)
var nextNoteTime = 0.0;     // when the next note is due.
var noteResolution = 0;     // 0 == 16th, 1 == 8th, 2 == quarter note
var noteLength = 0.5;  //proportional to length of 16th notes at tempo
var timerWorker = null;     
var notesInQueue = [];  

var last16thNoteDrawn = -1;



function preload() {
  hat = loadSound('Hi_Hat_short.wav');
}

function setup() {

  createCanvas(640, 480);
  background(0); 
  
  if (p5orJS == 1)
  {
    audioContext = new AudioContext();
  }
  
  timerWorker = new Worker("libraries/metronomeworker.js");

  timerWorker.onmessage = function(e) 
  {
        if (e.data == "tick") 
        {
            scheduler();
        }
        else
        {
            console.log("message: " + e.data);
        }
  }
  
  if (p5orJS == 1)
  {
    nextNoteTime = audioContext.currentTime;
  }
  else
  {
    nextNoteTime = (millis() / 1000.);
  }
  timerWorker.postMessage("start");
  
  timerWorker.postMessage({"interval":lookahead});

}

function draw() {
    var currentNote = last16thNoteDrawn;
    
    //perhaps there's a better way to get the currentTime the p5JS way? Or it's not exposed and it should be?
    if (p5orJS == 1)
    {
      var currentTime = audioContext.currentTime;
    }
    else
    {
      var currentTime = (millis() / 1000.);
    }

    while (notesInQueue.length && notesInQueue[0].time < currentTime) {
        currentNote = notesInQueue[0].note;
        notesInQueue.splice(0,1);   // remove note from queue
    }
    
    // We only need to draw if the note has moved.
    if (last16thNoteDrawn != currentNote) {
        background(0);
        fill(255, 0, 255);
        textFont("Helvetica");
        textSize(200);
        text(str(currentNote), width/2 - 100, height/2 + 50);
        last16thNoteDrawn = currentNote;
    }
  
}

function scheduler() {
    // while there are notes that will need to play before the next interval, 
    // schedule them and advance the pointer.
    
    var currentTime;
    if (p5orJS == 1)
    {
      currentTime = audioContext.currentTime;
    }
    else
    {
      currentTime = (millis() / 1000.);
    }
    while (nextNoteTime < currentTime + scheduleAheadTime ) 
    {
      scheduleNote(current16thNote, nextNoteTime );
      if (p5orJS == 1)
      {
        currentTime = audioContext.currentTime;
      }
      else
      {
        currentTime = (millis() / 1000.);
      }
      nextNote();
    }

}


function nextNote() {
    // Advance current note and time by a 16th note...
    var secondsPerBeat = 60.0 / tempo;    // Notice this picks up the CURRENT 
                                          // tempo value to calculate beat length.
    nextNoteTime += 0.25 * secondsPerBeat;    // Add beat length to last beat time
    //console.log("nextNoteTime: " + nextNoteTime);
    current16thNote++;    // Advance the beat number, wrap to zero
    if (current16thNote == 16) {
        current16thNote = 0;
    }
}

function scheduleNote( beatNumber, time ) {
    
    
    // push the note on the queue, even if we're not playing.
    notesInQueue.push( { note: beatNumber, time: time } );
    
   
    if ( (noteResolution==1) && (beatNumber%2))
    {
      return; // we're not playing non-8th 16th notes
    }
    if ( (noteResolution==2) && (beatNumber%4))
    {
      return; // we're not playing non-quarter 8th notes
    }   
    
    
    //using the original code way to do it from the metronome example
    if (p5orJS == 1)
    {
      // create an oscillator
      var osc = audioContext.createOscillator();
      osc.connect( audioContext.destination );
      if (beatNumber % 16 === 0)    // beat 0 == low pitch
          osc.frequency.value = 880.0;
      else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
          osc.frequency.value = 440.0;
      else                        // other 16th notes = high pitch
          osc.frequency.value = 220.0;
    }
    
    //trying to do it the p5 way
    else
    {
      osc = new p5.Oscillator();
      osc.setType('sine');
      
      if (beatNumber % 16 === 0)    // beat 0 == low pitch
          osc.freq(880.0);
      else if (beatNumber % 4 === 0 )    // quarter notes = medium pitch
          osc.freq(440.0);
      else                        // other 16th notes = high pitch
          osc.freq(220.0);
    }
    var myNoteLength = noteLength * (0.25 * 60.0 / tempo);    // Add beat length to last beat time))
    osc.start( time );

    osc.stop( time + myNoteLength );
    
    //hat.play(time);
    
}
   
