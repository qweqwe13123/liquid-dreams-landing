import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type AppReadyContextValue = {
  ready: boolean;
  exiting: boolean;
};

const AppReadyContext = createContext<AppReadyContextValue>({
  ready: false,
  exiting: false,
});

const MIN_LOADER_MS = 1200;
const EXIT_ANIM_MS = 650;

export function AppReadyProvider({ children }: { children: ReactNode }) {
  const [exiting, setExiting] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let exitTimer: number | undefined;
    let readyTimer: number | undefined;

    const finish = () => {
      setExiting(true);
      exitTimer = window.setTimeout(() => {
        setReady(true);
      }, EXIT_ANIM_MS);
    };

    const domReady =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => {
            window.addEventListener("load", () => resolve(), { once: true });
          });

    const minDelay = new Promise<void>((resolve) => {
      readyTimer = window.setTimeout(resolve, MIN_LOADER_MS);
    });

    Promise.all([domReady, minDelay]).then(finish);

    return () => {
      if (exitTimer) window.clearTimeout(exitTimer);
      if (readyTimer) window.clearTimeout(readyTimer);
    };
  }, []);

  return (
    <AppReadyContext.Provider value={{ ready, exiting }}>
      {children}
    </AppReadyContext.Provider>
  );
}

export function useAppReady() {
  return useContext(AppReadyContext);
}
