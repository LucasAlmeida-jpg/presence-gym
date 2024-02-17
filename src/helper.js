function getUser(){
    const userJson = localStorage.getItem('me');
    let user = JSON.parse(userJson);
    return user
}

export{
    getUser
}