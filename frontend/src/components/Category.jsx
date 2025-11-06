export default function Category() {
  const items = [
    "Man's Fashion",
    "Woman Fashion",
    "Beauty",
    "Mobiles",
    "Computers",
    "Watches",
    "Kitchen",
    "Sports",
  ];

  return (
    <section className="bg-gray-100 py-10">
      <div className="container mx-auto flex flex-wrap justify-between items-center px-6">
        <h2 className="text-2xl font-semibold text-gray-800">Category</h2>
        <ul className="flex flex-wrap gap-4 text-gray-600 text-sm">
          {items.map((item, idx) => (
            <li key={idx}>
              <a href="#" className="hover:text-yellow-600">
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
