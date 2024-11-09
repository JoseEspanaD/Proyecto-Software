import React, { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const MapComponent = ({ onAddressSelect }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'TU_API_KEY_GOOGLE_MAPS',
    libraries: ['places'],
  });

  const [marker, setMarker] = useState(null);

  // Función para manejar el clic en el mapa y colocar el marcador
  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setMarker({ lat, lng });
    fetchAddress(lat, lng); // Obtener la dirección si deseas mostrarla
  }, []);

  // Opcional: función para convertir coordenadas a dirección
  const fetchAddress = async (lat, lng) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=TU_API_KEY_GOOGLE_MAPS`
    );
    const data = await response.json();
    if (data.results && data.results[0]) {
      const address = data.results[0].formatted_address;
      onAddressSelect(address); // Llamada al callback con la dirección seleccionada
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      center={{ lat: 37.7749, lng: -122.4194 }} // Coordenadas iniciales del mapa
      zoom={10}
      mapContainerStyle={{ width: '100%', height: '400px' }}
      onClick={handleMapClick}
    >
      {marker && <Marker position={marker} />}
    </GoogleMap>
  );
};

export default MapComponent;
