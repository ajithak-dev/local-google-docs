import React from 'react';
import { Link } from 'react-router-dom'; 
import './Card.css';

const Card = ({ file }) => {
  return (
    <div className="card">
      <h3><Link to={`/note/${file}`} className='link'>{file}</Link></h3> 
    </div>
  );
};

export default Card;
