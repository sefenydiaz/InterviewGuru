import { useState } from 'react';
import Header from '../components/Header/index';
import Welcome from './Welcome'
import Form from './Form';
import Questions from './Questions';
import Stats from './Stats';


export default function Home() {
  const [currentPage, setCurrentPage] = useState('Form');
  const renderPage = () => {
    if (currentPage === 'Welcome') {
      return <Welcome />;
    }
    if (currentPage === 'Form') {
      return <Form />;
    }
    if (currentPage === 'Questions') {
      return <Questions />;
    }
    return <Stats />;
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