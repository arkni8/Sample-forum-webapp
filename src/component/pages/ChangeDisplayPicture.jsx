import React, { useState } from 'react';
import { GetAuth } from '../../context/authContext';
// import { changeDisplayPic } from '../settingsChange';

function ChangeDisplayPicture() {
    const {currentUser} = GetAuth();
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setLoading(true);
        // changeDisplayPic(url);
        // navigate('/');
        // console.log(error.message);
        setUrl("");
        setLoading(false);
    }

    return (
        <div>
            {currentUser.photURL
                ? <div className='mx-auto my-5 text-center w-32 h-32 rounded-full 
                    text-2xl text-indigo-600 font-semibold ring-4 ring-offset-2 ring-indigo-400 flex place-items-center'>
                    <img src={currentUser.photoURL} alt="Profile Avatar" />
                </div>
                : <h3 className='mx-auto my-5 text-center w-32 h-32 rounded-full text-xl ring-4 ring-offset-2 ring-indigo-400 flex place-items-center 
                        text-slate-100 bg-red-400 font-semibold py-2'>
                    No display picture
                </h3>
            }
            <form onSubmit={handleSubmit}>
                <label className='block mt-3 mb-6'>
                    Select new Display Picture:
                    <input
                        className='appearance-none rounded-md relative block w-full px-3 py-2 border
                            border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                            focus:z-10'
                        type='text'
                        value={url}
                        autoComplete='off'
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder='This feature is not implemented yet'
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
            {error && <p className='p-2 text-red-600 border-2 rounded-md border-red-400'>{error}</p>}
        </div>
    )
}

export default ChangeDisplayPicture;