/* signing.jsx — Signature block, modals, FAQ, status banner */
const { useState, useRef, useEffect, useMemo } = React;

// ---- Signer status banner -----------------------------------------------
function SignerStatusBanner({ signers, current }) {
  return (
    <div className="status-strip">
      <div className="status-strip__inner">
        <span className="status-strip__label">Signing Status</span>
        {signers.map((s) => (
          <SignerChip key={s.id} signer={s} isCurrent={s.id === current} />
        ))}
      </div>
    </div>
  );
}

function SignerChip({ signer, isCurrent }) {
  const initial = signer.name.charAt(0);
  return (
    <div className="signer-chip" title={`${signer.role}, ${signer.entity}`}>
      <span className="signer-chip__avatar">{initial}</span>
      <span className="signer-chip__name">{signer.name}</span>
      <StatePill state={signer.state} />
    </div>
  );
}

function StatePill({ state }) {
  const map = {
    pending: ["Pending", "state-pending"],
    opened: ["Opened", "state-opened"],
    requested: ["Requested Changes", "state-changes"],
    current: ["Awaiting", "state-current"],
    signed: ["Signed", "state-signed"],
    locked: ["Locked", "state-locked"],
  };
  const [label, cls] = map[state] || ["—", "state-pending"];
  return <span className={`state-pill ${cls}`}>{label}</span>;
}

// ---- FAQ ---------------------------------------------------------------
function FAQAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq-list">
      {items.map((it, i) => (
        <div key={i} className={`faq-item ${open === i ? "is-open" : ""}`}>
          <button className="faq-item__btn" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{it.q}</span>
            <span className="faq-item__icon">+</span>
          </button>
          <div className="faq-item__body"><div className="faq-item__body-inner">{it.a}</div></div>
        </div>
      ))}
    </div>
  );
}

// ---- Signature methods -------------------------------------------------
function SignaturePadCanvas({ onChange, value }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);
  const [hasDrawn, setHasDrawn] = useState(!!value);

  useEffect(() => {
    const c = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const rect = c.getBoundingClientRect();
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    const ctx = c.getContext("2d");
    ctx.scale(dpr, dpr);
    ctx.strokeStyle = "#242528";
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (value) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = value;
      setHasDrawn(true);
    }
  }, []);

  function pointer(e) {
    const r = canvasRef.current.getBoundingClientRect();
    const t = e.touches ? e.touches[0] : e;
    return { x: t.clientX - r.left, y: t.clientY - r.top };
  }
  function start(e) {
    e.preventDefault();
    drawing.current = true;
    last.current = pointer(e);
  }
  function move(e) {
    if (!drawing.current) return;
    e.preventDefault();
    const p = pointer(e);
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (!hasDrawn) setHasDrawn(true);
  }
  function end() {
    if (!drawing.current) return;
    drawing.current = false;
    onChange(canvasRef.current.toDataURL("image/png"));
  }
  function clear() {
    const c = canvasRef.current;
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    setHasDrawn(false);
    onChange(null);
  }

  return (
    <div className="sig-canvas-wrap">
      <div className="sig-canvas-wrap__head">
        <span>Signature</span>
        <strong>{hasDrawn ? "Captured" : "Draw with mouse, finger, or pen"}</strong>
      </div>
      <div className="sig-canvas-stage">
        <canvas
          ref={canvasRef}
          className="sig-canvas"
          onMouseDown={start} onMouseMove={move} onMouseUp={end} onMouseLeave={end}
          onTouchStart={start} onTouchMove={move} onTouchEnd={end}
        />
        <div className="sig-canvas-baseline" />
        <div className="sig-canvas-x">×</div>
        {!hasDrawn && <div className="sig-canvas-hint">Sign above the line</div>}
      </div>
      <div className="sig-canvas-tools">
        <button onClick={clear} disabled={!hasDrawn}>Clear</button>
      </div>
    </div>
  );
}

