/* contract-content.jsx — full contract body as React components */
const { useState, useRef, useEffect, useMemo } = React;

// ---- Defined-term tooltip ------------------------------------------------
function DT({ term, def, children }) {
  return (
    <span className="defined-term" tabIndex="0">
      {children || term}
      <span className="defined-term__tip" role="tooltip">
        <strong>{term}</strong>
        {def}
      </span>
    </span>
  );
}

// ---- Plain-English toggle ------------------------------------------------
function PETogglePill({ on, onToggle }) {
  return (
    <button className={`pe-toggle ${on ? "is-on" : ""}`} onClick={onToggle} aria-pressed={on}>
      <span className="pe-toggle__dot" />
      Plain English
    </button>
  );
}

function SectionHeader({ eyebrow, num, title, peOn, onTogglePE, hasPE = true }) {
  return (
    <div>
      <div className="section-eyebrow-row">
        <span className="eyebrow">{eyebrow}</span>
        {hasPE && <PETogglePill on={peOn} onToggle={onTogglePE} />}
      </div>
      <h1 className="section-title">{num ? <span style={{ color: "var(--gold-deep)", marginRight: 12 }}>{num}</span> : null}{title}</h1>
      <div className="thin-rule" />
    </div>
  );
}

function PlainEnglish({ children }) {
  return (
    <div className="plain-english">
      <div className="plain-english__label">In plain words</div>
      <p>{children}</p>
    </div>
  );
}

function ChangeCallout({ from, to, label }) {
  return (
    <div className="callout-change">
      <div className="callout-change__label">{label || "Changed from 2025"}</div>
      <div className="callout-change__row">
        <div className="callout-change__from">{from}</div>
        <div className="callout-change__arrow">→</div>
        <div className="callout-change__to">{to}</div>
      </div>
    </div>
  );
}

// ---- Sections ------------------------------------------------------------

function SectionRecitals({ pe, setPE }) {
  return (
    <section id="recitals" data-toc-num="—" data-toc-title="Recitals">
      <SectionHeader eyebrow="Agreement" title="Brand Development & Creative Services Agreement" peOn={pe.recitals} onTogglePE={() => setPE("recitals")} />
      <p>
        This Agreement for Brand Development & Creative Services (the <DT term="Agreement" def="This contract, with every section, exhibit, and signature page attached.">"Agreement"</DT>) is entered into as of <span style={{ borderBottom: "1px solid var(--hairline)", padding: "0 18px" }}>June 1, 2026</span> (the <DT term="Effective Date" def="The day this contract begins. Set to June 1, 2026.">"Effective Date"</DT>), by and between:
      </p>
      <p>
        <DT term="TMG" def="Thiink Media Graphics, LLC — the creative studio. Also called the Studio or the Company throughout.">Thiink Media Graphics, LLC</DT>, a Georgia-registered creative studio with principal offices at 957 Main Street, Suite A #196, Stone Mountain, Georgia 30083 ("TMG," "Studio," or "Company"); and
      </p>
      <p>
        <DT term="MCF" def="My College Finance, LLC — the client. Founded by Joaquin Thompson Sr.">My College Finance, LLC</DT>, a Georgia limited liability company with principal offices at 741 Piedmont Ave NE, Atlanta, Georgia 30308, founded by Joaquin Thompson Sr. ("MCF" or "Client").
      </p>
      <p>Each a "Party," collectively the "Parties."</p>

      <h2 className="sub" style={{ marginTop: 48 }}>Recitals</h2>
      {pe.recitals ? (
        <PlainEnglish>
          You and TMG worked together in 2025 under a joint venture called KNGDM. KNGDM is gone. Everything TMG designed under it still belongs to TMG. Your right to keep using those designs continues — under this new agreement, written by TMG alone.
        </PlainEnglish>
      ) : (
        <>
          <p><strong>A.</strong>&nbsp;&nbsp;The Parties previously collaborated under a 2025 Marketing and Brand Development Contract (the <DT term="Prior Agreement" def="The 2025 contract between MCF and KNGDM, a now-dissolved joint venture.">"Prior Agreement"</DT>), executed between My College Finance and KNGDM — a joint venture between Thiink Media Graphics and an independent third party.</p>
          <p><strong>B.</strong>&nbsp;&nbsp;The KNGDM joint venture has been dissolved. All creative work, brand assets, frameworks, design systems, and intellectual property authored by Thiink Media Graphics under the Prior Agreement remain the property of Thiink Media Graphics. All licenses previously granted to MCF for TMG-authored deliverables continue uninterrupted under the terms of this Agreement.</p>
          <p><strong>C.</strong>&nbsp;&nbsp;The Parties wish to continue their working relationship under a refined scope of services delivered solely by Thiink Media Graphics, with terms reflecting the Studio's evolved practice and the Client's current strategic priorities.</p>
        </>
      )}
      <p style={{ marginTop: 32 }}><em>NOW, THEREFORE, in consideration of the mutual promises and covenants set forth herein, the Parties agree as follows:</em></p>
    </section>
  );
}

function SectionScope({ pe, setPE }) {
  return (
    <section id="scope" data-toc-num="I" data-toc-title="Scope of Services">
      <SectionHeader eyebrow="Section One" title="Scope of Services" peOn={pe.scope} onTogglePE={() => setPE("scope")} />
      {pe.scope ? (
        <PlainEnglish>
          TMG handles your brand, design, and product design work — logos, graphics, motion, photography direction, and the planning and structure for courses, apps, and tools you ship under MCF. Mustapha serves as your Creative Director in an advisory role only — not an employee, partner, or fiduciary. Anything outside that lane needs a written change order before work begins.
        </PlainEnglish>
      ) : (
        <p>During the Term, TMG shall provide the following services to MCF:</p>
      )}
      <h2 className="sub"><span className="num">1.1</span>Brand & Visual Production</h2>
      <ul>
        <li>Logo refinement, brand identity stewardship, and design system maintenance.</li>
        <li>Graphic design across print and digital formats — including social graphics, marketing collateral, presentations, and pitch decks.</li>
        <li>Motion design and short-form video editing.</li>
        <li>Photography direction, asset curation, and on-brand visual production.</li>
        <li>Ongoing oversight of brand integrity across all MCF external-facing materials.</li>
      </ul>

      <h2 className="sub"><span className="num">1.2</span>Online Course, Application & Tool Planning and Creation</h2>
      <ul>
        <li>Strategic planning and roadmapping for online courses, digital tools, and applications produced under MCF's brand.</li>
        <li>Wireframing, prototyping, and structural design of educational and utility products.</li>
        <li>Content architecture, user-flow mapping, and learning-experience design.</li>
        <li>Build coordination and technical oversight where applicable.</li>
      </ul>

      <h2 className="sub"><span className="num">1.3</span>Creative Director & Brand Strategist (Advisory)</h2>
      <p>For the duration of this Agreement, Mustapha C.A. Jr., Founder of Thiink Media Graphics, shall serve as <DT term="Creative Director & Brand Strategist (Advisory)" def="An advisory designation only. No employment, partnership, fiduciary duty, or equity is created by this title.">Creative Director & Brand Strategist (Advisory)</DT> to My College Finance. This is an advisory designation reflecting ongoing creative leadership over MCF's brand and product output. Mr. Acolatse retains independent contractor status. This arrangement does not constitute employment, partnership, or fiduciary duty to MCF, and shall not extend to corporate governance, equity participation, or operational management.</p>

      <h2 className="sub"><span className="num">1.4</span>Scope Limitation & Discontinued Services</h2>
      <p>The following services delivered under the Prior Agreement are not included in this Agreement: social media content scheduling, public relations outreach, partnership facilitation, and broad marketing campaign execution. Requests for these services are governed by §1.5 below.</p>
      <ChangeCallout label="What's no longer included" from="Social scheduling · PR · Partnerships · Campaign execution (2025)" to="Brand · Visual · Product design only (2026)" />

      <h2 className="sub"><span className="num">1.5</span>Scope Expansion</h2>
      <p>Any request from MCF that falls outside §§1.1–1.2 shall be submitted in writing. TMG will evaluate the request and, if accepted, issue a written <DT term="Change Order" def="A written, signed amendment specifying revised scope, timeline, and price. Text messages and verbal asks don't count.">change order</DT> specifying revised scope, timeline, and price. No additional work begins until both Parties have executed the change order.</p>
    </section>
  );
}

