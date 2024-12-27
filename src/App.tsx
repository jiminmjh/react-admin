import { Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import DynamicRoutes from '@/route/DynamicRoutes'
import Loading from '@/components/Loading'

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <DynamicRoutes />
      </Suspense>
    </BrowserRouter>
  )
}
export default App
