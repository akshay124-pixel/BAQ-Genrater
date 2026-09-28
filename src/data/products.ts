import { Product } from '../types/product';

// Generated from 'Promark Price.xlsx' -> AV System sheet.
// IMPORTANT: Excel contains no price/rate, unit, or GST columns.
// Therefore defaultRate/defaultUnit/gstPercentage below are application placeholders, not Excel-derived values.
//
// PRODUCTS ARE SORTED ALPHABETICALLY (A-Z) BY NAME.
// Duplicate names are intentionally retained because they may represent different models.
// IDs are regenerated sequentially after alphabetical sorting: prod-001 -> prod-084.
export const products: Product[] = [
  {
    id: 'prod-001',
    name: '1 x 18" Subwoofer',
    description: 'Make: Promark | Model: PMAS-210SA | Supply, Installation, Testing and Commissioning (SITC) of professional active/passive subwoofer comprising a high-performance 18-inch low-frequency transducer capable of delivering 1000W RMS power output and producing a maximum sound pressure level (SPL) of 133dB for powerful and accurate low-frequency reinforcement. The subwoofer shall be housed in a heavy-duty MDF enclosure with durable Polyurea coating for enhanced resistance against impact, moisture, and abrasion, ensuring long-term reliability in demanding environments. The system shall be provided with professional XLR input/output connectivity for seamless integration with sound reinforcement systems and shall be suitable for auditoriums, theatres, houses of worship, live events, and professional audio applications. The unit shall be supplied complete with all necessary accessories, interconnections, installation hardware, testing, commissioning, and demonstration of satisfactory performance as required for the project.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Active Subwoofer',
    active: true,
  },
  {
    id: 'prod-002',
    name: '1 x12" + 1.75" 600W Speaker',
    description: 'Make: Promark | Model: PMAS-1200A | 2 way Active DSP- controlled wooden speaker, 12" woofer, Frequency response: 55-20K, RMS power: 600W',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'FOH & Stage Monitor',
    active: true,
  },
  {
    id: 'prod-003',
    name: '1 x12" + 6 x 3.5" 700Watt Loudspeaker',
    description: 'Make: Promark | Model: PMAS-1263 | Supply, Installation, Testing and Commissioning (SITC) of professional portable column array speaker system comprising 1 × 12-inch low-frequency driver with 2.5-inch voice coil and 6 × 3.5-inch full-range drivers, capable of delivering 700W RMS power output and a maximum sound pressure level (SPL) of 129dB. The system shall feature a high-quality DSP processor with a minimum of four selectable preset modes for optimized performance across various applications. The speaker shall support True Wireless Stereo (TWS) linking and control functionality and shall be equipped with removable Bluetooth 5.3 connectivity for wireless audio streaming. The column speaker shall be designed as a wireless and portable solution with a heavy-duty plywood enclosure finished with durable Polyurea coating for enhanced strength and long-term reliability. The system shall be suitable for conferences, auditoriums, houses of worship, live performances, educational institutions, and portable sound reinforcement applications, complete with all necessary accessories, interconnections, testing, commissioning, and demonstration of satisfactory performance.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'FOH & Stage Monitor',
    active: true,
  },
  {
    id: 'prod-004',
    name: '1 x15" + 4 x 5" 1000Watt Loudspeaker',
    description: 'Make: Promark | Model: PMAS-1588 | Supply, Installation, Testing and Commissioning (SITC) of professional portable column array speaker system comprising 1 × 15-inch low-frequency driver with 3-inch voice coil, 4 × 5-inch mid-frequency drivers, and a high-frequency compression driver with 1.75-inch voice coil, capable of delivering 1000W RMS power output and producing a maximum sound pressure level (SPL) of 123dB. The system shall incorporate a high-quality DSP processor with a minimum of four selectable preset modes for optimized audio performance across different applications. The speaker shall support True Wireless Stereo (TWS) linking and control functionality and shall be equipped with removable Bluetooth 5.3 connectivity for wireless audio streaming. The enclosure shall be constructed from heavy-duty plywood with a durable Polyurea coating, providing superior strength, durability, and resistance to environmental conditions. The wireless column speaker system shall be suitable for auditoriums, conference halls, houses of worship, live performances, educational institutions, and professional sound reinforcement applications, complete with all necessary accessories, interconnections, installation, testing, commissioning, and demonstration of satisfactory performance.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'FOH & Stage Monitor',
    active: true,
  },
  {
    id: 'prod-005',
    name: '10" Active Line array loudspeaker',
    description: 'Make: Promark | Model: PMAS-110A | 10-inch low-frequency woofer and 1-inch × 3-inch high-frequency compression driver, delivering a continuous RMS power output of 600W and peak power handling of 1200W through a high-efficiency Class-D amplifier.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Active Line Array Speaker',
    active: true,
  },
  {
    id: 'prod-006',
    name: '12" Active Line array loudspeaker',
    description: 'Make: Promark | Model: PMAS-1700 | 12" Arrayable powered loudspeaker with ferquency response: 50-20K, RMS power: 800W, Program Power: 1600W.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Active Line Array Speaker',
    active: true,
  },
  {
    id: 'prod-007',
    name: '120Watt amplifer( single channel)',
    description: 'Make: Promark | Model: PMA-120DP | 5 Mic & 2Aux Inputs. •Line Output for connecting to a Booster Amplifier and Preamplifier Output for recording the programme. •Cut type Bass & treble controls. •5 LED array for output level monitoring.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Amplifiers',
    active: true,
  },
  {
    id: 'prod-008',
    name: '15" 800W Subwoofer',
    description: 'Make: Promark | Model: PMAS-206SA | Active Line Array Loudspeaker System comprising a bi-amplified 2-way active line array loudspeaker with four 5-inch neodymium low-frequency drivers and two 44 mm neodymium high-frequency compression drivers, delivering 600W RMS  program power through a high-efficiency Class-D amplifier.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Active Subwoofer',
    active: true,
  },
  {
    id: 'prod-009',
    name: '150 Watt wall speaker',
    description: 'Make: Promark | Model: PMAS801T-B | 150 Watt wall speaker with Nominal impedance: 8 Ohm, Sensitivity (1W/1m): 90dB, Frequency Range: 55Hz-20K Hz.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Wall Mount Speaker',
    active: true,
  },
  {
    id: 'prod-010',
    name: '1500 watt Bluetooth speaker',
    description: 'Make: Promark | Model: PMTS-1500 | 2 way Active DSP- controlled wooden speaker, 12" woofer, Frequency response: 55-20K, RMS power: 600W',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'FOH & Stage Monitor',
    active: true,
  },
  {
    id: 'prod-011',
    name: '1x 15" 1000W Speaker',
    description: 'Make: Promark | Model: PMAS-1500A | 2 way Active DSP- controlled wooden speaker, 15" woofer, Frequency response: 45-20K, RMS power: 1000W',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'FOH & Stage Monitor',
    active: true,
  },
  {
    id: 'prod-012',
    name: '1x 18" 1800W Subwoofer',
    description: 'Make: Promark | Model: PMAS-118SA | Professional Active High Power subwoofer with 1 x 18" subwoofer with RMS Power: 1000W, Program Power: 2000W.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Active Subwoofer',
    active: true,
  },
  {
    id: 'prod-013',
    name: '2 x 10" 2000W Active DSP Loudspeaker',
    description: 'Make: Promark | Model: PMAS-210A | Professional two-way active DSP-controlled full-range loudspeaker comprising 2 × 10-inch low-frequency transducers and 1 × 1.75-inch high-frequency compression driver, capable of delivering a frequency response of 50Hz–20kHz, 800W RMS power, 1600W program power, and a maximum SPL of 132dB.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'FOH & Stage Monitor',
    active: true,
  },
  {
    id: 'prod-014',
    name: '2 x 10" Active Line Array loudspeaker',
    description: 'Make: Promark | Model: PMAS-210A | Supply, Installation, Testing and Commissioning (SITC) of Active Line Array Loudspeaker comprising 2 × 10-inch neodymium low-frequency woofers and 1 × 3-inch voice coil high-frequency compression driver, with frequency response of 50Hz–20kHz, RMS power handling of 1000W, program power of 2000W, maximum SPL of 130dB, and nominal dispersion of 100° (H) × 10° (V), with integrated 56-bit/192kHz DSP processor, FIR filtering technology, multiple DSP presets, balanced XLR input/output connectivity, and weather-resistant IP45-rated construction. The amplifier module shall deliver 2 × 1000W output power at 4Ω, with signal-to-noise ratio greater than 95dBA (A-weighted), damping factor greater than 500 (20Hz–100Hz), and comprehensive protection including over-voltage protection up to 264V AC, overload protection, clip limiter and output protection. The enclosure shall be constructed from premium birch plywood with polyurea coating, incorporate integrated flyware for stacked or suspended configurations, ergonomic side handles, waterproof grille with acoustic fabric, and dimensions of 710 × 520 × 295mm (W × D × H) with a net weight of 31kg.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Active Line Array Speaker',
    active: true,
  },
  {
    id: 'prod-015',
    name: '2 x 8" 300W Woofer  loudspeaker',
    description: 'Make: Promark | Model: PMAS-28A | Supply, Installation, Testing and Commissioning (SITC) of professional two-way loudspeaker comprising 2 × 8-inch low-frequency woofers with 2-inch voice coils and a high-frequency compression driver with 1.75-inch voice coil, capable of delivering 300W RMS power output and a maximum sound pressure level (SPL) of 128dB. The loudspeaker shall incorporate advanced FIR (Finite Impulse Response) technology for optimized phase alignment, frequency response, and superior sound reproduction. The enclosure shall be constructed from heavy-duty MDF with durable Polyurea coating to provide excellent mechanical strength and resistance to wear and environmental conditions. The system shall be equipped with professional XLR connectivity for seamless integration with audio systems and shall be suitable for fixed installations and live sound reinforcement applications, complete with all necessary mounting hardware, accessories, cabling, testing, commissioning, and demonstration of satisfactory performance.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'FOH & Stage Monitor',
    active: true,
  },
  {
    id: 'prod-016',
    name: '2 x 8" Active Line Array loudspeaker',
    description: 'Make: Promark | Model: PMAS-208A | Supply, Installation, Testing and Commissioning (SITC) of Active Compact Line Array Loudspeaker comprising 2 × 8-inch low-frequency woofers and 1 × 3-inch titanium compression driver, with frequency response of 50Hz–20kHz, RMS power handling of 800W, program power of 1600W, maximum SPL of 130dB, and nominal dispersion of 120° (H) × 10° (V), with integrated 56-bit/192kHz DSP processor, FIR filtering technology, balanced XLR input/output connectivity, and comprehensive protection including over-voltage protection up to 264V AC, overload protection, clip limiter and output protection. The enclosure shall be constructed from premium plywood with weather-resistant polyurea coating, feature integrated quick-rigging hardware for flown installations, and provide compact dimensions of 600 × 470 × 275mm (W × D × H). The loudspeaker shall have a net weight of 27.5kg and gross weight of 30.5kg.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Active Line Array Speaker',
    active: true,
  },
  {
    id: 'prod-017',
    name: '2 x 8" Subwoofer',
    description: 'Make: Promark | Model: PMAS-82SA | Supply, Installation, Testing and Commissioning (SITC) of professional subwoofer loudspeaker comprising 2 × 8-inch low-frequency transducers capable of delivering 400W RMS power output and producing a maximum sound pressure level (SPL) of 126dB for accurate and impactful bass reproduction. The subwoofer shall be housed in a heavy-duty MDF enclosure with durable Polyurea coating, providing excellent structural strength and resistance to impact, moisture, and abrasion. The system shall be equipped with professional Combo input/output connectors for seamless integration with audio systems and shall be suitable for auditoriums, conference halls, theatres, houses of worship, and live sound reinforcement applications. The unit shall be supplied complete with all necessary accessories, interconnections, mounting hardware, testing, commissioning, and demonstration of satisfactory performance as required for the project.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Active Subwoofer',
    active: true,
  },
  {
    id: 'prod-018',
    name: '2 x18" 3200W Subwoofer',
    description: 'Make: Promark | Model: PMAS-318SA | Professional Active High Power subwoofer with 2 x 18" subwoofer with RMS Power: 3200W, Program Power: 6400W.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Active Subwoofer',
    active: true,
  },
  {
    id: 'prod-019',
    name: '2 x6.5" 200W Wall Speaker',
    description: 'Make: Promark | Model: PMAS-62A | Professional Active speaker with 2 x 6.5" woofers + 1.4"HF drivers, Frequency response: 60-20K, RMS Power: 200W, Program Power: 400W.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'FOH & Stage Monitor',
    active: true,
  },
  {
    id: 'prod-020',
    name: '20x Optical Zoom @30FPS',
    description: 'Make: Promark | Model: PRO 3008 | 4K PTZ Conference Camera with integrated microphone array suitable for professional video conferencing, meeting rooms, training rooms and collaboration applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: '4K PTZ Camera',
    active: true,
  },
  {
    id: 'prod-021',
    name: '24 Channel Audio Mixer',
    description: 'SITC of Professional 24-Channel Audio Mixing Console: Supply, Installation, Testing and Commissioning (SITC) of a professional 24-channel audio mixing console complete with all necessary accessories, interconnections, mounting hardware, power supply, configuration, testing and commissioning. The mixer shall provide a minimum of 24 input channels with individual gain, mute, PFL, pan and full EQ controls on each channel. The unit shall feature a high-resolution 24-bit/96kHz DSP processing engine with dual independent digital effects processors for signal enhancement and effects routing. The console shall support a minimum of 6 AUX sends, 6 AUX outputs and 4 subgroup outputs for monitor mixes, external signal processing and advanced routing applications. The mixer shall include an integrated USB audio interface for multitrack recording/playback, built-in Bluetooth connectivity for wireless audio streaming, and +48V phantom power for all microphone input channels. The unit shall be equipped with professional 100mm smooth-action faders, stereo return inputs, dedicated headphone output with PFL monitoring, balanced main outputs, low-noise microphone preamplifiers and comprehensive level metering. The system shall be installed, tested and commissioned as per the manufacturer\'s recommendations and project requirements, ensuring reliable operation and high-quality audio performance for auditoriums, conference rooms, educational institutions, houses of worship and live sound applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-022',
    name: '250 Watt amplifer( Dual channel)',
    description: 'Make: Promark | Model: PMT-5000 | Power Output : 2 X 200W R M S / 2 X 250W R M S Input : 6x Mic .8mv / 4.7k Ω , 2x Aux-100mv /470k Ω , 1x Line 1v /50k Ω Freq. Resp. : 20-20,000Hz ± 3dB Output Regulation : < 2dB no Load to Full Load at 1 K H z Speaker Output : 2 Ω, 4 Ω, (for direct connection) 70 & 100 V Line (for use with L MT ) Power Supply : 230 V A C D C 36 V (12x3 Car Battery) Noise Ratio : 90dB',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Amplifiers',
    active: true,
  },
  {
    id: 'prod-023',
    name: '250 Watt amplifer( single channel)',
    description: 'Make: Promark | Model: PMA-250DP | 6 Mic & 2 Aux Inputs. •Preamplifier & Line Output for connecting to a Booster Amplifier and for recording the programme. •5 Led array for output level monitoring.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Amplifiers',
    active: true,
  },
  {
    id: 'prod-024',
    name: '300 Watt coloumn speaker',
    description: 'Make: Promark | Model: PMAS-54 | Multi-purpose passive full range column speaker with 4x5" woofers and 1x1.75"HF driver, Frequency response: 70-20K, RMS Power: 300W, Program Power: 600W.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Coloumn Speaker',
    active: true,
  },
  {
    id: 'prod-025',
    name: '4 X 2 HDMI Switcher',
    description: 'Make: Aten | Model: VS482B | 4K HDMI Switcher with Dual HDMI Outputs suitable for conference rooms, auditoriums, command & control centers, training rooms and professional AV applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'ATEN Products',
    active: true,
  },
  {
    id: 'prod-026',
    name: '4 x 5" Active Line array loudspeaker',
    description: 'Make: Promark | Model: PMAS-405A | Active Line Array Loudspeaker System comprising a bi-amplified 2-way active line array loudspeaker with four 5-inch neodymium low-frequency drivers and two 44 mm neodymium high-frequency compression drivers, delivering 600W RMS and 1200W program power through a high-efficiency Class-D amplifier.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Active Line Array Speaker',
    active: true,
  },
  {
    id: 'prod-027',
    name: '450 Watt coloumn speaker',
    description: 'Make: Promark | Model: PMAS-56 | Multi-purpose passive full range column speaker with 6x5" woofers and 2x1.4"HF driver, Frequency response: 70-20K, RMS Power: 450W, Program Power: 900W.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Coloumn Speaker',
    active: true,
  },
  {
    id: 'prod-028',
    name: '4K PTZ 10x Optical Zoom',
    description: 'Make: Promark | Model: PRO 208H | 4K PTZ Conference Camera with integrated microphone array suitable for professional video conferencing, meeting rooms, training rooms and collaboration applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: '4K PTZ Camera',
    active: true,
  },
  {
    id: 'prod-029',
    name: '4K PTZ 20x Optical Zoom @60FPS',
    description: 'Make: Promark | Model: PRO 500V | 4K PTZ Conference Camera with integrated microphone array suitable for professional video conferencing, meeting rooms, training rooms and collaboration applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: '4K PTZ Camera',
    active: true,
  },
  {
    id: 'prod-030',
    name: '50 Watt wall speaker',
    description: 'Make: Promark | Model: PMAS601T-B | 50 Watt wall speaker with Nominal impedance: 8 Ohm, Sensitivity (1W/1m): 90dB, Frequency Range: 60Hz-20K Hz.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Wall Mount Speaker',
    active: true,
  },
  {
    id: 'prod-031',
    name: '6.5" 30W wall mount speaker with tapping',
    description: 'Make: Promark | Model: PM8063B/W | 30Watt wall-mounted speaker suitable for 70V/100V constant-voltage line and 8Ω low-impedance operation, having a frequency response of 80Hz–20kHz, sensitivity of 90±2dB, and maximum SPL of 105±2dB.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Wall Mount Speaker',
    active: true,
  },
  {
    id: 'prod-032',
    name: '6.5" 40W wall mount speaker with tapping',
    description: 'Make: Promark | Model: PM8064B/W | 40 watt wall-mounted speaker suitable for 70V/100V constant-voltage line and 8Ω low-impedance operation, having a frequency response of 65Hz–20kHz, sensitivity of 91±2dB, and maximum sound pressure level (SPL) of 107±2dB for high-quality speech and music reproduction.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Wall Mount Speaker',
    active: true,
  },
  {
    id: 'prod-033',
    name: '6.5"20W Coaxial Ceiling Speaker',
    description: 'Make: Promark | Model: PM703 | Built-in 100V/70V transformer In-ceiling type loudspeaker 6.5” paper cone driver unit Rated power output at 20W',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Ceilling Speakers',
    active: true,
  },
  {
    id: 'prod-034',
    name: '6.5"20W Coaxial Ceiling Speaker with tapping',
    description: 'Make: Promark | Model: PM915 | ceiling-mounted loudspeaker suitable for 70V, 100V and 4–16 Ohm audio systems, featuring a 5-inch coaxial low-frequency driver and 1-inch high-frequency driver with integrated dual-crossover network for enhanced audio performance.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Ceilling Speakers',
    active: true,
  },
  {
    id: 'prod-035',
    name: '6.5"40W Coaxial Ceiling Speaker with tapping',
    description: 'Make: Promark | Model: PM916 | ceiling-mounted loudspeaker suitable for 70V, 100V and 4–16 Ohm audio systems, incorporating a 6.5-inch coaxial low-frequency driver and 1-inch high-frequency driver with integrated dual-crossover network for superior sound reproduction.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Ceilling Speakers',
    active: true,
  },
  {
    id: 'prod-036',
    name: '60 Watt amplifer( single channel)',
    description: 'Make: Promark | Model: PMA-65DP | 4 Mic & 1 Aux Inputs. •Preamplifier Output for connecting to a Booster Amplifier and for recording the programme. •Cut type Bass & treble controls. •Instant transfer to DC power if AC power fails',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Amplifiers',
    active: true,
  },
  {
    id: 'prod-037',
    name: '65" IFPD',
    description: 'Make: Promark | Model: PRO AT-65P | 65" IFPD with MTK 9679 chipset with a Quad-Core ARM Cortex-A73 CPU and Mali-G52 GPU, running on Android 14 with 8 GB RAM and 128 GB internal storage. It features a Grade A+ DLED anti-glare panel with 4K UHD resolution (3840 × 2160), 16:9 aspect ratio, 500 cd/m² ±10% brightness, up to 1.07 billion colours, wide 178° horizontal and vertical viewing angles, fast response time of under 4 ms, and a high contrast ratio of up to 15000:1, ensuring sharp and vibrant visuals with a long panel lifetime of over 100,000 hours.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'IFPD',
    active: true,
  },
  {
    id: 'prod-038',
    name: '75 Watt amplifier (Dual Channel)',
    description: 'Make: Promark | Model: PMT-1500 | Power Output : 2 X 75W R M S Input : 6x Mic .8mv / 4.7k Ω , 2x Aux - 100mv /470k Ω , 1x Line 1v /50k Ω Freq. Resp. : 20-20,000Hz ± 3dB Output Regulation : < 2dB no Load to Full Load at 1 K H z Speaker Output : 2 Ω, 4 Ω, (for direct connection) 70 & 100 V Line (for use with L MT ) Power Supply : 230 V A',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Amplifiers',
    active: true,
  },
  {
    id: 'prod-039',
    name: '75" IFPD',
    description: 'Make: Promark | Model: PRO AT-75P | 75" IFPD with MTK 9679 chipset with a Quad-Core ARM Cortex-A73 CPU and Mali-G52 GPU, running on Android 14 with 8 GB RAM and 128 GB internal storage. It features a Grade A+ DLED anti-glare panel with 4K UHD resolution (3840 × 2160), 16:9 aspect ratio, 500 cd/m² ±10% brightness, up to 1.07 billion colours, wide 178° horizontal and vertical viewing angles, fast response time of under 4 ms, and a high contrast ratio of up to 15000:1, ensuring sharp and vibrant visuals with a long panel lifetime of over 100,000 hours.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'IFPD',
    active: true,
  },
  {
    id: 'prod-040',
    name: '8" 60W Coaxial Ceilling Speaker',
    description: 'Make: Promark | Model: PM918 | ceiling speaker compatible with both 70V/100V and 4–16Ω systems,70V, 100V/ 4-16 ohms, Rated power output at 60 W, Construction of dual-crossover Max. SPL: 110±2dB',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Ceilling Speakers',
    active: true,
  },
  {
    id: 'prod-041',
    name: '80 Watt amplifer( single channel)',
    description: 'Make: Promark | Model: PMA-80DP | 4 Mic & 1 Aux Inputs. •Preamplifier Output for connecting to a Booster Amplifier and for recording the programme. •Cut type Bass & treble controls. •Instant transfer to DC power if AC power fails.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Amplifiers',
    active: true,
  },
  {
    id: 'prod-042',
    name: '86" IFPD',
    description: 'Make: Promark | Model: PRO AT-86P | 86" IFPD with MTK 9679 chipset with a Quad-Core ARM Cortex-A73 CPU and Mali-G52 GPU, running on Android 14 with 8 GB RAM and 128 GB internal storage. It features a Grade A+ DLED anti-glare panel with 4K UHD resolution (3840 × 2160), 16:9 aspect ratio, 500 cd/m² ±10% brightness, up to 1.07 billion colours, wide 178° horizontal and vertical viewing angles, fast response time of under 4 ms, and a high contrast ratio of up to 15000:1, ensuring sharp and vibrant visuals with a long panel lifetime of over 100,000 hours.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'IFPD',
    active: true,
  },
  {
    id: 'prod-043',
    name: '98" IFPD',
    description: 'Make: Promark | Model: PRO RX-98P | IFPD with MTK 9679 chipset with a Quad-Core ARM Cortex-A73 CPU and Mali-G52 GPU, running on Android 14 with 8 GB RAM and 128 GB internal storage. It features a Grade A+ DLED anti-glare panel with 4K UHD resolution (3840 × 2160), 16:9 aspect ratio, 500 cd/m² ±10% brightness, up to 1.07 billion colours, wide 178° horizontal and vertical viewing angles, fast response time of under 4 ms, and a high contrast ratio of up to 15000:1, ensuring sharp and vibrant visuals with a long panel lifetime of over 100,000 hours.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'IFPD',
    active: true,
  },
  {
    id: 'prod-044',
    name: 'ACTIVE COAXIAL STAGE MONITOR',
    description: 'Make: Promark | Model: PMAS-12CMA | Active Coaxial Stage Monitor Loudspeaker comprising a high-performance coaxial transducer with 1 × 12-inch low-frequency woofer and 1 × 1.75-inch high-frequency compression driver, delivering 400W RMS and 800W program power through an integrated high-efficiency Class-D amplifier.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'FOH & Stage Monitor',
    active: true,
  },
  {
    id: 'prod-045',
    name: 'AI Audio DSP (upto 16 x 16)',
    description: 'Make: Promark | Model: PMTS-1616 | AI-powered digital audio signal processor (DSP) with built-in Dante networking support, designed for professional audio applications including conferencing, education, house of worship, public address and pro-audio environments.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'DSP',
    active: true,
  },
  {
    id: 'prod-046',
    name: 'Cat-6 Cable',
    description: 'Make: Custom | Model: Custom | (Cat-6) UTP Cable suitable for structured cabling systems, LAN networking, IP telephony, wireless access points, CCTV, AV-over-IP and data communication applications.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-047',
    name: 'Ceilling tile Microphone',
    description: 'Make: Promark | Model: PM-CM-D | Ceiling Microphone with a 129-microphone array, capable of handling up to 17 PA zones and 33 pickup zones. Perfectly suited for spaces ranging from small conference rooms with 30 attendees to large auditoriums hosting over 800 people.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Microphones',
    active: true,
  },
  {
    id: 'prod-048',
    name: 'Chairman Unit',
    description: 'Make: Promark | Model: PMTS-N70C | Conference system microphone units are pure conference discussion speaking units with priority buttons.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-049',
    name: 'Class D Amplifier',
    description: 'Make: Promark | Model: PMAMP-2000 | 2000W x 2 Amplifier',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Coloumn Speaker',
    active: true,
  },
  {
    id: 'prod-050',
    name: 'Conference Controller',
    description: 'Make: Promark | Model: PMTS-800N | Digital network conference system microphone units are pure conference discussion speaking units',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-051',
    name: 'Conference Controller',
    description: 'Make: Promark | Model: PMP9866 | Digital Conference System Host comprising an advanced eight-core all-digital high-fidelity conference control unit with built-in high-performance RISC CPU for stable operation, fast processing and superior audio performance.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-052',
    name: 'Conference Controller',
    description: 'Make: Promark | Model: PMP6115 | Supply, Installation, Testing and Commissioning (SITC) of Digital Conference System Host supporting up to 60 chairman/delegate microphone units on a single host and expandable up to 240 microphone units through extension hosts. The system shall support independent operation or PC-based control and provide conference management modes including Free Mode, First-In-First-Out (FIFO) Mode and Limited Speech Mode with simultaneous active microphone selection from 1 to 9 units. The host shall feature an LCD display of 122 × 32 dot matrix resolution, 8-pin digital connection interface for control and audio signal transmission, audio output interface for recording and sound reinforcement systems, telephone coupler interface for teleconferencing, and compatibility with external video central processors for speaker tracking and positioning. Technical specifications shall include frequency response of 40Hz–16kHz, THD less than 0.1%, power consumption of 115W, power supply of AC 220–240V, 50/60Hz, dimensions of 485mm × 100mm × 355mm (W×H×D), net weight of 11.8kg, and suitability for installation in a standard 19-inch equipment rack.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-053',
    name: 'Delegate Unit',
    description: 'Make: Promark | Model: PMTS-N70D | Conference system microphone units are pure conference discussion speaking units.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-054',
    name: 'Digital Conference System  Delegate Microphone',
    description: 'Make: Promark | Model: PMP64 | Supply, Installation, Testing and Commissioning (SITC) of Digital Conference System Square Delegate Microphone featuring a cardioid condenser microphone element with frequency response of 30Hz–20kHz, sensitivity of -42dB ±2dB, square microphone length of 190mm, and reference speaking distance of 500mm. The microphone shall incorporate a speaking status LED light ring, 1.23-inch OLED display for operational status indication, audio start function for automatic microphone activation upon speech detection, and dedicated anti-interference circuitry providing immunity against interference from mobile phones, Wi-Fi, Bluetooth and FM broadcasts. The unit shall support dual-backup connectivity through 8-core dedicated aviation T-type cable or network cable and shall operate as a passive device powered directly from the conference system host. The microphone shall include microphone status indication and microphone ON/OFF control switch for conference operation.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-055',
    name: 'Digital Conference System Chaiman Microphone',
    description: 'Make: Promark | Model: PMP63 | Supply, Installation, Testing and Commissioning (SITC) of Digital Conference System Square Chairman Microphone featuring a cardioid condenser microphone element with frequency response of 30Hz–20kHz, sensitivity of -42dB ±2dB, square microphone length of 190mm, and reference speaking distance of 500mm. The microphone shall incorporate a speaking status LED light ring, 1.23-inch OLED display for operational status indication, audio start function for automatic microphone activation upon speech detection, and dedicated anti-interference circuitry providing immunity against interference from mobile phones, Wi-Fi, Bluetooth and FM broadcasts. The chairman microphone shall include a priority function capable of overriding and muting active delegate units and support up to 6 chairman units in the system. The unit shall allow unrestricted connection positioning, support dual-backup connectivity through 8-core dedicated aviation T-type cable or network cable, and operate as a passive device powered directly from the conference system host. The microphone shall include microphone status indication and microphone ON/OFF control switch for conference operation.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-056',
    name: 'Digital Conference System, Chaiman Microphone',
    description: 'Make: Promark | Model: PMP60 | Supply, Installation, Testing and Commissioning (SITC) of Digital Conference System Chairman Microphone featuring a cardioid condenser microphone element with frequency response of 30Hz–20kHz, sensitivity of -42dB ±2dB, gooseneck microphone length of 430mm, and reference speaking distance of 300mm. The microphone shall incorporate a speaking status LED light ring, 1.23-inch OLED display for operational status indication, audio start function for automatic microphone activation upon speech detection, low susceptibility to interference from mobile phones, Wi-Fi, Bluetooth and FM broadcasts through dedicated anti-interference circuitry, and chairman priority function capable of overriding and muting active delegate units. The system shall support up to 6 chairman units, provide unrestricted chairman unit connection positioning, utilize dual-backup connectivity through 8-core dedicated aviation T-type cable or network cable, and operate as a passive unit powered directly from the conference system host.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-057',
    name: 'Digital Conference System, Delegate Microphone',
    description: 'Make: Promark | Model: PMP61 | Supply, Installation, Testing and Commissioning (SITC) of Digital Conference System Delegate Microphone featuring a cardioid condenser microphone element with frequency response of 30Hz–20kHz, sensitivity of -42dB ±2dB, gooseneck microphone length of 430mm, and reference speaking distance of 300mm. The microphone shall incorporate a speaking status LED light ring, 1.23-inch OLED display for operational status indication, audio start function for automatic microphone activation upon speech detection, and dedicated anti-interference circuitry providing immunity against interference from mobile phones, Wi-Fi, Bluetooth and FM broadcasts. The unit shall support dual-backup connectivity through 8-core dedicated aviation T-type cable or network cable and shall operate as a passive device powered directly from the conference system host. The microphone shall include a microphone status display and microphone ON/OFF control switch for conference operation.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-058',
    name: 'Digital Podium',
    description: 'Make: Promark | Model: PM-EL i5(FS) | Supply, Installation, Testing & Commissioning (SITC) of a free-standing multimedia digital podium constructed from polymer powder-coated steel with wooden top panels, lockable access, sliding cover, concealed connectivity and provision for integrated visual presenter storage and operation. The podium shall be equipped with a built-in 21.5-inch LED interactive touch display having Full HD resolution (1920 × 1080), 4000 LPI interactive resolution, 2048 levels pressure sensitivity, 5 ms response time, 170°/160° viewing angle, finger touch operation, integrated speakers and USB/VGA/HDMI connectivity. The system shall include an Intel Core i5 10th Generation small form factor computer with minimum 16 GB RAM, 512 GB SSD, integrated Wi-Fi/LAN, Windows 10 operating system, wireless keyboard and mouse, and multiple HDMI, DisplayPort, USB and LAN interfaces. The podium controller shall support 4K (3840 × 2160) output resolution with front and rear panel HDMI, VGA, USB, audio and control interfaces, source selection buttons, volume controls, HDMI repeater functionality supporting up to 15 m cable length and programmable control ports. The unit shall be supplied with a phantom-powered hypercardioid/lobar gooseneck condenser microphone with XLR output, ON/OFF switch and status LED. Audio system shall comprise an integrated soundbar with minimum 120 W amplifier, four 20 W speakers, 20 W tweeter, external 20 W subwoofer, built-in wireless microphone receiver, one handheld wireless microphone and one headband microphone, along with an audio mixing console for signal management. The podium shall also provide sliding trays for laptop, keyboard and mouse placement, efficient cooling fans, secure key-based access, operation on 180–240 V AC power supply and a front display panel supporting HDMI, USB, VGA, audio I/O, RJ45, built-in Wi-Fi, Bluetooth, screen mirroring, Android/WebOS platform, IPS panel technology and minimum 1 GB RAM with 8 GB internal storage. The complete system shall be BIS, CE and RoHS certified and supported with functional test reports from NABL/ILAC accredited government laboratories for reliable educational, training and presentation applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Digital Podium',
    active: true,
  },
  {
    id: 'prod-059',
    name: 'Digital Podium',
    description: 'Make: Promark | Model: PM-EL i5 | Supply, Installation, Testing & Commissioning (SITC) of a Free-Standing Electronic Lectern/Multimedia Digital Podium comprising a robust polycarbonate/metal body with steel frame, lockable design, concealed connectivity ports, soft wheels for mobility and integrated sliding tray for keyboard, mouse and laptop placement. The lectern shall be equipped with an Intel Core i5 (12th Generation or higher) processor, minimum 8GB RAM, 1TB storage, Windows 10 or higher operating system, and a 21-inch Full HD interactive touch display with 1920 × 1080 resolution, 16:9 aspect ratio, 4000 LPI interactive resolution, 5ms response time, 170°/160° viewing angle, 1024 pressure levels, finger and stylus touch support, and tracking speed of 200 points per second. The system shall include VGA, HDMI, USB and audio interfaces, a front controller with source selection, volume and power controls, rear panel connectivity with multiple VGA, HDMI, USB and RCA ports, built-in HDMI repeater supporting 15m HDMI transmission, and 4K UHD (3840 × 2160) video output capability. The podium shall be supplied with a phantom-powered 21.5 cm gooseneck condenser microphone with XLR output, hyper-cardioid pickup pattern, ON/OFF switch and LED status indication. The integrated audio system shall consist of a minimum 250W amplifier with multiple MIC and LINE inputs, bass and treble controls, overload/short-circuit protection and variable-speed cooling fan, driving four weather-resistant 2-way speakers with 50W power handling, frequency response of 80Hz–20kHz and sensitivity of 90dB or better. The system shall further include one handheld wireless microphone and one lapel/headset wireless microphone operating through a shared receiver, support for external/internal speakers, motorized tilt touch monitor, device control integration, and operation on 180–240V AC, 50Hz power supply, complete with all accessories, cabling, testing and commissioning for seamless presentation, teaching, training and conferencing applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Digital Podium',
    active: true,
  },
  {
    id: 'prod-060',
    name: 'Digital Podium',
    description: 'Make: Promark | Model: PM-EL i7 | Supply, Installation, Testing & Commissioning (SITC) of an advanced free-standing Electronic Lectern with integrated AV control, hybrid learning and presentation capabilities, featuring a 25-inch Full HD (1920 × 1080) anti-glare interactive display with projected capacitive multi-touch technology, 2048 pressure levels, active stylus support, electromagnetic resonance technology, 200 points/sec tracking speed, 1000:1 contrast ratio, 250 cd/m² brightness and adjustable tilt mechanism. The lectern shall incorporate an Intel® Core™ i5/i7 (11th Generation or higher) built-in PC with minimum 8GB DDR4 RAM expandable to 32GB, 1TB SSD storage, integrated graphics, Gigabit Ethernet, dual-band Wi-Fi, Bluetooth connectivity, multiple USB 3.0/2.0 ports and Windows operating system. The system shall include a 7-inch capacitive touch control panel with network connectivity, PoE support, IC card reader compatibility and centralized control functions. The lectern shall be equipped with a networked media processor supporting HDMI matrix switching, audio DSP, power amplification, OPS management, projector/display control, remote monitoring, push notifications and RF-based wireless control. Audio facilities shall include a supercardioid phantom-powered gooseneck microphone with XLR output, frequency response of 70Hz–20kHz, dynamic wireless handheld microphone system with operating range up to 40 metres, wireless receiver, integrated audio processing and amplification. The lectern shall support HDMI, VGA, USB, audio and network interfaces, wireless content sharing, media decoding up to 4K@30fps, RTMP streaming, optional media server functionality, RS232/IR/Relay control, Gigabit Ethernet switching and remote device management. The complete system shall be housed in a robust metal enclosure with concealed cabling, lockable access, integrated charging facilities, ergonomic design and comprehensive connectivity for displays, projectors, cameras and conferencing peripherals. The lectern shall operate on 180–240V AC power supply and be supplied complete with all accessories, software, cabling, testing and commissioning for educational institutions, auditoriums, seminar halls, training centres and hybrid learning environments.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Digital Podium',
    active: true,
  },
  {
    id: 'prod-061',
    name: 'DSP(8x8)',
    description: 'Make: Promark | Model: PMTS-808 | Digital audio processors tools designed specifically for AV integrators. Available in two configuration sizes (8x8 and 16x16). Tendzone’s user-friendly Web-UI interface, the digital audio processors support standard bidirectional control via RS-232, TCP/IP, making them compatible with popular third-party control systems .',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'DSP',
    active: true,
  },
  {
    id: 'prod-062',
    name: 'Embedded Desk Boundary Chairman Microphone',
    description: 'Make: Promark | Model: PM6117 | Embedded Desk Boundary Chairman Microphone consisting of a concealed pop-up supercardioid condenser microphone designed for professional digital conference systems. The microphone shall be manufactured from high-quality brass construction with an ultra-low profile design, built-in anti-vibration pad and RF filter to ensure superior speech intelligibility and immunity from electromagnetic interference.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-063',
    name: 'Embedded Desk Boundary Deleagate Microphone',
    description: 'Make: Promark | Model: PM6118 | Embedded Desk Boundary Delegate Microphone consisting of a concealed pop-up supercardioid condenser microphone designed for professional digital conference systems. The microphone shall be constructed from high-quality brass with an ultra-low profile design, integrated anti-vibration pad and RF filter to ensure clear and interference-free audio pickup.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-064',
    name: 'Flush Mount Chairman Unit',
    description: 'Make: Promark | Model: PMTS-N75C | Digital Chairman Conference Unit with integrated 40cm detachable gooseneck super-cardioid unidirectional condenser microphone suitable for professional conference discussion systems, boardrooms, council chambers, meeting rooms and training facilities.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-065',
    name: 'Flush Mount Delegate Unit',
    description: 'Make: Promark | Model: PMTS-N75D | Digital Delegate Conference Unit with integrated 40cm detachable gooseneck super-cardioid unidirectional condenser microphone suitable for professional conference discussion systems, boardrooms, council chambers, meeting rooms and training facilities.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Conference System',
    active: true,
  },
  {
    id: 'prod-066',
    name: 'HDMI Cable (10mtr)',
    description: 'Make: Custom | Model: Custom | High-Speed HDMI Cable suitable for professional audio-visual, conference room, control room, digital signage and multimedia applications.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-067',
    name: 'HDMI Cable (15mtr)',
    description: 'Make: Custom | Model: Custom | High-Speed HDMI Cable suitable for professional audio-visual, conference room, control room, digital signage and multimedia applications.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-068',
    name: 'HDMI Cable (2 mtr)',
    description: 'Make: Custom | Model: Custom | High-Speed HDMI Cable suitable for professional audio-visual, conference room, control room, digital signage and multimedia applications.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-069',
    name: 'HDMI Cable (5mtr)',
    description: 'Make: Custom | Model: Custom | High-Speed HDMI Cable suitable for professional audio-visual, conference room, control room, digital signage and multimedia applications.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-070',
    name: 'HDMI Extender',
    description: 'Make: Aten | Model: VE814A | HDMI HDBaseT Extender with Dual Output suitable for professional AV, digital signage, auditorium, classroom, control room and conference room applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'ATEN Products',
    active: true,
  },
  {
    id: 'prod-071',
    name: 'Hydraulic Pop Up Box/Cable Cubby',
    description: 'Make: Promark | Model: PMHCC | Supply, Installation, Testing and Commissioning (SITC) of motorized/hydraulic tabletop multimedia connectivity box suitable for offices, conference rooms, classrooms, seminar halls, home theatres, and auditoriums. The unit shall feature a premium-quality aluminum alloy construction with push-button operated hydraulic opening mechanism for smooth and silent operation. The popup box shall be equipped with a minimum of 10-module capacity and shall provide 2 Universal Power Sockets, 2 RJ-45 (CAT-6) data ports, 1 VGA port, 1 USB data port, 1 HDMI port supporting 4K video resolution, and 1 x 3.5mm stereo audio (AUX) port.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cable Cubby',
    active: true,
  },
  {
    id: 'prod-072',
    name: 'Microphone Cable',
    description: 'Make: Custom | Model: Custom | Microphone Cable suitable for professional audio, public address, conference, recording and sound reinforcement applications.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-073',
    name: 'Recorder & Streamer Cum Switcher',
    description: 'Make: Promark | Model: PR-RSB04 | 4-Channel HDMI Video Production Switcher suitable for live streaming, video conferencing, webinar production, lecture capture, event broadcasting and professional AV applications. The switcher shall feature a built-in minimum 5.5-inch Full HD monitoring display and support at least four HDMI video inputs with resolutions up to 1080p60.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Recorder & Streamer Cum Switcher',
    active: true,
  },
  {
    id: 'prod-074',
    name: 'Speaker Cable',
    description: 'Make: Custom | Model: Custom | Speaker Cable suitable for professional audio distribution, public address systems, conference systems, background music systems and sound reinforcement applications.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-075',
    name: 'USB Cable(10 mtr)',
    description: 'Make: Custom | Model: Custom | USB Cable suitable for professional audio-visual, conferencing, control system, data transfer and multimedia applications.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-076',
    name: 'USB Cable(2 mtr)',
    description: 'Make: Custom | Model: Custom | USB Cable suitable for professional audio-visual, conferencing, control system, data transfer and multimedia applications.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-077',
    name: 'USB Cable(5 mtr)',
    description: 'Make: Custom | Model: Custom | USB Cable suitable for professional audio-visual, conferencing, control system, data transfer and multimedia applications.',
    defaultUnit: 'Meter',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Cables',
    active: true,
  },
  {
    id: 'prod-078',
    name: 'USB Extender',
    description: 'Make: Aten | Model: CE820 | USB HDMI HDBaseT 2.0 KVM Extender suitable for control rooms, command centers, industrial automation, transportation facilities, medical environments and remote workstation applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'ATEN Products',
    active: true,
  },
  {
    id: 'prod-079',
    name: 'Wired handheld Microphone',
    description: 'Make: Promark | Model: PMT-4000 | Dynamic supercardioid vocal microphone system suitable for professional speech reinforcement, live performances, conferences, auditoriums, public address systems and stage applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Microphones',
    active: true,
  },
  {
    id: 'prod-080',
    name: 'Wireless Collar Microphone',
    description: 'Make: Promark | Model: PMT-7000A | wireless microphone system shall operate in UHF frequency range of 612–698MHz and provide stable wireless transmission with working distance of approximately 150 meters under normal operating conditions.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Microphones',
    active: true,
  },
  {
    id: 'prod-081',
    name: 'Wireless Gooseneck Microphone',
    description: 'Make: Promark | Model: PMT-5000 | wireless gooseneck microphone system suitable for conference rooms, boardrooms, auditoriums, seminar halls and professional speech reinforcement applications. The microphone shall feature dynamic supercardioid polar pattern for precise voice pickup with enhanced off-axis noise rejection and superior feedback suppression.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Microphones',
    active: true,
  },
  {
    id: 'prod-082',
    name: 'Wireless Handheld Microphone',
    description: 'Make: Promark | Model: PMT-9000 | UHF wireless collar microphone system suitable for conference rooms, classrooms, auditoriums, presentations, public address and professional speech reinforcement applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Microphones',
    active: true,
  },
  {
    id: 'prod-083',
    name: 'Wireless Instrument Microphone',
    description: 'Make: Promark | Model: PMT-2000 | Dynamic supercardioid instrument microphone system suitable for professional audio reinforcement, live performances, musical instruments, conferences, auditoriums and stage applications.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'Microphones',
    active: true,
  },
  {
    id: 'prod-084',
    name: 'Wireless Presenter',
    description: 'Make: Aten | Model: VP2020 | 4K Wireless Presentation Switch suitable for conference rooms, boardrooms, classrooms, training centers and collaborative meeting environments.',
    defaultUnit: 'Nos',
    defaultRate: 0, // TODO: Excel has no price/rate value
    gstPercentage: 18, // TODO: Excel has no GST value
    category: 'ATEN Products',
    active: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getActiveProducts(): Product[] {
  return products.filter(p => p.active);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(p => 
    p.active && (
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.category?.toLowerCase().includes(lowercaseQuery)
    )
  );
}
