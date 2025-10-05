import React, { useMemo, useState } from 'react'
import heroImage from '../assets/temple-hero.jpg'
import temple1 from '../assets/temple-1.jpg'
import temple2 from '../assets/temple-2.jpg'
import temple3 from '../assets/temple-3.jpg'
import temple4 from '../assets/temple-4.jpg'
import temple5 from '../assets/temple-5.jpg'
import temple6 from '../assets/temple-6.jpg'

function Icon({ name, className }) {
  // Minimal inline SVG icon set; swap or replace later
  const icons = {
    logo: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M12 2a3 3 0 0 1 3 3v1h2a3 3 0 0 1 0 6h-2v2h2a3 3 0 0 1 0 6h-2v1a3 3 0 0 1-6 0v-1H7a3 3 0 0 1 0-6h2v-2H7a3 3 0 0 1 0-6h2V5a3 3 0 0 1 3-3Z" />
      </svg>
    ),
    home: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-10.5Z" />
      </svg>
    ),
    booking: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
        <path strokeWidth="2" strokeLinecap="round" d="M7 3v4M17 3v4M4 9h16M6 12h4m-4 4h8M5 5h14a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
      </svg>
    ),
    user: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
        <path strokeWidth="2" strokeLinecap="round" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 9a7 7 0 0 0-14 0" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
        <path strokeWidth="2" strokeLinecap="round" d="m21 21-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" />
      </svg>
    ),
    pin: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
        <path strokeWidth="2" strokeLinecap="round" d="M12 22s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Zm0-9a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" />
      </svg>
    ),
    chevron: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="m12 2 2.9 6.2 6.8.6-5.1 4.5 1.5 6.6L12 16.9 5.9 20l1.5-6.6L2.3 8.8l6.8-.6L12 2Z" />
      </svg>
    ),
    distance: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
        <path strokeWidth="2" strokeLinecap="round" d="M7 7h10M7 12h10M7 17h6" />
      </svg>
    )
  }
  return icons[name] || null
}

