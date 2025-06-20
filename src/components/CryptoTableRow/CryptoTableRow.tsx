import { type FC } from "react";
import type { CryptoAsset } from "@/types/cryptoAsset.types";

import ActionMenu from "@/components/ui/ActionMenu";

import styles from "./CryptoTableRow.module.scss";

type Props = {
  asset: CryptoAsset;
};

const CryptoTableRow: FC<Props> = ({ asset }) => {
  const handleBuy = (asset: CryptoAsset) => {
    alert(`Buying ${asset.name}`);
  };

  const handleSell = (asset: CryptoAsset) => {
    alert(`Selling ${asset.name}`);
  };

  return (
    <tr>
      <td>
        <div className={styles.assetName}>
          <img src={asset.image} alt={`${asset.name} logo`} />
          <span>{asset.name}</span>
        </div>
      </td>
      <td>${asset.current_price?.toLocaleString()}</td>
      <td className="flex-center">
        <ActionMenu
          actions={[
            { label: "Buy", onClick: () => handleBuy(asset) },
            { label: "Sell", onClick: () => handleSell(asset) },
          ]}
        />
      </td>
    </tr>
  );
};

export default CryptoTableRow;
