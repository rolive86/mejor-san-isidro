'use client'
import { useState, useRef, useEffect } from 'react'

const C = {
  green:      '#0b7f3d',
  greenLight: '#0e9e4d',
  gold:       '#d6a44c',
  navy:       '#061b30',
  navyMid:    '#0d2a45',
  gray:       '#8a9ab0',
}

// ── Primitives ────────────────────────────────────────────────

function LogoMark() {
  return null
}

function HamburgerMenu() {
  const [open, setOpen] = useState(false)
  const links = [
    { label: 'Presentación',           url: 'https://drive.google.com/file/d/1o3_miXaDVLVOFInd38K3zEqLcdnpWqqV/view?usp=drive_link' },
    { label: 'Bases de Acción Política', url: 'https://drive.google.com/file/d/1uo0McrOToxp_JIs4MLXZxkavAw3R_rUk/view' },
    { label: 'Declaración de Principios', url: 'https://drive.google.com/file/d/1E-nNCJBoXV9AzhiFSaCfw1c9tJ6EJBJF/view' },
    { label: 'Acta de Fundación',       url: 'https://drive.google.com/file/d/175Zsa9NC0wx6CGOcbI5mJjqWs-LCj_Dn/view' },
  ]
  return (
    <>
      <button onClick={() => setOpen(o => !o)} style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        padding: '6px 8px', display: 'flex', flexDirection: 'column',
        gap: 5, alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ display: 'block', width: 22, height: 2, background: open ? C.gold : '#fff', borderRadius: 2, transition: 'all 0.25s', transform: open ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
        <span style={{ display: 'block', width: 22, height: 2, background: open ? 'transparent' : '#fff', borderRadius: 2, transition: 'all 0.25s', opacity: open ? 0 : 1 }} />
        <span style={{ display: 'block', width: 22, height: 2, background: open ? C.gold : '#fff', borderRadius: 2, transition: 'all 0.25s', transform: open ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.5)' }} />
          <div style={{
            position: 'fixed', top: 0, right: 0, bottom: 0, width: '80%', maxWidth: 300,
            background: C.navyMid, zIndex: 201, display: 'flex', flexDirection: 'column',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.5)',
            animation: 'slideIn 0.25s ease'
          }}>
            <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '2px', color: C.gold, textTransform: 'uppercase' }}>Documentos</div>
              <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', color: C.gray, fontSize: 20, cursor: 'pointer', lineHeight: 1 }}>✕</button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
              {links.map((l, i) => (
                <a key={i} href={l.url} target="_blank" rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '16px 20px', color: '#fff', textDecoration: 'none',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontSize: 15, fontWeight: 500, transition: 'background 0.15s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(11,127,61,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ fontSize: 18 }}>📄</span>
                  <span>{l.label}</span>
                  <span style={{ marginLeft: 'auto', color: C.gray, fontSize: 12 }}>↗</span>
                </a>
              ))}
            </div>
            <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
              <img src="/logo.png" alt="MEJOR San Isidro" style={{ height: 36, width: 'auto', opacity: 0.6 }} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

function Card({ children, style }) {
  return (
    <div style={{
      background: C.navyMid, borderRadius: 14, padding: 18,
      border: '1px solid rgba(255,255,255,0.06)', ...style
    }}>
      {children}
    </div>
  )
}

function Field({ label, auto, required, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, fontWeight: 700, letterSpacing: '1.2px',
        textTransform: 'uppercase', color: C.gold, marginBottom: 5
      }}>
        {label}
        {auto     && <span style={{ fontSize: 9, background: 'rgba(214,164,76,0.2)', color: C.gold,    padding: '1px 6px', borderRadius: 20 }}>AUTO</span>}
        {required && <span style={{ fontSize: 9, background: 'rgba(11,127,61,0.2)',  color: '#5dda97', padding: '1px 6px', borderRadius: 20 }}>REQUERIDO</span>}
      </label>
      {children}
    </div>
  )
}

