import { useEffect, useReducer, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true};
        case 'FETCH_SUCCESS':
            return {...state, loading: false, products: action.payload};
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}

const HomeScreen = () => {
    // const [products, setProducts] = useState([]);
    const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {loading: true, error: '', products: []});

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'});

            try {
                const result = await axios.get('/api/products');
                dispatch({type: 'FETCH_SUCCESS', payload: result.data});
            } catch (err) {
                dispatch({type: 'FETCH_FAIL', payload: err});
            }
        }

        fetchData()
    }, []);

    return (
        <div>
            <h1>Featured Products</h1>
            <div className='products'>
                { loading ? <div>Loading...</div>
                : error ? <div>{error.message}</div>
                : products.map(product => (
                <div key={product.slug} className='product'>
                    <Link to={`/product/${product.slug}`}>
                    <img src={product.image} alt={product.name} />
                    </Link>
                    <div className='product-info'>
                    <Link to={`/product/${product.slug}`}>
                        <p>
                        {product.name}
                        </p>
                    </Link>
                    <p>
                        <strong>${product.price}</strong>
                    </p>
                    </div>
                </div>
                ))}
            </div>
        </div>
    );
}

export default HomeScreen;