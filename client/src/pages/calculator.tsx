import { useState, useEffect } from "react";
import {
  services as defaultServices,
  categoryLabels,
  categoryIcons,
} from "@/lib/pricing";
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import { ChevronDown, Trash2 } from "lucide-react";

const STORAGE_KEY = "cost-estimator-prices-v2";

interface Service {
  id: string;
  name: string;
  price: number;
  category: string;
  maxQuantity?: number;
}

function Calculator() {
  const [services, setServices] = useState<Service[]>(defaultServices);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [isEditing, setIsEditing] = useState(false);

  const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState(0);
  const [newServiceCategory, setNewServiceCategory] = useState("");

  // Ladda från localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      setServices(parsed.services);
      setPrices(parsed.prices);
    } else {
      setPrices(
        defaultServices.reduce((acc, s) => ({ ...acc, [s.id]: s.price }), {})
      );
    }
  }, []);

  // Spara till localStorage
  useEffect(() => {
    if (services.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ services, prices }));
    }
  }, [services, prices]);

  const handleQuantityChange = (id: string, newQty: number) => {
    setQuantities((prev) => ({ ...prev, [id]: newQty }));
  };

  const handleServiceChange = (id: string, key: keyof Service, value: any) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: value } : s))
    );
    if (key === "price") {
      setPrices((prev) => ({ ...prev, [id]: Number(value) }));
    }
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setPrices((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
    setQuantities((prev) => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleAddService = () => {
    if (!newServiceName || newServicePrice <= 0 || !newServiceCategory) return;
    const id = `${Date.now()}`;
    const newService: Service = {
      id,
      name: newServiceName,
      price: newServicePrice,
      category: newServiceCategory,
    };
    setServices((prev) => [...prev, newService]);
    setPrices((prev) => ({ ...prev, [id]: newServicePrice }));
    setNewServiceName("");
    setNewServicePrice(0);
    setNewServiceCategory("");
  };

  // Excel-export
  const exportToExcel = () => {
    const rows = services.map((s) => {
      const price = prices[s.id] ?? s.price;
      const qty = quantities[s.id] || 0;
      const total = price * qty;
      return {
        Kategori: categoryLabels[s.category] ?? s.category,
        Tjänst: s.name,
        Pris: price,
        Antal: qty,
        Summa: total,
      };
    });

    const totalSum = rows.reduce((acc, r) => acc + r.Summa, 0);
    rows.push({
      Kategori: "TOTAL",
      Tjänst: "",
      Pris: 0,
      Antal: 0,
      Summa: totalSum,
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Kalkyl");

    XLSX.writeFile(workbook, "kostnadskalkyl.xlsx");
  };

  // Rensa alla antal
  const clearQuantities = () => {
    setQuantities({});
  };

  const totalCost = services.reduce((sum, s) => {
    const qty = quantities[s.id] || 0;
    const price = prices[s.id] || s.price;
    return sum + qty * price;
  }, 0);

  // Gruppera tjänster per kategori
  const groupedServices = services.reduce((acc, s) => {
    if (!acc[s.category]) acc[s.category] = [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="p-4 max-w-full">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-2">
        <h1 className="text-xl font-bold">Kostnadskalkylator</h1>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Spara ändringar" : "Redigera"}
          </Button>
          <Button onClick={clearQuantities} variant="secondary">
            Rensa
          </Button>
          <Button onClick={exportToExcel}>Exportera till Excel</Button>
        </div>
      </div>

      {/* Accordion för kategorier */}
      <Accordion type="multiple" className="w-full">
        {Object.entries(groupedServices).map(([category, items]) => (
          <AccordionItem
            key={category}
            value={category}
            className="mb-2 border-none"
          >
            <AccordionTrigger className="w-full bg-blue-100 px-4 min-h-[44px] font-semibold hover:bg-blue-200 flex items-center justify-between rounded-lg outline-none border-none focus:outline-none focus:ring-0 transition-colors">
              <div className="flex items-center">
                <i className={`${categoryIcons[category]} mr-2`}></i>
                <span>{categoryLabels[category] ?? category}</span>
              </div>
              <div className="w-4 flex justify-center">
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
              </div>
            </AccordionTrigger>
            <AccordionContent className="mt-2">
              <div className="overflow-x-auto">
                <table className="min-w-full table-fixed border mb-4">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-2 text-left">Tjänst</th>
                      <th className="p-2 text-left">Pris</th>
                      <th className="p-2 text-left">Kategori</th>
                      <th className="p-2 text-left">Antal</th>
                      <th className="p-2 text-left">Summa</th>
                      {isEditing && <th className="p-2"></th>}
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((s) => {
                      const price = prices[s.id] ?? s.price;
                      const qty = quantities[s.id] || 0;
                      return (
                        <tr key={s.id} className="border-t">
                          <td className="p-2">
                            {isEditing ? (
                              <input
                                type="text"
                                className="border rounded px-2 py-1 w-full"
                                value={s.name}
                                onChange={(e) =>
                                  handleServiceChange(s.id, "name", e.target.value)
                                }
                              />
                            ) : (
                              s.name
                            )}
                          </td>
                          <td className="p-2">
                            {isEditing ? (
                              <input
                                type="number"
                                className="border rounded px-2 py-1 w-24"
                                value={price}
                                onChange={(e) =>
                                  handleServiceChange(s.id, "price", Number(e.target.value))
                                }
                              />
                            ) : (
                              `${price} kr`
                            )}
                          </td>
                          <td className="p-2">
                            {isEditing ? (
                              <input
                                type="text"
                                className="border rounded px-2 py-1 w-32"
                                value={s.category}
                                onChange={(e) =>
                                  handleServiceChange(s.id, "category", e.target.value)
                                }
                              />
                            ) : (
                              categoryLabels[s.category] ?? s.category
                            )}
                          </td>
                          <td className="p-2">
                            <input
                              type="number"
                              className="border rounded px-2 py-1 w-20"
                              value={qty}
                              min={0}
                              max={s.maxQuantity ?? undefined}
                              onChange={(e) =>
                                handleQuantityChange(s.id, Number(e.target.value))
                              }
                            />
                          </td>
                          <td className="p-2">{qty * price} kr</td>
                          {isEditing && (
                            <td className="p-2 text-center">
                              <button
                                onClick={() => handleDeleteService(s.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {isEditing && (
        <div className="mt-4 flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Tjänstens namn"
            className="border rounded px-2 py-1"
            value={newServiceName}
            onChange={(e) => setNewServiceName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Pris"
            className="border rounded px-2 py-1 w-24"
            value={newServicePrice}
            onChange={(e) => setNewServicePrice(Number(e.target.value))}
          />
          <input
            type="text"
            placeholder="Kategori"
            className="border rounded px-2 py-1 w-40"
            value={newServiceCategory}
            onChange={(e) => setNewServiceCategory(e.target.value)}
          />
          <Button onClick={handleAddService}>+ Lägg till tjänst</Button>
        </div>
      )}

      <div className="mt-4 p-2 bg-gray-50 border rounded text-right">
        <strong>Total kostnad:</strong> {totalCost} kr
      </div>
    </div>
  );
}

export default Calculator;
