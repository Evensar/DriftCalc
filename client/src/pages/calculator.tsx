import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ServiceSection } from "@/components/ServiceSection";
import { CostSummary } from "@/components/CostSummary";
import { services, categoryLabels, categoryIcons } from "@/lib/pricing";
import { RefreshCw } from "lucide-react";

export default function Calculator() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const servicesByCategory = useMemo(() => {
    return services.reduce((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {} as Record<string, typeof services>);
  }, []);

  const { categoryTotals, grandTotal } = useMemo(() => {
    const totals: Record<string, number> = {};
    let grand = 0;

    services.forEach(service => {
      const quantity = quantities[service.id] || 0;
      if (quantity > 0) {
        const cost = quantity * service.price;
        totals[service.category] = (totals[service.category] || 0) + cost;
        grand += cost;
      }
    });

    return { categoryTotals: totals, grandTotal: grand };
  }, [quantities]);

  const handleQuantityChange = (serviceId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [serviceId]: quantity
    }));
  };

  const handleReset = () => {
    setQuantities({});
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <i className="fas fa-server text-blue-600 text-2xl mr-3"></i>
              <h1 className="text-xl font-semibold text-gray-900">
                IT-tjänster Kostnadskalkylator
              </h1>
            </div>
            <Button
              variant="outline"
              onClick={handleReset}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700"
              data-testid="button-reset-header"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Återställ
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Services Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
              <ServiceSection
                key={category}
                title={categoryLabels[category]}
                icon={categoryIcons[category]}
                services={categoryServices}
                quantities={quantities}
                onQuantityChange={handleQuantityChange}
              />
            ))}
          </div>

          {/* Cost Summary */}
          <div className="lg:col-span-1">
            <CostSummary
              categoryTotals={categoryTotals}
              grandTotal={grandTotal}
              onReset={handleReset}
            />
          </div>
          
        </div>
      </main>
    </div>
  );
}
