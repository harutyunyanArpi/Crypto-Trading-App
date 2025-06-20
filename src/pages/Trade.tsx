import { useEffect } from "react";

import { useAllCryptoAssets } from "@/hooks/queries/useAllCryptoAssets";
import { useAuthStore } from "@/store/authStore";

import TradePageContent from "@/components/TradePageContent";

export default function TradePage() {
  const { data } = useAllCryptoAssets();

  useEffect(() => {
    const { isSessionExpired, logout } = useAuthStore.getState();
    if (isSessionExpired()) {
      logout();
      alert("Your session has expired. Please log in to continue.");
    }
  }, []);

  return <TradePageContent pages={data?.pages?.flat() ?? []} />;
}
