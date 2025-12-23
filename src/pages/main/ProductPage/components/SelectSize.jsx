function SelectSize({ sizeOptions, selectSize, setSelectSize }) {
  return (
    <div className=" ">
      <div className="size-title flex flex-row mb-2 ">
        <span className="font-medium">Kích cỡ</span>
      </div>
      {/* nút chọn */}
      <div className="gap-2">
        <div className="flex flex-row gap-3 ">
          {sizeOptions.map((size) => (
            <button
              key={size}
              className={`bg-gray-200 p-2 size-12 text-center text-xs ${
                selectSize === size ? "border-2 border-black" : ""
              }`}
              onClick={() => setSelectSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectSize;
