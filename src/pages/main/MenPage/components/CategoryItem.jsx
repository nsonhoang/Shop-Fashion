import { Link } from "react-router-dom";

function CategoryItem({ title, link }) {
  return (
    <div className="py-2 px-4bg-white mx-2 ">
      <Link to={link} className="hover:text-red-500 font-medium text-gray-700">
        {title}
      </Link>
    </div>
  );
}

export default CategoryItem;
