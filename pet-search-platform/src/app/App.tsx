import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GlobalNotificationContainer} from "@layouts/GlobalNotificationContainer";
import {HomePage} from "@pages/HomePage";

const queryClient = new QueryClient();

function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<HomePage />} />
              </Routes>
          </BrowserRouter>
          <GlobalNotificationContainer />
      </QueryClientProvider>
  )
}

export default App