function SectionRoadmap({ pe, setPE }) {
  return (
    <section id="roadmap" data-toc-num="II" data-toc-title="Monthly Roadmap & Approval">
      <SectionHeader eyebrow="Section Two" title="Monthly Roadmap & Approval Process" peOn={pe.roadmap} onTogglePE={() => setPE("roadmap")} />
      {pe.roadmap && (
        <PlainEnglish>
          Each month: we meet in the first week. TMG writes a roadmap within 7 business days. You approve within 5. If you don't respond, the roadmap is conditionally approved and the clock resets to your eventual reply. Mid-month changes need a new change order.
        </PlainEnglish>
      )}
      <h3 className="sub"><span className="num">2.1</span>Strategy Discussion</h3>
      <p>Within the first five (5) business days of each calendar month, TMG and MCF will meet to discuss the course, tool, or application priority for that month.</p>
      <h3 className="sub"><span className="num">2.2</span>Roadmap Delivery</h3>
      <p>Within seven (7) business days following the strategy discussion, TMG will deliver a written roadmap to MCF specifying scope, deliverables, milestones, timelines, and any dependencies or pass-through costs.</p>
      <h3 className="sub"><span className="num">2.3</span>Client Approval</h3>
      <p>MCF shall review the roadmap and provide written approval — with revisions if needed — within five (5) business days of receipt. No build work commences until written approval is received.</p>
      <h3 className="sub"><span className="num">2.4</span>Approval Lapse</h3>
      <p>If MCF does not respond within the approval window in §2.3, the roadmap shall be deemed conditionally approved and timelines reset to the date of MCF's eventual response. TMG shall not be liable for delays caused by approval lapses.</p>
      <h3 className="sub"><span className="num">2.5</span>Mid-Month Pivots</h3>
      <p>Changes to an approved roadmap after work has begun require a new written change order under §1.5 and may affect timelines or pricing.</p>
    </section>
  );
}

function SectionPayment({ pe, setPE, params }) {
  return (
    <section id="payment" data-toc-num="III" data-toc-title="Payment Terms">
      <SectionHeader eyebrow="Section Three" title="Payment Terms" peOn={pe.payment} onTogglePE={() => setPE("payment")} />

      <h2 className="sub"><span className="num">3.1</span>Base Monthly Rate</h2>
      {pe.payment ? (
        <PlainEnglish>
          ${params.monthlyRate} per month, all in for the work in §§1.1–1.2. That includes a Zoom Workplace Pro seat for two. Adjusted down from last year — see the callout.
        </PlainEnglish>
      ) : (
        <p>MCF shall pay TMG <strong>${params.monthlyRate}.00 USD per month</strong> for the services described in §§1.1–1.2. This rate includes a Zoom Workplace Pro subscription (2 users) maintained by TMG for client collaboration.</p>
      )}
      <ChangeCallout from="$1,025 / month (2025)" to={`$${params.monthlyRate} / month (2026)`} label="Monthly rate" />

      <h2 className="sub"><span className="num">3.2</span>Invoicing</h2>
      <p>TMG will issue invoices monthly. Payment is due within ten (10) business days of invoice issue date. Accepted payment methods will be specified on each invoice.</p>

      <h2 className="sub"><span className="num">3.3</span>Additional Subscriptions & Pass-Through Costs</h2>
      <p>Any third-party subscriptions, software licenses, paid platforms, or tools required to execute MCF-approved scope beyond those bundled into §3.1 — for example, specialized course-hosting platforms, application infrastructure, premium AI tools, asset libraries, or font licenses — shall be billed to MCF <em>at cost</em>. TMG will disclose anticipated subscription costs at the time the related roadmap is presented under §2.2.</p>

      <h2 className="sub"><span className="num">3.4</span>Convenience Fee</h2>
      <p>For pass-through subscriptions and third-party costs managed on MCF's behalf by TMG under §3.3, TMG may add a <DT term="Convenience Fee" def="A 15% surcharge on pass-through subscription costs, covering account management and continuity.">convenience fee of fifteen percent (15%)</DT> of the subscription cost to cover administrative oversight, account management, and continuity. This fee will appear as a line-item on each affected invoice.</p>
      <SubscriptionCalculator monthlyRate={params.monthlyRate} feePct={params.feePct} />

      <h2 className="sub"><span className="num">3.5</span>Rush & Expedited Work</h2>
      <p>Any deliverable requested with a turnaround of less than seventy-two (72) hours from request to delivery shall incur a <strong>rush surcharge of twenty-five percent (25%)</strong> of the standard deliverable rate, in addition to the base monthly fee. Rush requests are accepted at TMG's sole discretion.</p>

      <h2 className="sub"><span className="num">3.6</span>Annual Rate Adjustment & Renewal</h2>
      <p>If the Parties elect to renew this Agreement after the initial Term, TMG reserves the right to adjust the base monthly rate by no less than seven percent (7%) to reflect inflation, scope evolution, and continued investment. Adjusted rates shall be disclosed in writing no fewer than thirty (30) days prior to renewal.</p>

      <h2 className="sub"><span className="num">3.7</span>Late Payment</h2>
      <p>Any invoice unpaid more than five (5) business days past its due date shall accrue a <strong>$50 late fee and 1.5% monthly interest</strong>, compounded monthly, until paid in full. TMG reserves the right to suspend services under §8.3 for any invoice ten (10) or more business days overdue.</p>

      <h2 className="sub"><span className="num">3.8</span>Taxes</h2>
      <p>Each Party is solely responsible for its own taxes arising from compensation received under this Agreement. TMG performs services as an independent contractor; MCF shall not withhold income or employment taxes on TMG's behalf.</p>

      <h2 className="sub"><span className="num">3.9</span>Non-Refundable Payments</h2>
      <p>All payments are non-refundable once work has been initiated, scheduled, or delivered, except as set forth in §8.7 (Refund Policy).</p>
    </section>
  );
}

