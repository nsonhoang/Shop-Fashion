// phải truyển prop là hinh ảnh và tiêu đề  và link vào đây
function CategoryImageItem({ imageSrc, title, link }) {
  return (
    <div className="flex flex-col items-center">
      <a href={link}>
        <img src={imageSrc} alt={title} className="h-66 w-53 object-cover" />
        <div className="text-center underline mt-2">{title}</div>
      </a>
    </div>
  );
}

export default CategoryImageItem;
