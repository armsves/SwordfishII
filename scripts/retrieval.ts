import {
    wormhole
} from '@wormhole-foundation/sdk';
import evm from '@wormhole-foundation/sdk/evm';

async function manualVAARetrieval(srcTxHash: string) {
    // Init Wormhole object
    const wh = await wormhole('Mainnet', [evm]);
    
    // Get chain context for the source chain
    const sendChain = wh.getChain('Arbitrum');
    
    try {
        // Parse the transaction to get Wormhole messages
        const messages = await sendChain.parseTransaction(srcTxHash);
        
        if (messages.length === 0) {
            throw new Error('No Wormhole messages found in the transaction');
        }
        
        const whMessage = messages[0]; // Use the first message
        
        console.log('Parsed transaction:', {
            sequence: whMessage.sequence,
            emitterAddress: whMessage.emitter.address,
            srcTxHash
        });
        
        // Get the VAA using the new method
        const vaa = await wh.getVaa(
            whMessage,
            "TokenBridge:Transfer",
            60000
        );
        
        console.log('Retrieved VAA:', vaa);
        return vaa;
        
    } catch (error) {
        console.error('Error retrieving VAA:', error);
        throw error;
    }
}

// Example usage
(async () => {
    if (process.argv.length < 3) {
        console.error('Please provide a transaction hash as an argument');
        process.exit(1);
    }
    
    const txHash = process.argv[2];
    await manualVAARetrieval(txHash);
})();
