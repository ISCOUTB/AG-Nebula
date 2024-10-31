import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-background-material dark:bg-background-material-dark">
      <main className="flex flex-col">
        <header className="w-svw h-svh relative">
          <div
            id="titlesContainer"
            className="absolute text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <h1 className="text-6xl font-montserrat font-semibold">
              A new way to create{" "}
              <span className="bg-gradient-to-r from-[#FF6392] via-[#FDCC12] to-[#3EAEF2] text-transparent bg-clip-text">
                Machine Learning
              </span>{" "}
              models
            </h1>
            <p className=" font-cabin font-normal text-xl text-outline-dark mt-4">
              Upload a CSV file and with a few clicks, generate models to lead
              you to make the best conclusions
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <Link href="/playground">
                <Button size="lg" className="bg-white font-cabin font-normal">
                  Get Started
                </Button>
              </Link>

              <Button
                size="lg"
                className="dark:bg-surface-container-high-dark dark:text-on-surface-dark"
              >
                How it works
              </Button>
            </div>
          </div>
        </header>
      </main>
      <footer></footer>
    </div>
  );
}
