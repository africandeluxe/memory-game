import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-6">
      </main>
      <Footer />
    </div>
  );
};

export default App;