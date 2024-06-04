
import OneOrder from "./oneOrder";
const OrderList = () => {
    const allOrders = [{
        numOrder: 123, user: { name: "moshe", id: 123 }, prod: ["pen", "pencial"], status: false, address: { city: "beney brak", street: "akive", numBulding: 10 },
        date: new Date()
    }];
    return (
        <>
            <h1>all orders</h1>
            {allOrders.map((item) => {
                return (
                    <OneOrder
                        order={{
                            numOrder: item.numOrder,
                            user: {
                                name: item.user.name,
                                id: item.user.id
                            },
                            prod: item.prod,
                            status: item.status,
                            address: {
                                city: item.address.city,
                                street: item.address.street,
                                numOfBulding: item.address.numBulding
                            },
                            date: item.date
                        }}
                    />
                );
            })}
        </>
    );
}
export default OrderList;





