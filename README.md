# 🌍 Earthquake Visualizer

An interactive web application to visualize recent earthquake activity worldwide using **React**, **TailwindCSS**, and **React-Leaflet**.  

---

## 🚀 Features
- **Live earthquake data** from the **USGS API**  
- **Interactive world map** with markers showing earthquake locations  
- **Popup with details**: magnitude, location, time, and depth  
- **Responsive and mobile-friendly** design  
- **Real-time filtering** by magnitude  
- **Sorting options** by time, magnitude, or depth  
- **Error handling** for failed API requests  
- **Auto-refresh** every 5 minutes  

---

## 🛠️ Tech Stack
- **React** (Frontend framework)  
- **Tailwind CSS** (Styling)  
- **React-Leaflet + Leaflet** (Map visualization)  
- **Axios** (Data fetching)  
- **Vite** (Build tool)
- **USGS Earthquake API** (Data source)

---

## 📂 Folder Structure
```
earthquake-visualizer/
│── public/
│   └── index.html
│
│── src/
│   ├── components/
│   │   ├── MapView.jsx
│   │   └── EarthquakeList.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
│── package.json
│── tailwind.config.js
│── postcss.config.js
│── vite.config.js
│── README.md
```

---

## ⚡ Setup & Installation

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn

### Installation Steps

1. **Clone this repository:**
   ```bash
   git clone https://github.com/your-username/earthquake-visualizer.git
   cd earthquake-visualizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in your browser:**
   ```
   http://localhost:5173
   ```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## 🎯 How to Use

### Map View
- **Navigate**: Pan and zoom the map to explore different regions
- **Earthquake Markers**: Click on any marker to see detailed information
- **Marker Colors**: 
  - 🟢 Green: Minor earthquakes (M < 3)
  - 🟡 Amber: Light earthquakes (M 3-5)
  - 🟠 Orange: Moderate earthquakes (M 5-7)
  - 🔴 Red: Major earthquakes (M ≥ 7)
- **Marker Size**: Proportional to earthquake magnitude

### Sidebar Controls
- **Magnitude Filter**: Use the slider to filter earthquakes by minimum magnitude
- **Sort Options**: Sort by most recent, largest magnitude, or deepest earthquakes
- **Earthquake List**: Click any earthquake in the list to highlight it on the map
- **Mobile**: Use the hamburger menu to toggle the sidebar on mobile devices

### Data Information
- **Source**: USGS (United States Geological Survey)
- **Update Frequency**: Every 5 minutes
- **Data Range**: Last 24 hours of earthquake activity
- **Coverage**: Worldwide

---

## 🌐 Deployment

### Deploy on Vercel
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy with zero configuration

### Deploy on Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to [Netlify](https://netlify.com)

### Deploy on CodeSandbox
1. Import this repository directly into [CodeSandbox](https://codesandbox.io)
2. The app will run automatically

---

## 📌 API Reference

### USGS Earthquake API
- **Endpoint**: `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`
- **Format**: GeoJSON
- **Update Frequency**: Real-time
- **Documentation**: [USGS Earthquake API](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php)

### Data Structure
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "mag": 4.5,
        "place": "10km NE of Somewhere, Country",
        "time": 1640995200000,
        "updated": 1640995300000,
        "url": "https://earthquake.usgs.gov/earthquakes/eventpage/...",
        "detail": "https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/...",
        "felt": null,
        "cdi": null,
        "mmi": null,
        "alert": null,
        "status": "automatic",
        "tsunami": 0,
        "sig": 312,
        "net": "us",
        "code": "7000abcd",
        "ids": ",us7000abcd,",
        "sources": ",us,",
        "types": ",origin,phase-data,",
        "nst": 12,
        "dmin": 0.5,
        "rms": 0.8,
        "gap": 45,
        "magType": "mb",
        "type": "earthquake",
        "title": "M 4.5 - 10km NE of Somewhere, Country"
      },
      "geometry": {
        "type": "Point",
        "coordinates": [-122.5, 37.7, 10.5]
      },
      "id": "us7000abcd"
    }
  ]
}
```

---

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` to customize the design system
- Update `src/index.css` for global styles
- Component-specific styles are in each `.jsx` file

### Map Configuration
- Change the default map center in `MapView.jsx`
- Modify marker colors and sizes in the `getMarkerColor()` and `getMarkerSize()` functions
- Update the map tiles by changing the `TileLayer` URL

### Data Source
- Switch to a different earthquake API by updating the fetch URL in `MapView.jsx`
- Modify the data parsing logic to match the new API format

---

## 🐛 Troubleshooting

### Common Issues

1. **Map not loading**
   - Check if Leaflet CSS is properly loaded in `index.html`
   - Verify internet connection for map tiles

2. **No earthquake data**
   - Check browser console for API errors
   - Verify USGS API is accessible
   - Check if there are recent earthquakes (API only shows last 24 hours)

3. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version compatibility

4. **Mobile responsiveness issues**
   - Test on different screen sizes
   - Check Tailwind CSS responsive classes

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **USGS** for providing the earthquake data API
- **OpenStreetMap** for the map tiles
- **Leaflet** for the mapping library
- **React** and **Tailwind CSS** communities

---

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check the troubleshooting section above
- Review the USGS API documentation

---

**Made with ❤️ for earthquake awareness and education**
