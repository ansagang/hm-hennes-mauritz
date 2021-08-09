import { useState } from "react"
import { useEffect } from "react"

function Catalog() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=asia2", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "ef24b3f69dmsh1705ad4c20add74p1d6f35jsncc375f062f3f",
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data)
            })
    }, [])

    useEffect(() => {
        fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=30&categories=men_all&concepts=H%26M%20MAN", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "ef24b3f69dmsh1705ad4c20add74p1d6f35jsncc375f062f3f",
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data)
            })
    }, [])

    return (
        <div className="catalog">
            <div className="container">
                <div className="catalog-inner inner">
                    <div className="catalog-categories">
                        {
                            categories.map((categorie) => (
                                <button className="catalog-categorie">{categorie.CatName}</button>
                            ))
                        }
                    </div>
                    <div className="catalog-list">
                        {/* {
                            products.map((product) => (
                                <div className="af">{product.results.name}</div>
                            ))
                        } */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog;