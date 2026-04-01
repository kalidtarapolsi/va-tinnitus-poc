// VA Duty MOS Noise Exposure Listing
// Source: VA Fast Letter 10-35 (September 2010)
// Used to determine conceded in-service noise exposure for hearing/tinnitus claims

export type NoiseExposureLevel = 'Highly Probable' | 'Moderate' | 'Low';

export interface MOSEntry {
  code: string;
  title: string;
  branch: 'Army' | 'Navy' | 'Marine Corps' | 'Air Force' | 'Coast Guard';
  noiseExposure: NoiseExposureLevel;
}

export const mosNoiseExposureList: MOSEntry[] = [
  // ============ ARMY - HIGHLY PROBABLE ============
  { code: '11B', title: 'Infantryman', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '11C', title: 'Indirect Fire Infantryman', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '11M', title: 'Fighting Vehicle Infantryman', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '12B', title: 'Combat Engineer', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '12C', title: 'Bridge Crewmember', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '13B', title: 'Cannon Crewmember', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '13D', title: 'Field Artillery Automated Tactical Data Systems Specialist', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '13E', title: 'Cannon Fire Direction Specialist', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '13F', title: 'Fire Support Specialist', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '14E', title: 'Patriot Fire Control Enhanced Operator/Maintainer', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '14S', title: 'Air and Missile Defense Crewmember', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '15T', title: 'UH-60 Helicopter Repairer', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '15U', title: 'CH-47 Helicopter Repairer', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '19D', title: 'Cavalry Scout', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '19K', title: 'M1 Armor Crewman', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '21B', title: 'Combat Engineer (Legacy)', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '63B', title: 'Light Wheel Vehicle Mechanic', branch: 'Army', noiseExposure: 'Highly Probable' },
  { code: '91B', title: 'Wheeled Vehicle Mechanic', branch: 'Army', noiseExposure: 'Highly Probable' },

  // ============ ARMY - MODERATE ============
  { code: '25B', title: 'Information Technology Specialist', branch: 'Army', noiseExposure: 'Moderate' },
  { code: '31B', title: 'Military Police', branch: 'Army', noiseExposure: 'Moderate' },
  { code: '35M', title: 'Human Intelligence Collector', branch: 'Army', noiseExposure: 'Moderate' },
  { code: '42A', title: 'Human Resources Specialist', branch: 'Army', noiseExposure: 'Moderate' },
  { code: '68W', title: 'Combat Medic Specialist', branch: 'Army', noiseExposure: 'Moderate' },
  { code: '74D', title: 'Chemical Operations Specialist', branch: 'Army', noiseExposure: 'Moderate' },
  { code: '88M', title: 'Motor Transport Operator', branch: 'Army', noiseExposure: 'Moderate' },
  { code: '92A', title: 'Automated Logistical Specialist', branch: 'Army', noiseExposure: 'Moderate' },

  // ============ ARMY - LOW ============
  { code: '27D', title: 'Paralegal Specialist', branch: 'Army', noiseExposure: 'Low' },
  { code: '36B', title: 'Financial Management Technician', branch: 'Army', noiseExposure: 'Low' },
  { code: '46Q', title: 'Public Affairs Specialist', branch: 'Army', noiseExposure: 'Low' },
  { code: '56M', title: 'Religious Affairs Specialist', branch: 'Army', noiseExposure: 'Low' },
  { code: '71L', title: 'Administrative Specialist', branch: 'Army', noiseExposure: 'Low' },

  // ============ MARINE CORPS - HIGHLY PROBABLE ============
  { code: '0311', title: 'Rifleman', branch: 'Marine Corps', noiseExposure: 'Highly Probable' },
  { code: '0331', title: 'Machine Gunner', branch: 'Marine Corps', noiseExposure: 'Highly Probable' },
  { code: '0341', title: 'Mortarman', branch: 'Marine Corps', noiseExposure: 'Highly Probable' },
  { code: '0351', title: 'Infantry Assaultman', branch: 'Marine Corps', noiseExposure: 'Highly Probable' },
  { code: '0811', title: 'Field Artillery Cannoneer', branch: 'Marine Corps', noiseExposure: 'Highly Probable' },
  { code: '0844', title: 'Fire Support Man', branch: 'Marine Corps', noiseExposure: 'Highly Probable' },
  { code: '1371', title: 'Combat Engineer', branch: 'Marine Corps', noiseExposure: 'Highly Probable' },
  { code: '1812', title: 'M1A1 Tank Crewman', branch: 'Marine Corps', noiseExposure: 'Highly Probable' },
  { code: '6114', title: 'UH-1 Helicopter Mechanic', branch: 'Marine Corps', noiseExposure: 'Highly Probable' },
  { code: '6153', title: 'Helicopter Power Plants Mechanic', branch: 'Marine Corps', noiseExposure: 'Highly Probable' },

  // ============ MARINE CORPS - MODERATE ============
  { code: '0111', title: 'Administrative Specialist', branch: 'Marine Corps', noiseExposure: 'Moderate' },
  { code: '0231', title: 'Intelligence Specialist', branch: 'Marine Corps', noiseExposure: 'Moderate' },
  { code: '0621', title: 'Field Radio Operator', branch: 'Marine Corps', noiseExposure: 'Moderate' },
  { code: '3043', title: 'Supply Chain Specialist', branch: 'Marine Corps', noiseExposure: 'Moderate' },

  // ============ NAVY - HIGHLY PROBABLE ============
  { code: 'GM', title: "Gunner's Mate", branch: 'Navy', noiseExposure: 'Highly Probable' },
  { code: 'ABE', title: 'Aviation Boatswain\'s Mate - Equipment', branch: 'Navy', noiseExposure: 'Highly Probable' },
  { code: 'ABF', title: 'Aviation Boatswain\'s Mate - Fuels', branch: 'Navy', noiseExposure: 'Highly Probable' },
  { code: 'ABH', title: 'Aviation Boatswain\'s Mate - Handling', branch: 'Navy', noiseExposure: 'Highly Probable' },
  { code: 'AO', title: 'Aviation Ordnanceman', branch: 'Navy', noiseExposure: 'Highly Probable' },
  { code: 'BM', title: 'Boatswain\'s Mate', branch: 'Navy', noiseExposure: 'Highly Probable' },
  { code: 'EN', title: 'Engineman', branch: 'Navy', noiseExposure: 'Highly Probable' },
  { code: 'FC', title: 'Fire Controlman', branch: 'Navy', noiseExposure: 'Highly Probable' },
  { code: 'MN', title: 'Mineman', branch: 'Navy', noiseExposure: 'Highly Probable' },
  { code: 'MM', title: "Machinist's Mate", branch: 'Navy', noiseExposure: 'Highly Probable' },

  // ============ NAVY - MODERATE ============
  { code: 'HM', title: 'Hospital Corpsman', branch: 'Navy', noiseExposure: 'Moderate' },
  { code: 'IT', title: 'Information Systems Technician', branch: 'Navy', noiseExposure: 'Moderate' },
  { code: 'PS', title: 'Personnel Specialist', branch: 'Navy', noiseExposure: 'Moderate' },
  { code: 'YN', title: 'Yeoman', branch: 'Navy', noiseExposure: 'Low' },
  { code: 'LS', title: 'Logistics Specialist', branch: 'Navy', noiseExposure: 'Low' },

  // ============ AIR FORCE - HIGHLY PROBABLE ============
  { code: '2A3X3', title: 'A-10/F-15/U-2 Avionics Systems', branch: 'Air Force', noiseExposure: 'Highly Probable' },
  { code: '2A5X1', title: 'Aerospace Maintenance', branch: 'Air Force', noiseExposure: 'Highly Probable' },
  { code: '2A6X1', title: 'Aerospace Propulsion', branch: 'Air Force', noiseExposure: 'Highly Probable' },
  { code: '2A7X2', title: 'Nondestructive Inspection', branch: 'Air Force', noiseExposure: 'Highly Probable' },
  { code: '2W1X1', title: 'Aircraft Armament Systems', branch: 'Air Force', noiseExposure: 'Highly Probable' },
  { code: '1A1X1', title: 'Flight Engineer', branch: 'Air Force', noiseExposure: 'Highly Probable' },
  { code: '1A3X1', title: 'Airborne Communication Systems', branch: 'Air Force', noiseExposure: 'Highly Probable' },
  { code: '3E8X1', title: 'Explosive Ordnance Disposal', branch: 'Air Force', noiseExposure: 'Highly Probable' },

  // ============ AIR FORCE - MODERATE ============
  { code: '3P0X1', title: 'Security Forces', branch: 'Air Force', noiseExposure: 'Moderate' },
  { code: '4N0X1', title: 'Aerospace Medical Technician', branch: 'Air Force', noiseExposure: 'Moderate' },
  { code: '1N0X1', title: 'Operations Intelligence', branch: 'Air Force', noiseExposure: 'Moderate' },

  // ============ AIR FORCE - LOW ============
  { code: '3F0X1', title: 'Personnel', branch: 'Air Force', noiseExposure: 'Low' },
  { code: '6C0X1', title: 'Contracting', branch: 'Air Force', noiseExposure: 'Low' },

  // ============ COAST GUARD ============
  { code: 'MK', title: 'Machinery Technician', branch: 'Coast Guard', noiseExposure: 'Highly Probable' },
  { code: 'BM-CG', title: "Boatswain's Mate", branch: 'Coast Guard', noiseExposure: 'Highly Probable' },
  { code: 'GM-CG', title: "Gunner's Mate", branch: 'Coast Guard', noiseExposure: 'Highly Probable' },
  { code: 'YN-CG', title: 'Yeoman', branch: 'Coast Guard', noiseExposure: 'Low' },
];

// Lookup function
export function lookupMOS(code: string): MOSEntry | undefined {
  return mosNoiseExposureList.find(
    (entry) => entry.code.toLowerCase() === code.toLowerCase()
  );
}

// Get all MOSs for a branch
export function getMOSByBranch(branch: string): MOSEntry[] {
  return mosNoiseExposureList.filter(
    (entry) => entry.branch.toLowerCase() === branch.toLowerCase()
  );
}

// Get all highly probable MOSs
export function getHighlyProbableMOS(): MOSEntry[] {
  return mosNoiseExposureList.filter(
    (entry) => entry.noiseExposure === 'Highly Probable'
  );
}
