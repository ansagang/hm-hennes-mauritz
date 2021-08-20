import { useState } from "react"
import { apiKeys } from "../data/apiKeys"
import { useEffect } from "react"
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import Slider from "react-slick";

function Product() {

    const settings = {
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        rows: 2,
        responsive:
            [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
            ]
    }

    const settingsthree = {
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive:
            [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 4,
                        slidesToScroll: 1
                    }
                },
            ]
    }

    const settingstwo = {
        arrows: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive:
            [
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                }
            ]
    }

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
                        productLoading ? (product ? (<div className="product-container">
                            <div className="product-center">
                                <div className="product-left">
                                    {
                                        product.articlesList.filter(item => (
                                            item.code === id
                                        )).map((article) => (
                                            <div className="product-gallery">
                                                {
                                                    article.galleryDetails[0] ? (
                                                        <img className="product-gallery-img" src={article.galleryDetails[0].url + '&call=url%5Bfile:/product/main%5D'} alt="" />)
                                                        :
                                                        null
                                                }
                                                {
                                                    article.galleryDetails[1] ? (
                                                        <img className="product-gallery-img" src={article.galleryDetails[1].url + '&call=url%5Bfile:/product/main%5D'} alt="" />)
                                                        :
                                                        null
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className="product-right">
                                    <div className="product-information">
                                        {/* <div className="product-information-sex sub-title">
                                            <h1>{product.customerGroup}</h1>
                                        </div> */}
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
                                            <Slider {...product.articlesList.length > 4 ? {...settings} : {...settingsthree}} className="product-information-articles-list">
                                                {
                                                    product.articlesList.map((article) => (
                                                        <Link className="product-information-article" to={'/catalog/product-' + article.code}>
                                                            <div className="product-information-article-img" style={article.code === id ? { border: '1px solid #000' } : null}>
                                                                {/* {
                                                                    article.galleryDetails.filter(item => (
                                                                        item.assetType === "DESCRIPTIVESTILLLIFE"
                                                                    )).map((articleImage) => (
                                                                        <img src={articleImage.url + '&call=url%5Bfile:/product/main%5D'} alt="" />
                                                                    ))
                                                                } */}
                                                                <img src={article.galleryDetails.filter(item => (item.assetType === "DESCRIPTIVESTILLLIFE"))[0].url + '&call=url%5Bfile:/product/main%5D'} alt="" />
                                                            </div>
                                                        </Link>
                                                    ))
                                                }
                                            </Slider>
                                        </div>
                                        {/* <div className="product-information-tags">
                                            <div className="product-information-tags-title sub-title">
                                                <h1>Tags</h1>
                                            </div>
                                            <div className="product-information-tags-list">
                                                {
                                                    product.newArrival ?
                                                        <div className="product-information-tag note">
                                                            <span>New Arrival</span>
                                                        </div>
                                                        :
                                                        null
                                                }
                                                {
                                                    product.newProduct ?
                                                        <div className="product-information-tag note">
                                                            <span>New Product</span>
                                                        </div>
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="product-details">
                                <div className="product-details-title title">
                                    <h1>Details</h1>
                                </div>
                                <div className="product-details-list">
                                    {
                                        product.fits ?
                                            <div className="product-detail">
                                                <div className="product-detail-title sub-title">
                                                    <h1>Fit</h1>
                                                </div>
                                                {
                                                    product.fits.map((fit) => (
                                                        <div className="product-detail-info info">
                                                            <p>{fit}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            :
                                            null
                                    }
                                    {
                                        product.lengthCollection ?
                                            (product.lengthCollection.length > 0 ? <div className="product-detail">
                                                {
                                                    product.lengthCollection.map((length) => (
                                                        <div className="product-detail-item">
                                                            <div className="product-detail-item-title sub-title">
                                                                <h1>{length.code}</h1>
                                                            </div>
                                                            {
                                                                length.value.map((i) => (
                                                                    <div className="product-detail-item-info info">
                                                                        <p>{i}</p>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div> : null)
                                            :
                                            null
                                    }
                                    <div className="product-detail">
                                        <div className="product-detail-title sub-title">
                                            <h1>Care Instructions</h1>
                                        </div>
                                        {
                                            product.articlesList.filter(item => (
                                                item.code === id
                                            )).map((article) => (
                                                article.careInstructions ?
                                                    (article.careInstructions.length > 0 ? article.careInstructions.map((careInstruction) => (
                                                        careInstruction !== "N/A" ?
                                                            <div className="product-detail-info info">
                                                                <p>{careInstruction}</p>
                                                            </div>
                                                            :
                                                            null
                                                    )) : <div className="product-detail-info info">
                                                        <p>None</p>
                                                    </div>)
                                                    :
                                                    null
                                            ))
                                        }
                                    </div>
                                    <div className="product-detail">
                                        <div className="product-detail-title sub-title">
                                            <h1>Materials</h1>
                                        </div>
                                        {
                                            product.articlesList.filter(item => (
                                                item.code === id
                                            )).map((article) => (
                                                article.compositions ?
                                                    article.compositions.map((composition) => (
                                                        composition.materials.map((material) => (
                                                            <div className="product-detail-info info">
                                                                <p>{`${material.name} ${material.percentage}%`}</p>
                                                            </div>
                                                        ))
                                                    ))
                                                    :
                                                    null
                                            ))
                                        }
                                    </div>
                                    <div className="product-detail">
                                        <div className="product-detail-title sub-title">
                                            <h1>Product Code</h1>
                                        </div>
                                        <div className="product-detail-info info">
                                            <p>{id}</p>
                                        </div>
                                    </div>
                                    {
                                        product.articlesList.filter(item => (
                                            item.code === id
                                        )).map((article) => article.pattern ? <div className="product-detail">
                                            <div className="product-detail-title sub-title">
                                                <h1>Pattern</h1>
                                            </div>
                                            {
                                                article.pattern ?
                                                    <div className="product-detail-info info">
                                                        <p>{article.pattern}</p>
                                                    </div>
                                                    :
                                                    null
                                            }
                                        </div>
                                            :
                                            null)
                                    }
                                </div>
                            </div>
                            <Slider {...settingstwo} className="product-big-gallery">
                                {
                                    product.articlesList.filter(item => (
                                        item.code === id
                                    )).map((article) => (
                                        article.galleryDetails.map((galleryDetail) => (
                                            <div className="product-big-gallery-img">
                                                <img src={galleryDetail.url + '&call=url%5Bfile:/product/main%5D'} alt="" />
                                            </div>
                                        ))
                                    ))
                                }
                            </Slider>
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