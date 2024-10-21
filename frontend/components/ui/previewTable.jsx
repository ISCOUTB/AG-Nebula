import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHeader,
    TableRow
  } from "@/components/ui/table";

const PreviewTable = ({data}) => {
  return (
    <div>
        <Table className="mt-2 bg-surface dark:bg-[#171C20] dark:text-on-surface-dark rounded-lg">
            <TableCaption className="font-cabin text-outline dark:text-outline-dark">
              This is the first 5 rows of your data
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-surface-container text-on-surface hover:bg-surface-variant">
                {Object.keys(data[0]).map(key =>
                  <TableCell
                    key={key}
                    className="font-montserrat font-semibold border-outline/30"
                  >
                    {key}
                  </TableCell>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((row, index) =>
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
  )
}

export default PreviewTable