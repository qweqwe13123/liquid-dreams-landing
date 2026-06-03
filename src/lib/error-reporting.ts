type ErrorReportOptions = {
  mechanism?: string;
  [key: string]: unknown;
};

type ErrorEventsBridge = {
  captureException?: (
    error: Error,
    context?: Record<string, unknown>,
    options?: ErrorReportOptions,
  ) => void;
};

declare global {
  interface Window {
    __lovableEvents?: ErrorEventsBridge;
  }
}

export function reportAppError(error: unknown, context: Record<string, unknown> = {}) {
  const err = error instanceof Error ? error : new Error(String(error));
  window.__lovableEvents?.captureException?.(
    err,
    { ...context, source: "solver-app" },
    { mechanism: "manual" },
  );
}
