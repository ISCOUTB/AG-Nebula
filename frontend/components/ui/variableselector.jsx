import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { MousePointerClick, MousePointerClickIcon } from 'lucide-react';

const VariableSelector = () => {
  return (
    <div className="flex flex-col mt-6">
      <div className="grid items-center w-full h-14 dark:bg-secondary-container-dark dark:text-on-secondary-container-dark p-4 rounded-full transition-colors">
        <h2 className="font-montserrat font-semibold">
          Select your outcome variable
        </h2>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Select your predictor variables</CardTitle>
          <MousePointerClickIcon />
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default VariableSelector;
