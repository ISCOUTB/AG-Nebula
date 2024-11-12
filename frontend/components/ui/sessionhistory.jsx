'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { InboxIcon, ChevronRightIcon, BarChartIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePreviewStore } from '@/lib/store'
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function SessionHistory({ email }) {
  const [sessions, setSessions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const store = usePreviewStore()
  const { toast } = useToast()

  console.log(sessions)

  const loadSessions = useCallback(async () => {
    if (!email) {
      toast({
        title: "No email provided",
        description: "Unable to load sessions without an email.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(`/api/results/${encodeURIComponent(email)}`)
      if (!response.ok) {
        throw new Error('Failed to fetch sessions')
      }
      const { data } = await response.json()
      setSessions(data)
    } catch (error) {
      console.error('Error loading sessions:', error)
      toast({
        title: "Error",
        description: "Failed to load sessions. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [email, toast])

  const loadSession = useCallback((session) => {
    if (!session.result) {
      toast({
        title: "Invalid session",
        description: "This session contains no results.",
        variant: "destructive",
      })
      return
    }

    try {
      const result = typeof session.result === 'string' 
        ? JSON.parse(session.result) 
        : session.result

      store.setState({
        selectedModel: result.model_type || 'unknown',
        results: result,
        isExistingSession: true  // Añadimos esta bandera
      })

      toast({
        title: "Session loaded",
        description: "The selected session has been loaded successfully.",
      })
    } catch (error) {
      console.error('Error parsing session:', error)
      toast({
        title: "Error",
        description: "Failed to load session data. The format may be invalid.",
        variant: "destructive",
      })
    }
  }, [store, toast])

  useEffect(() => {
    if (isOpen) {
      loadSessions()
    }
  }, [isOpen, loadSessions])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          size="icon" 
          className="relative border bg-surface-container-low border-outline-variant dark:bg-surface-container-low-dark dark:border-outline-variant-dark"
        >
          <InboxIcon className="h-5 w-5 text-on-surface dark:text-on-surface-dark" />
          {sessions.length > 0 && (
            <Badge 
              variant="secondary" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center"
            >
              {sessions.length}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col w-[400px] sm:w-[540px] bg-surface dark:bg-surface-dark pl-6 pr-4 border-0 rounded-r-2xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-on-surface dark:text-on-surface-dark">
            <BarChartIcon className="h-5 w-5" />
            Session History
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-4 pr-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No sessions found.
            </div>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <Card 
                  key={session.id}
                  className="cursor-pointer transition-colors hover:bg-accent"
                  onClick={() => loadSession(session)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="flex items-center justify-between text-base">
                      <div className="flex items-center gap-2">
                        <BarChartIcon className="h-4 w-4 text-primary-material dark:text-primary-material-dark" />
                        Model Analysis
                      </div>
                      <ChevronRightIcon className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <div className="text-sm text-muted-foreground">
                      {formatDate(session.created_at)}
                    </div>
                    {session.result && typeof session.result === 'object' && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        <Badge className='bg-secondary-container text-on-secondary-container dark:bg-secondary-container-dark dark:text-on-secondary-container-dark'>
                          {session.result.metrics?.full_metrics?.mse.toFixed(4) || 'Unknown Model'}
                        </Badge>
                        {session.result.metrics && (
                          <Badge className='bg-tertiary-container-dark text-on-tertiary-container-dark'>
                            Score: {(session.result.metrics?.full_metrics?.r2_score || 0).toFixed(3)}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}