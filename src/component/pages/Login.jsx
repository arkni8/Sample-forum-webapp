import React, { useEffect, useState } from "react";
import { GetAuth } from "../../context/authContext";
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoading, currentUser, login } = GetAuth();
    const location = useLocation();

    const navigate = useNavigate();
    let from = location.state?.from?.pathname || "/";

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            await login(email, password);
            navigate(from, { replace: true });
        } catch (error) {
            // console.log("some error")
            setError(error.message);
            setEmail("");
            setPassword("");
        }
        setLoading(false);
    }

    useEffect(() => {
        currentUser && navigate('/');
    }, [currentUser, navigate]);

    if (isLoading) {
        return <div className='mx-auto flex w-max flex-row gap-5 mt-20'>
            <div className="w-5 h-5 bg-blue-500 rounded-full shrink-0 transition animate-pulse"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full shrink-0 transition animate-bounce"></div>
            <div className="w-5 h-5 bg-blue-500 rounded-full shrink-0 transition animate-pulse"></div>
        </div>
    }

    return (
        <div className='bg-indigo-500
        after:absolute after:left-0 after:top-0 after:min-h-screen after:w-screen after:z-[-10] after:bg-indigo-500
        '>
            <div className='container mx-auto max-w-xl px-4 min-h-screen grid place-items-center bg-white
            shadow-[0_0_0_30px_rgba(0,0,0,0.8)] shadow-fuchsia-500 drop-shadow-md'>
                <div className='max-w-md w-full space-y-6 mx-7 my-3 min-w-fit'>
                    <h1 className='font-extrabold text-indigo-900 text-3xl pb-2 border-b-indigo-500/50 border-b-2'>
                        Kyun Re /?/
                    </h1>
                    <h2 className='text-2xl font-medium text-indigo-800'>
                        Login to Kyun Re!?!
                    </h2>
                    {error && <p className='p-2 text-red-600 border-2 rounded-md border-red-400'>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label className='block my-3'>
                            Email:
                            <input
                                className='appearance-none rounded-md relative block w-full
                            px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                            focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10'
                                type='text'
                                value={email}
                                autoComplete='email'
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='Enter your Email'
                                required
                            />
                        </label>
                        <label className='block mt-3 mb-6'>
                            Password:
                            <input
                                className='appearance-none rounded-md relative block w-full px-3 py-2 border
                            border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                            focus:z-10'
                                type='password'
                                value={password}
                                autoComplete='current-password'
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='Enter your Password'
                                required
                            />
                        </label>
                        <input
                            className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md
                        text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            type='submit'
                            value='Submit'
                            disabled={loading}
                        />
                    </form>
                    <p className="text-center pt-3">Don't have an account?
                        <Link className="text-indigo-800 underline decoration-solid hover:decoration-wavy pl-1" to='/register'>Click here!</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
