import PriceAlert from '../models/PriceAlert.js';

// Simulate external market prices
const getCurrentMarketPrice = async (produce) => {
  const mockPrices = {
    maize: 180,
    rice: 220,
    cassava: 100,
  };
  return mockPrices[produce.toLowerCase()] || 150;
};

export const checkAlerts = async () => {
  const alerts = await PriceAlert.find({ notified: false });
  for (const alert of alerts) {
    const marketPrice = await getCurrentMarketPrice(alert.produce);
    if (marketPrice >= alert.priceThreshold) {
      console.log(`🔔 Alert for ${alert.produce} - Market price is ${marketPrice}`);
      alert.notified = true;
      await alert.save();
    }
  }
};
