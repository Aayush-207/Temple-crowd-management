import React, { useEffect, useState } from 'react'

function Badge({ children, color = 'emerald' }) {
  const map = {
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700'
  }
  return <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${map[color]}`}>{children}</span>
}

export default function Bookings() {
  const [bookings, setBookings] = useState([])
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    const load = () => {
      try {
        const data = JSON.parse(localStorage.getItem('bookings') || '[]')
        setBookings(Array.isArray(data) ? data : [])
      } catch {
        setBookings([])
      }
    }
    load()
    window.addEventListener('storage', load)
    return () => window.removeEventListener('storage', load)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="fixed inset-x-0 top-0 z-50 text-neutral-900 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-gradient-to-b from-amber-400 to-orange-500" />
            <div className="h-3 w-48 rounded-sm bg-gradient-to-r from-amber-500 to-orange-500" />
          </div>
          <nav className="flex items-center gap-8 text-sm">
            <a href="#/" className="hover:opacity-80">Home</a>
            <a className="font-semibold">My Bookings</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-24 pb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">My Bookings</h1>
        <p className="mt-2 text-neutral-600">View and manage your temple visit bookings</p>

        <div className="mt-8 space-y-6">
          {bookings.length === 0 && (
            <div className="rounded-xl bg-white p-8 text-center ring-1 ring-neutral-200">No bookings yet.</div>
          )}
          {bookings.map((b, i) => (
            <div key={i} className="rounded-2xl bg-white ring-1 ring-neutral-200 p-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl font-semibold">{b.temple.name}</h2>
                <Badge color="emerald">upcoming</Badge>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl bg-neutral-50 p-4 ring-1 ring-neutral-200">
                  <div className="text-xs text-neutral-500">Date</div>
                  <div className="mt-1 font-medium">{b.date}</div>
                </div>
                <div className="rounded-xl bg-neutral-50 p-4 ring-1 ring-neutral-200">
                  <div className="text-xs text-neutral-500">Time Slot</div>
                  <div className="mt-1 font-medium">{b.slot}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    const next = bookings.filter(x => x.id !== b.id)
                    setBookings(next)
                    localStorage.setItem('bookings', JSON.stringify(next))
                  }}
                  className="rounded-xl border px-4 py-2 text-sm"
                >
                  Cancel Booking
                </button>
                <button
                  onClick={() => setDetail(b)}
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-semibold text-white"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <button onClick={()=>setDetail(null)} className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow">✕</button>
            <div className="p-6">
              <h3 className="text-2xl font-bold">{detail.temple.name}</h3>
              <p className="mt-1 text-neutral-600">{detail.temple.location}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl bg-neutral-50 p-4 ring-1 ring-neutral-200">
                  <div className="text-xs text-neutral-500">Date</div>
                  <div className="mt-1 font-medium">{detail.date}</div>
                </div>
                <div className="rounded-xl bg-neutral-50 p-4 ring-1 ring-neutral-200">
                  <div className="text-xs text-neutral-500">Time Slot</div>
                  <div className="mt-1 font-medium">{detail.slot}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


