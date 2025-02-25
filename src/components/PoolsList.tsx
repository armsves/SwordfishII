'use client'
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import {
  useAppKitState,
  useAppKitTheme,
  useAppKitEvents,
  useAppKitAccount,
  useWalletInfo
   } from '@reown/appkit/react'

interface Pool {
  name: string;
  chain: string;
  apy: number;
  project: string;
  symbol: string;
  tvlUsd: number;
  apyBase: number | null;
  apyReward: number | null;
  rewardTokens: string[] | null;
  stablecoin: boolean;
  ilRisk: string;
  exposure: string;
  poolMeta: string | null;
  underlyingTokens: string[] | null;
  pool: string;
}

const PoolsList: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>([]);
  const { address, caipAddress, isConnected, embeddedWalletInfo } = useAppKitAccount();

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await fetch('https://yields.llama.fi/pools');
        const data = await response.json();
        const filteredPools: Pool[] = data.data
          .filter((pool: Pool) => 
            (pool.chain === 'Moonbeam' || pool.chain === 'Rootstock') && pool.tvlUsd > 10000
          )
          .sort((a: Pool, b: Pool) => b.apy - a.apy)
          .slice(0, 3);
        setPools(filteredPools);
        console.log('Pools fetched:', filteredPools);
      } catch (error) {
        console.error('Error fetching pools:', error);
      }
    };

    fetchPools();
    const interval = setInterval(fetchPools, 30000); // Reload every 30 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const hasOpenPosition = (pool: Pool) => {
    // Implement logic to check if there's any open position with the connected wallet address
    // This is a placeholder implementation
    return address !== null;
  };

  return (
    <div className="pools-list">
      <h2>Top 3 Pools by APY</h2>
      <ul>
        {pools.map((pool: Pool, index: number) => (
          <li key={pool.pool} className="pool-card">
            <div><strong>Chain:</strong> {pool.chain}</div>
            <div><strong>APY:</strong> {pool.apy}%</div>
            <div><strong>Symbol:</strong> {pool.symbol}</div>
            <div><strong>Pool:</strong> {pool.pool}</div>
            <div><strong>Underlying Tokens:</strong> {pool.underlyingTokens ? pool.underlyingTokens.join(', ') : 'N/A'}</div>
            <div className="pool-actions">
              <button className="deposit-button">Deposit</button>
              {hasOpenPosition(pool) && (
                <button className="withdraw-button">Withdraw</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoolsList;