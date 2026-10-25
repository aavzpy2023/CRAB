export async function runInferenceApi(file, organism) {
  if (!file) {
    throw new Error('Debe seleccionar un archivo FASTA.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('organism', organism || 'Homo sapiens');

  const response = await fetch('/api/inference', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || 'Error al ejecutar la inferencia en el servidor.'
    );
  }

  return await response.json();
}
