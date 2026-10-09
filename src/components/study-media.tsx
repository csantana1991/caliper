import { EcgPaper } from "@/components/ecg-paper";
import { EchoStudyView } from "@/components/echo-study";
import { AngioFilm } from "@/components/angio-film";
import { HemoStrip } from "@/components/hemo-strip";
import { NuclearMap } from "@/components/nuclear-map";
import { CmrStudyView } from "@/components/cmr-study";

export function StudyMedia({
  tracingId,
  echoId,
  angioId,
  hemoId,
  nuclearId,
  cmrId,
  compact,
}: {
  tracingId?: string;
  echoId?: string;
  angioId?: string;
  hemoId?: string;
  nuclearId?: string;
  cmrId?: string;
  compact?: boolean;
}) {
  return (
    <div className="space-y-3">
      {tracingId ? <EcgPaper tracingId={tracingId} compact={compact} /> : null}
      {echoId ? <EchoStudyView studyId={echoId} /> : null}
      {angioId ? <AngioFilm studyId={angioId} /> : null}
      {hemoId ? <HemoStrip studyId={hemoId} /> : null}
      {nuclearId ? <NuclearMap studyId={nuclearId} /> : null}
      {cmrId ? <CmrStudyView studyId={cmrId} /> : null}
    </div>
  );
}
