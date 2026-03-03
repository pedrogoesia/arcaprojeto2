/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { Route, Switch } from "wouter";
import Hero from "./components/Hero";
import Admin from "./pages/Admin";
function LandingPage() {
  return (
    <div className="font-sans antialiased bg-slate-900 text-slate-900 selection:bg-blue-500 selection:text-white">
      <Hero />

      <footer className="py-8 bg-slate-950 text-slate-500 text-center text-sm absolute bottom-0 w-full">
        <div className="container mx-auto px-4">
          <p>&copy; {new Date().getFullYear()} Arca. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
export default function App() {
  return (
    <Switch>
      <Route path="/admin" component={Admin} />
      <Route path="/" component={LandingPage} />
      {/* Fallback for any other route */}
      <Route path="/:rest*" component={LandingPage} />
    </Switch>
  );
}
