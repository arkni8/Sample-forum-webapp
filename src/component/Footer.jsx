import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();

  // eslint-disable-next-line
  if (location.pathname != '/login' && location.pathname != '/register' && location.pathname != '/profile-name') {
    return (
      <div className='grid grid-cols-2 bg-blue-500/70 text-white h-60 xsm:h-52 xl:rounded-t overflow-hidden'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='font-extrabold text-2xl p-2'>KyunRe /?/</h1>
          <p className=''>©️ {new Date().getFullYear()}</p>
        </div>
        <div className='flex flex-col justify-center gap-1 bg-indigo-900/70 place-items-center'>
          <p>Regulations</p>
          <Link to='/settings'>Settings</Link>
          <p>About</p>
          <p>Contact Us</p>
        </div>
      </div>
    )
  }

  return;

}

export default Footer;