function SelectColor({ selectColor, setSelectColor, colorOptions }) {
  return (
    <div className="">
      <div className="color-title flex flex-row mb-2">
        <span className="font-medium">Màu sắc</span>
        <span className="font-light text-gray-500 ml-2">{selectColor}</span>
      </div>
      {/* nút chọn */}
      <div className="">
        <div className="flex flex-row gap-3">
          {colorOptions.map((color) => (
            <button
              key={color}
              onClick={() => setSelectColor(color)}
              className={`border rounded-md py-1 px-2 text-sm font-medium ${
                selectColor === color
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-700"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SelectColor;
