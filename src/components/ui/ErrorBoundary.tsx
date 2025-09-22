import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-white">
          <div className="text-center">
            <h2 className="text-xl mb-4">Oops, algo salió mal</h2>
            <p>Tu navegador podría no soportar algunas características 3D.</p>
            <button
              className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded"
              onClick={() => this.setState({ hasError: false })}
            >
              Intentar de nuevo
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}