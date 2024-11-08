"use client";
import { usePreviewStore } from "@/lib/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const TablePreview = () => {
  const store = usePreviewStore();
  const preview = store((state) => state.preview?.first_rows || []);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (preview.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [preview]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="mt-6"
        >
          <Card>
            <CardHeader>
              <CardTitle>Table preview</CardTitle>
              <CardDescription>Verify the first 5 rows of your data</CardDescription>
            </CardHeader>
            <CardContent>
              {preview.length === 0 ? (
                <div className="font-cabin font-normal dark:bg-surface-container-highest-dark dark:text-on-surface-dark rounded-lg p-2">
                  No data available for preview
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      {Object.keys(preview[0]).map((key) => (
                        <TableHead key={key}>{key}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {preview.slice(0, 5).map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, index) => (
                          <TableCell key={index}>{value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TablePreview;