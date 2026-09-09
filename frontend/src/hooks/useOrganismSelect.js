import { useState, useCallback, useEffect } from 'react';

const DEFAULT_MODELS = ['Bacteria', 'new_xgb_model3 (1)'];

export function useOrganismSelect(initialOrganism = '') {
    const [selectedOrganism, setOrganism] = useState(
        initialOrganism || DEFAULT_MODELS[0]
    );
    const [organismOptions, setOptions] = useState(DEFAULT_MODELS);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

        const fetchModels = async () => {
            try {
                const response = await fetch('/api/v1/models', {
                    signal: controller.signal
                });
                if (!response.ok) throw new Error('Network error');
                const data = await response.json();
                const models = data.models || [];
                if (models.length > 0) {
                    setOptions(models);
                    setOrganism(models[0]);
                } else {
                    setOptions(['No models found']);
                    setOrganism('No models found');
                }
            } catch (error) {
                // Fallback graceful: keep preloaded models
            } finally {
                clearTimeout(timeoutId);
                setIsLoading(false);
            }
        };
        fetchModels();
        return () => {
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [initialOrganism]);

    const setSelectedOrganism = useCallback((organism) => {
        setOrganism(organism);
    }, []);

    return {
        selectedOrganism,
        organismOptions,
        setSelectedOrganism,
        isLoading,
    };
}

export default useOrganismSelect;