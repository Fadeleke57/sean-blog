import React from "react";
import {Link} from "react-router-dom";
import { formatDistanceToNow } from 'date-fns';
import './Post.css'

export default function Post({_id, title, summary, cover, content, author, createdAt}) {

  return (
    <Link className="post-link" to={`/post/${_id}`}>
      <div className={"post"}>
        <div className="image2">
          <img src={`http://localhost:4000/${cover}`} alt=""/>
        </div>
        <div className="texts">
          <div>
            <span className="post-tag"><h3>Finance</h3></span><br/>
            <h2 className="post-title">{title}</h2>
            <p className="summary">{summary}</p> 
              <small className="info">
                <span className="author">{author.username} - </span>
                <span className="post-date">{formatDistanceToNow(new Date(createdAt))} ago</span>    
              </small>  
          </div>
        </div>
      </div>
    </Link>
  );
}