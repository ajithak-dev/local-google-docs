import React, { useEffect, useState } from 'react';
import Card from './Card.js';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [textFiles, setTextFiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/note')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Log data to understand its structure
        if (Array.isArray(data.textFiles)) {
          setTextFiles(data.textFiles);
        } else {
          console.error('textFiles is not an array:', data);
        }
      })
      .catch(err => {
        console.error("Failed to fetch:", err);
      });
  }, []);


  return (
    <div className="container">
      {textFiles.map((file, index) => (
        <Card key={index} file={file} />
      ))}
      <button className='new-btn'><Link to={`/newnote`} className='link-btn'>+</Link></button>
    </div>
  );
};

export default Home;
