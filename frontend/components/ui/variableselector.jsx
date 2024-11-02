"use client";
import { usePreviewStore } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

const VariableSelector = () => {
  const store = usePreviewStore();
  const variables = store((state) => state.preview.header);
  const [selectedOutcome, setSelectedOutcome] = useState(null);
  const [selectedPredictors, setSelectedPredictors] = useState([]);
  const [removedPredictors, setRemovedPredictors] = useState([]);

  // Handle outcome change
  const handleOutcomeChange = value => {
    setSelectedOutcome(value);
    console.log("Selected outcome:", value);
  };

  // Handle predictor elimination
  const handlePredictorElimination = key => {
    setSelectedPredictors(prevState =>
      prevState.filter(predictor => predictor !== key)
    );
    setRemovedPredictors(prevState => [...prevState, key]);
  };

  // Handle predictor restoration
  const handlePredictorRestoration = key => {
    setRemovedPredictors(prevState =>
      prevState.filter(predictor => predictor !== key)
    );
    setSelectedPredictors(prevState => [...prevState, key]);
  };

  useEffect(() => {
      if (selectedOutcome) {
        const allPredictors = variables.filter(
          key => key !== selectedOutcome
        );
        setSelectedPredictors(allPredictors);
        setRemovedPredictors([]);

        fetch("http://127.0.0.1:8000/select-features-label/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            features: allPredictors,
            label: selectedOutcome
          })
        })
        
      }
    },
    [selectedOutcome, variables]
  );

  return (
    <div className="flex flex-col mt-6 gap-3">
      <Select onValueChange={handleOutcomeChange}>
        <SelectTrigger className="w-full h-12 text-base dark:bg-secondary-container-dark dark:text-on-secondary-container-dark p-4 border-0 rounded-full transition-colors">
          <SelectValue
            className="font-montserrat font-semibold"
            placeholder="Select your outcome variable"
          />
        </SelectTrigger>
        <SelectContent className="text-3xl dark:bg-secondary-container-dark dark:text-on-secondary-container-dark border-0">
          <SelectGroup>
            {
              variables?.map((variable) => (
                <SelectItem key={variable} value={variable}>
                  {variable}
                </SelectItem>
              ))
            }
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
            {selectedPredictors.map(key =>
              <div
                key={key}
                onClick={() => handlePredictorElimination(key)}
                className="grid place-items-center w-fit h-8 px-4 bg-surface-container-high-dark font-cabin text-sm rounded-lg cursor-pointer"
              >
                {key}
              </div>
            )}
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
                      {removedPredictors.map(key =>
                        <div
                          key={key}
                          onClick={() => handlePredictorRestoration(key)}
                          className="grid place-items-center w-fit h-fit px-4 py-1 bg-surface-container-high-dark font-cabin text-sm rounded-lg cursor-pointer"
                        >
                          {key}
                        </div>
                      )}
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
      </Card>
    </div>
  );
};

export default VariableSelector;
