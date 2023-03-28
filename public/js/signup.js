const form = document.getElementById('signupForm');
const xhr = new XMLHttpRequest();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  console.log(formData)

  xhr.open('POST', "/api/auth/signup");

  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      if (data.success) {
        console.log('Sign up successful!');
        window.location.href = '/';
      } else {
        console.log('Sign up failed.');
      }
    } else {
      console.error(xhr.statusText);
    }

  };
  xhr.onerror = () => {
    console.error(xhr.statusText);
  };
  xhr.send(formData);
});
