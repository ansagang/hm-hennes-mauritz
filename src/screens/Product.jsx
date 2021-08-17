import { useState } from "react"
import { apiKeys } from "../data/apiKeys"
import { useEffect } from "react"
import { useParams } from "react-router"

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
                            <div className="product-left">
                                <div className="product-gallery">
                                    {
                                        product.articlesList.filter(item => (
                                            item.code === id
                                        )).map((article) => (
                                            article.galleryDetails.map((galleryDetail) => (
                                                <img src={galleryDetail.url} alt="" />
                                            ))
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="product-right">
                                <div className="product-information">
                                    <div className="product-information-title sub-title">
                                        <h1>{product.name}</h1>
                                    </div>
                                    <div className="product-information-price sub-title">
                                        <h1>{`${product.whitePrice.price}$`}</h1>
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
                            <h1>Loading</h1>
                    }
                </div>
            </div>
        </section>
    )
}

export default Product;