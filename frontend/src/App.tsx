// App.tsx
import React from 'react';
import ImageUploader from './components/ImageUploader/ImageUploader';

const App: React.FC = () => {
  return (
    <div>
      <h1>Uploader de Imágenes</h1>
      <ImageUploader />
    </div>
  );
};

export default App;
