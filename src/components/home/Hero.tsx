import { Button } from "@mantine/core";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-0">
      {/* Top Section with Wave */}
      <div className="relative z-10 pb-32 pt-16 px-4 md:px-16 ">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-100">
            <span className="text-gray-400">
              Create.{" "}
            </span>
            <span className="text-gray-500">
              Update.{" "}
            </span>
            <span className="text-gray-600">
              Serve.{" "}
            </span>
            <br />
            <span className="text-gray-900 font-light">
              – All in a Tap –
            </span>
            <br />
          </h2>

          <div className="mt-8">
            <Button
              size="lg"
              radius="xl"
              className="font-medium"
            >
              Book Now →
            </Button>
          </div>
        </div>
      </div>

      {/* Background Image under the wave */}
      <div className="relative -mt-40 z-0">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=1600&q=80"
          alt="Gourmet dish"
          className="w-full object-cover max-h-[600px] block"
        />
        <div className="absolute -top-5 left-0 w-full overflow-hidden line-height-0 transform rotate-180">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
          >
            <path
              fill="white"
              fill-opacity="1"
              d="M0,160L15,160C30,160,60,160,90,170.7C120,181,150,203,180,186.7C210,171,240,117,270,117.3C300,117,330,171,360,202.7C390,235,420,245,450,245.3C480,245,510,235,540,218.7C570,203,600,181,630,154.7C660,128,690,96,720,90.7C750,85,780,107,810,112C840,117,870,107,900,96C930,85,960,75,990,85.3C1020,96,1050,128,1080,117.3C1110,107,1140,53,1170,26.7C1200,0,1230,0,1260,26.7C1290,53,1320,107,1350,117.3C1380,128,1410,96,1425,80L1440,64L1440,320L1425,320C1410,320,1380,320,1350,320C1320,320,1290,320,1260,320C1230,320,1200,320,1170,320C1140,320,1110,320,1080,320C1050,320,1020,320,990,320C960,320,930,320,900,320C870,320,840,320,810,320C780,320,750,320,720,320C690,320,660,320,630,320C600,320,570,320,540,320C510,320,480,320,450,320C420,320,390,320,360,320C330,320,300,320,270,320C240,320,210,320,180,320C150,320,120,320,90,320C60,320,30,320,15,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
