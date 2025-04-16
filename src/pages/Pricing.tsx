import { Button, Card } from "@mantine/core";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "₹499/month",
      description:
        "Perfect for small restaurants or cafes just getting started.",
      features: [
        "Up to 50 menu items",
        "Basic QR code generator",
        "Single outlet support",
        "Basic support",
      ],
      highlighted: false,
    },
    {
      name: "Professional",
      price: "₹999/month",
      description:
        "Ideal for growing restaurants with multiple menus.",
      features: [
        "Unlimited menu items",
        "Custom QR designs",
        "Multiple outlet support",
        "Analytics dashboard",
        "Priority support",
      ],
      highlighted: true,
    },
    {
      name: "Enterprise",
      price: "₹1999/month",
      description:
        "Designed for large chains or hotels with premium needs.",
      features: [
        "Everything in Pro plan",
        "White-label branding",
        "Dedicated account manager",
        "Advanced analytics & reports",
        "24/7 support",
      ],
      highlighted: false,
    },
  ];

  return (
    <section
      className="bg-white py-20 px-4 md:px-12"
      id="pricing"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Simple Pricing
        </h2>
        <p className="text-gray-500">
          Choose the plan that suits your
          restaurant’s needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <Card
            key={index}
            shadow="md" 
            padding="xl"
            radius="lg"
            className={`transition-all ${
              plan.highlighted
                ? "border-2 border-[#f43f5e] bg-gray-100 scale-105"
                : "border"
            }`}
          >
            <div className="flex flex-col h-full">
              <h3 className="text-2xl font-semibold text-gray-800">
                {plan.name}
              </h3>
              <p className="text-3xl font-bold text-[#f43f5e] mt-4">
                {plan.price}
              </p>
              <p className="text-gray-500 mt-2 mb-6">
                {plan.description}
              </p>
              <ul className="mb-6 space-y-3">
                {plan.features.map(
                  (feature, i) => (
                    <li
                      key={i}
                      className="text-gray-700 flex items-start"
                    >
                      <span className="text-[#f43f5e] mr-2">
                        ✔
                      </span>{" "}
                      {feature}
                    </li>
                  )
                )}
              </ul>
              <Button
                fullWidth
                radius="xl"
                size="md"
                variant={
                  plan.highlighted
                    ? "filled"
                    : "outline"
                }
                className="mt-auto"
              >
                {plan.highlighted
                  ? "Get Started"
                  : "Choose Plan"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
