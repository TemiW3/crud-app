'use client'

import { getCounterProgram, getCounterProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { use, useMemo } from 'react'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../use-transaction-toast'
import { toast } from 'sonner'

interface Task {
  item: string
  isDone: boolean
}
interface CreateEntryArgs {
  owner: PublicKey
  list_items: Task[]
}

export function useCounterProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getCounterProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getCounterProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['counter', 'all', { cluster }],
    queryFn: () => program.account.toDoListEntryState.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const createEntry = useMutation<string, Error, CreateEntryArgs>({
    mutationKey: ['todoEntry', 'create', { cluster }],
    mutationFn: async ({ owner, list_items }) => {
      // If only one task should be created at a time, use the first item
      const firstTask = list_items[0]
      return program.methods
        .createToDoListEntry({
          listItem: firstTask.item,
          isDone: firstTask.isDone,
        })
        .rpc()
    },
    onSuccess: (signature) => {
      transactionToast(signature)
      accounts.refetch()
    },
    onError: (error) => {
      toast.error(`Error creating entry: ${error.message}`)
    },
  })

  return {
    program,
    accounts,
    getProgramAccount,
    createEntry,
    programId,
  }
}

export function useCounterProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useCounterProgram()

  const accountQuery = useQuery({
    queryKey: ['counter', 'fetch', { cluster, account }],
    queryFn: () => program.account.toDoListEntryState.fetch(account),
  })

  const toggleTask = useMutation<string, Error, { index: number }>({
    mutationKey: ['todoEntry', 'toggle', { cluster, account }],
    mutationFn: async ({ index }) => {
      return program.methods.toggleStatus(index).rpc()
    },
    onSuccess: (signature) => {
      transactionToast(signature)
      accounts.refetch()
    },
    onError: (error) => {
      toast.error(`Error toggling task: ${error.message}`)
    },
  })

  const deleteTask = useMutation<string, Error, { index: number }>({
    mutationKey: ['todoEntry', 'delete', { cluster, account }],
    mutationFn: async ({ index }) => {
      return program.methods.removeItemFromToDoListEntry(index).rpc()
    },
    onSuccess: (signature) => {
      transactionToast(signature)
      accounts.refetch()
    },
    onError: (error) => {
      toast.error(`Error deleting task: ${error.message}`)
    },
  })

  const addTask = useMutation<string, Error, { newTask: Task }>({
    mutationKey: ['todoEntry', 'add', { cluster, account }],
    mutationFn: async ({ newTask }) => {
      // Map Task to the expected structure
      const newItem = {
        listItem: newTask.item,
        isDone: newTask.isDone,
      }
      return program.methods.addItemToToDoListEntry(newItem).rpc()
    },
    onSuccess: (signature) => {
      transactionToast(signature)
      accounts.refetch()
    },
    onError: (error) => {
      toast.error(`Error adding task: ${error.message}`)
    },
  })
  return {
    accountQuery,
    toggleTask,
    deleteTask,
    addTask,
    program,
  }
}
