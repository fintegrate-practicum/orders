
const Product = (props) =>{

    return <div className="product-container">
         <img src = {props.product.image} alt = {props.name}/>
         <h3> {props.product.name} </h3>
         <p>  {props.product.price}  </p>
       
        this is single product component
    </div>
}

export default Product