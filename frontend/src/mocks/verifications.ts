import type { VerificationResult } from '../types';

export const MOCK_VERIFICATIONS: VerificationResult[] = [
  {
    id: 'ver-8941',
    claim: 'WHO and FDA officially announce a complete global ban on artificial food sweeteners starting next month.',
    contentType: 'claim',
    verdict: 'FALSE',
    confidence: 96,
    summary: 'No global ban has been announced. The FDA and EFSA have re-evaluated specific sweeteners like aspartame and reaffirmed current safe daily intake thresholds.',
    explanation: 'Social media posts claiming an imminent total global ban on all artificial food sweeteners misrepresent an updated joint scientific assessment released by the WHO IARC and JECFA in 2023. The agencies did not mandate a ban; rather, they maintained the acceptable daily intake (ADI) levels previously established. The FDA stated that it reviewed the relevant scientific data and does not agree with any recommendation to ban aspartame or sucralose.',
    isDemo: true,
    createdAt: '2026-08-24T12:15:00Z',
    language: 'English (US)',
    context: 'Viral message circulating across WhatsApp groups and X (formerly Twitter) with over 450,000 impressions.',
    tags: ['Health', 'Food Safety', 'Viral Claim', 'FDA', 'WHO'],
    evidence: [
      {
        id: 'evi-1',
        title: 'WHO/JECFA Joint Assessment on Food Additives',
        description: 'JECFA reaffirmed that the data evaluated indicated no sufficient reason to change the previously established acceptable daily intake of 0–40 mg/kg body weight.',
        source: 'World Health Organization (WHO)',
        sourceDomain: 'who.int',
        sourceUrl: 'https://www.who.int/news/item/14-07-2023-aspartame-hazard-and-risk-assessment-results-released',
        reliability: 'HIGH',
        stance: 'CONTRADICTS',
        date: 'July 2023 (Reaffirmed 2026)'
      },
      {
        id: 'evi-2',
        title: 'FDA Official Statement on Sweeteners Safety',
        description: 'FDA scientists reviewed the scientific data and concluded that aspartame and authorized sweeteners remain safe under approved consumption parameters.',
        source: 'US Food and Drug Administration',
        sourceDomain: 'fda.gov',
        sourceUrl: 'https://www.fda.gov/food/food-additives-petitions/aspartame-and-other-sweeteners-food',
        reliability: 'HIGH',
        stance: 'CONTRADICTS',
        date: 'January 2026'
      },
      {
        id: 'evi-3',
        title: 'FactCheck.org Science Verification Dispatch',
        description: 'Viral posts falsely claim regulatory bans in Europe and North America by splicing audio clips from nutritional conferences.',
        source: 'FactCheck.org',
        sourceDomain: 'factcheck.org',
        sourceUrl: 'https://www.factcheck.org',
        reliability: 'HIGH',
        stance: 'CONTRADICTS',
        date: 'August 2026'
      }
    ],
    sources: [
      {
        id: 'src-1',
        name: 'World Health Organization',
        domain: 'who.int',
        title: 'Joint FAO/WHO Expert Committee on Food Additives Statement',
        url: 'https://who.int',
        publishedAt: '2026-07-14',
        credibilityScore: 99,
        factCheckRating: 'Official Health Organization'
      },
      {
        id: 'src-2',
        name: 'FDA Regulatory Affairs',
        domain: 'fda.gov',
        title: 'Consumer Advisory on Food Additives & Sweeteners',
        url: 'https://fda.gov',
        publishedAt: '2026-08-01',
        credibilityScore: 98,
        factCheckRating: 'Federal Regulatory Agency'
      },
      {
        id: 'src-3',
        name: 'Reuters Fact Check',
        domain: 'reuters.com',
        title: 'Fact Check: Sweetener Ban Rumor Debunked',
        url: 'https://reuters.com',
        publishedAt: '2026-08-20',
        credibilityScore: 95,
        factCheckRating: 'Verified News Organization'
      }
    ],
    timeline: [
      {
        id: 'tl-1',
        stage: 'Content Received',
        title: 'Text Claim Ingested',
        description: 'Natural language tokenizer parsed 28 words across 1 semantic statement.',
        timestamp: '12:15:01',
        status: 'completed'
      },
      {
        id: 'tl-2',
        stage: 'Claim Extraction',
        title: 'Entities Identified',
        description: 'Entities: [WHO, FDA, artificial sweeteners, global ban]. Target date: next month.',
        timestamp: '12:15:03',
        status: 'completed'
      },
      {
        id: 'tl-3',
        stage: 'Cross-Source Search',
        title: '14 Regulatory Databases Queried',
        description: 'Searched WHO, FDA, EFSA, PubMed, Reuters, and AP News archives.',
        timestamp: '12:15:05',
        status: 'completed'
      },
      {
        id: 'tl-4',
        stage: 'Contradiction Analysis',
        title: 'Direct Contradictions Identified',
        description: '3 primary regulatory bodies explicitly confirm zero bans enacted.',
        timestamp: '12:15:07',
        status: 'completed'
      },
      {
        id: 'tl-5',
        stage: 'Verdict Synthesis',
        title: 'Verdict Generated: FALSE (96% Confidence)',
        description: 'AI model synthesized evidence weights into final verdict report.',
        timestamp: '12:15:08',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ver-8942',
    claim: 'New orbital laser telescope satellite discovers confirmed biological signatures in subsurface ocean on Enceladus.',
    contentType: 'claim',
    verdict: 'MISLEADING',
    confidence: 88,
    summary: 'NASA and ESA data detected phosphorus, methane, and complex organic precursors in plumes from Saturn’s moon Enceladus, but definitive biological life has NOT been confirmed.',
    explanation: 'The claim takes legitimate chemical biomarker and organic chemistry findings from the Cassini mission archives and recent James Webb Space Telescope spectroscopic data and exaggerates them into "confirmed biological signatures." Scientists emphasize that prebiotic organic chemistry and phosphorus are essential building blocks for life, but abiotic geological processes (serpentinization and hydrothermal vents) can generate identical signatures without biological presence.',
    isDemo: true,
    createdAt: '2026-08-24T10:40:00Z',
    language: 'English (US)',
    tags: ['Science', 'Space', 'NASA', 'Astronomy'],
    evidence: [
      {
        id: 'evi-21',
        title: 'Nature Astronomy: Phosphorus Abundance in Enceladus Ocean',
        description: 'Detection of phosphorus concentrations at least 100 times higher than Earth oceans provides key ocean habitability condition, not biological confirmation.',
        source: 'Nature Astronomy',
        sourceDomain: 'nature.com',
        sourceUrl: 'https://nature.com/articles/s41550-023-01982-7',
        reliability: 'HIGH',
        stance: 'NEUTRAL',
        date: '2023-2026'
      },
      {
        id: 'evi-22',
        title: 'NASA Jet Propulsion Laboratory Science Advisory',
        description: 'JPL researchers clarify that while Enceladus satisfies chemical habitability requirements, biosignature verification requires targeted life-detection probe missions.',
        source: 'NASA JPL',
        sourceDomain: 'jpl.nasa.gov',
        sourceUrl: 'https://jpl.nasa.gov',
        reliability: 'HIGH',
        stance: 'CONTRADICTS',
        date: 'June 2026'
      }
    ],
    sources: [
      {
        id: 'src-21',
        name: 'Nature Publishing Group',
        domain: 'nature.com',
        title: 'Phosphorus and Habitability of Enceladus',
        url: 'https://nature.com',
        publishedAt: '2026-04-12',
        credibilityScore: 98,
        factCheckRating: 'Peer-Reviewed Journal'
      },
      {
        id: 'src-22',
        name: 'NASA Astrobiology Institute',
        domain: 'nasa.gov',
        title: 'Ocean Worlds Habitability Index Report',
        url: 'https://nasa.gov',
        publishedAt: '2026-07-02',
        credibilityScore: 99,
        factCheckRating: 'Space Exploration Agency'
      }
    ],
    timeline: [
      {
        id: 'tl-21',
        stage: 'Content Received',
        title: 'Claim Analyzed',
        description: 'Scientific keywords extracted: [Enceladus, biosignature, telescope, orbital laser].',
        timestamp: '10:40:02',
        status: 'completed'
      },
      {
        id: 'tl-22',
        stage: 'Peer Review Cross-Check',
        title: 'Astrophysical Database Search',
        description: 'Indexed arXiv, Nature, Science, and NASA technical briefings.',
        timestamp: '10:40:05',
        status: 'completed'
      },
      {
        id: 'tl-23',
        stage: 'Verdict Synthesis',
        title: 'Verdict: MISLEADING (88% Confidence)',
        description: 'Chemical habitability conflated with confirmed biological life.',
        timestamp: '10:40:07',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ver-8943',
    claim: 'European Union enacts the AI Safety & Accountability Act enforcing mandatory cryptographic provenance watermarks on all generative media.',
    contentType: 'url',
    sourceUrl: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_ai_act',
    verdict: 'TRUE',
    confidence: 97,
    summary: 'The EU AI Act and its subsequent enforcement guidelines legally mandate detectable watermarking and machine-readable labeling for AI-generated synthetic content.',
    explanation: 'The European Union has formally established requirements under Article 50 of the EU AI Act specifying that providers of generative AI systems must ensure outputs (images, audio, and video) are marked in a machine-readable format and detectable as artificially generated or manipulated, subject to compliance timelines spanning 2025 to 2026.',
    isDemo: true,
    createdAt: '2026-08-23T16:20:00Z',
    tags: ['Policy', 'AI Regulation', 'EU', 'Technology'],
    evidence: [
      {
        id: 'evi-31',
        title: 'Official Journal of the European Union — Regulation (EU) 2024/1689',
        description: 'Providers of AI systems generating synthetic audio, image, video or text content shall ensure the outputs are marked in a machine-readable format.',
        source: 'EUR-Lex European Union Law',
        sourceDomain: 'eur-lex.europa.eu',
        sourceUrl: 'https://eur-lex.europa.eu',
        reliability: 'HIGH',
        stance: 'SUPPORTS',
        date: 'May 2024 (In effect 2026)'
      }
    ],
    sources: [
      {
        id: 'src-31',
        name: 'European Commission',
        domain: 'europa.eu',
        title: 'EU Artificial Intelligence Act Regulatory Summary',
        url: 'https://europa.eu',
        publishedAt: '2026-05-15',
        credibilityScore: 99,
        factCheckRating: 'Government Body'
      }
    ],
    timeline: [
      {
        id: 'tl-31',
        stage: 'URL Scraped',
        title: 'EUR-Lex Document Ingestion',
        description: 'Parsed legal text and article compliance provisions.',
        timestamp: '16:20:01',
        status: 'completed'
      },
      {
        id: 'tl-32',
        stage: 'Statute Verification',
        title: 'Legislative Cross-Reference',
        description: 'Confirmed passage and binding legal status.',
        timestamp: '16:20:04',
        status: 'completed'
      },
      {
        id: 'tl-33',
        stage: 'Verdict Synthesis',
        title: 'Verdict: TRUE (97% Confidence)',
        description: 'Claim directly reflects verified European legal statutes.',
        timestamp: '16:20:06',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ver-8944',
    claim: 'Viral photo of an unprecedented underwater city ruins discovered in Lake Michigan during sonar survey.',
    contentType: 'image',
    fileName: 'lake_michigan_ruins_sonar.jpg',
    fileSize: '4.2 MB',
    fileType: 'image/jpeg',
    dimensions: '3840 x 2160',
    mediaPreviewUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
    verdict: 'FALSE',
    confidence: 94,
    summary: 'The image is an AI-generated rendering created with Midjourney v6. Forensic error level analysis (ELA) and frequency spectrum analysis demonstrate synthetic generation artifacts.',
    explanation: 'Forensic image inspection revealed severe inconsistencies in lighting physics, non-Euclidean column architecture, uniform sensor noise absence across depth planes, and synthetic neural network frequency fingerprints characteristic of diffusion models. No underwater archaeological survey in Lake Michigan has reported such structures.',
    isDemo: true,
    createdAt: '2026-08-23T09:10:00Z',
    tags: ['Image Forensics', 'AI Generation', 'Deepfake', 'Viral Photo'],
    evidence: [
      {
        id: 'evi-41',
        title: 'Frequency Domain & Diffusion Artifact Analysis',
        description: 'Discrete Cosine Transform (DCT) peak spectrum shows signature 8x8 high-frequency suppression typical of Latent Diffusion synthesis.',
        source: 'TruthWeave Neural Forensics Engine',
        sourceDomain: 'truthweave.internal',
        sourceUrl: '#',
        reliability: 'HIGH',
        stance: 'CONTRADICTS',
        date: 'August 2026'
      },
      {
        id: 'evi-42',
        title: 'Great Lakes Maritime Archaeology Registry',
        description: 'Confirmed no sonar findings matching architectural masonry in Michigan lakebed surveys.',
        source: 'NOAA Great Lakes Environmental Research Laboratory',
        sourceDomain: 'glerl.noaa.gov',
        sourceUrl: 'https://glerl.noaa.gov',
        reliability: 'HIGH',
        stance: 'CONTRADICTS',
        date: '2026'
      }
    ],
    sources: [
      {
        id: 'src-41',
        name: 'NOAA Marine Archaeology',
        domain: 'noaa.gov',
        title: 'Lake Michigan Bathymetric & Subsurface Survey Archive',
        url: 'https://noaa.gov',
        publishedAt: '2026-03-01',
        credibilityScore: 98,
        factCheckRating: 'Scientific Government Agency'
      }
    ],
    timeline: [
      {
        id: 'tl-41',
        stage: 'Image Decoding',
        title: 'EXIF & Compression Analysis',
        description: 'Missing camera sensor metadata; software signature indicates web compression.',
        timestamp: '09:10:01',
        status: 'completed'
      },
      {
        id: 'tl-42',
        stage: 'Neural Forensics',
        title: 'Error Level Analysis (ELA)',
        description: 'Detected uniform edge compression indicating full synthetic generation.',
        timestamp: '09:10:03',
        status: 'completed'
      },
      {
        id: 'tl-43',
        stage: 'Verdict Synthesis',
        title: 'Verdict: FALSE (94% Confidence)',
        description: 'AI generation detected with forensic certainty.',
        timestamp: '09:10:06',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ver-8945',
    claim: 'Leaked video claiming world leader announced emergency economic currency reset during closed diplomatic summit.',
    contentType: 'video',
    fileName: 'summit_announcement_leak.mp4',
    fileSize: '28.6 MB',
    fileType: 'video/mp4',
    duration: '01:45',
    resolution: '1920x1080 (30 fps)',
    mediaPreviewUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
    verdict: 'FALSE',
    confidence: 98,
    summary: 'High-probability synthetic audiovisual deepfake. Lip-sync synchronization anomaly score: 0.92, audio vocal tract formant mismatch detected.',
    explanation: 'Deepfake analysis performed on all 3,150 video frames identified landmark jitter around the mouth perimeter, temporal inconsistency across eye blinks, and spectral phase discontinuities in the voice track characteristic of voice cloning TTS algorithms.',
    isDemo: true,
    createdAt: '2026-08-22T18:40:00Z',
    tags: ['Video Analysis', 'Deepfake', 'Voice Cloning', 'Politics'],
    evidence: [
      {
        id: 'evi-51',
        title: 'Spatial-Temporal Facial Biometrics Analysis',
        description: 'Frame-by-frame optical flow analysis detected 14ms phase lag between phonetic audio transients and oral geometry deformation.',
        source: 'TruthWeave Deepfake Vision Engine',
        sourceDomain: 'truthweave.internal',
        sourceUrl: '#',
        reliability: 'HIGH',
        stance: 'CONTRADICTS',
        date: 'August 2026'
      }
    ],
    sources: [
      {
        id: 'src-51',
        name: 'Associated Press Global Registry',
        domain: 'apnews.com',
        title: 'Transcript of Diplomatic Summit Plenary Sessions',
        url: 'https://apnews.com',
        publishedAt: '2026-08-22',
        credibilityScore: 99,
        factCheckRating: 'Official Press Transcript'
      }
    ],
    timeline: [
      {
        id: 'tl-51',
        stage: 'Frame Extraction',
        title: '3,150 Frames Extracted',
        description: 'Analyzed at 30 fps across keyframe intervals.',
        timestamp: '18:40:02',
        status: 'completed'
      },
      {
        id: 'tl-52',
        stage: 'Audio-Visual Sync',
        title: 'Phoneme-Viseme Discrepancy Found',
        description: 'Voice clone overlay detected on archival video footage.',
        timestamp: '18:40:06',
        status: 'completed'
      },
      {
        id: 'tl-53',
        stage: 'Verdict Synthesis',
        title: 'Verdict: FALSE (98% Confidence)',
        description: 'Synthetic voice and deepfake face swap verified.',
        timestamp: '18:40:09',
        status: 'completed'
      }
    ]
  },
  {
    id: 'ver-8946',
    claim: 'Unpublished leaked research PDF document alleging secret atmospheric geoengineering project code-named Silver Horizon.',
    contentType: 'document',
    fileName: 'silver_horizon_whitepaper_v3.pdf',
    fileSize: '1.8 MB',
    fileType: 'application/pdf',
    verdict: 'UNVERIFIED',
    confidence: 45,
    summary: 'The document lacks institutional digital signatures, citations lead to nonexistent repositories, and source origin cannot be independently corroborated.',
    explanation: 'Document parsing extracted 12 technical claims regarding aerosol dispersal. While the chemical terminology is derived from published solar radiation management academic papers, the document contains inconsistent typography, fraudulent department seal watermarks, and zero verified authors listed in scholarly indices.',
    isDemo: true,
    createdAt: '2026-08-21T14:15:00Z',
    tags: ['Document Analysis', 'PDF', 'Atmospheric Science', 'Unverified'],
    evidence: [
      {
        id: 'evi-61',
        title: 'Metadata & Cryptographic Signature Check',
        description: 'PDF creation metadata indicates modification via consumer desktop PDF editor without enterprise certificate or DOI identifier.',
        source: 'Document Forensics Engine',
        sourceDomain: 'truthweave.internal',
        sourceUrl: '#',
        reliability: 'MEDIUM',
        stance: 'NEUTRAL',
        date: 'August 2026'
      }
    ],
    sources: [
      {
        id: 'src-61',
        name: 'Geoengineering Science Consortium',
        domain: 'geoengineering.org',
        title: 'Published Field Experiment Registry',
        url: 'https://geoengineering.org',
        publishedAt: '2026-06-01',
        credibilityScore: 92,
        factCheckRating: 'Academic Consortium'
      }
    ],
    timeline: [
      {
        id: 'tl-61',
        stage: 'Document OCR & Extraction',
        title: '24 Pages Parsed',
        description: 'Extracted 14,200 words and 8 diagrams.',
        timestamp: '14:15:02',
        status: 'completed'
      },
      {
        id: 'tl-62',
        stage: 'Citation Verification',
        title: '0 of 19 Citations Verified',
        description: 'Referenced paper titles not found in CrossRef or PubMed.',
        timestamp: '14:15:05',
        status: 'completed'
      },
      {
        id: 'tl-63',
        stage: 'Verdict Synthesis',
        title: 'Verdict: UNVERIFIED (45% Confidence)',
        description: 'Insufficient verifiable evidence to substantiate document claims.',
        timestamp: '14:15:08',
        status: 'completed'
      }
    ]
  }
];
