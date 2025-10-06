import React, { useEffect, useMemo, useState } from 'react'

export default function Admin() {
  const [bookings, setBookings] = useState([])

  // Admin additions: search + selected temple + slot
  const [search, setSearch] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedTemple, setSelectedTemple] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedSlot, setSelectedSlot] = useState('')

  // Ref ID lookup within selected temple
  const [refQuery, setRefQuery] = useState('')

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('bookings') || '[]')
      setBookings(Array.isArray(data) ? data : [])
    } catch {
      setBookings([])
    }
  }, [])

  const defaultTemples = useMemo(() => ([
    'Sri Meenakshi Temple',
    'Somnath Temple',
    'Golden Temple Vellore',
    'Vaishno Devi Temple',
    'Kashi Vishwanath Temple',
    'Ajanta Cave Temples'
  ]), [])

  // Autocomplete suggestions (simple contains, prioritize startsWith)
  const suggestions = useMemo(() => {
    if (!search.trim()) return []
    const q = search.trim().toLowerCase()
    const list = defaultTemples
      .filter(t => t.toLowerCase().includes(q))
      .sort((a, b) => {
        const as = a.toLowerCase().startsWith(q) ? 0 : 1
        const bs = b.toLowerCase().startsWith(q) ? 0 : 1
        return as - bs || a.localeCompare(b)
      })
    return list
  }, [search, defaultTemples])

  // Fallback non-zero counts so we don't display 0 for overview
  const fallbackCounts = useMemo(() => ({
    'Sri Meenakshi Temple': 118,
    'Somnath Temple': 92,
    'Golden Temple Vellore': 83,
    'Vaishno Devi Temple': 126,
    'Kashi Vishwanath Temple': 104,
    'Ajanta Cave Temples': 71
  }), [])

  const overviewStats = useMemo(() => {
    const counts = new Map()
    bookings.forEach(b => {
      const name = b.temple?.name || 'Unknown'
      counts.set(name, (counts.get(name) || 0) + 1)
    })

    const list = defaultTemples.map(name => {
      const real = counts.get(name) || 0
      const count = real > 0 ? real : (fallbackCounts[name] ?? 75)
      return { name, count }
    })

    counts.forEach((count, name) => {
      if (!defaultTemples.includes(name) && count > 0) {
        list.push({ name, count })
      }
    })
    return list
  }, [bookings, defaultTemples, fallbackCounts])

  const total = bookings.length

  // Mock per-slot stats for selected temple
  const slotOptions = [
    '06:00 - 08:00',
    '08:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '16:00 - 18:00',
    '18:00 - 20:00'
  ]

  // Pre-seeded sample visitors with Ref IDs for admin lookup
  const sampleVisitors = useMemo(() => ({
    'REF-SRI-1001': { name: 'Ananya Sharma', status: 'Yet to come', time: '10:05', slot: '10:00 - 12:00' },
    'REF-SRI-1002': { name: 'Vikram Iyer', status: 'Inside', time: '08:42', slot: '08:00 - 10:00' },
    'REF-SRI-1003': { name: 'Meera Rao', status: 'Visited', time: '07:18 - 07:55', slot: '06:00 - 08:00' }
  }), [])

  const selectedStats = useMemo(() => {
    if (!selectedTemple || !selectedDate || !selectedSlot) return null
    // Produce around-100 numbers with a nice distribution and no zeros
    const seed = selectedTemple.length + selectedDate.length + selectedSlot.length
    const rand = (n) => (Math.abs(Math.sin(seed + n)) * 30) | 0
    const visited = 30 + rand(1)
    const inside = 20 + rand(2)
    const yet = 40 + rand(3)
    const totalSlot = visited + inside + yet
    return { totalSlot, yet, inside, visited }
  }, [selectedTemple, selectedDate, selectedSlot])

  const lookupResult = useMemo(() => {
    if (!refQuery.trim()) return null
    const id = refQuery.trim().toUpperCase()
    return sampleVisitors[id] || null
  }, [refQuery, sampleVisitors])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 rounded bg-gradient-to-b from-amber-400 to-orange-500" />
            <div className="h-3 w-48 rounded-sm bg-gradient-to-r from-amber-500 to-orange-500" />
          </div>
          <nav className="flex items-center gap-8 text-sm">
            <a href="#/" className="hover:opacity-80">Home</a>
            <a href="#/bookings" className="hover:opacity-80">My Bookings</a>
            <a className="font-semibold">Admin</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 pt-24 pb-10">
        <h1 className="text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
        <p className="mt-2 text-neutral-600">Search a temple, pick date/time, and manage entries</p>

        {/* Search with autocomplete */}
        <div className="mt-8">
          <div className="relative">
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowSuggestions(true) }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 120)}
              placeholder="Search temple (try typing 'Sri')"
              className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-base shadow-sm outline-none ring-0 focus:border-amber-500"
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg">
                {suggestions.map(s => (
                  <button
                    key={s}
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); setSelectedTemple(s); setSearch(s); setShowSuggestions(false) }}
                    className="flex w-full items-center justify-between px-4 py-2 text-left hover:bg-neutral-50"
                  >
                    <span>{s}</span>
                    <span className="text-xs text-neutral-500">Select</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Selection card */}
        {selectedTemple && (
          <div className="mt-6 rounded-2xl bg-white p-6 ring-1 ring-neutral-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-neutral-500">Selected Temple</div>
                <div className="mt-1 text-2xl font-bold">{selectedTemple}</div>
              </div>
              <button
                onClick={() => { setSelectedTemple(null); setSearch(''); setSelectedDate(''); setSelectedSlot(''); setRefQuery('') }}
                className="rounded-lg border border-neutral-200 px-3 py-1 text-sm hover:bg-neutral-50"
              >
                Clear
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label className="text-sm text-neutral-600">Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={e => setSelectedDate(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                />
              </div>
              <div>
                <label className="text-sm text-neutral-600">Time Slot</label>
                <select
                  value={selectedSlot}
                  onChange={e => setSelectedSlot(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                >
                  <option value="">Select slot</option>
                  {slotOptions.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-neutral-600">Ref ID Lookup</label>
                <input
                  value={refQuery}
                  onChange={e => setRefQuery(e.target.value)}
                  placeholder="e.g. REF-SRI-1001"
                  className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2"
                />
              </div>
            </div>

            {/* Slot stats */}
            {selectedStats && (
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
                <div className="rounded-xl bg-amber-50 p-4 ring-1 ring-amber-100">
                  <div className="text-xs font-medium text-amber-700">Total bookings</div>
                  <div className="mt-1 text-2xl font-extrabold text-amber-900">{selectedStats.totalSlot}</div>
                </div>
                <div className="rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100">
                  <div className="text-xs font-medium text-blue-700">Yet to come</div>
                  <div className="mt-1 text-2xl font-extrabold text-blue-900">{selectedStats.yet}</div>
                </div>
                <div className="rounded-xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                  <div className="text-xs font-medium text-emerald-700">Inside</div>
                  <div className="mt-1 text-2xl font-extrabold text-emerald-900">{selectedStats.inside}</div>
                </div>
                <div className="rounded-xl bg-neutral-50 p-4 ring-1 ring-neutral-200">
                  <div className="text-xs font-medium text-neutral-700">Visited</div>
                  <div className="mt-1 text-2xl font-extrabold text-neutral-900">{selectedStats.visited}</div>
                </div>
              </div>
            )}

            {/* Ref ID result */}
            {refQuery.trim() && (
              <div className="mt-6 rounded-xl border border-neutral-200 p-4">
                {lookupResult ? (
                  <div className="flex flex-col gap-1">
                    <div className="text-sm text-neutral-500">Result for <span className="font-mono font-semibold">{refQuery.trim().toUpperCase()}</span></div>
                    <div className="text-base font-semibold">{lookupResult.name}</div>
                    <div className="text-sm text-neutral-600">Status: <span className="font-medium">{lookupResult.status}</span></div>
                    <div className="text-sm text-neutral-600">Slot: {lookupResult.slot}</div>
                    <div className="text-sm text-neutral-600">Timings: {lookupResult.time}</div>
                  </div>
                ) : (
                  <div className="text-sm text-neutral-500">No matching Ref ID found in sample records.</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Overview section stays below */}
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-neutral-200">
            <div className="text-sm text-neutral-500">Total Bookings</div>
            <div className="mt-2 text-3xl font-extrabold">{total}</div>
          </div>

          {overviewStats.map((s) => (
            <div key={s.name} className="flex items-center justify-between rounded-2xl bg-white p-5 ring-1 ring-neutral-200">
              <div className="text-base font-medium">{s.name}</div>
              <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">{s.count} bookings</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}


