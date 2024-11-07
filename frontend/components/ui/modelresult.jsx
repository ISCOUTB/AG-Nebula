"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "./button";
import { usePreviewStore } from "@/lib/store";
import { useState, useEffect } from "react";

const ModelResult = () => {
  const store = usePreviewStore();
  const selectedModel = store(state => state.selectedModel);
  const [results, setResults] = useState([]);
  console.log(results);

  useEffect(
    () => {
      async function fetchResults() {
        const response = await fetch(
          `http://127.0.0.1:8000/train-model/?model_type=${selectedModel}`,
          { method: "POST" }
        );
        const data = await response.json();
        setResults(data);
      }
      fetchResults();
    },
    [selectedModel]
  );

  return (
    <div className="mt-6">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <div>
            <CardTitle>Results</CardTitle>
            <CardDescription>
              Here you can see the results of the generated model.
            </CardDescription>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-full dark:bg-surface-container-highest-dark dark:text-on-secondary-container-dark">
                Best parameters
              </Button>
            </PopoverTrigger>
            <PopoverContent className="mx-4">
              {results.best_params
                ? typeof results.best_params === "string"
                  ? results.best_params
                  : <div>
                      {Object.entries(results.best_params).map(([key, value]) =>
                        <div
                          key={key}
                          className="flex flex-row justify-between"
                        >
                          <p>
                            {key}
                          </p>
                          <p>
                            {value}
                          </p>
                        </div>
                      )}
                    </div>
                : <p>No hay parámetros disponibles</p>}
            </PopoverContent>
          </Popover>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ModelResult;
