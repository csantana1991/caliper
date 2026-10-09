import type { FrameworkNode } from "@/lib/content/types";
import { cn } from "@/lib/utils";

const TONE = {
  ink: "bg-paper-2 text-ink",
  ok: "bg-ok-bg text-ok",
  warn: "bg-warn-bg text-warn",
  danger: "bg-danger-bg text-danger",
} as const;

export function FrameworkBoard({
  title,
  nodes,
}: {
  title?: string;
  nodes: FrameworkNode[];
}) {
  return (
    <div className="rounded-3xl bg-elevated p-4 shadow-border sm:p-5">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-stone">
        {title ?? "Framework"}
      </p>
      <ol
        className={cn(
          "mt-4 grid gap-2",
          nodes.length > 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "lg:grid-cols-4",
        )}
      >
        {nodes.map((node, i) => (
          <li
            key={node.text}
            className={cn(
              "rounded-2xl px-3 py-3 text-sm leading-snug",
              TONE[node.tone ?? "ink"],
            )}
          >
            <span className="mr-2 font-mono text-[11px] opacity-70">
              {String(i + 1).padStart(2, "0")}
            </span>
            {node.text}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function OneLiner({ label, text }: { label: string; text: string }) {
  return (
    <aside className="rounded-3xl bg-ink px-5 py-4 text-paper shadow-border">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-paper/60">{label}</p>
      <p className="mt-2 text-[15px] leading-relaxed">{text}</p>
    </aside>
  );
}

export function TeachGrid({
  path,
  dx,
  tx,
}: {
  path: string;
  dx: string;
  tx: string;
}) {
  const cells = [
    ["Mechanism", path],
    ["How it looks", dx],
    ["What you do", tx],
  ] as const;
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {cells.map(([k, v]) => (
        <div key={k} className="rounded-2xl bg-elevated px-4 py-4 shadow-border">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-stone">{k}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{v}</p>
        </div>
      ))}
    </div>
  );
}
