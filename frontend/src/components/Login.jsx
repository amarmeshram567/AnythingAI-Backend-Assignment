import React, { useState } from 'react';
import api from '../services/app';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const {
    isLoading,
    setIsLoading,
    setShowUserLogin,
    setUser
  } = useAppContext()

  const [state, setState] = useState('login');
  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const navigate = useNavigate()


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const payload =
        state === 'register'
          ? { name, email, password }
          : { email, password }

      const { data } = await api.post(`api/v1/auth/${state}`, payload)


      if (data.success) {
        localStorage.setItem("token", data.token)
        setUser(data.user)
        setShowUserLogin(false)
        toast.success(data.message)
        navigate("/dashboard")
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.response?.data)
      toast.error(error.response?.data?.message || "Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div onClick={() => setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sky-700 bg-black/50'>
      <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className='flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white'>
        <p className="text-2xl font-medium m-auto">
          <span className='text-gray-600'>User</span> {state === 'login' ? 'Login' : 'Sign Up'} </p>
        {state === 'register' && (
          <div className="w-full text-black">
            <p className='font-semibold'>Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
              className='border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-600'
              required
            />
          </div>
        )}
        <div className="w-full text-black">
          <p className='font-semibold'>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            className='border border-gray-200 rounded  w-full p-2 mt-1 outline-indigo-600'
            required
          />
        </div>
        <div className="w-full text-black">
          <p className='font-semibold'>Password</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
            className='border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-600'
            required
          />
        </div>
        {state === 'register' ? (
          <p className="text-black">Already have account?{" "}
            <span onClick={() => setState('login')}
              className='text-red-500 cursor-pointer'>click here</span></p>
        ) : (
          <p className="text-black"> Create an account?{" "}
            <span onClick={() => setState('register')} className='text-red-500 cursor-pointer'>click here</span>
          </p>
        )}
        <button
          type='submit'
          disabled={isLoading}
          className='bg-indigo-600 flex justify-center items-center hover:bg-indigo-500 transition-all text-white w-full py-2 rounded-md cursor-pointer  gap-2 disabled:opacity-60' >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : state === 'register' ? (
            'Create Account'
          ) : (
            'Login'
          )}
        </button>
      </form>
    </div>
  );
}
export default Login;