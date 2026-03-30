import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Bell, Paintbrush } from 'lucide-react';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentTheme, changeTheme, themes } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      const fetchUnread = async () => {
        try {
          const { data } = await api.get('/items?limit=5');
          const lastRead = localStorage.getItem('alertsReadAt');
          if (!lastRead) {
            setUnreadCount((data.items || []).length);
          } else {
            const unread = (data.items || []).filter(item => new Date(item.createdAt) > new Date(lastRead));
            setUnreadCount(unread.length);
          }
        } catch (err) {}
      };
      fetchUnread();
      const pollTimer = setInterval(fetchUnread, 30000);
      
      const handleRead = () => setUnreadCount(0);
      window.addEventListener('alertsRead', handleRead);
      return () => {
        clearInterval(pollTimer);
        window.removeEventListener('alertsRead', handleRead);
      };
    }
  }, [user]);

  const handleThemeCycle = () => {
    const currentIndex = themes.findIndex(t => t.id === currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    changeTheme(themes[nextIndex].id);
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/check' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Lost Items', path: '/lost' },
    { name: 'Found Items', path: '/found' },
  ];

  return (
    <header className="bg-white shadow-sm z-30 sticky top-0 border-b border-gray-100">
      <div className="w-full px-6 lg:px-10 py-3 flex justify-between items-center transition-all duration-300">
        
        {/* Logo left side */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-primary-600 text-2xl font-bold font-title tracking-tight">FindIt@Campus</span>
        </Link>
        
        {/* Center Navigation */}
        {user && (
          <nav className="hidden md:flex items-center gap-8 bg-gray-50/50 px-6 py-1.5 rounded-full border border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-all font-medium text-[15px] py-1 relative ${
                  location.pathname === link.path
                    ? 'text-primary-600 font-bold'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-600 rounded-full translate-y-[2px]"></span>
                )}
              </Link>
            ))}
          </nav>
        )}

        {/* Right side controls */}
        <div className="flex items-center gap-5">
          <div className="hidden lg:flex flex-col items-end text-right mr-2 border-r border-gray-200 pr-5">
            <span className="text-[13px] font-bold text-gray-800 uppercase tracking-widest leading-none">
              {format(currentTime, 'EEEE')}
            </span>
            <span className="text-xs text-primary-600 font-medium">
              {format(currentTime, 'MMM do, yyyy')}
            </span>
          </div>

          {user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/notifications" className="relative p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-full transition-all">
                <Bell size={20} strokeWidth={2.5} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full ring-2 ring-white shadow-sm">
                    {unreadCount}
                  </span>
                )}
              </Link>

              <button onClick={handleThemeCycle} className="p-2 text-gray-500 hover:text-primary-600 hover:bg-gray-50 rounded-full transition-all relative group" title="Change Theme">
                <Paintbrush size={20} strokeWidth={2.5} />
                <span className="absolute -bottom-8 right-1/2 translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md">Theme</span>
              </button>

              <div className="h-8 w-px bg-gray-200"></div>

              <Link to="/settings" className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-700 font-bold uppercase hover:bg-primary-200 transition-colors shadow-sm ring-2 ring-transparent hover:ring-primary-100">
                {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
              </Link>

              <button
                onClick={handleLogout}
                className="text-sm font-bold text-gray-600 hover:text-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-5 py-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm"
              >
                Sign Up
              </Link>
            </div>
          )}
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-600 hover:text-primary-600 focus:outline-none"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-100">
                <div className="px-4 py-3 border-b border-gray-50 mb-1 lg:hidden">
                   <p className="text-xs font-bold text-gray-500 uppercase">{format(currentTime, 'EEEE')}</p>
                   <p className="text-sm font-medium text-primary-600">{format(currentTime, 'MMM do, yyyy')}</p>
                </div>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-primary-600 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                
                <div className="border-t border-gray-100 my-2"></div>
                
                {user ? (
                  <>
                     <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-primary-600 font-medium flex items-center gap-2">
                       <span className="material-symbols-outlined text-[20px]">settings</span> Settings
                     </Link>
                     <Link to="/notifications" onClick={() => setIsMenuOpen(false)} className="block px-5 py-2.5 text-gray-700 hover:bg-gray-50 hover:text-primary-600 font-medium flex items-center gap-2">
                       <span className="material-symbols-outlined text-[20px]">notifications</span> Notifications
                     </Link>
                     <button
                       onClick={() => {
                         handleLogout();
                         setIsMenuOpen(false);
                       }}
                       className="block w-full text-left px-5 py-2.5 text-red-600 hover:bg-red-50 font-medium mt-1"
                     >
                       Sign Out
                     </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block px-5 py-2 text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-5 py-2 text-primary-600 font-bold hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
