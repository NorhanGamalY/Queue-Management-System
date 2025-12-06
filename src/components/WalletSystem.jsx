"use client";

import { ArrowDownRight, ArrowUpRight, History, Plus, TrendingUp, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PaymentForm from './PaymentForm';

export default function WalletSystem() {
  const [walletData, setWalletData] = useState({
    balance: 0,
    currency: 'USD',
    transactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [addAmount, setAddAmount] = useState(50);

  useEffect(() => {
    fetchWalletData();
  }, []);

  const fetchWalletData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/wallet', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setWalletData(data.data || { balance: 0, currency: 'USD', transactions: [] });
      }
    } catch (error) {
      console.error('Error fetching wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFunds = async (paymentData) => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/wallet/add-funds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          amount: addAmount,
          paymentIntentId: paymentData.paymentIntentId,
        }),
      });

      if (response.ok) {
        toast.success(`$${addAmount} added to wallet!`);
        fetchWalletData();
        setShowAddFunds(false);
      }
    } catch (error) {
      toast.error('Failed to add funds');
    }
  };

  const formatTransaction = (transaction) => {
    const isCredit = transaction.type === 'credit';
    return {
      icon: isCredit ? <ArrowDownRight className="text-green-500" /> : <ArrowUpRight className="text-red-500" />,
      color: isCredit ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400',
      sign: isCredit ? '+' : '-',
    };
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-lg p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#359487] dark:border-[#C6FE02] mx-auto" />
      </div>
    );
  }

  if (showAddFunds) {
    return (
      <div>
        <button
          onClick={() => setShowAddFunds(false)}
          className="mb-4 text-[#359487] dark:text-[#C6FE02] hover:underline flex items-center gap-1"
        >
          ← Back to Wallet
        </button>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Amount to Add
          </label>
          <div className="flex gap-2">
            {[25, 50, 100, 200].map((amount) => (
              <button
                key={amount}
                onClick={() => setAddAmount(amount)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  addAmount === amount
                    ? 'bg-[#359487] dark:bg-[#C6FE02] text-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                ${amount}
              </button>
            ))}
          </div>
        </div>

        <PaymentForm
          amount={addAmount * 100} // Convert to cents
          currency="usd"
          onSuccess={handleAddFunds}
          onCancel={() => setShowAddFunds(false)}
          metadata={{ type: 'wallet_topup' }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wallet Balance Card */}
      <div className="bg-gradient-to-r from-[#359487] to-[#2a7569] dark:from-[#C6FE02] dark:to-[#a8d902] rounded-2xl shadow-lg p-6 text-white dark:text-black">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 dark:bg-black/20 rounded-full flex items-center justify-center">
              <Wallet size={24} />
            </div>
            <div>
              <p className="text-sm opacity-90">Wallet Balance</p>
              <p className="text-3xl font-bold">
                ${walletData.balance?.toFixed(2) || '0.00'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowAddFunds(true)}
            className="bg-white dark:bg-black text-[#359487] dark:text-[#C6FE02] px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Add Funds
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20 dark:border-black/20">
          <div>
            <p className="text-xs opacity-75">This Month</p>
            <p className="text-lg font-bold">
              ${walletData.transactions
                ?.filter(t => new Date(t.createdAt).getMonth() === new Date().getMonth())
                ?.reduce((sum, t) => sum + (t.type === 'debit' ? t.amount : 0), 0)
                ?.toFixed(2) || '0.00'}
            </p>
          </div>
          <div>
            <p className="text-xs opacity-75">Total Transactions</p>
            <p className="text-lg font-bold">{walletData.transactions?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-[#2b2825] rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <History size={20} />
            Recent Transactions
          </h3>
          <button className="text-sm text-[#359487] dark:text-[#C6FE02] hover:underline">
            View All
          </button>
        </div>

        {walletData.transactions && walletData.transactions.length > 0 ? (
          <div className="space-y-3">
            {walletData.transactions.slice(0, 5).map((transaction) => {
              const format = formatTransaction(transaction);
              return (
                <div
                  key={transaction._id || transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      {format.icon}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 dark:text-white">
                        {transaction.description || (transaction.type === 'credit' ? 'Added Funds' : 'Payment')}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(transaction.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <p className={`font-bold ${format.color}`}>
                    {format.sign}${transaction.amount?.toFixed(2)}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <History size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No transactions yet</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Add funds to start using your wallet
            </p>
          </div>
        )}
      </div>

      {/* Wallet Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#2b2825] rounded-xl shadow p-4 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="text-blue-600 dark:text-blue-400" size={24} />
          </div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Fast Payments</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Pay instantly with wallet balance
          </p>
        </div>

        <div className="bg-white dark:bg-[#2b2825] rounded-xl shadow p-4 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <Wallet className="text-green-600 dark:text-green-400" size={24} />
          </div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Secure</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Bank-level security encryption
          </p>
        </div>

        <div className="bg-white dark:bg-[#2b2825] rounded-xl shadow p-4 text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
            <History className="text-purple-600 dark:text-purple-400" size={24} />
          </div>
          <h4 className="font-semibold text-gray-800 dark:text-white mb-1">History</h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Track all your transactions
          </p>
        </div>
      </div>
    </div>
  );
}
