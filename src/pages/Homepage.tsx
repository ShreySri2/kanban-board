// Homepage.tsx
import { useContext } from 'react';
import { TicketsContext } from './utils/HomepageContext';
import Card from './components/Card';
import Navbar from './components/Navbar';
import './Homepage.css'

const Homepage = () => {
  const groupedAndSortedTickets = useContext(TicketsContext);

  return (
    <div>
      <Navbar />
      {groupedAndSortedTickets?.map(ticketGroup => (
        <div key={ticketGroup.groupLabel}>
          <h2>{ticketGroup.groupLabel}</h2>
          {ticketGroup.tickets.map((ticket, index) => (
            <Card key={index} ticket={ticket}/>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Homepage;
