import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ServiceItem } from "@/lib/pricing";

interface ServiceSectionProps {
  title: string;
  icon: string;
  services: ServiceItem[];
  quantities: Record<string, number>;
  onQuantityChange: (serviceId: string, quantity: number) => void;
}

export function ServiceSection({ 
  title, 
  icon, 
  services, 
  quantities, 
  onQuantityChange 
}: ServiceSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-6">
        <i className={`${icon} text-blue-600 text-lg mr-3`}></i>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div key={service.id} className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <Label className="text-sm font-medium text-gray-700">
                  {service.name}
                </Label>
                <div className="text-xs text-gray-500 mt-1 whitespace-pre-line">
                  {service.description}
                </div>
              </div>
              <Input
                type="number"
                className="w-20 ml-3"
                min="0"
                max={service.maxQuantity}
                placeholder="0"
                value={quantities[service.id] || ''}
                onChange={(e) => {
                  const value = parseInt(e.target.value) || 0;
                  if (value >= 0 && (!service.maxQuantity || value <= service.maxQuantity)) {
                    onQuantityChange(service.id, value);
                  }
                }}
                data-testid={`input-${service.id}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
