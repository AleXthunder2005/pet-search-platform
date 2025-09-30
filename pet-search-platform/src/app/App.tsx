import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GlobalNotificationContainer} from "@layouts/GlobalNotificationContainer";
import {HomePage} from "@pages/HomePage";
import {AuthProvider} from "@app/contexts/authContext.tsx";

const queryClient = new QueryClient();


function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<HomePage />} />
                  </Routes>
              </BrowserRouter>
          </AuthProvider>
          <GlobalNotificationContainer />
      </QueryClientProvider>
  )
}

export default App
