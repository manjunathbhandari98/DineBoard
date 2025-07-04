import {
  IconIcons,
  IconPrinter,
  IconProgressCheck,
  IconQrcode,
} from "@tabler/icons-react";

const HowItWorks = () => {
  const steps = [
    {
      title: "1. Design Your Menu",
      desc: "Choose from beautiful templates or upload your own. Customize fonts, layout, and branding.",
      icon: (
        <IconIcons className="w-15 h-15 mx-auto mb-6" />
      ),
    },
    {
      title: "2. Generate QR Code",
      desc: "Create a unique QR code that links to your digital menu. It's instant and automatic.",
      icon: (
        <IconQrcode className="w-15 h-15 mx-auto mb-6" />
      ),
    },
    {
      title: "3. Print or Share",
      desc: "Place your QR on table tents, posters, delivery bags, or windows. Anywhere customers can scan.",
      icon: (
        <IconPrinter className="w-15 h-15 mx-auto mb-6" />
      ),
    },
    {
      title: "4. Update Anytime",
      desc: "Need to change a price or item? Just log in and update. No need to reprint the QR code.",
      icon: (
        <IconProgressCheck className="w-15 h-15 mx-auto mb-6" />
      ),
    },
  ];

  return (
    <section className="py-20 px-4 md:px-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold  mb-4">
          How It Works
        </h2>
        <p className="max-w-xl mx-auto text-lg ">
          From design to deployment — get your
          contactless menu live in just minutes.
        </p>
      </div>

      <div className="grid gap-12 md:grid-cols-4 max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div
            key={index}
            className="text-center p-8 rounded-2xl shadow-lg  transition-transform hover:scale-105 hover:shadow-2xl"
          >
            {step.icon}
            <h3 className="text-2xl font-semibold text-[#f43f5e] mb-3">
              {step.title}
            </h3>
            <p className="text-md text-gray-600">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
