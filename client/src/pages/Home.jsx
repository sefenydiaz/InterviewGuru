import { useState } from 'react';
import Header from '../components/Header/index';
import Form from './Resume';
import About from './About';
import Portfolio from './Portfolio';
import Contact from './Contact';


export default function MainPage() {
  const [currentPage, setCurrentPage] = useState('Form');
  const renderPage = () => {
    if (currentPage === 'About') {
      return <About />;
    }
    if (currentPage === 'Resume') {
      return <Resume />;
    }
    if (currentPage === 'Portfolio') {
      return <Portfolio />;
    }
    return <Contact />;
  };
const handlePageChange = (page) => setCurrentPage(page);

return (
  <div>
    {/* We are passing the currentPage from state and the function to update it */}
    <Header currentPage={currentPage} handlePageChange={handlePageChange} />
    {/* Here we are calling the renderPage method which will return a component  */}
    <main className="mx-3">{renderPage()}</main>
  </div>
);

}