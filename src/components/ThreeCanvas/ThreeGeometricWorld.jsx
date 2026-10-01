import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeGeometricWorld:
 * High-performance, award-winning Three.js 3D WebGL environment.
 * Strictly adheres to the PIXELS & GEOMETRIC (faceted / low-poly) aesthetic.
 *
 * 1. STAGE 1: ORBIT · 400 KM (Y = 0)
 *    - Masterclass Low-Poly Earth with authentic continental geography:
 *      * North America (Alaska, Canadian Shield, Rockies spine, Central America)
 *      * South America (Andes cordillera, Amazon rainforest, Patagonia)
 *      * Europe (Iberia, France, Scandinavia, Alps snow peaks, Mediterranean)
 *      * Africa (Sahara golden desert, Congo emerald basin, East African rift, Cape)
 *      * Asia (Arabian desert, Himalayas & Tibetan snow plateau, India, Siberian taiga)
 *      * Australia (Red-ochre outback center, coastal green fringes, New Zealand)
 *      * Polar Ice Caps (Antarctica glacier shelf, Greenland ice sheet)
 *      * Multi-tiered geometric bathymetry: ocean abyss, shallow coastal turquoise shelves,
 *        continental lowlands, deserts, and elevated alpine snow summits.
 *    - Living atmospheric cloud sphere with planetary circulation bands and swirling hurricane with eye.
 *    - Nocturnal city light constellations (warm amber pixel clusters on dark continents).
 *    - Ethereal Rayleigh scattering atmospheric glow halos.
 *    - Earth observation satellite fleet: Flagship with gold MLI bus, solar wings, nadir camera,
 *      telemetry dish, and secondary scientific micro-satellite in polar orbit.
 *
 * 2. STAGE 2: STRATOSPHERE · 12,000 M (Y = -29.8)
 *    - 7 Anatomically Modeled Low-Poly Peregrine Falcons:
 *      * True raptor fuselage: deep muscular breast, slate mantle, barred cream belly.
 *      * Sculpted hooded head with malar mustache stripes, yellow cere, hooked beak, amber eyes.
 *      * Articulated two-bone wings (inner arm + outer hand with 4 stepped primary flight feather fingers).
 *      * Organic wave flapping kinematics: wingtip phase lag, wing cupping, body bobbing, tail trim.
 *      * Dynamic flock postures: Lead soaring raptor, high-speed stooping diver in delta chevron,
 *        echelon cruisers, and agile trail juveniles.
 *    - 3 distinct cloud genera: Cumulonimbus storm anvil, rolling Stratocumulus sea deck,
 *      and aerodynamic Altocumulus lenticular wave clouds.
 *    - Stratospheric research sounding balloon with parachute and scientific radiosonde.
 *    - 3D jet stream airflow streamlines.
 *
 * 3. STAGE 3: LIVING BIOSPHERE & CANOPY · 480 M (Y = -61.4)
 *    - Alpine mountain massif with knife-edge arêtes, scree slopes, and couloir snowfields (zero z-fighting).
 *    - Winding turquoise glacial meltwater river with rapids and shoreline boulders.
 *    - 5 distinct tree species (Douglas Firs, Mountain Pines, Blue Spruces, Golden Autumn Larches, Saplings).
 *    - Low-poly Stag with 10-point branching ivory antlers on a mossy granite crag.
 *    - Swirling bioluminescent spore swarms.
 *
 * 4. STAGE 4: SURFACE SETTLEMENT · 0 M (Y = -85.0)
 *    - Hand-hewn backcountry log cabin with interlocking saddle-notch corner logs, covered porch,
 *      shake roof, fieldstone chimney puffing smoke, and warm mullioned glowing windows.
 *    - Wood shelter with stacked firewood cord and splitting axe embedded in a chopping block.
 *    - Campsite firepit with glowing embers, kinetic flames, iron tripod, and kettle.
 *    - Seated human observer in winter parka holding a camp coffee mug beside a glowing lantern.
 *    - Scientific climate weather station: Aluminium tripod, Stevenson screen, spinning 3-cup anemometer,
 *      wind vane, tipping rain gauge, and solar panel.
 *    - Flagstone path, alpine wildflowers, and split-rail fence.
 */
