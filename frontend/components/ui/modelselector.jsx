"use client";

import { usePreviewStore } from "@/lib/store";
import { useRef, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ModelSelector = () => {
  const store = usePreviewStore();
  const selectedOutcome = store((state) => state.selectedOutcome);
  const selectedPredictors = store((state) => state.selectedPredictors);
  const setSelectedModel = store((state) => state.setSelectedModel);
  const scrollContainerRef = useRef(null);
  const [possibleModels, setPossibleModels] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  console.log(possibleModels)

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    if (selectedOutcome && selectedPredictors.length > 0) {
      setIsVisible(true);
      fetch("http://0.0.0.0:8011/analyze-model/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          features: selectedPredictors,
          label: selectedOutcome,
        }),
      })
        .then((response) => response.json())
        .then((data) => setPossibleModels(data.possible_models));
    } else {
      setIsVisible(false);
      setPossibleModels([]); // Resetea el listado si no hay predictores u outcome
    }
  }, [selectedPredictors, selectedOutcome]);

  const handleModelSelection = (model) => {
    setSelectedModel(model);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="relative flex flex-col mt-6 w-full"
        >
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
                {possibleModels.length > 0 ? (
                  possibleModels.map((model, index) => (
                    <div
                      key={index}
                      onClick={() => handleModelSelection(model.name)}
                      className="flex-shrink-0 min-w-80 shadow-none bg-surface-container-high hover:bg-surface-container-highest dark:bg-surface-container-high-dark dark:hover:bg-surface-container-highest-dark transition-colors p-4 rounded-2xl cursor-pointer"
                    >
                      <div>
                        <p className="font-montserrat font-semibold">{model.name}</p>
                        <p className="font-cabin font-normal max-w-96 mt-3">{model.description}</p>
                      </div>
                      
                    </div>
                  ))
                ) : (
                  <div>Loading...</div>
                )}
              </div>
              <Button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-tertiary-container-dark text-on-tertiary-container-dark rounded-full hover:bg-background/90"
                onClick={() => scroll("left")}
                size="icon"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-tertiary-container-dark text-on-tertiary-container-dark hover:bg-background/90 rounded-full"
                onClick={() => scroll("right")}
                size="icon"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModelSelector;