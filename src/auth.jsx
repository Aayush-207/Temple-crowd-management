import React, { useState } from 'react'
import hero from '../assets/temple-hero.jpg'

export default function Auth() {
  const [mode, setMode] = useState('login')
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="relative hidden md:block">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20" />
        <div className="absolute bottom-10 left-10 text-white">
          <div className="h-3 w-48 rounded-sm bg-gradient-to-r from-amber-500 to-orange-500" />
          <h2 className="mt-6 text-4xl font-extrabold drop-shadow">Plan your peaceful visit</h2>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-extrabold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h1>
          <p className="mt-2 text-neutral-600">{mode === 'login' ? 'Sign in to continue' : 'Sign up to get started'}</p>

          <form className="mt-8 space-y-4" onSubmit={(e)=>{e.preventDefault(); window.location.hash = '#/'}}>
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium">Full Name</label>
                <input className="mt-1 w-full rounded-xl border px-3 py-2 outline-none" required />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" className="mt-1 w-full rounded-xl border px-3 py-2 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium">Password</label>
              <input type="password" className="mt-1 w-full rounded-xl border px-3 py-2 outline-none" required />
            </div>
            <button className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 py-2.5 font-semibold text-white">{mode === 'login' ? 'Sign In' : 'Create Account'}</button>
          </form>

          <div className="mt-6 text-center text-sm">
            {mode === 'login' ? (
              <span>Don&apos;t have an account? <button className="text-amber-600" onClick={()=>setMode('signup')}>Sign up</button></span>
            ) : (
              <span>Already have an account? <button className="text-amber-600" onClick={()=>setMode('login')}>Log in</button></span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}


