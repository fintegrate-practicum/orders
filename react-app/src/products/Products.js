import Product from './Product'

const initialBag = [
    {
        image: '/dress.jpg',
        name: 'שמלת בנות חגיגית',
        model: 'blue flowers',
        description: 'bla bla...',
        price: 125.90,
        size: 4,
        amount: 1
    },
    {
        image: '/shirt.jpg',
        name: 'boys shirt',
        model: 'blue flowers',
        description: 'bla bla...',
        price: 75,
        size: 6,
        amount: 2
    },
    {
        image: '/snickers.jpg',
        name: 'snickers',
        model: 'red',
        description: 'bla bla...',
        price: 89.90,
        size: 28,
        amount: 1
    }
]

const Products = () => {
    return <div>
        {initialBag.map ((product) =>(
            <Product product = {product} />
        ))}
        this is products component
    </div>
}

export default Products