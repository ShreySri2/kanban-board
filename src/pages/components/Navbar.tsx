import { useState, useContext } from 'react';
import './NavBar.css'
import { GroupingByContext, SortingByContext } from '../utils/HomepageContext';

const Navbar = () => {
  const [displayMenuOpen, setDisplayMenu] = useState(false);
  const [groupingMenuOpen, setGroupingMenu] = useState(false);
  const [sortingMenuOpen, setSortingMenu] = useState(false);


  const { groupBy, setGroupBy } = useContext(GroupingByContext);
  const { sortOrder, setSortOrder } = useContext(SortingByContext);
  console.log(groupBy, sortOrder)

  const toggleDisplayMenu = () => {
    setDisplayMenu(!displayMenuOpen);
  };

  const toggleGroupingMenu = () => {
    setGroupingMenu(!groupingMenuOpen);
  };

  const toggleSortingMenu = () => {
    setSortingMenu(!sortingMenuOpen);
  };

  return (
    <div className='flexbox-container'>
      <div className='flexbox-item'>
        <button className='button ' onClick={toggleDisplayMenu}>Display</button>
      </div>

      {displayMenuOpen && (
      <div className='flexbox-item'>
          <button className='button' onClick={toggleGroupingMenu}>Grouping</button>
          {groupingMenuOpen && (
            <div>
                <button className='button' onClick={() => setGroupBy('status')}>Status</button>             
                <button className='button' onClick={() => setGroupBy('user')}>User</button>            
                <button className='button' onClick={() => setGroupBy('priority')}>Priority</button>
            </div>
          )}
          <div className='flexbox-item'>
          <button className='button' onClick={toggleSortingMenu}>Ordering</button>
          {sortingMenuOpen && (
              <div>
                <button className='button' onClick={() => setSortOrder('priority')}>Priority</button>
                <button className='button' onClick={() => setSortOrder('title')}>Title</button>
              </div>
          )}
          </div>
      </div>
      )}
    </div>
  );
};

export default Navbar;
