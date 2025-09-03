import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const MapView = ({ earthquakes, loading, error, onEarthquakeSelect, selectedEarthquake }) => {
  const mapRef = useRef();

  // Center map on selected earthquake
  useEffect(() => {
    if (selectedEarthquake && mapRef.current) {
      const [longitude, latitude] = selectedEarthquake.geometry.coordinates;
      mapRef.current.setView([latitude, longitude], 8, { animate: true });
    }
  }, [selectedEarthquake]);

  // Force map resize after component mounts and on window resize
  useEffect(() => {
    if (mapRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 100);
    }

    // Handle window resize
    const handleResize = () => {
      if (mapRef.current) {
        setTimeout(() => {
          mapRef.current.invalidateSize();
        }, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Get marker color based on magnitude
  const getMarkerColor = (magnitude) => {
    if (magnitude >= 7) return '#dc2626'; // Red - Major
    if (magnitude >= 5) return '#ea580c'; // Orange - Moderate
    if (magnitude >= 3) return '#d97706'; // Amber - Light
    return '#16a34a'; // Green - Minor
  };

  // Get marker size based on magnitude
  const getMarkerSize = (magnitude) => {
    return Math.max(5, Math.min(20, magnitude * 3));
  };

  // Format time for display
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  // Handle marker click
  const handleMarkerClick = (earthquake) => {
    if (onEarthquakeSelect) {
      onEarthquakeSelect(earthquake);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading earthquake data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Data</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (earthquakes.length === 0) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <div className="text-center p-6">
          <div className="text-gray-400 text-6xl mb-4">🌍</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">No Recent Earthquakes</h3>
          <p className="text-gray-600">No earthquake data available for the last 24 hours.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="map-view-container">
      <MapContainer
        ref={mapRef}
        center={[20, 0]}
        zoom={2}
        style={{ 
          height: '100%', 
          width: '100%'
        }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
                 {earthquakes.map((earthquake) => {
           const [longitude, latitude, depth] = earthquake.geometry.coordinates;
           const { mag, place, time } = earthquake.properties;
           const isSelected = selectedEarthquake && selectedEarthquake.id === earthquake.id;
           
           return (
             <CircleMarker
               key={earthquake.id}
               center={[latitude, longitude]}
               radius={getMarkerSize(mag)}
               pathOptions={{
                 color: getMarkerColor(mag),
                 fillColor: getMarkerColor(mag),
                 fillOpacity: isSelected ? 1.0 : 0.7,
                 weight: isSelected ? 4 : 2,
                 opacity: isSelected ? 1.0 : 0.8
               }}
               eventHandlers={{
                 click: () => handleMarkerClick(earthquake)
               }}
             >
              <Popup className="earthquake-popup">
                <div className="popup-title">
                  🌍 Earthquake Details
                </div>
                <div className="popup-detail">
                  <span className="magnitude">Magnitude: {mag || 'N/A'}</span>
                </div>
                <div className="popup-detail">
                  <strong>Location:</strong> {place || 'Unknown'}
                </div>
                <div className="popup-detail">
                  <strong>Time:</strong> {formatTime(time)}
                </div>
                <div className="popup-detail">
                  <strong>Depth:</strong> {depth ? `${depth.toFixed(1)} km` : 'N/A'}
                </div>
                <div className="popup-detail">
                  <strong>Coordinates:</strong> {latitude.toFixed(3)}, {longitude.toFixed(3)}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapView;
