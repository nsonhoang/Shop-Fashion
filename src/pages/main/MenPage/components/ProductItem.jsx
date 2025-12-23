import { formatMoney } from "../../../utils/formatMoney";

function ProductItem({ image, name, price, color }) {
  return (
    <div className="">
      <img src={image} alt="" className="w-71 h-105 object-cover mb-4" />
      <div className="flex flex-row justify-between text-sm  ">
        <h3 className="">{name}</h3>
        <p className="text-gray-600 ">{formatMoney(price)}</p>
      </div>
      <p className="font-thin text-sm">{color}</p>
    </div>
  );
}

export default ProductItem;
