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
            window.location.href = "/user" 
        } else{
            window.location.href = "/professor" 
        }
    }

    return
}

export{
    getUser,
    logged
}