import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { UserContext } from '../UserContext';
import './PostPage.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Loader from '../components/Loader';


export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true)
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('Please Provide User Context');
  }
  const { userInfo } = context;
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetch(`https://sean-blog-server.onrender.com/post/${id}`)
        .then(response => response.json())
        .then(data => {
          setPostInfo(data);
          setLoading(false)
        });
    }
  }, [id]);

  if (loading) {
    return <Loader/>
  }

  if (!postInfo) return null;

  const encodedUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(postInfo.title);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;

  return (
    <div className='post-page'>

      <div className='post-page-info'>
          <div><span className='post-page-tag'>{postInfo.category} -</span></div>
          <div><span className='post-page-date'>{format(new Date(postInfo.createdAt), 'MMMM d, yyyy h:mma')}</span></div>
        </div>

        <div className='post-page-intro'>
          <h1>{postInfo.title}</h1>
          <p>{postInfo.summary}</p>
        </div>
  
        {userInfo?.id === postInfo.author._id && (
          <div className='edit-row'>
            <Link className='edit-btn' to={`/edit/${id}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
              Edit this post
            </Link>
          </div>
        )}

      <div className='post-page-content-wrapper'>

        <div className='post-page-content-row1'>
          <div className='image'>
            <img src={`https://sean-blog-server.onrender.com/${postInfo.cover}`} alt='Post cover' />
          </div>
          <div className='post-page-content' dangerouslySetInnerHTML={{ __html: postInfo.content }}>
          </div>
        </div>

        <div className='post-page-content-row2'>
          <div className='post-page-sticky'>
            <div className='post-page-author-wrapper'>
              <span>Author</span>
              <p>Sean Cummings</p>
              <small>Big Finance Guy</small>
            </div>
            <div className='post-page-tag-wrapper'>
              <span>Tagged</span>
              <div className='post-page-tags'>
                <p>{postInfo.category}</p>
              </div>  
            </div>
            <div className='post-page-share'>
              <span>Share</span>
              <div className='post-page-share-icons'>
                <Link to={facebookShareUrl} target='blank'>
                  <FontAwesomeIcon icon={faFacebook} size="1x" />
                </Link>
                <Link to={twitterShareUrl} target='blank'>
                  <FontAwesomeIcon icon={faTwitter} size="1x" />
                </Link>
                <Link to={linkedinShareUrl} target='blank'>
                  <FontAwesomeIcon icon={faLinkedin} size="1x" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}