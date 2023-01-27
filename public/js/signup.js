import path from "./relativeImportRef.js";

const logInForm = document.getElementById('signupForm');

const signup = async(e)=>{
    e.preventDefault()

    const data = new FormData(logInForm)
    
    const credentials = {}

    for(const field of data){
        credentials[field[0]] = field[1]
        
    }
    await fetch('/api/auth/signup', {
        body: JSON.stringify(credentials),
        headers:{
            "Content-type" : "application/json"
        },
        method: "POST"
    } )
    .then(response => response.json)
    .then(path.resolve('/'), {loggedin:true})
    .finally((error)=>{
        console.log(error)
    }
    )
}

logInForm.addEventListener('submit', signup) 