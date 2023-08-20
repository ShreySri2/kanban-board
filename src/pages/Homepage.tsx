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
      <div className='flexbox'>
      {groupedAndSortedTickets?.map(ticketGroup => (
        <div className='flexbox2 flexbox-item1' key={ticketGroup.groupLabel}>
          <h2>{ticketGroup.groupLabel}</h2>
          {ticketGroup.tickets.map((ticket, index) => (
            <div className='flexbox-item2'>
            <Card key={index} ticket={ticket}/>
            </div>
          ))}
        </div>
      ))}
      </div>
    </div>
  );
};

export default Homepage;
