function getUser(){
    const userJson = localStorage.getItem('me');
    let user = JSON.parse(userJson);
    return user
}

function logged(){
    let user = getUser();
    console.log(user, 'user')

    if(user){
        if(user.role == 'student'){
            window.location.href = "/User" 
        } else{
            window.location.href = "/Professor" 
        }
    }

    return
}

export{
    getUser,
    logged
}