const inputStyle = {
  width: '100%', background: 'rgba(255,255,255,0.06)',
  border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 8,
  padding: '12px 14px', color: '#fff', fontSize: 15, outline: 'none',
  WebkitAppearance: 'none', fontFamily: 'inherit',
}
const inputReadOnly = { ...inputStyle, color: 'rgba(255,255,255,0.45)', background: 'rgba(255,255,255,0.03)' }

function Input({ value, onChange, readOnly, placeholder, style, type = 'text', inputMode }) {
  return (
    <input
      type={type} inputMode={inputMode} value={value ?? ''} onChange={onChange}
      readOnly={readOnly} placeholder={placeholder}
      style={{
        ...(readOnly ? inputReadOnly : inputStyle),
        ...style
      }}
    />
  )
}

function Select({ value, onChange, options = [] }) {
  const [open, setOpen] = useState(false)
  const selected = options.find(o => o.value === value)
  return (
    <div style={{ position: 'relative' }}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ ...inputStyle, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          color: selected ? '#fff' : 'rgba(255,255,255,0.35)',
          borderColor: open ? '#0b7f3d' : 'rgba(255,255,255,0.1)',
          background: open ? 'rgba(11,127,61,0.08)' : 'rgba(255,255,255,0.06)',
          userSelect: 'none' }}
      >
        <span>{selected ? selected.label : 'Seleccioná una opción'}</span>
        <span style={{ fontSize: 10, opacity: 0.6 }}>{open ? '▲' : '▼'}</span>
      </div>
      {open && (
        <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 100,
          background: '#0d2a45', border: '1.5px solid #0b7f3d', borderRadius: 8,
          marginTop: 4, overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.4)' }}>
          {options.map(o => (
            <div key={o.value} onClick={() => { onChange(o.value); setOpen(false) }}
              style={{ padding: '12px 14px', fontSize: 15, cursor: 'pointer',
                color: o.value === value ? '#fff' : 'rgba(255,255,255,0.75)',
                background: o.value === value ? 'rgba(11,127,61,0.25)' : 'transparent',
                borderBottom: '1px solid rgba(255,255,255,0.05)' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(11,127,61,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = o.value === value ? 'rgba(11,127,61,0.25)' : 'transparent'}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function Alert({ type, children }) {
  const s = {
    success: { bg: 'rgba(11,127,61,0.15)',   border: 'rgba(11,127,61,0.4)',   color: '#5dda97' },
    error:   { bg: 'rgba(224,60,60,0.12)',   border: 'rgba(224,60,60,0.3)',   color: '#ff8080' },
    info:    { bg: 'rgba(214,164,76,0.12)',  border: 'rgba(214,164,76,0.3)',  color: C.gold   },
  }[type]
  return (
    <div style={{
      background: s.bg, border: `1px solid ${s.border}`, color: s.color,
      borderRadius: 8, padding: '12px 14px', fontSize: 13, lineHeight: 1.5, marginBottom: 14
    }}>
      {children}
    </div>
  )
}

function Btn({ onClick, disabled, variant = 'primary', children, style }) {
  const base = {
    padding: '14px 18px', borderRadius: 8,
    fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700,
    letterSpacing: '1.2px', textTransform: 'uppercase',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none', transition: 'opacity 0.15s', ...style
  }
  const v = {
    primary: { background: disabled ? C.navyMid : `linear-gradient(135deg,${C.green},${C.greenLight})`, color: disabled ? C.gray : '#fff' },
    ghost:   { background: 'transparent', border: '2px solid rgba(255,255,255,0.15)', color: C.gray },
  }[variant]
  return <button onClick={onClick} disabled={disabled} style={{ ...base, ...v }}>{children}</button>
}

function Spinner({ size = 18 }) {
  return (
    <span style={{
      width: size, height: size, border: '2px solid rgba(255,255,255,0.3)',
      borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block',
      animation: 'spin 0.7s linear infinite'
    }} />
  )
}

function ProgressBar({ step }) {
  const labels = ['DNI', 'Datos', 'Foto', 'Firma']
  return (
    <div style={{ padding: '14px 20px 0' }}>
      <div style={{ fontSize: 11, color: C.gray, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
        Paso {step} de 4 — {labels[step - 1]}
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2, transition: 'background 0.4s',
            background: i < step ? C.gold : i === step ? C.green : 'rgba(255,255,255,0.1)'
          }} />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
        {[1,2,3,4].map(i => (
          <div key={i} style={{
            width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 11, fontWeight: 700, transition: 'all 0.3s',
            border: `2px solid ${i < step ? C.gold : i === step ? C.green : 'rgba(255,255,255,0.1)'}`,
            background: i < step ? C.gold : 'transparent',
            color: i < step ? C.navy : i === step ? C.green : C.gray,
            boxShadow: i === step ? '0 0 0 3px rgba(11,127,61,0.15)' : 'none'
          }}>
            {i < step ? '✓' : i === 4 ? '✍' : i}
          </div>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700,
      letterSpacing: '2px', color: C.gold, textTransform: 'uppercase', marginBottom: 14,
      display: 'flex', alignItems: 'center', gap: 8
    }}>
      {children}
      <div style={{ flex: 1, height: 1, background: 'rgba(214,164,76,0.2)' }} />
    </div>
  )
}

function NavButtons({ onBack, onNext, nextLabel = 'Siguiente →', nextDisabled = false, loading = false }) {
  return (
    <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
      {onBack && <Btn variant="ghost" onClick={onBack} style={{ padding: '14px 18px' }}>← Volver</Btn>}
      <Btn onClick={onNext} disabled={nextDisabled || loading} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {loading ? <><Spinner /> Procesando…</> : nextLabel}
      </Btn>
    </div>
  )
}

// ── STEP 1 — Verificación DNI ─────────────────────────────────

function Step1({ onNext }) {
  const [dni, setDni]       = useState('')
  const [genero, setGenero] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult]   = useState(null)

  const ready = dni.length >= 7 && genero && !loading

  async function verify() {
    setLoading(true)
    setResult(null)
    try {
      const res = await fetch('/api/padron', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dni, genero }),
      }).then(r => r.json())
      if (!res.encontrado) {
        setResult({ type: 'error', msg: 'DNI no encontrado en el padron. Verifica el numero ingresado.' })
      } else if (res.afiliado) {
        const tipo = res.yaEnBase ? 'success' : 'error'
        const msg = res.yaEnBase ? 'Ud. ya se encuentra Afiliado/a a MEJOR San Isidro.' : 'Ud. ya se encuentra afiliado/a a otro partido o agrupacion.'
        setResult({ type: tipo, msg })
      } else {
        setResult({ type: 'success', msg: 'Verificado. Podes continuar con la afiliacion.' })
        setTimeout(() => onNext(res.data), 900)
      }
    } catch {
      setResult({ type: 'error', msg: 'Error de conexion. Intenta nuevamente.' })
    }
    setLoading(false)
  }
  return (
    <div className="screen">
      <div style={{ marginBottom: 22 }}>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Verificación de Identidad</h2>
        <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.5 }}>Ingresa tu DNI y genero para afiliarte!</p>
      </div>

      <Card>
        <Field label="Número de DNI (sin puntos)">
          <div style={{ position: 'relative' }}>
            <Input
              type="number" inputMode="numeric" placeholder="00000000"
              value={dni}
              onChange={e => setDni(e.target.value.replace(/\D/g, '').slice(0, 8))}
              style={{ fontSize: 24, fontWeight: 700, letterSpacing: 3, paddingRight: 44 }}
            />
            {dni.length >= 7 && (
              <span style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 18 }}>✔️</span>
            )}
          </div>
        </Field>

        <Field label="Género">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[['M','♂ Masculino'],['F','♀ Femenino']].map(([val, label]) => (
              <button key={val} onClick={() => setGenero(val)} style={{
                padding: 13, borderRadius: 8, cursor: 'pointer',
                border: `2px solid ${genero === val ? C.green : 'rgba(255,255,255,0.1)'}`,
                background: genero === val ? 'rgba(11,127,61,0.15)' : 'rgba(255,255,255,0.04)',
                color: genero === val ? '#fff' : C.gray,
                fontFamily: "'Barlow Condensed',sans-serif", fontSize: 15, fontWeight: 700, letterSpacing: 1,
              }}>{label}</button>
            ))}
          </div>
        </Field>

        {result && <Alert type={result.type}>{result.msg}</Alert>}

        <Btn onClick={verify} disabled={!ready}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          {loading ? <><Spinner /> Consultando padr\u00f3n\u2026</> : 'Afiliarme'}
        </Btn>
      </Card>
    </div>
  )
}

