import { Toaster } from "sonner";
import { useTheme } from "../hooks/useTheme";

export default function ThemedToaster() {
  const { resolvedTheme } = useTheme();
  return (
    <Toaster
      theme={resolvedTheme}
      position="top-center"
      richColors
      duration={3000}
    />
  );
}
