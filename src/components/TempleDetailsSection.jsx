import React, { useState } from 'react';
import { Landmark, Shield, Clock, MapPin, Feather, Sparkles } from 'lucide-react';

export function TempleDetailsSection({ id }) {
  const [activeTab, setActiveTab] = useState('architecture');

  return (
    <section id={id} className="temple-details-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header">
          <div className="sacred-crest">
            <span className="crest-line"></span>
            <span className="crest-symbol">ॐ</span>
            <span className="crest-line"></span>
          </div>
          <span className="section-eyebrow">THE ARCHITECTURAL & SPIRITUAL HERITAGE</span>
          <h2 className="section-title">Sri Ranganathaswamy Temple, Srirangam</h2>
          <p className="section-subtitle">
            Revered as <em>Bhooloka Vaikuntham</em> — the supreme earthly abode of Lord Vishnu.
            Enclosed by seven concentric sacred prakarams on an island sanctuary in Tamil Nadu.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="heritage-stats-grid">
          <div className="stat-card">
            <span className="stat-number">157</span>
            <span className="stat-unit">Acres</span>
            <p className="stat-label">World’s Largest Functioning Temple Complex</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">21</span>
            <span className="stat-unit">Gopurams</span>
            <p className="stat-label">Towering Dravidian Gateway Towers</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">7</span>
            <span className="stat-unit">Prakarams</span>
            <p className="stat-label">Concentric Sacred Enclosures</p>
          </div>
          <div className="stat-card">
            <span className="stat-number">1000</span>
            <span className="stat-unit">Pillars</span>
            <p className="stat-label">Monolithic Granite Mandapam Marvel</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="heritage-tabs">
          <button
            className={`tab-btn ${activeTab === 'architecture' ? 'active' : ''}`}
            onClick={() => setActiveTab('architecture')}
          >
            <Landmark size={18} />
            <span>Dravidian Architecture</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'sanctum' ? 'active' : ''}`}
            onClick={() => setActiveTab('sanctum')}
          >
            <Shield size={18} />
            <span>The Sacred Sanctum</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'rituals' ? 'active' : ''}`}
            onClick={() => setActiveTab('rituals')}
          >
            <Clock size={18} />
            <span>Daily Poojas & Timings</span>
          </button>
          <button
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            <Feather size={18} />
            <span>Ancient Epigraphy</span>
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="tab-content-panel">
          {activeTab === 'architecture' && (
            <div className="tab-pane architecture-pane">
              <div className="pane-grid">
                <div className="pane-card">
                  <div className="card-badge">HYPOSTYLE HALLS</div>
                  <h3 className="card-heading">The 1000-Pillared Mandapam</h3>
                  <p>
                    Constructed during the Vijayanagara period, this monolithic granite hall
                    is an engineering marvel of Dravidian stone craftsmanship. Towering pillars
                    feature intricately carved rearing horses, divine warriors, and roaring Yalis,
                    each sculpted from a single solid block of hard granite.
                  </p>
                  <ul className="card-features">
                    <li>Stepped Potika lotus bracket capitals</li>
                    <li>Acoustic stone pillars emitting resonant musical notes</li>
                    <li>Deep coffer vitanams with Sahasrara lotus medallions</li>
                  </ul>
                </div>

                <div className="pane-card">
                  <div className="card-badge">SACRED ENCLOSURES</div>
                  <h3 className="card-heading">The Seven Concentric Prakarams</h3>
                  <p>
                    The temple layout is mapped to the human body and the seven spiritual chakras.
                    The outermost prakarams host vibrant residential streets, markets, and flower stalls,
                    progressively distilling into profound silence and sanctity as one penetrates
                    towards the innermost sanctum.
                  </p>
                  <ul className="card-features">
                    <li>Outer perimeter measures over 4 kilometers</li>
                    <li>Granite boundary walls reach 30 feet in height</li>
                    <li>Oriented precisely along cardinal astrological axes</li>
                  </ul>
                </div>

                <div className="pane-card">
                  <div className="card-badge">THE COLOSSUS</div>
                  <h3 className="card-heading">The Rajagopuram</h3>
                  <p>
                    Standing at 236 feet (72 meters), the southern Rajagopuram is an extraordinary
                    monument of 13 tiers crowned with 13 gold-gilt kalasams. Finished in luminous ivory
                    stucco, it reflects the radiant light of the sun and the morning mist of the Kaveri.
                  </p>
                  <ul className="card-features">
                    <li>13 ascending architectural talas (stories)</li>
                    <li>Sculptural friezes depicting Puranic episodes</li>
                    <li>Visual beacon visible across the entire Tiruchirappalli region</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sanctum' && (
            <div className="tab-pane sanctum-pane">
              <div className="sanctum-narrative">
                <div className="narrative-left">
                  <span className="sacred-tag">GARBHAGRIHA & ANANDA VIMANA</span>
                  <h3 className="narrative-title">The Sacred Golden Sanctum Sanctorum</h3>
                  <p>
                    At the heart of the innermost prakaram lies the consecrated Garbhagriha,
                    crowned by the circular gold-plated <strong>Ananda Vimana</strong>.
                    Within this tranquil, lamp-lit sanctuary, Lord Sri Ranganatha reclines in
                    <em>Yoga Nidra</em> (divine cosmic repose) upon the coils of the thousand-headed
                    serpent king Adi Shesha.
                  </p>
                  <p>
                    His right hand rests beneath his crowned head, facing southward toward Lanka
                    in perpetual blessing, while his left hand rests gracefully alongside his body.
                    Above the threshold, a magnificent golden Makara Torana arch radiates eternal light,
                    flanked by glowing brass Kuthu Vilakkus and the gentle scent of camphor, cardamom,
                    and tulasi.
                  </p>
                  <div className="quote-box">
                    <blockquote>
                      "Verily, this is Bhooloka Vaikuntham—the haven where the infinite divine
                      descends to receive all living beings with boundless grace."
                    </blockquote>
                    <cite>— Nalayira Divya Prabandham (Azhwar Hymns)</cite>
                  </div>
                </div>

                <div className="narrative-right">
                  <div className="sanctum-highlights-box">
                    <h4>Sanctum Elements</h4>
                    <div className="element-row">
                      <Sparkles className="elem-icon" size={16} />
                      <div>
                        <strong>Ananda Vimana:</strong> Circular gold-plated vimana tower inscribed with ancient sacred glyphs.
                      </div>
                    </div>
                    <div className="element-row">
                      <Sparkles className="elem-icon" size={16} />
                      <div>
                        <strong>Sayana Murti:</strong> Revered monolithic representation in cosmic slumber upon Adi Shesha.
                      </div>
                    </div>
                    <div className="element-row">
                      <Sparkles className="elem-icon" size={16} />
                      <div>
                        <strong>Eternal Deepams:</strong> Clarified butter and sesame oil lamps burning uninterrupted for centuries.
                      </div>
                    </div>
                    <div className="element-row">
                      <Sparkles className="elem-icon" size={16} />
                      <div>
                        <strong>Makara Torana:</strong> Mythical dragon arch sculpted in gilded repoussé framing the sanctuary portal.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'rituals' && (
            <div className="tab-pane rituals-pane">
              <div className="timings-grid">
                <div className="timing-card">
                  <div className="time-badge">06:00 AM – 07:15 AM</div>
                  <h4 className="pooja-name">Viswaroopa Seva</h4>
                  <p>The auspicious awakening darshan, accompanied by holy Vedic chanting, Nadaswaram, and sacred elephant benediction.</p>
                </div>
                <div className="timing-card">
                  <div className="time-badge">09:00 AM – 12:00 PM</div>
                  <h4 className="pooja-name">Moolasthana Darshanam</h4>
                  <p>General darshan of the consecrated main deity amidst traditional aartis and fragrant tulasi offerings.</p>
                </div>
                <div className="timing-card">
                  <div className="time-badge">01:15 PM – 06:00 PM</div>
                  <h4 className="pooja-name">Sayana Seva & Deeparadhana</h4>
                  <p>Afternoon darshan opening followed by evening camphor aarti and ceremonial lamps lighting the sacred corridors.</p>
                </div>
                <div className="timing-card">
                  <div className="time-badge">06:45 PM – 09:00 PM</div>
                  <h4 className="pooja-name">Sayana Seva / Ekanta Seva</h4>
                  <p>The closing night darshan, where veena melodies are played softly as the sacred doors are gently sealed until dawn.</p>
                </div>
              </div>
              <div className="darshan-notes">
                <MapPin size={16} className="note-icon" />
                <span>
                  <strong>Location:</strong> Srirangam Island, Tiruchirappalli, Tamil Nadu, India. Proper traditional dress code is observed within the inner temple enclosures.
                </span>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="tab-pane history-pane">
              <div className="history-narrative">
                <p>
                  Sri Ranganathaswamy Temple houses over <strong>640 ancient stone epigraphs</strong> in
                  Tamil, Sanskrit, Telugu, and Kannada, chiseled onto the granite walls of the prakarams.
                  These records chronicle continuous endowments from the great imperial dynasties of South India:
                  the Early Cholas, Imperial Pandyas, Hoysalas, and Vijayanagara emperors.
                </p>
                <div className="dynasty-row">
                  <div className="dynasty-pill">
                    <strong>Chola Empire (9th–13th C.)</strong>
                    <span>Gold donations, golden vimana plating, and granaries</span>
                  </div>
                  <div className="dynasty-pill">
                    <strong>Pandya Dynasty (13th C.)</strong>
                    <span>King Jatavarman Sundara Pandya weighed himself against gold for the deity</span>
                  </div>
                  <div className="dynasty-pill">
                    <strong>Vijayanagara Empire (14th–16th C.)</strong>
                    <span>Built the 1000-Pillared Mandapam and restored damaged sanctums</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

