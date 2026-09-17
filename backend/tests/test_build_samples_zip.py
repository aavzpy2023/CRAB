import importlib.util
from unittest.mock import patch, MagicMock

def load_script():
    """Dynamically loads the script to bypass __init__ and PYTHONPATH issues."""
    spec = importlib.util.spec_from_file_location(
        "build_samples_zip", "_scripts/dev/build_samples_zip.py"
    )
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod

def test_create_samples_zip():
    # Arrange
    mod = load_script()
    
    with patch.object(mod, "zipfile") as mock_zipfile, \
         patch.object(mod.os, "makedirs"), \
         patch.object(mod.os, "listdir", return_value=["sample.txt", "sample.fasta"]), \
         patch.object(mod.os.path, "exists", return_value=True), \
         patch.object(mod.os.path, "isfile", return_value=True):
         
        mock_zip_instance = MagicMock()
        mock_zipfile.ZipFile.return_value.__enter__.return_value = mock_zip_instance
        
        # Act
        mod.create_samples_zip()
        
        # Assert
        mock_zipfile.ZipFile.assert_called_once_with("frontend/public/samples.zip", "w")
        assert mock_zip_instance.write.call_count == 2