import { Link } from "react-router-dom";
import background from '../img/nintchdbpict000269766327.webp'
import { useState, useEffect } from "react";
import { apiKeys } from "../data/apiKeys";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { qa } from "../data/apiKeys";
import questionicon from '../img/question-answer.svg'

function Home() {
    const [newproducts, setNewProducts] = useState([])
    const [offsetY, setOffsetY] = useState(0)
    const [catalogLoading, setCatalogLoading] = useState(false)
    const [question, setQuestion] = useState("")

    const handleScroll = () => setOffsetY(window.pageYOffset)

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => window.addEventListener('scroll', handleScroll)
    })

    useEffect(() => {
        fetch(("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=8&sortBy=newProduct"), {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${apiKeys[0].api_key}`,
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setNewProducts(data)
                setCatalogLoading(true)
                console.log(data);
            })
    }, [])

    const { removeCardFromFavouritesList, addCardToFavouritesList, favouritesList } = useContext(GlobalContext)

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
                                    <div style={{ transform: `translateY(${offsetY * 0.06}px)` }} className="hero-img-background"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="about">
                <div className="container">
                    <div className="about-inner inner">
                        <div className="about-title title">
                            <h1>About Us</h1>
                        </div>
                        <div className="about-list">
                            <div className="about-item">
                                <div className="about-item-title sub-title">
                                    <h1>Advantages</h1>
                                </div>
                                <div className="about-item-info info">
                                    <p>H&M has become one of the leading fast fashion companies using its supply chain and techonology as core competitive advantages. H&M's business model consists of creating value for customers by offering fashion and quality at the best price. H&M offers products for women, men, teenagers and children.</p>
                                </div>
                            </div>
                            <div className="about-item">
                                <div className="about-item-title sub-title">
                                    <h1>Advantages</h1>
                                </div>
                                <div className="about-item-info info">
                                    <p>H&M has become one of the leading fast fashion companies using its supply chain and techonology as core competitive advantages. H&M's business model consists of creating value for customers by offering fashion and quality at the best price. H&M offers products for women, men, teenagers and children.</p>
                                </div>
                            </div>
                            <div className="about-item">
                                <div className="about-item-title sub-title">
                                    <h1>Advantages</h1>
                                </div>
                                <div className="about-item-info info">
                                    <p>H&M has become one of the leading fast fashion companies using its supply chain and techonology as core competitive advantages. H&M's business model consists of creating value for customers by offering fashion and quality at the best price. H&M offers products for women, men, teenagers and children.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="newproducts">
                <div className="container">
                    <div className="newproducts-inner inner">
                        <div className="newproducts-title title">
                            <h1>New Products</h1>
                        </div>
                        {
                            catalogLoading ? (newproducts.results ? (newproducts.results.length > 0 ? (<div className="catalog-products-list list">
                                {
                                    newproducts.results.map((product, i) => (
                                        <div key={i} className='catalog-product-card'>
                                            {
                                                favouritesList.find((o) => o.defaultArticle.code === product.defaultArticle.code) ?
                                                    <button onClick={() => removeCardFromFavouritesList(product.defaultArticle.code)} className="catalog-product-card-button active"></button>
                                                    :
                                                    <button disabled={favouritesList.find((o) => o.defaultArticle.code === product.defaultArticle.code) ? true : false} onClick={() => addCardToFavouritesList(product)} className="catalog-product-card-button"></button>
                                            }
                                            <Link to={'/catalog/product-' + product.defaultArticle.code} className="catalog-product-card-top">
                                                <div className="catalog-product-card-img">
                                                    <img src={product.images[0].url} alt="" className="catalog-product-card-img-default" />
                                                    <img src={product.defaultArticle.logoPicture[0].url} alt="" className="catalog-product-card-img-onhover" />
                                                </div>
                                            </Link>
                                            <div className="catalog-product-card-bottom">
                                                <div className="catalog-product-card-title sub-title">
                                                    <h1>{product.name}</h1>
                                                </div>
                                                <div className="catalog-product-card-price info">
                                                    <p>{product.whitePrice.formattedValue}</p>
                                                </div>
                                                <div className="catalog-product-card-colors">
                                                    {
                                                        product.articleCodes ? (product.articleCodes.map((articleCode, i) => (
                                                            <Link to={'/catalog/product-' + articleCode} className="catalog-product-card-links">
                                                                <div style={{ backgroundColor: `${product.rgbColors[i]}` }} className="catalog-product-card-link-color"></div>
                                                            </Link>
                                                        )))
                                                            :
                                                            null
                                                    }
                                                    {/* {
                                                            product.swatchesTotal - product.rgbColors.length !== 0 ?
                                                                (
                                                                    <div className="catalog-product-card-colors-more sub-title">
                                                                        <h1>{`+${product.swatchesTotal - product.rgbColors.length}`}</h1>
                                                                    </div>
                                                                )
                                                                :
                                                                null
                                                        } */}
                                                </div>
                                                <div className="catalog-product-card-categorie-title note">
                                                    <span>{product.categoryName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>) : (<div className="catalog-list-error content">
                                <div className="catalog-list-error-title title">
                                    <h1>No Product Found</h1>
                                </div>
                                <div className="catalog-list-error-info info">
                                    <p>Could not find the products you are searching for</p>
                                </div>
                            </div>))
                                :
                                <div className="catalog-list-error content">
                                    <div className="catalog-list-error-title title">
                                        <h1>Connection Failed</h1>
                                    </div>
                                    <div className="catalog-list-error-info info">
                                        <p>Could not connect to server <br /> Please check your connection and try again</p>
                                    </div>
                                </div>)
                                :
                                <div className="catalog-products-list-loader content">
                                    <div className="catalog-products-list-loader-title title">
                                        <h1>Loading...</h1>
                                    </div>
                                </div>
                        }
                        <Link exact to="/catalog"><button className="newproducts-button button-first">See More...</button></Link>
                    </div>
                </div>
            </section>
            <section className="qa">
                <div className="container">
                    <div className="qa-inner inner">
                        <div className="qa-title title">
                            <h1>Questions and Answers</h1>
                        </div>
                        <div className="qa-list">
                            {
                                qa.map((item) => (
                                    <div className={question === item.question ? 'qa-card active' : 'qa-card'} onClick={() => question === item.question ? setQuestion('') : setQuestion(item.question)}>
                                        <div className="qa-card-top">
                                            <div className="qa-card-question sub-title">
                                                <h1>{item.question}</h1>
                                            </div>
                                            <div className="qa-card-question-icon"><img src={questionicon} alt="" /></div>
                                        </div>
                                        <div className="qa-card-bottom">
                                            <div className="qa-card-answer info"><h1>{item.answer}</h1></div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;