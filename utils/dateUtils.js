const getTime = () =>{
    const date = new Date();
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
}

export const dateUtils = {
    getTime
}