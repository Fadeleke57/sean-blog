import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import './IndexPage.css'
import UtilityButton from "../components/UtilityButton";
import FilterBar from "../components/FilterBar";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import sean from '../images/sean.jpg'

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [tag, setTag] = useState('All')
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/post`).then(response => {
      response.json().then((posts) => {
        setPosts(posts);
        setLoading(false)
      });
    });
  }, []);

  if (loading) {
    return (
      <Loader/>
    )
  }

  var filteredPosts;
  if (tag === 'All') {
    filteredPosts = posts
  }
  else {
    filteredPosts = posts.filter(post => post.category === tag)
  }
  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="index-page-wrapper">
      <div className="title-wrapper">
        <img src={sean} alt="sean" className="title-photo"></img>
        <h1>SIC</h1> 
      </div>

      <div className="subtitle-wrapper">
        <FilterBar setTag={setTag} setCurrentPage={setCurrentPage}/>
        <div className="search-wrapper" >
          <UtilityButton icon="search">Search</UtilityButton>
        </div>
      </div>

      <div className="content-wrapper">
        {currentPosts.length > 0 && currentPosts.map((post, id) => (
          <Link className="post-wrapper" to={`/post/${post._id}`} key={id}> 
            <Post key={id} {...post}/>
          </Link>
        ))}
      </div>
      <div className='search-pagination' style={{marginTop: '4em'}}>
        <p style={{marginRight: '1em'}}>{filteredPosts.length > 0 ? `${indexOfFirstPost + 1} - ${Math.min(indexOfLastPost, filteredPosts.length)} of ${filteredPosts.length} results` : `0 results`}</p>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" >
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" >
                <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        </button>
      </div>
    </div>

  );
}     