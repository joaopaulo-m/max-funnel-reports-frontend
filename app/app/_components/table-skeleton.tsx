import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TableSkeleton = () => {
  return ( 
    <Table>
        <TableHeader>
          <TableRow>
            <TableHead><Skeleton className="w-full h-6" /></TableHead>
            <TableHead><Skeleton className="w-full h-6" /></TableHead>
            <TableHead><Skeleton className="w-full h-6" /></TableHead>
            <TableHead><Skeleton className="w-full h-6" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4}><Skeleton className="w-full h-8"/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}><Skeleton className="w-full h-8"/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}><Skeleton className="w-full h-8"/></TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}><Skeleton className="w-full h-8"/></TableCell>
          </TableRow>
        </TableBody>
      </Table>
  );
}

export { TableSkeleton };