import React from 'react';
import Product from './Product';
import './product.css';

const initialBag: {
    image: string;
    name: string;
    model: string;
    description: string;
    price: string;
    sizes: string;
}[] = [
        {
            image:' ',
            name:'מוצר 1',
            model: 'wide',
            description: 'bla bla...',
            price: '₪ 69.90',
            sizes: 'one size',
        },
        {
            image: '',
            name: 'מוצר 2',
            model: 'porcelain',
            description: 'bla bla...',
            price: '₪ 129.90',
            sizes: 'few sizes',
        },
        {
            image: '',
            name: 'מוצר 3',
            model: 'porcelain',
            description: 'bla bla...',
            price: '₪ 499.90',
            sizes: 'few sizes',
        },
        {
            image: '',
            name: 'מוצר 4',
            model: 'ceramic',
            description: 'bla bla...',
            price: '₪ 249.90',
            sizes: 'few sizes',
        }
    ];

const Products: React.FC = () => {
    return (
        <div className='products_container'>
            {initialBag.map((product, index) => (
                <Product key={index} product={product} />
            ))}
        </div>
    );
};

export default Products;
