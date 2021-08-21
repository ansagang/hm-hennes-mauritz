import { Link } from "react-router-dom";
import background from '../img/nintchdbpict000269766327.webp'
import { useState, useEffect } from "react";

function Home() {
    const [offsetY, setOffsetY] = useState(0)

    const handleScroll = () => setOffsetY(window.pageYOffset)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return() => window.addEventListener('scroll', handleScroll)
    })


    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="hero-inner inner">
                       <div className="hero-center center">
                           <div className="hero-left left">
                               <div className="hero-title title">
                                   <h1>Hennes & Mauritz</h1>
                               </div>
                               <div className="hero-info info">
                                   <p>Welcome to H&M, your shopping destination for fashion online. We offer fashion and quality at the best price in a more sustainable way. Shop for women's, men's and kids' fashion, beauty and home essentials online! We offer quality styles at the best price and in a sustainable way.</p>
                               </div>
                               <Link exact to="/catalog"><button className="hero-button button-first">Catalog</button></Link>
                           </div>
                           <div className="hero-right right">
                               <div className="hero-img">
                                   <img src={background} alt="" className="hero-img-logo" />
                                   <div style={{transform: `translateY(${offsetY * 0.06}px)`}} className="hero-img-background"></div>
                               </div>
                           </div>
                       </div>
                    </div>
                </div>
            </section>
            <section className="about">
                <div className="container">
                    <div className="about-inner inner">
                        <div className="about-center center">
                            <div className="about-left left">
                                
                            </div>
                            <div className="about-right right">

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <section className="advantage">
                <div className="container">
                    <div className="advantage-inner inner">
                        <h1>Преимущества</h1>
                        <div className="advantage-list">
                            <div className="advantage-plus">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                                    eum sed autem repellendus commodi vitae nisi. Aut sint minima
                                    quidem ex esse velit odio error nulla labore quas. Autem,
                                    architecto.
                                </p>
                            </div>
                            <div className="advantage-plus">
                                <img src={cardigan} alt="" />
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                                    eum sed autem repellendus commodi vitae nisi. Aut sint minima
                                    quidem ex esse velit odio error nulla labore quas. Autem,
                                    architecto.
                                </p>
                            </div>
                            <div className="advantage-plus">
                                <img src={delivery_box} alt="" />
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                                    eum sed autem repellendus commodi vitae nisi. Aut sint minima
                                    quidem ex esse velit odio error nulla labore quas. Autem,
                                    architecto.
                                </p>
                            </div>
                            <div className="advantage-plus">
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                                    eum sed autem repellendus commodi vitae nisi. Aut sint minima
                                    quidem ex esse velit odio error nulla labore quas. Autem,
                                    architecto.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}
        </>
    )
}

export default Home;