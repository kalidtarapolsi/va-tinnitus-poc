'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { processClaimAutomated, generateDecisionLetter, type ClaimSubmission, type ProcessingResult, type ProcessingStep, type VeteranInfo } from '@/engine/ratingEngine';
import { getMOSByBranch, type MOSEntry } from '@/data/mosNoiseExposure';

// ==========================================
// MAIN PAGE
// ==========================================

type AppStage = 'intro' | 'form' | 'processing' | 'results';

export default function Home() {
  const [stage, setStage] = useState<AppStage>('intro');
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [claim, setClaim] = useState<ClaimSubmission | null>(null);

  const handleStartDemo = () => setStage('form');

  const handleSubmitClaim = (submission: ClaimSubmission) => {
    setClaim(submission);
    setStage('processing');
  };

  const handleProcessingComplete = useCallback((res: ProcessingResult) => {
    setResult(res);
    setStage('results');
  }, []);

  const handleReset = () => {
    setStage('intro');
    setResult(null);
    setClaim(null);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-[#0A1628] text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#00B4D8] rounded flex items-center justify-center font-bold text-sm">A</div>
            <div>
              <div className="font-semibold text-sm tracking-wide">AQUIA</div>
              <div className="text-[10px] text-gray-400 tracking-widest uppercase">VA Claims Automation POC</div>
            </div>
          </div>
          {stage !== 'intro' && (
            <button
              onClick={handleReset}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Reset Demo
            </button>
          )}
        </div>
      </header>

      {/* Stage Router */}
      {stage === 'intro' && <IntroSection onStart={handleStartDemo} />}
      {stage === 'form' && <ClaimForm onSubmit={handleSubmitClaim} />}
      {stage === 'processing' && claim && (
        <ProcessingView claim={claim} onComplete={handleProcessingComplete} />
      )}
      {stage === 'results' && result && (
        <ResultsView result={result} onReset={handleReset} />
      )}
    </div>
  );
}

// ==========================================
// INTRO / LANDING
// ==========================================

function IntroSection({ onStart }: { onStart: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          VA Tinnitus Claims Automation
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A proof of concept showing how rules-based automation can process
          the most common VA disability claim in seconds instead of hours.
        </p>
      </div>

      {/* Problem / Solution boxes */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="text-red-700 font-semibold text-lg mb-3">Today: Manual Process</div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">&#9679;</span>
              <span>VSR manually reviews 526EZ form and establishes claim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">&#9679;</span>
              <span>Development phase: order C&P exam, wait weeks for results</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">&#9679;</span>
              <span>RVSR manually applies DC 6260 — a flat 10% every time</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">&#9679;</span>
              <span>Promulgation: manually generate decision letter</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">&#9679;</span>
              <span><strong>~365 minutes</strong> of processing per claim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500 mt-1">&#9679;</span>
              <span><strong>~250,000</strong> tinnitus claims per year</span>
            </li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <div className="text-green-700 font-semibold text-lg mb-3">Tomorrow: Automated</div>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">&#9679;</span>
              <span>Structured intake auto-identifies DC 6260 contention</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">&#9679;</span>
              <span>MOS verified against Noise Exposure Listing instantly</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">&#9679;</span>
              <span>Flat 10% rating applied automatically — no RVSR needed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">&#9679;</span>
              <span>Decision letter auto-generated with full legal citations</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">&#9679;</span>
              <span><strong>&lt; 5 seconds</strong> of processing per claim</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">&#9679;</span>
              <span><strong>$52M+/year</strong> in labor cost savings</span>
            </li>
          </ul>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white rounded-lg border p-8 mb-8">
        <h2 className="text-lg font-semibold mb-4">How This Demo Works</h2>
        <p className="text-gray-600 mb-4">
          This POC implements the actual VA claims processing logic for tinnitus (DC 6260).
          You&apos;ll fill out a simplified version of VA Form 21-526EZ, and the system will:
        </p>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: '1', label: 'Intake', desc: 'Parse the claim form and identify the tinnitus contention' },
            { step: '2', label: 'Evidence', desc: 'Look up MOS on VA Noise Exposure Listing, determine if C&P exam can be waived' },
            { step: '3', label: 'Rating', desc: 'Apply 38 CFR 4.87 DC 6260 criteria (flat 10%)' },
            { step: '4', label: 'Decision', desc: 'Generate a full Rating Decision letter with legal citations' },
          ].map((s) => (
            <div key={s.step} className="text-center">
              <div className="w-10 h-10 bg-[#0A1628] text-white rounded-full flex items-center justify-center mx-auto mb-2 font-bold">
                {s.step}
              </div>
              <div className="font-semibold text-sm">{s.label}</div>
              <div className="text-xs text-gray-500 mt-1">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onStart}
          className="bg-[#0A1628] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1a2d4a] transition-colors text-lg"
        >
          Start the Demo
        </button>
      </div>
    </div>
  );
}

// ==========================================
// CLAIM FORM (Simplified 526EZ)
// ==========================================

function ClaimForm({ onSubmit }: { onSubmit: (claim: ClaimSubmission) => void }) {
  const [branch, setBranch] = useState('Army');
  const [mosList, setMosList] = useState<MOSEntry[]>([]);
  const [selectedMOS, setSelectedMOS] = useState('');
  const [layStatement, setLayStatement] = useState(true);
  const [bilateral, setBilateral] = useState(true);

  const [firstName, setFirstName] = useState('James');
  const [lastName, setLastName] = useState('Smith');
  const [ssn, setSSN] = useState('4821');
  const [dob, setDOB] = useState('1988-03-15');
  const [serviceStart, setServiceStart] = useState('2008-06-15');
  const [serviceEnd, setServiceEnd] = useState('2016-08-20');
  const [claimDate, setClaimDate] = useState('2026-03-15');
  const [onsetDesc, setOnsetDesc] = useState('Persistent ringing in both ears began during deployment to Afghanistan in 2010. Exposed to IED blasts and heavy weapons fire. Symptoms have continued since separation from service.');

  useEffect(() => {
    const entries = getMOSByBranch(branch);
    setMosList(entries);
    if (entries.length > 0) {
      setSelectedMOS(entries[0].code);
    }
  }, [branch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const veteran: VeteranInfo = {
      firstName, lastName, ssn, dob, branch, mos: selectedMOS,
      serviceStart, serviceEnd, claimDate,
    };
    onSubmit({
      veteran,
      contention: 'tinnitus',
      layStatement,
      onsetDescription: onsetDesc,
      bilateral,
    });
  };

  const selectedEntry = mosList.find(m => m.code === selectedMOS);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-6">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Step 1 of 4</div>
        <h2 className="text-2xl font-bold">Claim Intake</h2>
        <p className="text-gray-500 mt-1">
          Simplified VA Form 21-526EZ — pre-filled with a sample veteran for demo purposes.
          Modify any field to test different scenarios.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Veteran Info */}
        <fieldset className="bg-white border rounded-lg p-6">
          <legend className="text-sm font-semibold text-gray-700 px-2">Veteran Information</legend>
          <div className="grid grid-cols-2 gap-4">
            <InputField label="First Name" value={firstName} onChange={setFirstName} />
            <InputField label="Last Name" value={lastName} onChange={setLastName} />
            <InputField label="Last 4 SSN" value={ssn} onChange={setSSN} maxLength={4} />
            <InputField label="Date of Birth" value={dob} onChange={setDOB} type="date" />
          </div>
        </fieldset>

        {/* Service Info */}
        <fieldset className="bg-white border rounded-lg p-6">
          <legend className="text-sm font-semibold text-gray-700 px-2">Military Service</legend>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Branch of Service</label>
              <select
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                {['Army', 'Marine Corps', 'Navy', 'Air Force', 'Coast Guard'].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">MOS / Rating / AFSC</label>
              <select
                value={selectedMOS}
                onChange={(e) => setSelectedMOS(e.target.value)}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                {mosList.map(m => (
                  <option key={m.code} value={m.code}>
                    {m.code} — {m.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedEntry && (
            <div className={`text-sm px-3 py-2 rounded ${
              selectedEntry.noiseExposure === 'Highly Probable'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : selectedEntry.noiseExposure === 'Moderate'
                ? 'bg-yellow-50 text-yellow-800 border border-yellow-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              <strong>Noise Exposure Level:</strong> {selectedEntry.noiseExposure}
              {selectedEntry.noiseExposure === 'Highly Probable' && ' — In-service noise exposure will be conceded'}
              {selectedEntry.noiseExposure === 'Moderate' && ' — In-service noise exposure will be conceded'}
              {selectedEntry.noiseExposure === 'Low' && ' — Additional evidence of noise exposure required'}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <InputField label="Service Start Date" value={serviceStart} onChange={setServiceStart} type="date" />
            <InputField label="Service End Date" value={serviceEnd} onChange={setServiceEnd} type="date" />
          </div>
        </fieldset>

        {/* Disability Claim */}
        <fieldset className="bg-white border rounded-lg p-6">
          <legend className="text-sm font-semibold text-gray-700 px-2">Disability Claimed: Tinnitus (DC 6260)</legend>

          <div className="flex items-center gap-6 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={bilateral}
                onChange={(e) => setBilateral(e.target.checked)}
                className="rounded"
              />
              Bilateral (both ears)
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={layStatement}
                onChange={(e) => setLayStatement(e.target.checked)}
                className="rounded"
              />
              Lay statement provided
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description of Onset (Lay Statement)
            </label>
            <textarea
              value={onsetDesc}
              onChange={(e) => setOnsetDesc(e.target.value)}
              rows={3}
              className="w-full border rounded px-3 py-2 text-sm"
            />
          </div>

          <InputField label="Claim Filing Date" value={claimDate} onChange={setClaimDate} type="date" />
        </fieldset>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#0A1628] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#1a2d4a] transition-colors"
          >
            Submit Claim for Automated Processing
          </button>
        </div>
      </form>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', maxLength }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        className="w-full border rounded px-3 py-2 text-sm"
      />
    </div>
  );
}

// ==========================================
// PROCESSING VIEW (Side-by-side)
// ==========================================

function ProcessingView({ claim, onComplete }: {
  claim: ClaimSubmission;
  onComplete: (result: ProcessingResult) => void;
}) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [result, setResult] = useState<ProcessingResult | null>(null);
  const [manualMinutes, setManualMinutes] = useState(0);
  const [autoSeconds, setAutoSeconds] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Run the engine immediately
    const res = processClaimAutomated(claim);
    setResult(res);

    // Animate steps one at a time
    let step = 0;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const interval = setInterval(() => {
      const currentStepData = res.processingSteps[step];
      if (step < res.processingSteps.length && currentStepData) {
        setCurrentStep(step);
        // Accumulate manual time
        setManualMinutes(prev => prev + currentStepData.manualEquivalentMinutes);
        setAutoSeconds(prev => prev + currentStepData.durationMs / 1000);
        step++;
      } else {
        clearInterval(interval);
        // Brief pause then show results
        timeoutId = setTimeout(() => onCompleteRef.current(res), 1500);
      }
    }, 800);

    return () => {
      clearInterval(interval);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [claim]);

  if (!result) return null;

  const totalManualMinutes = result.processingSteps.reduce((s, p) => s + p.manualEquivalentMinutes, 0);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-6">
        <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Steps 2-4</div>
        <h2 className="text-2xl font-bold">Processing Claim</h2>
        <p className="text-gray-500 mt-1">
          {claim.veteran.firstName} {claim.veteran.lastName} — Tinnitus (DC 6260) — MOS {claim.veteran.mos}
        </p>
      </div>

      {/* Timers */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-xs text-red-600 uppercase tracking-wide mb-1">Manual Process Time</div>
          <div className="text-3xl font-bold text-red-700">{manualMinutes} min</div>
          <div className="text-xs text-red-500 mt-1">({(manualMinutes / 60).toFixed(1)} hours)</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-xs text-green-600 uppercase tracking-wide mb-1">Automated Process Time</div>
          <div className="text-3xl font-bold text-green-700">{autoSeconds.toFixed(1)} sec</div>
          <div className="text-xs text-green-500 mt-1">
            ({currentStep >= result.processingSteps.length - 1
              ? `${Math.round(totalManualMinutes * 60 / result.totalProcessingTimeSeconds)}x faster`
              : 'Processing...'})
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {result.processingSteps.map((step, i) => (
          <div
            key={i}
            className={`border rounded-lg p-4 transition-all duration-300 ${
              i <= currentStep
                ? 'bg-white border-green-300 animate-fade-in-up'
                : 'bg-gray-50 border-gray-200 opacity-40'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                i <= currentStep ? 'bg-green-500 text-white' : 'bg-gray-300 text-white'
              }`}>
                {i <= currentStep ? '✓' : i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-gray-500 uppercase">{step.phase}</span>
                  <span className="text-xs text-gray-400">|</span>
                  <span className="text-xs text-gray-400">{step.manualEquivalentMinutes} min manual → {step.durationMs}ms automated</span>
                </div>
                <div className="text-sm font-medium text-gray-800">{step.action}</div>
                {i <= currentStep && (
                  <div className="text-sm text-gray-600 mt-1">{step.result}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// RESULTS VIEW
// ==========================================

function ResultsView({ result, onReset }: {
  result: ProcessingResult;
  onReset: () => void;
}) {
  const [showLetter, setShowLetter] = useState(false);
  const letter = generateDecisionLetter(result);
  const totalManualMinutes = result.manualEquivalentMinutes || result.processingSteps.reduce((s, p) => s + (p.manualEquivalentMinutes || 0), 0);
  const savingsPerClaim = ((totalManualMinutes / 60) * 44.30).toFixed(2); // blended rate with benefits
  const annualSavings = (250000 * parseFloat(savingsPerClaim)).toFixed(0);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Claim Processing Complete</h2>
        <p className="text-gray-500 mt-1">
          {result.veteran.firstName} {result.veteran.lastName} — Tinnitus (DC 6260)
        </p>
      </div>

      {/* Decision Summary */}
      <div className={`rounded-lg p-6 mb-6 ${
        result.decision.serviceConnectionGranted
          ? 'bg-green-50 border-2 border-green-300'
          : 'bg-red-50 border-2 border-red-300'
      }`}>
        <div className="flex items-center gap-3 mb-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
            result.decision.serviceConnectionGranted
              ? 'bg-green-500 text-white pulse-green'
              : 'bg-red-500 text-white'
          }`}>
            {result.decision.serviceConnectionGranted ? '✓' : '✗'}
          </div>
          <div>
            <div className="text-lg font-bold">
              Service Connection {result.decision.serviceConnectionGranted ? 'GRANTED' : 'DENIED'}
            </div>
            {result.decision.serviceConnectionGranted && (
              <div className="text-sm text-gray-600">
                DC {result.decision.diagnosticCode} — {result.decision.ratingPercentage}% — ${result.decision.monthlyCompensation.toFixed(2)}/month
              </div>
            )}
          </div>
        </div>

        {result.decision.serviceConnectionGranted ? (
          <div className="text-sm text-gray-700 space-y-1">
            {result.decision.reasoning.map((r, i) => (
              <p key={i}>{r}</p>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-700 space-y-1">
            {result.decision.denialReasons.map((r, i) => (
              <p key={i}>{r}</p>
            ))}
          </div>
        )}
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <MetricCard
          label="Processing Time"
          value={`${result.totalProcessingTimeSeconds.toFixed(1)}s`}
          subtext={`vs. ${totalManualMinutes} min manual`}
          color="green"
        />
        <MetricCard
          label="Cost Per Claim"
          value={`$${(result.totalProcessingTimeSeconds * 0.01).toFixed(2)}`}
          subtext={`vs. $${savingsPerClaim} manual`}
          color="green"
        />
        <MetricCard
          label="Annual Savings (250K claims)"
          value={`$${(parseInt(annualSavings) / 1000000).toFixed(0)}M`}
          subtext="in labor costs alone"
          color="green"
        />
      </div>

      {/* Evidence Assembly Detail */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-3">Evidence Assembly Detail</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <EvidenceRow label="MOS" value={`${result.veteran.mos}${result.evidence.mosEntry ? ` (${result.evidence.mosEntry.title})` : ''}`} />
            <EvidenceRow label="Noise Exposure" value={result.evidence.mosEntry?.noiseExposure || 'Not found'} />
            <EvidenceRow label="Noise Exposure Conceded" value={result.evidence.noiseExposureConceded ? 'Yes' : 'No'} />
          </div>
          <div className="space-y-2">
            <EvidenceRow label="Lay Statement" value={result.evidence.layStatementPresent ? 'Present' : 'Missing'} />
            <EvidenceRow label="C&P Exam Required" value={result.evidence.cpExamRequired ? 'Yes' : 'Waived'} />
            <EvidenceRow label="ARSD Generated" value={result.evidence.arsdGenerated ? 'Yes' : 'No'} />
          </div>
        </div>
        {result.evidence.cpExamWaiverReason && (
          <div className="mt-3 text-xs text-gray-500 bg-gray-50 rounded p-3">
            <strong>C&P Exam Waiver Rationale:</strong> {result.evidence.cpExamWaiverReason}
          </div>
        )}
      </div>

      {/* Decision Letter */}
      <div className="bg-white border rounded-lg overflow-hidden mb-6">
        <button
          onClick={() => setShowLetter(!showLetter)}
          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div>
            <div className="font-semibold">Rating Decision Letter</div>
            <div className="text-sm text-gray-500">Full auto-generated decision document with legal citations</div>
          </div>
          <span className="text-gray-400">{showLetter ? '▲' : '▼'}</span>
        </button>
        {showLetter && (
          <div className="border-t px-6 py-4 bg-[#fffef5]">
            <pre className="decision-letter text-gray-800 overflow-x-auto">{letter}</pre>
          </div>
        )}
      </div>

      {/* Processing Steps Recap */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="font-semibold mb-3">Processing Steps Recap</h3>
        <div className="space-y-2">
          {result.processingSteps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs flex-shrink-0">✓</div>
              <div className="flex-1">
                <span className="font-medium">{step.phase}:</span> {step.action}
              </div>
              <div className="text-xs text-gray-400 flex-shrink-0">
                {step.durationMs}ms <span className="text-gray-300">|</span> was {step.manualEquivalentMinutes}min
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0A1628] text-white rounded-lg p-8 text-center">
        <h3 className="text-xl font-bold mb-2">Ready to Pilot This at VA</h3>
        <p className="text-gray-300 mb-4 max-w-xl mx-auto">
          This POC demonstrates the decision logic. The next step is wiring it into VBMS
          via Aquia&apos;s existing NAII AI contract to run a live pilot with real claims data.
        </p>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onReset}
            className="bg-[#00B4D8] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#0096b7] transition-colors"
          >
            Run Another Scenario
          </button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, subtext, color }: {
  label: string; value: string; subtext: string; color: string;
}) {
  return (
    <div className={`bg-${color}-50 border border-${color}-200 rounded-lg p-4 text-center`}>
      <div className={`text-xs text-${color}-600 uppercase tracking-wide mb-1`}>{label}</div>
      <div className={`text-2xl font-bold text-${color}-700`}>{value}</div>
      <div className={`text-xs text-${color}-500 mt-1`}>{subtext}</div>
    </div>
  );
}

function EvidenceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
