"use client"

import { useEffect } from "react"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PlusCircle, MinusCircle, BarChart3, Settings } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { transactions, settings, initialized, initializeStore } = useStore()

  useEffect(() => {
    if (!initialized) {
      initializeStore()
    }
  }, [initialized, initializeStore])

  const totalFunds = transactions
    .filter(t => t.type === 'fund')
    .reduce((acc, t) => acc + t.amount, 0)

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)

  const remainingFunds = totalFunds - totalExpenses

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-600">
              {formatCurrency(totalFunds, settings.currency)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">
              {formatCurrency(totalExpenses, settings.currency)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Remaining Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {formatCurrency(remainingFunds, settings.currency)}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Link href="/add-fund">
          <Button size="lg" className="gap-2">
            <PlusCircle className="h-5 w-5" />
            Add Fund
          </Button>
        </Link>
        <Link href="/add-expense">
          <Button size="lg" variant="outline" className="gap-2">
            <MinusCircle className="h-5 w-5" />
            Add Expense
          </Button>
        </Link>
        <Link href="/reports">
          <Button size="lg" variant="secondary" className="gap-2">
            <BarChart3 className="h-5 w-5" />
            Reports
          </Button>
        </Link>
        <Link href="/settings">
          <Button size="lg" variant="ghost" className="gap-2">
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </Link>
      </div>
    </div>
  )
}