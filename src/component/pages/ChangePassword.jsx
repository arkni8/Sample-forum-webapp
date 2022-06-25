import React, { useState } from 'react';
import { GetAuth } from '../../context/authContext';
import { changePassword } from '../settingsChange';

function ChangePassword() {
    const { currentUser, login } = GetAuth();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState("");

    async function handleSubmit(e) {
        let email = currentUser.email;
        e.preventDefault();
        setAlert("");
        setLoading(false);
        try {
            await login(email, oldPassword);
            await changePassword(newPassword);
            setAlert("Profile Password has been successfully updated!");
            setOldPassword("");
            setNewPassword("");
        } catch (error) {
            // console.log(error.message);
            setAlert("Profile Password failed to update. Please try again later.");
            setOldPassword("");
            setNewPassword("");
            setLoading(false);
        }
        // navigate('/');
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className='block mt-3 mb-6'>
                    Old Password:
                    <input
                        className='appearance-none rounded-md relative block w-full px-3 py-2 border
                            border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                            focus:z-10'
                        type='password'
                        value={oldPassword}
                        autoComplete='no-password'
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder='Enter your Old Password'
                        required
                    />
                </label>
                <label className='block mt-3 mb-6'>
                    New Password:
                    <input
                        className='appearance-none rounded-md relative block w-full px-3 py-2 border
                            border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                            focus:z-10'
                        type='password'
                        value={newPassword}
                        autoComplete='no-password'
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder='Enter your New Password'
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
                alert===""? <></> : alert !== "Profile Password has been successfully updated!" ? <p className='p-2 mt-3 text-red-600 border-2 rounded-md border-red-400'>{alert}</p>
                    : <p className='p-2 mt-3 text-lime-700 border-2 rounded-md border-lime-600'>{alert} </p>
            }
        </div>
    )
}

export default ChangePassword;