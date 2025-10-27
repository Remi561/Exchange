import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'

import FormInput from "./components/FormInput";



function App() {
 
  
  const queryClient = new QueryClient();

  
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-light dark:bg-dark-bg  h-full w-full transition-all duration-200 px-3">
        <section className="py-2 w-full sticky top-0">
          <Navbar />
        </section>
        <main className="h-[calc(100vh-74px)] flex items-center w-full justify-center">
          <FormInput />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App
