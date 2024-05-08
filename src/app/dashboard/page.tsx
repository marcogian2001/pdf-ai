import Dashboard from "@/components/Dashboard";
import { db } from "@/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

type Props = {};

const Page = async (props: Props) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const authRedirect = "/auth-callback?origin=dashboard";

  if (!user || !user.id) redirect(authRedirect);

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) redirect(authRedirect);

  return <Dashboard />;
};

export default Page;
