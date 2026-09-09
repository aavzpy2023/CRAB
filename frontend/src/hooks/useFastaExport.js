import { useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/**
 * Headless hook to serialize unified UI state back into FASTA files.
 * Provides memory-safe Blob operations strictly separated from view logic.
 * 
 * @returns {object} { exportAll, exportCoding, exportNonCoding }
 */
export const useFastaExport = () => {
    /**
     * Serializes an array of sequences into a raw FASTA Blob.
     * @param {Array} data - Array of unified sequence objects
     * @returns {Blob} Generated FASTA text blob
     */
    const formatHeader = (headerId) => {
        if (!headerId) return '';
        // Locate 'gene:<symbol>' and split immediately after its value
        const geneRegex = /(gene:\S+)\s+(.+)/;
        if (geneRegex.test(headerId)) {
            return headerId.replace(geneRegex, '$1\n$2');
        }
        return headerId;
    };

    const wrapSequence = (seq, lineLength = 60) => {
        if (!seq) return '';
        const cleanSeq = seq.replace(/\s+/g, '');
        const regex = new RegExp(`.{1,${lineLength}}`, 'g');
        const chunks = cleanSeq.match(regex);
        return chunks ? chunks.join('\n') : cleanSeq;
    };

    const generateFastaText = (data) => {
        return data.map(d => {
            const cleanId = (d.id || '').trim().replace(/^>/, '').split(/\s+/)[0];
            const label = isCoding(d) ? 'coding_protein' : 'ncRNA';
            const prob = Number(d.probability || 0).toFixed(4);
            return `>${cleanId} prediction=${label} prob=${prob}\n${wrapSequence(d.sequence, 60)}`;
        }).join('\n') + '\n';
    };

    const triggerZipDownload = async (fastaContent, fastaFilename, zipFilename) => {
        const zip = new JSZip();
        zip.file(fastaFilename, fastaContent);
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, zipFilename);
    };

    const exportAll = useCallback(async (data) => {
        if (!data || data.length === 0) return;
        const codingData = data.filter(isCoding);
        const nonCodingData = data.filter(isNonCoding);
        const zip = new JSZip();
        zip.file('coding_protein.fasta', generateFastaText(codingData));
        zip.file('ncRNA.fasta', generateFastaText(nonCodingData));
        const zipBlob = await zip.generateAsync({ type: 'blob' });
        saveAs(zipBlob, 'predictions.zip');
    }, []);

    const isCoding = (d) => {
        const cls = (d.classification || d.prediction || '').toLowerCase();
        return cls.includes('coding') && !cls.includes('non');
    };

    const isNonCoding = (d) => {
        const cls = (d.classification || d.prediction || '').toLowerCase();
        return cls.includes('ncrna') || cls.includes('non');
    };

    const exportCoding = useCallback(async (data) => {
        if (!data || data.length === 0) return;
        const filtered = data.filter(isCoding);
        const text = generateFastaText(filtered);
        await triggerZipDownload(text, 'coding_protein.fasta', 'coding_protein.zip');
    }, []);

    const exportNonCoding = useCallback(async (data) => {
        if (!data || data.length === 0) return;
        const filtered = data.filter(isNonCoding);
        const text = generateFastaText(filtered);
        await triggerZipDownload(text, 'ncRNA.fasta', 'ncRNA.zip');
    }, []);

    return { exportAll, exportCoding, exportNonCoding };
};