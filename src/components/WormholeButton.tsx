import React, { useState, useEffect } from 'react';
import { wormhole } from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';

export const WormholeButton = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const initializeWormhole = async () => {
      const wh = await wormhole('Testnet', [evm]);
      // You can use the wh object to interact with Wormhole
    };
    initializeWormhole();
  }, []);

  const handleClick = async () => {
    if (!isConnected) {
      // Connect to Wormhole
      setIsConnected(true);
    }
    // Add your logic here after connecting
  };

  return (
    <button onClick={handleClick} className="wormhole-button">
      {isConnected ? 'Connected to Wormhole' : 'Connect to Wormhole'}
    </button>
  );
};
