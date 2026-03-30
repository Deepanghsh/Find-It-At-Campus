const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto pt-10 pb-6 border-t border-gray-700">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <a href="/" className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold font-title text-white tracking-tight">FindIt<span className="text-primary-400">@</span>Campus</span>
          </a>
          <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
            Lost something on campus? Don't worry, we're here to help you reunite with your belongings.
            A secure and quick way to report and find lost items within the college premises.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex flex-col justify-center items-center text-gray-300 hover:bg-primary-600 hover:text-white transition-colors duration-300">
              <i className="fa-brands fa-twitter text-sm"></i>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex flex-col justify-center items-center text-gray-300 hover:bg-primary-600 hover:text-white transition-colors duration-300">
              <i className="fa-brands fa-instagram text-sm"></i>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex flex-col justify-center items-center text-gray-300 hover:bg-primary-600 hover:text-white transition-colors duration-300">
              <i className="fa-brands fa-linkedin-in text-sm"></i>
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex flex-col justify-center items-center text-gray-300 hover:bg-primary-600 hover:text-white transition-colors duration-300">
              <i className="fa-brands fa-facebook-f text-sm"></i>
            </a>
          </div>
        </div>
        
        <div className="md:ml-auto">
          <h3 className="text-base font-bold mb-4 uppercase tracking-wider text-gray-300 font-title">Quick Links</h3>
          <ul className="space-y-3">
            <li><a href="/" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">chevron_right</span> Home</a></li>
            <li><a href="/about" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">chevron_right</span> About Us</a></li>
            <li><a href="/lost" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">chevron_right</span> Report Lost Item</a></li>
          </ul>
        </div>
        
        <div className="md:ml-auto">
          <h3 className="text-base font-bold mb-4 uppercase tracking-wider text-gray-300 font-title">Services</h3>
          <ul className="space-y-3">
            <li><a href="/found" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">chevron_right</span> Report Found Item</a></li>
            <li><a href="/check" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">chevron_right</span> Check Status</a></li>
            <li><a href="#" className="text-gray-400 hover:text-primary-400 text-sm transition-colors duration-200 flex items-center gap-2"><span className="material-symbols-outlined text-[16px]">chevron_right</span> FAQ</a></li>
          </ul>
        </div>
        
        <div className="md:ml-auto">
          <h3 className="text-base font-bold mb-4 uppercase tracking-wider text-gray-300 font-title">Contact Info</h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 group">
              <span className="material-symbols-outlined text-primary-400 group-hover:bg-primary-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-700">location_on</span>
              <span className="text-gray-400 text-sm leading-relaxed pt-1">Student Union Building, Room 101<br/>University Campus</span>
            </li>
            <li className="flex items-start gap-3 group">
              <span className="material-symbols-outlined text-primary-400 group-hover:bg-primary-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-700">call</span>
              <span className="text-gray-400 text-sm pt-1 hover:text-primary-400 transition-colors cursor-pointer">+1 (555) 123-4567</span>
            </li>
            <li className="flex items-start gap-3 group">
              <span className="material-symbols-outlined text-primary-400 group-hover:bg-primary-600 transition-colors w-8 h-8 flex items-center justify-center rounded-full bg-gray-700">mail</span>
              <span className="text-gray-400 text-sm pt-1 hover:text-primary-400 transition-colors cursor-pointer">support@finditcampus.edu</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-gray-700 py-4 mt-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} FindIt@Campus. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
