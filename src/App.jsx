import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import EarthquakeList from './components/EarthquakeList';
import axios from 'axios';

function App() {
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch earthquake data from USGS API
  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(
          'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson'
        );
        
        if (response.data && response.data.features) {
          setEarthquakes(response.data.features);
        } else {
          setError('No earthquake data available');
        }
      } catch (err) {
        console.error('Error fetching earthquake data:', err);
        setError('Failed to fetch earthquake data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEarthquakes();
    
    // Refresh data every 5 minutes
    const interval = setInterval(fetchEarthquakes, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Handle earthquake selection from map or list
  const handleEarthquakeSelect = (earthquake) => {
    setSelectedEarthquake(earthquake);
  };

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100" style={{ margin: 0, padding: 0 }}>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-800">
              🌍 Earthquake Visualizer
            </h1>
            <span className="text-sm text-gray-500 hidden sm:inline">
              Real-time seismic activity worldwide
            </span>
          </div>
          
          {/* Mobile menu button */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            aria-label="Toggle sidebar"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
                 {/* Map View */}
         <div className={`map-wrapper transition-all duration-300 ${sidebarOpen ? 'lg:mr-80' : ''}`} style={{ width: sidebarOpen ? 'calc(100% - 320px)' : '100%' }}>
           <MapView 
             earthquakes={earthquakes}
             loading={loading}
             error={error}
             onEarthquakeSelect={handleEarthquakeSelect}
             selectedEarthquake={selectedEarthquake}
           />
         </div>

         {/* Sidebar */}
         <div className={`
           fixed lg:relative lg:translate-x-0 transition-transform duration-300 z-10
           ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
           w-80 h-full bg-white shadow-lg border-l border-gray-200
         `}>
           <div className="h-full">
             <EarthquakeList 
               earthquakes={earthquakes}
               loading={loading}
               error={error}
               selectedEarthquake={selectedEarthquake}
               onEarthquakeSelect={handleEarthquakeSelect}
             />
           </div>
         </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>

      {/* Footer - Temporarily hidden to test map sizing */}
      {/* <footer className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span>Data: <a href="https://earthquake.usgs.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USGS</a></span>
            <span>•</span>
            <span>Map: <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">OpenStreetMap</a></span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Minor (M&lt;3)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span>Light (M3-5)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Moderate (M5-7)</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Major (M≥7)</span>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}

export default App;
