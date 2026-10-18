import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

/**
 * Filet de sécurité global : capture toute erreur de rendu non gérée dans
 * l'arbre React (un bug dans un composant, une donnée inattendue, etc.) et
 * affiche un état professionnel plutôt qu'un écran blanc. Les Error
 * Boundaries ne peuvent être écrites qu'en composant classe (aucune
 * dépendance externe nécessaire, React seul le permet).
 */
export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Conservé pour le débogage local ; aucune donnée n'est envoyée où que ce soit.
    console.error("ErrorBoundary a intercepté une erreur :", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <Section background="white" className="flex min-h-[70vh] items-center justify-center text-center">
        <div className="mx-auto flex max-w-md flex-col items-center">
          <h1 className="text-h2">Une erreur est survenue</h1>
          <p className="mt-4 text-body">Veuillez réessayer ou retourner à l&rsquo;accueil.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button variant="outline" onClick={this.handleReset} className="w-full sm:w-auto">
              Réessayer
            </Button>
            <Button href="/" onClick={this.handleReset} className="w-full sm:w-auto">
              Retour à l&rsquo;accueil
            </Button>
          </div>
        </div>
      </Section>
    );
  }
}
