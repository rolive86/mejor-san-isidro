// app/api/afiliacion/route.js
import { guardarAfiliacion } from '@/lib/afiliados'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const payload = await request.json()
    const resultado = await guardarAfiliacion({ formData: payload })
    if (!resultado.ok) {
      return NextResponse.json({ error: resultado.error }, { status: 500 })
    }
    return NextResponse.json({ ok: true, numeroSeguimiento: resultado.numeroSeguimiento })
  } catch (err) {
    console.error('Error en /api/afiliacion:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}