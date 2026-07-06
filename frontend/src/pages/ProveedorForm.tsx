import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft } from 'lucide-react';
import Header from '../components/common/Header';
import { proveedorFormStyles as s } from '../styles/pages/ProveedorForm_styles';
import { colors } from '../styles/Global';
import type { ProveedorFormData } from '../types/event.types';
import { getProviderById, createProvider, updateProvider } from '../services/eventApi';

const emptyForm: ProveedorFormData = {
  nombre_empresa: '',
  categoria: '',
  contacto_nombre: '',
  telefono: '',
  email: '',
  estado_alianza: 'Activo',
  penalidad_default_porcentaje: 0,
};

const ProveedorForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [formData, setFormData] = useState<ProveedorFormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ProveedorFormData, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!id) return;
    getProviderById(id)
      .then(provider => {
        setFormData({
          nombre_empresa: provider.nombre_empresa,
          categoria: provider.categoria,
          contacto_nombre: provider.contacto_nombre || '',
          telefono: provider.telefono || '',
          email: provider.email || '',
          estado_alianza: provider.estado_alianza,
          penalidad_default_porcentaje: provider.penalidad_default_porcentaje,
        });
      })
      .catch(() => navigate('/proveedores'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  const handleChange = (field: keyof ProveedorFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProveedorFormData, string>> = {};
    if (!formData.nombre_empresa.trim()) newErrors.nombre_empresa = 'El nombre de la empresa es obligatorio';
    if (!formData.categoria.trim()) newErrors.categoria = 'La categoría es obligatoria';
    if (formData.penalidad_default_porcentaje < 0 || formData.penalidad_default_porcentaje > 100) {
      newErrors.penalidad_default_porcentaje = 'Debe estar entre 0 y 100';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      if (isEdit && id) {
        await updateProvider(id, formData);
      } else {
        await createProvider(formData);
      }
      navigate('/proveedores');
    } catch {
      // TODO: mostrar notificación de error
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={s.page}>
        <Header />
        <main style={{ ...s.main, alignItems: 'center', paddingTop: '3rem' }}>
          <p style={{ color: colors.textSecondary, fontFamily: 'inherit' }}>Cargando proveedor...</p>
        </main>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <Header />
      <main style={s.main}>
        <div style={s.headerSection}>
          <h1 style={s.heading}>{isEdit ? 'Editar Proveedor' : 'Nuevo Proveedor'}</h1>
          <p style={s.subheading}>
            {isEdit ? 'Modifica los datos del proveedor' : 'Registra un nuevo proveedor en el sistema'}
          </p>
        </div>

        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
          <div style={s.card}>
            <h2 style={s.cardTitle}>Información de la Empresa</h2>
            <div style={s.fieldGroup}>
              <label style={s.label}>Nombre de la Empresa *</label>
              <input style={s.input} type="text" value={formData.nombre_empresa}
                onChange={e => handleChange('nombre_empresa', e.target.value)}
                placeholder="Ej: Banquetería Don Sabor" />
              {errors.nombre_empresa && <span style={s.errorText}>{errors.nombre_empresa}</span>}
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>Categoría *</label>
              <input style={s.input} type="text" value={formData.categoria}
                onChange={e => handleChange('categoria', e.target.value)}
                placeholder="Ej: Banquetería, Florería, Música" />
              {errors.categoria && <span style={s.errorText}>{errors.categoria}</span>}
            </div>
            <div style={s.row}>
              <div style={s.fieldGroup}>
                <label style={s.label}>Estado de Alianza</label>
                <select style={s.select} value={formData.estado_alianza}
                  onChange={e => handleChange('estado_alianza', e.target.value)}>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div style={s.fieldGroup}>
                <label style={s.label}>Penalidad Default %</label>
                <input style={s.input} type="number" min={0} max={100}
                  value={formData.penalidad_default_porcentaje || ''}
                  onChange={e => handleChange('penalidad_default_porcentaje', Number(e.target.value))}
                  placeholder="0" />
                {errors.penalidad_default_porcentaje && <span style={s.errorText}>{errors.penalidad_default_porcentaje}</span>}
              </div>
            </div>
          </div>

          <div style={s.card}>
            <h2 style={s.cardTitle}>Contacto</h2>
            <div style={s.row}>
              <div style={s.fieldGroup}>
                <label style={s.label}>Nombre de Contacto</label>
                <input style={s.input} type="text" value={formData.contacto_nombre || ''}
                  onChange={e => handleChange('contacto_nombre', e.target.value)}
                  placeholder="Nombre del contacto" />
              </div>
              <div style={s.fieldGroup}>
                <label style={s.label}>Teléfono</label>
                <input style={s.input} type="text" value={formData.telefono || ''}
                  onChange={e => handleChange('telefono', e.target.value)}
                  placeholder="+56 9 1234 5678" />
              </div>
            </div>
            <div style={s.fieldGroup}>
              <label style={s.label}>Email</label>
              <input style={s.input} type="email" value={formData.email || ''}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="contacto@empresa.cl" />
            </div>
          </div>

          <div style={s.actions}>
            <button type="button" style={s.buttonSecondary} onClick={() => navigate('/proveedores')}>
              <ArrowLeft size={16} /> Cancelar
            </button>
            <button type="submit" style={s.buttonPrimary} disabled={submitting}>
              <Save size={16} />
              {submitting ? 'Guardando...' : isEdit ? 'Guardar Cambios' : 'Guardar Proveedor'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default ProveedorForm;
