import { useState } from "react"
import { useEffect } from "react"
import Loading from '../comp/Loading'

function Catalog() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [categorieValue, setCategorieValue] = useState()
    const [categorieName, setCategorieName] = useState()
    const [subCategorieName, setSubCategorieName] = useState()
    const [catalogLoading, setCatalogLoading] = useState(false)
    const [categoriesLoading, setCategoriesLoading] = useState(false)
    console.log(categorieValue);

    useEffect(() => {
        fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=asia2", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "23f52bc88dmsha23f13938582cf8p1caaa1jsn1e3173d72031",
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data)
                setCategoriesLoading(true)
                console.log(data);
            })
    }, [])

    useEffect(() => {
        fetch(categorieValue ? "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=30&categories=" + categorieValue + "" : "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=30", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "23f52bc88dmsha23f13938582cf8p1caaa1jsn1e3173d72031",
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data.results)
                setCatalogLoading(true)
                console.log(data);
            })
    }, [categorieValue])

    return (
        <div className="catalog">
            <div className="container">
                <div className="catalog-inner inner">
                    <div className="catalog-categories">
                        <span style={categorieValue === undefined ? { color: '#c11a2b' } : null} onClick={() => setCategorieValue() || setCategorieName()} className="catalog-categorie-button link">All</span>
                        {
                            categoriesLoading ? (categories.length > 0 ? (categories.map((categorie, i) => (
                                <div className="catalog-categorie" key={i}>
                                    <span style={categorie.tagCodes.length > 0 ? (categorieValue === categorie.tagCodes[0] ? { color: '#c11a2b' } : null) : null} onClick={() => categorie.tagCodes.length > 0 ? (setCategorieValue(categorie.tagCodes[0]) || setCategorieName(categorie.CatName) || setSubCategorieName()) : null} className="catalog-categorie-button link">{categorie.CatName}</span>
                                    <div className="catalog-categorie-subcategories">
                                        {
                                            categorie.CategoriesArray ?
                                                categorie.CategoriesArray.map((CategoriesItem) => (
                                                    <div className="catalog-categorie-subcategorie">
                                                        {
                                                            CategoriesItem.CategoriesArray ? (<div className="catalog-categorie-subcategorie-title sub-title"><h1>{CategoriesItem.CatName}</h1></div>) : null
                                                        }
                                                        <div className="catalog-categorie-subcategorie-items">
                                                            {
                                                                CategoriesItem.CategoriesArray ? CategoriesItem.CategoriesArray.map((SubCategorieItem) => (
                                                                    <span style={SubCategorieItem.tagCodes.length > 0 ? (categorieValue === SubCategorieItem.tagCodes[0] ? { color: '#c11a2b' } : null) : null} onClick={() => SubCategorieItem.tagCodes.length > 0 ? (setCategorieValue(SubCategorieItem.tagCodes[0]) || setCategorieName(categorie.CatName) || setSubCategorieName(CategoriesItem.CatName + ' / ' + SubCategorieItem.CatName)) : null} className="catalog-categorie-subcategorie-item link">{SubCategorieItem.CatName}</span>
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
                                null)
                                :
                                null
                        }
                    </div>
                    <div className="catalog-breadcrumbs info">
                        <h1>{categorieName ? (subCategorieName ? (categorieName + ' / ' + subCategorieName) : (categorieName)) : null}</h1>
                    </div>
                    <div className="catalog-menu">
                        {
                            categorieValue ?
                                (<div className="catalog-menu-categories">
                                    {
                                        categories.filter(item => (
                                            item.CatName === categorieName
                                        )).map((categorie, i) => (
                                            <div className="catalog-menu-categorie" key={i}>
                                                <div className="catalog-menu-categorie-subcategories">
                                                    {
                                                        categorie.CategoriesArray ?
                                                            categorie.CategoriesArray.map((CategoriesItem) => (
                                                                <div className="catalog-menu-categorie-subcategorie">
                                                                    {
                                                                        CategoriesItem.CategoriesArray ? (<div className="catalog-menu-categorie-subcategorie-title sub-title"><h1>{CategoriesItem.CatName}</h1></div>) : null
                                                                    }
                                                                    <div className="catalog-menu-categorie-subcategorie-items">
                                                                        {
                                                                            CategoriesItem.CategoriesArray ? CategoriesItem.CategoriesArray.map((SubCategorieItem) => (
                                                                                <span style={SubCategorieItem.tagCodes.length > 0 ? (categorieValue === SubCategorieItem.tagCodes[0] ? { color: '#c11a2b' } : null) : null} onClick={() => SubCategorieItem.tagCodes.length > 0 ? (setCategorieValue(SubCategorieItem.tagCodes[0]) || setCategorieName(categorie.CatName) || setSubCategorieName(CategoriesItem.CatName + ' / ' + SubCategorieItem.CatName)) : null} className="catalog-menu-categorie-subcategorie-item link">{SubCategorieItem.CatName}</span>
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
                                        ))
                                    }
                                </div>)
                                :
                                null
                        }
                        <div style={categorieValue ? { width: '80%' } : { width: '100%' }} className="catalog-products">
                            <div className="catalog-products-filter"></div>
                            {
                                catalogLoading ? (products ? <div className="catalog-products-list list">
                                    {
                                        products.map((product) => (
                                            <div className="catalog-product">
                                                {product.name}
                                            </div>
                                        ))
                                    }
                                </div>
                                    :
                                    <div className="catalog-list-error">
                                        <div className="catalog-list-error-title">
                                            <h1>Connection Failed</h1>
                                        </div>
                                        <div className="catalog-list-error-info">
                                            <p>Could not connect to server <br /> Please check your connection and try again</p>
                                        </div>
                                    </div>)
                                    :
                                    <h1> a</h1>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Catalog;