// ── STEP 2 — Formulario ───────────────────────────────────────

function Row({ children }) {
  return <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>{children}</div>
}

function Step2({ padron, onNext, onBack }) {
  const d = padron || {}
  const [f, setF] = useState({
    apellidos: d.apellidos || '', nombres: d.nombres || '',
    matricula: d.matricula || '', sexo: d.sexo || '',
    clase: d.clase || '', fechaNacimiento: d.fechaNacimiento || '',
    nacionalidad: d.nacionalidad || 'ARGENTINA', lugar: d.lugar || '',
    profesion: '', estadoCivil: '',
    distrito: d.distrito || '', localidad: d.localidad || '',
    calle: d.calle || '', numero: d.numero || '', piso: '', dpto: '',
  })
  const set = (k, v) => setF(prev => ({ ...prev, [k]: v }))
  const ro  = k => !!d[k]

  return (
    <div className="screen">
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Datos del Solicitante</h2>
        <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.4 }}>
          Campos <span style={{ color: C.gold }}>AUTO</span> completados desde el padrón.
        </p>
      </div>

      <div style={{ background: 'linear-gradient(135deg,rgba(11,127,61,0.1),rgba(214,164,76,0.06))', border: '1px solid rgba(11,127,61,0.3)', borderRadius: 12, padding: 14, marginBottom: 18, display: 'flex', gap: 10 }}>
        <span style={{ fontSize: 22 }}>📋</span>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 700, color: '#5dda97', marginBottom: 2 }}>Datos del Padrón Electoral</div>
          <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.4 }}>Completá los campos faltantes con información actualizada.</div>
        </div>
      </div>

      <Card>
        <SectionLabel>Datos Personales</SectionLabel>

        <Field label="Apellido(s)" auto={ro('apellidos')}>
          <Input value={f.apellidos} readOnly={ro('apellidos')} placeholder="Ingresá tus apellidos" onChange={e => set('apellidos', e.target.value)} />
        </Field>
        <Field label="Nombre(s)" auto={ro('nombres')}>
          <Input value={f.nombres} readOnly={ro('nombres')} placeholder="Ingresá tus nombres" onChange={e => set('nombres', e.target.value)} />
        </Field>

        <Row>
          <Field label="Matrícula" auto><Input value={f.matricula} readOnly /></Field>
          <Field label="Sexo" auto><Input value={f.sexo} readOnly /></Field>
        </Row>
        <Row>
          <Field label="Clase" auto={ro('clase')}><Input value={f.clase} readOnly={ro('clase')} placeholder="Año" onChange={e => set('clase', e.target.value)} /></Field>
          <Field label="Fecha Nac." auto={ro('fechaNacimiento')}><Input value={f.fechaNacimiento} readOnly={ro('fechaNacimiento')} placeholder="DD/MM/AAAA" onChange={e => { let v = e.target.value.replace(/\D/g,''); if(v.length>=3) v=v.slice(0,2)+'/'+ v.slice(2); if(v.length>=6) v=v.slice(0,5)+'/'+ v.slice(5); v=v.slice(0,10); set('fechaNacimiento', v)}} /></Field>
        </Row>
        <Row>
          <Field label="Nacionalidad" auto={ro('nacionalidad')}><Input value={f.nacionalidad} readOnly={ro('nacionalidad')} onChange={e => set('nacionalidad', e.target.value)} /></Field>
          <Field label="Lugar" auto={ro('lugar')}><Input value={f.lugar} readOnly={ro('lugar')} placeholder="Ciudad" onChange={e => set('lugar', e.target.value)} /></Field>
        </Row>

        <Field label="Profesión u Oficio" required>
          <Input value={f.profesion} placeholder="Ej: Docente, Comerciante…" onChange={e => set('profesion', e.target.value)} />
        </Field>
        <Field label="Estado Civil" required>
          <Select
            value={f.estadoCivil}
            onChange={v => set('estadoCivil', v)}
            options={[
              { value: 'Soltero/a',              label: 'Soltero/a' },
              { value: 'Casado/a',               label: 'Casado/a' },
              { value: 'Divorciado/a',           label: 'Divorciado/a' },
              { value: 'Viudo/a',                label: 'Viudo/a' },
              { value: 'Union Convivencial',     label: 'Union Convivencial' },
            ]}
          />
        </Field>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '18px 0' }} />
        <SectionLabel>Último Domicilio según Doc. Cívico</SectionLabel>

        <Row>
          <Field label="Distrito" auto={ro('distrito')}><Input value={f.distrito} readOnly={ro('distrito')} placeholder="Distrito" onChange={e => set('distrito', e.target.value)} /></Field>
          <Field label="Localidad" auto={ro('localidad')}><Input value={f.localidad} readOnly={ro('localidad')} placeholder="Localidad" onChange={e => set('localidad', e.target.value)} /></Field>
        </Row>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
          <Field label="Calle" auto={ro('calle')}><Input value={f.calle} readOnly={ro('calle')} placeholder="Nombre de calle" onChange={e => set('calle', e.target.value)} /></Field>
          <Field label="N°"><Input value={f.numero} placeholder="0000" onChange={e => set('numero', e.target.value)} /></Field>
        </div>
        <Row>
          <Field label="Piso"><Input value={f.piso} placeholder="—" onChange={e => set('piso', e.target.value)} /></Field>
          <Field label="Dpto"><Input value={f.dpto} placeholder="—" onChange={e => set('dpto', e.target.value)} /></Field>
        </Row>
      </Card>

      <NavButtons onBack={onBack} onNext={() => {
        if (!f.apellidos.trim() || !f.nombres.trim()) { alert('Complet� apellido y nombre'); return }
        if (!f.profesion.trim()) { alert('Complet� tu profesi�n u oficio'); return }
        if (!f.estadoCivil) { alert('Seleccion� tu estado civil'); return }
        if (!f.distrito.trim() || !f.localidad.trim() || !f.calle.trim() || !f.numero.trim()) { alert('Complet� todos los campos de domicilio'); return }
        onNext(f)
      }} />
    </div>
  )
}

