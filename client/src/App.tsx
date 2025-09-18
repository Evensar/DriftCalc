import { Switch, Route, Router } from "wouter";
import { useHashLocation } from "./lib/useHashLocation";  // importera din hook
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Calculator from "@/pages/calculator";
import NotFound from "@/pages/not-found";

function Routes() {
  return (
    <Switch>
      <Route path="/" component={Calculator} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        {/* Byt ut Router här */}
        <Router hook={useHashLocation}>
          <Routes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
