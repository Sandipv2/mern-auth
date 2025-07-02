import { useState, useRef, useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContex'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

function EmailVerify() {
    axios.defaults.withCredentials = true;
    const inputRefs = useRef([])

    const navigate = useNavigate();

    const { backendUrl, fetchUserData, userData, isLoggedIn } = useContext(AppContext)

    function handleInput(e, idx) {
        if (e.target.value.length > 0 && idx < inputRefs.current.length - 1) {
            inputRefs.current[idx + 1].focus();
        }
    }

    function handleKeyDown(e, idx) {
        if (e.key === 'Backspace' && e.target.value === '' && idx > 0) {
            inputRefs.current[idx - 1].focus();
        }
    }

    function handlePaste(e) {
        const paste = e.clipboardData.getData("text")
        const arr = paste.split('')
        arr.forEach((char, idx) => {
            if (inputRefs.current[idx]) {
                inputRefs.current[idx].value = char
            }
        })
    }

    async function submitHandler(e) {
        try {
            e.preventDefault();
            const otpArray = inputRefs.current.map(e => e.value)
            const otp = otpArray.join('')

            const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp })

            if (data.success) {
                toast.success(data.message)
                fetchUserData();
                navigate('/')
            } else {
                toast.error(data.message)
            }

        } catch (err) {
            toast.error(err.message)
        }
    }

    useEffect(() => {
        isLoggedIn && userData && userData.isAccountVerified && navigate('/')
        !isLoggedIn && navigate('/')
    }, [userData, isLoggedIn])


    return (
        <div className='min-h-screen bg-gradient-to-tr from-indigo-300 to-indigo-700 flex items-center justify-center'>
            <form onSubmit={submitHandler} method="POST" className='bg-indigo-600 flex flex-col items-center gap-5 p-5 rounded-lg'>
                <h1 className='text-white text-2xl font-bold text-center'>
                    Email Verify OTP
                </h1>
                <p className='text-center text-gray-300'>Enter 6-Digit code sent to your email</p>

                <div className='flex gap-1' onPaste={(e) => handlePaste(e)}>
                    {Array(6).fill(0).map((_, idx) => (
                        <input
                            ref={(e) => inputRefs.current[idx] = e}
                            onInput={(e) => handleInput(e, idx)}
                            onKeyDown={(e) => handleKeyDown(e, idx)}
                            type="text" maxLength={1} key={idx} required className='w-12 h-12 bg-indigo-500 text-white text-center rounded-md outline-none font-bold text-xl' />
                    ))}
                </div>
                <button type='submit' className='w-full bg-white rounded-full px-3 py-1 cursor-pointer hover:bg-indigo-500 hover:text-white duration-300 hover:border-1 hover:border-white border-1 border-transparent'>Verify Email</button>
            </form>
        </div>
    )
}

export default EmailVerify