// ── STEP 3 — KYC ─────────────────────────────────────────────

function Step3({ onNext, onBack }) {
  const [frente, setFrente] = useState(null)
  const [dorso,  setDorso]  = useState(null)
  const refs = { fFile: useRef(), fCam: useRef(), dFile: useRef(), dCam: useRef() }

  function handleFile(side, e) {
    const file = e.target.files[0]
    if (!file) return
    const isImg = file.type.startsWith('image/')
    if (isImg) {
      const reader = new FileReader()
      reader.onload = ev => {
        const obj = { file, preview: ev.target.result, isImg: true }
        side === 'frente' ? setFrente(obj) : setDorso(obj)
      }
      reader.readAsDataURL(file)
    } else {
      const ext = file.name.split('.').pop().toUpperCase()
      const obj = { file, preview: null, isImg: false, ext }
      side === 'frente' ? setFrente(obj) : setDorso(obj)
    }
  }

  function KycCard({ side, data, fRef, cRef }) {
    return (
      <div style={{
        background: data ? 'rgba(11,127,61,0.07)' : C.navyMid,
        border: `2px ${data ? 'solid' : 'dashed'} ${data ? C.green : 'rgba(255,255,255,0.15)'}`,
        borderRadius: 14, padding: '20px 18px', marginBottom: 14,
      }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: '2px', color: C.gold, marginBottom: 4 }}>Cara del documento</div>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 14 }}>
          DNI — {side === 'frente' ? 'FRENTE' : 'DORSO'}
        </div>

        {data ? (
          <>
            {data.isImg
              ? <img src={data.preview} alt="preview" style={{ width: '100%', maxHeight: 130, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} />
              : <div style={{ fontSize: 36, textAlign: 'center', marginBottom: 8 }}>{data.ext === 'PDF' ? '📄' : '📦'}</div>
            }
            <div style={{ fontSize: 12, color: '#5dda97', marginBottom: 10, wordBreak: 'break-all' }}>✅ {data.file.name}</div>
          </>
        ) : (
          <div style={{ fontSize: 38, textAlign: 'center', marginBottom: 14 }}>🪪</div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => cRef.current.click()} style={{ flex: 1, padding: '10px 6px', borderRadius: 8, background: 'rgba(11,127,61,0.15)', border: `1.5px solid ${C.green}`, color: '#5dda97', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>📷 Tomar Foto</button>
          <button onClick={() => fRef.current.click()} style={{ flex: 1, padding: '10px 6px', borderRadius: 8, background: 'rgba(214,164,76,0.1)',  border: `1.5px solid ${C.gold}`,  color: C.gold,     fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>🗂 Galería / Archivo</button>
        </div>

        <input ref={fRef} type="file" accept="image/*,.pdf,.zip,.doc,.docx" style={{ display: 'none' }} onChange={e => handleFile(side, e)} />
        <input ref={cRef} type="file" accept="image/*" capture="environment"                            style={{ display: 'none' }} onChange={e => handleFile(side, e)} />
      </div>
    )
  }

  return (
    <div className="screen">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Foto del Documento</h2>
        <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.4 }}>Subí una foto clara de ambas caras de tu DNI.</p>
      </div>

      <KycCard side="frente" data={frente} fRef={refs.fFile} cRef={refs.fCam} />
      <KycCard side="dorso"  data={dorso}  fRef={refs.dFile} cRef={refs.dCam} />

      <Alert type="info">📎 Aceptamos JPG, PNG, PDF, ZIP y más. Máx. 10 MB por archivo.</Alert>

      <NavButtons onBack={onBack} onNext={() => {
        if (!frente) { alert('Sub� la foto del DNI frente'); return }
        if (!dorso)  { alert('Sub� la foto del DNI dorso'); return }
        onNext({ frente, dorso })
      }} />
    </div>
  )
}

// ── STEP 4 — Firma ────────────────────────────────────────────

function Step4({ onNext, onBack, loading }) {
  const canvasRef  = useRef()
  const drawing    = useRef(false)
  const hasSig     = useRef(false)
  const [drawn, setDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = '#061b30'
    ctx.lineWidth   = 2.8
    ctx.lineCap     = 'round'
    ctx.lineJoin    = 'round'

    function pos(e) {
      const r = canvas.getBoundingClientRect()
      const sx = canvas.width / r.width, sy = canvas.height / r.height
      const src = e.touches ? e.touches[0] : e
      return { x: (src.clientX - r.left) * sx, y: (src.clientY - r.top) * sy }
    }

    function start(e) { e.preventDefault(); drawing.current = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); if (!hasSig.current) { hasSig.current = true; setDrawn(true) } }
    function move(e)  { e.preventDefault(); if (!drawing.current) return; const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke() }
    function end(e)   { e.preventDefault(); drawing.current = false }

    canvas.addEventListener('mousedown',  start)
    canvas.addEventListener('mousemove',  move)
    canvas.addEventListener('mouseup',    end)
    canvas.addEventListener('mouseleave', end)
    window.addEventListener('mouseup',    end)
    canvas.addEventListener('touchstart', start, { passive: false })
    canvas.addEventListener('touchmove',  move,  { passive: false })
    canvas.addEventListener('touchend',   end,   { passive: false })
    return () => {
      canvas.removeEventListener('mousedown',  start)
      canvas.removeEventListener('mousemove',  move)
      canvas.removeEventListener('mouseup',    end)
      canvas.removeEventListener('mouseleave', end)
      window.removeEventListener('mouseup',    end)
      canvas.removeEventListener('touchstart', start)
      canvas.removeEventListener('touchmove',  move)
      canvas.removeEventListener('touchend',   end)
    }
  }, [])

  function clear() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#061b30'
    ctx.lineWidth = 2.8
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    drawing.current = false
    hasSig.current = false
    setDrawn(false)
  }

  return (
    <div className="screen">
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 26, fontWeight: 700, marginBottom: 4 }}>Firma del Solicitante</h2>
        <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.4 }}>Firmá con tu dedo en el área blanca. Esta firma tiene validez legal.</p>
      </div>

      <Card>
        <SectionLabel>Firma hológrafa digital</SectionLabel>
        <div style={{ position: 'relative', background: '#fff', borderRadius: 8, overflow: 'hidden', border: `2px solid ${drawn ? C.green : 'rgba(255,255,255,0.15)'}`, transition: 'border-color 0.2s' }}>
          <canvas ref={canvasRef} width={800} height={320}
            style={{ display: 'block', width: '100%', height: 180, cursor: 'crosshair', touchAction: 'none' }} />
          {!drawn && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 24, pointerEvents: 'none' }}>
              <div style={{ width: '75%', height: 1, background: '#d0d0d0' }} />
              <div style={{ color: '#b0b0b0', fontSize: 12, fontStyle: 'italic', marginTop: 6 }}>Firmá aquí con tu dedo</div>
            </div>
          )}
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button onClick={clear} style={{ padding: '9px 14px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 8, color: C.gray, fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>🗑 Limpiar</button>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', paddingLeft: 12, fontSize: 12, color: C.gray }}>✍️ Usá el dedo o stylus</div>
        </div>
      </Card>

      <Alert type="info">🔒 Tus datos son tratados según la Ley N° 25.326 de Protección de Datos Personales.</Alert>

      <NavButtons
        onBack={onBack}
        onNext={() => onNext(canvasRef.current.toDataURL('image/png'))}
        nextLabel="Enviar Solicitud ✓"
        loading={loading}
      />
    </div>
  )
}