function CrowdBadge({ level }) {
  const map = {
    Low: 'bg-emerald-100 text-emerald-700',
    Medium: 'bg-amber-100 text-amber-700',
    High: 'bg-rose-100 text-rose-700'
  }
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${map[level]}`}>
      <span className={`h-2 w-2 rounded-full ${level === 'Low' ? 'bg-emerald-500' : level === 'Medium' ? 'bg-amber-500' : 'bg-rose-500'}`} />
      {level} Crowd
    </span>
  )
}

function TempleCard({ temple }) {
  return (
    <div className="group rounded-2xl bg-white shadow-sm ring-1 ring-neutral-200/60 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full bg-neutral-200 overflow-hidden">
        {/* Replace backgroundImage URL with actual asset later */}
        <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105" style={{ backgroundImage: `url(${temple.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-black/0" />
        <div className="absolute top-3 left-3">
          <CrowdBadge level={temple.crowd} />
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-neutral-900">{temple.name}</h3>
        <div className="mt-2 flex items-center gap-4 text-sm text-neutral-600">
          <div className="inline-flex items-center gap-2">
            <Icon name="pin" className="h-4 w-4" />
            <span>{temple.location}</span>
          </div>
          <div className="inline-flex items-center gap-2">
            <Icon name="star" className="h-4 w-4 text-amber-400" />
            <span className="font-medium text-neutral-800">{temple.rating}</span>
          </div>
        </div>
        <p className="mt-2 line-clamp-2 text-neutral-600 text-sm">{temple.description}</p>
        <button onClick={temple.onBook} className="mt-4 w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2.5 text-white font-semibold shadow-sm hover:from-amber-600 hover:to-orange-700">
          View & Book
        </button>
      </div>
    </div>
  )
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCity, setSelectedCity] = useState('All')
  const [selectedTemple, setSelectedTemple] = useState(null)

  const temples = [
    {
      name: 'Sri Meenakshi Temple',
      location: 'Madurai, Tamil Nadu',
      rating: '4.8',
      crowd: 'Medium',
      image: temple1,
      description:
        'A historic Hindu temple dedicated to Goddess Meenakshi and Lord Sundareswarar. Known for its stunning architecture and vibrant corridors.'
    },
    {
      name: 'Somnath Temple',
      location: 'Prabhas Patan, Gujarat',
      rating: '4.9',
      crowd: 'Low',
      image: temple2,
      description:
        'One of the twelve Jyotirlinga shrines of Lord Shiva on the western coast of Gujarat. A symbol of spiritual resilience.'
    },
    {
      name: 'Golden Temple Vellore',
      location: 'Vellore, Tamil Nadu',
      rating: '4.7',
      crowd: 'High',
      image: temple3,
      description:
        'A magnificent temple covered in gold leaf, dedicated to Goddess Lakshmi. Known for its peaceful atmosphere and grandeur.'
    },
    {
      name: 'Vaishno Devi Temple',
      location: 'Katra, Jammu & Kashmir',
      rating: '4.8',
      crowd: 'High',
      image: temple4,
      description:
        'One of the most revered pilgrimage sites in India, located in the Trikuta Mountains and visited by millions every year.'
    },
    {
      name: 'Kashi Vishwanath Temple',
      location: 'Varanasi, Uttar Pradesh',
      rating: '4.9',
      crowd: 'Medium',
      image: temple5,
      description:
        'A sacred temple dedicated to Lord Shiva situated on the western bank of the holy river Ganga in Varanasi.'
    },
    {
      name: 'Ajanta Cave Temples',
      location: 'Aurangabad, Maharashtra',
      rating: '4.6',
      crowd: 'Low',
      image: temple6,
      description:
        'Rock-cut Buddhist monuments dating from the 2nd century BCE to about 480 CE, famed for their murals and sculptures.'
    }
  ]

  const cities = useMemo(() => {
    const unique = new Set(['All'])
    temples.forEach(t => {
      const city = t.location.split(',')[0].trim()
      unique.add(city)
    })
    return Array.from(unique)
  }, [temples])

  const filteredTemples = useMemo(() => {
    return temples.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.location.toLowerCase().includes(searchQuery.toLowerCase())
      const city = t.location.split(',')[0].trim()
      const matchesCity = selectedCity === 'All' || city === selectedCity
      return matchesSearch && matchesCity
    })
  }, [searchQuery, selectedCity, temples])

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Hero with background image and overlay */}
      <div className="relative isolate">
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/30 to-neutral-50" />

        {/* Navbar */}
        <header className="fixed inset-x-0 top-0 z-50 text-white">
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 backdrop-blur-sm/0">
          <div className="flex items-center gap-3">
            <Icon name="logo" className="h-6 w-6 text-amber-400" />
            <div className="h-3 w-48 rounded-sm bg-gradient-to-r from-amber-500 to-orange-500" />
          </div>
          <nav className="flex items-center gap-8">
            <a className="inline-flex items-center gap-2 hover:opacity-90" href="#/">
              <Icon name="home" className="h-4 w-4" />
              <span>Home</span>
            </a>
            <a className="inline-flex items-center gap-2 hover:opacity-90" href="#/bookings">
              <Icon name="booking" className="h-4 w-4" />
              <span>My Bookings</span>
            </a>
            <a className="rounded-full p-2 hover:bg-white/10" href="#/auth">
              <Icon name="user" className="h-5 w-5" />
            </a>
          </nav>
          </div>
        </header>

        {/* Hero content */}
        <div className="mx-auto max-w-7xl px-6 text-white flex min-h-[86vh] items-end pb-10 pt-20">
          <div className="w-full">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]">
            Find Your Peaceful Temple Visit
          </h1>
          <p className="mt-4 max-w-3xl text-lg/7 text-white/90 drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]">
            Book time slots at temples near you and avoid crowding. Plan your
            spiritual journey with ease.
          </p>

          {/* Search and filters */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="col-span-2 flex items-center gap-3 rounded-2xl bg-white/95 p-4 text-neutral-700 shadow-sm ring-1 ring-white/40">
              <Icon name="search" className="h-5 w-5" />
              <input
                className="w-full bg-transparent outline-none placeholder:text-neutral-400"
                placeholder="Search for temples near you..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between gap-3 rounded-2xl bg-white/95 p-1 pl-4 text-neutral-700 shadow-sm ring-1 ring-white/40">
              <span className="inline-flex items-center gap-2">
                <Icon name="pin" className="h-5 w-5" />
                <span className="text-sm">Filter by city</span>
              </span>
              <select
                className="min-w-40 rounded-xl bg-white px-3 py-2 text-sm outline-none"
                value={selectedCity}
                onChange={e => setSelectedCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
          </div>
        </div>
      </div>

      {/* List section */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900">All Temples Near You</h2>
        <p className="mt-2 text-neutral-600">
          Choose a temple and book your visit time to avoid crowds
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemples.map((t, i) => (
            <TempleCard key={i} temple={{...t, onBook: () => setSelectedTemple(t)}} />
          ))}
        </div>
      </section>

      {selectedTemple && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" onClick={() => setSelectedTemple(null)}>
          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedTemple(null)} className="absolute right-3 top-3 z-10 rounded-full bg-white/90 p-2 shadow hover:bg-white">
              <span className="sr-only">Close</span>
              ✕
            </button>
            <div className="max-h-[85vh] overflow-auto">
              <div className="relative h-64 w-full bg-neutral-200">
                <div className="absolute inset-0" style={{ backgroundImage: `url(${selectedTemple.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </div>
              <div className="grid gap-6 p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-neutral-900 sm:text-3xl">{selectedTemple.name}</h3>
                    <div className="mt-2 flex items-center gap-4 text-sm text-neutral-600">
                      <span className="inline-flex items-center gap-2"><Icon name="pin" className="h-4 w-4" />{selectedTemple.location}</span>
                      <span className="inline-flex items-center gap-2"><Icon name="star" className="h-4 w-4 text-amber-400" />{selectedTemple.rating}</span>
                    </div>
                  </div>
                  <CrowdBadge level={selectedTemple.crowd} />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-neutral-900">About</h4>
                  <p className="mt-2 text-neutral-700">{selectedTemple.description}</p>
                </div>

                <div className="rounded-xl bg-neutral-50 p-4 ring-1 ring-neutral-200/60">
                  <h5 className="text-sm font-semibold text-neutral-900">Temple Timings</h5>
                  <p className="mt-1 text-sm text-neutral-700">5:00 AM – 12:30 PM, 4:00 PM – 9:30 PM</p>
                </div>

                <div className="rounded-2xl ring-1 ring-neutral-200/60">
                  <div className="border-b border-neutral-200 px-4 py-3 font-semibold text-neutral-900">Book Your Visit</div>
                  <BookingForm
                    temple={selectedTemple}
                    onConfirm={(payload) => {
                      const existing = JSON.parse(localStorage.getItem('bookings') || '[]')
                      existing.push(payload)
                      localStorage.setItem('bookings', JSON.stringify(existing))
                      setSelectedTemple(null)
                      window.location.hash = '#/bookings'
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


function BookingForm({ onConfirm, temple }) {
  const now = new Date()
  const [current, setCurrent] = useState(new Date(now.getFullYear(), now.getMonth(), 1))
  const [selected, setSelected] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate()))
  const [slot, setSlot] = useState('')

  const year = current.getFullYear()
  const month = current.getMonth()
  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 0)
  const startWeekday = start.getDay() || 7
  const days = Array.from({ length: end.getDate() }, (_, i) => i + 1)

  function prevMonth() { setCurrent(new Date(year, month - 1, 1)) }
  function nextMonth() { setCurrent(new Date(year, month + 1, 1)) }

  const monthName = current.toLocaleString('default', { month: 'long' })
  const dateLabel = selected ? selected.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : ''

  const allSlots = [
    { label: '6:00 AM - 8:00 AM', full: false },
    { label: '8:00 AM - 10:00 AM', full: false },
    { label: '10:00 AM - 12:00 PM', full: true },
    { label: '12:00 PM - 2:00 PM', full: false },
    { label: '4:00 PM - 6:00 PM', full: false },
    { label: '6:00 PM - 8:00 PM', full: true }
  ]

  return (
    <div className="grid gap-6 p-4 sm:grid-cols-2">
      <div className="rounded-xl border border-neutral-200 p-4">
        <div className="mb-2 flex items-center justify-between">
          <button onClick={prevMonth} className="rounded-full border px-2 py-1">‹</button>
          <div className="text-sm font-semibold">{monthName} {year}</div>
          <button onClick={nextMonth} className="rounded-full border px-2 py-1">›</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-neutral-500">
          {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (<div key={d} className="py-1">{d}</div>))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
          {Array.from({ length: (startWeekday % 7) }, (_, i) => (<div key={`empty-${i}`} />))}
          {days.map(day => {
            const isSelected = selected.getFullYear()===year && selected.getMonth()===month && selected.getDate()===day
            return (
              <button
                key={day}
                onClick={() => setSelected(new Date(year, month, day))}
                className={`h-9 rounded-md hover:bg-amber-100 ${isSelected ? 'bg-amber-200 font-semibold' : ''}`}
              >
                {day}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">Select Time Slot</div>
          {!selected && (
            <div className="mt-3 text-sm text-neutral-500">Please select a date first.</div>
          )}
          {selected && (
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {allSlots.map(s => (
                <button
                  key={s.label}
                  disabled={s.full}
                  onClick={() => setSlot(s.label)}
                  className={`rounded-xl border px-4 py-2 text-sm ${s.full ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed' : slot===s.label ? 'border-transparent bg-gradient-to-r from-amber-500 to-orange-600 text-white' : 'hover:bg-neutral-50'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          disabled={!slot}
          onClick={() => onConfirm({ id: Date.now(), date: dateLabel, slot, temple })}
          className={`h-11 rounded-xl font-semibold shadow-sm ${slot ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700' : 'bg-neutral-200 text-neutral-500 cursor-not-allowed'}`}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  )
}


