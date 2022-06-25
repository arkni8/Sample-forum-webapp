import React, { useState, useEffect } from 'react';
import { GetAuth } from '../context/authContext';
import { storeComment } from './storage';
import elaspedTime from './elaspedTime';

import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";

function CommentSection({ msgId, force, numberOfComment }) {
    const { currentUser } = GetAuth();
    const [comment, setComment] = useState('');
    const [commentPosts, setCommentPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadNextAvail, setLoadNextAvail] = useState(true);
    const [loadPrevAvail, setLoadPrevAvail] = useState(false);

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "posts", msgId, "comments"), orderBy('createdAt', 'desc'), limit(3)), (snap) => {
            let postSnap = [];
            snap.forEach((snap) => {
                postSnap.push({ ...snap.data(), id: snap.id });
            });
            setCommentPosts(postSnap);
        });
        if (commentPosts.length < numberOfComment) {
            setLoadNextAvail(true);
        }
        return () => unsub();
        // eslint-disable-next-line
    }, [collection]);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = storeComment(msgId, comment, currentUser.displayName, currentUser.uid);
            res.then(() => { setComment(""); force(); })
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    function loadMoreComments() {
        setLoadNextAvail(false);
    }

    return (
        <>
            <div className=' relative px-1 md:px-40 text-right'>
                <form className='px-1 py-1 *border border-indigo-600/70 ring-2 ring-blue-500 ring-offset-2 ring-offset-rose-200 rounded-md' onSubmit={handleSubmit}>
                    <label className='sr-only' htmlFor='comment'>Comment here:</label>
                    <textarea id='comment' className='px-1 py-1 w-full whitespace-pre-line rounded resize-none valid:outline-none'
                        type="text" name='comment' rows='5' autoCorrect='on' onChange={(e) => setComment(e.target.value)} value={comment} />
                    <input className='w-24 rounded-xl sm:w-1/4 sm:rounded px-2 py-1 bg-indigo-600 text-white text-sm' type="submit" value="Submit" disabled={loading} />
                </form>
            </div>
            <hr />
            <div className='flex flex-col gap-6 my-2 '>
                {
                    (commentPosts && commentPosts.length > 0)
                        ?  <>
                            {commentPosts.map((doc) => <Posts key={doc.id} doc={doc} />)}
                            {/* THis is still in testing. The limit for query is set to 3. */}
                            {loadNextAvail && <button>Load More Comments</button>}
                        </>
                        
                        : <div className='text-red-600'>No Posts have been made yet.</div>
                }
            </div>
        </>
    )
}


function Posts(props) {

    // const { currentUser } = GetAuth();
    const currentTime = new Date();
    const elaspsedTimeInMilliSec = currentTime.getTime() - props.doc.createdAt?.toDate().getTime();

    return (
        <div className='*border-2 border-slate-500 px-2 py-1 rounded-md outline outline-2 outline-blue-600 last:mb-14'>
            <h3 className='basis-full col-span-3'>
                {props.doc.comment}
            </h3>
            <hr className='my-1 border-0 border-b-2 border-indigo-300'/>
            <div className='flex flex-wrap align-center place-content-between'>
                <h3>

                </h3>
                <div className='basis-full grid grid-cols-3'>
                    <p className='font-bold flex flex-wrap items-center text-indigo-700'><span className='text-black font-normal text-xs pr-1 basis-full sm:basis-auto'>
                        posted by</span> {props.doc.user}
                    </p>
                    <div></div>
                    <p className='pl-2 text-sm flex items-center justify-self-end'>{elaspedTime(elaspsedTimeInMilliSec)}</p>
                </div>
            </div>
        </div>
    )
}

export default CommentSection;