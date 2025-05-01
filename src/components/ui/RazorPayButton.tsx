import { useEffect } from "react";
import { handlePayment } from "../../service/paymentService";

const RazorpayButton = ({
  amount,
  highlighted,
}: {
  amount: number;
  highlighted?: boolean;
}) => {
  const loadRazorpayScript = () => {
    const script =
      document.createElement("script");
    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  };

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  const initiatePayment = async () => {
    try {
      const order = await handlePayment(amount);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: "INR",
        name: "DineBoard",
        description: "Subscription Payment",
        order_id: order.id,
        handler: (response: any) => {
          alert("Payment Successful!");
        },
        prefill: {
          name: "Your Name",
          email: "email@example.com",
        },
        theme: {
          color: "#f43f5e",
        },
      };

      const rzp = new (window as any).Razorpay(
        options
      );
      rzp.open();
    } catch (err: any) {
      alert(
        err.message || "Payment initiation failed"
      );
    }
  };

  return (
    <button
      onClick={initiatePayment}
      className={`w-full py-3 rounded-xl cursor-pointer font-semibold transition-all mt-auto duration-200 ${
        highlighted
          ? "bg-[#f43f5e] text-white hover:bg-[#e11d48]"
          : "border border-[#f43f5e] text-[#f43f5e] hover:bg-[#f43f5e]/10"
      }`}
    >
      Pay ₹{amount}
    </button>
  );
};

export default RazorpayButton;
