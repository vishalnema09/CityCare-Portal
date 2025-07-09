import React from 'react'
import { Outlet } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast";
import Header from './components/Header';
import Footer from './components/Footer';


const App = () => {
  return (
    <>
    <Header /> 
      <main className="min-h-[80vh]">
        <Outlet />
      </main>
      <Toaster />
      <Footer />
    </>
  )
}

export default App