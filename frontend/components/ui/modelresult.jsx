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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./button";
import { usePreviewStore } from "@/lib/store";
import { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const ModelResult = () => {
  const store = usePreviewStore();
  const selectedModel = store(state => state.selectedModel);
  const [results, setResults] = useState({});
  
  const importanceChartData = useMemo(() => {
    if (!results.feature_importance || !Array.isArray(results.feature_importance)) return [];
    return results.feature_importance.filter(
      item => item && typeof item === "object" && item.Importance > 0
    );
  }, [results]);

  const predictionsChartData = useMemo(() => {
    if (!results.predictions) return [];
    const y_test = results.predictions.y_test || [];
    const y_pred_test = results.predictions.y_pred_test || [];
    return y_test.map((y, i) => ({ y_test: y, y_pred_test: y_pred_test[i] }));
  }, [results]);

  useEffect(() => {
    async function fetchResults() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/train-model/?model_type=${selectedModel}`,
          { method: "POST" }
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching results:", error);
        setResults({});
      }
    }
    fetchResults();
  }, [selectedModel]);

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
                        <div key={key} className="flex flex-row justify-between">
                          <p>{key}</p>
                          <p>{value}</p>
                        </div>
                      )}
                    </div>
                : <p>No hay parámetros disponibles</p>}
            </PopoverContent>
          </Popover>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="predictions" className="w-full">
            <TabsList>
              <TabsTrigger className="w-1/2" value="predictions">
                Predictions
              </TabsTrigger>
              <TabsTrigger className="w-1/2" value="variables">
                Variables importance
              </TabsTrigger>
            </TabsList>
            <TabsContent value="predictions">
              {predictionsChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="y_test"
                      name="y test"
                      domain={["dataMin", "dataMax"]}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                    />
                    <YAxis
                      dataKey="y_pred_test"
                      name="y prediction test"
                      domain={["dataMin", "dataMax"]}
                      tickLine={false}
                      axisLine={false}
                      tickMargin={10}
                    />
                    <Scatter
                      name="Predictions"
                      data={predictionsChartData}
                      fill="blue"
                    />
                    <Tooltip />
                  </ScatterChart>
                </ResponsiveContainer>
              ) : (
                <p>No data available for predictions.</p>
              )}
            </TabsContent>
            <TabsContent value="variables">
              {importanceChartData.length > 0 ? (
                <ChartContainer
                  config={{
                    importance: {
                      label: "Importance",
                      color: "hsl(var(--chart-1))"
                    }
                  }}
                  className="h-[400px]"
                >
                  <BarChart data={importanceChartData}>
                    <XAxis dataKey="Feature" tickLine={false} axisLine={false} tickMargin={10} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={10} />
                    <Bar dataKey="Importance" fill="var(--color-importance)" radius={[4, 4, 0, 0]} />
                    <ChartTooltip content={<ChartTooltipContent labelKey="Feature" />} cursor={false} />
                  </BarChart>
                </ChartContainer>
              ) : (
                <p>No data available for feature importance.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelResult;