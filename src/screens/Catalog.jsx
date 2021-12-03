import { useState } from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import Pagination from "../comp/Pagination";
import { apiKeys } from "../data/apiKeys";

import menu from '../img/menu.svg'
import menuClose from '../img/menu-close.svg'
import search from '../img/search.svg'
import cancel from '../img/cancel.svg'

function Catalog() {
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [categorieValue, setCategorieValue] = useState()
    const [categorieName, setCategorieName] = useState()
    const [subCategorieName, setSubCategorieName] = useState()
    const [catalogLoading, setCatalogLoading] = useState(false)
    const [categoriesLoading, setCategoriesLoading] = useState(false)
    const [sideBar, setSideBar] = useState(false)
    let [totalResults, setTotalResults] = useState(0)
    let [totalPages, setTotalPages] = useState(0)
    let [currentPage, setCurrentPage] = useState(0)
    const [sortBy, setSortBy] = useState('stock')
    const body = document.querySelector('body')
    const [searchTerm, setSearchTerm] = useState("")
    const [preSearchTerm, setPreSearchTerm] = useState("")
    const [facetsColors, setFacetsColors] = useState("All")

    useEffect(() => {
        setCategoriesLoading(false)
        fetch("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list?lang=en&country=asia2", {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${apiKeys[0].api_key}`,
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setCategories(data)
                setCategoriesLoading(true)
            })
    }, [])

    useEffect(() => {
        setCatalogLoading(false)
        fetch(categorieValue ? (facetsColors !== "All" ? "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=30&categories=" + categorieValue + "&sortBy=" + sortBy + "&colorWithNames=" + facetsColors + "" : "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=30&categories=" + categorieValue + "&sortBy=" + sortBy + "") : (facetsColors !== "All" ? "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=20&sortBy=" + sortBy + "&query=" + searchTerm + "" : "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=20&sortBy=" + sortBy + "&query=" + searchTerm + ""), {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${apiKeys[0].api_key}`,
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(response => response.json())
            .then(data => {
                setProducts(data)
                setTotalResults(data.pagination ? data.pagination.totalNumberOfResults : null)
                setTotalPages(data.pagination ? data.pagination.numberOfPages : null)
                setCatalogLoading(true)
                setCurrentPage(0)
            })
    }, [categorieValue, sortBy, searchTerm, facetsColors])

    let nextPage = (pageNumber) => {
        window.scrollTo(0, 0)
        fetch(categorieValue ? (facetsColors !== "All" ? "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=" + pageNumber + "&pagesize=30&categories=" + categorieValue + "&sortBy=" + sortBy + "&colorWithNames=" + facetsColors + "" : "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=" + pageNumber + "&pagesize=30&categories=" + categorieValue + "&sortBy=" + sortBy + "") : (facetsColors !== "All" ? "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=" + pageNumber + "&pagesize=20&sortBy=" + sortBy + "&query=" + searchTerm + "" : "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=" + pageNumber + "&pagesize=20&sortBy=" + sortBy + "&query=" + searchTerm + ""), {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": `${apiKeys[0].api_key}`,
                "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com"
            }
        })
            .then(res => res.json())
            .then(data => {
                setProducts(data)
                setCurrentPage(currentPage = pageNumber)
            })
    }

    useEffect(() => {
        deleteFilters()
    }, [categorieValue, searchTerm])

    const { removeCardFromFavouritesList, addCardToFavouritesList, favouritesList } = useContext(GlobalContext)

    console.log(products);

    function handleSubmit() {
        setCategorieValue()
        setSearchTerm(preSearchTerm)
        setCategorieName()
    }

    function deleteFilters() {
        setSortBy('stock')
        setFacetsColors("All")
    }

    return (
        <section className="catalog">
            <div className="container">
                <div className="catalog-inner inner">
                    <div className={sideBar ? 'catalog-categories active' : 'catalog-categories'}>
                        <button onClick={() => setSideBar(false) || body.classList.remove('lock')} className="catalog-categories-menu-close"><img src={menuClose} alt="" /></button>
                        <span style={categorieValue ? null : { color: '#c11a2b' }} onClick={() => setCategorieValue() || setCategorieName() || setSearchTerm("")} className={categorieValue === undefined ? 'catalog-categorie-button link active' : 'catalog-categorie-button link'}>All</span>
                        {
                            categoriesLoading ? (categories ? (categories.length > 0 ? (categories.map((categorie, i) => (
                                <div className='catalog-categorie' key={i}>
                                    <span className="catalog-categorie-button link" style={categorie.tagCodes.length > 0 ? (categorieValue === categorie.tagCodes[0] ? { color: '#c11a2b' } : null) : null} onClick={() => categorie.tagCodes.length > 0 ? (setCategorieValue(categorie.tagCodes[0]) || setCategorieName(categorie.CatName) || setSubCategorieName() || setSearchTerm("") || setPreSearchTerm("")) : null}>{categorie.CatName}</span>
                                    {
                                        categorie.CategoriesArray ? (products.results ? <div className="catalog-categorie-subcategories">
                                            {
                                                categorie.CategoriesArray.map((CategoriesItem) => (
                                                    <div className="catalog-categorie-subcategorie">
                                                        {
                                                            CategoriesItem.CategoriesArray ? (<div className="catalog-categorie-subcategorie-title sub-title"><h1>{CategoriesItem.CatName}</h1></div>) : null
                                                        }
                                                        <div className="catalog-categorie-subcategorie-items">
                                                            {
                                                                CategoriesItem.CategoriesArray ? CategoriesItem.CategoriesArray.map((SubCategorieItem) => (
                                                                    <span style={SubCategorieItem.tagCodes.length > 0 ? (categorieValue === SubCategorieItem.tagCodes[0] ? { color: '#c11a2b' } : null) : null} onClick={() => SubCategorieItem.tagCodes.length > 0 ? (setCategorieValue(SubCategorieItem.tagCodes[0]) || setCategorieName(categorie.CatName) || setSubCategorieName(CategoriesItem.CatName + ' / ' + SubCategorieItem.CatName) || setSearchTerm("") || setPreSearchTerm("")) : null} className="catalog-categorie-subcategorie-item link">{SubCategorieItem.CatName}</span>
                                                                ))
                                                                    :
                                                                    null
                                                            }
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div> : null)
                                            :
                                            null
                                    }
                                </div>
                            )))
                                :
                                null) : null)
                                :
                                null
                        }
                    </div>
                    <div className="catalog-navigation">
                        {
                            searchTerm ?
                                (
                                    <div className="catalog-search-query sub-title">
                                        <h1>{`Results for: "${searchTerm}"`}</h1>
                                    </div>
                                )
                                :
                                (<div className="catalog-breadcrumbs sub-title">
                                    <h1>{categorieName ? (subCategorieName ? (categorieName + ' / ' + subCategorieName) : (categorieName)) : 'All'}</h1>
                                </div>)
                        }
                        <button onClick={() => sideBar ? (setSideBar(false) || body.classList.remove('lock')) : (setSideBar(true) || body.classList.add('lock'))} className="catalog-products-filter-menu">
                            <img src={menu} alt="" />
                        </button>
                    </div>
                    <div className="catalog-search">
                        <div className="catalog-search-bar">
                            <input onKeyDown={(e) => e.key === 'Enter' ? handleSubmit() : null} value={preSearchTerm} type="search" onChange={e => setPreSearchTerm(e.target.value)} placeholder="Search a product" className="catalog-search-bar-input" />
                            <button onClick={() => handleSubmit()} className="catalog-search-bar-button"><img src={search} alt="" /></button>
                            <button style={preSearchTerm !== "" ? { display: 'block' } : { display: 'none' }} onClick={() => setSearchTerm("") || setPreSearchTerm("") || deleteFilters()} className="catalog-search-bar-cancel-button"><img src="" alt="" /><img src={cancel} alt="" /></button>
                        </div>
                        <div className="catalog-products-information">
                            <div className="catalog-products-information-products-number info"><p>{`${products.pagination ? (products.pagination.totalNumberOfResults) : (0)} products`}</p></div>
                            <div className="catalog-products-information-pages-number info"><p>{`${products.pagination ? (products.pagination.numberOfPages) : (0)} pages`}</p></div>
                        </div>
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
                                                                                <div className={SubCategorieItem.tagCodes.length > 0 ? (categorieValue === SubCategorieItem.tagCodes[0] ? 'catalog-menu-categorie-subcategorie-item link active' : 'catalog-menu-categorie-subcategorie-item link') : null} onClick={() => SubCategorieItem.tagCodes.length > 0 ? (setCategorieValue(SubCategorieItem.tagCodes[0]) || setCategorieName(categorie.CatName) || setSubCategorieName(CategoriesItem.CatName + ' / ' + SubCategorieItem.CatName)) : null}><span>{SubCategorieItem.CatName}</span></div>
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
                        <div style={categorieValue ? { width: 'calc(100% - 250px - 0.01px)' } : { width: 'calc(100% - 0.01px)' }} className="catalog-products">
                            <div className="catalog-products-top">
                                <div className="catalog-products-filter">
                                    <div className="catalog-products-filter-selections">
                                        <select value={sortBy} onChange={(e) => {
                                            const selectedSort = e.target.value
                                            setSortBy(selectedSort)
                                        }} name="" id="" className="catalog-products-selection">
                                            <option className="catalog-products-selection-option" value="stock">Stock</option>
                                            <option className="catalog-products-selection-option" value="ascPrice">Lowest Price</option>
                                            <option className="catalog-products-selection-option" value="descPrice">Highest Price</option>
                                            <option className="catalog-products-selection-option" value="newProduct">New Products</option>
                                        </select>
                                        {
                                            categorieValue ? (<select value={facetsColors} onChange={(e) => {
                                                const selectedColor = e.target.value
                                                setFacetsColors(selectedColor)
                                            }} name="" id="" className="catalog-products-selection">
                                                <option className="catalog-products-selection-option" value="All">All</option>
                                                {
                                                    products.facets ? (products.facets[14] ? products.facets.filter(item => item.code === 'colorWithNames').map((facet) => (
                                                        facet.values.map((value) => (
                                                            <option className="catalog-products-selection-option" value={value.code}>{value.code.split('_')[0]}</option>
                                                        ))
                                                    )) : null) : null
                                                }
                                            </select>)
                                                :
                                                null
                                        }
                                    </div>
                                    <button onClick={deleteFilters} className="catalog-products-selection-clear button-first">Delete Filters</button>
                                </div>
                            </div>
                            {
                                catalogLoading ? (products.results ? (products.results.length > 0 ? (<div className="catalog-products-list list">
                                    {
                                        products.results.map((product, i) => (
                                            <div key={i} className={categorieValue ? 'catalog-product-card active' : 'catalog-product-card'}>
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
                            {
                                catalogLoading ? (products.results ?
                                    (products.results.length > 0 ? (<div className="catalog-products-pagination">
                                        <div className="catalog-products-pagination-info sub-info">
                                            <h1>{`Showing ${currentPage + 1} page of ${totalPages} pages`}</h1>
                                        </div>
                                        <div className="catalog-products-pagination-line">
                                            <div style={{ width: `${products.results.length > 0 ? ((currentPage + 1) * 100 / totalPages) : (0)}%` }} className="catalog-products-pagination-line-active"></div>
                                        </div>
                                        {
                                            totalResults > 30 ? <Pagination pages={totalPages} nextPage={nextPage} currentPage={currentPage} /> : ''
                                        }
                                    </div>) : null)
                                    :
                                    null
                                )
                                    :
                                    (
                                        null
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}

export default Catalog;