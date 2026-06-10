/* contract-content-rev2.jsx — REV. 2 OVERRIDES (June 2026 negotiated revisions)
   Loads AFTER contract-content.jsx and redefines only the amended sections:
   §5 (creative authority → MCF), §6 (post-term non-compete deleted),
   §7 (ownership flip + royalty election + right to bid + narrowed audit),
   §8 (objective reputational standard + buyout schedule + offboarding window),
   plus the two-option royalty calculator. All other sections, components, and
   styling come from the original file unchanged. */
const { useState: r2State } = React;

// ---- "Updated" callout shown at top of each amended section ---------------
function UpdatedCallout({ children }) {
  return (
    <div className="rev2-note">
      <div className="rev2-note__label">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l1.8 3.9 4.2.5-3.1 2.9.8 4.2L8 11l-3.7 2 .8-4.2L2 5.9l4.2-.5L8 1.5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/></svg>
        Updated in response to your feedback — June 2026
      </div>
      <p>{children}</p>
    </div>
  );
}

// ---- §5 · Creative Direction (final authority → MCF) -----------------------
function SectionCreative({ pe, setPE }) {
  const items = [
    ["5.1", "Creative Leadership & Final Approval", "TMG leads creative development across all brand-related deliverables; MCF holds final approval on all deliverables. Where TMG creatively disagrees with an approved direction, TMG may remove its credit from the affected deliverable and decline to feature it in the Studio's portfolio. TMG may refuse to execute work that violates the established brand guide, provided TMG first documents the conflict in writing and completes one escalation discussion with MCF before any refusal."],
    ["5.2", "Revision Rounds", "Each deliverable includes two (2) rounds of revisions. Additional revision rounds beyond the included two shall be billed at TMG's standard hourly rate or as a flat per-deliverable surcharge, disclosed in writing before additional work begins."],
    ["5.3", "Final Approval", "A deliverable is deemed accepted once MCF provides written approval, or once MCF has not provided substantive feedback within five (5) business days of delivery. Acceptance triggers any associated milestone billing if applicable."],
    ["5.4", "Ethical Alignment", "TMG reserves the right to decline, delay, or refuse any project or deliverable that, in its sole judgment, contradicts the Studio's values, brand integrity, or professional standards. TMG shall not be liable for refusing work on these grounds."],
  ];
  return (
    <section id="creative" data-toc-num="V" data-toc-title="Creative Direction">
      <SectionHeader eyebrow="Section Five" title="Creative Direction & Revisions" peOn={pe.creative} onTogglePE={() => setPE("creative")} />
      <UpdatedCallout>Final creative authority now rests with MCF — TMG's protection is credit removal and a documented escalation step, not veto power.</UpdatedCallout>
      {pe.creative && (
        <PlainEnglish>
          You hold the final call on every deliverable. TMG still leads the craft — and can take its name off work it disagrees with, or decline work that breaks your own brand guide, but only after putting the conflict in writing and talking it through with you first. Two revision rounds per deliverable; five days of silence after a delivery still counts as acceptance.
        </PlainEnglish>
      )}
      <div className="pullquote">Your brand, your final call. Our craft, our name.</div>
      {items.map(([n, h, body]) => (
        <React.Fragment key={n}>
          <h2 className="sub"><span className="num">{n}</span>{h}</h2>
          <p>{body}</p>
        </React.Fragment>
      ))}
    </section>
  );
}

