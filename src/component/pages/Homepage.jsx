import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/authContext';
// import storage from '../storage'
// import Header from '../../component/Header';
import InquiryForm from '../InquiryForm';
import Listing from '../Listing';

function Homepage() {

    // const { logout } = useAuth();
    // const nav = useNavigate();
    useEffect(() => {
        // window.onload = () =>
        document.querySelector('#dropdown').classList.add('hidden');
        return;
    });

    return (
        <div className='xsm:w-full'>   
            <div className="input-area">
                <InquiryForm />
            </div>
            <Listing />
        </div>
    )
}

export default Homepage;