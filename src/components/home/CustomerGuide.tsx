const steps = [
  {
    step: "1",
    title: "Scan the QR Code",
    description:
      "Customers use their phone’s camera to scan the QR code placed on the table or counter.",
  },
  {
    step: "2",
    title: "View the Digital Menu",
    description:
      "The browser automatically opens a mobile-friendly menu. No app install required.",
  },
  {
    step: "3",
    title: "Browse & Explore Items",
    description:
      "They explore the food & drink items with descriptions, images, and pricing.",
  },
  {
    step: "4",
    title: "Place Order or Call Staff",
    description:
      "Depending on the setup, customers either place the order or notify the staff.",
  },
];

const CustomerGuide = () => {
  return (
    <section className="bg-white min-h-screen text-gray-800 px-6 py-20 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-16">
        {/* Left Content */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 ">
            How Customers Use the Menu
          </h2>
          <p className="text-gray-600 mb-8 text-base">
            It’s quick, seamless, and hygienic.
            Here’s how your customers interact
            with your digital QR menu:
          </p>

          <div className="space-y-6">
            {steps.map(
              ({ step, title, description }) => (
                <div
                  key={step}
                  className="flex items-start gap-4"
                >
                  <div className="w-10 h-10 flex items-center justify-center text-lg font-bold text-white bg-[#f43f5e] rounded-full shadow-md">
                    {step}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">
                      {title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {description}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right Image Placeholder */}
        <div className="flex-1 w-full h-80 bg-gray-100 rounded-2xl shadow-inner flex items-center justify-center">
          {/* Replace with your actual image */}
          <span className="text-gray-400 text-sm">
            <img src="/banner-1.jpeg" alt="" className="rounded-xl"/>
          </span>
        </div>
      </div>
    </section>
  );
};

export default CustomerGuide;
