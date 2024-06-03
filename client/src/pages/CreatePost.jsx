import React, { useState} from 'react';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor';
import './Create.css'

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [category, setCategory] = useState('');

  async function createNewPost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set('category', category)
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    if (files && files[0]) {
      data.append('file', files[0]);
    }

    await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
      mode: 'no-cors'
    });

    setRedirect(true);
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className='create-wrapper'>
      <form onSubmit={createNewPost} className='create'>
        <h1>Create Post</h1>
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
            maxLength={71}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Summary"
            maxLength={220}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <input
            type="file"
            onChange={(e) => setFiles(e.target.files)}
          />
          <Editor value={content} onChange={setContent} />
        </div>

        <button type="submit" style={{ marginTop: '5px' }}>Create Post</button>
      </form>
    </div>
  );
}