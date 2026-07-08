import { useState, useEffect } from "react"
import { useParams, Link ,NavLink , Outlet} from "react-router-dom"


export default function HostVanDetail() {
  const [hostVan, setHostVan] = useState({})
  const { id } = useParams()
  useEffect(() => {
    fetch(`/api/host/vans/${id}`)
      .then((res) => res.json())
      .then((data) => setHostVan(data.vans[0]))
  }, [])

  return (
    <section className="host-van-detail-section">
      <Link
        to=".."
        relative="path"
        className="back-button"
      >&larr; <span>Back to all vans</span></Link>

      {hostVan ? <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={hostVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i
              className={`van-type van-type-${hostVan.type}`}
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
        <Outlet context={hostVan}/>
      </div>
        : <h2>Loading...</h2>}
    </section>
  )
}
