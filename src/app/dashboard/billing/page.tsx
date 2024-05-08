import BillingForm from "@/components/BillingForm";
import { getUserSubscriptionPlan } from "@/lib/stripe";
import React from "react";

type Props = {};

const Page = async (props: Props) => {
  const subscription = await getUserSubscriptionPlan();

  return <BillingForm subscriptionPlan={subscription} />
};

export default Page;
