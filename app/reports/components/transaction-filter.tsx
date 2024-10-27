"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TransactionFilterProps {
  value: string
  onValueChange: (value: string) => void
}

export function TransactionFilter({ value, onValueChange }: TransactionFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter transactions" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Transactions</SelectItem>
        <SelectItem value="fund">Funds Only</SelectItem>
        <SelectItem value="expense">Expenses Only</SelectItem>
      </SelectContent>
    </Select>
  )
}