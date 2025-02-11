'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { XIcon } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [scenarios, setScenarios] = useState<
    {
      initialAmount: number
      dailySales: number
      grossProfitMargin: number
      monthlyExpense: number
    }[]
  >([])
  return (
    <div className='w-screen h-screen flex flex-col p-4'>
      <h1 className='text-3xl'>วางแผนการเงิน</h1>
      <form
        className='flex flex-col space-y-4 my-2 w-[500px] border rounded-md p-4'
        action={(formData) => {
          const initialAmount = formData.get('initial-amount') as string
          const dailySales = formData.get('daily-sales') as string
          const netProfitMargin = formData.get('gross-profit-margin') as string
          const monthlyExpense = formData.get('monthly-expense') as string
          setScenarios([
            ...scenarios,
            {
              initialAmount: Number(initialAmount),
              dailySales: Number(dailySales),
              grossProfitMargin: Number(netProfitMargin),
              monthlyExpense: Number(monthlyExpense),
            },
          ])
        }}>
        <Label>เงินลงทุน</Label>
        <Input type='number' name='initial-amount' />
        <Label>ยอดขายต่อวัน</Label>
        <Input type='number' name='daily-sales' />
        <Label>อัตรากำไรขั้นต้น (%)</Label>
        <Input type='number' min={1} max={100} name='gross-profit-margin' />
        <Label>ค่าใช้จ่ายต่อเดือน</Label>
        <Input type='number' name='monthly-expense' />
        <Button type='submit'>เพิ่ม</Button>
      </form>
      <Table className='max-w-[800px]'>
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>ลำดับ</TableHead>
            <TableHead className='text-center'>เงินลงทุน</TableHead>
            <TableHead className='text-center'>ยอดขายต่อวัน</TableHead>
            <TableHead className='text-center'>อัตรากำไรขั้นต้น</TableHead>
            <TableHead className='text-center'>ค่าใช้จ่ายต่อเดือน</TableHead>
            <TableHead className='text-center'>ยอดขายปีละ</TableHead>
            <TableHead className='text-center'>กำไรปีละ</TableHead>
            <TableHead className='text-center'>จำนวนปีที่คืนทุน</TableHead>
            <TableHead className='text-center'></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scenarios.map((scenario, index) => (
            <TableRow key={index}>
              <TableCell className='text-center'>{index + 1}</TableCell>
              <TableCell className='text-center'>
                {scenario.initialAmount.toLocaleString()}
              </TableCell>
              <TableCell className='text-center'>
                {scenario.dailySales.toLocaleString()}
              </TableCell>
              <TableCell className='text-center'>
                {`${scenario.grossProfitMargin}%`}
              </TableCell>
              <TableCell className='text-center'>
                {scenario.monthlyExpense.toLocaleString()}
              </TableCell>
              <TableCell className='text-center'>
                {(300 * scenario.dailySales).toLocaleString()}
              </TableCell>
              <TableCell className='text-center'>
                {(
                  (300 * scenario.dailySales * scenario.grossProfitMargin) /
                    100 -
                  scenario.monthlyExpense * 12
                ).toLocaleString()}
              </TableCell>
              <TableCell className='text-center'>
                {(
                  scenario.initialAmount /
                  ((300 * scenario.dailySales * scenario.grossProfitMargin) /
                    100 -
                    scenario.monthlyExpense * 12)
                ).toFixed(2)}
              </TableCell>
              <TableCell className='text-center'>
                <XIcon
                  className='cursor-pointer'
                  onClick={() =>
                    setScenarios(scenarios.filter((_, i) => i !== index))
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div>
        {scenarios.map((scenario, index) => (
          <div key={index} className=''>
            <p>เงินลงทุน: {scenario.initialAmount}</p>
            <p>ยอดขายต่อวัน: {scenario.dailySales}</p>
          </div>
        ))}
      </div> */}
    </div>
  )
}
