"use client"

import { format } from "date-fns"
import { Transaction } from "@/lib/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DeleteTransactionButton } from "./delete-transaction-button"

interface TransactionTableProps {
  transactions: Transaction[]
  formatCurrency: (amount: number) => string
  onDelete: (id: string) => void
}

export function TransactionTable({ 
  transactions, 
  formatCurrency, 
  onDelete 
}: TransactionTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            <TableCell>
              {format(new Date(transaction.date), 'MMM d, yyyy')}
            </TableCell>
            <TableCell className="capitalize">
              {transaction.type}
            </TableCell>
            <TableCell>
              {transaction.category}
            </TableCell>
            <TableCell>
              {transaction.description}
            </TableCell>
            <TableCell className={
              transaction.type === 'fund' 
                ? 'text-green-600 font-medium'
                : 'text-red-600 font-medium'
            }>
              {formatCurrency(transaction.amount)}
            </TableCell>
            <TableCell>
              <DeleteTransactionButton onDelete={() => onDelete(transaction.id)} />
            </TableCell>
          </TableRow>
        ))}
        {transactions.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-4">
              No transactions found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}