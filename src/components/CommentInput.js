import React, { useState } from 'react';

function CommentInput({ addComment }) {
  const [content, setContent] = useState('');

  const commentChangeHandler = (event) => {
    setContent(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (content.trim()) {
      addComment(content);
      setContent(''); // Kosongkan input setelah submit
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ marginTop: '20px', marginBottom: '20px' }}>
      <textarea
        value={content}
        onChange={commentChangeHandler}
        placeholder="Tulis komentar Anda di sini..."
        style={{ width: '100%', height: '80px', padding: '10px', borderRadius: '5px' }}
        required
      />
      <button type="submit" style={{ marginTop: '10px', padding: '8px 16px' }}>
        Kirim Komentar
      </button>
    </form>
  );
}

export default CommentInput;
