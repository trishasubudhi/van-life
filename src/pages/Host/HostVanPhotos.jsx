import { useOutletContext } from "react-router-dom"

export default function HostVanPhotos() {
  const {imageUrl} = useOutletContext()

  return (
    <>
      {imageUrl ? (
        <section className="host-van-detail-info">
            <img src={imageUrl} className="host-van-detail-image" />
        </section>
      ) : (
        <h1>Loading...</h1>
      )}
    </>
  )
}
