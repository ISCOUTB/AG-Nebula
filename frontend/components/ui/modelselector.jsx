"use client";

import { usePreviewStore } from "@/lib/store";
import { useRef, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ModelSelector = () => {
  const store = usePreviewStore();
  const selectedOutcome = store(state => state.selectedOutcome);
  const selectedPredictors = store(state => state.selectedPredictors);
  const scrollContainerRef = useRef(null);
  const [possibleModels, setPossibleModels] = useState([]);

  let models = [
        {
            name: "Linear Regression",
            description: "Linear regression is a linear approach to modeling the relationship between a scalar response and one or more explanatory variables."
        },
        {
            name: "Logistic Regression",
            description: "Logistic regression is a statistical model that in its basic form uses a logistic function to model a binary dependent variable."
        },
        {
            name: "Random Forest",
            description: "Random forests or random decision forests are an ensemble learning method for classification, regression and other tasks that operate by constructing a multitude of decision trees at training time and outputting the class that is the mode of the classes (classification) or mean prediction (regression) of the individual trees."
        }
    ]

  const scroll = direction => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300; // Ajusta este valor para controlar la distancia de desplazamiento
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8000/analyze-model/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        features: selectedPredictors,
        label: selectedOutcome
      })
    })
    .then(response => response.json())
    .then(data => {setPossibleModels(data.possible_models)})

  }, [selectedPredictors, selectedOutcome]);

  return (
    <div className="relative flex flex-col mt-6 w-full">
      <Card>
        <CardHeader>
          <CardTitle>Select the model you want to generate</CardTitle>
          <CardDescription>
            According to your data and selected variables, you can generate the
            following models.
          </CardDescription>
        </CardHeader>
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 pb-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {models ? models.map((model, index) => (
                <Card className="flex-shrink-0 shadow-none dark:bg-surface-container-high-dark">
                    <CardHeader>
                        <CardTitle>{model.name}</CardTitle>
                        <CardDescription className="max-w-96">{model.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <button></button>
                    </CardContent>
                </Card>
            )) : <div>Loading...</div>}
          </div>
          <Button
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-secondary-container-dark rounded-full hover:bg-background/90"
            onClick={() => scroll("left")}
            size="icon"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-secondary-container-dark hover:bg-background/90 rounded-full"
            onClick={() => scroll("right")}
            size="icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ModelSelector;
