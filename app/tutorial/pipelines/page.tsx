import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/PageShell";
import { Figure, Note } from "../setup/parts";

export const metadata: Metadata = {
  title: "Pipelines & Runs — Gardener | CrossOmics",
  description: "A practical guide to Gardener 3.0: custom pipelines and Loops, run tracking, the Agent, package sharing, datasets and execution environments."
};

const topics = [
  ["canvas", "Build on the canvas"],
  ["runs", "Inspect a run"],
  ["agent", "Work with the Agent"],
  ["packages", "Import and publish packages"],
  ["more", "Datasets, sandboxes & benchmarks"]
] as const;

function Screenshot({ file, alt, caption }: { file: string; alt: string; caption: string }) {
  return (
    <div>
      <Figure src={`/tutorial-v3/${file}.png`} alt={alt} caption={caption} width={1280} height={720} />
      <a className="cta-link tutorial-image-link" href={`/tutorial-v3/${file}.png`} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${caption}`}>
        Open full-size screenshot
      </a>
    </div>
  );
}

export default function PipelinesGuide() {
  return (
    <PageShell
      title="Pipelines & Runs"
      subtitle="A hands-on introduction to Gardener 3.0"
      breadcrumb={[{ label: "Tutorial", href: "/tutorial" }, { label: "Pipelines & Runs" }]}
    >
      <div className="feature-guide-lede">
        <p>
          Build or import a pipeline, adapt it on the canvas, and keep a record
          of its inputs, parameters and results. This guide covers editing,
          execution history, the Agent and sharing runnable packages.
        </p>
        <Note>
          First install the app and open a project using the <Link className="cta-link" href="/tutorial/setup">setup guide</Link>.
          Running a pipeline needs a suitable local sandbox or a connected HPC;
          using the Agent also
          needs a configured model and API key.
        </Note>
      </div>

      <nav className="feature-guide-topics" aria-label="On this page">
        {topics.map(([id, label], index) => (
          <a key={id} href={`#${id}`}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>
        ))}
      </nav>

      <section className="section feature-guide-section" aria-labelledby="canvas">
        <div className="section-header">
          <div className="section-eyebrow">01 / CANVAS</div>
          <h2 className="section-title" id="canvas">Build a pipeline and save a version</h2>
        </div>
        <div className="section-body">
          <ol className="setup-ol">
            <li>Click the <strong>plus icon beside Pipelines</strong> to create a pipeline, or open an imported pipeline. Choose <strong>Browse templates</strong> to start from a published template.</li>
            <li>Drag nodes from the palette, or use their plus buttons. Define inputs on <strong>Start</strong>, connect node ports, and declare the results on <strong>End</strong>. Use <strong>Data</strong> and <strong>Folder</strong> for typed file slots, and <strong>Code</strong> or built-in tools for processing.</li>
            <li>Use each node’s edit button to configure its inputs, parameters and supported execution settings. A <strong>Loop</strong> contains a body graph and bounded feedback iterations; configure its body, bindings and iteration limit before running it.</li>
            <li>Click <strong>Save</strong> to keep the draft. Then choose <strong>Create Version</strong> to snapshot it. <strong>History</strong> lets you inspect saved versions and their actions.</li>
            <li>Click <strong>Run</strong>, check the input bindings and run settings, then submit. Independent nodes may run concurrently within the configured limit; connected nodes wait for the outputs they need.</li>
          </ol>
          <Screenshot file="pipeline-canvas" alt="A real STAR and StringTie comparison pipeline with the node palette, connected standard and Opti2x branches, Run, Save and History controls" caption="The canvas connects inputs, processing steps and results. This example compares standard and Opti2x implementations." />
          <Note>
            Saving updates the editable draft. Creating a version makes a
            snapshot; running captures its own configuration. Editing the draft
            later does not rewrite the configuration of an earlier run.
          </Note>
          <p>For an analysis walkthrough and assay demos, continue to the <Link className="cta-link" href="/tutorial/analysis">analysis guide</Link>.</p>
        </div>
      </section>

      <section className="section feature-guide-section" aria-labelledby="runs">
        <div className="section-header">
          <div className="section-eyebrow">02 / RUN HISTORY</div>
          <h2 className="section-title" id="runs">Inspect what actually ran</h2>
        </div>
        <div className="section-body">
          <ol className="setup-ol">
            <li>Click <strong>Runs</strong> above the canvas, or expand a pipeline’s run history in the sidebar.</li>
            <li>Select a run and a node execution. Inspect its status, attempts, captured parameters, inputs and available outputs. Loop iterations and retries have distinct execution records.</li>
            <li>Open output files from the run details or the sidebar’s results. Use available provenance and dataset-usage views to follow the input/output relationships.</li>
            <li>For an interrupted or failed run, use the available <strong>Resume</strong> or <strong>Retry</strong> action after inspecting the failure. When multiple attempts exist, select the specific execution you mean.</li>
          </ol>
          <p>Supported run parameter overrides apply to that execution. Use <strong>Save to draft</strong> when you explicitly want those changes in the editable pipeline, including parameters inside a Loop.</p>
          <Note>
            A declared input is not proof that a run consumed it. Historical
            records may also have less detail than new runs. If a scheduler
            submission is uncertain, Gardener keeps it unresolved rather than
            automatically launching another job; check the actual job before retrying.
          </Note>
        </div>
      </section>

      <section className="section feature-guide-section" aria-labelledby="agent">
        <div className="section-header">
          <div className="section-eyebrow">03 / AGENT</div>
          <h2 className="section-title" id="agent">Ask about a specific execution</h2>
        </div>
        <div className="section-body">
          <ol className="setup-ol">
            <li>Configure a supported model and API key in Settings, then open the Agent panel beside the canvas. If it is collapsed, use the <strong>chat bubble at the right edge</strong> to reopen it.</li>
            <li>In the run details, use <strong>Use in chat</strong> for the execution you want the Agent to investigate.</li>
            <li>Ask a focused question, such as <em>“Read this execution’s parameters and logs, and explain the failure using the recorded evidence.”</em></li>
          </ol>
          <p>Gardener uses the selected execution context to help the Agent locate the relevant records. Keep the same chat to continue a discussion, and inspect the tool evidence and output links when checking its answer.</p>
          <Note>The Agent needs access to the relevant backend and files to inspect them. Selecting a node provides context; it does not mean every file has already been read.</Note>
        </div>
      </section>

      <section className="section feature-guide-section" aria-labelledby="packages">
        <div className="section-header">
          <div className="section-eyebrow">04 / PACKAGES</div>
          <h2 className="section-title" id="packages">Import once, adapt, then share</h2>
        </div>
        <div className="section-body">
          <h3>Import a package</h3>
          <ol className="setup-ol">
            <li>Click the <strong>cloud-download icon beside Pipelines</strong> to import a runnable package.</li>
            <li>Enter the published registry reference, including its <strong>sha256 digest</strong>. Provide registry credentials in the desktop app when required.</li>
            <li>Review the import options and wait for verification. Depending on the package and chosen options, runtime images or supported public input data may also need downloading.</li>
            <li>Open the imported pipeline, review its description and inputs, and supply any user-provided data before running.</li>
          </ol>
          <h3>Publish a package</h3>
          <ol className="setup-ol">
            <li><strong>Save</strong> the draft and <strong>Create Version</strong>.</li>
            <li>Open <strong>History</strong>, find the version, and choose <strong>Publish</strong>.</li>
            <li>Set the target registry and package options, review the included environment and data references, and publish.</li>
            <li>Share the resulting digest-pinned reference. Publish records carry signed provenance, and registry tokens stay in the desktop credential store.</li>
          </ol>
          <Note>Publishing a package uploads runnable material to the configured package registry. Share its digest-pinned reference so others can import that exact package.</Note>
        </div>
      </section>

      <section className="section feature-guide-section" aria-labelledby="more">
        <div className="section-header">
          <div className="section-eyebrow">05 / MORE TO TRY</div>
          <h2 className="section-title" id="more">Datasets, sandboxes and benchmarks</h2>
        </div>
        <div className="section-body">
          <ul className="setup-list">
            <li><strong>Merge datasets:</strong> use <strong>Merge</strong> beside the sidebar’s unused-data section to combine eligible scRNA-seq datasets into a new dataset. At least two datasets are needed, and their gene sets must match; mismatches are reported before proceeding.</li>
            <li><strong>Choose a sandbox:</strong> enable optional R or C/C++ support under <strong>Settings → Sandbox</strong>. Local execution uses compatible Docker/Podman images; HPC execution requires the corresponding remote runtime and images.</li>
            <li><strong>Compare Opti2x:</strong> open the <strong>flask icon beside Pipelines</strong> for the STAR / StringTie benchmark. Review inputs and resources, compare the standard and experimental Opti2x implementations, and inspect both resource metrics and biological QC. Stock tools remain the default; results depend on your data and execution environment.</li>
          </ul>
          <p>Need help? Join the <a className="cta-link" href="https://cross-omics.slack.com/archives/C0B6JCYNSCD" target="_blank" rel="noopener noreferrer">CrossOmics Slack</a>. When reporting a problem, include the app version, the relevant run or node, and a log excerpt with credentials and private paths removed.</p>
        </div>
      </section>
    </PageShell>
  );
}
