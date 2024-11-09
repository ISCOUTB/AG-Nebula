import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signIn } from "@/auth";

const Page = () => {
  return (
    <div className="flex items-center justify-center w-svw h-svh bg-background-material-dark">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Please Login</CardTitle>
          <CardDescription>To use nebula you have to be logged</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button
              variant={"lg"}
              className="w-full dark:bg-surface-container-highest-dark"
              type="submit"
            >
              Signin with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
