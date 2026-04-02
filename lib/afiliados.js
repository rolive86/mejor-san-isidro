// lib/afiliados.js - Escritura de afiliaciones (solo servidor)
import { createClient } from '@supabase/supabase-js'

function getCliente() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_AFILIADOS_URL,
    process.env.SUPABASE_AFILIADOS_SERVICE_ROLE_KEY
  )
}

export async function guardarAfiliacion({ formData, dniFrente, dniDorso, firma, ip }) {
  const sb = getCliente()

  // 1. Insertar registro
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
      ip_solicitante:   ip || null,
      estado:           'PENDIENTE',
    }])
    .select('id, numero_seguimiento')
    .single()

  if (error || !registro) {
    console.error('Error insertando afiliacion:', error)
    return { ok: false, error: 'Error al guardar la solicitud.' }
  }

  const { id, numero_seguimiento } = registro
  const folder = id.replace(/-/g, '')
  const paths = {}

  // 2. Subir DNI Frente
  if (dniFrente) {
    const ext = dniFrente.name.split('.').pop().toLowerCase()
    const path = `${folder}/frente.${ext}`
    const { error: e } = await sb.storage.from('dni-docs')
      .upload(path, dniFrente, { contentType: dniFrente.type, upsert: true })
    if (!e) paths.dni_frente_path = path
    else console.warn('Error subiendo frente:', e)
  }

  // 3. Subir DNI Dorso
  if (dniDorso) {
    const ext = dniDorso.name.split('.').pop().toLowerCase()
    const path = `${folder}/dorso.${ext}`
    const { error: e } = await sb.storage.from('dni-docs')
      .upload(path, dniDorso, { contentType: dniDorso.type, upsert: true })
    if (!e) paths.dni_dorso_path = path
    else console.warn('Error subiendo dorso:', e)
  }

  // 4. Subir Firma (base64 a Blob)
  if (firma) {
    try {
      const base64Data = firma.replace(/^data:image\/png;base64,/, '')
      const binary = Buffer.from(base64Data, 'base64')
      const path = `${folder}/firma.png`
      const { error: e } = await sb.storage.from('firmas')
        .upload(path, binary, { contentType: 'image/png', upsert: true })
      if (!e) paths.firma_path = path
      else console.warn('Error subiendo firma:', e)
    } catch (e) { console.warn('Error procesando firma:', e) }
  }

  // 5. Actualizar paths en el registro
  if (Object.keys(paths).length > 0) {
    await sb.from('afiliaciones').update(paths).eq('id', id)
  }

  return { ok: true, numeroSeguimiento: numero_seguimiento }
}