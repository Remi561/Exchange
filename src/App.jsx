import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Navbar from './components/Navbar'
import Button from './components/Button'
import FormInput from './components/FormInput'
import { useState } from 'react'


function App() {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = new QueryClient()

  console.log(isLoading)
  console.log(error)
  window.__TANSTACK_QUERY_CLIENT__ = queryClient;

  return (
    
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-light dark:bg-dark-bg  h-full w-full transition-all duration-200 px-3">
        <section className='py-2 w-full sticky top-0'>
           <Navbar/>
        </section>
        <main className='h-[calc(100vh-74px)] flex items-center w-full justify-center'>
          <FormInput setError={setError} isLoading={isLoading} setIsLoading={setIsLoading} />
        </main>
       
        </div>
      </QueryClientProvider>
      
    
  )
}

export default App
