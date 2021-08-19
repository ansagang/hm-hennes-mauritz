import { GlobalContext } from "../context/GlobalState";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Cart() {
    const { removeCardFromFavouritesList, favouritesList } = useContext(GlobalContext)

    return (
        <section className="cart">
            <div className="container">
                <div className="cart-inner inner">
                    <div className="cart-title title centered">
                        <h1>Корзина</h1>
                    </div>
                    <div className="cart-info info">
                        <p>{`${favouritesList.length} товаров`}</p>
                    </div>
                    {
                        favouritesList.length > 0 ?
                            (
                                <div className="cart-products-list list">
                                    {
                                        favouritesList.map((favouritesCard) => (
                                            <div className='catalog-product-card'>
                                                <button onClick={() => removeCardFromFavouritesList(favouritesCard.defaultArticle.code)} className="catalog-product-card-remove-button"><svg viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg" focusable="false"><path fill-rule="evenodd" d="M14 4v1h-1v10.455c0 .3-.224.545-.5.545h-11c-.276 0-.5-.244-.5-.545V5H0V4h14zm-2 1v10H2V5h10zM9.5 0a.5.5 0 01.5.5V2h4v1H0V2h4V.5a.5.5 0 01.5-.5h5zM9 1H5v1h4V1zM5 8h1v4H5V8zm3 0h1v4H8V8z"></path></svg></button>
                                                <Link to={'/catalog/product-' + favouritesCard.defaultArticle.code} className="catalog-product-card-top">
                                                    <div className="catalog-product-card-img">
                                                        <img src={favouritesCard.images[0].url} alt="" className="catalog-product-card-img-default" />
                                                        <img src={favouritesCard.defaultArticle.logoPicture[0].url} alt="" className="catalog-product-card-img-onhover" />
                                                    </div>
                                                </Link>
                                                <div className="catalog-product-card-bottom">
                                                    <div className="catalog-product-card-title sub-title">
                                                        <h1>{favouritesCard.name}</h1>
                                                    </div>
                                                    <div className="catalog-product-card-price info">
                                                        <p>{favouritesCard.whitePrice.formattedValue}</p>
                                                    </div>
                                                    <div className="catalog-product-card-colors">
                                                        {
                                                            favouritesCard.articleCodes ? (favouritesCard.articleCodes.map((articleCode, i) => (
                                                                <Link to={'/catalog/product-' + articleCode} className="catalog-product-card-links">
                                                                    <div style={{ backgroundColor: `${favouritesCard.rgbColors[i]}` }} className="catalog-product-card-link-color"></div>
                                                                </Link>
                                                            )))
                                                                :
                                                                null
                                                        }
                                                    </div>
                                                    <div className="catalog-product-card-categorie-title note">
                                                        <span>{favouritesCard.categoryName}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                            :
                            (
                                <div className="cart-products-list-empty content">
                                    <div className="cart-products-list-empty-title title">
                                        <h1>На данный момент корзина пуста</h1>
                                    </div>
                                    <div className="cart-products-list-empty-info info">
                                        <p>Хотите сохранить понравившиеся товары? Просто нажмите на значок в виде сердца на товаре, после чего этот товар появится здесь.</p>
                                    </div>
                                    <Link to="/catalog" className="cart-products-list-empty-button"><button className="button-first">Посмотреть сейчас</button></Link>
                                </div>
                            )
                    }
                </div>
            </div>
        </section>
    )
}

export default Cart;