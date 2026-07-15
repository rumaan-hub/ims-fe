"use client"

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Stepper } from "@/components/ui/Stepper";
import { CreditCard, Package, Receipt, Crown } from "lucide-react";

import Navbar from "@/globalComponents/navbar/Navbar";
import PlanSummaryCard from "@/globalComponents/cards/PlanSummaryCard";
import LicenseStep from "@/globalComponents/steppersSteps/LicenseStep";
import BillingStep from "@/globalComponents/steppersSteps/BillingStep";
import ShippingStep from "@/globalComponents/steppersSteps/ShippingStep";
import ReviewOrderStep from "@/globalComponents/steppersSteps/ReviewOrderStep";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

const steps = [
  { title: "License", icon: <CreditCard className="w-5 h-5" /> },
  { title: "Shipping", icon: <Package className="w-5 h-5" /> },
  { title: "Billing", icon: <Receipt className="w-5 h-5" /> },
  { title: "Review Order", icon: <Crown className="w-5 h-5" /> },
]

interface SubscriptionData {
  client_id: string;
  subscription_plan_id: string;
  start_date: string;
  final_amount: number;
  discount_percentage: number;
  billing_cycle: string;
  plan: {
    plan_name: string;
    price: number;
    features: string[];
    user_limit: number;
  };
  client: {
    first_name: string;
    last_name: string;
    email: string;
    company_name: string;
  };
}

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
  const [paymentMethodId, setPaymentMethodId] = useState<string | undefined>();

  useEffect(() => {
    if (!token) {
      setError("Invalid checkout link");
      setLoading(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await fetch(`${API_BASE}/ims-subscription/verify-token/${token}`);
        if (!res.ok) {
          throw new Error("invalid");
        }
        const data = await res.json();
        setSubscriptionData(data);
      } catch {
        setError("This link has expired or is invalid. Please contact your administrator.");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mx-auto" />
            <p className="mt-4 text-gray-500 text-sm">Verifying your checkout link...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Checkout Unavailable</h2>
            <p className="text-gray-500 text-sm">{error}</p>
          </div>
        </div>
      </>
    );
  }

  const StepContent = ({ step }: { step: number }) => {
    switch (step) {
      case 0:
        return <LicenseStep token={token!} onNext={() => setCurrentStep(1)} />
      case 1:
        return <ShippingStep token={token!} onNext={() => setCurrentStep(2)} onBack={() => setCurrentStep(0)} />
      case 2:
        return <BillingStep token={token!} onNext={(pmId) => { setPaymentMethodId(pmId); setCurrentStep(3); }} onBack={() => setCurrentStep(1)} />
      case 3:
        return <ReviewOrderStep token={token!} paymentMethodId={paymentMethodId} onBack={() => setCurrentStep(2)} />
      default:
        return <div>Invalid step</div>
    }
  }

  return (
    <>
      <Navbar />
      <div className="xl:px-24 lg:px-16 md:px-6 px-4 py-10">
        <div className="w-full mx-auto">
          <Stepper steps={steps} currentStep={currentStep} onStepChange={setCurrentStep} />
          <div className="flex max-[850px]:flex-col lg:gap-8 gap-4 mt-10">
            <div className="p-4 md:p-6 border rounded-lg flex-1">
              <StepContent step={currentStep} />
            </div>
            <div className="w-[290px] max-[850px]:w-full">
              <PlanSummaryCard
                planName={subscriptionData?.plan?.plan_name}
                billingCycle={subscriptionData?.billing_cycle}
                finalAmount={subscriptionData?.final_amount}
                discountPercentage={subscriptionData?.discount_percentage}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CheckoutFallback = () => (
  <>
    <Navbar />
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-green-500 rounded-full animate-spin mx-auto" />
        <p className="mt-4 text-gray-500 text-sm">Loading checkout...</p>
      </div>
    </div>
  </>
);

const CheckoutPage = () => (
  <Suspense fallback={<CheckoutFallback />}>
    <CheckoutContent />
  </Suspense>
);

export default CheckoutPage;
