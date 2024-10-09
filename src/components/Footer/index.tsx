import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-400 p-4 text-center mt-10 shadow-md" role="contentinfo">
      <p data-testid="copyright" className="text-white text-lg">© Darius Kaya</p>
    </footer>
  );
};

export default Footer;