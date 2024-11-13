"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePreviewStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ModelResult({ email = '' }) {
  const store = usePreviewStore();
  const selectedModel = store(state => state.selectedModel);
  const storeResults = store(state => state.results);
  const isExistingSession = store(state => state.isExistingSession);
  const [results, setResults] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const { toast } = useToast();

  const importanceChartData = useMemo(
    () => {
      if (
        !results.feature_importance ||
        !Array.isArray(results.feature_importance)
      )
        return [];
      return results.feature_importance
        .filter(item => item && typeof item === "object" && item.Importance > 0)
        .sort((a, b) => b.Importance - a.Importance)
        .slice(0, 10);
    },
    [results]
  );

  const predictionsChartData = useMemo(
    () => {
      if (!results.predictions) return [];
      const y_test = results.predictions.y_test || [];
      const y_pred_test = results.predictions.y_pred_test || [];
      return y_test.map((y, i) => ({ y_test: y, y_pred_test: y_pred_test[i] }));
    },
    [results]
  );

  const saveResults = useCallback(
    async resultsToSave => {
      if (!email || isExistingSession) {
        return;
      }

      if (!resultsToSave || Object.keys(resultsToSave).length === 0) {
        console.error("Results are empty, nothing to save.");
        return;
      }

      try {
        const response = await fetch("/api/results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            result: resultsToSave
          })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Failed to save results: ${errorData.error || "Unknown error"}`
          );
        }

        toast({
          title: "Results saved",
          description: "Your model results have been saved successfully.",
          duration: 3000
        });

        console.log("Results saved successfully.");
      } catch (error) {
        console.error("Error saving results:", error);
        toast({
          title: "Error",
          description: "Failed to save results. Please try again.",
          variant: "destructive"
        });
      }
    },
    [email, isExistingSession, toast]
  );

  useEffect(() => {
    let isMounted = true;
    async function fetchResults() {
      if (!selectedModel) {
        setIsVisible(false);
        return;
      }

      setIsLoading(true);
      setLoadingMessage("");
      try {
        if (isExistingSession && storeResults) {
          setResults(storeResults);
          setIsVisible(true);
        } else {
          const response = await fetch(
            `http://129.153.69.231:8011/train-model/?model_type=${selectedModel}`,
            { method: "POST" }
          );
          
          const reader = response.body.getReader();
          const decoder = new TextDecoder();

          let completeResponse = '';
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value);
            completeResponse += chunk;
            
            if (chunk.includes("Fitting")) {
              setLoadingMessage(chunk.trim());
            }
          }

          // Parse the complete response as JSON
          try {
            const data = JSON.parse(completeResponse);
            if (isMounted) {
              setResults(data);
              setIsVisible(Object.keys(data).length > 0);
              if (Object.keys(data).length > 0) {
                await saveResults(data);
              }
            }
          } catch (error) {
            console.error("Error parsing JSON:", error);
            setResults({});
            setIsVisible(false);
          }
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        if (isMounted) {
          setResults({});
          setIsVisible(false);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    fetchResults();

    return () => {
      isMounted = false;
    };
  }, [selectedModel, isExistingSession, storeResults, saveResults]);

  if (!isVisible && !isLoading) return null;

  const featureImportanceConfig = {
    Importance: {
      label: "Importance",
      color: "hsl(var(--chart-1))"
    }
  };

  const predictionsConfig = {
    y_pred_test: {
      label: "Predicted",
      color: "hsl(var(--chart-1))"
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Model Results</CardTitle>
        <CardDescription>
          Analysis for {selectedModel} model
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mb-4" />
            {loadingMessage && (
              <p className="text-center text-sm text-gray-500">{loadingMessage}</p>
            )}
          </div>
        ) : (
          <div>
            <Tabs defaultValue="importance" className="w-full">
              <TabsList>
                <TabsTrigger className="w-1/2" value="importance">
                  Variable importance
                </TabsTrigger>
                <TabsTrigger className="w-1/2" value="prediction">
                  Predictions
                </TabsTrigger>
              </TabsList>
              <TabsContent value="importance" className="h-[50vh]">
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>Feature Importance</CardTitle>
                    <CardDescription>
                      Top 10 most important features
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-hidden">
                    <ChartContainer
                      className="w-full h-full"
                      config={featureImportanceConfig}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          accessibilityLayer
                          data={importanceChartData}
                          layout="vertical"
                        >
                          <CartesianGrid horizontal={false} />
                          <XAxis
                            type="number"
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            dataKey="Feature"
                            type="category"
                            tickLine={false}
                            axisLine={false}
                            width={100}
                            tickFormatter={value => value.slice(0, 10)}
                          />
                          <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                          />
                          <Bar
                            dataKey="Importance"
                            fill="var(--color-Importance)"
                            radius={4}
                          >
                            <LabelList
                              dataKey="Importance"
                              position="right"
                              formatter={value => value.toFixed(2)}
                            />
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="prediction" className="h-[50vh]">
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>Predictions vs Actual</CardTitle>
                    <CardDescription>
                      Scatter plot of predicted vs actual values
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-hidden">
                    <ChartContainer className="w-full h-full" config={predictionsConfig}>
                      <ResponsiveContainer width="100%" height={'100%'}>
                        <ScatterChart>
                          <CartesianGrid />
                          <XAxis
                            type="number"
                            dataKey="y_test"
                            name="Actual"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                          />
                          <YAxis
                            type="number"
                            dataKey="y_pred_test"
                            name="Predicted"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Scatter
                            name="Predictions"
                            data={predictionsChartData}
                            fill="var(--color-y_pred_test)"
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  );
}