// ── SUCCESS ────────────────────────────────────────────────────

function Success({ numSeg: numRef, onRestart }) {
  return (
    <div className="screen" style={{ textAlign: 'center', padding: '32px 0' }}>
      <div style={{ width: 80, height: 80, background: `linear-gradient(135deg,${C.green},${C.greenLight})`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 20px', boxShadow: '0 0 40px rgba(11,127,61,0.3)' }}>✅</div>
      <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 32, color: C.green, marginBottom: 10 }}>¡Solicitud Enviada!</h2>
      <p style={{ fontSize: 14, color: C.gray, lineHeight: 1.6, maxWidth: 300, margin: '0 auto 20px' }}>
        Tu solicitud fue recibida y será procesada en los próximos días hábiles.
      </p>
      <div style={{ background: C.navyMid, borderRadius: 10, padding: 16, border: '1px solid rgba(214,164,76,0.3)', marginBottom: 20 }}>
        <div style={{ fontSize: 11, color: C.gold, letterSpacing: '1.5px', textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Número de seguimiento</div>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 30, fontWeight: 700, letterSpacing: 3 }}>{numRef}</div>
      </div>
      <div style={{ background: C.navyMid, borderRadius: 10, padding: 14, textAlign: 'left', fontSize: 13, color: C.gray, lineHeight: 1.7, marginBottom: 20 }}>
        📧 Recibirás novedades por los canales oficiales del partido.<br />
        📍 <strong style={{ color: C.gold }}>MEJOR San Isidro</strong>
      </div>
      <Btn onClick={onRestart} style={{ width: '100%' }}>Nueva afiliación</Btn>
    </div>
  )
}