function SectionParticipation({ pe, setPE }) {
  const items = [
    ["4.1", "Timely Materials & Feedback", "MCF agrees to provide all requested materials — including logins, assets, copy, approvals, and feedback — within three (3) business days of each request, unless otherwise agreed in writing."],
    ["4.2", "Platform Access", "MCF shall provide timely access to all platforms, accounts, and systems necessary for TMG to execute approved scope. Delays in granting access shift project deadlines accordingly without breach by TMG."],
    ["4.3", "Meetings", "MCF agrees to attend, or designate a delegate to attend, scheduled strategy meetings (typically within the first week of each month) and any milestone reviews scheduled by TMG."],
    ["4.4", "Communication Channels", "Official communications shall flow through email, scheduled video meetings (Zoom), and any project management or shared workspace TMG designates. Verbal or informal approvals are not binding under §1.5."],
    ["4.5", "Delay Acknowledgment", "Failure by MCF to participate, approve roadmaps, or supply materials may result in delayed deliverables. TMG shall not be liable for such delays. Continued non-participation may result in service suspension under §8.3 or termination under §8.5."],
  ];
  return (
    <section id="participation" data-toc-num="IV" data-toc-title="Client Participation">
      <SectionHeader eyebrow="Section Four" title="Client Participation & Responsibilities" peOn={pe.participation} onTogglePE={() => setPE("participation")} />
      {pe.participation && (
        <PlainEnglish>
          Reply to TMG within 3 business days. Show up for the monthly meeting. Grant the access we need to do the work. Silence isn't approval, but persistent silence shifts your deadlines and can pause the engagement.
        </PlainEnglish>
      )}
      {items.map(([n, h, body]) => (
        <React.Fragment key={n}>
          <h2 className="sub"><span className="num">{n}</span>{h}</h2>
          <p>{body}</p>
        </React.Fragment>
      ))}
    </section>
  );
}

function SectionCreative({ pe, setPE }) {
  const items = [
    ["5.1", "Creative Leadership", "TMG retains creative leadership across all brand-related deliverables. MCF may offer feedback and direction; final creative decisions on design execution rest with TMG to preserve brand integrity and the Studio's standard of work."],
    ["5.2", "Revision Rounds", "Each deliverable includes two (2) rounds of revisions. Additional revision rounds beyond the included two shall be billed at TMG's standard hourly rate or as a flat per-deliverable surcharge, disclosed in writing before additional work begins."],
    ["5.3", "Final Approval", "A deliverable is deemed accepted once MCF provides written approval, or once MCF has not provided substantive feedback within five (5) business days of delivery. Acceptance triggers any associated milestone billing if applicable."],
    ["5.4", "Ethical Alignment", "TMG reserves the right to decline, delay, or refuse any project or deliverable that, in its sole judgment, contradicts the Studio's values, brand integrity, or professional standards. TMG shall not be liable for refusing work on these grounds."],
  ];
  return (
    <section id="creative" data-toc-num="V" data-toc-title="Creative Direction">
      <SectionHeader eyebrow="Section Five" title="Creative Direction & Revisions" peOn={pe.creative} onTogglePE={() => setPE("creative")} />
      {pe.creative && (
        <PlainEnglish>
          TMG owns the design call. You guide intent, we guide execution. Two revision rounds per deliverable; more get billed. Five days of silence after a delivery counts as acceptance.
        </PlainEnglish>
      )}
      <div className="pullquote">Feedback shapes the work. Final calls protect it.</div>
      {items.map(([n, h, body]) => (
        <React.Fragment key={n}>
          <h2 className="sub"><span className="num">{n}</span>{h}</h2>
          <p>{body}</p>
        </React.Fragment>
      ))}
    </section>
  );
}

function SectionBrand({ pe, setPE }) {
  const items = [
    ["6.1", "Brand Integrity", "TMG is the lead creative authority over MCF's brand identity, design system, and visual output. MCF agrees not to publish derivative works, off-brand content, or unsanctioned campaigns built on TMG-authored materials without prior written approval."],
    ["6.2", "Mutual Confidentiality", "Both Parties shall hold confidential all non-public information shared under this Agreement — including strategies, financial data, system access credentials, audience data, work-in-progress, and vendor relationships. Confidentiality obligations survive termination for two (2) years; TMG's proprietary methods and frameworks are protected indefinitely."],
    ["6.3", "Exclusive Creative Partner", "For the Term of this Agreement, TMG shall be MCF's exclusive partner for brand identity, visual design, course and application design, and creative direction. MCF agrees not to engage any third-party agency, freelancer, or studio for overlapping services without first consulting TMG in writing. See also §7.7 (Right of First Refusal)."],
    ["6.4", "Competitive Engagements", "MCF shall not engage any third party to perform services that materially overlap with §§1.1–1.2 during the Term or for six (6) months following its expiration or termination, unless approved in writing by TMG."],
    ["6.5", "Non-Solicitation", "During the Term and for twelve (12) months after its conclusion, MCF shall not solicit, hire, or contract with any TMG team member, subcontractor, vendor, or strategic collaborator introduced through this engagement without TMG's written consent."],
    ["6.6", "Non-Circumvention", "MCF shall not circumvent or directly engage TMG-introduced vendors or collaborators during the Term or for twelve (12) months after, without written approval. Violation may result in damages up to the full value of the original engagement scope."],
    ["6.7", "Non-Disparagement", "MCF agrees not to publicly or privately disparage TMG, its founder, contractors, or affiliated brands during or after the Term. Disparagement shall be deemed reputational harm under §8.5."],
    ["6.8", "Security of Shared Materials", "MCF agrees to maintain reasonable security measures — including secure passwords, restricted user access, and encrypted file storage where possible — for confidential materials shared by TMG, and shall promptly notify TMG of any suspected unauthorized access or data breach."],
    ["6.9", "Ethical & Reputational Alignment", "MCF agrees to uphold standards of equity, inclusivity, and social responsibility across its platforms, campaigns, and partnerships. TMG reserves the right to withdraw from any campaign, project, or partnership that, in its sole judgment, conflicts with the Studio's values, visual identity, or ethical standards."],
  ];
  return (
    <section id="brand" data-toc-num="VI" data-toc-title="Brand Protection & Confidentiality">
      <SectionHeader eyebrow="Section Six" title="Brand Protection, Confidentiality & Exclusivity" peOn={pe.brand} onTogglePE={() => setPE("brand")} />
      {pe.brand && (
        <PlainEnglish>
          TMG is your only creative partner during the Term, and for six months after. Don't poach the team. Don't disparage. Confidentiality holds for two years; methods and frameworks, forever.
        </PlainEnglish>
      )}
      {items.map(([n, h, body]) => (
        <React.Fragment key={n}>
          <h2 className="sub"><span className="num">{n}</span>{h}</h2>
          <p>{body}</p>
        </React.Fragment>
      ))}
    </section>
  );
}

