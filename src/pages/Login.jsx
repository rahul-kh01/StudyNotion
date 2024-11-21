import React from 'react'
import Template from '../components/core/Auth/Template'
import loginImg from '../assets/Auth/login.png'
function Login() {
    return (
        <div className=''>
            <Template title="Welcome Back"
                desc1="Build skills for today, tomorrow, and beyond."
                desc2=" Education to future-proof your career."
                image={loginImg}
                formtype="login"
            />
        </div>
    )
}
export default Login;