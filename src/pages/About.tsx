import { IconBolt, IconLanguageHiragana, IconMap, IconPhone, IconQrcode } from "@tabler/icons-react";


const About = () => {
  return (
    <section className="bg-gradient-to-br from-[#fdfbfb] to-[#ebedee] py-20 px-4 md:px-16 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-6">
          About Us
        </h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          We're building the future of restaurant
          menus — QR-powered, beautifully
          designed, and effortlessly managed.
        </p>

        {/* Mission and Why Us */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">
              🚀 Our Mission
            </h2>
            <p className="text-gray-700 leading-10">
              To empower every food business with
              cutting-edge, accessible, and
              reliable digital menu technology. We
              believe in blending simplicity with
              performance — making digital menus a
              joy for both restaurant owners and
              their guests.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-2xl font-semibold mb-4 text-red-500">
             Why Choose Us?
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <IconQrcode className="text-red-400 mt-1" />
                <span>
                  Instant QR code generation for
                  menus
                </span>
              </li>
              <li className="flex items-start gap-3">
                <IconBolt className="text-yellow-400 mt-1" />
                <span>
                  Live updates without page reload
                </span>
              </li>
              <li className="flex items-start gap-3">
                <IconLanguageHiragana className="text-blue-400 mt-1" />
                <span>
                  Multi-language support across
                  India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <IconPhone className="text-green-500 mt-1" />
                <span>
                  Fully mobile-optimized and
                  responsive
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to go digital?
          </h2>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Join hundreds of modern restaurants
            embracing the digital menu revolution.
            Try our platform today — it's fast,
            beautiful, and made for India.
          </p>
          <a
            href="/demo"
            className="inline-block bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-200"
          >
            Try the Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
