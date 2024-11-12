'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { usePreviewStore } from "@/lib/store"
import { useToast } from "@/hooks/use-toast"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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
} from "recharts"

export default function ModelResult({ email }) {
  const store = usePreviewStore()
  const selectedModel = store(state => state.selectedModel)
  const storeResults = store(state => state.results)
  const isExistingSession = store(state => state.isExistingSession)
  const [results, setResults] = useState({})
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const importanceChartData = useMemo(() => {
    if (!results.feature_importance || !Array.isArray(results.feature_importance)) return []
    return results.feature_importance
      .filter(item => item && typeof item === "object" && item.Importance > 0)
      .sort((a, b) => b.Importance - a.Importance)
      .slice(0, 10)  // Mostrar solo las 10 características más importantes
  }, [results])

  const predictionsChartData = useMemo(() => {
    if (!results.predictions) return []
    const y_test = results.predictions.y_test || []
    const y_pred_test = results.predictions.y_pred_test || []
    return y_test.map((y, i) => ({ y_test: y, y_pred_test: y_pred_test[i] }))
  }, [results])

  const saveResults = useCallback(async (resultsToSave) => {
    if (!email || isExistingSession) {
      return  // No guardar si es una sesión existente
    }

    if (!resultsToSave || Object.keys(resultsToSave).length === 0) {
      console.error("Results are empty, nothing to save.")
      return
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
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Failed to save results: ${errorData.error || 'Unknown error'}`)
      }
      
      toast({
        title: "Results saved",
        description: "Your model results have been saved successfully.",
        duration: 3000,
      })
      
      console.log("Results saved successfully.")
    } catch (error) {
      console.error("Error saving results:", error)
      toast({
        title: "Error",
        description: "Failed to save results. Please try again.",
        variant: "destructive",
      })
    }
  }, [email, isExistingSession, toast])

  useEffect(() => {
    let isMounted = true
    async function fetchResults() {
      if (!selectedModel) {
        setIsVisible(false)
        return
      }

      setIsLoading(true)
      try {
        if (isExistingSession && storeResults) {
          // Si es una sesión existente, usar los resultados del store
          setResults(storeResults)
          setIsVisible(true)
        } else {
          // Si no, hacer la llamada a la API
          const response = await fetch(
            `http://127.0.0.1:8000/train-model/?model_type=${selectedModel}`,
            { method: "POST" }
          )
          const data = await response.json()
          if (isMounted) {
            setResults(data)
            setIsVisible(Object.keys(data).length > 0)
            if (Object.keys(data).length > 0) {
              await saveResults(data)
            }
          }
        }
      } catch (error) {
        console.error("Error fetching results:", error)
        if (isMounted) {
          setResults({})
          setIsVisible(false)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }
    fetchResults()

    return () => {
      isMounted = false
    }
  }, [selectedModel, isExistingSession, storeResults, saveResults])

  if (!isVisible) return null

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Model Results</CardTitle>
        <CardDescription>Analysis for {selectedModel} model</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Feature Importance</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={importanceChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="Feature" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Importance" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Predictions vs Actual</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="y_test" name="Actual" />
                  <YAxis type="number" dataKey="y_pred_test" name="Predicted" />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Predictions" data={predictionsChartData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}