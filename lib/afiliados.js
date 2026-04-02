// lib/afiliados.js - Escritura de afiliaciones (solo servidor)
import { createClient } from '@supabase/supabase-js'

function getCliente() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_AFILIADOS_URL,
    process.env.SUPABASE_AFILIADOS_SERVICE_ROLE_KEY
  )
}

export async function guardarAfiliacion({ formData }) {
  const sb = getCliente()
  const { data: registro, error } = await sb
    .from('afiliaciones')
    .insert([{
      dni:              Number(formData.matricula),
      sexo:             formData.sexo,
      apellidos:        formData.apellidos,
      nombres:          formData.nombres,
      matricula:        formData.matricula,
      clase:            formData.clase,
      fecha_nacimiento: formData.fechaNacimiento,
      nacionalidad:     formData.nacionalidad,
      lugar:            formData.lugar,
      profesion:        formData.profesion,
      estado_civil:     formData.estadoCivil,
      distrito:         formData.distrito,
      localidad:        formData.localidad,
      calle:            formData.calle,
      numero:           formData.numero,
      piso:             formData.piso,
      dpto:             formData.dpto,
      dni_frente_path:  formData.dniFrente_path || null,
      dni_dorso_path:   formData.dniDorso_path  || null,
      firma_path:       formData.firma_path      || null,
      estado:           'PENDIENTE',
    }])
    .select('id, numero_seguimiento')
    .single()

  if (error || !registro) {
    console.error('Error insertando afiliacion:', error)
    return { ok: false, error: 'Error al guardar la solicitud.' }
  }

  return { ok: true, numeroSeguimiento: registro.numero_seguimiento }
}