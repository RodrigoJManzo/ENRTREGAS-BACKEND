import { response } from "express";

const logInForm = document.getElementById('loginForm');

const login = async(e)=>{
    e.preventDefault()

    const data = new FormData(logInForm)

    const credentials = {}

    for(const field of data){
        credentials[field[0]] = field[1]
        
    }

    await fetch('/api/auth', {
        body: JSON.stringify(credentials),
        headers:{
            "Content-type" : "application/json"
        },
        method: "POST"
    } )

    if(response.status === 200){
        return window.location.replace('/')
    }

}

logInForm.addEventListener('submit', login) 