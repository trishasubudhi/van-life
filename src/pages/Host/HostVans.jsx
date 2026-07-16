import { Suspense } from "react";
import { Link, useLoaderData, Await, defer } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils";

export async function loader({ request }) {
  // 1. Run the auth check and wait for the result
  const redirectResponse = await requireAuth(request);

  // 2. If it's a redirect response, return it immediately to stop execution
  if (redirectResponse) {
    return redirectResponse;
  }

  // 3. Otherwise, proceed with fetching data safely
  return defer({ hostVans: getHostVans() })
}

export default function HostVans() {
  const dataPromise = useLoaderData()

  function renderHostVans(hostVans) {
    const hostVansEls = hostVans.map(van => (
      <Link
        to={van.id}
        key={van.id}
      >
        <div className="host-van-single" key={van.id}>
          <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>${van.price}/day</p>
          </div>
        </div>
      </Link>

    ))
    return (
      <div className="host-vans-list">
        <section className="host-van-link-wrapper">
          {hostVansEls}
        </section>
      </div>
    )
  }

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={<h2>Loading Vans ...</h2>} >
        <Await resolve={dataPromise.hostVans}>
          {renderHostVans}
        </Await>
      </Suspense>
    </section>
  )
}
