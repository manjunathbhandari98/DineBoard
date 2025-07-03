import { Card } from "@mantine/core";
import { useEffect, useState } from "react";
import { useThemeContext } from "../app/ThemeProvider";
import { getHotelByUser, subscribePlan } from "../service/hotelService";
import { getAllPlans } from "../service/pricingService";
import { getProfileInfo } from "../service/userService";

const Pricing = () => {
  const { colorScheme } = useThemeContext();

  const [plans, setPlans] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [hotel, setHotel] = useState<any>(null);
  const [hotelId, setHotelId] = useState<string | null>(null);

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfileInfo();
        setUser(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  // Fetch hotel once user is available
  useEffect(() => {
    const fetchHotelId = async () => {
      if (user?.id) {
        try {
          const response = await getHotelByUser(user.id);
          setHotel(response)
          setHotelId(response?.id);
        } catch (error) {
          console.error("Error fetching hotel:", error);
        }
      }
    };
    fetchHotelId();
  }, [user]);

  // Fetch plans
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await getAllPlans();
        setPlans(response);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };
    fetchPlans();
  }, []);

  // Subscribe logic
  const handlePayment = async (planId: number) => {
    if (!hotelId) {
      alert("Hotel not found for this user.");
      return;
    }

    try {
      await subscribePlan(hotelId, planId);
      alert("Successfully subscribed to plan!");
    } catch (error) {
      console.error("Error subscribing to plan:", error);
      alert("Failed to subscribe to plan.");
    }
  };

  return (
    <section
      className=" py-20 px-4 md:px-12"
      id="pricing"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">
          Pricing
        </h2>
        <p className="text-gray-500">
          Choose the plan that suits your
          restaurant’s needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan: any) => (
          <Card
            key={plan.id}
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
              <h3
                className={`text-2xl font-semibold ${
                  colorScheme === "dark"
                    ? "text-gray-200"
                    : "text-gray-800"
                } `}
              >
                {plan.name}
              </h3>
              <p className="text-3xl font-bold text-[#f43f5e] mt-4">
                ₹{plan.price}
              </p>
              <p className="text-gray-500 mt-2 mb-6">
                {plan.description}
              </p>
              <ul className="mb-6 space-y-3">
                {plan.features.map(
                  (
                    feature: any,
                    index: number
                  ) => (
                    <li
                      key={index}
                      className={` ${
                        colorScheme === "dark"
                          ? "text-gray-300"
                          : "text-gray-700"
                      } flex items-start`}
                    >
                      <span className="text-[#f43f5e] mr-2">
                        ✔
                      </span>{" "}
                      {feature}
                    </li>
                  )
                )}
              </ul>

              {hotel?.planId === plan.id ? (
  <button
    disabled
    className="w-full py-3 rounded-xl font-semibold bg-green-500 text-white cursor-not-allowed opacity-80 flex items-center justify-center"
  >
    Subscribed
  </button>
) : (
  <button
    onClick={() => handlePayment(plan.id)}
    className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
      plan.highlighted
        ? "bg-[#f43f5e] text-white hover:bg-[#e11d48]"
        : "border text-[#f43f5e] border-[#f43f5e] hover:bg-[#f43f5e]/10"
    }`}
  >
    Upgrade – ₹{plan.price}
  </button>
)}

            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
