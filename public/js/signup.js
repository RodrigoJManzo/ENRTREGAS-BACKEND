

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

    if(response.status === 200){
        return window.location.replace('/')

    }

    alert(`algo ha ocurrido`)

    
}

logInForm.addEventListener('submit', signup) 