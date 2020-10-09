import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { listLogEntry } from './api'
import LogEntryForm from './Component/LogEntryForm'

const App = () => {

  const [logEntries, setLogEntries] = useState([])
  const [showPopup, setShowPopup] = useState({})
  const [addEntry, setaddEntry] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 28.5934,
    longitude: 77.2223,
    zoom: 3
  });

  const getEntries = async () => {
    const logEntries = await listLogEntry()
    setLogEntries(logEntries)
  }
  useEffect(() => {
    getEntries()
  }, [])



  const rendermap = logEntries.map(entry => {
    return <React.Fragment  key={entry._id}>
      <Marker

       
        latitude={entry.latitude}
        longitude={entry.longitude}

      // offsetLeft={-12}
      // offsetTop={-24}
      >
        <div
          onClick={() => {
            setShowPopup(
              {
                // ...showPopup,
                [entry._id]: true
              }
            )

            setaddEntry(null)
          }}
        >

          <svg

            style={
              {
                width: `${3 * viewport.zoom}px`,
                height: `${3 * viewport.zoom}px`
              }
            }
            className='marker'
            viewBox="0 0 24 24"
            stroke="yellow"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>

      </Marker>
      {
        showPopup[entry._id] ? (
          <Popup
            latitude={entry.latitude}
            longitude={entry.longitude}
            closeButton={true}
            dynamicPosition={true}
            closeOnClick={false}
            onClose={() => setShowPopup({
              // ...showPopup,
              // [entry._id]:false
            })}
            anchor="top" >
            <div>
              <h3>{entry.title}</h3>
              <p>{entry.comments}</p>
              <small>Visited on : {new Date(entry.visitDate).toLocaleDateString()}</small>
              {entry.image ? <img src={entry.image} alt={entry.title}/> :null}
            </div>
          </Popup>
        ) : null
      }
    </React.Fragment>


  })


  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat
    setaddEntry({
      latitude: latitude,
      longitude: longitude
    })
    setShowPopup({})

  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/abhayk/ckdo3ju0m4n8w1ipc0zg6gwb4"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {rendermap}
      {addEntry ? (
        <>
          <Marker

            latitude={addEntry.latitude}
            longitude={addEntry.longitude}

          // offsetLeft={-12}
          // offsetTop={-24}
          >
            <div>

              <svg

                style={
                  {
                    width: `${3 * viewport.zoom}px`,
                    height: `${3 * viewport.zoom}px`,
                  }
                }
                className='marker'
                viewBox="0 0 24 24"
                stroke="red"

                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
              </svg>

            </div>

          </Marker>
          <Popup
            latitude={addEntry.latitude}
            longitude={addEntry.longitude}
            closeButton={true}
            dynamicPosition={true}
            closeOnClick={false}
            onClose={() => setaddEntry(null)}
            anchor="top" >
            <div className="popup">
              <LogEntryForm
                onClose={() => {
                  setaddEntry(null)
                  getEntries()
                }}
                latitude={addEntry.latitude}
                longitude={addEntry.longitude} />

            </div>
          </Popup>
        </>
      ) : null}

    </ReactMapGL>
  );
}

export default App