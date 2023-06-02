 if (window.innerWidth < 1024) {
  var errorMessage = document.createElement("p");
  errorMessage.textContent = "This is only accessible on desktop devices.";
  document.body.appendChild(errorMessage);

  document.getElementById("startButton").style.display = 'none';
  document.getElementById("score").style.display = 'none';
  document.getElementById("title").style.display = 'none';
 }
 
 // Variables
 var mainCursor = null;
 var cursorClones = [];
 var numCursors = 5;
 var score = 0;
 var timerInterval;

 // Start button click event
 document.getElementById('startButton').addEventListener('click', function() {
   // Hide start button
   this.style.display = 'none';
   document.getElementById('incrementButton').style.display = 'block';
   document.getElementById('title').style.display = 'none';

   // Create main cursor
   mainCursor = createCursor('main-cursor', 'red');

   // Add click event to main cursor
   mainCursor.addEventListener('click', function() {
     // Show increment button
     document.getElementById('incrementButton').style.display = 'block';
   });

   // Spawn cursors
   spawnCursors();
  // Start timer
   startTimer(5); // 5 seconds
 });

 // Increment button click event
 document.getElementById('incrementButton').addEventListener('click', function() {
   // Move increment button to a random position
   var maxX = window.innerWidth - this.offsetWidth;
   var maxY = window.innerHeight - this.offsetHeight;
   var randomX = Math.floor(Math.random() * maxX);
   var randomY = Math.floor(Math.random() * maxY);
   this.style.left = randomX + 'px';
   this.style.top = randomY + 'px';

   // Increment number of cursors
   numCursors += 5;

   // Reset timer to 5 seconds
  resetTimer(5);

   // Remove existing clones
   cursorClones.forEach(function(clone) {
     document.body.removeChild(clone);
   });
   cursorClones = [];

   // Create new clones
   spawnCursors();

   // Increment score
   score++;
   updateScore();

   var timerDisplay = document.getElementById('timer');
  if (timerDisplay) {
    document.body.removeChild(timerDisplay);
  }
 });

 // Mousemove event to mirror main cursor
 document.addEventListener('mousemove', function(event) {
   if (mainCursor) {
     mainCursor.style.left = event.clientX + 'px';
     mainCursor.style.top = event.clientY + 'px';

     // Update position of cursor clones
     cursorClones.forEach(function(clone) {
       var cloneOffsetX = parseInt(clone.getAttribute('data-offset-x'));
       var cloneOffsetY = parseInt(clone.getAttribute('data-offset-y'));
       clone.style.left = event.clientX + cloneOffsetX + 'px';
       clone.style.top = event.clientY + cloneOffsetY + 'px';
     });
   }
 });

 // Create a cursor element with specified class and color
 function createCursor(className,) {
   var cursor = document.createElement('div');
   cursor.className = className;
   document.body.appendChild(cursor);
   return cursor;
 }

 // Spawn cursor clones
 function spawnCursors() {
   for (var i = 0; i < numCursors; i++) {
     var cursorClone = createCursor('cursor-clone');
     cursorClone.setAttribute('data-offset-x', getRandomOffset() + 'px');
     cursorClone.setAttribute('data-offset-y', getRandomOffset() + 'px');
     cursorClones.push(cursorClone);
   }
 }

 // Generate random offset for cursor clones
 function getRandomOffset() {
   return Math.floor(Math.random() * 501) - 100; // Random range from -100 to 100
 }

 // Update the score
 function updateScore() {
   document.getElementById('score').textContent = 'Score: ' + score;
 }

 // Start timer function
function startTimer(duration) {
  var timer = duration;
  var timerDisplay = document.createElement('div');
  timerDisplay.setAttribute('id', 'timer');
  timerDisplay.textContent = 'Time: '+timer;
  document.body.appendChild(timerDisplay);

  timerInterval = setInterval(function() {
    timer--;
    timerDisplay.textContent = 'Time: '+timer;

    if (timer <= 0) {
      clearInterval(timerInterval);
      hideElements();
      displayGameOver();
    }
  }, 1000);
}

// Hide elements function
function hideElements() {
  mainCursor.style.display = 'none';
  cursorClones.forEach(function(clone) {
    clone.style.display = 'none';
  });
  document.getElementById('incrementButton').style.display = 'none';
  document.getElementById('timer').style.display = 'none';
}

// Display Game Over function
function displayGameOver() {
  var gameOverMessage = document.createElement('h2');
  gameOverMessage.setAttribute('id', 'gameOver');
  gameOverMessage.textContent = 'Game Over';
  document.body.appendChild(gameOverMessage);
}

// Reset timer function
function resetTimer(duration) {
  clearInterval(timerInterval);
  document.getElementById('timer').textContent = duration;
  startTimer(duration);
}