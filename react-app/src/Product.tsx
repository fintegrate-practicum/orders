import React from "react";
import { isTryStatement } from "typescript";
import RecipeReviewCard from './Card';
import dataObject from "./Deatails";
interface dataObject{
    name: string,
    price: number,
    img: string,
    describe: string,
    imgArr: string[],
    model: string,
    color: string[],
    size: string[]
}
const Product = () => {

   const allProduct= dataObject;

    return ( 
        <>
         <h1>all product</h1>
            {allProduct.map((item) => {
                return (
                    <>
                    <RecipeReviewCard 
                        prod={{
                            name: item.name,
                            price: item.price,
                            img: item.img,
                            describe: item.describe,
                            imgArr: item.imgArr,
                            model: item.model,
                            color: item.color,
                            size: item.size

                           
                        }}
                    /></> );              
            })}

        </>
     );
}
 
export default Product;


   