function SectionIP({ pe, setPE, params }) {
  const items = [
    ["7.1", "License Granted to MCF", "TMG grants MCF a non-exclusive, non-transferable, royalty-free license to use deliverables created under this Agreement for MCF's branded operations, platforms, campaigns, and internal communications. Licensed materials include logos, design assets, course/application/tool designs, marketing collateral, and similar finished outputs."],
    ["7.2", "Ownership of Underlying IP", "TMG retains ownership of all underlying source files, working assets, frameworks, design systems, strategic processes, prompt engineering, automation logic, and proprietary methodologies. All deliverables created under this Agreement are considered \"work made for hire\" as defined by U.S. copyright law, with TMG as the author and owner. To the extent any deliverable does not qualify as work made for hire, MCF irrevocably assigns all rights to TMG without further compensation beyond the payments outlined herein."],
    ["7.3", "Carry-Over of Prior Work", "All deliverables, frameworks, and intellectual property created by TMG — or contributed by TMG under the Prior Agreement / KNGDM joint venture — prior to the Effective Date shall be governed by this §7. MCF acknowledges and confirms that no transfer of ownership of TMG-authored intellectual property occurred under the Prior Agreement or its dissolution; such IP transitions to and remains with Thiink Media Graphics."],
    ["7.4", "MCF-Owned Materials", "This Agreement does not assign ownership of any content created independently by MCF without TMG's strategic input, frameworks, prompts, or design systems. Where TMG contributes materially to MCF-developed assets, those assets fall under §§7.1–7.2."],
    ["7.5", "Post-Term Use", "Upon expiration or non-renewal of this Agreement, MCF's license under §7.1 shall remain in effect for completed and fully paid deliverables, subject to attribution requirements under §7.8. Continued use of TMG-authored materials beyond expiration requires a separate licensing arrangement. TMG may, at its sole discretion, approve continued use, propose a renewal license, or decline."],
    ["7.6", "Reuse & Restrictions", "MCF agrees not to reverse-engineer, recreate, resell, sublicense, modify, or redistribute TMG-authored deliverables outside the scope of this Agreement. Any conversion of TMG-created assets into commercial products, courses, kits, templates, or third-party offerings requires a separate written licensing agreement and may carry revenue-share terms at TMG's discretion."],
    ["7.7", "Right of First Refusal", "During the Term and for six (6) months after, MCF shall give TMG the right of first refusal for any contracts involving brand identity, visual design, course/application/tool design, or related creative services. TMG shall have ten (10) business days to accept or decline in writing."],
    ["7.8", "Attribution & Credit", "MCF shall credit Thiink Media Graphics in any public distribution, presentation, pitch deck, or campaign featuring TMG-authored deliverables. Credit shall be clearly visible and reasonably prominent. Removal or minimization of attribution constitutes a breach of this section. Credit may be waived case-by-case in writing by TMG."],
    ["7.9", "SEO Attribution & Backlink", "MCF's website (mycollegefinance.com) shall display a backlink to www.thiinkmediagraphics.com in the footer credit (e.g., \"Designed by Thiink Media Graphics\" or equivalent language). This requirement is currently in effect and continues throughout the Term."],
    ["7.10", "Portfolio Rights", "TMG may display work created under this Agreement in its portfolio, case studies, social channels, and promotional materials. Sensitive or pre-release work will not be published without MCF's prior consent."],
    ["7.11", "Trademark Protection", "MCF shall not file for trademark, business registration, or domain protection of any names, slogans, taglines, visual identities, or systems created by TMG without TMG's prior written approval. Filings made in violation of this section do not constitute a valid transfer of intellectual property ownership, regardless of who funded the registration. MCF agrees to cooperate with TMG to assign, amend, or withdraw such filings."],
    ["7.12", "Liquidated Damages", "Any unauthorized use, distribution, modification, or third-party transfer of TMG-authored deliverables in violation of this §7 shall entitle TMG to liquidated damages of $5,000 USD per violation, in addition to actual damages, injunctive relief, and any other remedies available at law."],
  ];
  return (
    <section id="ip" data-toc-num="VII" data-toc-title="License, Ownership & IP">
      <SectionHeader eyebrow="Section Seven" title="License, Ownership & Intellectual Property" peOn={pe.ip} onTogglePE={() => setPE("ip")} />
      {pe.ip && (
        <PlainEnglish>
          TMG owns what TMG makes — source files, frameworks, prompts, automations. You get a perpetual license to use the finished work as long as it's paid for and credited. Revenue past $25K triggers a 5% royalty (see §7.13).
        </PlainEnglish>
      )}
      {items.map(([n, h, body]) => (
        <React.Fragment key={n}>
          <h2 className="sub"><span className="num">{n}</span>{h}</h2>
          <p>{body}</p>
        </React.Fragment>
      ))}

      <h2 className="sub"><span className="num">7.13</span>Revenue-Based Licensing</h2>
      <p>If MCF generates more than <strong>$25,000 USD</strong> in gross revenue from any product, platform, course, application, or campaign materially derived from TMG-created work, MCF shall notify TMG in writing within fifteen (15) business days. Unless renegotiated in writing, MCF shall pay TMG a royalty equal to <strong>five percent (5%) of gross revenue</strong> from such product or campaign, payable quarterly. This clause applies to both direct monetization (subscriptions, course sales, partnerships) and indirect monetization (sponsorships or funding obtained through use of TMG deliverables).</p>
      <RoyaltyPreview threshold={params.royaltyThreshold} pct={params.royaltyPct} />

      <h2 className="sub"><span className="num">7.14</span>Derivative Works</h2>
      <p>MCF shall not create, commission, or distribute derivative tools, platforms, or commercial offerings that replicate, white-label, or are materially based on TMG-developed strategic frameworks, systems, or deliverables without a written revenue-share or licensing agreement.</p>

      <h2 className="sub"><span className="num">7.15</span>Analytics & Data Ownership</h2>
      <p>Any dashboards, reports, or insights configured by TMG remain TMG's property. MCF holds a non-exclusive license to view and use this data for internal purposes only.</p>

      <h2 className="sub"><span className="num">7.16</span>AI & Automation Rights</h2>
      <p>Where deliverables are developed or supported using AI tools, automation workflows, or proprietary prompt engineering, TMG retains full rights to the underlying logic, prompts, datasets, and automation steps — even when deployed within MCF environments. These systems may not be replicated, reverse-engineered, or externally transferred without TMG's written consent.</p>

      <h2 className="sub"><span className="num">7.17</span>Audit Rights</h2>
      <p>TMG reserves the right to conduct an annual brand and intellectual property audit, with reasonable notice, to verify MCF's compliance with licensing, attribution, and brand integrity terms. Misuse discovered during audit may trigger royalty obligations, license revocation, or termination.</p>

      <h2 className="sub"><span className="num">7.18</span>Performance Incentives</h2>
      <p>If TMG's deliverables materially contribute to a verified milestone — funding raised, significant audience growth, partnerships secured, or revenue exceeding $25,000 — the Parties agree to meet within ten (10) business days to discuss a performance bonus, expanded scope, or elevated service tier. This clause signals a good-faith commitment to incentivize impact and continued collaboration.</p>
    </section>
  );
}

