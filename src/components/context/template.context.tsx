import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

import { useDisclosure } from "@mantine/hooks";

interface TemplateContextProps {
  opened: boolean;
  open: (e: string) => void;
  close: (e: string) => void;
  toggle: () => void;
  target: string | null;
}

const TemplateContext = createContext<TemplateContextProps | null>(null);

export default function TemplateProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [target, setTarget] = useState<string | null>(null);
  const [opened, { open, close, toggle }] = useDisclosure();

  const handleOpen = useCallback(
    (value: string) => {
      setTarget(value);
      open();
    },
    [open]
  );
  const handleClose = useCallback(
    (value: string) => {
      setTarget(value);
      close();
    },
    [close]
  );

  return (
    <TemplateContext.Provider
      value={{ target, opened, open: handleOpen, close: handleClose, toggle }}
    >
      {children}
    </TemplateContext.Provider>
  );
}

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) throw Error("Not context template");
  return context;
};
