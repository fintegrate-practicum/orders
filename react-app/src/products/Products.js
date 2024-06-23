import Product from './Product'

const initialBag = [
    // הפכתי את המחיר למחרוזת כדי שאוכל להכניס טווח מחירים, כמובן שבבחירת מוצר בודד והוספתו לסל המחיר יהיה מספרי ולא מחרוזתי
    {
        image: '/dress.jpg',
        name: 'שמלת בנות חגיגית',
        model: 'blue flowers',
        description: 'bla bla...',
        price: '₪ 125.90',
        sizes: '2-20',
    },
    {
        image: '/shirt.jpg',
        name: 'חולצת בנים בהירה',
        model: 'blue flowers',
        description: 'bla bla...',
        price: '₪ 74.90',
        sizes: '6-18',
    },
    {
        image: '/snickers.jpg',
        name: 'סניקרס',
        model: 'red',
        description: 'bla bla...',
        price: '₪ 89.90',
        sizes: '35-41',
    },
    {
        image: '/baby_set_1.png',
        name: 'סט בייבי במארז - ורוד',
        model: 'leaves',
        description: 'bla bla...',
        price: '₪ 109.90',
        sizes: 'new born - 3-6',
    },
    {
        image: '/baby_set_2.png',
        name: 'סט בייבי במארז - לבן',
        model: 'leaves',
        description: 'bla bla...',
        price: '₪ 109.90',
        sizes: 'new born - 3-6',
    },
    {
        image: '/short socks.png',
        name: 'גרבי תחרה תינוקות',
        model: 'elegant',
        description: 'bla bla...',
        price: '₪ 39.90',
        sizes: '0-6 - 24-30',
    },
    {
        image: '/bright_towels.png',
        name: 'מגבות כותנה בהירות',
        model: 'cotton',
        description: 'bla bla...',
        price: '₪ 34.90 - ₪ 159.90',
        sizes: '40X70 - 100X140',
    },
    {
        image: '/striped_towels.png',
        name: 'מגבות כותנה פסים',
        model: 'cotton',
        description: 'bla bla...',
        price: '₪ 34.90 - ₪ 159.90',
        sizes: '40X70 - 100X140',
    },
    {
        image: '/towels_gift.png',
        name: 'מגבות באריזת מתנה',
        model: 'gift',
        description: 'bla bla...',
        price: '₪ 89.90',
        sizes: '50X90 - 70X130',
    },
    {
        image: '/special_towels.png',
        name: 'מגבות כותנה מיוחדות',
        model: 'elegant',
        description: 'bla bla...',
        price: '₪ 49.90 - ₪ 199.90',
        sizes: '40X70 - 100X140',
    },
    {
        image: '/high_heels.png',
        name: 'נעלי עקב בהירות',
        model: 'white',
        description: 'bla bla...',
        price: '₪ 200.00',
        sizes: '36 - 41',
    },
    {
        image: '/hangers.png',
        name: 'שישיית קולבי עץ',
        model: 'wide',
        description: 'bla bla...',
        price: '₪ 69.90',
        sizes: 'one size',
    },
    {
        image: '/porcelain_set.png',
        name: 'מערכת כלים פורצלן',
        model: 'porcelain',
        description: 'bla bla...',
        price: '₪ 599.90',
        sizes: 'few sizes',
    },
    {
        image: '/salt_water.png',
        name: 'סט מלחיות פורצלן',
        model: 'porcelain',
        description: 'bla bla...',
        price: '₪ 49.90',
        sizes: '10X15',
    }

]

const Products = () => {
    return <div>
        {initialBag.map((product) => (
            <Product product={product} />
        ))}
        this is products component
    </div>
}

export default Products