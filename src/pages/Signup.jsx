import React from 'react';
import Template from '../components/core/Auth/Template';
import signupImg from '../assets/Auth/signup.png';

function Signup() {
  
  return (
    <div>
      <div className=''>
            <Template title="Welcome Back"
                desc1="Build skills for today, tomorrow, and beyond."
                desc2=" Education to future-proof your career."
                image={signupImg}
                formtype="signup"
            />
        </div>
    </div>
  )
}
export default Signup;
