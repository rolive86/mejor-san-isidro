// app/api/afiliacion/route.js
import { guardarAfiliacion } from '@/lib/afiliados'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const fd = await request.formData()

    const formData  = JSON.parse(fd.get('formData'))
    const dniFrente = fd.get('dniFrente')
    const dniDorso  = fd.get('dniDorso')
    const firma     = fd.get('firma')

    const ip = request.headers.get('x-forwarded-for')
            || request.headers.get('x-real-ip')
            || null

    const resultado = await guardarAfiliacion({
      formData,
      dniFrente: dniFrente instanceof File ? dniFrente : null,
      dniDorso:  dniDorso  instanceof File ? dniDorso  : null,
      firma:     typeof firma === 'string'  ? firma     : null,
      ip,
    })

    if (!resultado.ok) {
      return NextResponse.json({ error: resultado.error }, { status: 500 })
    }

    return NextResponse.json({ ok: true, numeroSeguimiento: resultado.numeroSeguimiento })

  } catch (err) {
    console.error('Error en /api/afiliacion:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
