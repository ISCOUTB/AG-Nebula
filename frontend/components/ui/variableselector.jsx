"use client";

import { usePreviewStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { MousePointerClickIcon, PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast"
import { Button } from "./button";
import { motion, AnimatePresence } from "framer-motion";

const VariableSelector = () => {
  const store = usePreviewStore();
  const variables = store((state) => state.preview.header);
  const selectedOutcome = store((state) => state.selectedOutcome);
  const selectedPredictors = store((state) => state.selectedPredictors);
  const removedPredictors = store((state) => state.removedPredictors);
  const setSelectedOutcome = store((state) => state.setSelectedOutcome);
  const setSelectedPredictors = store((state) => state.setSelectedPredictors);
  const setRemovedPredictors = store((state) => state.setRemovedPredictors);

  const [tempOutcome, setTempOutcome] = useState(selectedOutcome);
  const [tempPredictors, setTempPredictors] = useState(selectedPredictors);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (variables && variables.length > 0) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 400);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [variables]);

  // Handle temporary outcome change
  const handleOutcomeChange = value => {
    setTempOutcome(value);
    const allPredictors = variables.filter(key => key !== value);
    setTempPredictors(allPredictors);
  };

  // Handle predictor elimination from temp state
  const handlePredictorElimination = key => {
    setTempPredictors(tempPredictors.filter(predictor => predictor !== key));
    setRemovedPredictors([...removedPredictors, key]);
  };

  // Handle predictor restoration to temp state
  const handlePredictorRestoration = key => {
    setRemovedPredictors(removedPredictors.filter(predictor => predictor !== key));
    setTempPredictors([...tempPredictors, key]);
  };

  // Send selected predictors and outcome to the server
  const sendSelectedPredictors = () => {
    setSelectedOutcome(tempOutcome);
    setSelectedPredictors(tempPredictors);

    fetch("http://0.0.0.0:8011/select-features-label/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        features: tempPredictors,
        label: tempOutcome
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then(data => {
      toast({
        variant: "good",
        description: data.message,
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col mt-6 gap-3"
        >
          <Select onValueChange={handleOutcomeChange}>
            <SelectTrigger className="w-full h-12 text-base dark:bg-secondary-container-dark dark:text-on-secondary-container-dark p-4 border-0 rounded-full transition-colors">
              <SelectValue
                className="font-montserrat font-semibold"
                placeholder="Select your outcome variable"
              />
            </SelectTrigger>
            <SelectContent className="text-3xl dark:bg-secondary-container-dark dark:text-on-secondary-container-dark border-0">
              <SelectGroup>
                {variables?.map((variable) => (
                  <SelectItem key={variable} value={variable}>
                    {variable}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Select your predictor variables</CardTitle>
              <MousePointerClickIcon />
            </CardHeader>
            <CardContent>
              <div className="flex w-full max-h-48 flex-wrap gap-2 overflow-y-scroll">
                {tempPredictors.map(key => (
                  <div
                    key={key}
                    onClick={() => handlePredictorElimination(key)}
                    className="grid place-items-center w-fit h-8 px-4 bg-surface-container-high-dark font-cabin text-sm hover:scale-105 rounded-lg transition-all cursor-pointer"
                  >
                    {key}
                  </div>
                ))}
              </div>
              <div className="mt-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="grid place-items-center w-fit h-8 px-4 bg-secondary-container text-on-secondary-container dark:bg-secondary-container-dark dark:text-on-secondary-container-dark font-cabin text-sm rounded-lg cursor-pointer">
                      <PlusIcon className="h-4 w-4" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0 border-0 rounded-2xl dark:bg-surface-container-highest-dark">
                    <Card className="">
                      <CardHeader>
                        <CardTitle className="text-sm">
                          Removed Predictors
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {removedPredictors.map(key => (
                            <div
                              key={key}
                              onClick={() => handlePredictorRestoration(key)}
                              className="grid place-items-center w-fit h-fit px-4 py-1 bg-surface-container-high-dark font-cabin text-sm rounded-lg cursor-pointer"
                            >
                              {key}
                            </div>
                          ))}
                        </div>
                        {removedPredictors.length === 0 &&
                          <p className="font-cabin text-sm text-on-surface dark:text-on-surface-dark/60">
                            No removed predictors
                          </p>}
                      </CardContent>
                    </Card>
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                onClick={sendSelectedPredictors}
                className="bg-surface-container dark:bg-surface-container-dark border border-outline-variant dark:border-outline-variant-dark text-on-primary-container dark:text-on-primary-container-dark hover:bg-surface-container-highest dark:hover:bg-surface-container-highest-dark"
                size="lg"
              >
                Send variables
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VariableSelector;