export const ThreeGeometricWorld = ({ scrollProgress = 0 }) => {
  const mountRef = useRef(null);
  const scrollRef = useRef(scrollProgress);
  scrollRef.current = scrollProgress;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // =========================================================================
    // 1. SCENE, CAMERA, RENDERER
    // =========================================================================
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090d14, 0.0072);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // =========================================================================
    // 2. MASTER LIGHTING RIG
    // =========================================================================
    const ambientLight = new THREE.AmbientLight(0xdbe6f2, 0.88);
    scene.add(ambientLight);

    // Warm Solar Key Light (Illuminates from upper-right)
    const sunLight = new THREE.DirectionalLight(0xfff7ec, 2.85);
    sunLight.position.set(18, 24, 18);
    scene.add(sunLight);

    // Terracotta Rim Light replaced by Cool High-Altitude Sky Rim Light
    const rimLight = new THREE.DirectionalLight(0x7ea8cc, 0.85);
    rimLight.position.set(-16, -6, -8);
    scene.add(rimLight);

    // Cool Tropospheric Fill Light
    const skyFillLight = new THREE.DirectionalLight(0x45789c, 1.1);
    skyFillLight.position.set(0, -22, 12);
    scene.add(skyFillLight);

    // =========================================================================
    // 3. STAGE 1: ORBIT · 400 KM (Y = 0)
    // =========================================================================
    const orbitGroup = new THREE.Group();
    orbitGroup.position.set(5.2, -0.15, -0.5);
    scene.add(orbitGroup);

    // -------------------------------------------------------------------------
    // A. Masterclass Low-Poly Earth Globe with Authentic Continental Geomorphology
    // -------------------------------------------------------------------------
    const globeRadius = 3.35;

    // Geographic Continental Elevation & Biome Evaluator (using authentic lat/lon in degrees)
    const evaluateEarthGeomorphology = (latDeg, lonDeg) => {
      // 1. Polar Glaciers & Ice Shelves (Antarctica & Arctic/Greenland)
      if (latDeg < -62) {
        // Antarctica - continental ice dome with Transantarctic mountain nunataks
        const isNunatak = latDeg >= -85 && latDeg <= -75 && lonDeg >= 140 && lonDeg <= 170;
        return {
          isIce: true,
          isLand: true,
          elev: isNunatak ? 0.32 : 0.22,
          color: isNunatak ? [0.82, 0.88, 0.94] : [0.95, 0.98, 1.0]
        };
      }
      if (latDeg > 60 && latDeg < 84 && lonDeg > -58 && lonDeg < -18) {
        // Greenland Continental Ice Sheet (elevated glacial dome)
        return { isIce: true, isLand: true, elev: 0.26, color: [0.94, 0.97, 1.0] };
      }
      if (latDeg > 76) {
        // High Arctic Sea Ice (ocean level, flush with sea surface)
        return { isIce: true, isLand: false, elev: 0.04, color: [0.90, 0.95, 0.99] };
      }

      let isLand = false;
      let isMountain = false;
      let isHighPeak = false;
      let isDesert = false;
      let isRainforest = false;
      let isTaiga = false;
      let isSavannah = false;

      // 2. North America
      const isAlaska = latDeg >= 54 && latDeg <= 72 && lonDeg >= -168 && lonDeg <= -130;
      const isCanada = latDeg >= 48 && latDeg <= 74 && lonDeg >= -130 && lonDeg <= -55;
      const isUSA = latDeg >= 25 && latDeg <= 49 && lonDeg >= -125 && lonDeg <= -68;
      const isMexico = latDeg >= 15 && latDeg <= 32 && lonDeg >= -117 && lonDeg <= -86;
      const isCentralAm = latDeg >= 7 && latDeg <= 18 && lonDeg >= -92 && lonDeg <= -77;
      const isBaja = latDeg >= 22 && latDeg <= 33 && lonDeg >= -116 && lonDeg <= -109;
      const isFlorida = latDeg >= 24 && latDeg <= 31 && lonDeg >= -85 && lonDeg <= -80;
      const isCaribbean = latDeg >= 16 && latDeg <= 24 && lonDeg >= -85 && lonDeg <= -62;
      const isGreatLakes = latDeg >= 42 && latDeg <= 48 && lonDeg >= -90 && lonDeg <= -78;
      const isHudsonBay = latDeg >= 51 && latDeg <= 64 && lonDeg >= -95 && lonDeg <= -78;

      if ((isAlaska || isCanada || isUSA || isMexico || isCentralAm || isBaja || isFlorida || isCaribbean) && !isGreatLakes && !isHudsonBay) {
        isLand = true;
        // Rocky Mountains & Cascades / Sierra Nevada
        if (latDeg >= 33 && latDeg <= 64 && lonDeg >= -124 && lonDeg <= -106) {
          isMountain = true;
          if (latDeg >= 37 && latDeg <= 54 && lonDeg >= -118 && lonDeg <= -110) isHighPeak = true;
        }
        // Mojave, Sonoran & Chihuahuan Desert
        else if (latDeg >= 24 && latDeg <= 37 && lonDeg >= -116 && lonDeg <= -102) isDesert = true;
        // Boreal Taiga
        else if (latDeg >= 50) isTaiga = true;
      }

      // 3. South America
      const isNorthSA = latDeg >= 0 && latDeg <= 13 && lonDeg >= -78 && lonDeg <= -50;
      const isAmazon = latDeg >= -18 && latDeg <= 2 && lonDeg >= -76 && lonDeg <= -36;
      const isCentralSA = latDeg >= -32 && latDeg <= -18 && lonDeg >= -68 && lonDeg <= -40;
      const isPatagonia = latDeg >= -56 && latDeg <= -32 && lonDeg >= -75 && lonDeg <= -60;

      if (isNorthSA || isAmazon || isCentralSA || isPatagonia) {
        isLand = true;
        // Andes Cordillera (Continuous western high spine)
        if (latDeg >= -55 && latDeg <= 11 && lonDeg >= -78 && lonDeg <= -67) {
          isMountain = true;
          if (latDeg >= -35 && latDeg <= -10) isHighPeak = true; // Aconcagua & Altiplano
        }
        // Amazon Emerald Rainforest Basin
        else if (latDeg >= -15 && latDeg <= 3 && lonDeg >= -74 && lonDeg <= -46) isRainforest = true;
        // Atacama Desert
        else if (latDeg >= -28 && latDeg <= -18 && lonDeg >= -71 && lonDeg <= -68) isDesert = true;
      }

      // 4. Europe
      const isScandi = latDeg >= 55 && latDeg <= 71 && lonDeg >= 5 && lonDeg <= 30;
      const isUK = latDeg >= 50 && latDeg <= 59 && lonDeg >= -11 && lonDeg <= 2;
      const isEuropeMain = latDeg >= 43 && latDeg <= 56 && lonDeg >= -3 && lonDeg <= 28;
      const isIberia = latDeg >= 36 && latDeg <= 44 && lonDeg >= -10 && lonDeg <= 4;
      const isItaly = latDeg >= 37 && latDeg <= 47 && lonDeg >= 7 && lonDeg <= 19;
      const isBalkans = latDeg >= 35 && latDeg <= 45 && lonDeg >= 19 && lonDeg <= 29;

      if (isScandi || isUK || isEuropeMain || isIberia || isItaly || isBalkans) {
        isLand = true;
        // Alps (High snow-crested summits)
        if (latDeg >= 45 && latDeg <= 48 && lonDeg >= 6 && lonDeg <= 15) {
          isMountain = true;
          isHighPeak = true;
        }
        else if (isScandi && latDeg >= 60) isTaiga = true;
      }

      // 5. Africa
      const isSahara = latDeg >= 18 && latDeg <= 35 && lonDeg >= -16 && lonDeg <= 35;
      const isWestAf = latDeg >= 4 && latDeg <= 18 && lonDeg >= -17 && lonDeg <= 14;
      const isHornAf = latDeg >= 2 && latDeg <= 15 && lonDeg >= 38 && lonDeg <= 52;
      const isCongo = latDeg >= -9 && latDeg <= 5 && lonDeg >= 11 && lonDeg <= 31;
      const isEastAf = latDeg >= -14 && latDeg <= 3 && lonDeg >= 28 && lonDeg <= 42;
      const isSouthAf = latDeg >= -35 && latDeg <= -12 && lonDeg >= 14 && lonDeg <= 35;
      const isMadagascar = latDeg >= -26 && latDeg <= -11 && lonDeg >= 43 && lonDeg <= 51;

      if (isSahara || isWestAf || isHornAf || isCongo || isEastAf || isSouthAf || isMadagascar) {
        isLand = true;
        if (isSahara) isDesert = true;
        else if (isCongo) isRainforest = true;
        else if (latDeg >= -5 && latDeg <= 12 && lonDeg >= 34 && lonDeg <= 42) isMountain = true;
        else if (isEastAf || isWestAf) isSavannah = true;
        else if (latDeg >= -28 && latDeg <= -20 && lonDeg >= 18 && lonDeg <= 26) isDesert = true;
      }

      // 6. Asia
      const isArabia = latDeg >= 12 && latDeg <= 33 && lonDeg >= 34 && lonDeg <= 60;
      const isMidEast = latDeg >= 32 && latDeg <= 42 && lonDeg >= 26 && lonDeg <= 52;
      const isIndia = latDeg >= 7 && latDeg <= 32 && lonDeg >= 67 && lonDeg <= 89;
      const isHimalayas = latDeg >= 27 && latDeg <= 38 && lonDeg >= 74 && lonDeg <= 104;
      const isChina = latDeg >= 20 && latDeg <= 45 && lonDeg >= 100 && lonDeg <= 124;
      const isSEAsia = latDeg >= 7 && latDeg <= 22 && lonDeg >= 97 && lonDeg <= 110;
      const isSiberia = latDeg >= 48 && latDeg <= 75 && lonDeg >= 55 && lonDeg <= 172;
      const isJapan = latDeg >= 30 && latDeg <= 45 && lonDeg >= 129 && lonDeg <= 146;
      const isIndonesia = latDeg >= -11 && latDeg <= 19 && lonDeg >= 95 && lonDeg <= 132;

      if (isArabia || isMidEast || isIndia || isHimalayas || isChina || isSEAsia || isSiberia || isJapan || isIndonesia) {
        isLand = true;
        if (isHimalayas) {
          isMountain = true;
          isHighPeak = true;
        }
        else if (isArabia || (latDeg >= 40 && latDeg <= 46 && lonDeg >= 95 && lonDeg <= 115)) isDesert = true;
        else if (isSEAsia || isIndonesia) isRainforest = true;
        else if (isSiberia) isTaiga = true;
      }

      // 7. Australia & New Zealand
      const isAustralia = latDeg >= -39 && latDeg <= -10 && lonDeg >= 112 && lonDeg <= 154;
      const isNewZealand = latDeg >= -47 && latDeg <= -34 && lonDeg >= 165 && lonDeg <= 179;

      if (isAustralia || isNewZealand) {
        isLand = true;
        if (isNewZealand || (lonDeg >= 146 && latDeg <= -28)) isMountain = true;
        else if (latDeg >= -31 && latDeg <= -18 && lonDeg >= 118 && lonDeg <= 142) {
          return { isLand: true, elev: 0.18, color: [0.78, 0.34, 0.16] }; // Australian red earth
        }
      }

      // Oceanic Bathymetry & Coastal Shelves
      if (!isLand) {
        // Narrow, authentic coastal shelf reefs and shallow seas
        const isCaribbeanSea = latDeg >= 10 && latDeg <= 24 && lonDeg >= -85 && lonDeg <= -60;
        const isGreatBarrierReef = latDeg >= -24 && latDeg <= -12 && lonDeg >= 144 && lonDeg <= 154;
        const isBaltic = latDeg >= 53 && latDeg <= 65 && lonDeg >= 14 && lonDeg <= 26;
        const isNorthSea = latDeg >= 51 && latDeg <= 60 && lonDeg >= 0 && lonDeg <= 9;
        const isMedShallows = latDeg >= 33 && latDeg <= 42 && lonDeg >= -2 && lonDeg <= 28;
        const isSundaShelf = latDeg >= -7 && latDeg <= 8 && lonDeg >= 100 && lonDeg <= 116;
        const isBahamas = latDeg >= 22 && latDeg <= 28 && lonDeg >= -80 && lonDeg <= -73;

        if (isCaribbeanSea || isGreatBarrierReef || isBaltic || isNorthSea || isMedShallows || isSundaShelf || isBahamas) {
          return { isShelf: true, isLand: false, elev: 0.03, color: [0.08, 0.46, 0.56] }; // Turquoise coastal shelf
        }

        // Deep Oceanic Trenches
        const isMariana = latDeg >= 10 && latDeg <= 22 && lonDeg >= 140 && lonDeg <= 148;
        const isPuertoRicoTrench = latDeg >= 18 && latDeg <= 21 && lonDeg >= -68 && lonDeg <= -62;
        const isMidAtlanticRift = Math.abs(lonDeg - (-30 + Math.sin(latDeg * 0.06) * 12)) < 5;

        if (isMariana || isPuertoRicoTrench || isMidAtlanticRift) {
          return { isOcean: true, isTrench: true, isLand: false, elev: -0.03, color: [0.015, 0.05, 0.16] }; // Abyssal trench
        }

        // Pelagic deep open ocean (Deep cosmic navy)
        return { isOcean: true, isLand: false, elev: 0.0, color: [0.02, 0.07, 0.22] };
      }

      // Land Biomes Elevation & Authentic Color Palette
      if (isHighPeak) {
        return { isMountain: true, isLand: true, elev: 0.46, color: [0.98, 0.99, 1.0] }; // Crystalline glacier peak
      }
      if (isMountain) {
        return { isMountain: true, isLand: true, elev: 0.35, color: [0.38, 0.44, 0.52] }; // Slate granite rock
      }
      if (isDesert) {
        return { isDesert: true, isLand: true, elev: 0.18, color: [0.86, 0.65, 0.30] }; // Golden sand dunes
      }
      if (isRainforest) {
        return { isRainforest: true, isLand: true, elev: 0.16, color: [0.06, 0.40, 0.16] }; // Deep emerald jungle
      }
      if (isTaiga) {
        return { isTaiga: true, isLand: true, elev: 0.16, color: [0.14, 0.32, 0.22] }; // Boreal pine
      }
      if (isSavannah) {
        return { isSavannah: true, isLand: true, elev: 0.15, color: [0.58, 0.62, 0.30] }; // Sunlit golden savannah
      }
      // Temperate Plains & Woodlands
      return { isPlains: true, isLand: true, elev: 0.15, color: [0.20, 0.50, 0.28] };
    };

    // 1. Start with indexed icosahedron so adjacent triangles share vertices and form a continuous watertight mesh
    const baseGlobeGeom = new THREE.IcosahedronGeometry(globeRadius, 4);
    const basePosAttr = baseGlobeGeom.getAttribute('position');
    const baseVertCount = basePosAttr.count;

    // Displace vertices continuously so terrain is watertight and organic
    for (let k = 0; k < baseVertCount; k++) {
      const vx = basePosAttr.getX(k);
      const vy = basePosAttr.getY(k);
      const vz = basePosAttr.getZ(k);
      const vlen = Math.sqrt(vx * vx + vy * vy + vz * vz);
      const nx = vx / vlen;
      const ny = vy / vlen;
      const nz = vz / vlen;

      const lat = Math.asin(ny);
      const lon = Math.atan2(nx, nz);
      const latDeg = (lat * 180) / Math.PI;
      const lonDeg = (lon * 180) / Math.PI;

      const biome = evaluateEarthGeomorphology(latDeg, lonDeg);
      // Continuous organic elevation
      const r = globeRadius + biome.elev * 0.45;
      basePosAttr.setXYZ(k, nx * r, ny * r, nz * r);
    }

    // 2. Convert to non-indexed so every triangular facet has its own flat, crisp coloration
    const globeGeom = baseGlobeGeom.toNonIndexed();
    globeGeom.deleteAttribute('normal');
    const posAttr = globeGeom.getAttribute('position');
    const vertexCount = posAttr.count;
    const colors = new Float32Array(vertexCount * 3);
    const nightLightsPositions = [];

    const sunDir = new THREE.Vector3(18, 24, 18).normalize();

    // Process every triangle facet for uniform facet colors with micro-jitter
    for (let i = 0; i < vertexCount; i += 3) {
      const x1 = posAttr.getX(i), y1 = posAttr.getY(i), z1 = posAttr.getZ(i);
      const x2 = posAttr.getX(i + 1), y2 = posAttr.getY(i + 1), z2 = posAttr.getZ(i + 1);
      const x3 = posAttr.getX(i + 2), y3 = posAttr.getY(i + 2), z3 = posAttr.getZ(i + 2);

      const cx = (x1 + x2 + x3) / 3;
      const cy = (y1 + y2 + y3) / 3;
      const cz = (z1 + z2 + z3) / 3;
      const clen = Math.sqrt(cx * cx + cy * cy + cz * cz);
      const nx = cx / clen;
      const ny = cy / clen;
      const nz = cz / clen;

      const lat = Math.asin(ny);
      const lon = Math.atan2(nx, nz);
      const latDeg = (lat * 180) / Math.PI;
      const lonDeg = (lon * 180) / Math.PI;

      const biome = evaluateEarthGeomorphology(latDeg, lonDeg);

      // Deterministic pseudo-random facet jitter (±0.06) so every facet catches light with distinct tonal facet
      const facetHash = (Math.sin(cx * 143.5 + cy * 271.3 + cz * 59.7) * 43758.5453);
      const jitter = (facetHash - Math.floor(facetHash)) * 0.12 - 0.06;

      const cR = Math.max(0, Math.min(1, biome.color[0] + jitter));
      const cG = Math.max(0, Math.min(1, biome.color[1] + jitter));
      const cB = Math.max(0, Math.min(1, biome.color[2] + jitter));

      for (let v = 0; v < 3; v++) {
        const idx = i + v;
        colors[idx * 3] = cR;
        colors[idx * 3 + 1] = cG;
        colors[idx * 3 + 2] = cB;
      }

      // If land facet is on the dark side of Earth, add golden city lights
      if (biome.isLand && !biome.isIce) {
        const litDot = nx * sunDir.x + ny * sunDir.y + nz * sunDir.z;
        if (litDot < 0.12 && (Math.sin(cx * 89.1 + cy * 193.3 + cz * 47.9) > 0.35)) {
          const lr = clen + 0.04;
          nightLightsPositions.push(nx * lr, ny * lr, nz * lr);
        }
      }
    }

    globeGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    globeGeom.computeVertexNormals();

    const globeMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      flatShading: true,
      roughness: 0.55,
      metalness: 0.12,
    });
    const globeMesh = new THREE.Mesh(globeGeom, globeMat);
    orbitGroup.add(globeMesh);

    // Atmospheric Fresnel Glow Shell (Rayleigh scattering halo)
    const atmGlowGeom = new THREE.IcosahedronGeometry(globeRadius * 1.042, 3);
    const atmGlowMat = new THREE.MeshStandardMaterial({
      color: 0x4488cc,
      transparent: true,
      opacity: 0.13,
      side: THREE.BackSide,
      roughness: 1.0,
      metalness: 0.0,
      depthWrite: false,
    });
    orbitGroup.add(new THREE.Mesh(atmGlowGeom, atmGlowMat));

    // Outer deep-blue atmospheric limb ring
    const atmOuterGeom = new THREE.IcosahedronGeometry(globeRadius * 1.068, 3);
    const atmOuterMat = new THREE.MeshStandardMaterial({
      color: 0x1a5599,
      transparent: true,
      opacity: 0.055,
      side: THREE.BackSide,
      roughness: 1.0,
      metalness: 0.0,
      depthWrite: false,
    });
    orbitGroup.add(new THREE.Mesh(atmOuterGeom, atmOuterMat));

    // -------------------------------------------------------------------------
    // B. Living Volumetric Low-Poly Atmospheric Cloud Systems & Cyclone Spiral
    // -------------------------------------------------------------------------
    const earthCloudsGroup = new THREE.Group();
    const cloudClusterMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      flatShading: true,
      roughness: 0.32,
      metalness: 0.06,
      transparent: true,
      opacity: 0.88,
      side: THREE.DoubleSide,
    });

    // Helper: Converts spherical lat/lon (degrees) and radius to Cartesian 3D Vector
    const toCartesian = (latDeg, lonDeg, r) => {
      const phi = (latDeg * Math.PI) / 180;
      const theta = (lonDeg * Math.PI) / 180;
      return new THREE.Vector3(
        r * Math.cos(phi) * Math.sin(theta),
        r * Math.sin(phi),
        r * Math.cos(phi) * Math.cos(theta)
      );
    };

    // Helper: Creates a 3D faceted low-poly cloud ribbon that hugs the globe smoothly
    const createCloudRibbon = (waypoints, widthDeg, heightBoost = 0.07) => {
      const geom = new THREE.BufferGeometry();
      const pos = [];
      const cR = globeRadius + heightBoost;

      for (let w = 0; w < waypoints.length - 1; w++) {
        const p1 = waypoints[w];
        const p2 = waypoints[w + 1];
        const segSteps = 5;

        for (let s = 0; s < segSteps; s++) {
          const t1 = s / segSteps;
          const t2 = (s + 1) / segSteps;

          const lat1 = p1.lat + (p2.lat - p1.lat) * t1;
          const lon1 = p1.lon + (p2.lon - p1.lon) * t1;
          const lat2 = p1.lat + (p2.lat - p1.lat) * t2;
          const lon2 = p1.lon + (p2.lon - p1.lon) * t2;

          const w1 = ((p1.w || 1.0) + ((p2.w || 1.0) - (p1.w || 1.0)) * t1) * widthDeg;
          const w2 = ((p1.w || 1.0) + ((p2.w || 1.0) - (p1.w || 1.0)) * t2) * widthDeg;

          // Cambered ridge points: center has slight lift
          const c1 = toCartesian(lat1, lon1, cR + 0.025);
          const c2 = toCartesian(lat2, lon2, cR + 0.025);

          const l1 = toCartesian(lat1 + w1, lon1, cR);
          const r1 = toCartesian(lat1 - w1, lon1, cR);
          const l2 = toCartesian(lat2 + w2, lon2, cR);
          const r2 = toCartesian(lat2 - w2, lon2, cR);

          // Left facet pair
          pos.push(l1.x, l1.y, l1.z,  c1.x, c1.y, c1.z,  l2.x, l2.y, l2.z);
          pos.push(l2.x, l2.y, l2.z,  c1.x, c1.y, c1.z,  c2.x, c2.y, c2.z);

          // Right facet pair
          pos.push(c1.x, c1.y, c1.z,  r1.x, r1.y, r1.z,  r2.x, r2.y, r2.z);
          pos.push(c1.x, c1.y, c1.z,  r2.x, r2.y, r2.z,  c2.x, c2.y, c2.z);
        }
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      geom.computeVertexNormals();
      return new THREE.Mesh(geom, cloudClusterMat);
    };

    // 1. Tropical Convergence Convective Squalls (broken, natural cloud systems)
    // Amazon Convective Cloud Cluster
    earthCloudsGroup.add(createCloudRibbon([
      { lat: -8, lon: -70, w: 1.0 }, { lat: -2, lon: -60, w: 2.2 },
      { lat: 2, lon: -48, w: 1.8 }, { lat: 4, lon: -38, w: 0.9 },
    ], 2.8));

    // Atlantic ITCZ Wave
    earthCloudsGroup.add(createCloudRibbon([
      { lat: 4, lon: -34, w: 0.8 }, { lat: 6, lon: -22, w: 1.8 },
      { lat: 5, lon: -10, w: 1.6 }, { lat: 7, lon: 2, w: 0.8 },
    ], 2.4));

    // Congo Basin Convective Swathe
    earthCloudsGroup.add(createCloudRibbon([
      { lat: -4, lon: 14, w: 1.0 }, { lat: 0, lon: 24, w: 2.2 },
      { lat: 3, lon: 32, w: 1.6 }, { lat: 1, lon: 40, w: 0.7 },
    ], 2.6));

    // Indo-Pacific Warm Pool Front
    earthCloudsGroup.add(createCloudRibbon([
      { lat: 3, lon: 85, w: 1.0 }, { lat: 7, lon: 105, w: 2.4 },
      { lat: 4, lon: 125, w: 2.0 }, { lat: 8, lon: 145, w: 1.1 },
    ], 2.8));

    // East Pacific Intertropical Arc
    earthCloudsGroup.add(createCloudRibbon([
      { lat: 7, lon: -145, w: 0.9 }, { lat: 9, lon: -125, w: 2.0 },
      { lat: 6, lon: -105, w: 1.8 }, { lat: 8, lon: -90, w: 0.8 },
    ], 2.4));

    // 2. North Atlantic Storm Track (Comma-shaped occluded front)
    earthCloudsGroup.add(createCloudRibbon([
      { lat: 30, lon: -68, w: 0.8 }, { lat: 38, lon: -52, w: 2.0 },
      { lat: 48, lon: -35, w: 2.5 }, { lat: 56, lon: -20, w: 2.2 },
      { lat: 63, lon: -4, w: 1.2 },
    ], 3.4));

    // 3. North Pacific Storm Front
    earthCloudsGroup.add(createCloudRibbon([
      { lat: 32, lon: 142, w: 0.9 }, { lat: 44, lon: 168, w: 2.2 },
      { lat: 53, lon: -172, w: 2.6 }, { lat: 55, lon: -148, w: 2.0 },
      { lat: 47, lon: -128, w: 1.1 },
    ], 3.5));

    // 4. Southern Ocean Roaring Forties Dynamic Storm Swirls
    earthCloudsGroup.add(createCloudRibbon([
      { lat: -44, lon: -160, w: 1.0 }, { lat: -52, lon: -120, w: 2.4 },
      { lat: -48, lon: -80, w: 1.8 }, { lat: -54, lon: -40, w: 2.2 },
      { lat: -46, lon: 0, w: 1.5 },
    ], 3.6));

    earthCloudsGroup.add(createCloudRibbon([
      { lat: -45, lon: 40, w: 1.2 }, { lat: -53, lon: 85, w: 2.5 },
      { lat: -47, lon: 130, w: 2.0 }, { lat: -52, lon: 175, w: 1.1 },
    ], 3.8));

    // 5. Low-Poly Pacific Tropical Cyclone with Clear Eye
    const cycloneGroup = new THREE.Group();
    const cycLat = 22;
    const cycLon = -155;
    const cycCenter = toCartesian(cycLat, cycLon, globeRadius + 0.08);
    cycloneGroup.position.copy(cycCenter);
    cycloneGroup.lookAt(0, 0, 0);

    // 3 Curving logarithmic spiral arms constructed of flat-shaded low-poly facets
    for (let arm = 0; arm < 3; arm++) {
      const armAngle = (arm / 3) * Math.PI * 2;
      const armGeom = new THREE.BufferGeometry();
      const armPos = [];
      const steps = 14;

      for (let s = 0; s < steps; s++) {
        const t1 = s / steps;
        const t2 = (s + 1) / steps;

        const theta1 = t1 * 2.8 + armAngle;
        const dist1 = 0.14 + Math.pow(t1, 1.2) * 0.85;
        const w1 = (0.05 + t1 * 0.12) * (1 - t1 * 0.5);

        const theta2 = t2 * 2.8 + armAngle;
        const dist2 = 0.14 + Math.pow(t2, 1.2) * 0.85;
        const w2 = (0.05 + t2 * 0.12) * (1 - t2 * 0.5);

        const x1 = Math.cos(theta1) * dist1, y1 = Math.sin(theta1) * dist1;
        const x2 = Math.cos(theta2) * dist2, y2 = Math.sin(theta2) * dist2;

        const dx1 = -Math.sin(theta1) * w1, dy1 = Math.cos(theta1) * w1;
        const dx2 = -Math.sin(theta2) * w2, dy2 = Math.cos(theta2) * w2;

        armPos.push(x1 - dx1, y1 - dy1, 0.015 * (1 - t1));
        armPos.push(x1 + dx1, y1 + dy1, 0.015 * (1 - t1));
        armPos.push(x2 - dx2, y2 - dy2, 0.015 * (1 - t2));

        armPos.push(x2 - dx2, y2 - dy2, 0.015 * (1 - t2));
        armPos.push(x1 + dx1, y1 + dy1, 0.015 * (1 - t1));
        armPos.push(x2 + dx2, y2 + dy2, 0.015 * (1 - t2));
      }

      armGeom.setAttribute('position', new THREE.Float32BufferAttribute(armPos, 3));
      armGeom.computeVertexNormals();
      const armMesh = new THREE.Mesh(armGeom, cloudClusterMat);
      cycloneGroup.add(armMesh);
    }
    earthCloudsGroup.add(cycloneGroup);
    orbitGroup.add(earthCloudsGroup);

    // -------------------------------------------------------------------------
    // C. Night-Side Glowing City Light Constellations (Pixel Points)
    // -------------------------------------------------------------------------
    const cityLightGeom = new THREE.BufferGeometry();
    cityLightGeom.setAttribute('position', new THREE.Float32BufferAttribute(nightLightsPositions, 3));
    const cityLightMat = new THREE.PointsMaterial({
      color: 0xffbe4d,
      size: 0.065,
      transparent: true,
      opacity: 0.90,
    });
    const cityLightsSystem = new THREE.Points(cityLightGeom, cityLightMat);
    orbitGroup.add(cityLightsSystem);

    // -------------------------------------------------------------------------


    // -------------------------------------------------------------------------
    // E. Flagship Earth Observation Satellite & Micro-Probe (Decoupled from Earth)
    // -------------------------------------------------------------------------
    const satelliteOrbitGroup = new THREE.Group();
    satelliteOrbitGroup.position.set(5.2, -0.15, -0.5);
    scene.add(satelliteOrbitGroup);

    const flagshipSatellite = new THREE.Group();
    const satGoldMat = new THREE.MeshStandardMaterial({ color: 0xd4a037, metalness: 0.88, roughness: 0.24, flatShading: true });
    const satMetalMat = new THREE.MeshStandardMaterial({ color: 0xc4cdd6, metalness: 0.82, roughness: 0.28, flatShading: true });
    const solarCellMat = new THREE.MeshStandardMaterial({ color: 0x122a48, metalness: 0.90, roughness: 0.16, flatShading: true });

    // Main Octagonal Avionics Bus
    const satBus = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.9, 8), satGoldMat);
    satBus.rotation.x = Math.PI / 2;
    flagshipSatellite.add(satBus);

    // Nadir Earth Observation Optical Sensor Pod
    const sensorPod = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 0.38, 6), satMetalMat);
    sensorPod.position.set(0, -0.4, 0);
    flagshipSatellite.add(sensorPod);

    // Parabolic High-Gain Telemetry Dish
    const satDish = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.2, 8), satMetalMat);
    satDish.rotation.x = -Math.PI / 2;
    satDish.position.set(0, 0.1, 0.62);
    flagshipSatellite.add(satDish);

    const satFeed = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.3, 4), satGoldMat);
    satFeed.rotation.x = -Math.PI / 2;
    satFeed.position.set(0, 0.1, 0.82);
    flagshipSatellite.add(satFeed);

    // Articulated 4-Segment Solar Array Wings
    const createArticulatedSolarWing = (direction) => {
      const wing = new THREE.Group();
      const boom = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 0.38, 4), satMetalMat);
      boom.rotation.z = Math.PI / 2;
      boom.position.x = direction * 0.2;
      wing.add(boom);

      for (let s = 0; s < 4; s++) {
        const panel = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.48, 0.03), solarCellMat);
        panel.position.x = direction * (0.42 + s * 0.36);
        wing.add(panel);

        const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.48, 4), satGoldMat);
        hinge.position.x = direction * (0.26 + s * 0.36);
        wing.add(hinge);
      }
      return wing;
    };
    flagshipSatellite.add(createArticulatedSolarWing(1));
    flagshipSatellite.add(createArticulatedSolarWing(-1));

    // Star Tracker Baffles & Thrusters
    for (let t = 0; t < 4; t++) {
      const angle = (t / 4) * Math.PI * 2;
      const thruster = new THREE.Mesh(new THREE.ConeGeometry(0.045, 0.09, 4), satMetalMat);
      thruster.position.set(Math.cos(angle) * 0.36, Math.sin(angle) * 0.36, -0.45);
      flagshipSatellite.add(thruster);
    }
    flagshipSatellite.scale.set(0.68, 0.68, 0.68);
    satelliteOrbitGroup.add(flagshipSatellite);

    // Secondary Climate CubeSat Micro-Probe (GRACE style)
    const microSatellite = new THREE.Group();
    const cubeBody = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.28, 0.58), satMetalMat);
    microSatellite.add(cubeBody);

    for (let w = -1; w <= 1; w += 2) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.22, 0.02), solarCellMat);
      blade.position.set(w * 0.38, 0, 0);
      blade.rotation.z = w * 0.25;
      microSatellite.add(blade);
    }

    const laserBoom = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.4, 4), satGoldMat);
    laserBoom.position.set(0, 0, 0.42);
    laserBoom.rotation.x = Math.PI / 2;
    microSatellite.add(laserBoom);

    microSatellite.scale.set(0.60, 0.60, 0.60);
    satelliteOrbitGroup.add(microSatellite);

    // Faceted Chondrite & Metallic Asteroid Shards
    const asteroids = [];
    const chondriteMat = new THREE.MeshStandardMaterial({ color: 0x32373f, flatShading: true, roughness: 0.92 });
    const metallicAstMat = new THREE.MeshStandardMaterial({ color: 0x5a6370, flatShading: true, roughness: 0.55, metalness: 0.65 });

    for (let a = 0; a < 7; a++) {
      const isMetallic = a % 2 === 0;
      const astGeom = new THREE.DodecahedronGeometry(0.14 + (a % 3) * 0.07, 1);
      const asteroid = new THREE.Mesh(astGeom, isMetallic ? metallicAstMat : chondriteMat);
      const astAngle = (a / 7) * Math.PI * 2 + 0.3;
      const astDist = 5.6 + (a % 3) * 0.7;
      asteroid.position.set(
        Math.cos(astAngle) * astDist,
        (Math.sin(a * 2.1) - 0.2) * 2.2,
        Math.sin(astAngle) * astDist
      );
      orbitGroup.add(asteroid);
      asteroids.push({
        mesh: asteroid,
        rotSpeedX: 0.015 + (a % 3) * 0.01,
        rotSpeedY: 0.02 + (a % 2) * 0.012,
      });
    }

    // =========================================================================
    // 4. STAGE 2: STRATOSPHERE · 12,000 M (Y = -29.8)
    // =========================================================================
    const stratosphereGroup = new THREE.Group();
    stratosphereGroup.position.set(0, -29.8, 0);
    scene.add(stratosphereGroup);

    // -------------------------------------------------------------------------
    // A. 3 Distinct Cloud Genera with Authentic Atmospheric Layering
    // -------------------------------------------------------------------------
    const cloudBaseMat = new THREE.MeshStandardMaterial({
      color: 0x9fb4c7, // Cool tropospheric shadow base
      flatShading: true,
      roughness: 0.92,
    });
    const cloudMidMat = new THREE.MeshStandardMaterial({
      color: 0xd9e5f0, // Ambient midtone
      flatShading: true,
      roughness: 0.82,
    });
    const cloudSunlitMat = new THREE.MeshStandardMaterial({
      color: 0xfafdff, // Crisp sunlit summit
      flatShading: true,
      roughness: 0.68,
    });

    const createRealisticCloud = (widthSpan, heightScale, domeDetail = 5) => {
      const cloud = new THREE.Group();
      for (let d = 0; d < domeDetail; d++) {
        const radius = (widthSpan * 0.24) * (0.80 + (d % 3) * 0.25);
        const mat = d === 0 ? cloudSunlitMat : (d % 2 === 0 ? cloudMidMat : cloudBaseMat);
        const dome = new THREE.Mesh(new THREE.IcosahedronGeometry(radius, 1), mat);
        const xOffset = ((d - domeDetail / 2) / domeDetail) * widthSpan * 0.85;
        const yOffset = (0.20 + (d % 2) * 0.15) * heightScale;
        const zOffset = ((d % 2 === 0 ? 1 : -1) * widthSpan * 0.16);
        dome.position.set(xOffset, yOffset, zOffset);
        dome.scale.set(1.25, 0.70, 1.05);
        cloud.add(dome);

        // Soft lower shadow puff (replaces harsh rectangular box base)
        const basePuff = new THREE.Mesh(new THREE.IcosahedronGeometry(radius * 0.75, 1), cloudBaseMat);
        basePuff.position.set(xOffset, yOffset - radius * 0.45, zOffset);
        basePuff.scale.set(1.4, 0.45, 1.1);
        cloud.add(basePuff);
      }
      return cloud;
    };

    // 1. Rolling Stratocumulus Cloud Sea Deck (Carpet below the birds)
    const cloudSeaGroup = new THREE.Group();
    for (let s = 0; s < 9; s++) {
      const seaCloud = createRealisticCloud(2.8 + (s % 3) * 0.6, 0.75, 4);
      const cx = -3.0 + s * 1.1;
      const cy = -6.2 + Math.sin(s * 0.7) * 0.20;
      const cz = -4.5 + (s % 3) * 1.5;
      seaCloud.position.set(cx, cy, cz);
      cloudSeaGroup.add(seaCloud);
    }
    stratosphereGroup.add(cloudSeaGroup);

    // 3. Delicate High-Altitude Cirrus Ice Streamers (12,000 M)
    const cirrusMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
    });
    for (let l = 0; l < 4; l++) {
      const cirrusGeom = new THREE.BufferGeometry();
      const cVerts = new Float32Array([
        -3.5, 0.05, 0,
        3.5, 0.02, -0.8,
        -2.5, -0.05, -0.3,

        3.5, 0.02, -0.8,
        2.5, -0.06, -1.0,
        -2.5, -0.05, -0.3,
      ]);
      cirrusGeom.setAttribute('position', new THREE.BufferAttribute(cVerts, 3));
      cirrusGeom.computeVertexNormals();
      const cirrus = new THREE.Mesh(cirrusGeom, cirrusMat);
      cirrus.position.set(6.0 + l * 2.0, 5.0 + (l % 2) * 0.3, -8.5 - l * 1.0);
      cirrus.scale.set(1.5, 0.8, 1.0);
      stratosphereGroup.add(cirrus);
    }

    // -------------------------------------------------------------------------
    // B. Masterclass Two-Bone Articulated Low-Poly Peregrine Falcons
    // -------------------------------------------------------------------------
    const birds = [];

    // Authentic Peregrine Falcon Materials
    const falconBodyMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.50,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    const falconDorsalMat = new THREE.MeshStandardMaterial({
      color: 0x242d3a, // Slate-charcoal dorsal mantle & flight feathers
      roughness: 0.44,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    const falconUnderwingMat = new THREE.MeshStandardMaterial({
      color: 0xede6d8, // Cream barred underwing coverts
      roughness: 0.62,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    const falconCereMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Brilliant golden-yellow cere & orbital eye ring
      roughness: 0.32,
      flatShading: true,
    });
    const falconEyeMat = new THREE.MeshStandardMaterial({
      color: 0x090b0e, // Piercing obsidian pupil
      roughness: 0.15,
      flatShading: true,
    });
    const falconTailMat = new THREE.MeshStandardMaterial({
      color: 0x222a36, // Banded slate rectrices
      roughness: 0.50,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    const falconTerminalMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc, // Crisp white tail terminal fringe
      roughness: 0.58,
      flatShading: true,
      side: THREE.DoubleSide,
    });
    const falconTarsiMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Golden yellow talons & tarsi
      roughness: 0.38,
      flatShading: true,
    });

    // Helper: Builds a masterclass unified sculpted low-poly falcon fuselage with uniform facet colors
    const createFalconFuselageGeometry = () => {
      const positions = [];
      const colors = [];

      // Every face has identical vertex colors at all 3 vertices, guaranteeing zero bleeding under flat shading
      const addFace = (v1, v2, v3, faceColor) => {
        positions.push(v1[0], v1[1], v1[2], v2[0], v2[1], v2[2], v3[0], v3[1], v3[2]);
        colors.push(
          faceColor[0], faceColor[1], faceColor[2],
          faceColor[0], faceColor[1], faceColor[2],
          faceColor[0], faceColor[1], faceColor[2]
        );
      };
      const addQuadFace = (v1, v2, v3, v4, faceColor) => {
        addFace(v1, v2, v3, faceColor);
        addFace(v1, v3, v4, faceColor);
      };

      // Palette Tokens
      const cBeak = [0.08, 0.09, 0.11];     // Obsidian horn beak
      const cCere = [0.96, 0.65, 0.08];     // Golden-yellow cere
      const cHood = [0.09, 0.12, 0.16];     // Dark slate helmet
      const cIvory = [0.98, 0.97, 0.94];    // Clean ivory cheek & throat
      const cMalar = [0.05, 0.06, 0.08];    // Black malar mustache stripe
      const cBreast = [0.99, 0.98, 0.95];   // Full cream breast & deep keel
      const cBuff = [0.86, 0.82, 0.76];     // Barred buff flanks & belly
      const cMantle = [0.18, 0.22, 0.28];   // Slate blue-grey mantle
      const cRump = [0.13, 0.16, 0.22];     // Dark slate tail root

      // 1. Hooked Raptor Beak
      const vTip = [0, -0.025, 0.84];      // Sharp downward hooked tip
      const vBBridge = [0, 0.070, 0.76];   // Arched culmen ridge
      const vBR = [0.038, 0.020, 0.72];    // Right cutting edge
      const vBL = [-0.038, 0.020, 0.72];   // Left cutting edge
      const vBBot = [0, -0.025, 0.71];     // Underside gonys

      // Verified outward-facing normals
      addFace(vTip, vBR, vBBridge, cBeak);
      addFace(vTip, vBBridge, vBL, cBeak);
      addFace(vTip, vBBot, vBR, cBeak);
      addFace(vTip, vBL, vBBot, cBeak);

      // 2. Crisp Golden-Yellow Cere Collar Band
      const vCTop = [0, 0.090, 0.67];
      const vCR = [0.052, 0.045, 0.67];
      const vCL = [-0.052, 0.045, 0.67];
      const vCBot = [0, -0.030, 0.66];

      addQuadFace(vBBridge, vBR, vCR, vCTop, cCere);
      addQuadFace(vBBridge, vCTop, vCL, vBL, cCere);
      addQuadFace(vBBot, vCBot, vCR, vBR, cCere);
      addQuadFace(vBBot, vBL, vCL, vCBot, cCere);

      // 3. Forehead, Eyes, Cheeks & Malar Mustache
      const vForehead = [0, 0.120, 0.60];
      const vBrowR = [0.072, 0.085, 0.58];
      const vBrowL = [-0.072, 0.085, 0.58];
      const vCheekR = [0.080, 0.030, 0.52];
      const vCheekL = [-0.080, 0.030, 0.52];
      const vMalarR = [0.075, -0.030, 0.54];
      const vMalarL = [-0.075, -0.030, 0.54];
      const vThroat = [0, -0.050, 0.56];

      // Dark hood on forehead and brow
      addQuadFace(vCTop, vCR, vBrowR, vForehead, cHood);
      addQuadFace(vCTop, vForehead, vBrowL, vCL, cHood);

      // White cheek auriculars
      addFace(vCR, vCheekR, vBrowR, cIvory);
      addFace(vCL, vBrowL, vCheekL, cIvory);

      // Dark malar mustache stripe
      addQuadFace(vCR, vMalarR, vCheekR, vCR, cMalar);
      addQuadFace(vCL, vCheekL, vMalarL, vCL, cMalar);
      addQuadFace(vCBot, vThroat, vMalarR, vCR, cIvory);
      addQuadFace(vCBot, vCL, vMalarL, vThroat, cIvory);

      // 4. Crown, Nape, Temples & Malar Stripe Descent
      const vCrown = [0, 0.135, 0.46];
      const vNape = [0, 0.105, 0.32];
      const vTempleR = [0.082, 0.075, 0.44];
      const vTempleL = [-0.082, 0.075, 0.44];
      const vMalarLowR = [0.068, -0.060, 0.44];
      const vMalarLowL = [-0.068, -0.060, 0.44];
      const vThroatBase = [0, -0.080, 0.44];

      addQuadFace(vForehead, vBrowR, vTempleR, vCrown, cHood);
      addQuadFace(vForehead, vCrown, vTempleL, vBrowL, cHood);
      addFace(vBrowR, vCheekR, vTempleR, cIvory);
      addFace(vBrowL, vTempleL, vCheekL, cIvory);
      addQuadFace(vCheekR, vMalarR, vMalarLowR, vTempleR, cMalar);
      addQuadFace(vCheekL, vTempleL, vMalarLowL, vMalarL, cMalar);
      addQuadFace(vThroat, vThroatBase, vMalarLowR, vMalarR, cIvory);
      addQuadFace(vThroat, vMalarL, vMalarLowL, vThroatBase, cIvory);

      // 5. Upper Mantle, Shoulders & Deep Muscular Pectoral Keel
      const vMantle = [0, 0.095, 0.22];
      const vShoulderR = [0.13, 0.045, 0.18];
      const vShoulderL = [-0.13, 0.045, 0.18];
      const vKeelApex = [0, -0.17, 0.22]; // Deepest point of powerful raptor chest
      const vBreastR = [0.092, -0.10, 0.26];
      const vBreastL = [-0.092, -0.10, 0.26];

      addQuadFace(vCrown, vTempleR, vShoulderR, vNape, cHood);
      addQuadFace(vCrown, vNape, vShoulderL, vTempleL, cHood);
      addFace(vNape, vShoulderR, vMantle, cMantle);
      addFace(vNape, vMantle, vShoulderL, cMantle);
      addQuadFace(vThroatBase, vMalarLowR, vShoulderR, vBreastR, cBreast);
      addQuadFace(vThroatBase, vBreastL, vShoulderL, vMalarLowL, cBreast);
      addQuadFace(vThroatBase, vBreastR, vKeelApex, vBreastL, cBreast);

      // 6. Mid-Body (Back, Flanks, Mid-Belly Keel)
      const vMidBack = [0, 0.075, 0.0];
      const vFlankR = [0.11, -0.04, 0.0];
      const vFlankL = [-0.11, -0.04, 0.0];
      const vMidBelly = [0, -0.13, 0.02];

      addQuadFace(vMantle, vShoulderR, vFlankR, vMidBack, cMantle);
      addQuadFace(vMantle, vMidBack, vFlankL, vShoulderL, cMantle);
      addQuadFace(vKeelApex, vBreastR, vFlankR, vMidBelly, cBreast);
      addQuadFace(vKeelApex, vMidBelly, vFlankL, vBreastL, cBreast);

      // 7. Waist, Tapered Abdomen & Vent
      const vRump = [0, 0.045, -0.22];
      const vLowerFlankR = [0.08, -0.02, -0.22];
      const vLowerFlankL = [-0.08, -0.02, -0.22];
      const vVent = [0, -0.07, -0.22];

      addQuadFace(vMidBack, vFlankR, vLowerFlankR, vRump, cMantle);
      addQuadFace(vMidBack, vRump, vLowerFlankL, vFlankL, cMantle);
      addQuadFace(vMidBelly, vFlankR, vLowerFlankR, vVent, cBuff);
      addQuadFace(vMidBelly, vVent, vLowerFlankL, vFlankL, cBuff);

      // 8. Tail Root Coverts & Rump
      const vTailRoot = [0, 0.025, -0.44];
      const vUnderR = [0.04, -0.02, -0.42];
      const vUnderL = [-0.04, -0.02, -0.42];
      const vUnderBot = [0, -0.035, -0.44];

      addQuadFace(vRump, vLowerFlankR, vUnderR, vTailRoot, cRump);
      addQuadFace(vRump, vTailRoot, vUnderL, vLowerFlankL, cRump);
      addQuadFace(vVent, vLowerFlankR, vUnderR, vUnderBot, cBuff);
      addQuadFace(vVent, vUnderBot, vUnderL, vLowerFlankL, cBuff);

      const geom = new THREE.BufferGeometry();
      geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geom.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      geom.computeVertexNormals();
      return geom;
    };

    const sharedFalconFuselageGeom = createFalconFuselageGeometry();

    // Helper: Creates a masterclass articulated falcon with 2-bone scythe wings & stepped primary feathers
    const createMasterclassFalcon = (wingspanScale = 1.0, isStooper = false) => {
      const bird = new THREE.Group();
      const bodyPivot = new THREE.Group();
      bird.add(bodyPivot);

      // 1. Aerodynamic Muscular Fuselage (Seamless low-poly mesh with authentic plumage colors)
      const fuselageMesh = new THREE.Mesh(sharedFalconFuselageGeom, falconBodyMat);
      bodyPivot.add(fuselageMesh);

      // Piercing Obsidian Eyes with Golden-Yellow Orbital Rings
      for (let e = -1; e <= 1; e += 2) {
        const eyeRing = new THREE.Mesh(new THREE.DodecahedronGeometry(0.024, 0), falconCereMat);
        eyeRing.position.set(e * 0.076, 0.075, 0.58);
        bodyPivot.add(eyeRing);

        const eyePupil = new THREE.Mesh(new THREE.DodecahedronGeometry(0.017, 0), falconEyeMat);
        eyePupil.position.set(e * 0.082, 0.075, 0.58);
        bodyPivot.add(eyePupil);
      }

      // 2. Articulated Fanned Wedge Tail with White Terminal Fringe Band
      const tailPivot = new THREE.Group();
      tailPivot.position.set(0, -0.01, -0.44);

      const tailGeom = new THREE.BufferGeometry();
      const tailVerts = new Float32Array([
        0, 0, 0,
        -0.28, 0.02, -0.56,
        0.28, 0.02, -0.56,

        0, 0, 0,
        -0.16, 0.025, -0.66,
        0.16, 0.025, -0.66,
      ]);
      tailGeom.setAttribute('position', new THREE.BufferAttribute(tailVerts, 3));
      tailGeom.computeVertexNormals();
      const tailMesh = new THREE.Mesh(tailGeom, falconTailMat);
      tailPivot.add(tailMesh);

      // White Terminal Tail Fringe Band
      const termGeom = new THREE.BufferGeometry();
      const termVerts = new Float32Array([
        -0.28, 0.02, -0.56,
        -0.16, 0.025, -0.66,
        0, 0.028, -0.70,

        0.28, 0.02, -0.56,
        0.16, 0.025, -0.66,
        0, 0.028, -0.70,
      ]);
      termGeom.setAttribute('position', new THREE.BufferAttribute(termVerts, 3));
      termGeom.computeVertexNormals();
      const termMesh = new THREE.Mesh(termGeom, falconTerminalMat);
      tailPivot.add(termMesh);

      bodyPivot.add(tailPivot);

      // Tucked Yellow Tarsi Under Tail Coverts (Flush against undertail)
      for (let t = -1; t <= 1; t += 2) {
        const tarsus = new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.022, 0.11), falconTarsiMat);
        tarsus.position.set(t * 0.045, -0.065, -0.22);
        tarsus.rotation.x = -0.25;
        bodyPivot.add(tarsus);
      }

      // 3. Two-Bone Articulated Scythe Wings with 4 Stepped Primaries (P10, P9, P8, P7)
      const span = 0.72 * wingspanScale;

      const buildWingSide = (side) => {
        const innerWing = new THREE.Group();
        innerWing.position.set(side * 0.13, 0.045, 0.18);

        // Inner Wing / Arm Coverts & Trailing Secondaries
        const innerGeom = new THREE.BufferGeometry();
        const iVerts = side === 1 ? new Float32Array([
          // Upper dorsal surface
          0, 0.02, 0.08,
          span * 0.46, 0.025, 0.04,
          0, 0.01, -0.32,

          span * 0.46, 0.025, 0.04,
          span * 0.42, -0.015, -0.28,
          0, 0.01, -0.32,
        ]) : new Float32Array([
          0, 0.02, 0.08,
          0, 0.01, -0.32,
          -span * 0.46, 0.025, 0.04,

          -span * 0.46, 0.025, 0.04,
          0, 0.01, -0.32,
          -span * 0.42, -0.015, -0.28,
        ]);
        innerGeom.setAttribute('position', new THREE.BufferAttribute(iVerts, 3));
        innerGeom.computeVertexNormals();
        const innerMesh = new THREE.Mesh(innerGeom, falconDorsalMat);
        innerWing.add(innerMesh);

        // Wrist Joint
        const outerWing = new THREE.Group();
        outerWing.position.set(side * span * 0.46, 0.025, 0.04);

        // Outer Wing with 4 Stepped Primary Feather Fingers (P10, P9, P8, P7)
        const outerGeom = new THREE.BufferGeometry();
        const oVerts = side === 1 ? new Float32Array([
          // Main wing blade
          0, 0, 0,
          span * 0.48, 0.04, -0.24,
          0, -0.02, -0.22,

          // P10 Longest Outer Primary
          span * 0.48, 0.04, -0.24,
          span * 0.72, 0.05, -0.48,
          span * 0.40, 0.02, -0.32,

          // P9 Stepped Primary
          span * 0.40, 0.02, -0.32,
          span * 0.62, 0.04, -0.42,
          span * 0.30, 0.01, -0.28,

          // P8 Stepped Primary
          span * 0.30, 0.01, -0.28,
          span * 0.52, 0.03, -0.36,
          span * 0.18, 0.0, -0.24,

          // P7 Inner Primary
          span * 0.18, 0.0, -0.24,
          span * 0.40, 0.02, -0.30,
          0, -0.02, -0.22,
        ]) : new Float32Array([
          // Main wing blade
          0, 0, 0,
          0, -0.02, -0.22,
          -span * 0.48, 0.04, -0.24,

          // P10 Longest Outer Primary
          -span * 0.48, 0.04, -0.24,
          -span * 0.40, 0.02, -0.32,
          -span * 0.72, 0.05, -0.48,

          // P9 Stepped Primary
          -span * 0.40, 0.02, -0.32,
          -span * 0.30, 0.01, -0.28,
          -span * 0.62, 0.04, -0.42,

          // P8 Stepped Primary
          -span * 0.30, 0.01, -0.28,
          -span * 0.18, 0.0, -0.24,
          -span * 0.52, 0.03, -0.36,

          // P7 Inner Primary
          -span * 0.18, 0.0, -0.24,
          0, -0.02, -0.22,
          -span * 0.40, 0.02, -0.30,
        ]);
        outerGeom.setAttribute('position', new THREE.BufferAttribute(oVerts, 3));
        outerGeom.computeVertexNormals();
        const outerMesh = new THREE.Mesh(outerGeom, falconDorsalMat);
        outerWing.add(outerMesh);

        innerWing.add(outerWing);
        bodyPivot.add(innerWing);

        return { innerWing, outerWing };
      };

      const leftWing = buildWingSide(-1);
      const rightWing = buildWingSide(1);

      if (isStooper) {
        // High-speed hunting dive: wings swept back tight against flanks in aerodynamic delta chevron
        leftWing.innerWing.rotation.set(-0.55, -0.65, -0.42);
        leftWing.outerWing.rotation.set(-0.30, -0.50, 0.75);
        rightWing.innerWing.rotation.set(-0.55, 0.65, 0.42);
        rightWing.outerWing.rotation.set(-0.30, 0.50, -0.75);
        tailPivot.rotation.x = 0.35;
        bodyPivot.rotation.x = 0.52;
      }

      return {
        bird,
        bodyPivot,
        tailPivot,
        leftInner: leftWing.innerWing,
        leftOuter: leftWing.outerWing,
        rightInner: rightWing.innerWing,
        rightOuter: rightWing.outerWing,
        isStooper,
      };
    };

    // ─────────────────────────────────────────────────────────────────────────
    // Cinematic V-formation echelon: 7 falcons in a sweeping arc
    // Lead bird front-center, 3 wingmen per side fanning back in perspective
    // Each bird has a unique orbit radius so the formation breathes naturally
    // ─────────────────────────────────────────────────────────────────────────
    const falconRoster = [
      // Lead bird – closest, largest, just above cloud deck
      { x:  0.6, y: -4.20, z: 5.2, s: 1.08, ws: 1.20, bankY: 0.28, bankX: 0.06, bankZ: -0.08, stoop: false, orbitR: 0.22, orbitSpd: 0.55, orbitPhase: 0.0  },
      // Right-1 echelon
      { x:  1.9, y: -4.00, z: 4.5, s: 0.94, ws: 1.08, bankY: 0.40, bankX: 0.09, bankZ: -0.14, stoop: false, orbitR: 0.18, orbitSpd: 0.62, orbitPhase: 1.1  },
      // Left-1 echelon
      { x: -0.7, y: -4.10, z: 4.4, s: 0.94, ws: 1.08, bankY: 0.18, bankX: 0.08, bankZ:  0.14, stoop: false, orbitR: 0.20, orbitSpd: 0.58, orbitPhase: 2.2  },
      // Right-2 – stooping diver (slightly higher, mid-dive)
      { x:  3.0, y: -3.20, z: 3.6, s: 0.82, ws: 0.96, bankY: 0.56, bankX: 0.42, bankZ: -0.28, stoop: true,  orbitR: 0.12, orbitSpd: 0.80, orbitPhase: 0.5  },
      // Left-2 echelon
      { x: -2.0, y: -3.60, z: 3.5, s: 0.82, ws: 0.96, bankY: 0.08, bankX: 0.07, bankZ:  0.22, stoop: false, orbitR: 0.16, orbitSpd: 0.68, orbitPhase: 3.3  },
      // Right-3 trail
      { x:  3.8, y: -4.60, z: 2.8, s: 0.72, ws: 0.90, bankY: 0.52, bankX: 0.10, bankZ: -0.18, stoop: false, orbitR: 0.14, orbitSpd: 0.72, orbitPhase: 1.8  },
      // Left-3 trail – skimming the cloud tops
      { x: -3.2, y: -5.20, z: 2.7, s: 0.72, ws: 0.90, bankY: 0.05, bankX: 0.12, bankZ:  0.18, stoop: false, orbitR: 0.15, orbitSpd: 0.70, orbitPhase: 4.1  },
    ];

    falconRoster.forEach((fc, idx) => {
      const falconRig = createMasterclassFalcon(fc.ws, fc.stoop);
      falconRig.bird.scale.set(fc.s, fc.s, fc.s);
      falconRig.bird.position.set(fc.x, fc.y, fc.z);
      falconRig.bird.rotation.set(fc.bankX, fc.bankY, fc.bankZ);
      stratosphereGroup.add(falconRig.bird);

      birds.push({
        ...falconRig,
        baseX: fc.x,
        baseY: fc.y,
        baseZ: fc.z,
        baseBankX: fc.bankX,
        baseBankZ: fc.bankZ,
        phase: idx * 0.85,
        flapSpeed: fc.stoop ? 0.0 : (idx === 0 ? 4.8 : 5.2 + (idx % 4) * 0.35),
        orbitR: fc.orbitR,
        orbitSpd: fc.orbitSpd,
        orbitPhase: fc.orbitPhase,
      });
    });

    // -------------------------------------------------------------------------
    // D. 3D Jet Stream Wind Streamlines (Framed cleanly in lower right)
    // -------------------------------------------------------------------------
    const windGroup = new THREE.Group();
    const windMat = new THREE.MeshBasicMaterial({
      color: 0x88c4ec,
      transparent: true,
      opacity: 0.14,
    });
    for (let w = 0; w < 4; w++) {
      const windCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(2.5, -3.4 + w * 0.45, -3.0 + w * 0.4),
        new THREE.Vector3(5.5, -2.8 + w * 0.40, -2.0 + w * 0.4),
        new THREE.Vector3(8.5, -2.2 + w * 0.35, -1.0 + w * 0.4),
        new THREE.Vector3(11.5, -1.6 + w * 0.35, 0.0 + w * 0.4),
      ]);
      const windTube = new THREE.Mesh(new THREE.TubeGeometry(windCurve, 28, 0.012, 4, false), windMat);
      windGroup.add(windTube);
    }
    stratosphereGroup.add(windGroup);

    // =========================================================================
    // 5. STAGE 3: LIVING BIOSPHERE & CANOPY · 480 M (Y = -61.4)
    // =========================================================================
    const canopyGroup = new THREE.Group();
    canopyGroup.position.set(0, -61.4, 0);
    scene.add(canopyGroup);

    // -------------------------------------------------------------------------
    // A. Alpine Mountain Massif with Arêtes, Cirques & Crystalline Snowfields
    // -------------------------------------------------------------------------
    const mountainRockMat = new THREE.MeshStandardMaterial({ color: 0x1f2933, roughness: 0.94, flatShading: true });
    const mountainSnowMat = new THREE.MeshStandardMaterial({
      color: 0xf0f5fa,
      roughness: 0.68,
      flatShading: true,
      polygonOffset: true,
      polygonOffsetFactor: -1.5,
      polygonOffsetUnits: -1.5,
    });
    const mountainScreeMat = new THREE.MeshStandardMaterial({ color: 0x2e3844, roughness: 0.96, flatShading: true });

    const createAlpineMassif = (baseR, height, segments, snowRatio = 0.38) => {
      const m = new THREE.Group();
      const scree = new THREE.Mesh(new THREE.ConeGeometry(baseR * 1.18, height * 0.28, segments), mountainScreeMat);
      scree.position.y = height * 0.14;
      m.add(scree);

      const peak = new THREE.Mesh(new THREE.ConeGeometry(baseR, height, segments), mountainRockMat);
      peak.position.y = height / 2;
      m.add(peak);

      const snowH = height * snowRatio;
      const snowR = baseR * snowRatio * 1.035;
      const snow = new THREE.Mesh(new THREE.ConeGeometry(snowR, snowH, segments), mountainSnowMat);
      snow.position.y = height - snowH / 2 + 0.03;
      m.add(snow);

      return m;
    };

    const mountainLineup = [
      { x: -13, z: -25, r: 8.5, h: 10.2, seg: 6, sRatio: 0.40 },
      { x: -3.5, z: -27, r: 10.0, h: 12.2, seg: 5, sRatio: 0.44 },
      { x: 5.2, z: -23, r: 8.8, h: 9.6, seg: 6, sRatio: 0.38 },
      { x: 13.5, z: -26, r: 10.5, h: 11.0, seg: 5, sRatio: 0.42 },
      { x: -21, z: -29, r: 9.5, h: 10.5, seg: 6, sRatio: 0.36 },
    ];
    mountainLineup.forEach((mp) => {
      const peak = createAlpineMassif(mp.r, mp.h, mp.seg, mp.sRatio);
      peak.position.set(mp.x, -3.2, mp.z);
      peak.rotation.y = Math.random() * Math.PI;
      canopyGroup.add(peak);
    });

    // -------------------------------------------------------------------------
    // B. Rolling Valley Terrain Ground Plane
    // -------------------------------------------------------------------------
    const valleyGeom = new THREE.PlaneGeometry(56, 46, 22, 18);
    valleyGeom.rotateX(-Math.PI / 2);
    const vPos = valleyGeom.attributes.position;
    for (let i = 0; i < vPos.count; i++) {
      const vx = vPos.getX(i);
      const vz = vPos.getZ(i);
      const riverDist = Math.abs(vx - 0.5 + Math.sin(vz * 0.25) * 1.8);
      let elevation = Math.sin(vx * 0.2) * 1.4 + Math.cos(vz * 0.22) * 1.2;
      if (riverDist < 2.2) {
        elevation -= (2.2 - riverDist) * 1.1;
      }
      vPos.setY(i, elevation - 2.85);
    }
    valleyGeom.computeVertexNormals();
    const valleyMat = new THREE.MeshStandardMaterial({
      color: 0x122419,
      roughness: 0.95,
      flatShading: true,
    });
    const valleyMesh = new THREE.Mesh(valleyGeom, valleyMat);
    canopyGroup.add(valleyMesh);

    // -------------------------------------------------------------------------
    // C. Winding Glacial Meltwater River with Boulders
    // -------------------------------------------------------------------------
    const riverCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.5, -3.85, -19),
      new THREE.Vector3(-0.8, -3.95, -12),
      new THREE.Vector3(1.2, -4.05, -6),
      new THREE.Vector3(-0.6, -4.15, 0),
      new THREE.Vector3(0.8, -4.25, 6),
      new THREE.Vector3(0.0, -4.35, 15),
    ]);
    const riverGeom = new THREE.TubeGeometry(riverCurve, 42, 0.44, 5, false);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x228e9e,
      metalness: 0.38,
      roughness: 0.22,
      flatShading: true,
      emissive: 0x09343a,
    });
    const riverMesh = new THREE.Mesh(riverGeom, riverMat);
    canopyGroup.add(riverMesh);

    const boulderMat = new THREE.MeshStandardMaterial({ color: 0x36434d, flatShading: true, roughness: 0.92 });
    for (let b = 0; b < 20; b++) {
      const bMesh = new THREE.Mesh(new THREE.DodecahedronGeometry(0.18 + Math.random() * 0.18, 0), boulderMat);
      const bz = -15 + b * 1.5;
      const bx = 0.5 - Math.sin(bz * 0.25) * 1.8 + (b % 2 === 0 ? 0.78 : -0.78);
      bMesh.position.set(bx, -3.95, bz);
      bMesh.rotation.set(Math.random(), Math.random(), Math.random());
      canopyGroup.add(bMesh);
    }

    // -------------------------------------------------------------------------
    // D. 5 Distinct Tree Species / Variations (220+ Trees with Left Clearance)
    // -------------------------------------------------------------------------
    const treeMatDouglas = new THREE.MeshStandardMaterial({ color: 0x132a1e, flatShading: true, roughness: 0.85 });
    const treeMatPine = new THREE.MeshStandardMaterial({ color: 0x1b4432, flatShading: true, roughness: 0.85 });
    const treeMatSpruce = new THREE.MeshStandardMaterial({ color: 0x24543e, flatShading: true, roughness: 0.85 });
    const treeMatGoldenLarch = new THREE.MeshStandardMaterial({ color: 0xcf9829, flatShading: true, roughness: 0.80 });
    const treeMatSapling = new THREE.MeshStandardMaterial({ color: 0x2b6348, flatShading: true, roughness: 0.85 });
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x38241b, flatShading: true, roughness: 0.95 });

    const createDouglasFir = () => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.1, 1.25, 5), trunkMat);
      trunk.position.y = 0.62;
      tree.add(trunk);

      const tiers = [
        { r: 0.78, h: 0.9, y: 1.15 },
        { r: 0.64, h: 0.8, y: 1.7 },
        { r: 0.50, h: 0.7, y: 2.2 },
        { r: 0.36, h: 0.6, y: 2.65 },
        { r: 0.22, h: 0.5, y: 3.05 },
      ];
      tiers.forEach((t) => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(t.r, t.h, 5), treeMatDouglas);
        cone.position.y = t.y;
        tree.add(cone);
      });
      return tree;
    };

    const createMountainPine = () => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.95, 5), trunkMat);
      trunk.position.y = 0.48;
      tree.add(trunk);

      const tiers = [
        { r: 0.92, h: 1.1, y: 1.25 },
        { r: 0.72, h: 0.95, y: 1.95 },
        { r: 0.50, h: 0.8, y: 2.55 },
      ];
      tiers.forEach((t) => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(t.r, t.h, 5), treeMatPine);
        cone.position.y = t.y;
        tree.add(cone);
      });
      return tree;
    };

    const createAlpineSpruce = () => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.11, 0.85, 5), trunkMat);
      trunk.position.y = 0.42;
      tree.add(trunk);

      const tiers = [
        { r: 0.82, h: 0.95, y: 1.05 },
        { r: 0.62, h: 0.8, y: 1.6 },
        { r: 0.44, h: 0.7, y: 2.1 },
        { r: 0.28, h: 0.55, y: 2.55 },
      ];
      tiers.forEach((t) => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(t.r, t.h, 5), treeMatSpruce);
        cone.position.y = t.y;
        tree.add(cone);
      });
      return tree;
    };

    const createGoldenLarch = () => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.09, 1.1, 5), trunkMat);
      trunk.position.y = 0.55;
      tree.add(trunk);

      const tiers = [
        { r: 0.75, h: 0.85, y: 1.1 },
        { r: 0.58, h: 0.75, y: 1.6 },
        { r: 0.40, h: 0.65, y: 2.05 },
        { r: 0.24, h: 0.5, y: 2.45 },
      ];
      tiers.forEach((t) => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(t.r, t.h, 5), treeMatGoldenLarch);
        cone.position.y = t.y;
        tree.add(cone);
      });
      return tree;
    };

    const createAlpineSapling = () => {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.5, 4), trunkMat);
      trunk.position.y = 0.25;
      tree.add(trunk);

      const tiers = [
        { r: 0.6, h: 0.7, y: 0.65 },
        { r: 0.38, h: 0.55, y: 1.1 },
      ];
      tiers.forEach((t) => {
        const cone = new THREE.Mesh(new THREE.ConeGeometry(t.r, t.h, 4), treeMatSapling);
        cone.position.y = t.y;
        tree.add(cone);
      });
      return tree;
    };

    for (let t = 0; t < 220; t++) {
      const tx = Math.random() * 34 - 10;
      const tz = Math.random() * 34 - 17;

      if (tx < 1.0 && tz > -10.0) continue;

      const riverDist = Math.abs(tx - 0.5 + Math.sin(tz * 0.25) * 1.8);
      if (riverDist < 1.15) continue;

      let tree;
      const speciesPick = t % 5;
      if (speciesPick === 0) tree = createDouglasFir();
      else if (speciesPick === 1) tree = createMountainPine();
      else if (speciesPick === 2) tree = createAlpineSpruce();
      else if (speciesPick === 3) tree = createGoldenLarch();
      else tree = createAlpineSapling();

      const scale = 0.44 + Math.random() * 0.46;
      tree.scale.set(scale, scale, scale);

      const elevation = Math.sin(tx * 0.2) * 1.4 + Math.cos(tz * 0.22) * 1.2 - 2.85;
      tree.position.set(tx, elevation, tz);
      tree.rotation.y = Math.random() * Math.PI * 2;
      canopyGroup.add(tree);
    }

    // -------------------------------------------------------------------------
    // E. Low-Poly Stag with 10-Point Antlers on Rocky Promontory
    // -------------------------------------------------------------------------
    const stagGroup = new THREE.Group();
    stagGroup.position.set(2.4, -1.3, 0.5);
    stagGroup.rotation.y = -0.55;

    const cragMat = new THREE.MeshStandardMaterial({ color: 0x27342f, flatShading: true, roughness: 0.95 });
    const crag = new THREE.Mesh(new THREE.DodecahedronGeometry(0.85, 1), cragMat);
    crag.scale.set(1.4, 0.5, 1.25);
    crag.position.set(0, 0.1, 0);
    stagGroup.add(crag);

    const stagCoatMat = new THREE.MeshStandardMaterial({ color: 0x5e381f, flatShading: true, roughness: 0.75 });
    const stagRuffMat = new THREE.MeshStandardMaterial({ color: 0x362013, flatShading: true, roughness: 0.85 });
    const stagRumpMat = new THREE.MeshStandardMaterial({ color: 0x8a623f, flatShading: true, roughness: 0.75 });

    const stagChest = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.46, 0.52), stagCoatMat);
    stagChest.position.set(0, 0.8, 0.2);
    stagGroup.add(stagChest);

    const stagHaunch = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.42, 0.44), stagRumpMat);
    stagHaunch.position.set(0, 0.76, -0.24);
    stagGroup.add(stagHaunch);

    const stagNeck = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.54, 0.26), stagRuffMat);
    stagNeck.position.set(0, 1.12, 0.38);
    stagNeck.rotation.x = -0.38;
    stagGroup.add(stagNeck);

    const stagHead = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.34, 4), stagCoatMat);
    stagHead.rotation.x = Math.PI / 2;
    stagHead.position.set(0, 1.34, 0.54);
    stagGroup.add(stagHead);

    for (let e = -1; e <= 1; e += 2) {
      const ear = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.14, 3), stagCoatMat);
      ear.position.set(e * 0.1, 1.48, 0.46);
      ear.rotation.z = e * -0.4;
      ear.rotation.x = -0.2;
      stagGroup.add(ear);
    }

    const antlerMat = new THREE.MeshStandardMaterial({ color: 0xd9c2a5, flatShading: true, roughness: 0.65 });
    const createAntlerBeam = (dir) => {
      const beam = new THREE.Group();
      const mainBeam = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.52, 0.04), antlerMat);
      mainBeam.position.set(dir * 0.12, 1.6, 0.44);
      mainBeam.rotation.z = dir * -0.36;
      beam.add(mainBeam);

      const browTine = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.03), antlerMat);
      browTine.position.set(dir * 0.06, 1.48, 0.56);
      browTine.rotation.x = 0.52;
      beam.add(browTine);

      const bezTine = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.18, 0.03), antlerMat);
      bezTine.position.set(dir * 0.18, 1.62, 0.52);
      bezTine.rotation.x = 0.42;
      bezTine.rotation.z = dir * -0.3;
      beam.add(bezTine);

      const trezTine = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.2, 0.03), antlerMat);
      trezTine.position.set(dir * 0.26, 1.74, 0.46);
      trezTine.rotation.z = dir * -0.68;
      beam.add(trezTine);

      return beam;
    };
    stagGroup.add(createAntlerBeam(1));
    stagGroup.add(createAntlerBeam(-1));

    const hoofMat = new THREE.MeshStandardMaterial({ color: 0x16120e, flatShading: true });
    for (let l = 0; l < 4; l++) {
      const legX = l % 2 === 0 ? -0.12 : 0.12;
      const legZ = l < 2 ? 0.3 : -0.28;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.024, 0.8, 4), stagCoatMat);
      leg.position.set(legX, 0.4, legZ);
      stagGroup.add(leg);

      const hoof = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.06), hoofMat);
      hoof.position.set(legX, 0.03, legZ + 0.01);
      stagGroup.add(hoof);
    }
    canopyGroup.add(stagGroup);

    const sporeCount = 240;
    const sporeGeom = new THREE.BufferGeometry();
    const sporePos = new Float32Array(sporeCount * 3);
    for (let s = 0; s < sporeCount; s++) {
      sporePos[s * 3] = (Math.random() - 0.5) * 36;
      sporePos[s * 3 + 1] = Math.random() * 6.5 - 1.5;
      sporePos[s * 3 + 2] = (Math.random() - 0.5) * 28;
    }
    sporeGeom.setAttribute('position', new THREE.BufferAttribute(sporePos, 3));
    const sporeMat = new THREE.PointsMaterial({
      color: 0x9be8aa,
      size: 0.15,
      transparent: true,
      opacity: 0.85,
    });
    const sporeMesh = new THREE.Points(sporeGeom, sporeMat);
    canopyGroup.add(sporeMesh);

    // =========================================================================
    // 6. STAGE 4: SURFACE SETTLEMENT · 0 M (Y = -85.0)
    // =========================================================================
    const surfaceGroup = new THREE.Group();
    surfaceGroup.position.set(0, -85.0, 0);
    scene.add(surfaceGroup);

    const groundBaseY = -2.2;
    const clearingGeom = new THREE.PlaneGeometry(46, 40, 16, 14);
    clearingGeom.rotateX(-Math.PI / 2);
    const clPos = clearingGeom.attributes.position;
    for (let i = 0; i < clPos.count; i++) {
      const cx = clPos.getX(i);
      const cz = clPos.getZ(i);
      const elev = Math.sin(cx * 0.28) * Math.cos(cz * 0.26) * 0.32;
      clPos.setY(i, elev + groundBaseY);
    }
    clearingGeom.computeVertexNormals();
    const clearingMat = new THREE.MeshStandardMaterial({
      color: 0x151f1a,
      roughness: 0.95,
      flatShading: true,
    });
    const clearingMesh = new THREE.Mesh(clearingGeom, clearingMat);
    surfaceGroup.add(clearingMesh);

    const flagstoneMat = new THREE.MeshStandardMaterial({ color: 0x364049, flatShading: true, roughness: 0.92 });
    for (let p = 0; p < 8; p++) {
      const flagstone = new THREE.Mesh(new THREE.CylinderGeometry(0.24 + Math.random() * 0.12, 0.28, 0.08, 6), flagstoneMat);
      flagstone.position.set(
        1.1 + p * 0.26 + (Math.random() - 0.5) * 0.1,
        groundBaseY + 0.05,
        1.5 - p * 0.26
      );
      surfaceGroup.add(flagstone);
    }

    const flowerGoldMat = new THREE.MeshBasicMaterial({ color: 0xd97757 });
    const flowerBlueMat = new THREE.MeshBasicMaterial({ color: 0x5e9bd4 });
    const flowerWhiteMat = new THREE.MeshBasicMaterial({ color: 0xedf2f7 });
    const flowerStemMat = new THREE.MeshBasicMaterial({ color: 0x2d684d });

    const flowerPositions = [
      { x: -0.8, z: 1.8, mat: flowerGoldMat },
      { x: -0.5, z: 2.6, mat: flowerBlueMat },
      { x: 0.9, z: 2.2, mat: flowerWhiteMat },
      { x: 1.6, z: 1.4, mat: flowerGoldMat },
      { x: -1.2, z: 1.2, mat: flowerWhiteMat },
      { x: 2.8, z: 1.8, mat: flowerBlueMat },
    ];
    flowerPositions.forEach((fl) => {
      const fGroup = new THREE.Group();
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 3), flowerStemMat);
      stem.position.y = 0.11;
      fGroup.add(stem);
      const bloom = new THREE.Mesh(new THREE.DodecahedronGeometry(0.065, 0), fl.mat);
      bloom.position.y = 0.24;
      fGroup.add(bloom);
      fGroup.position.set(fl.x, groundBaseY, fl.z);
      surfaceGroup.add(fGroup);
    });

    const cabinGroup = new THREE.Group();
    cabinGroup.position.set(3.2, groundBaseY, -1.2);
    surfaceGroup.add(cabinGroup);

    const logWallMat = new THREE.MeshStandardMaterial({ color: 0x3d2a1d, flatShading: true, roughness: 0.85 });
    const cabinBody = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.2, 2.8), logWallMat);
    cabinBody.position.y = 1.1;
    cabinGroup.add(cabinBody);

    const logEndMat = new THREE.MeshStandardMaterial({ color: 0x2c1d13, flatShading: true });
    for (let cl = 0; cl < 7; cl++) {
      const logCorner = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 3.65, 5), logEndMat);
      logCorner.position.set(0, 0.3 + cl * 0.28, 1.42);
      logCorner.rotation.z = Math.PI / 2;
      cabinGroup.add(logCorner);
    }

    const deckMat = new THREE.MeshStandardMaterial({ color: 0x2e1f15, flatShading: true, roughness: 0.9 });
    const porchDeck = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.18, 1.2), deckMat);
    porchDeck.position.set(0, 0.09, 1.95);
    cabinGroup.add(porchDeck);

    const porchStep = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.1, 0.4), deckMat);
    porchStep.position.set(0.65, 0.05, 2.65);
    cabinGroup.add(porchStep);

    const postMat = new THREE.MeshStandardMaterial({ color: 0x291a11, flatShading: true });
    const postL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.0, 0.12), postMat);
    postL.position.set(-1.5, 1.1, 2.45);
    cabinGroup.add(postL);

    const postR = postL.clone();
    postR.position.x = 1.5;
    cabinGroup.add(postR);

    const porchRoofMat = new THREE.MeshStandardMaterial({ color: 0x222a30, flatShading: true, roughness: 0.72 });
    const porchRoof = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.12, 1.4), porchRoofMat);
    porchRoof.position.set(0, 2.15, 2.0);
    porchRoof.rotation.x = 0.12;
    cabinGroup.add(porchRoof);

    const roofGeom = new THREE.ConeGeometry(2.7, 1.6, 4);
    roofGeom.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeom, porchRoofMat);
    roof.position.y = 2.85;
    roof.scale.set(1.15, 1, 1.35);
    cabinGroup.add(roof);

    const doorMat = new THREE.MeshStandardMaterial({ color: 0x22160f, flatShading: true });
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.85, 1.5, 0.08), doorMat);
    door.position.set(0.65, 0.75, 1.42);
    cabinGroup.add(door);

    const doorHandle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.12, 0.04), satMetalMat);
    doorHandle.position.set(0.35, 0.75, 1.48);
    cabinGroup.add(doorHandle);

    const chimney = new THREE.Mesh(new THREE.BoxGeometry(0.55, 2.0, 0.55), new THREE.MeshStandardMaterial({ color: 0x333940, flatShading: true }));
    chimney.position.set(1.0, 3.1, -0.6);
    cabinGroup.add(chimney);

    const chimneyCap = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.08, 0.65), porchRoofMat);
    chimneyCap.position.set(1.0, 4.15, -0.6);
    cabinGroup.add(chimneyCap);

    const smokePuffs = [];
    const smokeMat = new THREE.MeshStandardMaterial({
      color: 0xe0e6ed,
      transparent: true,
      opacity: 0.45,
      flatShading: true,
    });
    for (let s = 0; s < 5; s++) {
      const smokeCube = new THREE.Mesh(new THREE.DodecahedronGeometry(0.12 + s * 0.09, 0), smokeMat);
      smokeCube.position.set(1.0, 4.3 + s * 0.48, -0.6);
      cabinGroup.add(smokeCube);
      smokePuffs.push({ mesh: smokeCube, baseY: 4.3 + s * 0.48, offset: s * 0.8 });
    }

    const hearthLight = new THREE.PointLight(0xd97757, 3.2, 14);
    hearthLight.position.set(-0.7, 1.25, 1.6);
    cabinGroup.add(hearthLight);

    const windowMeshFront = new THREE.Mesh(
      new THREE.PlaneGeometry(0.8, 0.8),
      new THREE.MeshBasicMaterial({ color: 0xffaf66 })
    );
    windowMeshFront.position.set(-0.7, 1.25, 1.42);
    cabinGroup.add(windowMeshFront);

    const mullionMat = new THREE.MeshStandardMaterial({ color: 0x241710 });
    const hMullion = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.04, 0.02), mullionMat);
    hMullion.position.set(-0.7, 1.25, 1.43);
    cabinGroup.add(hMullion);
    const vMullion = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.82, 0.02), mullionMat);
    vMullion.position.set(-0.7, 1.25, 1.43);
    cabinGroup.add(vMullion);

    const windowMeshSide = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.7),
      new THREE.MeshBasicMaterial({ color: 0xffaf66 })
    );
    windowMeshSide.rotation.y = -Math.PI / 2;
    windowMeshSide.position.set(-1.71, 1.25, 0.2);
    cabinGroup.add(windowMeshSide);

    const woodLogMat = new THREE.MeshStandardMaterial({ color: 0x4a3222, flatShading: true });
    for (let w = 0; w < 10; w++) {
      const woodLog = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.85, 5), woodLogMat);
      woodLog.rotation.x = Math.PI / 2;
      const row = Math.floor(w / 4);
      const col = w % 4;
      woodLog.position.set(1.0 + col * 0.18, 0.15 + row * 0.18, 1.55);
      cabinGroup.add(woodLog);
    }

    const choppingBlock = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.26, 0.45, 6), trunkMat);
    choppingBlock.position.set(1.9, 0.22, 1.6);
    cabinGroup.add(choppingBlock);

    const axeHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.4, 4), trunkMat);
    axeHandle.position.set(1.9, 0.55, 1.6);
    axeHandle.rotation.z = -0.3;
    cabinGroup.add(axeHandle);

    const axeHead = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.03), satMetalMat);
    axeHead.position.set(1.95, 0.45, 1.6);
    cabinGroup.add(axeHead);

    const firepitGroup = new THREE.Group();
    firepitGroup.position.set(0.8, groundBaseY, 0.8);
    surfaceGroup.add(firepitGroup);

    for (let st = 0; st < 10; st++) {
      const angle = (st / 10) * Math.PI * 2;
      const stone = new THREE.Mesh(new THREE.DodecahedronGeometry(0.16 + (st % 3) * 0.04, 0), boulderMat);
      stone.position.set(Math.cos(angle) * 0.58, 0.12, Math.sin(angle) * 0.58);
      firepitGroup.add(stone);
    }

    const emberMat = new THREE.MeshBasicMaterial({ color: 0xff4d1a });
    const embers = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.06, 6), emberMat);
    embers.position.y = 0.05;
    firepitGroup.add(embers);

    const flameMat = new THREE.MeshBasicMaterial({ color: 0xffb84d });
    const flameMesh = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.58, 4), flameMat);
    flameMesh.position.y = 0.35;
    firepitGroup.add(flameMesh);

    const fireLight = new THREE.PointLight(0xff6e26, 2.6, 9);
    fireLight.position.set(0, 0.45, 0);
    firepitGroup.add(fireLight);

    const tripodLegMat = new THREE.MeshStandardMaterial({ color: 0x1f2329, metalness: 0.8 });
    for (let tl = 0; tl < 3; tl++) {
      const tAngle = (tl / 3) * Math.PI * 2;
      const tLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.9, 4), tripodLegMat);
      tLeg.position.set(Math.cos(tAngle) * 0.28, 0.45, Math.sin(tAngle) * 0.28);
      tLeg.rotation.z = Math.cos(tAngle) * 0.35;
      tLeg.rotation.x = Math.sin(tAngle) * 0.35;
      firepitGroup.add(tLeg);
    }
    const kettle = new THREE.Mesh(new THREE.SphereGeometry(0.15, 6, 5), tripodLegMat);
    kettle.position.set(0, 0.48, 0);
    firepitGroup.add(kettle);

    const observerGroup = new THREE.Group();
    observerGroup.position.set(0.0, groundBaseY, 1.6);
    observerGroup.rotation.y = -0.25;
    surfaceGroup.add(observerGroup);

    const humanClothMat = new THREE.MeshStandardMaterial({ color: 0x222a33, flatShading: true });
    const humanScarfMat = new THREE.MeshStandardMaterial({ color: 0xd97757, flatShading: true });
    const bootMat = new THREE.MeshStandardMaterial({ color: 0x181512, flatShading: true });

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.58, 0.28), humanClothMat);
    torso.position.y = 0.72;
    observerGroup.add(torso);

    const scarf = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.12, 0.3), humanScarfMat);
    scarf.position.y = 1.0;
    observerGroup.add(scarf);

    const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.17, 0), humanClothMat);
    head.position.set(0, 1.18, -0.06);
    head.rotation.x = -0.38;
    observerGroup.add(head);

    const legs = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.36, 0.48), humanClothMat);
    legs.position.set(0, 0.36, 0.18);
    observerGroup.add(legs);

    const bootL = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.24), bootMat);
    bootL.position.set(-0.1, 0.07, 0.38);
    observerGroup.add(bootL);
    const bootR = bootL.clone();
    bootR.position.x = 0.1;
    observerGroup.add(bootR);

    const mugMat = new THREE.MeshStandardMaterial({ color: 0xdde6ed, metalness: 0.6, roughness: 0.3 });
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.1, 6), mugMat);
    mug.position.set(0.18, 0.55, 0.26);
    observerGroup.add(mug);

    const benchLog = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.8, 5), trunkMat);
    benchLog.rotation.z = Math.PI / 2;
    benchLog.position.set(0, 0.22, 0);
    observerGroup.add(benchLog);

    const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.22, 6), trunkMat);
    stump.position.set(-0.65, 0.11, 0.25);
    observerGroup.add(stump);

    const lanternMat = new THREE.MeshStandardMaterial({ color: 0x1f2329 });
    const lantern = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.28, 5), lanternMat);
    lantern.position.set(-0.65, 0.28, 0.25);
    observerGroup.add(lantern);

    const lanternLight = new THREE.PointLight(0xe88a53, 0.95, 4);
    lanternLight.position.set(-0.65, 0.38, 0.25);
    observerGroup.add(lanternLight);

    const weatherStationGroup = new THREE.Group();
    weatherStationGroup.position.set(4.3, groundBaseY, 1.4);
    surfaceGroup.add(weatherStationGroup);

    for (let l = 0; l < 3; l++) {
      const angle = (l / 3) * Math.PI * 2;
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 4), satMetalMat);
      leg.position.set(Math.cos(angle) * 0.35, 0.55, Math.sin(angle) * 0.35);
      leg.rotation.z = Math.cos(angle) * 0.3;
      leg.rotation.x = Math.sin(angle) * 0.3;
      weatherStationGroup.add(leg);
    }

    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 2.2, 5), satMetalMat);
    mast.position.y = 1.6;
    weatherStationGroup.add(mast);

    const sensorBoxMat = new THREE.MeshStandardMaterial({ color: 0xedf2f7, flatShading: true, roughness: 0.4 });
    const sensorBox = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.38, 0.3), sensorBoxMat);
    sensorBox.position.set(0, 1.3, 0);
    weatherStationGroup.add(sensorBox);

    const sensorRoof = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.12, 4), porchRoofMat);
    sensorRoof.rotation.y = Math.PI / 4;
    sensorRoof.position.set(0, 1.55, 0);
    weatherStationGroup.add(sensorRoof);

    const rainGauge = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.05, 0.2, 6), satMetalMat);
    rainGauge.position.set(-0.28, 1.55, 0);
    weatherStationGroup.add(rainGauge);

    const miniSolar = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.03, 0.3), solarCellMat);
    miniSolar.position.set(0.28, 1.85, 0);
    miniSolar.rotation.z = -0.4;
    weatherStationGroup.add(miniSolar);

    const anemometerGroup = new THREE.Group();
    anemometerGroup.position.set(0, 2.75, 0);
    for (let c = 0; c < 3; c++) {
      const cupAngle = (c / 3) * Math.PI * 2;
      const cupArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.02), satMetalMat);
      cupArm.position.set(Math.cos(cupAngle) * 0.12, 0, Math.sin(cupAngle) * 0.12);
      cupArm.rotation.y = -cupAngle;
      anemometerGroup.add(cupArm);

      const cup = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.08, 4), new THREE.MeshBasicMaterial({ color: 0xd97757 }));
      cup.position.set(Math.cos(cupAngle) * 0.24, 0, Math.sin(cupAngle) * 0.24);
      cup.rotation.z = Math.PI / 2;
      anemometerGroup.add(cup);
    }
    weatherStationGroup.add(anemometerGroup);

    const fenceMat = new THREE.MeshStandardMaterial({ color: 0x36251b, flatShading: true });
    for (let f = 0; f < 5; f++) {
      const fPost = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.1, 5), fenceMat);
      fPost.position.set(3.5 + f * 0.8, groundBaseY + 0.55, 2.8 - f * 0.6);
      surfaceGroup.add(fPost);

      if (f < 4) {
        const railTop = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.06, 0.08), fenceMat);
        railTop.position.set(3.9 + f * 0.8, groundBaseY + 0.85, 2.5 - f * 0.6);
        railTop.rotation.y = -0.65;
        surfaceGroup.add(railTop);

        const railBot = railTop.clone();
        railBot.position.y = groundBaseY + 0.45;
        surfaceGroup.add(railBot);
      }
    }

    const cabinTreePositions = [
      { x: 1.0, z: -3.8, s: 1.35, spec: 0 },
      { x: 5.8, z: -2.8, s: 1.45, spec: 1 },
      { x: 6.2, z: 0.8, s: 1.25, spec: 2 },
      { x: -3.8, z: -1.5, s: 1.20, spec: 0 },
      { x: -4.5, z: 2.2, s: 1.15, spec: 1 },
    ];
    cabinTreePositions.forEach((tp) => {
      let tree;
      if (tp.spec === 0) tree = createDouglasFir();
      else if (tp.spec === 1) tree = createMountainPine();
      else tree = createAlpineSpruce();

      tree.scale.set(tp.s, tp.s, tp.s);
      tree.position.set(tp.x, groundBaseY, tp.z);
      tree.rotation.y = Math.random() * Math.PI * 2;
      surfaceGroup.add(tree);
    });

    // =========================================================================
    // 7. GLOBAL STARFIELD & PIXEL SHARDS
    // =========================================================================
    const starCount = 850;
    const starGeom = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    for (let sp = 0; sp < starCount; sp++) {
      starPos[sp * 3] = (Math.random() - 0.5) * 60;
      starPos[sp * 3 + 1] = -Math.random() * 95;
      starPos[sp * 3 + 2] = (Math.random() - 0.5) * 45;
    }
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xd97757,
      size: 0.11,
      transparent: true,
      opacity: 0.65,
    });
    const starSystem = new THREE.Points(starGeom, starMat);
    scene.add(starSystem);

    // =========================================================================
    // 8. DYNAMIC SCENE BACKGROUNDS — 4 distinct atmospheric environments
    // =========================================================================

    // ── Master Sky Dome (follows camera, single colour animated per scroll) ──
    const skyDome = new THREE.Mesh(
      new THREE.SphereGeometry(55, 24, 12),
      new THREE.MeshBasicMaterial({
        color: 0x020a16,
        side: THREE.BackSide,
        depthWrite: false,
        fog: false,
      })
    );
    skyDome.renderOrder = -100;
    scene.add(skyDome);

    // Stage sky-dome key colours (will lerp between these)
    const SKY_COLORS = [
      new THREE.Color(0x020a16), // Stage 1 – deep space
      new THREE.Color(0x08172e), // Stage 2 – upper atmosphere
      new THREE.Color(0x071410), // Stage 3 – forest canopy
      new THREE.Color(0x160b08), // Stage 4 – warm twilight surface
    ];
    const SKY_FOG = [
      new THREE.Color(0x090d14), // space fog
      new THREE.Color(0x0c1e38), // stratos fog
      new THREE.Color(0x0a1812), // canopy fog
      new THREE.Color(0x1a0e0a), // surface fog
    ];
    const tmpSkyColor = new THREE.Color();
    const tmpFogColor = new THREE.Color();

    // Helper: Lerp a colour across the 4 stops based on 0-1 scroll
    const lerpStageColor = (colors, scroll) => {
      const t = scroll * 3;                // 0-3 range across 4 stages
      const lo = Math.min(2, Math.floor(t));
      const hi = lo + 1;
      const f  = t - lo;
      return new THREE.Color().lerpColors(colors[lo], colors[hi], f);
    };

    // ─────────────────────────────────────────────────────────────────────────
    // A. STAGE 1 BACKGROUND — Deep Space (orbitGroup y=0)
    // ─────────────────────────────────────────────────────────────────────────
    const spaceBgGroup = new THREE.Group();
    orbitGroup.add(spaceBgGroup); // attached to orbitGroup so it rotates with earth slightly

    // Milky Way arc — 4000 tiny blue-white particles in a curved belt
    const mwCount = 4000;
    const mwPos = new Float32Array(mwCount * 3);
    for (let m = 0; m < mwCount; m++) {
      const angle = (m / mwCount) * Math.PI * 2;
      const arc   = (m / mwCount) * Math.PI;  // semicircle band
      const bend  = 0.22;
      const spread = 5.5 + Math.random() * 4.0;
      mwPos[m * 3]     = Math.cos(arc) * spread * 8 + (Math.random() - 0.5) * 6;
      mwPos[m * 3 + 1] = Math.sin(arc) * bend  * spread + (Math.random() - 0.5) * 3;
      mwPos[m * 3 + 2] = (Math.random() - 0.5) * 28 - 12;
    }
    const mwGeom = new THREE.BufferGeometry();
    mwGeom.setAttribute('position', new THREE.BufferAttribute(mwPos, 3));
    const mwMat = new THREE.PointsMaterial({
      color: 0x8ab4d8,
      size: 0.08,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    spaceBgGroup.add(new THREE.Points(mwGeom, mwMat));

    // 3 Nebula cloud blobs — large transparent geo spheres with additive blending
    const nebulaDefs = [
      { pos: [-18, 6, -30], r: 9, color: 0x1a3a66, opacity: 0.08 },  // cool blue
      { pos: [22, -4, -35], r: 7, color: 0x2a1448, opacity: 0.07 },  // deep violet
      { pos: [6, 12, -40],  r: 11, color: 0x0e2a44, opacity: 0.06 }, // navy
    ];
    nebulaDefs.forEach((nb) => {
      const nebMesh = new THREE.Mesh(
        new THREE.IcosahedronGeometry(nb.r, 2),
        new THREE.MeshBasicMaterial({
          color: nb.color,
          transparent: true,
          opacity: nb.opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
        })
      );
      nebMesh.position.set(...nb.pos);
      spaceBgGroup.add(nebMesh);

      // Outer softer shell
      const outerNeb = nebMesh.clone();
      outerNeb.scale.set(1.6, 1.6, 1.6);
      outerNeb.material = nebMesh.material.clone();
      outerNeb.material.opacity = nb.opacity * 0.4;
      spaceBgGroup.add(outerNeb);
    });

    // ─────────────────────────────────────────────────────────────────────────
    // B. STAGE 2 BACKGROUND — Stratospheric Sky (stratosphereGroup y=-29.8)
    // ─────────────────────────────────────────────────────────────────────────
    const stratoBgGroup = new THREE.Group();
    stratosphereGroup.add(stratoBgGroup);

    // Better Sun: flat glowing disc + concentric torus ring halos
    // Moved much closer and larger so it reads well in the geometric style
    const SUN_POS = new THREE.Vector3(14, 5, -28);

    // Bright core disc (CircleGeometry = clean flat circle, always facing camera via lookAt in animate)
    const sunDisc = new THREE.Mesh(
      new THREE.CircleGeometry(1.8, 7),  // 7 sides = low-poly heptagonal sun
      new THREE.MeshBasicMaterial({
        color: 0xfff8e0,
        transparent: true,
        opacity: 1.0,
        depthWrite: false,
        fog: false,
        side: THREE.DoubleSide,
      })
    );
    sunDisc.position.copy(SUN_POS);
    stratoBgGroup.add(sunDisc);

    // Inner warm glow disc
    const sunGlowDisc = new THREE.Mesh(
      new THREE.CircleGeometry(3.2, 7),
      new THREE.MeshBasicMaterial({
        color: 0xffe060,
        transparent: true,
        opacity: 0.28,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
        side: THREE.DoubleSide,
      })
    );
    sunGlowDisc.position.copy(SUN_POS);
    stratoBgGroup.add(sunGlowDisc);

    // Torus ring halos — distinct, clean geometric rings
    const torusHaloDefs = [
      { r: 2.8,  tube: 0.08, segments: 6,  opacity: 0.35, color: 0xffe880 },
      { r: 4.2,  tube: 0.05, segments: 7,  opacity: 0.18, color: 0xffcc40 },
      { r: 6.4,  tube: 0.04, segments: 8,  opacity: 0.09, color: 0xffaa20 },
      { r: 9.8,  tube: 0.03, segments: 8,  opacity: 0.04, color: 0xff9000 },
    ];
    const sunHaloMeshes = [];
    torusHaloDefs.forEach(({ r, tube, segments, opacity, color }) => {
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(r, tube, 3, segments * 2),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
          side: THREE.DoubleSide,
        })
      );
      halo.position.copy(SUN_POS);
      stratoBgGroup.add(halo);
      sunHaloMeshes.push(halo);
    });

    // Atmospheric horizon haze — wide nearly-flat plane
    const hazeGeom = new THREE.PlaneGeometry(120, 18, 1, 1);
    const hazeMat = new THREE.MeshBasicMaterial({
      color: 0x1a4a8a,
      transparent: true,
      opacity: 0.18,
      depthWrite: false,
      fog: false,
      side: THREE.DoubleSide,
    });
    const hazePlane = new THREE.Mesh(hazeGeom, hazeMat);
    hazePlane.rotation.x = -Math.PI / 2;
    hazePlane.position.set(0, -7, -20);
    stratoBgGroup.add(hazePlane);

    // Upper atmosphere gradient band (near top of view)
    const atmBandMat = new THREE.MeshBasicMaterial({
      color: 0x0a2048,
      transparent: true,
      opacity: 0.30,
      depthWrite: false,
      fog: false,
      side: THREE.DoubleSide,
    });
    const atmBand = new THREE.Mesh(new THREE.PlaneGeometry(120, 12), atmBandMat);
    atmBand.position.set(0, 10, -30);
    atmBand.rotation.x = -0.25;
    stratoBgGroup.add(atmBand);

    // ─────────────────────────────────────────────────────────────────────────
    // C. STAGE 3 BACKGROUND — Forest Canopy (canopyGroup y=-61.4)
    // ─────────────────────────────────────────────────────────────────────────
    const canopyBgGroup = new THREE.Group();
    canopyGroup.add(canopyBgGroup);

    // Volumetric God Rays — tapered triangle geometry (wide at top, narrows to point at bottom)
    // This mimics actual light shaft behaviour far better than flat rectangles
    const godRayBaseOpacities = [0.030, 0.045, 0.038, 0.025, 0.032, 0.022];
    const godRayDefs = [
      { x: -10, z: -22, angle: -0.22, topW: 4.5, h: 34, opacity: godRayBaseOpacities[0], color: 0xc8d878 },
      { x:  -3, z: -20, angle: -0.10, topW: 5.5, h: 38, opacity: godRayBaseOpacities[1], color: 0xe8c858 },
      { x:   4, z: -19, angle:  0.06, topW: 6.0, h: 40, opacity: godRayBaseOpacities[2], color: 0xd8b848 },
      { x:  10, z: -21, angle:  0.18, topW: 4.0, h: 33, opacity: godRayBaseOpacities[3], color: 0xb8cc68 },
      { x:  16, z: -24, angle:  0.30, topW: 4.8, h: 36, opacity: godRayBaseOpacities[4], color: 0xd0b850 },
      { x: -17, z: -25, angle: -0.36, topW: 3.8, h: 32, opacity: godRayBaseOpacities[5], color: 0xa8b848 },
    ];
    godRayDefs.forEach(({ x, z, angle, topW, h, opacity, color }, i) => {
      // Build a tapered triangle: 3 verts — top-left, top-right, bottom-center point
      const halfW = topW * 0.5;
      const verts = new Float32Array([
        -halfW,  h * 0.5, 0,   // top-left
         halfW,  h * 0.5, 0,   // top-right
         0,     -h * 0.5, 0,   // bottom point
      ]);
      const rayGeom = new THREE.BufferGeometry();
      rayGeom.setAttribute('position', new THREE.BufferAttribute(verts, 3));
      rayGeom.computeVertexNormals();
      const ray = new THREE.Mesh(
        rayGeom,
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          fog: false,
          side: THREE.DoubleSide,
        })
      );
      ray.position.set(x, 12, z);
      ray.rotation.set(-0.04, 0, angle);
      canopyBgGroup.add(ray);
    });

    // Ground mist plane — low translucent layer
    const mistMat = new THREE.MeshBasicMaterial({
      color: 0x8ab8a0,
      transparent: true,
      opacity: 0.10,
      depthWrite: false,
      fog: false,
      side: THREE.DoubleSide,
    });
    const mistPlane = new THREE.Mesh(new THREE.PlaneGeometry(80, 20), mistMat);
    mistPlane.rotation.x = -Math.PI / 2;
    mistPlane.position.set(0, -3.5, -10);
    canopyBgGroup.add(mistPlane);

    // Canopy upper sky tint
    const canopySkyMat = new THREE.MeshBasicMaterial({
      color: 0x0e2a18,
      transparent: true,
      opacity: 0.40,
      depthWrite: false,
      fog: false,
      side: THREE.DoubleSide,
    });
    const canopySkyPlane = new THREE.Mesh(new THREE.PlaneGeometry(100, 20), canopySkyMat);
    canopySkyPlane.position.set(0, 16, -25);
    canopySkyPlane.rotation.x = -0.2;
    canopyBgGroup.add(canopySkyPlane);

    // ─────────────────────────────────────────────────────────────────────────
    // D. STAGE 4 BACKGROUND — Warm Twilight Surface (surfaceGroup y=-85)
    // ─────────────────────────────────────────────────────────────────────────
    const surfaceBgGroup = new THREE.Group();
    surfaceGroup.add(surfaceBgGroup);

    // Warm ember horizon glow — low wide plane
    const emberHorizonMat = new THREE.MeshBasicMaterial({
      color: 0xd04412,
      transparent: true,
      opacity: 0.14,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      fog: false,
      side: THREE.DoubleSide,
    });
    const emberPlane = new THREE.Mesh(new THREE.PlaneGeometry(80, 10), emberHorizonMat);
    emberPlane.position.set(0, 1.5, -18);
    emberPlane.rotation.x = -0.15;
    surfaceBgGroup.add(emberPlane);

    // Soft amber upper-sky glow
    const amberSkyMat = new THREE.MeshBasicMaterial({
      color: 0x7a2808,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
      fog: false,
      side: THREE.DoubleSide,
    });
    const amberSkyPlane = new THREE.Mesh(new THREE.PlaneGeometry(100, 22), amberSkyMat);
    amberSkyPlane.position.set(0, 12, -25);
    amberSkyPlane.rotation.x = -0.12;
    surfaceBgGroup.add(amberSkyPlane);

    // Dusk star field near surface (brighter, fewer)
    const duskStarCount = 180;
    const duskStarPos = new Float32Array(duskStarCount * 3);
    for (let ds = 0; ds < duskStarCount; ds++) {
      duskStarPos[ds * 3]     = (Math.random() - 0.5) * 50;
      duskStarPos[ds * 3 + 1] = 6 + Math.random() * 20;
      duskStarPos[ds * 3 + 2] = -10 - Math.random() * 30;
    }
    const duskStarGeom = new THREE.BufferGeometry();
    duskStarGeom.setAttribute('position', new THREE.BufferAttribute(duskStarPos, 3));
    const duskStarMat = new THREE.PointsMaterial({
      color: 0xffe8c0,
      size: 0.09,
      transparent: true,
      opacity: 0.70,
      depthWrite: false,
    });
    surfaceBgGroup.add(new THREE.Points(duskStarGeom, duskStarMat));

    // Mountain silhouette ridgeline behind the surface scene
    const ridgeDefs = [
      { x: -22, w: 14, h: 8, seg: 5 },
      { x: -8,  w: 18, h: 11, seg: 6 },
      { x:  8,  w: 16, h: 9, seg: 5 },
      { x: 22,  w: 13, h: 7, seg: 4 },
    ];
    const ridgeMat = new THREE.MeshBasicMaterial({ color: 0x0a0604, fog: false });
    ridgeDefs.forEach(({ x, w, h, seg }) => {
      const ridge = new THREE.Mesh(new THREE.ConeGeometry(w * 0.5, h, seg), ridgeMat);
      ridge.position.set(x, h * 0.45 - 1.5, -22);
      ridge.rotation.y = Math.random();
      surfaceBgGroup.add(ridge);
    });
    // =========================================================================
    let mouseX = 0;
    let mouseY = 0;
    let targetCameraX = 0;
    let targetCameraY = 0;
    let targetCameraZ = 11;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / width - 0.5) * 2;
      mouseY = (e.clientY / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Smoothed scroll for backgrounds — damped lerp avoids harsh jumps
    let bgSmoothed = 0;

    // Per-stage Y positions (world) — used for camera proximity fade
    const STAGE_Y  = [0, -29.8, -61.4, -85.0];
    // Base opacities for each stage's bg children (we'll scale these)
    // Each bg group tracks its own visibility weight

    let animationFrameId;
    const startTime = performance.now();

    // Helper: compute smooth visibility weight for a stage given camera Y
    const stageWeight = (stageY, camY, range = 18) => {
      const dist = Math.abs(camY - stageY);
      return Math.max(0, 1 - dist / range);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;
      const scroll = scrollRef.current;

      // 0a. Smooth the scroll for background colour (damps rapid jumps)
      bgSmoothed += (scroll - bgSmoothed) * 0.032;

      // 0b. Sky dome follows camera, colour lerps smoothly
      skyDome.position.copy(camera.position);
      skyDome.material.color.copy(lerpStageColor(SKY_COLORS, bgSmoothed));
      scene.fog.color.copy(lerpStageColor(SKY_FOG, bgSmoothed));

      // 0c. Sun + halos always face the camera (billboard)
      sunDisc.lookAt(camera.position);
      sunGlowDisc.lookAt(camera.position);
      sunHaloMeshes.forEach((h) => h.lookAt(camera.position));

      // 0d. Per-stage bg group opacity fading (smooth in/out by camera distance)
      // Range 30 = generous fade zone since camera Y lerps slowly (8% per frame)
      const camY = camera.position.y;

      // Space bg (attached to orbitGroup which is offset, use absolute Y)
      const spaceVis  = stageWeight(STAGE_Y[0], camY, 30);
      spaceBgGroup.children.forEach((c) => {
        if (c.material) c.material.opacity = (c.userData.baseOpacity ?? c.material.opacity) * spaceVis;
      });

      const stratoVis = stageWeight(STAGE_Y[1], camY, 30);
      stratoBgGroup.children.forEach((c) => {
        if (c.material) {
          if (!c.userData.baseOpacity) c.userData.baseOpacity = c.material.opacity ?? 1;
          c.material.opacity = c.userData.baseOpacity * stratoVis;
        }
      });

      const canopyVis = stageWeight(STAGE_Y[2], camY, 30);
      canopyBgGroup.children.forEach((c, i) => {
        if (c.material) {
          if (!c.userData.baseOpacity) c.userData.baseOpacity = c.material.opacity ?? 1;
          // God rays additionally breathe
          const breathe = (i < godRayDefs.length)
            ? (0.82 + Math.sin(elapsedTime * 0.55 + i * 0.95) * 0.18)
            : 1;
          c.material.opacity = c.userData.baseOpacity * canopyVis * breathe;
        }
      });

      const surfaceVis = stageWeight(STAGE_Y[3], camY, 30);
      surfaceBgGroup.children.forEach((c) => {
        if (c.material) {
          if (!c.userData.baseOpacity) c.userData.baseOpacity = c.material.opacity ?? 1;
          c.material.opacity = c.userData.baseOpacity * surfaceVis;
        }
      });

      // Ember glow pulses with campfire rhythm
      if (emberPlane.material) {
        const baseEmber = emberPlane.userData.baseOpacity ?? 0.14;
        emberPlane.material.opacity = baseEmber * surfaceVis
          * (0.88 + Math.sin(elapsedTime * 2.2) * 0.12);
      }

      // 1. Stage 1: Earth rotation, dynamic clouds & satellite orbits
      orbitGroup.rotation.y = -0.55 + elapsedTime * 0.035 + mouseX * 0.10;
      orbitGroup.rotation.x = 0.12 + mouseY * 0.06;
      earthCloudsGroup.rotation.y = elapsedTime * 0.055;
      if (cycloneGroup) cycloneGroup.rotation.z = elapsedTime * 0.22;

      asteroids.forEach((ast) => {
        ast.mesh.rotation.x += ast.rotSpeedX;
        ast.mesh.rotation.y += ast.rotSpeedY;
      });

      // Primary Flagship Satellite in Open Upper-Right Sky (Never behind text!)
      const satT = elapsedTime * 0.20 + 0.5;
      flagshipSatellite.position.set(
        Math.cos(satT) * 1.2 + 0.2,
        1.3 + Math.sin(satT * 1.2) * 0.4,
        2.8 + Math.sin(satT) * 0.8
      );
      flagshipSatellite.lookAt(0, -0.3, 0); // Point nadir instruments toward Earth
      flagshipSatellite.rotation.z += Math.sin(elapsedTime * 0.6) * 0.05;

      // Secondary Micro-Satellite Polar Orbit on Right Limb of Earth
      const microAngle = elapsedTime * 0.38 + 1.2;
      microSatellite.position.set(
        1.2 + Math.sin(microAngle) * 0.8,
        Math.cos(microAngle) * 4.3,
        1.6 + Math.sin(microAngle * 1.4) * 1.2
      );
      microSatellite.rotation.x = microAngle;
      microSatellite.rotation.z = elapsedTime * 0.4;

      // 2. Stage 2: Cinematic Peregrine Falcon Flapping Kinematics
      birds.forEach((bird) => {
        if (bird.isStooper) {
          // High-speed stoop: wings locked back in delta chevron, micro-flutter only
          const jitter = Math.sin(elapsedTime * 16.0 + bird.phase) * 0.018;
          const sway  = Math.sin(elapsedTime * 2.8 + bird.phase) * 0.014;
          bird.bodyPivot.rotation.x = 0.52 + jitter;
          bird.bodyPivot.rotation.z = sway;
          bird.tailPivot.rotation.x = 0.34 + jitter * 0.35;
          // Stooper does a slow lazy spiral-glide in XZ
          const sA = elapsedTime * 0.28 + bird.orbitPhase;
          bird.bird.position.x = bird.baseX + Math.cos(sA) * 0.28;
          bird.bird.position.y = bird.baseY + Math.sin(elapsedTime * 1.6 + bird.phase) * 0.12;
          bird.bird.position.z = bird.baseZ + Math.sin(sA) * 0.14;
          bird.bird.rotation.y = 0.56 + Math.sin(sA) * 0.15;
        } else {
          // Full organic 2-bone flap with dihedral, cupping, body-bob & tail trim
          const flapCycle = elapsedTime * bird.flapSpeed + bird.phase;
          const stroke    = Math.sin(flapCycle) * 0.32;          // Powerful downstroke amplitude
          const dihedral  = 0.16;                                  // Natural V-shape soaring angle
          const primLag   = 0.42;                                  // Outer primary phase delay
          const wingCup   = Math.max(0, Math.cos(flapCycle)) * 0.13; // Cup only on downstroke

          // ── RIGHT wing ──
          bird.rightInner.rotation.z = dihedral + stroke;
          bird.rightOuter.rotation.z = (dihedral * 0.55) + Math.sin(flapCycle - primLag) * 0.40;
          bird.rightInner.rotation.y = -wingCup * 0.6;
          bird.rightInner.rotation.x =  Math.sin(flapCycle * 0.5) * 0.06; // gentle sweep

          // ── LEFT wing (mirror) ──
          bird.leftInner.rotation.z  = -dihedral - stroke;
          bird.leftOuter.rotation.z  = -(dihedral * 0.55) - Math.sin(flapCycle - primLag) * 0.40;
          bird.leftInner.rotation.y  = wingCup * 0.6;
          bird.leftInner.rotation.x  = -Math.sin(flapCycle * 0.5) * 0.06;

          // ── Body pitch & bob ──
          bird.bodyPivot.position.y  = Math.sin(flapCycle) * 0.05;
          bird.bodyPivot.rotation.x  = bird.baseBankX + Math.sin(flapCycle) * 0.045;
          bird.bodyPivot.rotation.z  = Math.cos(flapCycle * 0.6) * 0.025;

          // ── Tail elevator & rudder trim ──
          bird.tailPivot.rotation.x  = -Math.sin(flapCycle) * 0.10;
          bird.tailPivot.rotation.z  = Math.cos(flapCycle * 0.45) * 0.05;

          // ── Slow elliptical drift orbit (each bird unique) ──
          const oA = elapsedTime * bird.orbitSpd + bird.orbitPhase;
          bird.bird.position.x = bird.baseX + Math.cos(oA) * bird.orbitR;
          bird.bird.position.y = bird.baseY + Math.sin(oA * 1.3) * bird.orbitR * 0.55;
          bird.bird.position.z = bird.baseZ + Math.sin(oA * 0.7) * bird.orbitR * 0.45;

          // ── Gentle banking yaw follows drift ──
          bird.bird.rotation.z = bird.baseBankZ + Math.sin(oA) * 0.08;
        }
      });


      // 3. Stage 3: Bioluminescent spores drift & stag subtle movement
      if (sporeMesh) {
        sporeMesh.rotation.y = elapsedTime * 0.035;
      }
      stagGroup.rotation.y = -0.55 + Math.sin(elapsedTime * 0.8) * 0.04;

      // 4. Stage 4: Cabin chimney smoke, hearth & campfire flicker, anemometer spin
      smokePuffs.forEach((puff) => {
        puff.mesh.position.y = puff.baseY + ((elapsedTime * 0.45 + puff.offset) % 1.8);
        puff.mesh.position.x = 1.0 + Math.sin(elapsedTime * 1.5 + puff.offset) * 0.12;
      });

      hearthLight.intensity = 2.8 + Math.sin(elapsedTime * 7.5) * 0.4 + Math.cos(elapsedTime * 11) * 0.25;
      fireLight.intensity = 2.4 + Math.sin(elapsedTime * 9.0) * 0.5 + Math.cos(elapsedTime * 13) * 0.3;
      flameMesh.scale.y = 0.9 + Math.sin(elapsedTime * 8.0) * 0.2;
      lanternLight.intensity = 0.9 + Math.sin(elapsedTime * 6.0) * 0.15;

      // Spinning anemometer wind cups
      anemometerGroup.rotation.y = elapsedTime * 4.5;

      // 5. Scroll Camera Trajectory:
      // Exactly calibrated: 0 -> Orbit (Y=0), 0.35 -> Stratosphere (Y=-29.8), 0.72 -> Canopy (Y=-61.4), 1.0 -> Surface (Y=-85.0)
      targetCameraY = -scroll * 85;

      if (scroll < 0.25) {
        targetCameraZ = 11.0;
        targetCameraX = mouseX * 0.6;
      } else if (scroll < 0.52) {
        targetCameraZ = 8.6;
        targetCameraX = mouseX * 0.7;
      } else if (scroll < 0.82) {
        targetCameraZ = 8.2;
        targetCameraX = mouseX * 0.6;
      } else {
        targetCameraZ = 7.6;
        targetCameraX = 0.2 + mouseX * 0.5;
      }

      camera.position.x += (targetCameraX - camera.position.x) * 0.055;
      camera.position.y += (targetCameraY - camera.position.y) * 0.08;
      camera.position.z += (targetCameraZ - camera.position.z) * 0.055;
      camera.lookAt(targetCameraX * 0.2, camera.position.y - 0.12, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="three-canvas-container"
      aria-hidden="true"
    />
  );
};

export default ThreeGeometricWorld;
