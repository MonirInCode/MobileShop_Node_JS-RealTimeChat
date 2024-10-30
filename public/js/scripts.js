
 
function filterFood() {
  // Get the user input
  var userInput = document.getElementById('foodSearch').value.toLowerCase();
  // Get all the food items
  var foodItems = document.getElementsByClassName('card-dishes')[0].getElementsByTagName('h3');

  // Loop through all the food items
  for (var i = 0; i < foodItems.length; i++) {
    var foodName = foodItems[i].innerText.toLowerCase();
    var foodCard = foodItems[i].parentNode.parentNode;

    // Check if the food name contains the user input
    if (foodName.includes(userInput)) {
      // If it matches, display the food item
      foodCard.style.display = "block";
    } else {
      // If it doesn't match, hide the food item
      foodCard.style.display = "none";
    }
  }
}


// Sticky navigation
window.addEventListener("scroll", function () {
  var navbar = this.document.querySelector("nav")
  navbar.classList.toggle("navsticky", window.scrollY > 0)
});


// Chef slider
const mobileSlider = document.querySelector('.mobile-slider');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');
let isDragging = false;
let currentPosition = 0;
let prevPosition = 0;

mobileSlider.addEventListener('mousedown', dragStart);
mobileSlider.addEventListener('mouseup', dragEnd);
mobileSlider.addEventListener('mouseleave', dragEnd);
mobileSlider.addEventListener('mousemove', drag);
mobileSlider.addEventListener('touchstart', dragStart);
mobileSlider.addEventListener('touchend', dragEnd);
mobileSlider.addEventListener('touchmove', drag);

prevArrow.addEventListener('click', () => {
  mobileSlider.scrollLeft -= mobileSlider.offsetWidth;
});

nextArrow.addEventListener('click', () => {
  mobileSlider.scrollLeft += mobileSlider.offsetWidth;
});


function dragStart(e) {
  isDragging = true;
  prevPosition = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
}

function dragEnd() {
  isDragging = false;
}

function drag(e) {
  if (!isDragging) return;
  const currentPosition = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const diff = prevPosition - currentPosition;
  chefSlider.scrollLeft += diff;
  prevPosition = currentPosition;
}


//
//

function toggleChatBox() {
  var chatBoxContainer = document.getElementById("chat-box-container");
  chatBoxContainer.style.right === "20px" ? chatBoxContainer.style.right = "-320px" : chatBoxContainer.style.right = "20px";
}

function closeChatBox() {
  var chatBoxContainer = document.getElementById("chat-box-container");
  chatBoxContainer.style.right = "-320px";
}

function sendMessage() {
  var chatInput = document.getElementById("chat-input");
  var message = chatInput.value.trim();
  if (message !== "") {
      var chatMessages = document.getElementById("chat-messages");
      var newMessage = document.createElement("div");
      newMessage.textContent = message;
      newMessage.classList.add("sent-message");
      chatMessages.appendChild(newMessage);
      chatInput.value = "";
      chatMessages.scrollTop = chatMessages.scrollHeight;
  }
}

//
//

// Function to handle form submission (sending message)
document.getElementById("messageForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Get message input
  var messageInput = document.getElementById("messageInput");
  var message = messageInput.value.trim();

  if (message !== "") {
    // Create a new message element
    var newMessage = document.createElement("div");
    newMessage.classList.add("message");
    newMessage.textContent = "Admin: " + message;

    // Append the message to chat logs
    document.getElementById("chatlogs").appendChild(newMessage);

    // Clear input field after sending message
    messageInput.value = "";

    // Scroll to the bottom of chat logs
    document.getElementById("chatlogs").scrollTop = document.getElementById("chatlogs").scrollHeight;
  }
});
