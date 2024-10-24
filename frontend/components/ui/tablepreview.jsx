import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

const TablePreview = ({data}) => {

  return (
    <div className="mt-6">
      <Card>
        <CardHeader>
            <CardTitle>Table preview</CardTitle>
            <CardDescription>Verify the first 5 rows of your data</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        {Object.keys(data[0]).map((key) => (
                            <TableHead key={key}>{key}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.slice(0, 5).map((row, index) => (
                        <TableRow key={index}>
                            {Object.values(row).map((value, index) => (
                                <TableCell key={index}>{value}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TablePreview;
