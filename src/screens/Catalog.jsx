import { useState } from "react"
import { useEffect } from "react"

function Catalog() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [categorieValue, setCategorieValue] = useState()
    const [activeSubCategories, setActiveSubCategories] = useState()
    console.log(categorieValue);

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
                console.log(data);
            })
    }, [])

    useEffect(() => {
        fetch(categorieValue ? "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=30&categories=" + categorieValue + "_all" : "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=30", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "ef24b3f69dmsh1705ad4c20add74p1d6f35jsncc375f062f3f",
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data.results)
                console.log(data);
            })
    }, [categorieValue])

    return (
        <div className="catalog">
            <div className="container">
                <div className="catalog-inner inner">
                    <div className="catalog-categories">
                        {
                            categories.map((categorie, i) => (
                                <div className={activeSubCategories === i ? 'catalog-categorie active' : 'catalog-categorie'} onMouseLeave={() => setActiveSubCategories()} onMouseEnter={() => setActiveSubCategories(i)} key={i}>
                                    <button style={categorieValue === categorie.CategoryValue ? { color: '#c11a2b' } : null} onClick={() => setCategorieValue(categorie.CategoryValue)} className="catalog-categorie-button">{categorie.CatName}</button>
                                    <div className="catalog-categorie-subcategories">
                                        {
                                            categorie.CategoriesArray ?
                                                console.log(categorie.CategoriesArray)
                                                :
                                                console.log(categorie.CategoriesArray)
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="catalog-list">
                        {
                            products ? products.map((product) => (
                                <div className="af">{product.name}</div>
                            ))
                                :
                                <div className="hlo">bb</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog;