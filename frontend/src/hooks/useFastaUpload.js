import { useState, useCallback } from 'react';

const VALID_EXTENSIONS = [
  '.fasta', '.fa', '.fna', '.ffn', '.faa', '.frn', '.txt'
];

export function useFastaUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const validateAndSetFile = useCallback(async (selectedFile) => {
    if (!selectedFile) {
      setFile(null);
      setError(null);
      return;
    }

    const fileName = selectedFile.name.toLowerCase();
    const isValid = VALID_EXTENSIONS.some((ext) => fileName.endsWith(ext));

    if (!isValid) {
      setFile(null);
      setError('Invalid format. Must be a .fasta or .fa file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    setIsUploading(true);
    try {
      const slice = selectedFile.slice(0, 512);
      const preview = await slice.text();
      if (preview.trim() && !preview.trim().startsWith('>')) {
        throw new Error("Invalid FASTA: sequences must begin with '>'");
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);
      try {
        await fetch('/api/v1/fasta/upload', {
          method: 'POST',
          body: formData,
          signal: controller.signal,
        });
      } catch {
        // Fallback: local validation passed, do not block UI
      } finally {
        clearTimeout(timeoutId);
      }

      await new Promise((r) => setTimeout(r, 300));
      setFile(selectedFile);
      setError(null);
    } catch (err) {
      setFile(null);
      setError(err.message);
    } finally {
      setIsUploading(false);
    }
  }, []);

  const handleFileSelect = useCallback((selectedFile) => {
    validateAndSetFile(selectedFile);
  }, [validateAndSetFile]);

  const clearFile = useCallback(() => {
    setFile(null);
    setError(null);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  }, [validateAndSetFile]);

  return {
    file,
    error,
    isDragging,
    isUploading,
    handleFileSelect,
    clearFile,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  };
}

export default useFastaUpload;