import React from 'react';
import { GetAuth } from '../../context/authContext';

function GeneralInformation() {
    const { currentUser } = GetAuth();

    return (
        < div >
            {currentUser.displayName
                ? <h3 className='text-center text-2xl text-indigo-800 font-semibold grid grid-cols-1 items-center'>
                    <p className='absolute text-sm text-slate-900'>Display Name:</p>
                    {currentUser.displayName}
                </h3>
                : <h3 className=' text-center text-2xl text-slate-100 bg-red-400 font-semibold rounded-md py-2'>Please set a display name</h3>
            }
            <h3 className=' text-center text-lg text-indigo-500 mt-3 grid grid-cols-1 font-semibold items-center'>
                <p className='absolute text-sm text-slate-900 font-semibold'>Email:</p>
                {currentUser.email}
            </h3>
            {currentUser.photURL
                ? <div className='mx-auto my-5 text-center w-32 h-32 rounded-full 
                    text-2xl text-indigo-600 font-semibold outline-4 outline-offset-2 outline-indigo-400 flex place-items-center'>
                    <img src={currentUser.photoURL} alt="Profile Avatar" />
                </div>
                : <h3 className='mx-auto my-5 text-center w-32 h-32 rounded-full text-xl ring-4 ring-offset-2 ring-indigo-400 flex place-items-center 
                        text-slate-100 bg-red-400 font-semibold py-2'>
                    No display picture
                </h3>
            }
        </div >
    )
}

export default GeneralInformation;