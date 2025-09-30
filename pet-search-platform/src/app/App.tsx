import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {GlobalNotificationContainer} from "@layouts/GlobalNotificationContainer";
import {AuthProvider, useAuth} from "@app/contexts/authContext.tsx";
import {UserRoutes} from "@app/routes/UserRoutes/UserRoutes.tsx";
import {GuestRoutes} from "@app/routes/GuestRoutes/GuestRoutes.tsx";

const queryClient = new QueryClient();


function App() {
  return (
      <QueryClientProvider client={queryClient}>
          <AuthProvider>
              <BrowserRouter>
                  <RouterSelector/>
              </BrowserRouter>
          </AuthProvider>
          <GlobalNotificationContainer />
      </QueryClientProvider>
  )
}

const RouterSelector = () => {
    const { user } = useAuth();

    if (user) {
        return <UserRoutes />;
    }
    return <GuestRoutes />;
};

export default App
