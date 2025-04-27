import { useCallback, useState } from "react";

export function useToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  return [isOpen, toggle];
}
