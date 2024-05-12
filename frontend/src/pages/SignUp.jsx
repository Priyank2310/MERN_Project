import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true); // For confirm password match
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value.trim() });

    if (id === 'password') {
      // Password strength check
      const strength = checkPasswordStrength(value);
      setPasswordStrength(strength);
    } else if (id === 'confirmPassword') {
      // Confirm password match check
      const match = value === formData.password;
      setPasswordMatch(match);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      return setErrorMessage('Please fill out all fields.');
    }
    if (!passwordMatch) {
      return setErrorMessage('Passwords do not match.');
    }
    if (!validateEmail(formData.email)) {
      return setErrorMessage('Please enter a valid email address.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || data.success === false) {
        return setErrorMessage(data.message || 'An error occurred while signing up.');
      }
      setSignedUp(true);
      navigate('/sign-in');
    } catch (error) {
      setErrorMessage('An error occurred while signing up.');
    } finally {
      setLoading(false);
    }
  };

  const checkPasswordStrength = (password) => {
    // Implement your own password strength logic here
    // For simplicity, let's just check the length
    if (password.length >= 8) {
      return 'Strong';
    } else if (password.length >= 6) {
      return 'Medium';
    } else {
      return 'Weak';
    }
  };

  const validateEmail = (email) => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-200'>
      <div className='max-w-md w-full p-8 bg-white rounded-lg shadow-lg'>
        {signedUp ? (
          <Alert className='mb-4' color='success'>
            Successfully signed up! You can now sign in.
          </Alert>
        ) : (
          <>
            <form className='flex flex-col gap-6' onSubmit={handleSubmit}>
              <div>
                <Label value='Enter Username' />
                <TextInput
                  type='text'
                  placeholder='Username'
                  id='username'
                  onChange={handleChange}
                  className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                />
              </div>
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
                  placeholder='Password'
                  id='password'
                  onChange={handleChange}
                  className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                />
                <span className='text-sm text-gray-600 mt-1'>
                  Password Strength: <strong>{passwordStrength}</strong>
                </span>
              </div>
              <div>
                <Label value='Confirm Password' />
                <TextInput
                  type='password'
                  placeholder='Confirm Password'
                  id='confirmPassword'
                  onChange={handleChange}
                  className='w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500'
                />
                {!passwordMatch && (
                  <span className='text-sm text-red-600'>Passwords do not match.</span>
                )}
              </div>
              <div className='flex items-center'>
                <input type='checkbox' id='agreeToTerms' className='mr-2' />
                <Label value='I agree to the Terms of Service' htmlFor='agreeToTerms' className='text-sm text-gray-700' />
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
                  'Sign Up'
                )}
              </Button>
            </form>
            <div className='flex justify-between mt-4'>
              <span className='text-sm text-gray-600'>
                Have an account?{' '}
                <Link to='/sign-in' className='text-blue-500'>
                  Sign In
                </Link>
              </span>
            </div>
            {errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SignUp;