function SectionTerm({ pe, setPE }) {
  const items = [
    ["8.1", "Term", "This Agreement is effective June 1, 2026 and shall remain in effect for twelve (12) months, expiring May 31, 2027, unless terminated earlier under this section. This Agreement does not auto-renew. Renewal requires a new written agreement or executed amendment before expiration."],
    ["8.2", "Strategic Review", "At six (6) months and again at ten (10) months from the Effective Date, TMG and MCF will conduct a strategic review of partnership performance, scope alignment, and direction. These reviews inform any renewal, scope adjustment, or non-renewal decision."],
    ["8.3", "Service Suspension", "TMG may suspend services upon written notice if MCF (a) is more than ten (10) business days late on any invoice, (b) misses two (2) consecutive scheduled meetings without notice, or (c) fails to respond to three (3) consecutive project communications. Suspension shall not constitute breach by TMG; MCF's payment obligations continue during the suspension period until resolution."],
    ["8.4", "Termination for Convenience", "Either Party may terminate this Agreement for any reason by providing thirty (30) days' written notice. Work performed or approved through the termination date shall remain billable and payable in full."],
    ["8.6", "Early Termination Fee", "If MCF terminates this Agreement for convenience within the first ninety (90) calendar days from the Effective Date, MCF agrees to pay a one-time cancellation fee equal to one (1) additional month of services ($615), due within ten (10) business days of written termination notice. This amount is in addition to any outstanding balances for work already performed."],
    ["8.7", "Refund Policy", "All payments are non-refundable once work has been initiated or scheduled. Refunds will be considered only when: (a) TMG fails to deliver a clearly defined and agreed-upon deliverable; (b) MCF has submitted at least three (3) formal written notices regarding the deficiency; and (c) the issue remains unresolved thirty (30) days after written notice. Refunds, if approved, shall not exceed the value of the incomplete portion of work and are issued at TMG's sole discretion."],
    ["8.8", "Effects of Termination", "Upon termination or expiration, MCF's license under §7.1 remains valid only for completed and fully paid deliverables, subject to attribution and any post-term restrictions herein. All outstanding balances become immediately due. TMG is not obligated to share working files, drafts, source materials, or incomplete deliverables. TMG may revoke MCF access to shared platforms, project management tools, and proprietary systems configured by TMG."],
    ["8.9", "Deliverable Transfer", "Within ten (10) business days following full payment of all outstanding balances post-termination, TMG will deliver finalized, paid deliverables in standard formats (PNG, JPG, PDF, MP4). Source files — including Figma, PSD, raw video, automation logic, and Notion structures — remain TMG property and may be released only under a separate transfer fee agreement at TMG's discretion."],
    ["8.10", "Survival", "All provisions that by their nature should survive termination — including §§6 (Brand Protection & Confidentiality), 7 (License & IP), 10 (Indemnification), and any unpaid balances — shall remain in full force and effect after expiration or termination of this Agreement."],
  ];
  return (
    <section id="term" data-toc-num="VIII" data-toc-title="Term & Termination">
      <SectionHeader eyebrow="Section Eight" title="Term, Termination & Suspension" peOn={pe.term} onTogglePE={() => setPE("term")} />
      {pe.term && (
        <PlainEnglish>
          One-year term. No auto-renewal. Either side can leave with 30 days' notice. If you leave in the first 90 days, you owe one extra month ($615). Outstanding work and balances survive any termination.
        </PlainEnglish>
      )}
      <h2 className="sub"><span className="num">8.1</span>Term</h2>
      <p>This Agreement is effective <strong>June 1, 2026</strong> and shall remain in effect for twelve (12) months, expiring <strong>May 31, 2027</strong>, unless terminated earlier under this section. This Agreement does not auto-renew. Renewal requires a new written agreement or executed amendment before expiration.</p>
      {items.slice(1).map(([n, h, body]) => (
        <React.Fragment key={n}>
          <h2 className="sub"><span className="num">{n}</span>{h}</h2>
          <p>{body}</p>
        </React.Fragment>
      ))}
      <h2 className="sub"><span className="num">8.5</span>Termination for Cause</h2>
      <p>Either Party may terminate this Agreement immediately upon written notice if the other Party:</p>
      <ul>
        <li>Materially breaches any provision of this Agreement and fails to cure within fifteen (15) business days of receiving written notice;</li>
        <li>Engages in unlawful, unethical, or negligent conduct that materially compromises the quality, safety, or legal standing of the partnership;</li>
        <li>Fails to pay any invoice within fifteen (15) days of its due date without a written dispute or resolution plan;</li>
        <li>Engages in conduct, affiliations, or public statements that TMG reasonably determines to be reputationally harmful or misaligned with the Studio's values.</li>
      </ul>
      <p>TMG shall be the sole arbiter of reputational risk under the fourth bullet above. Termination under this section is deemed "for cause"; MCF remains liable for all outstanding fees and any termination-period work.</p>
    </section>
  );
}

