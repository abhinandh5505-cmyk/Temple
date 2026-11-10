import React, { useState } from 'react';
import { ChevronRight, Sparkles, BookOpen, X } from 'lucide-react';

const JOURNEY_STAGES = [
  {
    range: [0, 0.18],
    stageNum: 'I',
    title: 'The Rajagopuram',
    subtitle: 'Gateway to the Sacred Island of Srirangam',
    sanskrit: 'महाद्वार गोपुरम्',
    description:
      'Towering 236 feet above the sacred Kaveri delta, the Rajagopuram of Sri Ranganathaswamy Temple is the tallest temple tower in Asia. Its 13 tiers are adorned with ornate stucco sculptures of celestial beings, beckoning pilgrims from afar into the world’s largest functioning Hindu temple complex spanning 156 sacred acres.',
    highlight: 'Dravidian Vimana Architecture • 13 Tiers • 236 Feet Height'
  },
  {
    range: [0.18, 0.35],
    stageNum: 'II',
    title: 'The Mahadvaram',
    subtitle: 'Colossal Carved Portal & Dvarapalakas',
    sanskrit: 'कवाट द्वारपालक',
    description:
      'The threshold dividing the temporal world from the sacred enclosure. Massive double doors fashioned from ancient seasoned teakwood, studded with golden brass bosses and ferocious lion knockers. Towering monolithic Dvarapalaka guardian statues flank the entrance, granting benediction to all who enter with pure devotion.',
    highlight: 'Teakwood & Brass Studs • Monolithic Stone Guardians • Torana Crest'
  },
  {
    range: [0.35, 0.52],
    stageNum: 'III',
    title: 'Maha Prakaram',
    subtitle: 'Hypostyle Corridors & Rearing Yali Pillars',
    sanskrit: 'प्राकार याली स्तम्भ',
    description:
      'Entering the monumental pillared halls. Monolithic granite columns feature rearing Yalis—the mythical lion-beast symbolizing divine valor and cosmic energy—poised heroically atop kneeling elephants. Each column is crowned with the iconic Dravidian Pushpa-Potika (corbelled bracket capital) supporting colossal stone architraves.',
    highlight: 'Monolithic Granite • Rearing Yalis • Pushpa-Potika Bracket Capitals'
  },
  {
    range: [0.52, 0.68],
    stageNum: 'IV',
    title: 'Vitanam: Ornamental Ceilings',
    subtitle: 'Sahasrara Lotus Medallions & Cosmic Mandalas',
    sanskrit: 'सहस्रार पद्म वितानम्',
    description:
      'Look upward to witness the extraordinary craftsmanship of the ancient sthapatis (temple architects). Deep square coffers feature deeply carved Sahasrara (thousand-petal) lotus medallions, sacred geometric Sri Yantra mandalas, and stepped corbelled beams trimmed in antique gold, channeling cosmic harmonics into the sacred hall.',
    highlight: 'Carved Lotus Coffers • Sacred Geometric Mandalas • Corbelled Beams'
  },
  {
    range: [0.68, 0.85],
    stageNum: 'V',
    title: 'The Sacred Shrines',
    subtitle: 'Lord Ganesha & Lord Subrahmanya (Murugan)',
    sanskrit: 'श्री गणेश सुब्रह्मण्य सन्निधि',
    description:
      'Approaching the ceremonial heart of the temple. The sacred passage is flanked by revered shrines: Lord Ganesha on the left seated in divine benevolence with sweet modaka, and Lord Subrahmanya (Murugan) on the right bearing the sacred Vel spear with his royal peacock (Mayil) vahana. Multi-tiered brass Kuthu Vilakkus cast shimmering reflections upon the polished marble floor.',
    highlight: 'Lord Ganesha • Lord Subrahmanya with Vel & Peacock • Kuthu Vilakku Lamps'
  },
  {
    range: [0.85, 1.0],
    stageNum: 'VI',
    title: 'Garbhagriha: The Sacred Sanctum',
    subtitle: 'The Sanctum Sanctorum & Ananda Vimana',
    sanskrit: 'गर्भगृह श्री रङ्गनाथ',
    description:
      'The sacred culmination of your pilgrimage. Framed by a magnificent golden Makara Torana arch and guarded by eternal deepams, the inner sanctum emanates tranquility, warmth, and profound divine presence. A gentle haze of sacred incense smoke rises toward the golden Ananda Vimana, evoking timeless peace.',
    highlight: 'Golden Makara Torana • Eternal Deepam Flames • Sacred Serenity'
  }
];

export function ArchitectureCard({ progress, onLearnMore }) {
  const [collapsed, setCollapsed] = useState(false);

  // Find active stage
  const activeStage = JOURNEY_STAGES.find(
    (s) => progress >= s.range[0] && progress <= s.range[1]
  ) || JOURNEY_STAGES[0];

  return (
    <aside
      className={`architecture-card ${collapsed ? 'collapsed' : ''}`}
      aria-label="Temple Architecture Highlight"
    >
      <div className="card-header">
        <div className="stage-badge">
          <span className="stage-roman">{activeStage.stageNum}</span>
          <span className="stage-sanskrit">{activeStage.sanskrit}</span>
        </div>
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? 'Expand details' : 'Minimize card'}
          aria-label={collapsed ? 'Expand details' : 'Minimize card'}
        >
          {collapsed ? <BookOpen size={16} /> : <X size={16} />}
        </button>
      </div>

      {!collapsed ? (
        <div className="card-body">
          <h3 className="card-title">{activeStage.title}</h3>
          <h4 className="card-subtitle">{activeStage.subtitle}</h4>
          <p className="card-description">{activeStage.description}</p>
          <div className="card-highlight">
            <Sparkles size={14} className="highlight-icon" />
            <span>{activeStage.highlight}</span>
          </div>
          {onLearnMore && (
            <button
              className="card-explore-btn"
              onClick={onLearnMore}
            >
              <span>Explore Temple Architecture</span>
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      ) : (
        <div className="card-collapsed-label" onClick={() => setCollapsed(false)}>
          <span>{activeStage.title}</span>
          <ChevronRight size={14} />
        </div>
      )}
    </aside>
  );
}

