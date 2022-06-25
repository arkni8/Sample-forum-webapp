import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { ReactComponent as Cog } from '../../img/cog.svg';
import { UseMediaQuery } from '../UseMediaQuery';
// import { useAuth } from '../../context/authContext';

function Settings() {

    const loc = useLocation();

    const inactive = ' h-16 bg-indigo-500 rounded-md flex items-center px-4 hover:bg-indigo-600';
    const active = ' h-16 bg-slate-300 rounded-md flex items-center px-4 text-slate-900 ring-2 ring-indigo-800 ring-offset-2 ';

    const activeSettingsCont = 'h-[23rem] border outline-1';
    const inactiveSettingsCont = 'h-0 border-0 outline-none';
    const [settingsNavContainerState, setSettingsNavContainerState] = useState(inactiveSettingsCont);

    let linkStateArray = [active, inactive, inactive, inactive]

    // const { currentUser } = useAuth();
    const [buttonState, setButtonState] = useState([...linkStateArray]);

    const smallResSupport = UseMediaQuery('screen and (max-width: 580px)');

    useEffect(() => {
        document.querySelector('#dropdown').classList.add('hidden');
        return;
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (smallResSupport) {
            document.querySelector('#settingsNavBtn').classList.add('rotate-90');
            document.querySelector('#settingsNav').classList.remove('translate-y-[30rem]');
            setSettingsNavContainerState(activeSettingsCont);
        } else {
            // document.querySelector('#settingsNavBtn').classList.remove('rotate-90');
            document.querySelector('#settingsNav').classList.remove('translate-y-[30rem]');
            setSettingsNavContainerState(inactiveSettingsCont);
        }
        return () => {
            return;
        }
    }, [smallResSupport]);
    

    useEffect(() => {
        switch (loc.pathname) {
            case "/settings":
                linkStateManage(0);
                break;
            case "/settings/change-password":
                linkStateManage(1);
                break;
            case "/settings/change-display-name":
                linkStateManage(2);
                break;
            case "/settings/change-display-picture":
                linkStateManage(3);
                break;
            default:
                linkStateManage(0);
        }
        // eslint-disable-next-line
    }, []);

    function linkStateManage(pos) {
        let settingsRotateBtn = document.querySelector('#settingsNavBtn');
        linkStateArray.splice(linkStateArray.indexOf(active), 1, inactive);
        linkStateArray.splice(pos, 1, active);
        if (smallResSupport) {
            settingsRotateBtn.classList.toggle('rotate-90');
            if (settingsRotateBtn.classList.contains('rotate-90')) {
                document.querySelector('#settingsNav').classList.remove('translate-y-[30rem]');
                setSettingsNavContainerState(activeSettingsCont)
            } else {
                document.querySelector('#settingsNav').classList.add('translate-y-[30rem]');
                setSettingsNavContainerState(inactiveSettingsCont);
            }
        }
        setButtonState([...linkStateArray]);
    }

    function handleSettingsNavigation() {
        let settingsRotateBtn = document.querySelector('#settingsNavBtn');
        // console.log(smallResSupport)
        if (smallResSupport) {
            settingsRotateBtn.classList.toggle('rotate-90');
            if (settingsRotateBtn.classList.contains('rotate-90')) {
                document.querySelector('#settingsNav').classList.remove('translate-y-[30rem]');
                setSettingsNavContainerState(activeSettingsCont)
            } else {
                document.querySelector('#settingsNav').classList.add('translate-y-[30rem]');
                setSettingsNavContainerState(inactiveSettingsCont);
            }
        }
    }

    return (
        <div id='settings-page' className='pt-2 grid grid-cols-1 min-h-screen xsm:min-h-full xsm:grow xsm:grid-cols-[280px_1fr] lg:grid-cols-[380px_1fr] overflow-x-hidden'>
            <div id='settingsNavBtn' onClick={() => handleSettingsNavigation()}
                className='absolute z-30 w-20 aspect-square rounded-full right-5 bottom-6 transition-transform grid bg-blue-800 shadow-sm shadow-black/70 active:scale-90
                xsm:hidden'>
                <button className='place-self-center w-14 aspect-square rounded-full text-white'>
                    <Cog />
                </button>
            </div>
            <div id='settingsNavContainer' className={`absolute right-5 bottom-28 z-20 transition-transform transform-gpu overflow-hidden w-80 flex justify-center items-center shadow-sm rounded-xl ${settingsNavContainerState} bg-blue-900/60
            xsm:bg-transparent xsm:z-0 xsm:rounded-none xsm:border-0 xsm:border-indigo-300 xsm:static xsm:transition-none xsm:translate-x-0 xsm:w-full xsm:py-5 xsm:px-4 xsm:border-r-2 xsm:h-full xsm:block`}>
                <ul id='settingsNav' className='space-y-5 w-[90%] text-lg text-white xsm:w-full'>
                    <li className={`${buttonState[0]} transition shadow-md shadow-black/50`}><Link className='h-full w-full flex place-items-center'
                        to='/settings' onClick={() => linkStateManage(0)}
                    >General Information</Link></li>

                    <li className={`${buttonState[1]} transition shadow-md shadow-black/50`}><Link className='h-full w-full flex place-items-center'
                        to='/settings/change-password' onClick={() => linkStateManage(1)}
                    >Change Password</Link></li>

                    <li className={`${buttonState[2]} transition shadow-md shadow-black/50`}><Link className='h-full w-full flex place-items-center'
                        to='/settings/change-display-name' onClick={() => linkStateManage(2)}
                    >Change Display Name</Link></li>

                    <li className={`${buttonState[3]} transition shadow-md shadow-black/50`}><Link className='h-full w-full flex place-items-center'
                        to='/settings/change-display-picture' onClick={() => linkStateManage(3)}
                    >Change Profile Picture</Link></li>
                </ul>
            </div>
            <div className='py-5 px-4'>
                <Outlet />
            </div>
        </div>
    )
}

export default Settings;