function SectionWarranties({ pe, setPE }) {
  return (
    <section id="warranties" data-toc-num="IX" data-toc-title="Representations & Warranties">
      <SectionHeader eyebrow="Section Nine" title="Representations & Warranties" peOn={pe.warranties} onTogglePE={() => setPE("warranties")} />
      {pe.warranties && (
        <PlainEnglish>
          Each side promises they're allowed to sign. You vouch for the legality of materials you hand TMG. TMG promises professional execution — not specific revenue or growth outcomes. Compliance with FERPA, COPPA, and similar data laws is your job.
        </PlainEnglish>
      )}
      <h2 className="sub"><span className="num">9.1</span>Authority</h2>
      <p>Each Party represents and warrants that it has the full right, power, and authority to enter into and perform under this Agreement, and that doing so does not violate any other agreement or obligation.</p>
      <h2 className="sub"><span className="num">9.2</span>MCF-Provided Materials</h2>
      <p>MCF represents and warrants that any content, trademarks, logos, imagery, testimonials, or other materials it provides to TMG are either fully owned by MCF or properly licensed; do not infringe on third-party intellectual property rights; and are not false, misleading, defamatory, or otherwise unlawful. MCF agrees to indemnify and hold harmless TMG from any claims arising from MCF-provided materials.</p>
      <h2 className="sub"><span className="num">9.3</span>Accuracy of Information</h2>
      <p>MCF represents that all information it provides to TMG for use in deliverables — including statistics, testimonials, and factual claims — is accurate to the best of its knowledge. TMG is not responsible for verifying third-party facts or data supplied by MCF.</p>
      <h2 className="sub"><span className="num">9.4</span>Limited Warranty</h2>
      <p>TMG represents that all services will be delivered in a professional manner consistent with industry standards. TMG makes no guarantees as to specific outcomes, audience growth, revenue performance, or campaign results. All projections are offered in good faith based on available information.</p>
      <h2 className="sub"><span className="num">9.5</span>No Other Warranties</h2>
      <p>Except as expressly stated herein, TMG disclaims all warranties — express or implied — including warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
      <h2 className="sub"><span className="num">9.6</span>Data Privacy & Compliance</h2>
      <p>MCF is solely responsible for ensuring compliance with all applicable data privacy laws and student protection standards — including but not limited to <DT term="FERPA" def="The Family Educational Rights and Privacy Act — U.S. federal law protecting the privacy of student education records.">FERPA</DT>, <DT term="COPPA" def="The Children's Online Privacy Protection Act — protects the privacy of children under 13 online.">COPPA</DT>, GDPR, and applicable state student-data statutes. While TMG follows commercially reasonable data practices, it shall not be liable for misuse, breach, or noncompliance related to MCF's data handling, storage, or third-party integrations.</p>
    </section>
  );
}

