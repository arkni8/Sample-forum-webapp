import React, { useState } from 'react';
import storage from './storage';
import { GetAuth } from '../context/authContext';

function InquiryForm({ submitfunc }) {
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');

    const { currentUser } = GetAuth();

    async function submitData(e) {
        e.preventDefault();
        try {
            await storage(title, question, currentUser.uid, currentUser.displayName);
            setTitle(''); setQuestion('');
        } catch (error) {
            console.log(error);
        }
       
    }

    return (
        <>
            <div className='py-2 px-2 font-bold text-xl text-indigo-700'>Submit Question</div>
            <form onSubmit={submitData}>
                <input className='block border-2 border-indigo-500 rounded-md my-1 p-1 w-full'
                    type="text"
                    name="title"
                    value={title}
                    placeholder='Enter title of the question here'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea className='block border-2 border-indigo-500 rounded-md my-1 p-1 w-full whitespace-pre-line'
                    name="question"
                    value={question}
                    placeholder='Enter your question here'
                    rows='6'
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button className='border rounded-md border-blue-500 bg-blue-500 py-1 px-3 w-48 text-white active:scale-95 shadow-md shadow-black/20 hover:border-black hover:bg-blue-700'>Submit</button>
            </form>
        </>
    )
}

export default InquiryForm;