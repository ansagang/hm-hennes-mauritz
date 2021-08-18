import { useState } from "react"
import { apiKeys } from "../data/apiKeys"
import { useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"

function Product() {

    const { id } = useParams()

    const [product, setProduct] = useState([])
    const [productLoading, setProductLoading] = useState(false)

    useEffect(() => {
        fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&productcode=" + id + "&country=asia2", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${apiKeys[0].api_key}`,
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setProduct(data.product)
                setProductLoading(true)
                console.log(data);
            })
    }, [id])

    console.log(id);

    return (
        <section className="product">
            <div className="container">
                <div className="product-inner inner">
                    {
                        productLoading ? (product ? (<div className="product-details">
                            <div className="product-center">
                                <div className="product-left">
                                    {
                                        product.articlesList.filter(item => (
                                            item.code === id
                                        )).map((article) => (
                                            <div className="product-gallery">
                                                <img className="product-gallery-img" src={article.galleryDetails[0].url + '&call=url%5Bfile:/product/main%5D'} alt="" />
                                                <img className="product-gallery-img" src={article.galleryDetails[1].url + '&call=url%5Bfile:/product/main%5D'} alt="" />
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="product-right">
                                    <div className="product-information">
                                        <div className="product-information-title sub-title">
                                            <h1>{product.name}</h1>
                                        </div>
                                        <div className="product-information-info info">
                                            <p>{product.description}</p>
                                        </div>
                                        <div className="product-information-price sub-title">
                                            <h6>{`${product.whitePrice.price}$`}</h6>
                                        </div>
                                        <div className="product-information-articles">
                                            {
                                                product.articlesList.filter(item => (
                                                    item.code === id
                                                )).map((article) => (
                                                    <div className="product-information-articles-title sub-title">
                                                        <h1>{article.color.text}</h1>
                                                    </div>
                                                ))
                                            }
                                            <div className="product-information-articles-list list">
                                                {
                                                    product.articlesList.map((article) => (
                                                        <Link style={article.code === id ? {border:'1px solid #000'} : null} className="product-information-article" to={'/catalog/product-' + article.code}>
                                                            <div className="product-information-article-img">
                                                                {
                                                                    article.galleryDetails.filter(item => (
                                                                        item.assetType === "DESCRIPTIVESTILLLIFE"
                                                                    )).map((articleImage) => (
                                                                        <img src={articleImage.url + '&call=url%5Bfile:/product/main%5D'} alt="" />
                                                                    ))
                                                                }
                                                            </div>
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                            :
                            <div className="catalog-list-error content">
                                <div className="catalog-list-error-title">
                                    <h1>Connection Failed</h1>
                                </div>
                                <div className="catalog-list-error-info">
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
                </div>
            </div>
        </section>
    )
}

export default Product;