function SectionIndemnity({ pe, setPE }) {
  return (
    <section id="indemnity" data-toc-num="X" data-toc-title="Indemnification & Liability">
      <SectionHeader eyebrow="Section Ten" title="Indemnification & Limitation of Liability" peOn={pe.indemnity} onTogglePE={() => setPE("indemnity")} />
      {pe.indemnity && (
        <PlainEnglish>
          You cover legal costs if your content causes claims. TMG covers them only for its own gross negligence or independent IP infringement. Indirect damages are off the table. Total liability is capped at the last 30 days of fees.
        </PlainEnglish>
      )}
      <h2 className="sub"><span className="num">10.1</span>Indemnification by MCF</h2>
      <p>MCF agrees to indemnify, defend, and hold harmless TMG, including its founder, contractors, and affiliates, from any third-party claims, losses, damages, liabilities, costs, and expenses (including reasonable attorneys' fees) arising from:</p>
      <ul>
        <li>Materials, data, or content provided by MCF for use in the services;</li>
        <li>Any breach by MCF of its representations, warranties, or obligations under this Agreement;</li>
        <li>Alleged infringement caused by content supplied or approved by MCF;</li>
        <li>Any conduct by MCF resulting in reputational harm, legal disputes, or platform penalties.</li>
      </ul>
      <h2 className="sub"><span className="num">10.2</span>Indemnification by TMG</h2>
      <p>TMG agrees to indemnify MCF from third-party claims only to the extent such claims arise directly from (a) unauthorized use of third-party intellectual property in materials independently created by TMG without MCF's input, or (b) gross negligence or intentional misconduct by TMG.</p>
      <h2 className="sub"><span className="num">10.3</span>Limitation of Liability</h2>
      <p>TMG shall not be liable for any indirect, incidental, special, consequential, punitive, or exemplary damages — including loss of revenue, opportunity, goodwill, or data — even if advised of the possibility of such damages. TMG's total aggregate liability under this Agreement shall not exceed the total amount paid by MCF to TMG in the thirty (30) days prior to the event giving rise to the claim.</p>
      <h2 className="sub"><span className="num">10.4</span>Third-Party Platforms</h2>
      <p>TMG shall not be held liable for any data loss, downtime, service interruption, breach, or performance limitation caused by third-party platforms, software, or tools integrated on MCF's behalf — including but not limited to Wix, Zoom, Notion, Firebase, Canva, Google Suite, course-hosting platforms, or payment processors.</p>
      <h2 className="sub"><span className="num">10.5</span>Insurance</h2>
      <p>TMG does not provide professional liability or errors-and-omissions insurance under this Agreement. MCF acknowledges that services rendered are strategic, creative, and advisory in nature, and agrees to secure its own general liability or professional insurance if desired.</p>
    </section>
  );
}

function SectionGeneral({ pe, setPE }) {
  return (
    <section id="general" data-toc-num="XI" data-toc-title="General Terms">
      <SectionHeader eyebrow="Section Eleven" title="General Terms" peOn={pe.general} onTogglePE={() => setPE("general")} />
      {pe.general && (
        <PlainEnglish>
          Independent contractor relationship. Georgia law. Disputes go to mediation first, then binding arbitration in DeKalb County. Subcontractors permitted. Electronic signatures are binding.
        </PlainEnglish>
      )}
      <h2 className="sub"><span className="num">11.1</span>Independent Contractor</h2>
      <p>TMG performs services as an independent contractor. Nothing in this Agreement creates an employment relationship, partnership, joint venture, or fiduciary duty between the Parties. TMG retains sole discretion over methods, processes, and resource allocation used to fulfill the scope of work.</p>
      <h2 className="sub"><span className="num">11.2</span>Governing Law</h2>
      <p>This Agreement shall be governed by and interpreted in accordance with the laws of the State of Georgia.</p>
      <h2 className="sub"><span className="num">11.3</span>Mediation Before Arbitration</h2>
      <p>Before initiating arbitration, the Parties shall attempt in good faith to resolve any dispute through informal mediation for a period of thirty (30) days from written notice of the dispute.</p>
      <h2 className="sub"><span className="num">11.4</span>Arbitration</h2>
      <p>If mediation fails, disputes arising out of or relating to this Agreement shall be submitted to binding arbitration under the rules of the American Arbitration Association (AAA), conducted confidentially in Stone Mountain, Georgia (or elsewhere in DeKalb County, Georgia). Arbitration costs — including filing fees, arbitrator fees, and administrative costs — shall be borne by MCF if MCF initiates the dispute or is found to have materially breached this Agreement, including TMG's legal representation fees, expert costs, and related expenses.</p>
      <h2 className="sub"><span className="num">11.5</span>Force Majeure</h2>
      <p>TMG shall not be liable for any delay, interruption, or failure in performance due to causes beyond its reasonable control — including acts of God, natural disasters, pandemics, cyberattacks, labor strikes, electrical or internet outages, government restrictions, legal orders, or unforeseen personal circumstances materially impacting key personnel.</p>
      <h2 className="sub"><span className="num">11.6 – 11.16</span>Additional Terms</h2>
      <p style={{ color: "color-mix(in oklab, var(--ink) 70%, transparent)" }}>Subcontractors, change management, entire agreement, severability, waiver, assignment, electronic signature, pre-existing work, successors, team-safety, and notice provisions. Hover any term to read in full, or expand all sections.</p>
    </section>
  );
}

// ---- Widgets -------------------------------------------------------------
function SubscriptionCalculator({ monthlyRate, feePct }) {
  const STARTERS = [
    { name: "Kajabi (course hosting)",       price: 199.00, hint: "Most-used by clients" },
    { name: "ChatGPT Team",                  price:  60.00, hint: "AI · 2 seats" },
    { name: "Adobe Creative Cloud",          price:  54.99, hint: "Design suite" },
    { name: "Figma Professional",            price:  15.00, hint: "Design system" },
    { name: "Notion Plus",                   price:  10.00, hint: "Docs & roadmaps" },
    { name: "Canva Pro",                     price:  14.99, hint: "Social assets" },
    { name: "Loom Business",                 price:  15.00, hint: "Async video" },
    { name: "Webflow CMS",                   price:  29.00, hint: "Marketing site" },
    { name: "Mailchimp Standard",            price:  20.00, hint: "Email list ≤500" },
  ];
  const [items, setItems] = useState([
    { id: "a", name: "Kajabi (course hosting)", price: 199.00 },
    { id: "b", name: "ChatGPT Team",            price:  60.00 },
  ]);
  const [showPresets, setShowPresets] = useState(false);
  const subsTotal = items.reduce((a, b) => a + (Number(b.price) || 0), 0);
  const fee = subsTotal * (feePct / 100);
  const total = monthlyRate + subsTotal + fee;
  function update(id, key, val) {
    setItems((arr) => arr.map((it) => it.id === id ? { ...it, [key]: key === "price" ? val : val } : it));
  }
  function remove(id) { setItems((arr) => arr.filter((it) => it.id !== id)); }
  function add(preset) {
    const id = Math.random().toString(36).slice(2, 8);
    if (preset) {
      setItems((arr) => [...arr, { id, name: preset.name, price: preset.price }]);
    } else {
      setItems((arr) => [...arr, { id, name: "", price: "" }]);
    }
    setShowPresets(false);
  }
  return (
    <div className="widget calc">
      <div className="widget__head">
        <div className="widget__title">
          Subscription Calculator
          <span className="widget__title-mark">§3.3 · 3.4</span>
        </div>
        <div className="calc__hint">Estimate any month's invoice. Type prices — the total updates live.</div>
      </div>

      <div className="calc__table">
        <div className="calc__head">
          <span>Pass-through subscription</span>
          <span>Monthly · USD</span>
          <span></span>
        </div>
        {items.length === 0 && (
          <div className="calc__empty">No pass-throughs this month. You owe the base rate only.</div>
        )}
        {items.map((it) => (
          <div key={it.id} className="calc__row">
            <input
              className="calc__name"
              placeholder="e.g. Wix Studio"
              value={it.name}
              onChange={(e) => update(it.id, "name", e.target.value)}
            />
            <div className="calc__price">
              <span className="calc__price-sign">$</span>
              <input
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={it.price}
                onChange={(e) => update(it.id, "price", e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
            <button className="calc__rm" onClick={() => remove(it.id)} aria-label="Remove">
              <svg width="12" height="12" viewBox="0 0 16 16"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" /></svg>
            </button>
          </div>
        ))}

        <div className="calc__actions">
          <button className="calc__add" onClick={() => add(null)}>
            <span>+</span> Add subscription
          </button>
          <button className="calc__presets" onClick={() => setShowPresets((s) => !s)}>
            {showPresets ? "Hide examples" : "Common examples"}
          </button>
        </div>

        {showPresets && (
          <div className="calc__preset-grid">
            {STARTERS.map((p) => (
              <button key={p.name} className="calc__preset" onClick={() => add(p)}>
                <strong>{p.name}</strong>
                <span>${p.price.toFixed(2)} <em>{p.hint}</em></span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="calc__split">
        <div className="calc__split-cell">
          <small>Base monthly</small>
          <strong>${monthlyRate.toFixed(2)}</strong>
          <em>§3.1 · fixed</em>
        </div>
        <div className="calc__split-cell">
          <small>Subscriptions at cost</small>
          <strong>${subsTotal.toFixed(2)}</strong>
          <em>{items.length} line item{items.length === 1 ? "" : "s"}</em>
        </div>
        <div className="calc__split-cell calc__split-cell--fee">
          <small>Convenience fee</small>
          <strong>${fee.toFixed(2)}</strong>
          <em>{feePct}% of pass-through</em>
        </div>
      </div>

      <div className="calc__total">
        <div>
          <span className="calc__total-label">Estimated invoice this month</span>
          <div className="calc__total-formula">
            ${monthlyRate.toFixed(2)} <span>base</span> + ${subsTotal.toFixed(2)} <span>subs</span> + ${fee.toFixed(2)} <span>{feePct}% fee</span>
          </div>
        </div>
        <div className="calc__total-value">${total.toFixed(2)}<small>USD</small></div>
      </div>

      {/* Benefits — justify the 15% */}
      <div className="calc__benefits">
        <div className="calc__benefits-eyebrow">What the 15% covers</div>
        <div className="calc__benefits-grid">
          <div className="calc__benefit">
            <div className="calc__benefit-mark">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2v3M10 15v3M2 10h3M15 10h3M4.2 4.2l2.1 2.1M13.7 13.7l2.1 2.1M4.2 15.8l2.1-2.1M13.7 6.3l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.4"/></svg>
            </div>
            <strong>One invoice, one card</strong>
            <p>Every vendor billed through TMG. No surprise charges, no chasing your card across nine dashboards.</p>
          </div>
          <div className="calc__benefit">
            <div className="calc__benefit-mark">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M10 5v5l3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            <strong>24–48 hr cancellation</strong>
            <p>Ask in writing; we cancel inside two business days at no extra fee. You won't be locked into a quarterly tool you've outgrown.</p>
          </div>
          <div className="calc__benefit">
            <div className="calc__benefit-mark">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 17c2-6 7-9 14-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M12 5l5 3-3 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <strong>Negotiated rates</strong>
            <p>Studio-tier discounts on Adobe, Figma, Kajabi, and others get passed through at cost — the fee usually still nets you a saving.</p>
          </div>
          <div className="calc__benefit">
            <div className="calc__benefit-mark">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2l7 4v5c0 4-3 7-7 8-4-1-7-4-7-8V6l7-4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <strong>Receipts &amp; account hygiene</strong>
            <p>2FA, password rotations, billing receipts, and a quarterly stack audit. If TMG offboards, your accounts transfer cleanly.</p>
          </div>
        </div>
        <div className="calc__benefits-footer">
          Disclosed up-front under §2.2. Line-itemed on every invoice. No fee on month-to-month base services.
        </div>
      </div>
    </div>
  );
}

function RoyaltyPreview({ threshold, pct }) {
  const [rev, setRev] = useState(75000);
  const [mode, setMode] = useState("slider"); // slider | type
  const royalty = rev > threshold ? (rev * pct) / 100 : 0;
  const keep = rev - royalty;
  const keepPct = rev > 0 ? (keep / rev) * 100 : 100;
  const crossed = rev > threshold;
  const sliderMax = 250000;
  const pctOfBar = Math.min(100, (rev / sliderMax) * 100);
  const thresholdPct = (threshold / sliderMax) * 100;
  const fmt = (n) => "$" + Math.round(n).toLocaleString();

  return (
    <div className="widget royalty">
      <div className="widget__head">
        <div className="widget__title">
          What you keep, what we share
          <span className="widget__title-mark">§7.13</span>
        </div>
        <div className="calc__hint">Model the revenue from a course, app, or campaign built on TMG-designed work.</div>
      </div>

      <div className="royalty__input-card">
        <div className="royalty__input-head">
          <span className="royalty__input-label">Your annual gross revenue</span>
          <div className="royalty__mode">
            <button className={mode === "slider" ? "is-on" : ""} onClick={() => setMode("slider")}>Slide</button>
            <button className={mode === "type" ? "is-on" : ""} onClick={() => setMode("type")}>Type</button>
          </div>
        </div>

        {mode === "type" ? (
          <div className="royalty__type">
            <span className="royalty__type-sign">$</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="500"
              value={rev}
              onChange={(e) => setRev(Math.max(0, Number(e.target.value) || 0))}
            />
            <span className="royalty__type-suffix">/ year</span>
          </div>
        ) : (
          <div className="royalty__display">{fmt(rev)}<small>/ year</small></div>
        )}

        {mode === "slider" && (
          <>
            <input
              type="range"
              className="widget__slider royalty__slider"
              min="0"
              max={sliderMax}
              step="500"
              value={rev}
              onChange={(e) => setRev(+e.target.value)}
            />
            <div className="royalty__track">
              <div className="royalty__track-fill" style={{ width: pctOfBar + "%" }} />
              <div className="royalty__track-marker" style={{ left: thresholdPct + "%" }}>
                <span>${(threshold / 1000)}K threshold</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Hero outcome — what client keeps */}
      <div className="royalty__hero">
        <div className="royalty__hero-eyebrow">You keep</div>
        <div className="royalty__hero-value">
          {fmt(keep)}
          <small>{keepPct.toFixed(1)}% of your revenue</small>
        </div>
        <div className="royalty__hero-bar">
          <div className="royalty__hero-bar-fill" style={{ width: keepPct + "%" }} />
        </div>
        <div className="royalty__hero-legend">
          <span><i className="dot dot--keep" /> Yours</span>
          <span><i className="dot dot--share" /> Shared with TMG</span>
        </div>
      </div>

      {/* Smaller TMG share line */}
      <div className={`royalty__share ${crossed ? "is-on" : ""}`}>
        <div className="royalty__share-left">
          <div className="royalty__share-label">{crossed ? "Shared with TMG" : "TMG royalty (not triggered)"}</div>
          <div className="royalty__share-formula">
            {crossed ? <>{pct}% of {fmt(rev)} — paid quarterly</> : <>Kicks in once revenue clears ${threshold.toLocaleString()}</>}
          </div>
        </div>
        <div className="royalty__share-value">{fmt(royalty)}<small>/ year</small></div>
      </div>
      <div className="royalty__share-sub">
        <span><strong>${(royalty / 12).toFixed(0)}</strong> per month average</span>
        <span><strong>${(royalty / 4).toFixed(0)}</strong> per quarterly payment</span>
      </div>

      {/* Benefits — why this clause is good for the client */}
      <div className="calc__benefits royalty__benefits">
        <div className="calc__benefits-eyebrow">Why this is built this way</div>
        <div className="calc__benefits-grid">
          <div className="calc__benefit">
            <div className="calc__benefit-mark">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 16V6M7 16V9M11 16v-5M15 16V4M19 16H1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </div>
            <strong>$0 below the threshold</strong>
            <p>Build, ship, and validate up to $25K without a single royalty payment. The clause never triggers on early-stage experiments.</p>
          </div>
          <div className="calc__benefit">
            <div className="calc__benefit-mark">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 18s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0117 8c0 5.5-7 10-7 10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>
            </div>
            <strong>95% stays with MCF</strong>
            <p>Once it triggers, 95 cents of every dollar still come home to you. The 5% keeps the studio invested in the asset's long-term performance.</p>
          </div>
          <div className="calc__benefit">
            <div className="calc__benefit-mark">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.4"/><path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <strong>No equity, no board seat</strong>
            <p>A flat revenue share replaces equity. TMG never asks for ownership, dilution, or governance — the upside stays with you and your cap table.</p>
          </div>
          <div className="calc__benefit">
            <div className="calc__benefit-mark">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 17c2-6 7-9 14-9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M12 5l5 3-3 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <strong>Performance bonus unlocks</strong>
            <p>Crossing the threshold also opens §7.18 — a 10-day window to renegotiate scope, bonuses, or an elevated service tier in your favor.</p>
          </div>
        </div>
        <div className="calc__benefits-footer">
          Renegotiable in writing. Quarterly payment cadence. Notify within 15 business days of crossing the threshold (§7.13).
        </div>
      </div>
    </div>
  );
}

// Export to window
Object.assign(window, {
  DT, PETogglePill, SectionHeader, PlainEnglish, ChangeCallout,
  SectionRecitals, SectionScope, SectionRoadmap, SectionPayment,
  SectionParticipation, SectionCreative, SectionBrand, SectionIP,
  SectionTerm, SectionWarranties, SectionIndemnity, SectionGeneral,
  SubscriptionCalculator, RoyaltyPreview,
});
