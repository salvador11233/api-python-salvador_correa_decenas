const products = [
  { name: "Mobile", image: "/images/mobile-img.png", price: 500, oldPrice: 1000 },
  { name: "Watch", image: "/images/watch-img.png", price: 500, oldPrice: 1000 },
  { name: "Camera", image: "/images/camera-img.png", price: 500, oldPrice: 1000 },
];

export default function Products() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold mb-8">Computers & Laptop</h1>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <div
              key={i}
              className="shadow-lg rounded-2xl overflow-hidden text-center hover:scale-105 transition-transform duration-200"
            >
              <h3 className="bg-gray-800 text-white py-3 text-xl font-medium">
                {p.name}
              </h3>
              <img src={p.image} alt={p.name} className="w-full h-64 object-contain p-4" />
              <div className="p-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded">
                  Add to Cart
                </button>
                <div className="mt-3 text-gray-700">
                  <h4 className="font-semibold">Samsung</h4>
                  <p>
                    <span className="text-green-600 font-bold">${p.price}</span>{" "}
                    <span className="line-through text-gray-400">${p.oldPrice}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
