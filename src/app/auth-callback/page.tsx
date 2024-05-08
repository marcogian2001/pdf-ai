"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

type Props = {};

const AuthCallback = (props: Props) => {
  const route = useRouter();

  const searchParams = useSearchParams();
  const origin = searchParams.get("origin");

  const { data, error, isLoading } = trpc.authCallback.useQuery();

  console.log({ data, isLoading, error });
  if (data?.success) {
    route.push(origin ? `/${origin}` : "/dashboard");
  }

  if (error?.data?.code === "UNAUTHORIZED") {
    route.push("/sign-in");
  }

  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
        <h3 className="font-semibold text-lg">Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
};

export default AuthCallback;
