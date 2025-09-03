import React, { useState, useMemo } from 'react';

const EarthquakeList = ({ earthquakes, selectedEarthquake, onEarthquakeSelect, loading, error }) => {
  const [filterMagnitude, setFilterMagnitude] = useState(0);
  const [sortBy, setSortBy] = useState('time'); // 'time', 'magnitude', 'depth'

  // Filter and sort earthquakes
  const filteredAndSortedEarthquakes = useMemo(() => {
    if (!earthquakes || earthquakes.length === 0) return [];

    let filtered = earthquakes.filter(earthquake => {
      const magnitude = earthquake.properties.mag;
      return magnitude >= filterMagnitude;
    });

    // Sort earthquakes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'magnitude':
          return (b.properties.mag || 0) - (a.properties.mag || 0);
        case 'depth':
          return (b.geometry.coordinates[2] || 0) - (a.geometry.coordinates[2] || 0);
        case 'time':
        default:
          return b.properties.time - a.properties.time;
      }
    });

    return filtered;
  }, [earthquakes, filterMagnitude, sortBy]);

  // Format time for display
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInHours * 60);
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  // Get magnitude color
  const getMagnitudeColor = (magnitude) => {
    if (magnitude >= 7) return 'text-red-600 bg-red-100';
    if (magnitude >= 5) return 'text-orange-600 bg-orange-100';
    if (magnitude >= 3) return 'text-amber-600 bg-amber-100';
    return 'text-green-600 bg-green-100';
  };

  // Get magnitude label
  const getMagnitudeLabel = (magnitude) => {
    if (magnitude >= 7) return 'Major';
    if (magnitude >= 5) return 'Moderate';
    if (magnitude >= 3) return 'Light';
    return 'Minor';
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Loading earthquakes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-2">⚠️</div>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Recent Earthquakes ({filteredAndSortedEarthquakes.length})
        </h2>
        
        {/* Filters */}
        <div className="space-y-3">
          {/* Magnitude Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Magnitude: {filterMagnitude}
            </label>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={filterMagnitude}
              onChange={(e) => setFilterMagnitude(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          
          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort by:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="time">Most Recent</option>
              <option value="magnitude">Largest Magnitude</option>
              <option value="depth">Deepest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Earthquake List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAndSortedEarthquakes.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <div className="text-4xl mb-2">🌍</div>
            <p>No earthquakes found</p>
            <p className="text-sm">Try adjusting the magnitude filter</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredAndSortedEarthquakes.map((earthquake) => {
              const { mag, place, time } = earthquake.properties;
              const [longitude, latitude, depth] = earthquake.geometry.coordinates;
              const isSelected = selectedEarthquake && selectedEarthquake.id === earthquake.id;
              
              return (
                <div
                  key={earthquake.id}
                  onClick={() => onEarthquakeSelect && onEarthquakeSelect(earthquake)}
                  className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${
                    isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      {/* Magnitude */}
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getMagnitudeColor(mag)}`}>
                          M{mag || 'N/A'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {getMagnitudeLabel(mag)}
                        </span>
                      </div>
                      
                      {/* Location */}
                      <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">
                        {place || 'Unknown Location'}
                      </h3>
                      
                      {/* Time and Depth */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>🕒 {formatTime(time)}</span>
                        <span>📍 {depth ? `${depth.toFixed(1)}km` : 'N/A'}</span>
                      </div>
                      
                      {/* Coordinates */}
                      <div className="text-xs text-gray-400 mt-1">
                        {latitude.toFixed(3)}, {longitude.toFixed(3)}
                      </div>
                    </div>
                    
                    {/* Click indicator */}
                    <div className="text-gray-400 text-xs ml-2">
                      {isSelected ? '📍' : '👆'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <div className="p-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
        Data from <a href="https://earthquake.usgs.gov/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">USGS</a>
        <br />
        Updates every 5 minutes
      </div>
    </div>
  );
};

export default EarthquakeList;
