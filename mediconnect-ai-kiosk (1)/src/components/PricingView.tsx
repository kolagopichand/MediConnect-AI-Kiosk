import React, { useState } from "react";
import { PRICING_PLANS } from "../data";
import { Check, HelpCircle, Shield, ArrowRight } from "lucide-react";
import { ActiveTab } from "../types";

interface PricingViewProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function PricingView({ setActiveTab }: PricingViewProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");

  const getPriceDisplay = (plan: typeof PRICING_PLANS[0]) => {
    if (typeof plan.monthlyPrice === "string") {
      return { price: plan.monthlyPrice, sub: "custom contract" };
    }

    const price = billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
    return {
      price: `$${price}`,
      sub: billingCycle === "monthly" ? "per kiosk / month" : "per kiosk / month (billed annually)",
    };
  };

  return (
    <div className="space-y-16 pb-20 animate-fade-in" id="pricing-view-container">
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto space-y-4 px-4">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest font-mono">
          Flexible Budgets
        </span>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-gray-900 tracking-tight">
          Flexible, Transparent Pricing Structure
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Unlock modern, remote clinical diagnostics. Our hardware-as-a-service model includes maintenance and cloud telemetry access out-of-the-box.
        </p>

        {/* Toggle billing cycle */}
        <div className="pt-6 flex justify-center items-center space-x-3">
          <span className={`text-xs font-semibold ${billingCycle === "monthly" ? "text-gray-900" : "text-gray-400"}`}>
            Billed Monthly
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            className="w-12 h-6 bg-slate-200 rounded-full p-1 transition-all flex items-center relative"
            id="billing-cycle-toggle-btn"
          >
            <span
              className={`h-4 w-4 bg-blue-600 rounded-full transition-transform absolute ${
                billingCycle === "yearly" ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span className={`text-xs font-semibold flex items-center space-x-1 ${billingCycle === "yearly" ? "text-blue-600" : "text-gray-400"}`}>
            <span>Billed Annually</span>
            <span className="bg-emerald-50 text-emerald-700 text-[9px] px-1.5 py-0.5 rounded-full border border-emerald-100 font-bold uppercase">
              Save 20%
            </span>
          </span>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const { price, sub } = getPriceDisplay(plan);
          return (
            <div
              key={plan.name}
              className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-200 ${
                plan.popular
                  ? "glass-dark text-white border-white/10 shadow-xl scale-102"
                  : "glass text-gray-900 shadow-xs"
              }`}
              id={`pricing-card-${plan.name.replace(/\s+/g, "-")}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      plan.popular ? "bg-blue-500/15 text-blue-400" : "bg-gray-100 text-gray-500"
                    }`}>
                      {plan.badge}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-xl">{plan.name}</h3>
                  <p className={`text-xs leading-relaxed ${plan.popular ? "text-slate-400" : "text-gray-400"}`}>
                    {plan.desc}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-2">
                  <span className="font-display font-extrabold text-4xl tracking-tight">
                    {price}
                  </span>
                  <span className={`block text-[10px] mt-1 font-mono uppercase tracking-wider ${
                    plan.popular ? "text-slate-500" : "text-gray-400"
                  }`}>
                    {sub}
                  </span>
                </div>

                {/* Feature bullet lists */}
                <ul className="space-y-3 pt-6 border-t border-gray-100/10 text-xs">
                  {plan.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5">
                      <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${plan.popular ? "text-teal-400" : "text-blue-600"}`} />
                      <span className={plan.popular ? "text-slate-300" : "text-gray-600"}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action */}
              <button
                onClick={() => setActiveTab("contact")}
                className={`w-full py-3.5 rounded-xl font-bold text-xs mt-8 transition-colors flex items-center justify-center space-x-2 cursor-pointer ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20"
                    : "bg-gray-900 hover:bg-gray-800 text-white"
                }`}
                id={`pricing-action-btn-${plan.name.replace(/\s+/g, "-")}`}
              >
                <span>{plan.action}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </section>

      {/* Frequently Asked Questions Prompt */}
      <section className="max-w-3xl mx-auto glass p-6 rounded-2xl flex items-start space-x-3">
        <Shield className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-display font-bold text-sm text-gray-900">Enterprise SLA and Support:</h4>
          <p className="text-gray-500 text-xs mt-1 leading-relaxed">
            All plans include standard 24/7 technical ticketing, regular sensor recalibrations, and encrypted software-patch updates. Contact sales for hardware leasing, multi-lead extensions, or localized translation packages.
          </p>
        </div>
      </section>
    </div>
  );
}
