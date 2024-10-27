"use client"

import { useState } from "react"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { TransactionTable } from "./components/transaction-table"
import { TransactionFilter } from "./components/transaction-filter"

export default function ReportsPage() {
  const { transactions, currency, deleteTransaction } = useStore()
  const [filter, setFilter] = useState<'all' | 'fund' | 'expense'>('all')

  const filteredTransactions = transactions
    .filter(t => filter === 'all' || t.type === filter)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  const handleDelete = (id: string) => {
    deleteTransaction(id)
    toast.success("Transaction deleted successfully")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Transaction Reports</h3>
          <TransactionFilter 
            value={filter} 
            onValueChange={(value) => setFilter(value as 'all' | 'fund' | 'expense')} 
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionTable 
              transactions={filteredTransactions}
              formatCurrency={formatCurrency}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}