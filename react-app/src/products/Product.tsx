import React from 'react';
import './product.css';

interface ProductProps {
    product: {
        image: string;
        name: string;
        model: string;
        description: string;
        price: string;  // השתמשתי במחרוזת כאן
        sizes: string;
    };
}

const Product: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className="single_product">
            <img src={product.image} alt={product.name} />
            <div className='product_details'>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
            </div>
        </div>
    );
};

export default Product;
