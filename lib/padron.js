// lib/padron.js — Consulta al Padrón Electoral (solo lectura)
import { createClient } from '@supabase/supabase-js'

const supabasePadron = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_PADRON_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PADRON_ANON_KEY
)

export async function consultarPadron(dni, genero) {
  const { data, error } = await supabasePadron
    .from('padron_disponible')
    .select('*')
    .eq('dni', Number(dni))
    .limit(1)
    .single()

  if (error || !data) return { encontrado: false }

  // Validar sexo
  const sexoPadron = normalizarSexo(data.sexo)
  if (sexoPadron && sexoPadron !== genero) return { encontrado: false }

  // Solo DISPONIBLE puede continuar
  if (!data.estado_de_afiliacion || data.estado_de_afiliacion.toUpperCase().trim() !== 'DISPONIBLE') {
    return { encontrado: true, afiliado: true, partido: data.estado_de_afiliacion || 'otro partido' }
  }

  const { apellidos, nombres } = parsearNombreApellido(data.nombre_y_apellido)
  const { calle, numero, piso, dpto } = parsearDomicilio(data.domicilio)

  return {
    encontrado: true,
    afiliado: false,
    data: {
      apellidos,
      nombres,
      matricula:       String(data.dni),
      sexo:            data.sexo || '',
      clase:           '',
      fechaNacimiento: '',
      nacionalidad:    'ARGENTINA',
      lugar:           data.localidad || '',
      profesion:       '',
      estadoCivil:     '',
      distrito:        data.distrito || '',
      localidad:       data.localidad || '',
      calle,
      numero,
      piso,
      dpto,
    }
  }
}

function normalizarSexo(sexo) {
  if (!sexo) return null
  const s = sexo.toUpperCase().trim()
  if (['M', 'MASCULINO', 'MASC'].includes(s)) return 'M'
  if (['F', 'FEMENINO', 'FEM'].includes(s)) return 'F'
  return null
}

function parsearNombreApellido(raw) {
  if (!raw) return { apellidos: '', nombres: '' }
  const s = raw.trim()
  if (s.includes(',')) {
    const [ap, nm] = s.split(',').map(p => p.trim())
    return { apellidos: ap || '', nombres: nm || '' }
  }
  const parts = s.split(' ')
  return { apellidos: parts[0] || '', nombres: parts.slice(1).join(' ') || '' }
}

function parsearDomicilio(raw) {
  if (!raw) return { calle: '', numero: '', piso: '', dpto: '' }
  const s = raw.trim().toUpperCase()
  const match = s.match(/^(.+?)\s+(\d+)(.*)$/)
  if (!match) return { calle: s, numero: '', piso: '', dpto: '' }
  const calle  = match[1].trim()
  const numero = match[2].trim()
  const resto  = match[3].trim()
  let piso = '', dpto = ''
  if (resto) {
    const pisoMatch = resto.match(/(\d+|PB|PA)/i)
    const dptoMatch = resto.match(/([A-Z0-9]+)$/i)
    if (pisoMatch) piso = pisoMatch[1]
    if (dptoMatch && dptoMatch[1] !== pisoMatch?.[1]) dpto = dptoMatch[1]
  }
  return { calle, numero, piso, dpto }
}
