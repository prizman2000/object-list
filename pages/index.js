import {useState, useEffect} from 'react';
import Head from "next/head";
import {BasicObject} from "../components/basicObject";
import ReactPaginate from 'react-paginate';
import Router, { withRouter } from 'next/router';
import Loader from "../components/loader";

const Index = (props) => {
    const [isLoading, setLoading] = useState(false);
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    useEffect(() => {
       Router.events.on('routeChangeStart', startLoading);
       Router.events.on('routeChangeComplete', stopLoading);

       return () => {
           Router.events.off('routeChangeStart', startLoading);
           Router.events.off('routeChangeComplete', stopLoading);
       }
    }, []);

    const pagginationHandler = (page) => {
        const currentPath = props.router.pathname;
        const currentQuery = props.router.query;
        currentQuery.page = page.selected + 1;
        props.router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    }

    let content = null;
    if (isLoading)
        content = <Loader/>;
    else {
        content = (
            <div className='obj-content'>
                {props.posts.map(post => {
                    return <BasicObject props={post}/>
                })}
            </div>
        );
    }

    return (
        <div>
            <Head>
                <title>Список объектов</title>
            </Head>
            <div className='content'>
                {content}
            </div>

            <div className='pagination-container'>
                <ReactPaginate
                    previousLabel={'Назад'}
                    nextLabel={'Далее'}
                    breakLabel={'...'}
                    containerClassName={"pagination"}
                    previousLinkClassName={"pagination__link"}
                    nextLinkClassName={"pagination__link"}

                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"pagination__link--active"}

                    initialPage={props.currentPage - 1}
                    pageCount={props.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={pagginationHandler}
                />
            </div>
        </div>
    )
}

Index.getInitialProps = async ({ query }) => {
    const page = query.page || 1;
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${page}`);
    const posts = await res.json();

    return {
        totalCount: posts.length,
        pageCount: 20,
        currentPage: page,
        perPage: 5,
        posts: posts,
    };
}

export default withRouter(Index);