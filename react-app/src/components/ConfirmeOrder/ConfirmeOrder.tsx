import './ConfirmeOrder.css';

interface Order {
  _id: string;
//להוסיף עוד פרטי הזמנה הנחוצים
}
//כך מפעילים <ConfirmeOrder _id = {newOrder._id}/>
const ConfirmeOrder: React.FC<Order> = ({_id}) => {
  return (
    <div className='contain'>
      Order number:{_id} was successfully received.<br/>
      A purchase confirmation email will be sent to the email registered in the system
    </div>
  );
}

export default ConfirmeOrder