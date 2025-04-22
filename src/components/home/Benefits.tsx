import Button from "../ui/Button";

const benefits = [
  {
    icon: "📱",
    title: "Mobile Friendly",
    description:
      "Works smoothly across all smartphones and devices — no app download required.",
  },
  {
    icon: "🧼",
    title: "Contactless & Safe",
    description:
      "Touchless menus enhance safety and hygiene — ideal in post-pandemic dining.",
  },
  {
    icon: "⚙️",
    title: "Instant Edits",
    description:
      "Update your menu on-the-fly without reprinting or redesigning.",
  },
  {
    icon: "📊",
    title: "Customer Insights",
    description:
      "Track which items are viewed the most and make smarter business decisions.",
  },
  {
    icon: "♻️",
    title: "Eco-Conscious",
    description:
      "Eliminates paper menus, supporting sustainable practices for your business.",
  },
  {
    icon: "🌐",
    title: "Language Friendly",
    description:
      "Support for multiple languages so your customers feel right at home.",
  },
];

const Benefits = () => {
  return (
    <div className=" px-6 py-16 font-sans">
      {/* Header */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 ">
        Benefits of Using QR Code Menus
      </h1>
      <p className="text-center  max-w-2xl mx-auto mb-12 text-base">
        Just like WhatsApp keeps messaging simple
        and seamless, QR menus simplify the dining
        experience — for guests and staff alike.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className=" rounded-2xl p-6 shadow-md transition-all hover:shadow-lg border border-[#263D43]"
          >
            <div className="text-4xl mb-4 text-[#25D366]">
              {benefit.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2 ">
              {benefit.title}
            </h3>
            <p className=" text-sm leading-relaxed">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-2 ">
          Switch to Smart Dining
        </h2>
        <p className=" mb-6 text-sm">
          Offer your customers the WhatsApp-like
          ease of QR code menus.
        </p>
        <Button
          radius="xl"
          className=" font-medium over:scale-105 transition-all duration-300"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Benefits;
