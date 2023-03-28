const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the default form submission behavior
  
  const formData = new FormData(loginForm); // Get form data
  
  // Create an XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open("POST", "/api/auth");
  xhr.setRequestHeader("Content-Type", "application/json");

  // Set up a callback function for when the request completes
  xhr.onload = () => {
    if (xhr.status === 200) {
      // Handle successful login
      window.location.href = "/"; // Redirect to home page
    } else {
      // Handle unsuccessful login
      console.log("Invalid email or password. Please try again."); // Show error message
    }
  };

  // Send the request with the form data as JSON
  const data = JSON.stringify({
    email: formData.get("email"),
    password: formData.get("password")
  });
  console.log(data)
  xhr.send(data);
});