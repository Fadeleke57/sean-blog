import React, { useEffect, useState, useRef } from 'react';
import './SearchPage.css';
import { Link } from 'react-router-dom';

function SearchPage() {
  const [posts, setPosts] = useState([]);
  const [active, setActive] = useState(false);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  const searchInputWrapperRef = useRef(null);

  const escapeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    </svg>
  );
  const searchIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={active ? 'rgb(31, 136, 197)' : 'currentColor'} className="w-6 h-6">
      <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
    </svg>
  );

  useEffect(() => {
    fetch('https://sean-blog-server.onrender.com/post').then(response => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchInputWrapperRef.current && !searchInputWrapperRef.current.contains(event.target)) {
        setActive(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const getHighlightedText = (text, highlight) => {
    if (!highlight.trim()) {
      return text;
    }
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, index) =>
      regex.test(part) ? <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span> : part
    );
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.summary.toLowerCase().includes(query.toLowerCase())
  );

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
    <div className='search-page-wrapper'>
      <div className='search-header'>
        <div><h1>Search</h1></div>
        <Link to={'/'}><div className='escape-button'>{escapeIcon}<p>esc</p></div></Link>
      </div>
      <div
        ref={searchInputWrapperRef}
        className={`search-input-wrapper ${active ? 'active' : ''}`}
        onClick={() => setActive(true)}
      >
        {searchIcon}
        <input
          type='text'
          placeholder='Search'
          value={query}
          onChange={handleSearch}
        />
      </div>
      <div className='search-info'>
        <div className='search-info-header'>
          <h1>Posts</h1>
            <div className='search-pagination'>
            <p style={{marginRight: '1em'}}>{currentPosts.length > 0 ? `${indexOfFirstPost + 1} - ${Math.min(indexOfLastPost, filteredPosts.length)} of ${filteredPosts.length} results` : `0 results`}</p>
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
        <div className='search-info-content'>
          {currentPosts.length > 0 ? (
            currentPosts.map(post => (
              <Link key={post._id} to={`/post/${post._id}`}>
                <div>
                  <p className='search-info-content-title'>{getHighlightedText(post.title, query)}</p>
                  <p className='search-info-content-subtitle'>{getHighlightedText(post.summary, query)}</p>
                </div>
              </Link>
            ))
          ) : (
            <p>No posts found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;