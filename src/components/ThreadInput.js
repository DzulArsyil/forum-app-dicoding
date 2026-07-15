import React, { useState } from 'react';

function ThreadInput({ addThread }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();
    if (title.trim() && body.trim()) {
      addThread({ title, body, category });
    }
  };

  return (
    <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <input
        type="text"
        placeholder="Judul Thread"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ padding: '8px' }}
      />
      <input
        type="text"
        placeholder="Kategori (Opsional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ padding: '8px' }}
      />
      <textarea
        placeholder="Tulis isi diskusi di sini..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        style={{ padding: '8px', minHeight: '150px' }}
      />
      <button type="submit" style={{ padding: '10px', backgroundColor: '#000', color: '#fff', cursor: 'pointer' }}>
        Buat Thread
      </button>
    </form>
  );
}

export default ThreadInput;
