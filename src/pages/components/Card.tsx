// Card.tsx
import React from 'react';
import './Card.css';

interface CardProps {
  ticket: {
    id: string;
    title: string;
    tag: string[];
    userId: string;
    status: string;
    priority: number;
  };
}

const Card: React.FC<CardProps> = ({ ticket }) => {
  return (
    <div className="card">
      <h1>{ticket.id}</h1>
      <p>{ticket.title}</p>
      <div>
        <i><img src="/download.jpeg" alt="no_image" /></i>
        <button>{ticket.userId}</button>
      </div>
    </div>
  );
}

export default Card;
