import { Suspense } from "react"
import { Link, useSearchParams, useLoaderData, defer, Await } from "react-router-dom"
import { getVans } from "../../api"

export function loader() {
    return defer({ vans: getVans() })
}

export default function Vans() {
    const [searchParams, setSearchParams] = useSearchParams()

    const dataPromise = useLoaderData()

    const typeFilter = searchParams.get("type")

    function handleFilterChange(key, value) {
        setSearchParams((prevParams) => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    function renderVanElemets(vans) {
        const displayedVans = typeFilter ? vans.filter(van => van.type === typeFilter) : vans

        const vanElements = displayedVans.map(van => (
            <Link to={van.id} state={{ search: searchParams.toString(), type: typeFilter }} key={van.id}>
                <div className="van-tile">
                    <img alt={van.name} src={van.imageUrl} />
                    <div className="van-info">
                        <h3>{van.name}</h3>
                        <p className="van-price" >${van.price}<span>/day</span></p>
                    </div>
                    <span className={`van-type ${van.type} `}>{van.type}</span>
                </div>
            </Link>
        ))
        return (
            <>
                <div className="van-list-filter-buttons">
                    <button onClick={() => handleFilterChange("type", "rugged")} className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}> Rugged</button >
                    <button onClick={() => handleFilterChange("type", "simple")} className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}> Simple </button >
                    <button onClick={() => handleFilterChange("type", "luxury")} className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}> luxury</button >
                    {typeFilter ? <button onClick={() => handleFilterChange("type", null)} className="van-type clear-filters" > clear filters</button > : null}
                </div>
                <div className="van-list">
                    {vanElements}
                </div>
            </>
        )
    }

    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <Suspense fallback={<h2>Loading Vans ...</h2>}>
                <Await resolve={dataPromise.vans}>

                    {
                        renderVanElemets
                    }
                </Await>
            </Suspense>
        </div>
    )
}