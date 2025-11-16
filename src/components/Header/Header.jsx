import React from 'react'
import { Container,Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function Header() {
  const authStatus = useSelector((state)=> state.auth.status)

  const navigate = useNavigate()

  const navItems = [
    {
      name: 'Home',
      slug :"/",
      active :true
    },
    {
      name: 'Login',
      slug :"/login",
      active :!authStatus,
    },
    {
      name: 'Signup',
      slug :"/signup",
      active :!authStatus
    },{
      name: 'All Posts ',
      slug :"/all-posts",
      active :authStatus,
    },
    {
      name: 'Add Post',
      slug :"/add-post",
      active :authStatus,
    },

   
  ]
  return (
    <header className='sticky top-0 z-40 backdrop-blur-md supports-[backdrop-filter]:bg-slate-900/80 bg-slate-900/80 border-b border-slate-700 text-slate-100'>
      <Container>
        <nav className='flex items-center py-3'>
          <div className='mr-6'>
            <Link to='/'>
              <Logo width='70px'   />

              </Link>
          </div>
          <ul className='flex ml-auto gap-1'>
            {navItems.map((item) => 
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.slug)}
                  className='inline-block px-4 py-2 rounded-full text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors duration-200'
                >
                  {item.name}
                </button>
              </li>
            ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
        </Container>
    </header>
  )
}

export default Header
// console.log("Header rendered");

// function Header() {
//   console.log("Header rendered");
//   return (
//     <header className="bg-blue-500 text-white p-4 text-center text-xl">
//       This is the Header
//     </header>
//   );
// }
// export default Header
 // notes se lao
 