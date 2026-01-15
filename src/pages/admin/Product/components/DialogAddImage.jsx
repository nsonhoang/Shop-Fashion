import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Import Tabs
import { Upload, X, Link as LinkIcon, Loader2 } from "lucide-react";

export default function DialogAddImage({ open, onOpenChange, onSubmit }) {
  const [activeTab, setActiveTab] = useState("upload"); // 'upload' | 'url'

  const [file, setFile] = useState(null);
  const [urlInput, setUrlInput] = useState("");

  const [preview, setPreview] = useState(null);

  const [isThumbnail, setIsThumbnail] = useState(false);
  const [color, setColor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileInputRef = useRef(null);

  // Reset form khi đóng/mở dialog
  useEffect(() => {
    if (!open) {
      setFile(null);
      setUrlInput("");
      setPreview(null);

      setIsThumbnail(false);
      setActiveTab("upload"); // Reset về tab mặc định
    }
  }, [open]);

  // Xử lý khi chọn FILE
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      // Xóa url nếu đang chọn file để tránh nhầm lẫn
      setUrlInput("");
    }
  };

  // Xử lý khi nhập URL
  const handleUrlChange = (e) => {
    const value = e.target.value;
    setUrlInput(value);
    setFile(null); // Xóa file nếu đang nhập url
    setPreview(value); // Preview chính là link vừa nhập
  };

  const handleRemoveImage = () => {
    setFile(null);
    setUrlInput("");
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async () => {
    // Validate: Phải có file HOẶC có url
    if (activeTab === "upload" && !file) return;
    if (activeTab === "url" && !urlInput.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        mode: activeTab, // Gửi thêm cái này để cha biết đường xử lý
        file: file,
        image_url: urlInput,
        color: color,
        // display_order: Number(displayOrder),khong can danh index trong database
        is_thumbnail: isThumbnail,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Lỗi submit ảnh:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Thêm hình ảnh sản phẩm</DialogTitle>
          <DialogDescription>
            Tải ảnh từ máy tính hoặc sử dụng đường dẫn ảnh có sẵn.
          </DialogDescription>
        </DialogHeader>

        {/* TABS CHUYỂN ĐỔI */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="upload">Tải ảnh lên</TabsTrigger>
            <TabsTrigger value="url">Dùng đường dẫn (URL)</TabsTrigger>
          </TabsList>

          {/* TAB 1: UPLOAD FILE */}
          <TabsContent value="upload" className="space-y-4">
            <div
              className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-50 transition-colors ${
                preview && activeTab === "upload"
                  ? "border-primary"
                  : "border-slate-300"
              }`}
              onClick={() => !preview && fileInputRef.current?.click()}
            >
              {preview && activeTab === "upload" ? (
                <div className="relative w-full h-full">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain rounded-lg p-1"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveImage();
                    }}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-3 text-slate-400" />
                  <p className="mb-2 text-sm text-slate-500">
                    <span className="font-semibold">Click để tải ảnh</span>
                  </p>
                  <p className="text-xs text-slate-500">
                    PNG, JPG, WEBP (Max 5MB)
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </div>
          </TabsContent>

          {/* TAB 2: NHẬP URL */}
          <TabsContent value="url" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url">Đường dẫn hình ảnh</Label>
              <div className="flex gap-2">
                <Input
                  id="url"
                  placeholder="https://example.com/image.png"
                  value={urlInput}
                  onChange={handleUrlChange}
                />
              </div>
            </div>

            {/* Preview cho URL */}
            {preview && activeTab === "url" && (
              <div className="relative w-full h-48 border rounded-lg overflow-hidden bg-slate-50">
                {/* Dùng onError để check link chết */}
                <img
                  src={preview}
                  alt="Preview URL"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x300?text=Lỗi+Ảnh"; // Ảnh thay thế nếu link lỗi
                  }}
                />
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* CÁC TRƯỜNG CHUNG (ORDER, THUMBNAIL) */}
        <div className="grid gap-4 py-4 border-t mt-4">
          {/* không cần trong database tự đánh dấu */}
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="order" className="text-right">
              Thứ tự
            </Label>
            <Input
              id="order"                                   

              type="number"
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
              className="col-span-3"
            />
          </div> */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="color" className="text-right">
              Màu sắc
            </Label>
            <Input
              id="color"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Tùy chọn</Label>
            <div className="flex items-center space-x-2 col-span-3">
              <Checkbox
                id="thumbnail"
                checked={isThumbnail}
                onCheckedChange={setIsThumbnail}
              />
              <Label
                htmlFor="thumbnail"
                className="text-sm font-normal cursor-pointer"
              >
                Đặt làm ảnh đại diện
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={(!file && !urlInput) || isSubmitting}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Lưu hình ảnh
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
