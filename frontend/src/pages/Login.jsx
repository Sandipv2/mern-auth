import { useState, useContext } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContex'

function Login() {
  const [state, setState] = useState('Login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const { backendUrl, setIsLoggedIn, fetchUserData } = useContext(AppContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
        setLoading(true)
        const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password },)

        if (data.success) {
          setIsLoggedIn(true)
          fetchUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password },)

        if (data.success) {
          setIsLoggedIn(true)
          fetchUserData()
          navigate('/')
        } else {
          toast.error(data.message)
        }
      }

    } catch (err) {
      toast.error(err.message)
    }
  }

  return (
    <div className='bg-linear-300 from-indigo-500 to-indigo-400 min-h-screen flex justify-center items-center'>
      <form onSubmit={handleSubmit} method='POST' className='bg-slate-900 text-white flex flex-col justify-center items-center gap-4 p-5 rounded-lg'>
        <h2 className='text-xl mb-5'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</h2>

        {state === 'Sign Up' &&
          <input type="text" name='name' placeholder='Full Name'
            className='rounded-full bg-slate-700 px-3 py-2 outline-none'
            value={name} required
            onChange={(e) => setName(e.target.value)}
          />}

        <input type="email" name='email' placeholder='Email'
          className='rounded-full bg-slate-700 px-3 py-2 outline-none'
          value={email} required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input type="password" name='password' placeholder='Password'
          className='rounded-full bg-slate-700 px-3 py-2 outline-none'
          value={password} required
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className='w-full'>
          <p onClick={() => navigate('/reset-password')} className='text-left text-sm text-blue-600 cursor-pointer'>Forgot password?</p>
        </div>

        <button type='submit' disabled={loading} className='bg-indigo-500 w-full rounded-full py-2 cursor-pointer'>
          {loading ? 'Signing in...' : state}
        </button>

        {state === 'Sign Up'
          ?
          <p className='text-xs text-gray-400'>
            Already have an account? <span className='text-blue-600 underline cursor-pointer' onClick={() => setState('Login')}>Login here</span>
          </p>
          :
          <p className='text-xs text-gray-400'>
            Don't have an account?
            <span className='text-blue-600 underline cursor-pointer' onClick={() => setState('Sign Up')}> Sign up</span>
          </p>
        }

      </form>
    </div>
  )
}

export default Login