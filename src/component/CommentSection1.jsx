import React, { useState, useEffect, useRef } from 'react';
import { GetAuth } from '../context/authContext';
import { fetchComment, fetchCommentPosts, storeComment } from './storage';
import elaspedTime from './elaspedTime';

// import { db } from '../firebase';
// import { collection, onSnapshot, orderBy, query, limit } from "firebase/firestore";

function CommentSection1({ msgId, force, numberOfComment }) {
    const { currentUser } = GetAuth();
    const [comment, setComment] = useState('');
    const [commentPosts, setCommentPosts] = useState([]);
    const [updateCommentSection, setUpdateCommentSection] = useState(true);
    const [didAddComment, setDidAddComment] = useState(false);
    const [loading, setLoading] = useState(false);

    // const LoadMoreCount = useRef(1);

    useEffect(() => {
        async function fetchingComments() {
            // console.log(commentPosts[commentPosts.length - 1]);
            if (updateCommentSection) {
                const snapshots = await fetchCommentPosts(msgId, commentPosts[commentPosts.length - 1]);
                let postSnap = [];
                snapshots.forEach((snap) => {
                    postSnap.push({ ...snap.data(), id: snap.id });
                });
                setCommentPosts(prevVal => [...prevVal, ...postSnap]);
                setUpdateCommentSection(false);
            }
        }
        fetchingComments();
        // eslint-disable-next-line
    }, [updateCommentSection]);

    useEffect(() => {
            didAddComment && setDidAddComment(false);
    }, [didAddComment]);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const res = storeComment(msgId, comment, currentUser.displayName, currentUser.uid);
            res.then((data) => {
                setComment("");
                setCommentPosts(prevVal => [{ ...data[0].data(), id: data[0].id }, ...prevVal]);
                setDidAddComment(true); force();
            })
            .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    function loadMore() {
        if (commentPosts.length !== numberOfComment) {
            // LoadMoreCount.current++;
            setUpdateCommentSection(true);
        }
    }

    return (
        <>
            <div className=' relative px-1 md:px-40 text-right'>
                <form className='px-1 py-1 ring-2 ring-blue-500 ring-offset-2 ring-offset-rose-200 rounded-md' onSubmit={handleSubmit}>
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
                        ? <>
                            {commentPosts.map((doc) => <Posts key={doc.id} doc={doc} />)}
                            {/* THis is still in testing. The limit for query is set to 3. */}
                            {commentPosts.length === numberOfComment ? <div className='text-center font-bold text-gray-400'>No more Comments!</div>
                                : <button disabled={updateCommentSection} onClick={loadMore} className='mx-auto px-2 py-1 shadow-lg shadow-black/20 rounded bg-indigo-500 text-white w-1/2 xsm:w-56'>
                                    {updateCommentSection? `Loading...` : `Load More Comment` }</button>}
                        </>
                        
                        : <div className='text-red-600'>No Comments have been made yet.</div>
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
        <div className='px-2 py-1 rounded-sm outline outline-2 outline-blue-600 shadow-lg shadow-black/20 last:mb-12 bg-white'>
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

export default CommentSection1;