function SignatureTypePicker({ name, onName, font, onFont }) {
  const fonts = [
    { id: "Allison", label: "Allison" },
    { id: "Caveat", label: "Caveat" },
    { id: "Dancing Script", label: "Dancing Script" },
    { id: "Great Vibes", label: "Great Vibes" },
  ];
  return (
    <div className="sig-type">
      <input
        className="sig-type__input"
        placeholder="Type your full legal name"
        value={name}
        onChange={(e) => onName(e.target.value)}
      />
      <div className="sig-type__previews">
        {fonts.map((f) => (
          <button key={f.id} className={`sig-type__preview ${font === f.id ? "is-selected" : ""}`} onClick={() => onFont(f.id)}>
            <div className="sig-type__preview-label">{f.label}</div>
            <div className="sig-type__preview-glyph" style={{ fontFamily: `"${f.id}", cursive` }}>
              {name || "Your name"}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function SignatureClickToSign({ name, onName, checked, onCheck }) {
  return (
    <div className="sig-click">
      <div>
        <div style={{ fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold-deep)", marginBottom: 6 }}>Full legal name</div>
        <input className="sig-type__input" placeholder="Joaquin Thompson Sr." value={name} onChange={(e) => onName(e.target.value)} style={{ marginBottom: 0 }} />
      </div>
      <label className="sig-click__check">
        <input type="checkbox" checked={checked} onChange={(e) => onCheck(e.target.checked)} />
        <span>By checking this box, I adopt my typed name as my electronic signature under the U.S. ESIGN Act and Georgia UETA.</span>
      </label>
    </div>
  );
}

// ---- Signature block (per signer) --------------------------------------
function SignatureCard({ signer, isCurrent, isReadonly, onSign, onRequestChanges, index, total }) {
  const [method, setMethod] = useState("draw");
  const [drawn, setDrawn] = useState(null);
  const [typedName, setTypedName] = useState(signer.name);
  const [typedFont, setTypedFont] = useState("Allison");
  const [checked, setChecked] = useState(false);
  const [confirm, setConfirm] = useState(false);

  if (signer.state === "signed") {
    return <SignedCard signer={signer} index={index} total={total} />;
  }

  const orderLabel = `Signer ${(index || 0) + 1} of ${total || 2}`;

  if (isReadonly) {
    return (
      <div className="sig-row sig-row--readonly">
        <div className="sig-row__identity">
          <div className="sig-row__order">{orderLabel}</div>
          <div className="sig-row__name">{signer.name}</div>
          <div className="sig-row__role">{signer.role} · {signer.entity}</div>
          <div className="sig-row__state"><StatePill state={signer.state} /></div>
        </div>
        <div className="sig-row__workspace sig-row__workspace--readonly">
          <div className="sig-row__readonly-line">
            <div className="sig-row__readonly-x">×</div>
            <div className="sig-row__readonly-rule" />
          </div>
          <div className="sig-row__readonly-caption">
            {signer.state === "current" ? "Awaiting signature." : "Unlocks once the other party signs."}
          </div>
        </div>
      </div>
    );
  }

  const canSign = (
    (method === "draw" && drawn) ||
    (method === "type" && typedName.trim().length > 1) ||
    (method === "click" && typedName.trim().length > 1 && checked)
  );

  return (
    <>
      <div className={`sig-row ${isCurrent ? "sig-row--current" : ""}`}>
        <div className="sig-row__identity">
          <div className="sig-row__order">{orderLabel} · <span className="sig-row__order-turn">Your turn</span></div>
          <div className="sig-row__name">{signer.name}</div>
          <div className="sig-row__role">{signer.role} · {signer.entity}</div>
          <div className="sig-row__email">{signer.email}</div>
          <div className="sig-row__microcopy">
            By signing, you confirm you've read this agreement and agree to be bound by it. Electronic signature under U.S. ESIGN Act &amp; Georgia UETA.
          </div>
        </div>

        <div className="sig-row__workspace">
          <div className="method-tabs" role="tablist">
            {[
              { id: "draw", label: "Draw" },
              { id: "click", label: "Click" },
            ].map((tab) => (
              <button key={tab.id} role="tab" aria-selected={method === tab.id}
                className={`method-tab ${method === tab.id ? "is-active" : ""}`}
                onClick={() => setMethod(tab.id)}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="sig-row__method">
            {method === "draw" && <SignaturePadCanvas value={drawn} onChange={setDrawn} />}
            {method === "click" && <SignatureClickToSign name={typedName} onName={setTypedName} checked={checked} onCheck={setChecked} />}
          </div>

          <div className="sig-row__actions">
            <button className="sig-row__secondary" onClick={onRequestChanges}>Request changes</button>
            <button className="sig-row__primary" disabled={!canSign} onClick={() => setConfirm(true)}>
              Sign &amp; Lock <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      {confirm && (
        <SignatureConfirmModal
          signer={signer}
          onClose={() => setConfirm(false)}
          onConfirm={() => {
            const payload = method === "draw"
              ? { type: "drawn", dataUrl: drawn, name: signer.name }
              : { type: method, name: typedName, font: "Allison" };
            onSign(payload);
            setConfirm(false);
          }}
        />
      )}
    </>
  );
}

function SignedCard({ signer, index, total }) {
  const time = signer.signedAt || "May 22, 2026 · 4:32 PM EDT";
  const ip = signer.ip || "71.x.x.x";
  const orderLabel = `Signer ${(index || 0) + 1} of ${total || 2}`;
  const renderGlyph = () => {
    const sig = signer.signature;
    if (!sig) return signer.name;
    if (sig.type === "drawn" && sig.dataUrl) return <img src={sig.dataUrl} alt="signature" style={{ maxHeight: 56 }} />;
    return <span style={{ fontFamily: `"${sig.font || "Allison"}", cursive` }}>{sig.name || signer.name}</span>;
  };
  return (
    <div className="sig-row sig-row--signed">
      <div className="sig-row__identity">
        <div className="sig-row__order">{orderLabel}</div>
        <div className="sig-row__name">{signer.name}</div>
        <div className="sig-row__role">{signer.role} · {signer.entity}</div>
        <div className="sig-row__email">{signer.email}</div>
        <div className="sig-row__signed-seal">
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.5l3 3 5-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Signed &amp; Locked
        </div>
      </div>
      <div className="sig-row__workspace sig-row__workspace--signed">
        <div className="sig-signed-block">
          <div className="sig-signed-block__x">×</div>
          <div className="sig-signed-block__glyph">{renderGlyph()}</div>
          <div className="sig-signed-block__rule" />
        </div>
        <div className="sig-signed-block__meta">
          <div>
            <span className="k">Signed</span>
            <span className="v">{time}</span>
          </div>
          <div>
            <span className="k">IP</span>
            <span className="v">{ip}</span>
          </div>
          <div>
            <span className="k">Signature ID</span>
            <span className="v mono">sig_{(signer.id || "x").padEnd(6, "0").slice(0, 6)}-{Math.random().toString(16).slice(2, 8)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Modals ------------------------------------------------------------
function ModalShell({ children, onClose, eyebrow, title }) {
  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true">
        <button className="modal__close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 16 16"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.4" /></svg>
        </button>
        {eyebrow && <div className="modal__eyebrow">{eyebrow}</div>}
        {title && <div className="modal__title">{title}</div>}
        {children}
      </div>
    </div>
  );
}

function RequestChangesModal({ onClose, onSubmit }) {
  const [note, setNote] = useState("");
  const [section, setSection] = useState("");
  return (
    <ModalShell onClose={onClose} eyebrow="Request Changes" title="Tell us what to change.">
      <div className="modal__body">
        Pinpoint the section and describe the change. The studio will reply within two business days. Your request is logged in the audit trail.
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <input className="modal__input" placeholder="Section reference, e.g. §3.1 Base Monthly Rate" value={section} onChange={(e) => setSection(e.target.value)} />
        <textarea className="modal__textarea" placeholder="Describe the change you'd like to see." value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      <div className="modal__actions">
        <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn--gold" disabled={!note.trim()} onClick={() => onSubmit({ section, note })}>Send request</button>
      </div>
    </ModalShell>
  );
}

function SignatureConfirmModal({ signer, onClose, onConfirm }) {
  return (
    <ModalShell onClose={onClose} eyebrow="Final step" title="You're about to sign.">
      <div className="modal__body">
        This is a binding electronic signature under the U.S. ESIGN Act and Georgia UETA. Once signed, this contract locks for your party. Other signers will be notified.
      </div>
      <div style={{ background: "var(--athens-2)", padding: 16, borderRadius: 2, fontSize: 13, lineHeight: 1.6, marginBottom: 4 }}>
        <strong style={{ fontFamily: "var(--font-display)", fontSize: 15, display: "block", marginBottom: 4 }}>{signer.name}</strong>
        {signer.role} · {signer.entity}<br/>
        <span style={{ color: "color-mix(in oklab, var(--ink) 60%, transparent)" }}>{signer.email}</span>
      </div>
      <div className="modal__actions">
        <button className="btn btn--ghost" onClick={onClose}>Not yet</button>
        <button className="btn btn--gold" onClick={onConfirm}>I agree. Sign now.</button>
      </div>
    </ModalShell>
  );
}

function AdminPasswordModal({ onClose, onUnlock }) {
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  function submit() {
    if (pw === "ThiinkMG!&&%") onUnlock();
    else { setError("Wrong password."); setPw(""); }
  }
  return (
    <ModalShell onClose={onClose} eyebrow="Restricted" title="Admin access.">
      <div className="modal__body">
        Single shared admin password. Contact the studio if you've lost it.
      </div>
      <div className="pw-field">
        <input
          className="modal__input pw-field__input"
          type={show ? "text" : "password"}
          placeholder="Password"
          value={pw}
          onChange={(e) => { setPw(e.target.value); if (error) setError(""); }}
          onKeyDown={(e) => e.key === "Enter" && submit()}
          autoFocus
        />
        <button type="button" className="pw-field__eye" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}>
          {show ? (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M3 3l14 14M8.5 8.6a2 2 0 002.8 2.8M5.5 5.8C3.7 7 2.5 8.7 2 10c1 2.5 4 5 8 5 1.4 0 2.7-.3 3.8-.8M9 5.05C9.3 5 9.6 5 10 5c4 0 7 2.5 8 5-.4 1-1.1 2-2 3"
                stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M2 10s3-5 8-5 8 5 8 5-3 5-8 5-8-5-8-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
              <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          )}
        </button>
      </div>
      {error && <div style={{ color: "var(--error)", fontSize: 13, marginTop: 8 }}>{error}</div>}
      <div className="modal__actions">
        <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn--primary" onClick={submit}>Unlock</button>
      </div>
    </ModalShell>
  );
}

function AdminResetModal({ onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  return (
    <ModalShell onClose={onClose} eyebrow="Destructive" title="Reset contract to Draft.">
      <div className="modal__body">
        All existing signatures will be invalidated. Magic links will be re-issued to every signer. This is logged.
      </div>
      <textarea className="modal__textarea" placeholder="Reason (required, audit-logged)" value={reason} onChange={(e) => setReason(e.target.value)} />
      <div className="modal__actions">
        <button className="btn btn--ghost" onClick={onClose}>Cancel</button>
        <button className="btn btn--danger" disabled={!reason.trim()} onClick={() => onConfirm(reason)}>Reset & resend</button>
      </div>
    </ModalShell>
  );
}

Object.assign(window, {
  SignerStatusBanner, SignerChip, StatePill, FAQAccordion,
  SignatureCard, SignedCard, SignaturePadCanvas, SignatureTypePicker, SignatureClickToSign,
  RequestChangesModal, SignatureConfirmModal, AdminPasswordModal, AdminResetModal,
});
