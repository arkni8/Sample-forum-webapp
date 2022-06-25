import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {
    likesDislikesStore,
} from './storage';
import elaspedTime from './elaspedTime';
import { Link } from 'react-router-dom';
import { GetAuth } from '../context/authContext';
import { ReactComponent as Up } from '../img/up.svg';
import { ReactComponent as Down } from '../img/down.svg';

// function GetDisplayName({id}) {
//     // console.log(id)
//     const [name, setName] = useState("");

//     useEffect(() => {
//         async function fetchUsername() {
//             const res = await getUserName(id);
//             setName(res);
//         }
//         fetchUsername();
//         return;
//     }, [id])
//     return { name }? <>{name}</> : <div className='w-14 h-full bg-gray-500'></div>
// }

// function GetCommentCount({ id }) {
//     // console.log(id)
//     const [count, setCount] = useState();

//     useEffect(() => {
//         async function fetchCommentCount() {
//             const res = await countComment(id);
//             setCount(res);
//         }
//         fetchCommentCount();
//         return;
//     }, [id])
//     return { count } ? <>{count}</> : <div className='w-14 h-full bg-gray-500'></div>
// }

function Posts(props) {

    const { currentUser } = GetAuth();

    const currentTime = new Date();
    const elaspsedTimeInMilliSec = currentTime.getTime() - props.doc.createdAt?.toDate().getTime();

    function increament() {
        likesDislikesStore(+1, props.doc, currentUser.displayName);
    }

    function decreament() {
        likesDislikesStore(-1, props.doc, currentUser.displayName);
    }

    function checkIfLiked() {
        return props.doc.namesWhoLiked?.find(item => item[currentUser.displayName] === 1) ? ("bg-blue-600") : "";
    }

    function checkIfDisliked() {
        return props.doc.namesWhoLiked?.find(item => item[currentUser.displayName] === -1) ? ("bg-rose-700") : "";
    }

    return (
        <div className='border-2 border-slate-500 px-2 py-1 rounded-md bg-white/80 grid grid-cols-[30px_40px_1fr] gap-1 overflow-x-scroll'>
            <div className='h-full grid grid-flow-row place-self-center item gap-2'>
                <button className={`w-full border-2 border-slate-900 px-0 py-0 rounded-md self-end hover:bg-blue-400 
                ${checkIfLiked()}`}
                    onClick={increament}><Up />
                </button>
                <button className={`w-full border-2 border-slate-900 px-0 py-0 rounded-md self-start hover:bg-rose-500 ${checkIfDisliked()}`}
                    onClick={decreament}><Down />
                </button>
            </div>
            <div className="likes-count justify-self-end self-center col-start-2 col-end-3 px-1">
                {props.doc.likes}
            </div>
            <div className='col-[3/4] flex flex-wrap align-center place-content-between min-w-[250px]'>
                <h3 className='basis-full pl-2 text-lg'>
                    {props.doc.title}
                </h3>
                <div className='basis-full grid grid-cols-3 items-center'>
                    <p className='pl-2 font-bold flex flex-wrap items-center'>
                        <span className='font-normal text-xs pr-1 basis-full sm:basis-auto'>posted by</span> {props.doc.createdBy}</p>
                    <Link to={`post/${props.doc.id}`}>
                        <div className='py-px flex justify-center'>
                            <p className='px-2.5 py-1 active:scale-105 active:transition-none bg-slate-800 text-white rounded shadow-inner shadow-gray-300/60
                            transition duration-300 justify-self-center
                            sm:px-5 sm:bg-transparent sm:text-inherit sm:rounded-none sm:shadow-none sm:border-l-2 sm:border-r-2 sm:border-slate-800
                            sm:active:scale-95 sm:active:bg-black sm:active:text-white sm:hover:bg-slate-300'>
                                {props.doc.commentCount} comments</p>
                        </div>
                    </Link>
                    <p className='pl-2 text-sm flex items-center justify-self-end'>{elaspedTime(elaspsedTimeInMilliSec)}</p>
                </div>
            </div>
        </div>
    )
}

function Listing() {
    const [posts, setPosts] = useState([]);
    const [postsLoading, setPostsLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, "posts"), orderBy('createdAt', 'desc')), (snap) => {
            let postSnap = [];
            snap.forEach((snap) => {
                postSnap.push({ ...snap.data(), id: snap.id });
            });
            setPosts(postSnap);
            setPostsLoading(false);
        });
        return () => unsub();
        // eslint-disable-next-line        
    }, [collection]);

    return (
        <>
            <h2 className='text-indigo-700 text-2xl mt-3 font-bold'>POSTS</h2>
            <div className='space-y-4 my-2'>
                {
                    (posts && posts.length > 0)
                        ? posts.map((doc) => <Posts key={doc.id} doc={doc} />)
                        : (!postsLoading) ? <div className='text-red-600'>No Posts have been made yet.</div>
                            : <div className='mx-auto flex w-max flex-row gap-5 mt-14'>
                                <div className="w-5 h-5 bg-blue-500 rounded-full shrink-0 transition animate-pulse"></div>
                                <div className="w-5 h-5 bg-blue-500 rounded-full shrink-0 transition animate-bounce"></div>
                                <div className="w-5 h-5 bg-blue-500 rounded-full shrink-0 transition animate-pulse"></div>
                            </div>
                }
                {(posts && posts.length > 0) && <p className='italic text-center xsm:py-4'>Nothing else to see here!</p> }
            </div>
        </>
    );
}

export default Listing;