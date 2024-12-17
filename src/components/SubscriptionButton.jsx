import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const SubscriptionButton = ({ priceId, plan, interval, children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getAuthToken } = useAuth();

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      const token = getAuthToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            priceId,
            plan,
            interval,
          }),
        }
      );

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout session:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSubscribe}
      disabled
      // disabled={isLoading}
      className="w-full rounded-lg p-3 text-base uppercase text-white transition-colors bg-[--poppy] hover:bg-[--poppy-dark] disabled:opacity-50"
    >
      {isLoading ? "Processing..." : children}
    </button>
  );
};

export default SubscriptionButton;
