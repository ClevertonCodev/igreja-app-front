import React from 'react';
import MyCarousel from '../../components/carousel';
import Layout from '../../components/layout';
import "./home.scss";

const Home = () => {
    return (
        <Layout title='Home'>
        <div >
            <MyCarousel/>
            <div id='home'>
                <h1>Home</h1>
                <br />
                <p className='Text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quam modi aliquid culpa dignissimos id nisi ipsam debitis earum, accusamus iusto maxime repudiandae ex commodi ipsum, amet voluptates similique nam!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere repellendus, nulla illum inventore itaque, rem recusandae nobis temporibus accusantium, sed quidem quo? Beatae, rem dolore incidunt veritatis praesentium sed ullam? Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis nulla incidunt, est officia unde aut quasi sit iusto quam voluptas eos explicabo sint saepe omnis, quidem a labore voluptatibus id.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea voluptates maxime, ducimus quas tenetur fugiat expedita eligendi dolorem accusamus. Obcaecati expedita dignissimos omnis nostrum tempora minima reprehenderit assumenda! Ipsum, voluptate. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi magnam voluptatem maxime molestiae iure, asperiores dicta at voluptate eos iste consequatur quas similique voluptas quidem pariatur optio perspiciatis dolor blanditiis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis at praesentium architecto quos nisi laudantium nihil eligendi dolor voluptatibus amet suscipit enim esse recusandae atque, sed repudiandae error illo beatae. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam saepe nemo harum recusandae, odio pariatur omnis, dicta eum consequuntur quod est illum quam sapiente facilis molestiae eveniet magnam incidunt explicabo. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci in ad, obcaecati, delectus iste alias dicta laboriosam quas distinctio voluptas praesentium sed facere laborum harum. Suscipit nulla autem rem ullam. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis, voluptatem? Fugiat dicta quod est dolores perferendis quibusdam harum vitae laudantium dolorem quisquam. Nostrum culpa dolor porro sit a beatae fugiat.
                </p>
            </div> 
        </div>
        </Layout>
    );
}

export default Home;
