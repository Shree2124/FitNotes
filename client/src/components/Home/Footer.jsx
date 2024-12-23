const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} FitNotes. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
