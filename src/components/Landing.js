import React from 'react';
import './Landing.css';

const Landing = () => (
    <section className="landing">
     <h1 className="hero-title">Turn the music up!</h1>

     <div id="myCarousel" className="carousel slide container" data-ride="carousel" data-interval="7000">
       <ol className="carousel-indicators">
         <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
         <li data-target="#myCarousel" data-slide-to="1"></li>
         <li data-target="#myCarousel" data-slide-to="2"></li>
       </ol>
       <div className="carousel-inner">
         <div className="carousel-item active">
           <img className="d-bloc w-100" src="\assets\images\carousel_images\carousel-image-1.jpg" alt="concert"/>
           <div className="carousel-caption d-none d-md-block">
             <h3>Choose your music</h3>
             <p>The world is full of music; why should you have to listen to music that someone else chose?</p>
           </div>
         </div>

         <div className="carousel-item">
           <img className="d-bloc w-100" src="\assets\images\carousel_images\carousel-image-2.jpg" alt="thunderstorm"/>
           <div className="carousel-caption d-none d-md-block">
             <h3>Unlimited, streaming, ad-free</h3>
             <p>No arbitrary limits. No distractions.</p>
           </div>
         </div>

         <div className="carousel-item">
           <img className="d-bloc w-100" src="\assets\images\carousel_images\carousel-image-3.jpg" alt="phone"/>
           <div className="carousel-caption d-none d-md-block">
             <h3>Mobile Enabled</h3>
             <p>Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
           </div>
         </div>
       </div>

       <a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
         <span className="carousel-control-prev-icon" aria-hidden="true"></span>
         <span className="sr-only">Previous</span>
       </a>
       <a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
         <span className="carousel-control-next-icon" aria-hidden="true"></span>
         <span className="sr-only">Next</span>
       </a>
      </div>
    </section>
);

export default Landing;
