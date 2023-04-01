const loginForm = document.getElementById("loginForm");

/**
 * @loginForm listens a submit event on logIn and brings the formData
 * @xhr Creates an XMLHttpRequest object
 *  then sets up the request
 *  then sets up the callback function for when the request is completes
 *  then handles susccessfull and unsuccessful logins
 */

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const xhr = new XMLHttpRequest();

  xhr.open("POST", "/api/auth");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = () => {
    if (xhr.status === 200) {
      window.location.href = "/";
    } else {
      console.log("Invalid email or password. Please try again.");
    }
  };

  const data = JSON.stringify({
    email: formData.get("email"),
    password: formData.get("password"),
  });
  console.log(data);
  xhr.send(data);
});
