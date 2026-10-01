import React from 'react';
import { ExternalLink, Award, FileText, CheckCircle2 } from 'lucide-react';

export function MethodologyView() {
  return (
    <div className="subscreen-view">
      <div className="subscreen-header">
        <div>
          <h2 className="subscreen-title">Weather Prediction Methodology</h2>
          <p className="subscreen-subtitle">
            Physical equations of fluid dynamics, 4D-Var data assimilation, and machine learning neural weather prediction models.
          </p>
        </div>
      </div>

      <div className="methodology-grid">
        <div className="methodology-card">
          <div className="card-top">
            <span className="methodology-number">01</span>
            <h3 className="methodology-title">Primitive Equations of Atmospheric Dynamics</h3>
          </div>
          <p className="methodology-text">
            Forecasts solve the compressible Navier-Stokes equations on a rotating sphere, including conservation of momentum, mass, moisture, and thermodynamic energy across 137 vertical atmospheric layers from surface to stratosphere.
          </p>
          <div className="equation-box">
            <code>du/dt - fv = - (1/ρ) ∂p/∂x + F_friction</code>
          </div>
        </div>

        <div className="methodology-card">
          <div className="card-top">
            <span className="methodology-number">02</span>
            <h3 className="methodology-title">Doppler Radar Reflectivity to Precipitation Rate (Z-R)</h3>
          </div>
          <p className="methodology-text">
            Radar reflectivity factors (Z in dBZ) are translated to instantaneous rain rates (R in mm/h) using empirical Marshall-Palmer drop size distribution equations calibrated by local meteorological disdrometers.
          </p>
          <div className="equation-box">
            <code>Z = a × R^b  (Standard Stratiform: Z = 200 × R^1.6)</code>
          </div>
        </div>

        <div className="methodology-card">
          <div className="card-top">
            <span className="methodology-number">03</span>
            <h3 className="methodology-title">Four-Dimensional Variational Data Assimilation (4D-Var)</h3>
          </div>
          <p className="methodology-text">
            Every 6 hours, over 80 million observational data points (GOES-18, Meteosat, radiosonde weather balloons, surface stations, and commercial aircraft AMDAR sensors) are assimilated to initialize the global state vector.
          </p>
        </div>

        <div className="methodology-card">
          <div className="card-top">
            <span className="methodology-number">04</span>
            <h3 className="methodology-title">Neural Graph Neural Network (GNN) Forecasting</h3>
          </div>
          <p className="methodology-text">
            Machine learning weather model (GraphCast architecture) evaluates multi-mesh icosahedral spheres to generate 10-day forecasts in under 60 seconds with higher spatial skill scores than traditional high-performance supercomputing NWP.
          </p>
        </div>
      </div>
    </div>
  );
}

export default MethodologyView;
