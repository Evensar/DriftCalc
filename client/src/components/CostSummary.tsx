import { Button } from "@/components/ui/button";
import { categoryLabels, formatCurrency } from "@/lib/pricing";
import { RefreshCw, Download, Share } from "lucide-react";

interface CostSummaryProps {
  categoryTotals: Record<string, number>;
  grandTotal: number;
  onReset: () => void;
}

export function CostSummary({ categoryTotals, grandTotal, onReset }: CostSummaryProps) {
  const handleExport = () => {
    // Create a simple text summary
    let summary = "IT-tjänster Kostnadssammanfattning\n";
    summary += "=====================================\n\n";
    
    Object.entries(categoryTotals).forEach(([category, total]) => {
      if (total > 0) {
        summary += `${categoryLabels[category]}: ${formatCurrency(total)}\n`;
      }
    });
    
    summary += `\nTotal årskostnad: ${formatCurrency(grandTotal)}\n`;
    summary += "Alla priser exklusive moms\n";
    
    // Create and download file
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'it-kostnader.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'IT-tjänster Kostnadskalkyl',
      text: `Total årskostnad: ${formatCurrency(grandTotal)}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <i className="fas fa-calculator text-blue-600 mr-3"></i>
        Kostnadssammanfattning
      </h3>
      
      <div className="space-y-4 mb-6" data-testid="cost-breakdown">
        {Object.entries(categoryTotals).map(([category, total]) => {
          if (total <= 0) return null;
          
          return (
            <div key={category} className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="font-medium text-gray-700">
                {categoryLabels[category]}
              </span>
              <span className="font-semibold text-gray-900" data-testid={`total-${category}`}>
                {formatCurrency(total)}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">
            Total årskostnad
          </span>
          <span className="text-2xl font-bold text-blue-600" data-testid="grand-total">
            {formatCurrency(grandTotal)}
          </span>
        </div>
        <p className="text-sm text-gray-500 mt-2">Alla priser exklusive moms</p>
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
        <Button 
          onClick={handleExport}
          className="w-full bg-blue-600 hover:bg-blue-700"
          data-testid="button-export"
        >
          <Download className="mr-2 h-4 w-4" />
          Exportera kalkyl
        </Button>
        <Button 
          onClick={handleShare}
          variant="outline"
          className="w-full"
          data-testid="button-share"
        >
          <Share className="mr-2 h-4 w-4" />
          Dela kalkyl
        </Button>
        <Button 
          onClick={onReset}
          variant="outline"
          className="w-full"
          data-testid="button-reset"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Återställ
        </Button>
      </div>
    </div>
  );
}
