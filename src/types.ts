export interface GuitarSelection {
  bodyStyle: 'stratocaster' | 'telecaster' | 'les_paul';
  blockCount: number; // 2 to 4
  blockColors: string[]; // array of strings with hex colors
  hardware: 'chrome' | 'gold' | 'black';
  pickups: string;
  pickguard: string;
  knobs: string;
  inlays: 'dots' | 'blocks' | 'none';
  neckWood: 'maple' | 'roasted_maple' | 'rosewood';
}

export interface FinishOption {
  id: string;
  name: string;
  type: 'solid' | 'metallic' | 'neon';
  value: string;
  thumbnail: string;
}

export interface PresetGuitar {
  id: string;
  name: string;
  description: string;
  image: string;
  settings: GuitarSelection;
}
