import { useState } from "react"
import axiosApi from "../../src/conf/axios"
import { Navigate } from "react-router-dom"


function Login(){

    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [isLoggedIn,setIsLoggedIn] = useState(false)

    async function handleLogin(){
        const formData = new FormData()
        formData.append('username',username)
        formData.append('password',password)

        const response = await axiosApi.post('/student/login',formData,{
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials : true
        })
        if(response.status === 201){
            setIsLoggedIn(true)
        }
        else{
            if (response.status === 401) {
                alert('Invalid credentials');
              } else {
                alert('Login failed');
              }
              setUsername('');
              setPassword('');
        }
    }

    if(isLoggedIn){
        return <Navigate to={'/student'} ></Navigate>
    }

    return(
        <>
          <div className="flex justify-center">
             <div>
               <div className="flex-col">
                 <label htmlFor="">Username</label>
                 <input value={username} onChange={(e)=>setUsername(e.target.value)} className="bg-transparent" type="text" />
               </div>
               <div className="flex-col">
                 <label htmlFor="">Password</label>
                 <input value={password}  onChange={(e)=>setPassword(e.target.value)} className="bg-transparent" type="password" />
               </div>
               <button onClick={handleLogin} className="p-3 bg-green-500 mt-10 rounded">Login</button>
             </div>
          </div>
        </>
    )
}

export default Login