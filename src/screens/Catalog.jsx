import { useState } from "react"
import { useEffect } from "react"

function Catalog() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [categorieValue, setCategorieValue] = useState()
    console.log(categorieValue);

    useEffect(() => {
        fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=asia2", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "d3216d8970mshf3b76759723be01p1750f4jsnc56c974fd1e0",
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data)
                // console.log(data);
            })
    }, [])

    useEffect(() => {
        fetch(categorieValue ? "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=30&categories=" + categorieValue + "" : "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=30", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "d3216d8970mshf3b76759723be01p1750f4jsnc56c974fd1e0",
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data.results)
                // console.log(data);
            })
    }, [categorieValue])

    return (
        <div className="catalog">
            <div className="container">
                <div className="catalog-inner inner">
                    <div className="catalog-categories">
                        <button style={categorieValue === undefined ? { color: '#c11a2b' } : null} onClick={() => setCategorieValue()} className="catalog-categorie-button">All</button>
                        {
                            categories.length > 0 ? (categories.map((categorie, i) => (
                                <div className="catalog-categorie" key={i}>
                                    <button style={categorie.tagCodes.length > 0 ? (categorieValue === categorie.tagCodes[0] ? { color: '#c11a2b' } : null) : null} onClick={() => categorie.tagCodes.length > 0 ? (setCategorieValue(categorie.tagCodes[0])) : null} className="catalog-categorie-button">{categorie.CatName}</button>
                                    <div className="catalog-categorie-subcategories">
                                        {
                                            categorie.CategoriesArray ?
                                                categorie.CategoriesArray.map((CategoriesItem) => (
                                                    <div className="catalog-categorie-subcategorie">
                                                        <div className="catalog-categorie-subcategorie-title">{CategoriesItem.CatName}</div>
                                                        <div className="catalog-categorie-subcategorie-items">
                                                            {
                                                                CategoriesItem.CategoriesArray ? CategoriesItem.CategoriesArray.map((SubCategorieItem) => (
                                                                    <button style={SubCategorieItem.tagCodes.length > 0 ? (categorieValue === SubCategorieItem.tagCodes[0] ? { color: '#c11a2b' } : null) : null} onClick={() => SubCategorieItem.tagCodes.length > 0 ? (setCategorieValue(SubCategorieItem.tagCodes[0])) : null} className="catalog-categorie-subcategorie-item">{SubCategorieItem.CatName}</button>
                                                                ))
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                                :
                                                null
                                        }
                                    </div>
                                </div>
                            )))
                            :
                            null
                        }
                    </div>
                    <div className="catalog-list">
                        {
                            products ? products.map((product) => (
                                <div className="af">{product.name}</div>
                            ))
                                :
                                <div className="catalog-list-error">
                                    <div className="catalog-list-error-title">
                                        <h1>Connection Failed</h1>
                                    </div>
                                    <div className="catalog-list-error-info">
                                        <p>Could not connect to server <br /> Please check your connection and try again</p>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog;