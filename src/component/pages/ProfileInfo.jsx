import React, { useState } from 'react';
import { GetAuth } from "../../context/authContext";
import { updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../../firebase";
import { storeUser } from '../storage';

function ProfileInfo() {
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const { currentUser, logout } = GetAuth();
    const nav = useNavigate();

    async function handleSubmit(e) {
        // setError("");
        e.preventDefault();
        setLoading(true);

        updateProfile(auth.currentUser, {
            displayName: name,
            // photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
            .then(() => storeUser(currentUser.uid, currentUser.displayName))
            .then(() => {
                // Profile updated!
                // console.log("Profile Updated");
                logout();
                nav('/login');
                // ...
            })
            .catch((error) => {
                console.log(error);
                // An error occurred
            });

        setLoading(false);
    }

    return (
        <div className='bg-indigo-500
            after:absolute after:left-0 after:top-0 after:min-h-screen after:w-screen after:z-[-10] after:bg-indigo-500
            '>
            <div className='container mx-auto max-w-xl px-4 min-h-screen grid place-items-center 
                bg-white shadow-[0_0_0_30px_rgba(0,0,0,0.3)] shadow-fuchsia-500 drop-shadow-sm'>
                <div className='max-w-md w-full space-y-6 mx-7 my-3 min-w-fit'>
                    <h1 className='font-extrabold text-indigo-900 text-3xl pb-2 border-b-indigo-500/50 border-b-2'>
                        Kyun Re /?/
                    </h1>
                    <h2 className='text-2xl font-medium text-indigo-800'>
                        Enter your display name for your profile!
                    </h2>
                    {/* {error && <p className='p-2 text-red-600 border-2 rounded-md border-red-400'>{error}</p>} */}
                    <form onSubmit={handleSubmit} autoComplete='off'>
                        <label className='block my-3'>
                            Display Name:
                            <input
                                className='appearance-none rounded-md relative block w-full
                                px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900
                                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10'
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter your Display Name'
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
                </div>
            </div>
        </div>
    );
}

export default ProfileInfo;