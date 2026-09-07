# Clinical Safety Protocols
## Jharkhand Health Intelligence Platform (J-HIP)

**Document Version**: 1.0.0  
**Date**: August 2026  

---

## 1. Executive Summary

This document establishes the clinical safety governance framework for J-HIP's AI-enabled Clinical Decision Support System (CDSS). All AI outputs function strictly as **advisory only** with mandatory Human-in-the-Loop (HITL) protocols.

### Core Safety Principles
1. **Zero Autonomous Decisions**: No prescription, referral, admission, or claim rejection executed without human authorization
2. **Explainability**: Every AI recommendation includes SHAP-based feature contributions
3. **Bias Monitoring**: <5% performance disparity threshold across demographic groups
4. **Override Logging**: All clinician overrides captured for continuous improvement
5. **Monthly Safety Review**: Clinical AI Safety Board reviews all adverse events

---

## 2. Human-in-the-Loop (HITL) Protocol

All AI outputs must be reviewed and authorized by a licensed clinician before any action is taken. The following actions are **prohibited** from autonomous execution:

| Action Category | Required Human Authorization |
|-----------------|------------------------------|
| Prescribing | Medical Officer signature |
| Referrals | MO approval + patient consent |
| Admissions | Receiving facility acceptance |
| Discharges | Treating physician sign-off |
| Diagnostic Orders | Clinician order entry |
| Claims Processing | SHA/TMS officer review |

---

## 3. Explainable AI (XAI) Requirements

All clinical risk predictions must display:
- Top 5 contributing factors (SHAP values)
- Confidence score with uncertainty bounds
- Plain-language summary for non-clinician users
- Reference to clinical guidelines

---

## 4. Algorithmic Bias & Fairness Testing

| Metric | Acceptable Threshold |
|--------|---------------------|
| Disparate Impact Ratio | 0.80 - 1.25 |
| Equal Opportunity Difference | <0.05 |
| Calibration Error | <0.10 |
| False Negative Rate Parity | <0.05 |

Protected groups monitored: Tribal Status, Gender, Geography, Economic Status, Age, Education

---

## 5. Clinical AI Safety Board

**Composition:**
- Chair: Senior Obstetrician/Gynecologist (RIMS)
- Members: Internal Medicine, Pediatrics, Epidemiology, Tribal Health, Ethics/Legal, Patient Advocate
- Secretary: Clinical Informatics Lead (PMU)

**Meeting Schedule:**
- Routine Review: Monthly
- Adverse Event Review: Within 7 days of serious event
- Model Approval: Per new model release
- Annual Assessment: Yearly

---

## 6. Override Management

Override categories tracked:
- Appropriate Override (AI incorrect)
- Defensive Override (liability concerns)
- Workflow Override (resource constraints)
- Knowledge Gap Override (unaware of guideline)
- Patient Preference Override

---

## 7. Adverse Event Reporting

| Grade | Definition | Reporting Timeline |
|-------|------------|-------------------|
| Grade 0 | No harm (near-miss) | Monthly aggregate |
| Grade 1 | Mild, reversible | Within 7 days |
| Grade 2 | Moderate, requires intervention | Within 24 hours |
| Grade 3 | Severe, life-threatening | Immediate (<1 hour) |
| Grade 4 | Death | Immediate (<1 hour) |

---

## 8. Emergency Shutdown Protocol

**Triggers for Model Suspension:**
- Critical safety signal (Grade 3-4 events cluster)
- Data breach affecting model integrity
- Regulatory directive (MoHFW, NHA)
- Catastrophic system failure

**Fallback Procedures:**
1. Display banner "AI Decision Support Temporarily Unavailable"
2. Continue with standard protocols
3. Document AI unavailability in patient record
4. Escalate high-risk cases to senior clinician

---

## Contact Information

**Clinical AI Safety Board Secretariat**  
Email: safety.board.jhip@jharkhand.gov.in

**Adverse Event Hotline (24/7)**  
Phone: +91-XXX-XXXXXXX

---

*Last Review*: August 2026  
*Next Review*: November 2026
