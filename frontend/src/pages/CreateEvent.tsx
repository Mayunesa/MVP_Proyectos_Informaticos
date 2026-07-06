import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Header from '../components/common/Header';
import { createEventStyles as s } from '../styles/pages/CreateEvent_styles';
import { colors, spacing, radii, typography } from '../styles/Global';
import type {
  EventoFormData, Proveedor,
  EventoProveedorFormData, ContratoClienteFormData,
} from '../types/event.types';
import {
  createEvent, updateEvent, getEventById,
  getProviders, createEventProvider, getEventProviders, deleteEventProvider,
  createContract, getContracts,
} from '../services/eventApi';

const emptyEvent: EventoFormData = {
  nombre_evento: '',
  tipo_evento: 'Corporativo',
  fecha_evento: '',
  presupuesto_total: 0,
};

const emptyProviderRow: EventoProveedorFormData = {
  id_proveedor: '',
  servicio_acordado: '',
  costo_acordado: 0,
  estado_reserva: 'Pendiente',
};

const EventForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<EventoFormData>(emptyEvent);
  const [errors, setErrors] = useState<Partial<Record<keyof EventoFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  const [providers, setProviders] = useState<Proveedor[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<EventoProveedorFormData[]>([]);

  const [contract, setContract] = useState<ContratoClienteFormData | null>(null);

  useEffect(() => {
    getProviders().then(setProviders).catch(() => {});
  }, []);

  useEffect(() => {
    if (!id) return;
    Promise.all([
      getEventById(id),
      getEventProviders(),
      getContracts(),
    ])
      .then(([evento, eps, contratos]) => {
        setFormData({
          nombre_evento: evento.nombre_evento,
          tipo_evento: evento.tipo_evento,
          fecha_evento: evento.fecha_evento,
          presupuesto_total: evento.presupuesto_total,
        });
        setSelectedProviders(
          eps.filter(ep => ep.id_evento === id).map(ep => ({
            id_proveedor: ep.id_proveedor,
            servicio_acordado: ep.servicio_acordado,
            costo_acordado: ep.costo_acordado,
            porcentaje_penalidad_aplicado: ep.porcentaje_penalidad_aplicado,
            estado_reserva: ep.estado_reserva,
          }))
        );
        const ct = contratos.find(c => c.id_evento === id);
        if (ct) {
          setContract({
            fecha_firma: ct.fecha_firma,
            anticipo_pagado: ct.anticipo_pagado,
            url_documento_firmado: ct.url_documento_firmado || undefined,
            estado_contrato: ct.estado_contrato,
          });
        }
      })
      .catch(() => navigate('/eventos'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = (field: keyof EventoFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const [emailCliente, setEmailCliente] = useState('');
  const [firmado, setFirmado] = useState(false);

  const addProviderRow = () => {
    setSelectedProviders(prev => [...prev, { ...emptyProviderRow }]);
  };

  const updateProviderRow = (index: number, data: Partial<EventoProveedorFormData>) => {
    setSelectedProviders(prev =>
      prev.map((r, i) => (i === index ? { ...r, ...data } : r))
    );
  };

  const removeProviderRow = (index: number) => {
    setSelectedProviders(prev => prev.filter((_, i) => i !== index));
  };

  const handleContractChange = (field: keyof ContratoClienteFormData, value: string | number | undefined) => {
    setContract(prev => prev ? { ...prev, [field]: value } : null);
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof EventoFormData, string>> = {};
    if (!formData.nombre_evento.trim()) newErrors.nombre_evento = 'El nombre del evento es obligatorio';
    if (!formData.fecha_evento) newErrors.fecha_evento = 'La fecha es obligatoria';
    if (formData.presupuesto_total < 0) newErrors.presupuesto_total = 'El presupuesto no puede ser negativo';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const payload = { ...formData, estado: firmado ? 'Confirmado' as const : 'Cotizacion' as const };
      const evento = isEdit && id
        ? await updateEvent(id, payload)
        : await createEvent(payload);

      const eventId = evento.id;

      if (isEdit && id) {
        const existing = await getEventProviders();
        const toRemove = existing.filter(ep => ep.id_evento === id);
        await Promise.all(toRemove.map(ep => deleteEventProvider(ep.id!).catch(() => {})));
      }

      await Promise.all(
        selectedProviders
          .filter(p => p.id_proveedor)
          .map(p =>
            createEventProvider({
              id_evento: eventId,
              id_proveedor: p.id_proveedor,
              servicio_acordado: p.servicio_acordado,
              costo_acordado: p.costo_acordado,
              porcentaje_penalidad_aplicado: p.porcentaje_penalidad_aplicado,
              estado_reserva: p.estado_reserva,
            }).catch(() => {})
          )
      );

      if (contract?.fecha_firma && contract.anticipo_pagado >= 0) {
        await createContract({
          id_evento: eventId,
          fecha_firma: contract.fecha_firma,
          anticipo_pagado: contract.anticipo_pagado,
          url_documento_firmado: contract.url_documento_firmado,
          estado_contrato: contract.estado_contrato,
        }).catch(() => {});
      }

      navigate('/eventos');
    } catch {
      // TODO: mostrar notificación de error al usuario
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={s.page}>
        <Header />
        <main style={{ ...s.main, alignItems: 'center', paddingTop: '3rem' }}>
          <p style={{ color: colors.textSecondary, fontFamily: 'inherit' }}>Cargando evento...</p>
        </main>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <Header />
      <main style={s.main}>
        <div style={s.headerSection}>
          <h1 style={s.heading}>{isEdit ? 'Editar Evento' : 'Crear Evento'}</h1>
          <p style={s.subheading}>
            {isEdit ? 'Modifica los datos del evento' : 'Completa los datos para registrar un nuevo evento'}
          </p>
        </div>

        <form style={s.form} onSubmit={handleSubmit}>
          <div style={s.card}>
            <h2 style={s.cardTitle}>Información General</h2>
            <div style={s.fieldGroup}>
              <label style={s.label}>Nombre del Evento *</label>
              <input style={s.input} type="text" value={formData.nombre_evento}
                onChange={e => handleChange('nombre_evento', e.target.value)}
                placeholder="Ej: Boda de María y Juan" />
              {errors.nombre_evento && <span style={s.errorText}>{errors.nombre_evento}</span>}
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>Tipo de Evento *</label>
              <select style={s.select} value={formData.tipo_evento}
                onChange={e => handleChange('tipo_evento', e.target.value)}>
                <option value="Corporativo">Corporativo</option>
                <option value="Social">Social</option>
                <option value="Matrimonio">Matrimonio</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
          </div>

          <div style={s.card}>
            <h2 style={s.cardTitle}>Fecha</h2>
            <div style={s.fieldGroup}>
              <label style={s.label}>Fecha del Evento *</label>
              <input style={s.input} type="date" value={formData.fecha_evento}
                onChange={e => handleChange('fecha_evento', e.target.value)} />
              {errors.fecha_evento && <span style={s.errorText}>{errors.fecha_evento}</span>}
            </div>
          </div>

          <div style={s.card}>
            <h2 style={s.cardTitle}>Presupuesto</h2>
            <div style={s.fieldGroup}>
              <label style={s.label}>Presupuesto Total *</label>
              <input style={s.input} type="number" min={0} value={formData.presupuesto_total || ''}
                onChange={e => handleChange('presupuesto_total', Number(e.target.value))} placeholder="0" />
              {errors.presupuesto_total && <span style={s.errorText}>{errors.presupuesto_total}</span>}
            </div>
          </div>

          <div style={s.card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={s.cardTitle}>Proveedores</h2>
              <button type="button" style={{
                display: 'flex', alignItems: 'center', gap: spacing.sm,
                padding: `${spacing.xs} ${spacing.md}`, backgroundColor: colors.primary,
                color: colors.white, border: 'none', borderRadius: radii.sm,
                fontSize: typography.sizes.sm, fontWeight: typography.weights.medium,
                fontFamily: typography.fontFamily, cursor: 'pointer',
              }} onClick={addProviderRow}>
                <Plus size={14} /> Agregar
              </button>
            </div>
            {selectedProviders.length === 0 && (
              <p style={{ fontSize: typography.sizes.sm, color: colors.textSecondary, fontFamily: typography.fontFamily }}>
                No se han agregado proveedores
              </p>
            )}
            {selectedProviders.map((row, i) => (
              <div key={i} style={{ display: 'flex', gap: spacing.md, alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <div style={{ ...s.fieldGroup, flex: '1 1 12rem' }}>
                  <label style={s.label}>Proveedor</label>
                  <select style={s.select} value={row.id_proveedor}
                    onChange={e => {
                      const p = providers.find(pr => pr.id === e.target.value);
                      updateProviderRow(i, {
                        id_proveedor: e.target.value,
                        servicio_acordado: p?.categoria || '',
                        porcentaje_penalidad_aplicado: p?.penalidad_default_porcentaje ?? 0,
                      });
                    }}>
                    <option value="">Seleccionar...</option>
                    {providers.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre_empresa}</option>
                    ))}
                  </select>
                </div>
                <div style={{ ...s.fieldGroup, flex: '1 1 10rem' }}>
                  <label style={s.label}>Servicio</label>
                  <div style={{
                    ...s.input, backgroundColor: colors.background, color: colors.textSecondary,
                    display: 'flex', alignItems: 'center', minHeight: '2.5rem',
                  }}>
                    {row.servicio_acordado || '—'}
                  </div>
                </div>
                <div style={{ ...s.fieldGroup, flex: '0 1 8rem' }}>
                  <label style={s.label}>Costo</label>
                  <input style={s.input} type="number" min={0} value={row.costo_acordado || ''}
                    onChange={e => updateProviderRow(i, { costo_acordado: Number(e.target.value) })}
                    placeholder="0" />
                </div>
                <div style={{ ...s.fieldGroup, flex: '0 1 8rem' }}>
                  <label style={s.label}>Penalidad %</label>
                  <input style={s.input} type="number" min={0} max={100}
                    value={row.porcentaje_penalidad_aplicado ?? ''}
                    onChange={e => updateProviderRow(i, { porcentaje_penalidad_aplicado: Number(e.target.value) })}
                    placeholder="0" />
                </div>
                <button type="button" style={{
                  padding: spacing.sm, background: 'none', border: 'none', cursor: 'pointer',
                  color: colors.danger, marginBottom: spacing.xs,
                }} onClick={() => removeProviderRow(i)} title="Eliminar proveedor">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>

          <div style={s.card}>
            <h2 style={s.cardTitle}>Contrato</h2>
            {!contract && (
              <button type="button" style={{
                display: 'flex', alignItems: 'center', gap: spacing.sm, padding: `${spacing.sm} ${spacing.md}`,
                backgroundColor: 'transparent', color: colors.primary, border: `1px solid ${colors.border}`,
                borderRadius: radii.sm, fontSize: typography.sizes.sm, fontWeight: typography.weights.medium,
                fontFamily: typography.fontFamily, cursor: 'pointer', alignSelf: 'flex-start',
              }} onClick={() => setContract({
                fecha_firma: '', anticipo_pagado: 0, estado_contrato: 'Vigente',
              })}>
                <Plus size={14} /> Agregar Contrato
              </button>
            )}
            {contract && (
              <>
                <div style={s.row}>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Email Cliente</label>
                    <div style={{ display: 'flex', gap: spacing.sm }}>
                      <input style={s.input} type="email" value={emailCliente}
                        onChange={e => setEmailCliente(e.target.value)}
                        placeholder="cliente@ejemplo.com" />
                      <button type="button" style={{
                        padding: `${spacing.sm} ${spacing.lg}`, backgroundColor: colors.primary,
                        color: colors.white, border: 'none', borderRadius: radii.sm,
                        fontSize: typography.sizes.sm, fontWeight: typography.weights.medium,
                        fontFamily: typography.fontFamily, cursor: 'pointer', whiteSpace: 'nowrap',
                      }}>
                        Enviar
                      </button>
                    </div>
                  </div>
                </div>
                <div style={s.row}>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Fecha de Firma</label>
                    <input style={s.input} type="date" value={contract.fecha_firma}
                      onChange={e => handleContractChange('fecha_firma', e.target.value)} />
                  </div>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Anticipo Pagado</label>
                    <input style={s.input} type="number" min={0} value={contract.anticipo_pagado || ''}
                      onChange={e => handleContractChange('anticipo_pagado', Number(e.target.value))} placeholder="0" />
                  </div>
                </div>
                <div style={s.row}>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>URL Documento</label>
                    <input style={s.input} type="text" value={contract.url_documento_firmado || ''}
                      onChange={e => handleContractChange('url_documento_firmado', e.target.value || undefined)}
                      placeholder="https://..." />
                  </div>
                  <div style={s.fieldGroup}>
                    <label style={s.label}>Estado del Contrato</label>
                    <select style={s.select} value={contract.estado_contrato}
                      onChange={e => handleContractChange('estado_contrato', e.target.value)}>
                      <option value="Vigente">Vigente</option>
                      <option value="Cancelado">Cancelado</option>
                      <option value="Reagendado">Reagendado</option>
                    </select>
                  </div>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: spacing.sm, cursor: 'pointer', fontFamily: typography.fontFamily, fontSize: typography.sizes.base }}>
                  <input type="checkbox" checked={firmado}
                    onChange={e => setFirmado(e.target.checked)}
                    style={{ width: '1.125rem', height: '1.125rem', cursor: 'pointer' }} />
                  Firmado
                </label>
                <button type="button" style={{
                  display: 'flex', alignItems: 'center', gap: spacing.xs, padding: `${spacing.xs} ${spacing.md}`,
                  background: 'none', border: `1px solid ${colors.danger}`, borderRadius: radii.sm,
                  color: colors.danger, fontSize: typography.sizes.sm, cursor: 'pointer', alignSelf: 'flex-start',
                  fontFamily: typography.fontFamily,
                }} onClick={() => setContract(null)}>
                  <Trash2 size={14} /> Quitar Contrato
                </button>
              </>
            )}
          </div>

          <div style={s.actions}>
            <button type="button" style={s.buttonSecondary} onClick={() => navigate('/eventos')}>
              <ArrowLeft size={16} /> Cancelar
            </button>
            <button type="submit" style={s.buttonPrimary} disabled={submitting}>
              <Save size={16} />
              {submitting ? 'Guardando...' : isEdit ? 'Guardar Cambios' : 'Guardar Evento'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EventForm;
