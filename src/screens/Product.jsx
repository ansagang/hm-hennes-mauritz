import { useState } from "react"
import { apiKeys } from "../data/apiKeys"
import { useEffect } from "react"
import { useParams } from "react-router"

function Product() {

    const { id } = useParams()
   
    const [product, setProduct] = useState([])

    useEffect(() => {
        fetch("    https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail?lang=en&productcode=" + id + "&country=asia2", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${apiKeys[0].api_key}`,
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setProduct(data.product)
                console.log(data.product);
            })
    }, [id])

    return(
        <section className="product">
            <div className="container">
                <div className="product-inner">

                </div>
            </div>
        </section>
    )
}

export default Product;