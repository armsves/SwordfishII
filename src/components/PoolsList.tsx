'use client'
import React, { useState, useEffect } from 'react';

interface Pool {
  id: string;
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
  pool: string; // Add this line
}

const PoolsList: React.FC = () => {
  const [pools, setPools] = useState<Pool[]>([]);

  useEffect(() => {
    const fetchPools = async () => {
      try {
        const response = await fetch('https://yields.llama.fi/pools');
        const data = await response.json();
        const filteredPools: Pool[] = data.data
          .filter((pool: Pool) => pool.chain === 'Moonbeam' || pool.chain === 'Rootstock')
          .sort((a: Pool, b: Pool) => b.apy - a.apy)
          .slice(0, 10);
        setPools(filteredPools);
        console.log('Pools fetched:', filteredPools);
      } catch (error) {
        console.error('Error fetching pools:', error);
      }
    };

    fetchPools();
  }, []);

  return (
    <div className="pools-list">
      <h2>Top 10 Pools by APY</h2>
      <ul>
        {pools.map((pool: Pool) => (
          <li key={pool.id}>
            <div><strong>Name:</strong> {pool.name}</div>
            <div><strong>Chain:</strong> {pool.chain}</div>
            <div><strong>APY:</strong> {pool.apy}%</div>
            <div><strong>Project:</strong> {pool.project}</div>
            <div><strong>Symbol:</strong> {pool.symbol}</div>
            <div><strong>TVL (USD):</strong> ${pool.tvlUsd.toLocaleString()}</div>
            <div><strong>APY Base:</strong> {pool.apyBase ? `${pool.apyBase}%` : 'N/A'}</div>
            <div><strong>APY Reward:</strong> {pool.apyReward ? `${pool.apyReward}%` : 'N/A'}</div>
            <div><strong>Reward Tokens:</strong> {pool.rewardTokens ? pool.rewardTokens.join(', ') : 'N/A'}</div>
            <div><strong>Stablecoin:</strong> {pool.stablecoin ? 'Yes' : 'No'}</div>
            <div><strong>IL Risk:</strong> {pool.ilRisk}</div>
            <div><strong>Exposure:</strong> {pool.exposure}</div>
            <div><strong>Pool Meta:</strong> {pool.poolMeta ? pool.poolMeta : 'N/A'}</div>
            <div><strong>Pool:</strong> {pool.pool}</div> {/* Display the pool field */}
            <div><strong>Underlying Tokens:</strong> {pool.underlyingTokens ? pool.underlyingTokens.join(', ') : 'N/A'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoolsList;