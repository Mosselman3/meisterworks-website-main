"use client";

import Link from "next/link";
import {
  useCallback,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ACCENT, ROUTES } from "@/lib/site";
import {
  CFG_PRODUCTS,
  GLAS,
  GREPEN,
  INITIAL_STATE,
  KLEUREN,
  MECHANISMEN,
  STEP_ORDER,
  VLAK_PRESETS,
  bayWidth,
  baysFor,
  buildPreviewSvg,
  directionLabel,
  directionOptions,
  dirThumbStyle,
  firstUnconfirmedStep,
  getProduct,
  isStepConfirmed,
  mechThumbStyle,
  nextStepId,
  sideOptionsFor,
  sideStepCopy,
  totalWidth,
  vlakLabel,
  zijChoiceFor,
  zijThumbStyle,
  type ConfiguratorState,
  type StepId,
} from "./logic";

const accent = ACCENT;

function optionCardStyle(selected: boolean): CSSProperties {
  return {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    padding: 14,
    borderRadius: 14,
    cursor: "pointer",
    fontFamily: "inherit",
    textAlign: "left",
    background: selected ? "oklch(1 0 0)" : "oklch(0.985 0.002 75)",
    border: `1.5px solid ${selected ? accent : "oklch(0.88 0.006 75)"}`,
    boxShadow: selected ? "0 2px 12px oklch(0 0 0 / 0.07)" : "none",
    transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  };
}

function tickStyle(selected: boolean): CSSProperties {
  return {
    width: 16,
    height: 16,
    borderRadius: "50%",
    flexShrink: 0,
    border: `1.5px solid ${selected ? accent : "oklch(0.8 0.006 75)"}`,
    background: selected ? accent : "transparent",
    boxShadow: selected ? "inset 0 0 0 3px oklch(1 0 0)" : "none",
  };
}

function confirmBtnStyle(): CSSProperties {
  return {
    marginTop: 18,
    padding: "12px 24px",
    borderRadius: 999,
    cursor: "pointer",
    fontFamily: "inherit",
    fontSize: 13,
    fontWeight: 600,
    border: "none",
    background: accent,
    color: "oklch(0.14 0.006 60)",
  };
}

function stepperBtnStyle(): CSSProperties {
  return {
    width: 28,
    height: 28,
    borderRadius: "50%",
    border: "1px solid oklch(0.8 0.006 75)",
    background: "oklch(1 0 0)",
    cursor: "pointer",
    fontSize: 15,
    fontFamily: "inherit",
    color: "oklch(0.3 0.008 60)",
    lineHeight: 1,
  };
}

function OptionCard({
  label,
  desc,
  selected,
  thumbStyle,
  onClick,
}: {
  label: string;
  desc: string;
  selected: boolean;
  thumbStyle: CSSProperties;
  onClick: () => void;
}) {
  return (
    <button type="button" onClick={onClick} style={optionCardStyle(selected)}>
      <div style={thumbStyle} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "oklch(0.2 0.008 60)",
            textAlign: "left",
          }}
        >
          {label}
        </div>
        <div style={tickStyle(selected)} />
      </div>
      <div
        style={{
          fontSize: 12,
          color: "oklch(0.5 0.008 60)",
          lineHeight: 1.45,
          textAlign: "left",
        }}
      >
        {desc}
      </div>
    </button>
  );
}

type GroupDef = {
  key: string;
  title: string;
  list: readonly { id: string; label: string; desc: string }[];
  thumb: (o: { id: string; label: string; desc: string }) => CSSProperties;
};

