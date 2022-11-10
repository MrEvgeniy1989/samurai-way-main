import React from 'react';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <div className="app-wrapper">
            <Header/>
            <Navbar />
            <div className="content">
                <div>
                    <img
                        src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
                        alt="image1"/></div>
                <div>
                    ava + description
                </div>
                <div>
                    My posts
                    <div>
                        New post
                    </div>
                    <div>
                        post1
                    </div>
                    <div>
                        post2
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;