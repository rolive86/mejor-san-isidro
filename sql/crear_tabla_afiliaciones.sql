-- Ejecutar en: Supabase AFILIADOS → SQL Editor
-- Proyecto: dcrtzqjjfjdgmccrbyau

CREATE TABLE IF NOT EXISTS afiliaciones (
  id                  uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  numero_seguimiento  text GENERATED ALWAYS AS ('MSI-' || substr(id::text, 1, 8)) STORED,

  -- Padrón
  dni                 numeric NOT NULL,
  sexo                text,
  apellidos           text,
  nombres             text,
  matricula           text,
  clase               text,
  fecha_nacimiento    text,
  nacionalidad        text,
  lugar               text,

  -- Completado por solicitante
  profesion           text,
  estado_civil        text,

  -- Domicilio
  distrito            text,
  localidad           text,
  calle               text,
  numero              text,
  piso                text,
  dpto                text,

  -- Archivos (paths en Storage)
  dni_frente_path     text,
  dni_dorso_path      text,
  firma_path          text,

  -- Control
  estado              text NOT NULL DEFAULT 'PENDIENTE',
  ip_solicitante      text,
  created_at          timestamptz DEFAULT now() NOT NULL,
  updated_at          timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_afiliaciones_dni     ON afiliaciones (dni);
CREATE INDEX IF NOT EXISTS idx_afiliaciones_estado  ON afiliaciones (estado);
CREATE INDEX IF NOT EXISTS idx_afiliaciones_created ON afiliaciones (created_at DESC);

-- Auto updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_afiliaciones_updated_at
  BEFORE UPDATE ON afiliaciones
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS: solo service_role puede operar
ALTER TABLE afiliaciones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Solo servicio interno"
  ON afiliaciones FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- Storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES ('dni-docs', 'dni-docs', false), ('firmas', 'firmas', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Upload dni-docs"  ON storage.objects FOR INSERT TO service_role WITH CHECK (bucket_id = 'dni-docs');
CREATE POLICY "Select dni-docs"  ON storage.objects FOR SELECT TO service_role USING (bucket_id = 'dni-docs');
CREATE POLICY "Upload firmas"    ON storage.objects FOR INSERT TO service_role WITH CHECK (bucket_id = 'firmas');
CREATE POLICY "Select firmas"    ON storage.objects FOR SELECT TO service_role USING (bucket_id = 'firmas');