function OptionGroups({
  groupKey,
  defs,
  state,
  setState,
  onComplete,
}: {
  groupKey: string;
  defs: GroupDef[];
  state: ConfiguratorState;
  setState: React.Dispatch<React.SetStateAction<ConfiguratorState>>;
  onComplete: () => void;
}) {
  const openIdx = state.groupOpen[groupKey] ?? 0;

  return (
    <>
      {defs.map((d, gi) => {
        const answered = !!state.answered[d.key];
        const expanded = openIdx === gi;
        const currentId = state[d.key as keyof ConfiguratorState] as string;
        const current = d.list.find((o) => o.id === currentId) ?? d.list[0];

        return (
          <div
            key={d.key}
            style={{
              marginBottom: 14,
              border: `1px solid ${expanded ? "oklch(0.85 0.006 75)" : "oklch(0.9 0.006 75)"}`,
              borderRadius: 14,
              padding: "16px 18px",
              background:
                answered && !expanded
                  ? "oklch(0.98 0.003 75)"
                  : "oklch(1 0 0)",
              transition: "background 0.2s ease",
            }}
          >
            <button
              type="button"
              onClick={() =>
                setState((s) => ({
                  ...s,
                  groupOpen: {
                    ...s.groupOpen,
                    [groupKey]: expanded ? -1 : gi,
                  },
                }))
              }
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                marginBottom: expanded ? 16 : 0,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    flexShrink: 0,
                    background: answered ? accent : "oklch(0.9 0.006 75)",
                    color: answered
                      ? "oklch(0.14 0.006 60)"
                      : "oklch(0.55 0.008 60)",
                  }}
                >
                  {answered ? "✓" : ""}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "oklch(0.3 0.008 60)",
                  }}
                >
                  {d.title}
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "oklch(0.5 0.008 60)",
                  }}
                >
                  {answered ? current.label : ""}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: "oklch(0.5 0.008 60)",
                    transform: `rotate(${expanded ? 180 : 0}deg)`,
                    transition: "transform 0.2s ease",
                  }}
                >
                  ⌄
                </div>
              </div>
            </button>
            {expanded ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
                  gap: 14,
                }}
              >
                {d.list.map((o) => (
                  <OptionCard
                    key={o.id}
                    label={o.label}
                    desc={o.desc}
                    selected={o.id === currentId}
                    thumbStyle={d.thumb(o)}
                    onClick={() => {
                      setState((s) => {
                        const nextIdx = gi + 1;
                        const groupOpen = { ...s.groupOpen, [groupKey]: nextIdx };
                        if (nextIdx >= defs.length) {
                          groupOpen[groupKey] = -1;
                        }
                        return {
                          ...s,
                          [d.key]: o.id,
                          answered: { ...s.answered, [d.key]: true },
                          groupOpen,
                        };
                      });
                      const nextIdx = gi + 1;
                      if (nextIdx >= defs.length) {
                        onComplete();
                      }
                    }}
                  />
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

export function Configurator() {
  const [state, setState] = useState<ConfiguratorState>(INITIAL_STATE);

  const product = useMemo(
    () => getProduct(state.productId),
    [state.productId],
  );
  const curZij = useMemo(
    () => zijChoiceFor(product, state.zij),
    [product, state.zij],
  );
  const bays = useMemo(
    () => baysFor(product, curZij),
    [product, curZij],
  );

  const kleur = KLEUREN.find((k) => k.id === state.kleur) ?? KLEUREN[0];
  const glas = GLAS.find((g) => g.id === state.glas) ?? GLAS[0];
  const mech =
    MECHANISMEN.find((m) => m.id === state.mechanisme) ?? MECHANISMEN[0];
  const greep = GREPEN.find((g) => g.id === state.greep) ?? GREPEN[0];
  const isSchuifMech = state.mechanisme === "schuif";
  const dirList = directionOptions(state.mechanisme);
  const vlak = vlakLabel(state);
  const totW = totalWidth(state, product, curZij);

  const scrollToSection = useCallback((id: string) => {
    requestAnimationFrame(() => {
      const el = document.getElementById("cfg-section-" + id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const target = window.scrollY + rect.top - 110;
      window.scrollTo({ top: Math.max(0, target), behavior: "smooth" });
    });
  }, []);

  const openAndScroll = useCallback(
    (id: string) => {
      setState((s) => ({ ...s, openSection: id }));
      scrollToSection(id);
    },
    [scrollToSection],
  );

  const advanceFrom = useCallback(
    (fromId: string) => {
      const next = nextStepId(fromId, product);
      setState((s) => ({ ...s, openSection: next }));
      scrollToSection(next);
    },
    [product, scrollToSection],
  );

  const toggleSection = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      openSection: s.openSection === id ? null : id,
    }));
  }, []);

  const mark = useCallback((key: string, value: boolean | string) => {
    setState((s) => ({
      ...s,
      ...(typeof value === "string" ? { [key]: value } : {}),
      answered: {
        ...s.answered,
        [key]: typeof value === "boolean" ? value : true,
      },
    }));
  }, []);

  const sectionDefs = useMemo(() => {
    const sideCopy = sideStepCopy(product);
    return [
      {
        id: "product" as StepId,
        title: "Uw product",
        intro:
          "Kies het model dat bij uw opening past. U kunt dit later nog aanpassen.",
        summary: product.label,
      },
      product.hasMech
        ? {
            id: "mechanisme" as StepId,
            title: "Type mechanisme",
            intro:
              "Alle mechanismen worden verzonken gemonteerd — er is geen zichtbaar scharnier of rail.",
            summary: `${mech.label} · ${directionLabel(state.richting, state.mechanisme)}`,
          }
        : null,
      {
        id: "zij" as StepId,
        title: "Zijpanelen",
        intro: sideCopy.intro,
        summary: curZij.label,
      },
      {
        id: "vlak" as StepId,
        title: "Vlakverdeling",
        intro:
          "Het aantal liggers en staanders bepaalt hoe het glas wordt opgedeeld — van rustig en open tot fijn geraamd.",
        summary: vlak,
      },
      {
        id: "maat" as StepId,
        title: "Afmeting",
        intro:
          "Vul de breedte per vlak en de hoogte van de opening in millimeters in.",
        summary: `${totW} × ${state.hoogte} mm`,
      },
      {
        id: "opties" as StepId,
        title: "Kleur, glas en afwerking",
        intro:
          "Kies de kleur coating, het glas en (indien van toepassing) de handgreep.",
        summary: `${kleur.label} · ${glas.label}${product.hasGreep ? " · " + greep.label : ""}`,
      },
      {
        id: "overzicht" as StepId,
        title: "Overzicht & aanvraag",
        intro:
          "Controleer uw keuzes. Wijzig wat u wilt, of stuur de samenstelling direct naar ons door.",
        summary: null as string | null,
      },
    ].filter(Boolean) as {
      id: StepId;
      title: string;
      intro: string;
      summary: string | null;
    }[];
  }, [
    product,
    mech.label,
    state.richting,
    state.mechanisme,
    curZij.label,
    vlak,
    totW,
    state.hoogte,
    kleur.label,
    glas.label,
    greep.label,
  ]);

  const summaryRows = useMemo(() => {
    const a = state.answered;
    return [
      a.product
        ? {
            label: "Product",
            value: product.label,
            onEdit: () => openAndScroll("product"),
          }
        : null,
      product.hasMech && a.mechanisme && a.richting
        ? {
            label: "Mechanisme",
            value: `${mech.label} (${directionLabel(state.richting, state.mechanisme)})`,
            onEdit: () => openAndScroll("mechanisme"),
          }
        : null,
      a.zij
        ? {
            label: "Zijpanelen",
            value: curZij.label,
            onEdit: () => openAndScroll("zij"),
          }
        : null,
      a.vlak
        ? {
            label: "Vlakverdeling",
            value: vlak,
            onEdit: () => openAndScroll("vlak"),
          }
        : null,
      a.maat
        ? {
            label: "Afmeting",
            value: `${totW} × ${state.hoogte} mm`,
            onEdit: () => openAndScroll("maat"),
          }
        : null,
      a.kleur
        ? {
            label: "Kleur coating",
            value: kleur.label,
            onEdit: () => openAndScroll("opties"),
          }
        : null,
      a.glas
        ? {
            label: "Glassoort",
            value: glas.label,
            onEdit: () => openAndScroll("opties"),
          }
        : null,
      product.hasGreep && a.greep
        ? {
            label: "Handgreep",
            value: greep.label,
            onEdit: () => openAndScroll("opties"),
          }
        : null,
    ].filter(Boolean) as {
      label: string;
      value: string;
      onEdit: () => void;
    }[];
  }, [
    state.answered,
    state.richting,
    state.mechanisme,
    state.hoogte,
    product,
    mech.label,
    curZij.label,
    vlak,
    totW,
    kleur.label,
    glas.label,
    greep.label,
    openAndScroll,
  ]);

  const chips = useMemo(() => {
    type ChipDot = CSSProperties;
    const list: { label: string; dot: ChipDot }[] = [
      {
        label: kleur.label,
        dot: { background: kleur.hex, borderRadius: "50%" },
      },
      {
        label: glas.label,
        dot: { background: glas.fill, borderRadius: 3 },
      },
      {
        label: vlak,
        dot: {
          border: "1.5px solid oklch(0.5 0.008 60)",
          borderRadius: 2,
        },
      },
    ];
    if (product.hasMech) {
      list.unshift({
        label: mech.label,
        dot: {
          border: "1.5px solid oklch(0.5 0.008 60)",
          borderRadius: "50%",
        },
      });
    }
    return list;
  }, [kleur, glas, vlak, product.hasMech, mech.label]);

  const confirmedCount = sectionDefs.filter(
    (s) => s.id !== "overzicht" && isStepConfirmed(s.id, state, product),
  ).length;
  const totalCount = sectionDefs.length - 1;
  const nextUnanswered = firstUnconfirmedStep(state, product);
  const allDone = nextUnanswered === "overzicht";
  const progressPct = Math.round((confirmedCount / totalCount) * 100);

  const preview = buildPreviewSvg(state, product, curZij);

  const renderSectionBody = (id: StepId): ReactNode => {
    if (id === "product") {
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 14,
          }}
        >
          {CFG_PRODUCTS.map((o) => (
            <OptionCard
              key={o.id}
              label={o.label}
              desc={o.desc}
              selected={o.id === state.productId}
              thumbStyle={{
                height: 96,
                borderRadius: 9,
                backgroundImage: `url('${o.img}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => {
                setState((s) => ({
                  ...s,
                  productId: o.id,
                  zij: null,
                  bayWidths: {},
                  answered: { ...s.answered, product: true },
                }));
                advanceFrom("product");
              }}
            />
          ))}
        </div>
      );
    }

    if (id === "mechanisme") {
      return (
        <OptionGroups
          groupKey="mechanisme"
          state={state}
          setState={setState}
          onComplete={() => advanceFrom("mechanisme")}
          defs={[
            {
              key: "mechanisme",
              title: "Type mechanisme",
              list: MECHANISMEN,
              thumb: (o) => mechThumbStyle(o.id),
            },
            {
              key: "richting",
              title: isSchuifMech ? "Schuifrichting" : "Draairichting",
              list: dirList,
              thumb: (o) => {
                const dia =
                  dirList.find((d) => d.id === o.id)?.dia ?? "draai-links";
                return dirThumbStyle(dia);
              },
            },
          ]}
        />
      );
    }

    if (id === "zij") {
      const zijOpts = sideOptionsFor(product);
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
            gap: 14,
          }}
        >
          {zijOpts.map((o) => (
            <OptionCard
              key={o.id}
              label={o.label}
              desc={o.desc}
              selected={o.id === curZij.id}
              thumbStyle={zijThumbStyle(o, product)}
              onClick={() => {
                mark("zij", o.id);
                advanceFrom("zij");
              }}
            />
          ))}
        </div>
      );
    }

    if (id === "vlak") {
      const showPanelStaanders = bays.some((b) => b.type === "panel");
      return (
        <>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginBottom: 22,
            }}
          >
            {VLAK_PRESETS.map((o) => {
              const sel =
                state.liggers === o.liggers &&
                state.staanders === o.staanders;
              return (
                <button
                  key={o.id}
                  type="button"
                  onClick={() =>
                    setState((s) => ({
                      ...s,
                      liggers: o.liggers,
                      staanders: o.staanders,
                    }))
                  }
                  style={{
                    padding: "8px 16px",
                    borderRadius: 999,
                    fontFamily: "inherit",
                    fontSize: 13,
                    cursor: "pointer",
                    border: `1px solid ${sel ? accent : "oklch(0.85 0.006 75)"}`,
                    background: sel ? `${accent}1a` : "transparent",
                    color: sel
                      ? "oklch(0.25 0.008 60)"
                      : "oklch(0.45 0.008 60)",
                  }}
                >
                  {o.label}
                </button>
              );
            })}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 18,
            }}
          >
            <StepperField
              title="Liggers"
              subtitle="Horizontale onderverdeling"
              value={state.liggers}
              onMinus={() =>
                setState((s) => ({
                  ...s,
                  liggers: Math.max(0, s.liggers - 1),
                }))
              }
              onPlus={() =>
                setState((s) => ({
                  ...s,
                  liggers: Math.min(5, s.liggers + 1),
                }))
              }
            />
            <StepperField
              title="Staanders deur"
              subtitle="Verticale onderverdeling"
              value={state.staanders}
              onMinus={() =>
                setState((s) => ({
                  ...s,
                  staanders: Math.max(0, s.staanders - 1),
                }))
              }
              onPlus={() =>
                setState((s) => ({
                  ...s,
                  staanders: Math.min(5, s.staanders + 1),
                }))
              }
            />
            {showPanelStaanders ? (
              <StepperField
                title="Staanders zijpanelen"
                subtitle="Onafhankelijk van de deur"
                value={state.panelStaanders}
                onMinus={() =>
                  setState((s) => ({
                    ...s,
                    panelStaanders: Math.max(0, s.panelStaanders - 1),
                  }))
                }
                onPlus={() =>
                  setState((s) => ({
                    ...s,
                    panelStaanders: Math.min(5, s.panelStaanders + 1),
                  }))
                }
              />
            ) : null}
          </div>
          <p
            style={{
              fontSize: 12,
              color: "oklch(0.55 0.008 60)",
              lineHeight: 1.5,
              margin: "16px 0 0",
            }}
          >
            Liggers worden automatisch op zowel de deur als de zijpanelen
            toegepast.
          </p>
          <button
            type="button"
            style={confirmBtnStyle()}
            onClick={() => {
              mark("vlak", true);
              advanceFrom("vlak");
            }}
          >
            Bevestigen en doorgaan →
          </button>
        </>
      );
    }

    if (id === "maat") {
      return (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 18,
            }}
          >
            {bays.map((b) => (
              <label
                key={b.key}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "oklch(0.35 0.008 60)",
                  }}
                >
                  {b.label} — breedte (mm)
                </span>
                <input
                  type="number"
                  value={bayWidth(state, b)}
                  onChange={(ev) =>
                    setState((s) => ({
                      ...s,
                      bayWidths: {
                        ...s.bayWidths,
                        [b.key]: Number(ev.target.value) || 0,
                      },
                    }))
                  }
                  min={300}
                  max={3000}
                  step={10}
                  style={{
                    padding: "13px 14px",
                    border: "1px solid oklch(0.85 0.006 75)",
                    borderRadius: 10,
                    fontSize: 15,
                    fontFamily: "inherit",
                    color: "oklch(0.2 0.008 60)",
                    background: "oklch(1 0 0)",
                  }}
                />
              </label>
            ))}
            <label
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: "oklch(0.35 0.008 60)",
                }}
              >
                Hoogte opening (mm)
              </span>
              <input
                type="number"
                value={state.hoogte}
                onChange={(ev) =>
                  setState((s) => ({
                    ...s,
                    hoogte: Number(ev.target.value) || 0,
                  }))
                }
                min={1500}
                max={4000}
                step={10}
                style={{
                  padding: "13px 14px",
                  border: "1px solid oklch(0.85 0.006 75)",
                  borderRadius: 10,
                  fontSize: 15,
                  fontFamily: "inherit",
                  color: "oklch(0.2 0.008 60)",
                  background: "oklch(1 0 0)",
                }}
              />
            </label>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginTop: 18,
            }}
          >
            <span style={{ fontSize: 13, color: "oklch(0.5 0.008 60)" }}>
              Totale breedte:
            </span>
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: "oklch(0.2 0.008 60)",
              }}
            >
              {totW} mm
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              color: "oklch(0.5 0.008 60)",
              lineHeight: 1.6,
              margin: "10px 0 18px",
            }}
          >
            Indicatieve maten volstaan. We meten uw opening altijd zelf in
            voordat we in productie gaan.
          </p>
          <button
            type="button"
            style={confirmBtnStyle()}
            onClick={() => {
              mark("maat", true);
              advanceFrom("maat");
            }}
          >
            Bevestigen en doorgaan →
          </button>
        </>
      );
    }

    if (id === "opties") {
      const groupDefs: GroupDef[] = [
        {
          key: "kleur",
          title: "Kleur coating",
          list: KLEUREN,
          thumb: (o) => ({
            height: 96,
            borderRadius: 9,
            background: (o as (typeof KLEUREN)[number]).hex ?? kleur.hex,
          }),
        },
        {
          key: "glas",
          title: "Glassoort",
          list: GLAS,
          thumb: (o) => {
            const g = o as (typeof GLAS)[number];
            if (g.pattern === "reeded") {
              return {
                height: 96,
                borderRadius: 9,
                background: `repeating-linear-gradient(90deg, ${g.fill} 0 5px, oklch(1 0 0 / 0.6) 5px 7px)`,
              };
            }
            return {
              height: 96,
              borderRadius: 9,
              background: g.fill,
            };
          },
        },
      ];
      if (product.hasGreep) {
        groupDefs.push({
          key: "greep",
          title: "Handgreep",
          list: GREPEN,
          thumb: () => ({
            height: 96,
            borderRadius: 9,
            background: "oklch(0.93 0.006 75)",
          }),
        });
      }
      return (
        <OptionGroups
          groupKey="opties"
          state={state}
          setState={setState}
          onComplete={() => advanceFrom("opties")}
          defs={groupDefs}
        />
      );
    }

    if (id === "overzicht") {
      return (
        <>
          <div
            style={{
              border: "1px solid oklch(0.88 0.006 75)",
              borderRadius: 14,
              overflow: "hidden",
              background: "oklch(1 0 0)",
            }}
          >
            {summaryRows.map((row) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                  padding: "15px 18px",
                  borderBottom: "1px solid oklch(0.94 0.004 75)",
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    color: "oklch(0.5 0.008 60)",
                  }}
                >
                  {row.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      color: "oklch(0.2 0.008 60)",
                      textAlign: "right",
                    }}
                  >
                    {row.value}
                  </div>
                  <button
                    type="button"
                    onClick={row.onEdit}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 4,
                      fontSize: 12,
                      color: "oklch(0.45 0.008 60)",
                      textDecoration: "underline",
                    }}
                  >
                    Wijzig
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              flexWrap: "wrap",
              marginTop: 28,
            }}
          >
            <Link
              href={ROUTES.afspraak}
              className="btn-accent"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "15px 30px",
                fontSize: 14,
                letterSpacing: "0.03em",
              }}
            >
              Offerte aanvragen
              <ArrowIcon />
            </Link>
            <Link
              href={ROUTES.afspraak}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "15px 30px",
                border: "1px solid oklch(0.7 0.006 75)",
                color: "oklch(0.25 0.008 60)",
                fontSize: 14,
                letterSpacing: "0.03em",
                borderRadius: 999,
                transition: "transform 0.15s ease, background 0.15s ease",
              }}
            >
              Afspraak maken
            </Link>
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div
      style={{
        color: "oklch(0.18 0.006 60)",
        background: "oklch(0.97 0.004 75)",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "32px 28px 0" }}>
        <div
          style={{
            fontSize: 13,
            color: "oklch(0.5 0.008 60)",
            marginBottom: 20,
          }}
        >
          <Link
            href={ROUTES.deuren}
            style={{
              borderBottom: "1px solid oklch(0.75 0.006 75)",
              paddingBottom: 1,
            }}
          >
            Deuren
          </Link>{" "}
          &nbsp;/&nbsp; Configurator
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
            paddingBottom: 24,
            borderBottom: "1px solid oklch(0.88 0.006 75)",
          }}
        >
          <div>
            <div
              style={{
                color: "oklch(0.5 0.01 60)",
                fontSize: 13,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Configurator
            </div>
            <h1
              className="font-serif-display"
              style={{
                fontWeight: 500,
                fontSize: "clamp(26px, 3.4vw, 38px)",
                margin: 0,
                lineHeight: 1.15,
              }}
            >
              Stel uw deur samen.
            </h1>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 13, color: "oklch(0.5 0.008 60)" }}>
              {allDone
                ? "Alle stappen ingevuld"
                : `${confirmedCount} van ${totalCount} stappen ingevuld`}
            </div>
            <div
              style={{
                fontSize: 12,
                color: "oklch(0.58 0.008 60)",
                marginTop: 4,
              }}
            >
              Gratis en zonder verplichtingen
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "22px 28px 0" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "oklch(0.45 0.008 60)",
              fontWeight: 600,
            }}
          >
            Voortgang
          </div>
          <div style={{ fontSize: 12, color: "oklch(0.55 0.008 60)" }}>
            {progressPct}%
          </div>
        </div>
        <div
          style={{
            height: 5,
            background: "oklch(0.9 0.006 75)",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 999,
              background: accent,
              width: `${Math.max(4, progressPct)}%`,
              transition: "width 0.35s ease",
            }}
          />
        </div>
      </div>

      <div
        data-cfg-shell
        style={{
          maxWidth: 1320,
          margin: "0 auto",
          padding: "28px 28px 100px",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.05fr) minmax(0, 1fr)",
          gap: 48,
          alignItems: "start",
        }}
      >
        <div
          data-cfg-preview
          style={{ position: "sticky", top: 96 }}
        >
          <div
            style={{
              background: "oklch(1 0 0)",
              border: "1px solid oklch(0.9 0.006 75)",
              borderRadius: 18,
              padding: 28,
              boxShadow: "0 1px 3px oklch(0 0 0 / 0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div className="font-serif-display" style={{ fontSize: 20 }}>
                {product.label}
              </div>
            </div>
            <div
              style={{
                background: "oklch(0.965 0.004 75)",
                borderRadius: 12,
                padding: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 380,
              }}
            >
              {preview}
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                marginTop: 20,
              }}
            >
              {chips.map((chip) => (
                <div
                  key={chip.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 7,
                    padding: "6px 12px",
                    borderRadius: 999,
                    background: "oklch(0.95 0.004 75)",
                    fontSize: 12,
                    color: "oklch(0.35 0.008 60)",
                  }}
                >
                  <div
                    style={{
                      width: 11,
                      height: 11,
                      ...chip.dot,
                    }}
                  />
                  {chip.label}
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 22,
                paddingTop: 20,
                borderTop: "1px solid oklch(0.93 0.004 75)",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setState((s) => ({
                    ...s,
                    liveSummaryOpen: !s.liveSummaryOpen,
                  }))
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  fontFamily: "inherit",
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "oklch(0.55 0.008 60)",
                  }}
                >
                  Uw samenstelling
                </span>
                <span
                  style={{
                    fontSize: 13,
                    color: "oklch(0.5 0.008 60)",
                    transform: `rotate(${state.liveSummaryOpen ? 180 : 0}deg)`,
                    transition: "transform 0.2s ease",
                  }}
                >
                  ⌄
                </span>
              </button>
              {state.liveSummaryOpen ? (
                <div style={{ marginTop: 12 }}>
                  {summaryRows.map((row) => (
                    <button
                      key={row.label}
                      type="button"
                      onClick={row.onEdit}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        gap: 14,
                        width: "100%",
                        padding: "7px 0",
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid oklch(0.95 0.004 75)",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          fontSize: 12,
                          color: "oklch(0.5 0.008 60)",
                        }}
                      >
                        {row.label}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: "oklch(0.25 0.008 60)",
                          fontWeight: 600,
                          textAlign: "right",
                        }}
                      >
                        {row.value}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <p
            style={{
              fontSize: 12,
              color: "oklch(0.55 0.008 60)",
              lineHeight: 1.5,
              margin: "14px 2px 0",
            }}
          >
            Schematische weergave van uw samenstelling. Maatvoering en
            detaillering worden vóór productie samen met u gecontroleerd.
          </p>
        </div>

        <div>
          {sectionDefs.map((def) => {
            const confirmed =
              def.id !== "overzicht" &&
              isStepConfirmed(def.id, state, product);
            const expanded = state.openSection === def.id;
            const stepNum = STEP_ORDER.indexOf(def.id) + 1;

            return (
              <div
                key={def.id}
                id={"cfg-section-" + def.id}
                style={{
                  marginBottom: 14,
                  border: `1px solid ${expanded ? "oklch(0.82 0.006 75)" : "oklch(0.9 0.006 75)"}`,
                  borderRadius: 16,
                  padding: "18px 20px",
                  background:
                    confirmed && !expanded
                      ? "oklch(0.98 0.003 75)"
                      : "oklch(1 0 0)",
                  boxShadow: expanded
                    ? "0 2px 14px oklch(0 0 0 / 0.06)"
                    : "none",
                  transition: "background 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleSection(def.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    textAlign: "left",
                    fontFamily: "inherit",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 600,
                        background: confirmed
                          ? accent
                          : expanded
                            ? "oklch(0.16 0.006 60)"
                            : "oklch(0.9 0.006 75)",
                        color: confirmed
                          ? "oklch(0.14 0.006 60)"
                          : expanded
                            ? "oklch(0.97 0.004 75)"
                            : "oklch(0.55 0.008 60)",
                      }}
                    >
                      {confirmed ? "✓" : stepNum}
                    </div>
                    <div style={{ minWidth: 0 }}>
                      <div
                        style={{
                          fontSize: 15,
                          fontWeight: 600,
                          color: "oklch(0.2 0.008 60)",
                        }}
                      >
                        {def.title}
                      </div>
                      {def.summary && confirmed ? (
                        <div
                          style={{
                            fontSize: 12,
                            color: "oklch(0.5 0.008 60)",
                            marginTop: 2,
                          }}
                        >
                          {def.summary}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 15,
                      color: "oklch(0.5 0.008 60)",
                      transform: `rotate(${expanded ? 180 : 0}deg)`,
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                    }}
                  >
                    ⌄
                  </div>
                </button>
                {expanded ? (
                  <div style={{ marginTop: 20 }}>
                    <p
                      style={{
                        color: "oklch(0.42 0.008 60)",
                        fontSize: 14,
                        lineHeight: 1.6,
                        margin: "0 0 18px",
                      }}
                    >
                      {def.intro}
                    </p>
                    {renderSectionBody(def.id)}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div
        data-cfg-nav-mobile
        style={{
          display: "none",
          flexDirection: "column",
          gap: 10,
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 60,
          padding: "10px 16px calc(10px + env(safe-area-inset-bottom))",
          background: "oklch(1 0 0 / 0.97)",
          backdropFilter: "blur(10px)",
          borderTop: "1px solid oklch(0.88 0.006 75)",
          boxShadow: "0 -2px 12px oklch(0 0 0 / 0.06)",
        }}
      >
        <button
          type="button"
          onClick={() =>
            setState((s) => ({ ...s, summaryOpen: !s.summaryOpen }))
          }
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            width: "100%",
            padding: "9px 14px",
            borderRadius: 999,
            background: "oklch(0.96 0.004 75)",
            border: "1px solid oklch(0.9 0.006 75)",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "oklch(0.35 0.008 60)",
              fontWeight: 600,
            }}
          >
            Bekijk uw samenstelling
          </span>
          <span style={{ fontSize: 12, color: "oklch(0.5 0.008 60)" }}>
            {progressPct}% ⌃
          </span>
        </button>
        <button
          type="button"
          onClick={() => openAndScroll(nextUnanswered)}
          style={{
            padding: "13px 26px",
            borderRadius: 999,
            cursor: "pointer",
            fontFamily: "inherit",
            fontSize: 14,
            fontWeight: 500,
            border: "none",
            background: accent,
            color: "oklch(0.14 0.006 60)",
            boxShadow: "0 2px 10px oklch(0 0 0 / 0.14)",
            width: "100%",
          }}
        >
          {allDone ? "Naar overzicht" : "Volgende stap"}
        </button>
      </div>

      {state.summaryOpen ? (
        <div
          role="presentation"
          onClick={() => setState((s) => ({ ...s, summaryOpen: false }))}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 70,
            background: "oklch(0.14 0.006 60 / 0.45)",
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxHeight: "82vh",
              overflowY: "auto",
              background: "oklch(0.99 0.002 75)",
              borderRadius: "18px 18px 0 0",
              padding:
                "22px 20px calc(28px + env(safe-area-inset-bottom))",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                marginBottom: 18,
              }}
            >
              <div className="font-serif-display" style={{ fontSize: 20 }}>
                Uw samenstelling
              </div>
              <button
                type="button"
                onClick={() =>
                  setState((s) => ({ ...s, summaryOpen: false }))
                }
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 22,
                  lineHeight: 1,
                  color: "oklch(0.45 0.008 60)",
                  padding: 4,
                }}
              >
                ×
              </button>
            </div>
            <div
              style={{
                background: "oklch(0.965 0.004 75)",
                borderRadius: 12,
                padding: 16,
                marginBottom: 20,
              }}
            >
              {preview}
            </div>
            {summaryRows.map((row) => (
              <button
                key={row.label}
                type="button"
                onClick={() => {
                  row.onEdit();
                  setState((s) => ({ ...s, summaryOpen: false }));
                }}
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  gap: 14,
                  width: "100%",
                  padding: "12px 0",
                  background: "none",
                  border: "none",
                  borderBottom: "1px solid oklch(0.93 0.004 75)",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  textAlign: "left",
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    color: "oklch(0.5 0.008 60)",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: "oklch(0.2 0.008 60)",
                      fontWeight: 600,
                      textAlign: "right",
                    }}
                  >
                    {row.value}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "oklch(0.55 0.008 60)",
                      textDecoration: "underline",
                    }}
                  >
                    Wijzig
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StepperField({
  title,
  subtitle,
  value,
  onMinus,
  onPlus,
}: {
  title: string;
  subtitle: string;
  value: number;
  onMinus: () => void;
  onPlus: () => void;
}) {
  return (
    <div
      style={{
        border: "1px solid oklch(0.88 0.006 75)",
        borderRadius: 14,
        padding: "16px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: "oklch(0.2 0.008 60)",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: 12, color: "oklch(0.5 0.008 60)" }}>
          {subtitle}
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button type="button" onClick={onMinus} style={stepperBtnStyle()}>
          –
        </button>
        <div
          style={{
            width: 22,
            textAlign: "center",
            fontSize: 15,
            fontWeight: 600,
          }}
        >
          {value}
        </div>
        <button type="button" onClick={onPlus} style={stepperBtnStyle()}>
          +
        </button>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 19L19 5M19 5H9M19 5V15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
