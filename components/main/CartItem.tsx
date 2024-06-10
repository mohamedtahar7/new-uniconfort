import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import { AiOutlinePlus } from "react-icons/ai";
import { HiMinus } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
interface CartItemProps {
  item: object;
}
const CartItem = ({ item }: CartItemProps) => {
  const { itemAmount, removeFromCart, increaseAmount, decreaseAmount } =
    useContext(CartContext);
  return (
    <div className="py-8 mb-4 px-6 border-y-[1.5px] border-[#e1e1e1]">
      <div className="flex items-center gap-8">
        <div>
          <div
            className="h-[160px] w-[160px] rounded-xl bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: `url(${item.images[0]})` }}
          />
        </div>
        <div className="w-[96rem]">
          <div className="flex items-center justify-between">
            <h4 className="text-xl text-[#11334f] font-medium ">{item.name}</h4>
            <CgClose
              onClick={() => {
                removeFromCart(item.id);
              }}
              size={25}
              className="text-[#11334f] cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-3 mt-6 py-1 px-2 border border-[#11334f] w-fit">
            <HiMinus
              onClick={() => decreaseAmount(item.id)}
              className="text-[#11334f] text-lg cursor-pointer"
            />
            <p className="text-[#11334f] text-lg">{item.amount}</p>
            <AiOutlinePlus
              onClick={() => increaseAmount(item.id)}
              className="text-[#11334f] text-lg cursor-pointer"
            />
          </div>
          <div className="flex flex-col gap-3 mt-3">
            <p className="text-md text-[#11334f]">
              <span className="text-lg text-[#11334f]">Prix Unitaire : </span>
              {item.price} DZD
            </p>
            <p className="text-md text-[#11334f]">
              <span className="text-lg text-[#11334f]">Total : </span>
              {item.price * item.amount}.00 DZD
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
