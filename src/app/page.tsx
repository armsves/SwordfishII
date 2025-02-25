import { ConnectButton } from "@/components/ConnectButton";
import { InfoList } from "@/components/InfoList";
import { ActionButtonList } from "@/components/ActionButtonList";
import Image from 'next/image';
import { WormholeButton } from "@/components/WormholeButton";

export default function Home() {

  return (
    <div className="page-container">
      <div className="header">
        <Image src="/swordfishII.png" alt="Logo" width={50} height={50} priority />
        <div className="header-text">Swordfish II - Easy Yield Optimizer</div>
        <div className="button-wrap">
          <ConnectButton />
        </div>
      </div>
      <div className="content-wrap">
        
      <WormholeButton />

      </div>
      <footer className="footer">
        <Image src="/reown.svg" alt="Reown" width={50} height={50} priority />
        <Image src="/rootstock.png" alt="Rootstock" width={50} height={50} priority />
        <Image src="/wormhole2.png" alt="Wormhole" width={50} height={50} priority />
      </footer>
    </div>
  );
}