import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Download from '../Download';

describe('Download Page Fractality', () => {
    it('renders download links correctly pointing to static bundles', () => {
        render(<Download />);
        
        // Assert Standalone CLI link
        const cliLink = screen.getByRole('link', { name: /Download CLI/i });
        expect(cliLink).toHaveAttribute('href', '/standalone.zip');
        expect(cliLink).toHaveAttribute('download', 'standalone.zip');

        // Assert Sample Datasets link
        const samplesLink = screen.getByRole('link', { name: /Download Sample Data/i });
        expect(samplesLink).toHaveAttribute('href', '/samples.zip');
        expect(samplesLink).toHaveAttribute('download', 'samples.zip');
    });
});