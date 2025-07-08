
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"



interface Column {
  title: string;
  cell: string | ((row: any, rowIndex: number) => React.ReactNode);
}

interface TableProps {
  columns: Column[];
  data: any[];
  page?: number;
  pageSize?: number;
  total?: number;
  onChangePage?: (number: number) => void;
  onChangePageSize?: (number: number) => void;
  pagination?: boolean;
  noIndex?: boolean;
}


const TablePaginate = ({ data, columns, total, page = 1, pageSize = 10, noIndex = false, onChangePage, onChangePageSize, pagination = true }: TableProps) => {
  return (
    <>
      <div className="flex flex-col">
        <Table className="bg-white rounded-xs">
          <TableHeader>
            <TableRow >
              <TableHead className={`${noIndex && "hidden"} text-center w-[14px]`}>No</TableHead>
              {
          columns.map((column: Column, index: number) => (
            <TableHead className="text-center" key={index}>{column.title}</TableHead>
          ))
              }
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
          <TableCell colSpan={columns.length + (noIndex ? 0 : 1)} className="text-center py-8">
              Data no found
          </TableCell>
              </TableRow>
            ) : (
              data.map((row: any, rowIndex: number) => (
          <TableRow key={rowIndex}>
            <TableCell className={`${noIndex && "hidden"} text-center w-[14px]`}>
              {
                (page - 1) * pageSize + (rowIndex + 1)
              }
            </TableCell>
            {columns.map((column: Column, colIndex: number) => (
              <TableCell className="text-center" key={colIndex}>
                {typeof column.cell === "function"
            ? column.cell(row, rowIndex)
            : row[column.cell as string]}
              </TableCell>
            ))}
          </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <Pagination className={`${pagination ? "" : "hidden"}`} >
          <PaginationContent >
            <PaginationItem>
              <PaginationPrevious
          onClick={() => onChangePage && onChangePage(Math.max(1, page - 1))}
              />
              {(() => {
          const totalPages = Math.ceil(total / pageSize);
          let startPage = page;
          const endPage = Math.min(totalPages, startPage + 4);

          if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
          }

          const pages = [];
          for (let i = startPage; i <= endPage; i++) {
            pages.push(
              <PaginationLink
                key={i}
                isActive={i === page}
                onClick={() => onChangePage && onChangePage(i)}
              >
                {i}
              </PaginationLink>
            );
          }
          return pages;
              })()}
            </PaginationItem>
            <PaginationItem>
              <PaginationNext onClick={() => onChangePage && onChangePage(page + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  )
}

export default TablePaginate