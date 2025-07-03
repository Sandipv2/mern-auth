import { useState, useRef, useContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AppContext } from '../context/AppContex';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    axios.defaults.withCredentials = true;
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const inputRefs = useRef([])
    const [isEmailSent, setIsEmailSent] = useState(false)
    const [isOtpSubmited, setIsOtpSubmited] = useState(false)
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { backendUrl } = useContext(AppContext)

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

    async function handleSubmitEmail(e) {
        e.preventDefault()
        try {
            setLoading(true)
            const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
            if (data.success) {
                toast.success(data.message)
                setIsEmailSent(true)
            } else {
                toast.error(data.message)
            }
            setLoading(false)
        } catch (err) {
            toast.error(err.message)
        }
    }

    async function handleSubmitOtp(e) {
        e.preventDefault()
        const otpArr = inputRefs.current.map(e => e.value)
        setOtp(otpArr.join(''))
        setIsOtpSubmited(true)
    }

    async function handleNewPassword(e) {
        e.preventDefault();

        try {
            const {data} = await axios.post(backendUrl+'/api/auth/reset-password', {email, newPassword, otp})

            if(data.success) {
                toast.success(data.message);
                navigate('/login')
            } else {
                toast.error(data.message)
            }
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <div className='bg-linear-300 from-indigo-500 to-indigo-400 min-h-screen flex justify-center items-center'>
            {!isEmailSent && <form onSubmit={handleSubmitEmail} method="POST" className='bg-slate-900 text-white flex flex-col justify-center items-center gap-4 p-5 rounded-lg min-w-90'>
                <h1 className='text-xl font-bold'>Reset Password</h1>
                <p className='text-sm text-gray-400'>Enter your registered email</p>
                <input type="text" className='w-full rounded-full bg-slate-700 px-3 py-2 outline-none'
                    placeholder='Email'
                    value={email}
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                />

                <button disabled={loading} className='bg-indigo-500 w-full rounded-full py-2 cursor-pointer'>
                    {loading ? 'Sending OTP...' : 'Submit'}
                </button>
            </form>}


            {/* OTP INPUT FORM */}

            {!isOtpSubmited && isEmailSent && <form onSubmit={handleSubmitOtp} method="POST" className='bg-indigo-600 flex flex-col items-center gap-5 p-5 rounded-lg'>
                <h1 className='text-white text-2xl font-bold text-center'>
                    Reset Password OTP
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
                <button type='submit' className='w-full bg-white rounded-full px-3 py-1 cursor-pointer hover:bg-indigo-500 hover:text-white duration-300 hover:border-1 hover:border-white border-1 border-transparent'>Submit</button>
            </form>}

            {/* Set new password */}
            {isOtpSubmited && isEmailSent && <form onSubmit={handleNewPassword} method="POST" className='bg-slate-900 text-white flex flex-col justify-center items-center gap-4 p-5 rounded-lg min-w-90'>
                <h1 className='text-xl font-bold'>Reset Password</h1>
                <p className='text-sm text-gray-400'>Enter the new password below</p>
                <input type="password" className='w-full rounded-full bg-slate-700 px-3 py-2 outline-none'
                    placeholder='New Password'
                    value={newPassword}
                    name='newPassword'
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <button className='bg-indigo-500 w-full rounded-full py-2 cursor-pointer'>
                    Submit
                </button>
            </form>}

        </div>
    )
}

export default ResetPassword