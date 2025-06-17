'use client'

import { Keypair, PublicKey } from '@solana/web3.js'
import { useCounterProgram, useCounterProgramAccount } from './counter-data-access'
import { ellipsify } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useEffect } from 'react'

import { Program } from '@coral-xyz/anchor'
import { TodoList } from '../../../anchor/target/types/todo_list'

interface Task {
  listItem: string
  isDone: boolean
}

export function CounterCreate() {
  const [item, setListItem] = useState('')
  const isDone = false
  const { createEntry } = useCounterProgram()
  const { publicKey } = useWallet()

  const isFromValid = item.trim() !== ''

  const [hasToDoList, setHasToDoList] = useState<boolean>(false)
  const [checkingToDoList, setCheckingToDoList] = useState<boolean>(true)
  const { program } = useCounterProgram()

  // Check if user already has a todo list
  // This effect runs when publicKey or getProgram changes
  // and updates hasToDoList accordingly
  useEffect(() => {
    const checkToDoList = async () => {
      setCheckingToDoList(true)
      try {
        if (publicKey && program) {
          const [todoPda] = PublicKey.findProgramAddressSync(
            [Buffer.from('todo'), publicKey.toBuffer()],
            program.programId,
          )
          await program.account.toDoListEntryState.fetch(todoPda)
          setHasToDoList(true)
        } else {
          setHasToDoList(false)
        }
      } catch (err) {
        setHasToDoList(false)
      } finally {
        setCheckingToDoList(false)
      }
    }
    checkToDoList()
  }, [publicKey, program])

  const handleSubmit = () => {
    if (publicKey && isFromValid) {
      createEntry.mutateAsync({
        owner: publicKey,
        list_items: [{ item, isDone }],
      })
    }
  }

  if (!publicKey) {
    return (
      <div className="alert alert-warning">
        <span>Please connect your wallet </span>
      </div>
    )
  }

  return hasToDoList ? (
    <div></div>
  ) : (
    <div>
      <input
        type="text"
        placeholder="Enter item"
        value={item}
        onChange={(e) => setListItem(e.target.value)}
        className="input input-bordered w-full max-w-xs mb-2"
      />
      <Button
        onClick={handleSubmit}
        disabled={!isFromValid || createEntry.isPending}
        className="btn btn-xs lg:btn-md btn-primary"
      >
        Create Entry
      </Button>
    </div>
  )
}

export function CounterList() {
  const { accounts, getProgramAccount } = useCounterProgram()

  if (getProgramAccount.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }
  if (!getProgramAccount.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }

  return (
    <div className={'space-y-6'}>
      {accounts.isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : accounts.data?.length ? (
        <div className="grid md:grid-cols-2 gap-4">
          {accounts.data?.map((account) => (
            <CounterCard key={account.publicKey.toString()} account={account.publicKey} />
          ))}
        </div>
      ) : (
        <div className="text-center">
          <h2 className={'text-2xl'}>No accounts</h2>
          No accounts found. Create one above to get started.
        </div>
      )}
    </div>
  )
}

function CounterCard({ account }: { account: PublicKey }) {
  const { accountQuery, toggleTask, deleteTask, addTask } = useCounterProgramAccount({
    account,
  })

  const [item, setListItem] = useState('')

  const isFromValid = item.trim() !== ''

  const newItem = {
    item: item,
    isDone: false,
  }

  const handleAddTask = () => {
    if (publicKey && isFromValid) {
      addTask.mutateAsync({
        newTask: newItem,
      })
    }
  }

  const { publicKey } = useWallet()
  return accountQuery.isLoading ? (
    <span className="loading loading-spinner loading-lg"></span>
  ) : (
    <Card className="bg-base-100 shadow-xl">
      <CardHeader>
        <CardTitle>Account: {ellipsify(account.toString(), 6)}</CardTitle>
        {/* <CardDescription>
          <ExplorerLink address={account} />
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        {accountQuery.data?.list.map((task: Task, index: number) => (
          <div key={index} className="flex items-center justify-between mb-2">
            <span className={task.isDone ? 'line-through' : ''}>{task.listItem}</span>
            <div className="flex space-x-2">
              <Button
                onClick={() => toggleTask.mutateAsync({ index })}
                disabled={toggleTask.isPending}
                variant="outline"
              >
                {task.isDone ? 'Undo' : 'Done'}
              </Button>
              {publicKey && (
                <Button
                  onClick={() => deleteTask.mutateAsync({ index })}
                  disabled={deleteTask.isPending}
                  variant="destructive"
                >
                  Delete
                </Button>
              )}
            </div>
          </div>
        ))}
        {publicKey && (
          <div className="mt-4">
            <input
              type="text"
              placeholder="Add new task"
              value={item}
              onChange={(e) => setListItem(e.target.value)}
              className="input input-bordered w-full max-w-xs mb-2"
            />
            <Button
              onClick={handleAddTask}
              disabled={!isFromValid || addTask.isPending}
              className="btn btn-primary mt-2"
            >
              Add Task
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
