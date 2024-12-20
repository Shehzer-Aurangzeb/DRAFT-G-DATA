/* eslint-disable consistent-return */
import { useLoading } from '@/state/loading/hooks';
import { useCallback, useState } from 'react';
import { api } from '@/config';
import { TConsentAssetsData } from '@/state/ourGData/types';

type DataField = {
  field_name: String;
  average_price: number;
  change: any;
}[];

export function usePortfolioStats() {
  const { isLoading, setIsLoading } = useLoading();
  const [isLoadingConsent, setIsLoadingConsent] = useState(false);

  const getPortfolioStatsForConsent = useCallback(
    async (id: number) => {
      setIsLoadingConsent(true);
      try {
        const { data } = await api.get(`api/portfolio_stats/?consent_id=${id}`);
        return data.data;
      } catch (error) {
        // console.error('Error fetching data:', error);
      } finally {
        setIsLoadingConsent(false);
      }
    },
    [setIsLoading],
  );
  const getPortfolioStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get('api/portfolio_stats/');
      return data.data;
    } catch (error) {
      // console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const processPortfolioStats = useCallback((dataConsent: any) => {
    const consentAssets: TConsentAssetsData[] = [];
    let totalAssetsValue = 0;
    dataConsent.forEach((consentData: any) => {
      console.log(consentData, consentData.consent_name)
      consentAssets.push({
        name: consentData.consent_name,
        price: consentData.avg_price_per_unit,
        quantity: consentData.available_data_count,
        total: consentData.available_data_market_value
      });
      totalAssetsValue += consentData.available_data_market_value;
    });

    return {
      consentAssets,
      totalAssetsValue,
    };
  }, []);

  return {
    isLoading,
    getPortfolioStatsForConsent,
    getPortfolioStats,
    processPortfolioStats,
    isLoadingConsent,
  };
}
