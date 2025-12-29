import React from "react";

// Mock data giả lập nội dung trong ảnh
const STORES = [
  {
    id: 1,
    city: "Seattle",
    name: "University Village",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    city: "San Francisco",
    name: "Valencia Street, San Francisco",
    image:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    city: "Palo Alto",
    name: "Stanford",
    image:
      "https://rawlooks.com/app/uploads/2021/02/the-dark-gallery-avantgarde-high-fashion-store-in-hanoi-vietnam.jpg",
  },
  {
    id: 4,
    city: "Los Angeles",
    name: "Abbot Kinney",
    image:
      "https://images.unsplash.com/photo-1580757468214-c73f7062a5cb?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    city: "Boston",
    name: "Seaport",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 6,
    city: "New York",
    name: "Prince Street, New York",
    image:
      "https://media.istockphoto.com/photos/interior-of-modern-fashion-shop-picture-id882059918?k=6&m=882059918&s=612x612&w=0&h=mLQHgdns_iMfZumda0KKv7RiNfGFtkJcfYqetyaM5u4=",
  },
  {
    id: 7,
    city: "Brooklyn",
    name: "Williamsburg",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: 8,
    city: "King of Prussia",
    name: "King of Prussia",
    image:
      "https://retaildesignblog.net/wp-content/uploads/2020/04/P1A2227-1-780x520.jpg",
  },
  {
    id: 9,
    city: "Georgetown",
    name: "Georgetown",
    image:
      "https://retaildesignblog.net/wp-content/uploads/2015/09/The-Fashion-Door-Flagship-Store-by-Bloom-Design-Guangzhou-China1.jpg",
  },
];

const StoreList = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {STORES.map((store) => (
          <div key={store.id} className="group cursor-pointer">
            {/* Wrapper Ảnh */}
            <div className="relative mb-4 overflow-hidden bg-gray-100 aspect-[4/3]">
              <img
                src={store.image}
                alt={store.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Thông tin Text */}
            <div className="flex flex-col items-start gap-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                {store.city}
              </span>
              <h3 className="text-base font-medium text-gray-900">
                {store.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoreList;
