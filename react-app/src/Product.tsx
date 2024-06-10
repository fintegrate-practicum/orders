import React from "react";
import { isTryStatement } from "typescript";
import RecipeReviewCard from './Card';
const Product = () => {
    const allProduct = [{
        name: "pen",
        price: 20,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s",
        describe: "blue pen",
        imgArr: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaSy_55XqurgRu6Qln0zpaO65HMUSCTG5v9g&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1i0RahlcgAcsddxxFCMRdMEYT1LqPitcoiw&s"],
        model: "q1",
        color:["red","blue","green"],
        size: ["small","medume","large"]
    },
    {
        name: "pen",
        price: 5,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s",
        describe: "blue pen",
        imgArr: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaSy_55XqurgRu6Qln0zpaO65HMUSCTG5v9g&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1i0RahlcgAcsddxxFCMRdMEYT1LqPitcoiw&s"],
        model: "q1",
        color:["red","blue","green"],
        size:["small","medume","large"]
    },
    {
        name: "pen",
        price: 5,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s",
        describe: "blue pen",
        imgArr: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaSy_55XqurgRu6Qln0zpaO65HMUSCTG5v9g&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1i0RahlcgAcsddxxFCMRdMEYT1LqPitcoiw&s"],
        model: "q1",
        color:["red","blue","green"],
        size:["small","medume","large"]
    },{
        name: "pen",
        price: 5,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s",
        describe: "blue pen",
        imgArr: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaSy_55XqurgRu6Qln0zpaO65HMUSCTG5v9g&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1i0RahlcgAcsddxxFCMRdMEYT1LqPitcoiw&s"],
        model: "q1",
        color:["red","blue","green"],
        size:["small","medume","large"]
    },{
        name: "pen",
        price: 5,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s",
        describe: "blue pen",
        imgArr: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaSy_55XqurgRu6Qln0zpaO65HMUSCTG5v9g&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1i0RahlcgAcsddxxFCMRdMEYT1LqPitcoiw&s"],
        model: "q1",
        color:["red","blue","green"],
        size:["small","medume","large"]
    },{
        name: "pen",
        price: 5,
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s",
        describe: "blue pen",
        imgArr: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS17QbpYxEtfj5pfQPDLNkziWyvQ4B9h1Rvlg&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaSy_55XqurgRu6Qln0zpaO65HMUSCTG5v9g&s","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1i0RahlcgAcsddxxFCMRdMEYT1LqPitcoiw&s"],
        model: "q1",
        color:["red","blue","green"],
        size:["small","medume","large"]
    }]

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


   

