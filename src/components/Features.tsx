export default function Features() {
  const items = [
    "🚚 Fast Delivery",
    "🇧🇩 All over Bangladesh",
    "✅ Quality Assured",
    "👕 Premium fabrics",
    "💵 Cash on Delivery",
    "📦 Pay when received",
    "🔥 Latest Trends",
    "📅 Updated weekly"
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 text-center">
      {items.map((item, i) => (
        <div key={i} className="border p-4 rounded">
          {item}
        </div>
      ))}
    </div>
  );
}