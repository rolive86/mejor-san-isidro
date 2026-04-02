// app/api/padron/route.js
import { consultarPadron } from '@/lib/padron'
import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const { dni, genero } = await request.json()

    if (!dni || !genero) {
      return NextResponse.json({ error: 'Faltan datos.' }, { status: 400 })
    }

    // DNI de prueba — siempre pasa, toma datos de 92730218
    if (String(dni).trim() === '11111111') {
      const { consultarPadron } = await import('@/lib/padron')
      const resultado = await consultarPadron('92730218', genero)
      return NextResponse.json(resultado)
    }

    // 1. Verificar si ya está en la base de afiliados
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_AFILIADOS_URL,
      process.env.SUPABASE_AFILIADOS_SERVICE_ROLE_KEY
    )
    const { data: yaAfiliado } = await sb
      .from('afiliaciones')
      .select('id')
      .eq('dni', Number(dni))
      .limit(1)
      .single()

    if (yaAfiliado) {
      return NextResponse.json({
        encontrado: true,
        afiliado: true,
        partido: 'MEJOR San Isidro',
        yaEnBase: true
      })
    }

    // 2. Consultar padrón
    const resultado = await consultarPadron(String(dni).trim(), genero)
    return NextResponse.json(resultado)

  } catch (err) {
    console.error('Error en /api/padron:', err)
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 })
  }
}