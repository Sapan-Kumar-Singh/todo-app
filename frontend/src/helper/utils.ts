export const setToken=(data:any)=>{
    const token=data.token ?? "";
    localStorage.setItem('token',token)
}

export const getToken=()=> localStorage.getItem('token')