export type TradeDirection = "CRYPTO_TO_FIAT" | "FIAT_TO_CRYPTO";

export type TradeFormState = {
  cryptoAmount: string;
  fiatAmount: string;
  selectedAsset: string;
  direction: TradeDirection;
};
