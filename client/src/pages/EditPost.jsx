import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import toast from "react-hot-toast";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [category, setCategory] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/post/${id}`)
      .then(response => response.json())
      .then(postInfo => {
        setCategory(postInfo.category);
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      })
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('category', category);
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files && files[0]) {
      data.append('file', files[0]);
    }

    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/post/` + id, {
      method: 'PUT',
      body: data,
      credentials: 'include'
    });

    if (response.ok) {
      setRedirect(true);
      toast.success('Post updated successfully!');
    } else {
      toast.error('Error updating post');
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error('Error updating post:', errorData);
      } else {
        const errorText = await response.text();
        console.error('Error updating post:', errorText);
      }
    }
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <div className="create-wrapper">
      <form onSubmit={updatePost} className="create">
        <h1>Edit Post</h1>
        <div className='create-tag-options'>
          <label>
            <input
              type="radio"
              name="category"
              value="Personal"
              checked={category === 'Personal'}
              onChange={handleCategoryChange}
            />
            Personal
          </label>
          <label>
            <input
              type="radio"
              name="category"
              value="Finance"
              checked={category === 'Finance'}
              onChange={handleCategoryChange}
            />
            Finance
          </label>
          <label style={{marginRight: '0em'}}>
            <input
              type="radio"
              name="category"
              value="IR"
              checked={category === 'IR'}
              onChange={handleCategoryChange}
            />
            IR
          </label>
        </div>
        <div className='create-text-inputs'>
          <input
            type="text"
            placeholder="Title"
            value={title}
            maxLength={71}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Summary"
            value={summary}
            maxLength={220}
            onChange={(e) => setSummary(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
          />
          <Editor value={content} onChange={setContent} />
        </div>
        <button style={{ marginTop: '5px' }}>Update post</button>
      </form>
    </div>
  );
}