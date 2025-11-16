import { useState , useEffect} from 'react'
import { useDispatch} from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from './store/authSlice'
import { Footer, Header } from './components'
import {Outlet} from 'react-router-dom'


function App() {
//  console.log(import.meta.env.VITE_APPWRITE_URL);

const [loading, setLoading] = useState(true)

const dispatch = useDispatch()

 useEffect(()=>{
  authService.getCurrentUser()
  .then((userData)=>{
    if(userData){
      dispatch(login({userData}))
    }else{
      dispatch(logout())
    }
  })
  .finally(()=>setLoading(false))
 }, [])

 return !loading ? (
  <div className='min-h-screen flex flex-col bg-slate-50 text-slate-800'>
      <div className='w-full block'>
        <Header />
        <main className='py-6 relative'>
          <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat bg-fixed opacity-60"></div>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    <div className='min-h-screen grid place-items-center bg-slate-50'>
      <div className='text-slate-800 text-lg animate-pulse'>Loading...</div>
    </div>
  )
}

export default App

