import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full flex flex-col bg-background-material">
      <main className="flex flex-col">
        <header className="w-svw h-svh">
          <div id="titlesContainer">
            <h1>A new way to create Machine Learning MODE</h1>
          </div>
        </header>
      </main>
      <footer></footer>
    </div>
  );
}
