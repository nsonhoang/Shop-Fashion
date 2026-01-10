import { Button } from "@/components/ui/button";
import { Trash2, Upload } from "lucide-react";

export default function ImageGrid({ images, onChange }) {

  const handleUpload = (file) => {
    const url = URL.createObjectURL(file);

    onChange([
      ...images,
      { id: Date.now().toString(), url },
    ]);
  };

  const deleteImage = (id) => {
    onChange(images.filter(img => img.id !== id));
  };

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Images</h3>

        <label className="flex items-center gap-2 cursor-pointer text-sm text-primary">
          <Upload className="w-4 h-4" />
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => handleUpload(e.target.files[0])}
          />
        </label>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {images.map(img => (
          <div key={img.id} className="relative border rounded overflow-hidden group">
            <img
              src={img.url}
              className="w-full h-32 object-cover"
            />

            <button
              onClick={() => deleteImage(img.id)}
              className="absolute top-2 right-2 bg-white p-1 rounded shadow hidden group-hover:block"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
