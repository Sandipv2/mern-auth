import { useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContex';
import axios from 'axios';
import { toast } from 'react-toastify';

function Navbar() {
  const [loading, setLoading] = useState(false)
  const [showDropown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } = useContext(AppContext);

  const logout = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/logout')

      if (data.success) {
        setIsLoggedIn(false)
        setUserData(null)
        navigate('/')
      }

    } catch (err) {
      toast.error(err.message)
    }
  }

  const deleteAccount = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/user/delete')
      if (data.success) {
        logout()
        toast.success(data.message)
        navigate('/')
      }
      else {
        toast.error(data.message)
      }
    } catch (err) {
      toast.error(err.message)
    }
  }

  const sendVerificationCode = async () => {
    try {
      axios.defaults.withCredentials = true;
      setLoading(true)
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')

      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }

      setLoading(false)

    } catch (err) {
      toast.error(err.message)
    }
  }

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev)
  }

  return (
    <nav className='bg-indigo-500 flex justify-around items-center py-2 fixed w-full top-0 z-20 border-white border-b-1'>
      <h1 className='cursor-pointer text-white font-bold'
        onClick={() => navigate('/')}
      >AUTH</h1>

      {userData ?
        <div onClick={toggleDropdown} className='w-8 h-8 cursor-pointer flex justify-center items-center rounded-full bg-black text-white relative group'>
          {userData.name[0].toUpperCase()}

          {showDropown && <div className='absolute hidden group-hover:block top-0 left-0 text-black z-10 pt-10'>
            <ul className='text-sm bg-gray-100 w-[115px] wrap-break-word rounded'>
              {!userData.isAccountVerified && <li onClick={sendVerificationCode} className='p-1 cursor-pointer hover:bg-indigo-300 rounded'>{loading ? 'Sending OTP...' : 'Verify Email'}</li>}
              <li className='p-1 cursor-pointer hover:bg-indigo-300 rounded'
                onClick={logout}
              >Logout</li>
              <li className='p-1 cursor-pointer hover:bg-indigo-300 rounded'
                onClick={deleteAccount}
              >Delete Account</li>
            </ul>
          </div>}
        </div>
        :
        <button className='border-2 duration-300 ease-linear hover:bg-white hover:text-indigo-500 rounded-full py-1 px-4 cursor-pointer text-white'
          onClick={() => navigate('/login')}
        >Login</button>
      }
    </nav>
  )
}

export default Navbar