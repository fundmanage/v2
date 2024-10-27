import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Transaction {
  id: string;
  type: 'fund' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
}

interface Settings {
  currency: string;
  timezone: string;
}

interface FundStore {
  transactions: Transaction[];
  settings: Settings;
  initialized: boolean;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  updateSettings: (settings: Settings) => void;
  initializeStore: () => void;
}

export const useStore = create<FundStore>()(
  persist(
    (set) => ({
      transactions: [],
      settings: {
        currency: 'USD',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      initialized: false,

      initializeStore: () => {
        set({ initialized: true });
      },

      addTransaction: (transaction) => {
        const newTransaction = { 
          ...transaction, 
          id: crypto.randomUUID()
        };
        
        set((state) => ({
          transactions: [newTransaction, ...state.transactions],
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      updateSettings: (newSettings) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings
          }
        }));
      },
    }),
    {
      name: 'fund-store',
    }
  )
);