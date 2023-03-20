

const loginBTN = document.getElementById(logInBTN);
const signupBTN = document.getElementById(signupBTN);


loginBTN.addEventListener("click", ()=>{
    onload(window.location.replace('/api/auth'))
      
})

signupBTN.addEventListener("click", ()=>{
     onload(window.location.replace('/api/auth/signup'))  
})

