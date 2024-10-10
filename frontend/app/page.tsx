import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-cod-gray-50">
      <main className="flex flex-col">
        <header className="relative flex flex-col w-full h-fit md:h-[100svh] bg-alabaster-50 md:overflow-hidden">
          <div
            id="titlesContainer"
            className="flex flex-col justify-center w-full h-[60svh] px-4 md:px-10"
          >
            <div className="">
              <h1 className="w-[60vw] text-2xl md:text-2xl lg:text-5xl font-semibold text-alabaster-950">
                A new way to create machine learning models
              </h1>
              <p className="lg:w-[30vw] text-xl font-normal text-alabaster-900 mt-2 md:mt-4">
                In a few simple steps it reaches conclusions about your data,
                guided by machine learning models.
              </p>
              <div></div>
            </div>
            <Button className="w-fit mt-4 text-base h-10 font-medium bg-alabaster-950 text-malibu-50 rounded-full transition-colors">
              Get Started
            </Button>
          </div>
          <div className="w-full h-[40svh] flex flex-col md:flex-row">
            <div className="flex md:w-1/3 h-full bg-malibu-300 px-4 py-4 md:px-10 pt-4">
              <div>
                <h1 className="text-malibu-950 font-cabinet text-xl font-medium w-72">You just need one thing: An CSV file</h1>
                <p className="text-malibu-900 text-base font-regular mt-2">Upload your file and select your response variable and predictor variables. We will suggest the best model for your data.</p>
              </div>
            </div>
            <div className="flex w-full md:w-1/3 h-full bg-brink-pink-300 px-4 py-4 md:px-10 pt-4">
              <div>
                <h1 className="text-brink-pink-950 font-cabinet text-xl font-medium w-72">Generate your model instantly</h1>
                <p className="text-brink-pink-900 text-base font-regular mt-2">After selecting the model we recommend or the one you prefer, that's all! Just wait for the results.</p>
              </div>
            </div>
            <div className="flex w-full md:w-1/3 h-full bg-energy-yellow-300 px-4 py-4 md:px-10 pt-4">
              <div>
                <h1 className="text-energy-yellow-950 font-cabinet text-xl font-medium w-72">Export your results easily</h1>
                <p className="text-energy-yellow-900 text-base font-regular mt-2">Export the results obtained, where you can see important statistics for decision making and the variables that most influence your response variable.</p>
              </div>
            </div>
          </div>
        </header>
      </main>
      <footer></footer>
    </div>
  );
}
