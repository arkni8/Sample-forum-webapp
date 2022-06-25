import React, { useEffect, useReducer, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPost } from '../storage';
import elaspedTime from '../elaspedTime';
// import CommentSection from '../CommentSection';
import CommentSection1 from '../CommentSection1';

function PostPage() {

  const [, forceUpdate] = useReducer(x => x + 1, 0);
  // let interval = useRef();
  let data = useRef();
  const nav = useNavigate();

  function force() {
    // console.log("forcing update now");
    const res = fetchPost(postId);
    res.then((doc) => data.current = doc).then(() => forceUpdate());
  }

  const { postId } = useParams();

  useEffect(() => {
    async function fetchData() {
      data.current = fetchPost(postId);
      data.current.then(() => force());
      document.querySelector('#back-navigation').scrollIntoView();
      window.scrollBy(0, -60);
    }
    fetchData();
    return;
  }, []);

  if (!data.current) {
    <></>
  }

  return (
    <div className='space-y-4'>
      <div className='pt-1'>
        <p onClick={() => nav(-1)} id='back-navigation' className='font-bold py-2 text-right text-red-600 shadow shadow-black px-3 rounded-xl mt-2 cursor-pointer bg-white
        hover:bg-red-500 hover:text-white active:scale-[99%]'> &lt; Back to the Posts</p>
      </div>
      <div className='mt-2 px-2 py-2 bg-slate-50/80 border border-black rounded-xl shadow-black space-y-1'>
        <p className='text-xl whitespace-pre-line font-semibold'>{data.current?.data().title}</p>

        <p className='whitespace-pre-line'>{data.current?.data().question}</p>

        <div className='grid gap-y-1 grid-cols-2 items-center pt-3 lg:grid-cols-4'>
          <p className='text-sm lg:order-1'>Posted by: {data.current?.data().createdBy}</p>
          <p className='text-sm lg:order-3'>Likes: {data.current?.data().likes}</p>
          <p className='text-sm lg:order-2'>{elaspedTime(new Date().getTime() - data.current?.data().createdAt.toDate().getTime())}</p>
          <p className='lg:order-4 inline-block px-2 py-0.5 shadow-inner shadow-white/30 rounded-md bg-slate-700 text-white 
          xsm:bg-white xsm:text-black xsm:border xsm:border-black'>
            {data.current?.data().commentCount} comments
          </p>
        </div>

      </div>

      {/* <hr /> */}
      {/* <CommentSection msgId={postId} force={force} numberOfComment={data.current?.data().commentCount} /> */}
      <CommentSection1 msgId={postId} force={force} numberOfComment={data.current?.data().commentCount} />

    </div>
  );
}

export default PostPage;