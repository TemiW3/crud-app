'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useCounterProgram } from './todo-data-access'
import { CounterCreate, CounterList } from './todo-ui'
import { AppHero } from '../app-hero'
import { ellipsify } from '@/lib/utils'

export default function TodoFeature() {
  const { publicKey } = useWallet()
  const { programId } = useCounterProgram()

  return publicKey ? (
    <div>
      <AppHero
        title="Todo List"
        subtitle={
          'Welcome to the Todo List app where you can add items to your to do list, mark them as done, delete items and also undo marking them as done! If you do not have to do list registered, you can create one too!'
        }
      >
        <p className="mb-6">
          Program ID : <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <CounterCreate />
      </AppHero>
      <CounterList />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
