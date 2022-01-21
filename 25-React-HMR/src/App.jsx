import React, { useState } from 'react';

const App = () => {
  const [title, setTitle] = useState('前端222');

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <br />
      {title}
    </div>
  );
};

export default App;