// ---- §6 · Brand Protection (post-term non-compete deleted; renumbered) -----
function SectionBrand({ pe, setPE }) {
  const items = [
    ["6.1", "Brand Integrity", "TMG is the lead creative authority over MCF's brand identity, design system, and visual output. MCF agrees not to publish derivative works, off-brand content, or unsanctioned campaigns built on TMG-authored materials without prior written approval."],
    ["6.2", "Mutual Confidentiality", "Both Parties shall hold confidential all non-public information shared under this Agreement — including strategies, financial data, system access credentials, audience data, work-in-progress, and vendor relationships. Confidentiality obligations survive termination for two (2) years; TMG's proprietary methods and frameworks are protected indefinitely."],
    ["6.3", "Exclusive Creative Partner (During the Term)", "For the Term of this Agreement, TMG shall be MCF's exclusive partner for brand identity, visual design, course and application design, and creative direction. MCF agrees not to engage any third-party agency, freelancer, or studio for overlapping services during the Term without first consulting TMG in writing. This exclusivity ends upon expiration or termination of the Agreement. See also §7.7 (Right to Bid)."],
    ["6.4", "Non-Solicitation", "During the Term and for twelve (12) months after its conclusion, MCF shall not solicit, hire, or contract with any TMG team member, subcontractor, vendor, or strategic collaborator introduced through this engagement without TMG's written consent."],
    ["6.5", "Non-Circumvention", "MCF shall not circumvent or directly engage TMG-introduced vendors or collaborators during the Term or for twelve (12) months after, without written approval. Violation may result in damages up to the full value of the original engagement scope."],
    ["6.6", "Non-Disparagement", "MCF agrees not to publicly or privately disparage TMG, its founder, contractors, or affiliated brands during or after the Term. Disparagement is assessed under the reasonable-person standard and notice-and-cure process in §8.5."],
    ["6.7", "Security of Shared Materials", "MCF agrees to maintain reasonable security measures — including secure passwords, restricted user access, and encrypted file storage where possible — for confidential materials shared by TMG, and shall promptly notify TMG of any suspected unauthorized access or data breach."],
    ["6.8", "Ethical & Reputational Alignment", "MCF agrees to uphold standards of equity, inclusivity, and social responsibility across its platforms, campaigns, and partnerships. TMG reserves the right to withdraw from any campaign, project, or partnership that, in its sole judgment, conflicts with the Studio's values, visual identity, or ethical standards."],
  ];
  return (
    <section id="brand" data-toc-num="VI" data-toc-title="Brand Protection & Confidentiality">
      <SectionHeader eyebrow="Section Six" title="Brand Protection, Confidentiality & Exclusivity" peOn={pe.brand} onTogglePE={() => setPE("brand")} />
      <UpdatedCallout>The 6-month post-term non-compete has been deleted — exclusivity now ends the day the Term does, and the former §§6.5–6.9 renumber to §§6.4–6.8.</UpdatedCallout>
      {pe.brand && (
        <PlainEnglish>
          TMG is your only creative partner during the Term — but the moment the Term ends, you're free. The old six-month post-term restriction is gone. Don't poach the team for twelve months, don't disparage, and keep shared materials secure. Confidentiality holds for two years; methods and frameworks, forever.
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

// ---- §7 · License & IP (ownership flip + royalty election) ------------------
function RoyaltyElection({ params }) {
  return (
    <div className="election-grid">
      <div className="election-card">
        <div className="election-card__tag">Option A</div>
        <div className="election-card__rate">$615<small>/ month</small></div>
        <div className="election-card__terms">
          <div>+ 5% royalty — <strong>only</strong> on products TMG materially designed</div>
          <div>Triggers only above <strong>$50,000</strong> annual gross revenue per product</div>
          <div>Royalty <strong>ends 36 months</strong> after each product's launch</div>
        </div>
        <div className="election-card__fit">Lower fixed cost — best while products are pre-revenue or early.</div>
      </div>
      <div className="election-card">
        <div className="election-card__tag">Option B</div>
        <div className="election-card__rate">$1,025<small>/ month</small></div>
        <div className="election-card__terms">
          <div><strong>No royalty whatsoever</strong> — ever, on anything</div>
          <div>No revenue reporting, no thresholds, no audits</div>
          <div>Flat, predictable retainer for the full Term</div>
        </div>
        <div className="election-card__fit">Higher fixed cost — best once products are earning well past $50K.</div>
      </div>
    </div>
  );
}

function SectionIP({ pe, setPE, params }) {
  const items = [
    ["7.1", "Ownership of Final Deliverables", "Upon full payment for the applicable deliverable, MCF owns all final deliverables created under this Agreement, together with its complete brand identity — logos, names, slogans, taglines, visual identities, and the right to file trademarks on them. Ownership transfers automatically upon full payment; no further assignment document is required, though TMG will execute reasonable confirmations of ownership on request."],
    ["7.2", "TMG Pre-Existing IP & Working Materials", "TMG retains ownership of all pre-existing intellectual property and all materials underlying the finished work — frameworks, design systems, methodologies, strategic processes, prompt engineering, automation logic, working files, source files, and templates. TMG also retains a perpetual right to display delivered work in its portfolio and to receive credit, per §§7.8 and 7.10. Nothing in this Agreement transfers ownership of TMG's underlying systems or pre-existing IP to MCF."],
    ["7.3", "Carry-Over of Prior Work", "All deliverables, frameworks, and intellectual property created by TMG — or contributed by TMG under the Prior Agreement / KNGDM joint venture — prior to the Effective Date shall be governed by this §7. MCF acknowledges and confirms that no transfer of ownership of TMG-authored intellectual property occurred under the Prior Agreement or its dissolution; such IP transitions to and remains with Thiink Media Graphics."],
    ["7.4", "MCF-Owned Materials", "This Agreement does not affect ownership of any content created independently by MCF without TMG's strategic input, frameworks, prompts, or design systems. Where TMG contributes materially to MCF-developed assets, those assets fall under §§7.1–7.2."],
    ["7.5", "Post-Term Use", "Expiration or termination of this Agreement does not affect MCF's ownership of completed, fully paid deliverables under §7.1. Continued use of TMG's underlying systems, templates, or frameworks beyond the delivered work requires a separate licensing arrangement."],
    ["7.6", "Reuse & Restrictions", "MCF may freely use, modify, and commercialize the final deliverables it owns under §7.1. MCF agrees not to resell, sublicense, white-label, or redistribute TMG's underlying frameworks, templates, design systems, or working files retained under §7.2 without a separate written licensing agreement."],
    ["7.7", "Right to Bid (Non-Binding)", "During the Term, MCF shall give TMG written notice of any planned engagement involving brand identity, visual design, course/application/tool design, or related creative services, and TMG may submit a proposal within ten (10) business days of that notice. MCF is free to select any vendor. This section creates a notice-and-bid opportunity only; it does not obligate MCF to accept TMG's proposal or to delay its selection beyond the ten-day window."],
    ["7.8", "Attribution & Credit", "MCF shall credit Thiink Media Graphics in any public distribution, presentation, pitch deck, or campaign featuring TMG-designed deliverables, except where TMG has removed its credit under §5.1. Credit shall be clearly visible and reasonably prominent. Credit may be waived case-by-case in writing by TMG."],
    ["7.9", "SEO Attribution & Backlink", "MCF's website (mycollegefinance.com) shall display a backlink to www.thiinkmediagraphics.com in the footer credit (e.g., \"Designed by Thiink Media Graphics\" or equivalent language). This requirement is currently in effect and continues throughout the Term."],
    ["7.10", "Portfolio Rights (Perpetual)", "TMG retains a perpetual right to display work created under this Agreement in its portfolio, case studies, social channels, and promotional materials, except work for which TMG has declined portfolio use under §5.1. Sensitive or pre-release work will not be published without MCF's prior consent."],
    ["7.11", "Trademark Rights & Cooperation", "MCF holds the right to file for trademark, business registration, and domain protection of the names, slogans, taglines, and visual identities it owns under §7.1, and TMG agrees to cooperate with reasonable requests supporting such filings. MCF shall not file for protection of TMG's pre-existing IP, frameworks, or systems retained under §7.2."],
    ["7.12", "Liquidated Damages", "Any unauthorized resale, sublicense, white-labeling, or third-party transfer of TMG-owned materials retained under §7.2 shall entitle TMG to liquidated damages of $5,000 USD per violation, in addition to actual damages, injunctive relief, and any other remedies available at law."],
  ];
  return (
    <section id="ip" data-toc-num="VII" data-toc-title="License, Ownership & IP">
      <SectionHeader eyebrow="Section Seven" title="License, Ownership & Intellectual Property" peOn={pe.ip} onTogglePE={() => setPE("ip")} />
      <UpdatedCallout>Ownership of final deliverables and your full brand identity — trademark filing rights included — now transfers to MCF on full payment, and the royalty is a two-option election with a $50K threshold and a 36-month cap.</UpdatedCallout>
      {pe.ip && (
        <PlainEnglish>
          You own the finished work and your whole brand identity — logos, names, trademark rights — the moment it's fully paid for. TMG keeps what's underneath: frameworks, working files, systems, plus a permanent portfolio credit. And the royalty is now your choice: $615/month with a 5% royalty only on TMG-designed products above $50K a year (ending 36 months after each launch), or $1,025/month flat with no royalty ever.
        </PlainEnglish>
      )}
      {items.map(([n, h, body]) => (
        <React.Fragment key={n}>
          <h2 className="sub"><span className="num">{n}</span>{h}</h2>
          <p>{body}</p>
        </React.Fragment>
      ))}

      <h2 className="sub"><span className="num">7.13</span>Royalty Election</h2>
      <p>At signature, MCF shall elect in writing one of the two compensation structures below. <strong>Option A — $615/month plus royalty:</strong> a royalty equal to <strong>five percent (5%) of gross revenue</strong> applies only to products, courses, applications, or campaigns <em>materially designed by TMG</em>, and only once a product's annual gross revenue exceeds <strong>$50,000 USD</strong>. The royalty obligation for each product expires <strong>thirty-six (36) months after that product's launch</strong>. Under Option A, MCF shall notify TMG in writing within fifteen (15) business days of a product crossing the threshold; royalties are payable quarterly. <strong>Option B — $1,025/month, no royalty:</strong> a flat monthly retainer with no royalty obligation of any kind, no revenue reporting, and no royalty audits.</p>
      <RoyaltyElection params={params} />
      <RoyaltyPreviewRev2 threshold={params.royaltyThreshold} pct={params.royaltyPct} optionARate={params.optionARate} optionBRate={params.optionBRate} capMonths={params.royaltyCapMonths} />

      <h2 className="sub"><span className="num">7.14</span>Derivative Works</h2>
      <p>MCF shall not create, commission, or distribute derivative tools, platforms, or commercial offerings that replicate, white-label, or are materially based on TMG-developed strategic frameworks, systems, or working materials retained under §7.2 without a written revenue-share or licensing agreement.</p>

      <h2 className="sub"><span className="num">7.15</span>Analytics & Data Ownership</h2>
      <p>Any dashboards, reports, or insights configured by TMG remain TMG's property. MCF holds a non-exclusive license to view and use this data for internal purposes only.</p>

      <h2 className="sub"><span className="num">7.16</span>AI & Automation Rights</h2>
      <p>Where deliverables are developed or supported using AI tools, automation workflows, or proprietary prompt engineering, TMG retains full rights to the underlying logic, prompts, datasets, and automation steps — even when deployed within MCF environments. These systems may not be replicated, reverse-engineered, or externally transferred without TMG's written consent.</p>

      <h2 className="sub"><span className="num">7.17</span>Royalty Verification Audit</h2>
      <p>Applicable only if Option A is elected under §7.13. TMG may conduct an audit solely to verify royalty calculations on TMG-designed products, no more than once in any twelve (12) month period, upon ten (10) business days' advance written notice. TMG shall hold all reviewed records in strict confidence and use them solely for royalty verification. If Option B is elected, no audit right exists under this Agreement.</p>

      <h2 className="sub"><span className="num">7.18</span>Performance Incentives</h2>
      <p>If TMG's deliverables materially contribute to a verified milestone — funding raised, significant audience growth, partnerships secured, or revenue exceeding $50,000 — the Parties agree to meet within ten (10) business days to discuss a performance bonus, expanded scope, or elevated service tier. This clause signals a good-faith commitment to incentivize impact and continued collaboration.</p>
    </section>
  );
}

// ---- §8 · Term & Termination (objective standard + buyout schedule) --------
function FeeSchedule() {
  const rows = [
    ["Brand identity masters (logo AI / SVG / Figma)", "$1,500"],
    ["Design system & component library (Figma)", "$2,500"],
    ["Marketing collateral source files (PSD / AI), per campaign", "$350"],
    ["Motion & video project files, per deliverable", "$450"],
    ["Course / app / tool design files (flows, prototypes)", "$1,800"],
    ["Automation logic & Notion structures", "$950"],
  ];
  return (
    <div className="fee-table">
      <div className="fee-table__head">
        <span>Source-file buyout schedule — fixed, one-time fees</span>
        <span>USD</span>
      </div>
      {rows.map(([label, price]) => (
        <div key={label} className="fee-table__row">
          <span>{label}</span>
          <strong>{price}</strong>
        </div>
      ))}
      <div className="fee-table__foot">Per asset category · includes packaging and transfer · categories not listed are quoted on request.</div>
    </div>
  );
}

function SectionTerm({ pe, setPE }) {
  const itemsA = [
    ["8.2", "Strategic Review", "At six (6) months and again at ten (10) months from the Effective Date, TMG and MCF will conduct a strategic review of partnership performance, scope alignment, and direction. These reviews inform any renewal, scope adjustment, or non-renewal decision."],
    ["8.3", "Service Suspension", "TMG may suspend services upon written notice if MCF (a) is more than ten (10) business days late on any invoice, (b) misses two (2) consecutive scheduled meetings without notice, or (c) fails to respond to three (3) consecutive project communications. Suspension shall not constitute breach by TMG; MCF's payment obligations continue during the suspension period until resolution."],
    ["8.4", "Termination for Convenience", "Either Party may terminate this Agreement for any reason by providing thirty (30) days' written notice. Work performed or approved through the termination date shall remain billable and payable in full."],
  ];
  const itemsB = [
    ["8.6", "Early Termination Fee", "If MCF terminates this Agreement for convenience within the first ninety (90) calendar days from the Effective Date, MCF agrees to pay a one-time cancellation fee equal to one (1) additional month of services ($615), due within ten (10) business days of written termination notice. This amount is in addition to any outstanding balances for work already performed."],
    ["8.7", "Refund Policy", "All payments are non-refundable once work has been initiated or scheduled. Refunds will be considered only when: (a) TMG fails to deliver a clearly defined and agreed-upon deliverable; (b) MCF has submitted at least three (3) formal written notices regarding the deficiency; and (c) the issue remains unresolved thirty (30) days after written notice. Refunds, if approved, shall not exceed the value of the incomplete portion of work and are issued at TMG's sole discretion."],
    ["8.8", "Effects of Termination", "Upon termination or expiration, MCF retains ownership of all completed and fully paid deliverables under §7.1. All outstanding balances become immediately due. TMG may revoke MCF access to shared platforms, project management tools, and proprietary systems configured by TMG, subject to the Offboarding Window in §8.9."],
  ];
  return (
    <section id="term" data-toc-num="VIII" data-toc-title="Term & Termination">
      <SectionHeader eyebrow="Section Eight" title="Term, Termination & Suspension" peOn={pe.term} onTogglePE={() => setPE("term")} />
      <UpdatedCallout>The sole-arbiter clause is gone — reputational-harm termination now requires objective grounds, 15 days' written notice, and a chance to cure — and §8.9 adds a published source-file buyout schedule plus a free 30-day offboarding window.</UpdatedCallout>
      {pe.term && (
        <PlainEnglish>
          One-year term. No auto-renewal. Either side can leave with 30 days' notice; leaving in the first 90 days costs one extra month ($615). "Reputational harm" is now judged by what a reasonable person would think — with 15 days' written notice and a chance to fix it, not TMG's sole say-so. And when the engagement ends, you get 30 days to export everything you own for free, with fixed published prices if you ever want the source files.
        </PlainEnglish>
      )}
      <h2 className="sub"><span className="num">8.1</span>Term</h2>
      <p>This Agreement is effective <strong>June 1, 2026</strong> and shall remain in effect for twelve (12) months, expiring <strong>May 31, 2027</strong>, unless terminated earlier under this section. This Agreement does not auto-renew. Renewal requires a new written agreement or executed amendment before expiration.</p>
      {itemsA.map(([n, h, body]) => (
        <React.Fragment key={n}>
          <h2 className="sub"><span className="num">{n}</span>{h}</h2>
          <p>{body}</p>
        </React.Fragment>
      ))}
      <h2 className="sub"><span className="num">8.5</span>Termination for Cause</h2>
      <p>Either Party may terminate this Agreement upon written notice if the other Party:</p>
      <ul>
        <li>Materially breaches any provision of this Agreement and fails to cure within fifteen (15) business days of receiving written notice;</li>
        <li>Engages in unlawful, unethical, or negligent conduct that materially compromises the quality, safety, or legal standing of the partnership;</li>
        <li>Fails to pay any invoice within fifteen (15) days of its due date without a written dispute or resolution plan;</li>
        <li>Engages in conduct, affiliations, or public statements that a <DT term="Reasonable-Person Standard" def="An objective test: would a reasonable person in the same industry, knowing the facts, consider the conduct materially harmful to the other Party's reputation? Neither Party is the sole judge.">reasonable person in the same industry would consider materially harmful</DT> to the other Party's reputation.</li>
      </ul>
      <p>Termination for reputational harm under the fourth bullet requires fifteen (15) days' prior written notice describing the specific conduct at issue and an opportunity to cure within that period. The standard is objective; neither Party is the sole arbiter. Termination under this section is deemed "for cause"; MCF remains liable for all outstanding fees and any termination-period work.</p>
      {itemsB.map(([n, h, body]) => (
        <React.Fragment key={n}>
          <h2 className="sub"><span className="num">{n}</span>{h}</h2>
          <p>{body}</p>
        </React.Fragment>
      ))}
      <h2 className="sub"><span className="num">8.9</span>Deliverable Transfer, Offboarding & Source-File Buyout</h2>
      <p>Within ten (10) business days following full payment of all outstanding balances post-termination, TMG will deliver finalized, paid deliverables in standard formats (PNG, JPG, PDF, MP4). For <strong>thirty (30) calendar days</strong> following termination or expiration (the <DT term="Offboarding Window" def="A 30-day period after the engagement ends during which MCF may export all of its content, data, and completed deliverables at no charge.">"Offboarding Window"</DT>), MCF may export all of its content, data, and completed deliverables at no charge. Source files may be purchased at any time at the fixed prices published below:</p>
      <FeeSchedule />
      <h2 className="sub"><span className="num">8.10</span>Survival</h2>
      <p>All provisions that by their nature should survive termination — including §§6 (Brand Protection & Confidentiality), 7 (License & IP), 10 (Indemnification), and any unpaid balances — shall remain in full force and effect after expiration or termination of this Agreement.</p>
    </section>
  );
}

// ---- Two-option royalty calculator ------------------------------------------
function RoyaltyPreviewRev2({ threshold, pct, optionARate, optionBRate, capMonths }) {
  const [rev, setRev] = r2State(75000);
  const [option, setOption] = r2State("A");
  const sliderMax = 250000;
  const royaltyA = rev > threshold ? (rev * pct) / 100 : 0;
  const annualA = optionARate * 12 + royaltyA;
  const annualB = optionBRate * 12;
  const annual = option === "A" ? annualA : annualB;
  const royalty = option === "A" ? royaltyA : 0;
  const cheaper = annualA <= annualB ? "A" : "B";
  const breakeven = ((optionBRate - optionARate) * 12 * 100) / pct;
  const pctOfBar = Math.min(100, (rev / sliderMax) * 100);
  const thresholdPct = (threshold / sliderMax) * 100;
  const fmt = (n) => "$" + Math.round(n).toLocaleString();

  return (
    <div className="widget royalty">
      <div className="widget__head">
        <div className="widget__title">
          Model both paths
          <span className="widget__title-mark">§7.13</span>
        </div>
        <div className="calc__hint">Slide your expected annual revenue from TMG-designed products — compare what each option costs.</div>
      </div>

      <div className="royalty__input-card">
        <div className="royalty__input-head">
          <span className="royalty__input-label">Annual gross revenue · TMG-designed products only</span>
          <div className="royalty__mode">
            <button className={option === "A" ? "is-on" : ""} onClick={() => setOption("A")}>Option A</button>
            <button className={option === "B" ? "is-on" : ""} onClick={() => setOption("B")}>Option B</button>
          </div>
        </div>
        <div className="royalty__display">{fmt(rev)}<small>/ year</small></div>
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
            <span>${Math.round(threshold / 1000)}K threshold</span>
          </div>
        </div>
      </div>

      <div className="rev2-compare">
        <div className={`rev2-compare__cell ${option === "A" ? "is-active" : ""}`} onClick={() => setOption("A")}>
          <small>Option A · $615/mo + 5% over $50K</small>
          <strong>{fmt(annualA)}<em>/ yr</em></strong>
          <span>{royaltyA > 0 ? `includes ${fmt(royaltyA)} royalty` : "no royalty at this revenue"}</span>
          {cheaper === "A" && <i className="rev2-cheaper">cheaper at this revenue</i>}
        </div>
        <div className={`rev2-compare__cell ${option === "B" ? "is-active" : ""}`} onClick={() => setOption("B")}>
          <small>Option B · $1,025/mo flat</small>
          <strong>{fmt(annualB)}<em>/ yr</em></strong>
          <span>no royalty — ever</span>
          {cheaper === "B" && <i className="rev2-cheaper">cheaper at this revenue</i>}
        </div>
      </div>
      <div className="rev2-compare__note">
        {cheaper === "A"
          ? <>At this revenue, <strong>Option A costs less</strong>. The lines cross at {fmt(breakeven)}/yr in TMG-designed product revenue.</>
          : <>At this revenue, <strong>Option B costs less</strong>. Below {fmt(breakeven)}/yr in TMG-designed product revenue, Option A is the cheaper path.</>}
        {option === "A" && <> Option A's royalty ends <strong>{capMonths} months after each product's launch</strong> — these figures assume a product inside its royalty window.</>}
      </div>

      <div className={`royalty__share ${royalty > 0 ? "is-on" : ""}`}>
        <div className="royalty__share-left">
          <div className="royalty__share-label">{option === "B" ? "Royalty under Option B" : royalty > 0 ? "Shared with TMG (Option A)" : "Royalty (not triggered)"}</div>
          <div className="royalty__share-formula">
            {option === "B" ? "None — the higher retainer replaces it entirely" : royalty > 0 ? `${pct}% of ${fmt(rev)} — paid quarterly, per product, ${capMonths}-month cap` : `Kicks in once a TMG-designed product clears $${threshold.toLocaleString()}/yr`}
          </div>
        </div>
        <div className="royalty__share-value">{fmt(royalty)}<small>/ year</small></div>
      </div>
      <div className="royalty__share-sub">
        <span><strong>${(royalty / 12).toFixed(0)}</strong> per month average</span>
        <span><strong>${(royalty / 4).toFixed(0)}</strong> per quarterly payment</span>
      </div>
    </div>
  );
}

// Override the originals on window so the app picks up Rev. 2 versions.
Object.assign(window, {
  SectionCreative, SectionBrand, SectionIP, SectionTerm,
  UpdatedCallout, RoyaltyElection, RoyaltyPreviewRev2, FeeSchedule,
});
