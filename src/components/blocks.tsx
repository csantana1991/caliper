import type { Block } from "@/lib/content/types";
import { EcgPaper, EcgStrip } from "@/components/ecg-paper";
import { EchoStudyView } from "@/components/echo-study";
import { AngioFilm } from "@/components/angio-film";
import { HemoStrip } from "@/components/hemo-strip";
import { NuclearMap } from "@/components/nuclear-map";
import { CmrStudyView } from "@/components/cmr-study";
import { AnatomyFilm } from "@/components/anatomy-film";
import { cn } from "@/lib/utils";

function Callout({
  label,
  text,
  tone,
}: {
  label: string;
  text: string;
  tone: "ok" | "warn" | "danger" | "ink";
}) {
  const cls = {
    ok: "bg-ok-bg text-ok",
    warn: "bg-warn-bg text-warn",
    danger: "bg-danger-bg text-danger",
    ink: "bg-ink text-paper",
  } as const;
  return (
    <aside className={cn("rounded-2xl px-4 py-3 text-sm", cls[tone])}>
      <p
        className={cn(
          "mb-1 text-[11px] font-medium uppercase tracking-[0.14em]",
          tone === "ink" ? "text-paper/60" : "opacity-80",
        )}
      >
        {label}
      </p>
      {text}
    </aside>
  );
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((b, i) => {
        if (b.type === "p")
          return (
            <p key={i} className="text-[15px] leading-relaxed text-ink-soft">
              {b.text}
            </p>
          );
        if (b.type === "h")
          return (
            <h3 key={i} className="font-display text-xl text-ink">
              {b.text}
            </h3>
          );
        if (b.type === "ul")
          return (
            <ul key={i} className="space-y-1.5 pl-0 text-[15px] text-ink-soft">
              {b.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        if (b.type === "pearl") return <Callout key={i} label="Pearl" text={b.text} tone="ok" />;
        if (b.type === "trap") return <Callout key={i} label="Don't miss" text={b.text} tone="danger" />;
        if (b.type === "hy") return <Callout key={i} label="High yield" text={b.text} tone="warn" />;
        if (b.type === "remember")
          return <Callout key={i} label="If you remember nothing else" text={b.text} tone="ink" />;
        if (b.type === "next") return <Callout key={i} label="Next step" text={b.text} tone="ok" />;
        if (b.type === "formula")
          return (
            <p key={i} className="rounded-2xl bg-paper-2 px-4 py-3 font-mono text-sm text-ink">
              {b.text}
            </p>
          );
        if (b.type === "table")
          return (
            <div key={i} className="overflow-x-auto rounded-2xl shadow-border">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead className="bg-paper-2 text-stone">
                  <tr>
                    {b.headers.map((h) => (
                      <th key={h} className="px-3 py-2 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((row, ri) => (
                    <tr key={ri} className="border-t border-line">
                      {row.map((cell, ci) => (
                        <td key={ci} className={cn("px-3 py-2 text-ink-soft", ci === 0 && "text-ink")}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        if (b.type === "tracing")
          return (
            <figure key={i} className="space-y-2">
              {b.caption?.includes("strip") ? (
                <EcgStrip tracingId={b.id} />
              ) : (
                <EcgPaper tracingId={b.id} compact />
              )}
              {b.caption ? <figcaption className="text-xs text-stone">{b.caption}</figcaption> : null}
            </figure>
          );
        if (b.type === "echo")
          return (
            <figure key={i} className="space-y-2">
              <EchoStudyView studyId={b.id} />
              {b.caption ? <figcaption className="text-xs text-stone">{b.caption}</figcaption> : null}
            </figure>
          );
        if (b.type === "angio")
          return (
            <figure key={i} className="space-y-2">
              <AngioFilm studyId={b.id} />
              {b.caption ? <figcaption className="text-xs text-stone">{b.caption}</figcaption> : null}
            </figure>
          );
        if (b.type === "hemo")
          return (
            <figure key={i} className="space-y-2">
              <HemoStrip studyId={b.id} />
              {b.caption ? <figcaption className="text-xs text-stone">{b.caption}</figcaption> : null}
            </figure>
          );
        if (b.type === "nuclear")
          return (
            <figure key={i} className="space-y-2">
              <NuclearMap studyId={b.id} />
              {b.caption ? <figcaption className="text-xs text-stone">{b.caption}</figcaption> : null}
            </figure>
          );
        if (b.type === "cmr")
          return (
            <figure key={i} className="space-y-2">
              <CmrStudyView studyId={b.id} />
              {b.caption ? <figcaption className="text-xs text-stone">{b.caption}</figcaption> : null}
            </figure>
          );
        if (b.type === "anatomy")
          return (
            <div key={i} className="space-y-2">
              <AnatomyFilm />
              {b.caption ? <p className="text-xs text-stone">{b.caption}</p> : null}
            </div>
          );
        return null;
      })}
    </div>
  );
}

export function QuickTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-border">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead className="bg-ink text-paper">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-3 py-2 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-elevated">
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-line">
              {row.map((cell, ci) => (
                <td key={ci} className={cn("px-3 py-2", ci === 0 ? "text-ink" : "text-ink-soft")}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
