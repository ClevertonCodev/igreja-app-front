import React from 'react'
import Navbar from '../navbar';
import "./layout.scss";
import Footer from '../footer';
interface LayoutProps {
    title: string;
    children: React.ReactNode;
  }

function Layout (props: LayoutProps) {

    return(
       
             <div className='layout' >
                 <title>
                {props.title}
                </title>  
                <Navbar/>  
                <main className='main'>
                {props.children}   
                </main>
                <Footer/>
             </div>
    ) 
}

export default Layout;