import React, { useState } from 'react';
import { GetAuth } from '../../context/authContext';
import { changeDisplayName } from '../settingsChange';

function ChangePassword() {

    const { currentUser } = GetAuth();
    const [displayName, setDisplayName] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setAlert("");
        setLoading(true);
        if (displayName) {
            try {
                await changeDisplayName(displayName);
                setAlert("Profile Display Name has been successfully updated!")
            } catch (error) {
                console.log(error);
            }
        } else {
            setAlert("Please fill in the Display Name field before submitting.")
        }
        setLoading(false);
    }


    return (
        <div>
            {currentUser.displayName
                ? <h3 className='text-center text-2xl text-indigo-800 font-semibold grid grid-cols-1 items-center'>
                    <p className='absolute text-sm text-slate-900'>Display Name:</p>
                    {currentUser.displayName}
                </h3>
                : <h3 className=' text-center text-2xl text-slate-100 bg-red-400 font-semibold rounded-md py-2'>Please set a display name</h3>
            }
            <form onSubmit={handleSubmit}>
                <label className='block mt-3 mb-6'>
                    New Display Name:
                    <input
                        className='appearance-none rounded-md relative block w-full px-3 py-2 border
                            border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                            focus:z-10'
                        type='text'
                        value={displayName}
                        autoComplete='off'
                        onChange={(e) => setDisplayName(e.target.value)}
                        placeholder='Enter your new display name'
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
            {
                alert===""? <></> : alert !== "Profile Display Name has been successfully updated!" ? <p className='p-2 mt-3 text-red-600 border-2 rounded-md border-red-400'>{alert}</p>
                    : <p className='p-2 mt-3 text-lime-700 border-2 rounded-md border-lime-600'>{alert}</p>
            }
        </div>
    );
}

export default ChangePassword;