import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure, } from '../redux/user/userSlice';

function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/backend/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='min-h-screen bg-gray-200 flex justify-center items-center'>
      <div className='max-w-md w-full p-8 bg-white rounded-lg shadow-lg'>
        <form className='flex flex-col gap-6'>
          <div>
            <Label value='Enter Email-ID' />
            <TextInput
              type='email'
              placeholder='name@company.com'
              id='email'
              onChange={handleChange}
              className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <div>
            <Label value='Enter Password' />
            <TextInput
              type='password'
              placeholder='**********'
              id='password'
              onChange={handleChange}
              className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
          <Button
            type='submit'
            disabled={loading}
            className='w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md'
          >
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
        <div className='flex justify-between mt-4'>
          <span className='text-sm text-gray-600'>
            Don't have an account?{' '}
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </span>
        </div>
        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default SignIn;
