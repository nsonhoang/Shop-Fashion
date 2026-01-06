import React, { useState, useEffect, useCallback } from "react";
import {
  Camera,
  Users,
  Leaf,
  Clock,
  X,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import heroStory from "@/assets/hero-story.jpg";
import aboutWorkshop from "@/assets/about-workshop.jpg";
import valuesHero from "@/assets/hero-story.jpg";
// TEAM
import team1 from "@/assets/1.jpg";
import team2 from "@/assets/2.jpg";
import team3 from "@/assets/3.jpg";

// LOOKBOOK
import look1 from "@/assets/lookbook1.jpg";
import look2 from "@/assets/lookbook2.jpg";
import look3 from "@/assets/lookbook3.webp";
import look4 from "@/assets/lookbook4.jpg";



const mockTeam = [
  { id: 1, name: "Linh Nguyễn", role: "Founder & Creative Director", img: team1 },
  { id: 2, name: "Minh Trần", role: "Head of Production", img: team2 },
  { id: 3, name: "Hà Võ", role: "Design Lead", img: team3 },
];


const lookbook = [look1, look2, look3, look4];


export default function StoryPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  const openPreview = useCallback((i) => {
    setIndex(i);
    setLightboxOpen(true);
  }, []);

  const prev = useCallback(() => setIndex((i) => (i - 1 + lookbook.length) % lookbook.length), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % lookbook.length), []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      // friendly inline validation
      return alert("Vui lòng nhập email hợp lệ.");
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      localStorage.setItem("subscribed_email", email);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }, 800);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-white text-slate-900">
      {/* HERO */}
      <section
        className="relative overflow-hidden"
        aria-label="Hero - Brand Story"
      >
        <div
          className="absolute inset-0 bg-[url('/images/hero-story.jpg')] bg-cover bg-center blur-sm opacity-60 -z-10"
          aria-hidden
        />
        <div className="container mx-auto px-6 py-20">
          <div className="mx-auto max-w-5xl rounded-2xl bg-white/70 backdrop-blur-md p-8 shadow-xl border border-white/30">
            <div className="md:flex md:items-center md:gap-8">
              <div className="md:flex-1">
                <p className="text-sm font-medium uppercase tracking-wider text-slate-700">
                  Our Story
                </p>
                <h1 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight text-slate-900">
                  Thời trang bền vững — Phong cách xây dấu ấn
                </h1>
                <p className="mt-4 text-slate-700 text-lg">
                  Chúng tôi tin rằng áo quần không chỉ che thân mà còn kể chuyện.
                  Từ lựa chọn chất liệu đến từng mũi may, mọi thứ đều có tâm.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="/shop"
                    className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white shadow hover:opacity-95 transition"
                  >
                    Mua sắm bộ sưu tập
                  </a>
                  <a
                    href="#values"
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm text-slate-800 hover:bg-slate-50 transition"
                  >
                    Tìm hiểu giá trị
                  </a>
                </div>
              </div>

              <div className="mt-6 md:mt-0 md:w-80">
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={aboutWorkshop}
                    alt="Workshop"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center">
                    <Leaf className="h-6 w-6 text-green-600" />
                    <p className="text-xs text-slate-600 mt-2">Bền vững</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Clock className="h-6 w-6 text-slate-800" />
                    <p className="text-xs text-slate-600 mt-2">Chất lượng</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <Camera className="h-6 w-6 text-slate-800" />
                    <p className="text-xs text-slate-600 mt-2">Lookbook</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND + VALUES */}
      <section id="values" className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-2xl font-bold">Giá trị cốt lõi</h2>
            <p className="mt-3 text-slate-700">
              Chúng tôi cân bằng thẩm mỹ, độ bền và trách nhiệm xã hội trong
              từng sản phẩm. Mỗi mùa, chúng tôi nỗ lực cải thiện nguồn vật liệu
              và quy trình sản xuất.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="p-4 border rounded-2xl hover:shadow-lg transition">
                <h4 className="font-semibold">Sustainable</h4>
                <p className="mt-1 text-sm text-slate-600">Vật liệu thân thiện môi trường.</p>
              </div>
              <div className="p-4 border rounded-2xl hover:shadow-lg transition">
                <h4 className="font-semibold">Transparent</h4>
                <p className="mt-1 text-sm text-slate-600">Nguồn gốc rõ ràng, kiểm soát chất lượng.</p>
              </div>
              <div className="p-4 border rounded-2xl hover:shadow-lg transition">
                <h4 className="font-semibold">Design</h4>
                <p className="mt-1 text-sm text-slate-600">Tinh giản, dễ phối và dễ mặc.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img src={valuesHero} alt="Values" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container mx-auto px-6 py-8">
        <h3 className="text-xl font-semibold">Hành trình</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <div className="p-6 border rounded-2xl bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-accent/10 p-3">
                <Clock className="h-5 w-5 text-black" />
              </div>
              <div>
                <h4 className="font-medium">2018 — Khởi nguồn</h4>
                <p className="text-sm text-slate-600">Một xưởng nhỏ với khát vọng làm đồ bền vững.</p>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-2xl bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-accent/10 p-3">
                <Users className="h-5 w-5 text-black" />
              </div>
              <div>
                <h4 className="font-medium">2020 — Mở cửa hàng đầu tiên</h4>
                <p className="text-sm text-slate-600">Chạm tới nhiều khách hàng hơn, hoàn thiện chuỗi cung ứng.</p>
              </div>
            </div>
          </div>

          <div className="p-6 border rounded-2xl bg-white shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-accent/10 p-3">
                <Leaf className="h-5 w-5 text-black" />
              </div>
              <div>
                <h4 className="font-medium">2023 — Minh bạch & xanh hơn</h4>
                <p className="text-sm text-slate-600">Áp dụng vật liệu tái chế và báo cáo nguồn gốc.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="container mx-auto px-6 py-8">
        <h3 className="text-xl font-semibold">Đội ngũ</h3>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {mockTeam.map((m) => (
            <div key={m.id} className="group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 flex-shrink-0 rounded-full overflow-hidden border">
                  <img src={m.img} alt={m.name} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold">{m.name}</p>
                  <p className="text-sm text-slate-600">{m.role}</p>
                </div>
              </div>
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition absolute inset-x-4 bottom-4">
                <button className="w-full rounded-md border px-3 py-2 text-sm font-medium">View profile</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOOKBOOK / GALLERY */}
      <section className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Lookbook</h3>
          <a href="/shop" className="text-sm text-slate-700 hover:underline">Xem bộ sưu tập →</a>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {lookbook.map((src, i) => (
            <button
              key={src}
              onClick={() => openPreview(i)}
              className="overflow-hidden rounded-lg transform transition hover:scale-105"
              aria-label={`Open image ${i + 1}`}
            >
              <img src={src} alt={`Look ${i + 1}`} className="w-full h-36 object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* CTA + Newsletter */}
      <section className="container mx-auto px-6 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl border bg-gradient-to-r from-white via-slate-50 to-white p-8 shadow-lg">
          <div className="md:flex md:items-center md:justify-between md:gap-6">
            <div>
              <h4 className="text-lg font-bold">Sẵn sàng đổi mới tủ đồ?</h4>
              <p className="mt-1 text-sm text-slate-600">Nhận mã ưu đãi khi tham gia cộng đồng chúng tôi.</p>
            </div>

            <form onSubmit={handleSubscribe} className="mt-4 flex w-full gap-3 md:mt-0 md:w-auto">
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                className="min-w-0 flex-1 rounded-full border px-4 py-2 shadow-sm focus:outline-none"
                placeholder="you@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-4 py-2 text-white shadow hover:opacity-95"
                disabled={submitting}
              >
                {submitting ? "Đang gửi..." : "Đăng ký"}
              </button>
            </form>

            <div className="ml-4">
              {subscribed && (
                <div className="rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">Cảm ơn bạn! 🎉</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-2 top-2 z-20 rounded-full bg-white/90 p-2 shadow"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            <button
              onClick={prev}
              className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            <button
              onClick={next}
              className="absolute right-12 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="overflow-hidden rounded-lg bg-white p-2">
              <img
                src={lookbook[index]}
                alt={`Preview ${index + 1}`}
                className="w-full h-[70vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
