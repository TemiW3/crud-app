// Here we export some useful types and functions for interacting with the Anchor program.
import { AnchorProvider, Program } from '@coral-xyz/anchor'
import { Cluster, PublicKey } from '@solana/web3.js'
import CounterIDL from '../target/idl/todo_list.json'
import type { TodoList } from '../target/types/todo_list'

// Re-export the generated IDL and type
export { TodoList, CounterIDL }

// The programId is imported from the program IDL.
export const COUNTER_PROGRAM_ID = new PublicKey(CounterIDL.address)

// This is a helper function to get the Counter Anchor program.
export function getCounterProgram(provider: AnchorProvider, address?: PublicKey): Program<TodoList> {
  return new Program(
    { ...CounterIDL, address: address ? address.toBase58() : CounterIDL.address } as TodoList,
    provider,
  )
}

// This is a helper function to get the program ID for the Counter program depending on the cluster.
export function getCounterProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
      // This is the program ID for the Counter program on devnet and testnet.
      return new PublicKey('5FGL1x4ZsJcV8MiiUh7HtBgJEomVFopRAX1GNbF3xxTv')
    case 'mainnet-beta':
    default:
      return COUNTER_PROGRAM_ID
  }
}
