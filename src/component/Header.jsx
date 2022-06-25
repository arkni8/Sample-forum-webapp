import { GetAuth } from '../context/authContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import {ReactComponent as MenuIcon} from '../img/menu.svg'

export default function Header() {

    const { currentUser, logout } = GetAuth();
    const nav = useNavigate();
    const location = useLocation();

    const clickEvent = useCallback((e) => {
        const elementsRef = document.querySelectorAll('.dropdown-menu')
        if (e.target !== elementsRef[0] && e.target !== elementsRef[1] && e.target !== elementsRef[2]) {
            document.querySelector('#dropdown').classList.add('hidden');
        }
    });

    useEffect(() => {
        document.addEventListener('click', clickEvent);
        if (location.pathname == '/login' || location.pathname == '/register' || location.pathname == '/profile-name') {
            document.removeEventListener('click', clickEvent);
        }
        return (() => document.removeEventListener('click', clickEvent));
    });

    async function handleLogout() {
        try {
            await logout();
            nav('/login');
        } catch (error) {
            console.log("Failed to Logout");
        }
    }

    function dropdownShow() {
        document.querySelector('#dropdown').classList.toggle('hidden');
    }

    // eslint-disable-next-line
    if (location.pathname != '/login' && location.pathname != '/register' && location.pathname != '/profile-name') {
        return (
            <div className='flex place-content-between place-items-center py-2 px-3 border-b-2 border-indigo-500/50 sticky top-0 z-20 bg-white/90'>
                <h1 className='font-extrabold text-indigo-800 text-2xl'>KyunRe /?/</h1>
                <div className='right flex flex-row gap-2 max-w-max place-items-center relative'>
                    <button onClick={() => dropdownShow()} className='dropdown-menu rounded-md border aspect-square h-10 p-0.5 text-white
                bg-indigo-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-1'>
                        <strong className='dropdown-menu'><MenuIcon/></strong>
                    </button>
                    <div id='dropdown' className="dropdown-menu absolute z-30 right-0 top-[50px] text-right border-2 rounded-xl p-2 hidden 
                    bg-indigo-600/90 min-w-[200px] text-slate-100 shadow-xl shadow-gray-500">
                        <Link to='/' ><p className=' py-2 hover:bg-blue-900 rounded-md pr-2'>
                            {currentUser && (currentUser.displayName ? currentUser.displayName : currentUser.email)}</p>
                        </Link>
                        <div className=' h-[0.15rem] w-full bg-white my-1' />
                        <Link to='/settings'>
                            <p className=' py-2 hover:bg-blue-900 rounded-md pr-2'>Settings</p>
                        </Link>
                        <input onClick={() => handleLogout()}
                        className='group relative flex justify-center py-1.5 px-4 mt-2 text-sm font-medium rounded-md outline outline-1 outline-rose-600 bg-white w-full
                        text-rose-600 hover:outline-4 hover:bg-red-100 hover:font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-700'
                        type='submit'
                        value='Logout'
                    />
                    </div>
                </div>
            </div>
        );
    }

    return;
}