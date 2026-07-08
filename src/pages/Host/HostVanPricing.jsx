import {  useOutletContext } from "react-router-dom"

export default function HostVanPricing() {
  const { price } = useOutletContext()

  return (
    <>
      {
        price ?
          <section className="host-van-detail-price">
            <h3 className="host-van-price">${price}<span>/day</span></h3>
          </section> :
          <h1>Loading...</h1>
      }
    </>
  )
}