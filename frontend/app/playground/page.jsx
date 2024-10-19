"use client";

import { useState } from "react";
import { FileUpIcon, Table2Icon, PlusIcon, XIcon } from "lucide-react";
import Chip from "@/components/ui/chip";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

export default function Page() {
  const exampleData = [
    {
      Column1: "Value1",
      Column2: "Value2",
      Column3: "Value3",
      Column4: "Value4",
      Column5: "Value5",
      Column6: "Value6",
      Column7: "Value7",
      Column8: "Value8",
      Column9: "Value9",
      Column10: "Value10"
    },
    {
      Column1: "Value1",
      Column2: "Value2",
      Column3: "Value3",
      Column4: "Value4",
      Column5: "Value5",
      Column6: "Value6",
      Column7: "Value7",
      Column8: "Value8",
      Column9: "Value9",
      Column10: "Value10"
    },
    {
      Column1: "Value1",
      Column2: "Value2",
      Column3: "Value3",
      Column4: "Value4",
      Column5: "Value5",
      Column6: "Value6",
      Column7: "Value7",
      Column8: "Value8",
      Column9: "Value9",
      Column10: "Value10"
    },
    {
      Column1: "Value1",
      Column2: "Value2",
      Column3: "Value3",
      Column4: "Value4",
      Column5: "Value5",
      Column6: "Value6",
      Column7: "Value7",
      Column8: "Value8",
      Column9: "Value9",
      Column10: "Value10"
    },
    {
      Column1: "Value1",
      Column2: "Value2",
      Column3: "Value3",
      Column4: "Value4",
      Column5: "Value5",
      Column6: "Value6",
      Column7: "Value7",
      Column8: "Value8",
      Column9: "Value9",
      Column10: "Value10"
    }
  ];

  const [outcomeVariable, setOutcomeVariable] = useState(null);
  const [predictorVariables, setPredictorVariables] = useState([]);
  const [availableVariables, setAvailableVariables] = useState([]);

  const handleOutcomeVariableChange = value => {
    setOutcomeVariable(value);
    const allVariables = Object.keys(exampleData[0]);
    const newPredictors = allVariables.filter(v => v !== value);
    setPredictorVariables(newPredictors);
    setAvailableVariables([]);
  };

  const handleRemovePredictorVariable = variable => {
    setPredictorVariables(predictorVariables.filter(v => v !== variable));
    setAvailableVariables([...availableVariables, variable]);
  };

  const handleAddPredictorVariable = variable => {
    setPredictorVariables([...predictorVariables, variable]);
    setAvailableVariables(availableVariables.filter(v => v !== variable));
  };

  const handleConfirmSelection = () => {
    const selectedVariables = {
      predictor_variables: predictorVariables,
      response_variable: outcomeVariable
    };
    console.log(JSON.stringify(selectedVariables));
  };

  return (
    <div className="w-svw h-fit flex flex-col p-4 bg-background-material dark:bg-background-material-dark">
      <main className="relative h-full">
        <div
          id="fileUploaderContainer"
          className="w-full flex flex-row items-center justify-between"
        >
          <div id="textContainer" className="select-none">
            <h6 className="font-cabin font-medium text-outline">
              To get started
            </h6>
            <h1 className="font-montserrat font-semibold">
              Upload your CSV file
            </h1>
          </div>
          <div className="grid place-items-center bg-primary-container text-on-primary-container dark:bg-primary-container-dark dark:text-on-primary-container-dark w-10 h-10 rounded-lg cursor-pointer">
            <FileUpIcon />
          </div>
        </div>

        {/* Data Preview */}
        <div className="mt-6">
          <Chip className="dark:bg-malibu-900 dark:text-malibu-200 rounded-[8px]">
            <Table2Icon className="w-4 h-4" />
            Data preview
          </Chip>
          <Table className="mt-2 dark:bg-[#171C20] dark:text-on-surface-dark rounded-lg">
            <TableCaption className="font-cabin">
              This is the first 5 rows of your data
            </TableCaption>
            <TableHeader>
              <TableRow>
                {Object.keys(exampleData[0]).map(key =>
                  <TableCell
                    key={key}
                    className="font-montserrat font-semibold"
                  >
                    {key}
                  </TableCell>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {exampleData.map((row, index) =>
                <TableRow key={index}>
                  {Object.values(row).map((value, index) =>
                    <TableCell key={index} className="font-cabin">
                      {value}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Variable Selection Section */}
        <div className="mt-10">
          <p className="font-cabin text-outline dark:text-outline-dark">
            If everything is correct with your data, please select your
            variables below.
          </p>
          <h2 className="font-montserrat font-semibold text-lg mb-2 dark:text-on-background-dark">
            Select your predictor variables and outcome variable
          </h2>

          <div className="flex flex-col md:space-x-8 space-y-6">
            {/* Outcome container */}
            <div className="flex-1">
              <h3 className="font-montserrat font-semibold dark:text-on-surface-dark text-base mb-2">
                Variable to predict (Outcome)
              </h3>
              <Select onValueChange={handleOutcomeVariableChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select outcome variable" />
                </SelectTrigger>
                <SelectContent className="border-0 bg-surface-container text-on-surface dark:bg-surface-container-dark dark:text-on-surface-dark">
                  {Object.keys(exampleData[0]).map(key =>
                    <SelectItem key={key} value={key}>
                      {key}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Predictor container */}
            <div className="flex-1">
              <h3 className="font-montserrat font-semibold text-base mb-2">
                Predictor variables
              </h3>
              <div className="flex flex-wrap gap-2">
                {predictorVariables.map(variable =>
                  <div
                    key={variable}
                    className="flex flex-row items-center justify-center h-10 px-4 border border-primary-material dark:border-primary-material-dark rounded-full"
                  >
                    {variable}
                    <XIcon
                      className="ml-2 h-4 w-4 cursor-pointer"
                      onClick={() => handleRemovePredictorVariable(variable)}
                    />
                  </div>
                )}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <PlusIcon className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="space-y-2">
                      {availableVariables.map(variable =>
                        <Button
                          key={variable}
                          variant="ghost"
                          className="w-full justify-start"
                          onClick={() => handleAddPredictorVariable(variable)}
                        >
                          {variable}
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Button
            className="mt-6"
            onClick={handleConfirmSelection}
            disabled={!outcomeVariable || predictorVariables.length === 0}
          >
            Confirm Selection
          </Button>
        </div>
      </main>
    </div>
  );
}
