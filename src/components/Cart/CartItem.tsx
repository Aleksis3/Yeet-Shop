export interface ICartItemProps {
  id: string;
  title: string;
  description?: string;
  img?: string;
  price: number;
}

function CartItem(props: ICartItemProps) {
  return (
    <div key={props.id}>
      <p>{props.title}</p>
      <p>{props.price} PLN</p>
    </div>
  );
}

export default CartItem;
