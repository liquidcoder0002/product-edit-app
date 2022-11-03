import React, { useState } from 'react'
// import axios from 'axios'
// import { useNavigate} from 'react-router-dom';

const Login = () => {
    // const navigate = useNavigate();
    const [password,setPassword]=useState("")

    // const handleSubmit = (event) => {
    //     event.preventDefault();
        
    //     axios.post('http://localhost:5000/login',{password:password},{headers:'Content-Type: application/json'})
    //         .then((res) => {
    //             console.log(res)
    //             if(res.data === "login successfully"){
    //                 navigate('/backup');
    //             }else{
    //                 alert(`${res.data}`)
    //             }
    //         }).catch((error) => {
    //             console.log(error)
    //         });
    //   }

  return (
    <div>
    <form >
    <label>Enter your password:
      <input 
        type="text" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </label>
    <input type="submit" /> 
  </form>
  </div>
  )
}

export default Login