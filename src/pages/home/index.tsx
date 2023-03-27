import React from 'react';
import MyCarousel from '../../components/carousel';
import Footer from '../../components/footer';
import Navbar from '../../components/navbar';

const Home = () => {
    return (
        <div id='home'>
            <Navbar/>
            <MyCarousel/>
            <div><p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quam modi aliquid culpa dignissimos id nisi ipsam debitis earum, accusamus iusto maxime repudiandae ex commodi ipsum, amet voluptates similique nam!</p></div> 
            <Footer/>
        </div>
    );
}

export default Home;
