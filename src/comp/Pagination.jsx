const Pagination = (props) => {
    const pageLinks = []

    for(let i = 0; i < props.pages; i++) {
        let active = props.currentPage === i ? 'active' : ''

        pageLinks.push(<li className={`catalog-products-pagination-link ${active}`} key={i} onClick={() => props.nextPage(i)}><button>{i + 1}</button></li>)
    }

    return (
        <ol className="catalog-products-pagination-links">
            { pageLinks }
        </ol>
    )
}

export default Pagination;