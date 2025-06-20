import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import { toast } from "sonner";
import { SwapMode, ButtonVariants } from "@/enums";
import type { CryptoAsset } from "@/types/cryptoAsset.types";

import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import styles from "./TradePageContent.module.scss";

export default function TradePageContent(data: { pages: CryptoAsset[] }) {
  const assets = data?.pages.flat() ?? [];
  const [selectedId, setSelectedId] = useState(assets?.[0]?.id ?? "");
  const [swapMode, setSwapMode] = useState<SwapMode>(SwapMode.CryptoToFiat);
  const [cryptoInput, setCryptoInput] = useState("");
  const [fiatInput, setFiatInput] = useState("");

  const selectedAsset = useMemo(
    () => assets?.find((a) => a.id === selectedId),
    [selectedId, assets],
  );

  // Update inputs based on swap mode and price
  useEffect(() => {
    const price = selectedAsset?.current_price ?? 0;
    if (!price) return;

    if (swapMode === SwapMode.CryptoToFiat) {
      const crypto = parseFloat(cryptoInput);
      setFiatInput(!isNaN(crypto) ? (crypto * price).toFixed(2) : "");
    } else {
      const fiat = parseFloat(fiatInput);
      setCryptoInput(!isNaN(fiat) ? (fiat / price).toFixed(6) : "");
    }
  }, [cryptoInput, fiatInput, swapMode, selectedAsset]);

  const AssetSelect = (
    <Select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
      {assets.map((asset) => (
        <option key={asset.id} value={asset.id}>
          {asset.name}
        </option>
      ))}
    </Select>
  );

  return (
    <div className={styles.container}>
      <div
        className={clsx(styles.card, {
          [styles.column]: swapMode === SwapMode.CryptoToFiat,
          [styles.reverseColumn]: swapMode !== SwapMode.CryptoToFiat,
        })}
      >
        <div className={styles.fieldsWrapper}>
          <Input
            type="number"
            min="0"
            value={cryptoInput}
            readOnly={swapMode !== SwapMode.CryptoToFiat}
            onChange={(e) => {
              const value = e.target.value;
              const number = parseFloat(value);
              if (value === "" || number >= 0) {
                setCryptoInput(value);
              } else {
                toast.warning("Please enter a positive value.");
              }
            }}
            placeholder="Crypto Amount"
          />
          {AssetSelect}
        </div>
        <div className={styles.fieldsWrapper}>
          <Button
            variant={ButtonVariants.PRIMARY}
            onClick={() =>
              setSwapMode((mode) =>
                mode === SwapMode.CryptoToFiat
                  ? SwapMode.FiatToCrypto
                  : SwapMode.CryptoToFiat,
              )
            }
          >
            ↕ Swap
          </Button>
        </div>
        <div className={styles.fieldsWrapper}>
          <Input
            type="number"
            min="0"
            readOnly={swapMode === SwapMode.CryptoToFiat}
            value={fiatInput}
            onChange={(e) => {
              const value = e.target.value;
              const number = parseFloat(value);
              if (value === "" || number >= 0) {
                setFiatInput(value);
              } else {
                toast.warning("Please enter a positive value.");
              }
            }}
            placeholder="USD Amount"
          />
          <span>USD</span>
        </div>
      </div>
    </div>
  );
}
