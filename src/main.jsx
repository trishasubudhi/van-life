import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans, { loader as vansLoader } from './pages/Vans/Vans.jsx';
import VanDetail, { loader as VanDetailLoader } from './pages/Vans/VanDetail.jsx';
import "./server.js"
import Layout from './components/Layout.jsx';
import Income from './pages/Host/Income.jsx';
import Dashboard , {loader as dashboardLoader} from './pages/Host/Dashboard.jsx';
import Reviews from './pages/Host/Reviews.jsx';
import HostLayout from './components/HostLayout.jsx';
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans.jsx';
import HostVanDetail, { loader as hostVanDetailLoader } from './pages/Host/HostVanDetail.jsx';
import HostVanInfo from './pages/Host/HostVanInfo.jsx';
import HostVanPhotos from './pages/Host/HostVanPhotos.jsx';
import HostVanPricing from './pages/Host/HostVanPricing.jsx';
import NotFound from './pages/NotFound.jsx';
import Error from './components/Error.jsx';
import Login, { loader as loginLoader, action as loginAction } from './pages/Login.jsx';
import { requireAuth } from './utils.js';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />} >
      <Route index element={<Home />}  />
      <Route path="about" element={<About />} />
      <Route path="login" element={<Login />} loader={loginLoader} action={loginAction} />

      <Route path="vans" element={<Vans />} loader={vansLoader} errorElement={<Error />} />
      <Route path="vans/:id" element={<VanDetail />} loader={VanDetailLoader} errorElement={<Error />} />

      {/* 1. Added a global errorElement to catch any unhandled routing issues safely */}
      <Route path="host"
        element={<HostLayout />}

        loader={async ({ request }) => {
          await requireAuth(request)
          return null
        }}>

        {/* 2. Removed redundant requireAuth loaders from children protected by HostLayout */}
        <Route index
          element={<Dashboard />}
          loader = {dashboardLoader}
        />
        <Route path="income"
          element={<Income />}
          loader={async ({ request }) => {
            await requireAuth(request)
            return null
          }}
        />
        <Route path="vans"
          element={<HostVans />}
          loader={hostVansLoader}
          errorElement={<Error />}
        />
        <Route path="vans/:id"
          element={<HostVanDetail />}
          loader={hostVanDetailLoader}
          errorElement={<Error />}
        >
          <Route index
            element={<HostVanInfo />}
            loader={async ({ request }) => {
              await requireAuth(request)
              return null
            }}
          />
          <Route path="pricing"
            element={<HostVanPricing />}
            loader={async ({ request }) => {
              await requireAuth(request)
              return null
            }}
          />
          <Route path="photos"
            element={<HostVanPhotos />}
            loader={async ({ request }) => {
              await requireAuth(request)
              return null
            }}
          />
        </Route>
        <Route path="reviews"
          element={<Reviews />}
          loader={async ({ request }) => {
            await requireAuth(request)
            return null
          }}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);