// ── MAIN ──────────────────────────────────────────────────────

export default function App() {
  const [step,    setStep]    = useState(1)
  const [padron,  setPadron]  = useState(null)
  const [form,    setForm]    = useState(null)
  const [docs,    setDocs]    = useState(null)
  const [loading, setLoading] = useState(false)
  const [numSeg,  setNumSeg]  = useState(null)
  const [error,   setError]   = useState(null)

  function restart() { setStep(1); setPadron(null); setForm(null); setDocs(null); setLoading(false); setNumSeg(null); setError(null) }

  async function handleSubmit(firma) {
    setLoading(true)
    setError(null)
    try {
      const { createClient } = await import('@supabase/supabase-js')
      const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_AFILIADOS_URL, process.env.NEXT_PUBLIC_SUPABASE_AFILIADOS_ANON_KEY)
      const folder = Date.now().toString()
      let dniFrente_path = null, dniDorso_path = null, firma_path = null
      if (docs?.frente?.file) {
        const ext = docs.frente.file.name.split('.').pop().toLowerCase()
        const path = folder + '/frente.' + ext
        const { error: e } = await sb.storage.from('dni-docs').upload(path, docs.frente.file, { upsert: true })
        if (!e) dniFrente_path = path; else console.warn('frente:', e)
      }
      if (docs?.dorso?.file) {
        const ext = docs.dorso.file.name.split('.').pop().toLowerCase()
        const path = folder + '/dorso.' + ext
        const { error: e } = await sb.storage.from('dni-docs').upload(path, docs.dorso.file, { upsert: true })
        if (!e) dniDorso_path = path; else console.warn('dorso:', e)
      }
      if (firma) {
        const base64 = firma.replace(/^data:image\/png;base64,/, '')
        const binary = Uint8Array.from(atob(base64), c => c.charCodeAt(0))
        const path = folder + '/firma.png'
        const { error: e } = await sb.storage.from('firmas').upload(path, binary, { contentType: 'image/png', upsert: true })
        if (!e) firma_path = path; else console.warn('firma:', e)
      }
      const payload = { ...form, dniFrente_path, dniDorso_path, firma_path, folder }
      const res = await fetch('/api/afiliacion', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(r => r.json())
      if (!res.ok) throw new Error(res.error || 'Error al guardar.')
      setNumSeg(res.numeroSeguimiento)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }
  const done = !!numSeg
  return (
      <div style={{ background: C.navy, maxWidth: 480, margin: '0 auto', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ background: C.navy, padding: '18px 20px 0', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: done ? 0 : 4 }}>
            <img src="/logo.png" alt="MEJOR San Isidro" style={{ height: 48, width: 'auto', objectFit: 'contain' }} />
            <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 18, fontWeight: 700, color: '#d6a44c', letterSpacing: '1px' }}>Afiliate!</span>
            <HamburgerMenu />
          </div>
          {!done && <ProgressBar step={step} />}
        </div>
        {/* Content */}
        <div style={{ flex: 1, padding: '20px 20px 40px', overflowY: 'auto' }}>






          {error && <Alert type="error">{error}</Alert>}
          {done
            ? <Success numSeg={numSeg} onRestart={restart} />
            : step === 1 ? <Step1 onNext={d  => { setPadron(d); setStep(2) }} />
            : step === 2 ? <Step2 padron={padron} onNext={d => { setForm(d); setStep(3) }} onBack={() => setStep(1)} />
            : step === 3 ? <Step3 onNext={d => { setDocs(d); setStep(4) }} onBack={() => setStep(2)} />
            : <Step4 onNext={handleSubmit} onBack={() => setStep(3)} loading={loading} />
          }
        </div>
      </div>
  )
}
