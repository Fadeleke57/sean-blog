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

  useEffect(() => {
    fetch('http://localhost:4000/post').then(response => {
      response.json().then((posts) => {
        if (tag === 'All') {
          setPosts(posts);
        }
        else {
          const filteredPosts = posts.filter(post => post.category === tag)
          setPosts(filteredPosts)
        }
        setLoading(false)
      });
    });
  }, [tag]);

  if (loading) {
    return (
      <Loader/>
    )
  }

  return (
    <div className="index-page-wrapper">
      <div className="title-wrapper">
        <img src={sean} className="title-photo"></img>
        <h1>SIC</h1> 
      </div>

      <div className="subtitle-wrapper">
        <FilterBar setTag={setTag}/>
        <div className="search-wrapper" >
          <UtilityButton icon="search">Search</UtilityButton>
        </div>
      </div>

      <div className="content-wrapper">
        {posts.length > 0 && posts.map((post, id) => (
          <Link className="post-wrapper" to={`/post/${post._id}`} key={id}> 
            <Post key={id} {...post}/>
          </Link>
        ))}
      </div>

    </div>

  );
}     