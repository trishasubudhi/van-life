import { Suspense } from "react";
import { useParams, Link, NavLink, Outlet, useLoaderData, defer, Await } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils";

export async function loader({ request, params }) {
  // 1. Run the auth check and wait for the result
  const redirectResponse = await requireAuth(request);

  // 2. If it's a redirect response, return it immediately to stop execution
  if (redirectResponse) {
    return redirectResponse;
  }

  // 3. Otherwise, proceed with fetching data safely
  return defer({ hostVan: getHostVans(params.id) })

}

export default function HostVanDetail() {
  const dataPromise = useLoaderData()

  function renderHostVan(hostVan) {
    return (
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={hostVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i
              className={`van-type ${hostVan.type}`}
            >
              {hostVan.type}
            </i>
            <h3>{hostVan.name}</h3>
            <h4>${hostVan.price}/day</h4>
          </div>
        </div>
        <nav className="host-van-detail-nav">
          <NavLink className={({ isActive }) => { return isActive ? "active-link" : null }} end to=".">Details</NavLink>
          <NavLink className={({ isActive }) => { return isActive ? "active-link" : null }} to="pricing">Pricing</NavLink>
          <NavLink className={({ isActive }) => { return isActive ? "active-link" : null }} to="photos">Photos</NavLink>
        </nav>
        <Outlet context={hostVan} />
      </div>
    )
  }

  return (
    <section className="host-van-detail-section">
      <Link
        to=".."
        relative="path"
        className="back-button"
      >&larr; <span>Back to all vans</span></Link>
      <Suspense fallback={<h2>Loading ...</h2>}>
        <Await resolve={dataPromise.hostVan}>
          {renderHostVan}
        </Await>
      </Suspense>
    </section>
  )
}
