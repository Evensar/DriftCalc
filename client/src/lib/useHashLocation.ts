import { useState, useEffect } from "react";

export function useHashLocation() {
  const [hash, setHash] = useState(
    () => window.location.hash.replace(/^#/, "") || "/"
  );

  useEffect(() => {
    const onHashChange = () =>
      setHash(window.location.hash.replace(/^#/, "") || "/");

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (to: string) => {
    window.location.hash = to;
  };

  return [hash, navigate] as const;
}
