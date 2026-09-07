# System Requirements Specification (SRS)
## Jharkhand Health Intelligence Platform (J-HIP)

**Document Version**: 1.0.0  
**Date**: August 2026  
**Prepared For**: Department of Health, Medical Education & Family Welfare, Government of Jharkhand  
**Classification**: For Limited Distribution

---

## 1. Introduction

### 1.1 Purpose
This document defines the functional and non-functional requirements for the Jharkhand Health Intelligence Platform (J-HIP), a state-wide AI-enabled health intelligence system serving 4.06 crore citizens across 24 districts.

### 1.2 Scope
J-HIP is positioned as a **common intelligence, interoperability, and workflow layer** across existing health applications—not a parallel data-entry platform. The system converts already-collected data into beneficiary-level, closed-loop action.

### 1.3 Definitions & Acronyms
| Term | Definition |
|------|------------|
| ABHA | Ayushman Bharat Health Account (14-digit health ID) |
| ABDM | Ayushman Bharat Digital Mission |
| ANM | Auxiliary Nurse Midwife |
| CHC | Community Health Centre |
| CHO | Community Health Officer |
| DDO | Drawing & Disbursing Officer |
| DiD | Difference-in-Differences (evaluation methodology) |
| DPDP Act | Digital Personal Data Protection Act, 2023 |
| DSI | Disease Severity Index |
| ETL | Extract, Transform, Load |
| FHIR | Fast Healthcare Interoperability Resources (HL7 standard) |
| HITL | Human-in-the-Loop |
| HMIS | Hospital Management Information System |
| HRP | High-Risk Pregnancy |
| IFMS | Integrated Financial Management System |
| JFR | Jharkhand Financial Rules |
| MASSY | Mukhyamantri Amrat Yojana (state health scheme) |
| MeitY | Ministry of Electronics and Information Technology |
| MM | Man-Month |
| MPI | Master Patient Index |
| MTC | Malnutrition Treatment Centre |
| NICSI | National Informatics Centre Services Inc. |
| NLP | Natural Language Processing |
| OOPE | Out-of-Pocket Expenditure |
| PC&PNDT | Pre-Conception & Pre-Natal Diagnostic Techniques |
| PHC | Primary Health Centre |
| PMU | Project Management Unit |
| PSI | Population Stability Index |
| PVTG | Particularly Vulnerable Tribal Group |
| RBAC | Role-Based Access Control |
| SDC | State Data Centre (Ranchi) |
| SAM | Severe Acute Malnutrition |
| SPMU | State Project Management Unit |
| SRS | System Requirements Specification |
| ToT | Training of Trainers |
| UC | Utilization Certificate |
| VAPT | Vulnerability Assessment and Penetration Testing |
| XAI | Explainable AI |

---

## 2. Overall Description

### 2.1 Product Perspective
J-HIP integrates with the following existing systems:

**State Systems:**
- e-Shusrut (HMIS at RIMS & District Hospitals)
- Sahiya Portal & App (ASHA frontline worker platform)
- Malnutrition Treatment MIS (NRC)
- e-Aushadhi/DVDMS (Drug supply chain)
- Garima Jharkhand (PCPNDT compliance)
- PM-JAY TMS (Transaction Management System)

**Central Systems:**
- Nikshay (NTEP - TB registry)
- eSanjeevani (Tele-consultation)
- RCH Portal (Reproductive & Child Health)
- ANMOL (ANM Online)
- ABDM/ABHA Registry
- IHIP (Integrated Health Information Platform)
- U-WIN Portal (Immunization tracking)
- CPHC-NCD Portal (Non-communicable diseases)
- e-RaktKosh (Blood bank management)
- eVIN (Vaccine Intelligence Network)
- HMIS (Health Management Information System)

### 2.2 User Classes & Characteristics

| User Class | Count | Technical Proficiency | Primary Tasks |
|------------|-------|----------------------|---------------|
| Sahiyas (ASHA workers) | ~40,000 | Low (low-literacy support required) | Home visits, data entry via voice, incentive claims |
| ANMs/CHOs | ~8,000 | Medium | Service delivery, immunization, maternal care |
| Medical Officers | ~2,800 | Medium-High | Clinical decision-making, AI output review |
| Specialists (RIMS/DH) | ~500 | High | Complex case management, clinical validation |
| Civil Surgeons | 24 | High | District oversight, facility performance review |
| District Programme Managers | 24 | Medium | Program monitoring, fund utilization |
| State Leadership | ~50 | Medium-Low | Executive dashboards, policy decisions |
| Finance Officers (DDOs) | ~50 | Medium | Bill pre-audit, grant reconciliation |
| IT Administrators | ~20 | High | System configuration, user management |
| Patients/Citizens | 4.06 Cr | Variable | IVR/WhatsApp interactions, grievance filing |

### 2.3 Operating Environment

**Production Environment:**
- **Primary Hosting**: Jharkhand State Data Centre (SDC), Ranchi
- **AI Compute**: IndiaAI Mission GPU Cloud (subsidized)
- **OS**: Ubuntu Server 22.04 LTS / Red Hat Enterprise Linux 9
- **Container Runtime**: Docker 24+, containerd 1.7+
- **Orchestration**: Kubernetes 1.28+
- **Database**: PostgreSQL 15+, Elasticsearch 8.x
- **Network**: NIC 10 Gbps, redundant internet links (BSNL + private)

**Edge/Field Environment:**
- **Mobile OS**: Android 10+ (Sahiya smartphones)
- **Connectivity**: 2G/3G/4G, offline-first with local SQLite caching
- **Languages**: Santhali, Ho, Mundari, Kurukh, Khortha, Sadri, Hindi

### 2.4 Design & Implementation Constraints

1. **Data Sovereignty**: All citizen health data must reside within Jharkhand State Data Centre boundaries
2. **DPDP Act 2023 Compliance**: Mandatory consent architecture, de-identification, audit trails
3. **HITL Protocol**: No autonomous clinical decisions; all AI outputs are advisory only
4. **Offline-First**: Mobile app must function in zero-connectivity tribal regions
5. **Open Source First**: Avoid vendor lock-in; full IP transfer to Government of Jharkhand
6. **ABDM Compliance**: HL7 FHIR R4 standard for all health data exchanges
7. **Accessibility**: WCAG 2.1 AA compliance for low-literacy users
8. **Performance**: <5 second response time for AI inference under normal load

### 2.5 Assumptions & Dependencies

**Assumptions:**
- Existing digital systems (e-Shusrut, Nikshay, etc.) provide stable API endpoints
- 1.8 crore ABHA IDs are available for patient matching
- 40,000+ Sahiyas have access to Android smartphones
- State Data Centre provides baseline infrastructure at zero incremental cost
- IndiaAI Mission GPU subsidies remain available for 5-year period

**Dependencies:**
- MeitY approval for IndiaAI GPU compute allocation
- Data-sharing MoUs with central health programs (NTEP, NHA, MoHFW)
- CERT-In empanelled agencies for bi-annual VAPT audits
- Academic partners (AIIMS/IIPH) for independent evaluation
- Bhashini/National AI Stack for tribal language models

---

## 3. Functional Requirements

### 3.1 Core Platform Architecture

#### CORE-1: State Health Data Lake
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| DL-01 | Ingest batch data from 12+ source systems via SFTP/API | Critical | Daily ingestion completes by 6 AM IST with <0.1% record rejection |
| DL-02 | Store data in Apache Iceberg format with ACID transactions | Critical | Time-travel queries supported for 7-year retention period |
| DL-03 | Implement columnar partitioning by district, facility, date | High | Query latency <2 seconds for 95th percentile |
| DL-04 | Support schema evolution without breaking existing pipelines | High | Backward-compatible schema changes deployed without downtime |
| DL-05 | Encrypt all data at rest using AES-256 | Critical | VAPT audit confirms encryption key separation |

#### CORE-2: Master Patient Index (MPI)
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| MPI-01 | Match incoming records against 14-digit ABHA ID | Critical | >99.5% match accuracy for valid ABHA records |
| MPI-02 | Deterministic matching using Aadhaar hash, ration card ID | Critical | Zero false-positive matches on deterministic keys |
| MPI-03 | Probabilistic matching using name, age, village, mobile hash | High | >95% precision, >90% recall on test dataset |
| MPI-04 | Generate pseudo-anonymization token for clinical datasets | Critical | One-way hashing verified by third-party audit |
| MPI-05 | Resolve duplicate patient profiles across facilities | High | Duplicate rate reduced to <2% after MPI implementation |

#### CORE-3: FHIR R4 Interoperability Hub
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| FHIR-01 | Implement HAPI FHIR server compliant with R4 specification | Critical | Passes HL7 FHIR conformance testing |
| FHIR-02 | Map source system data to FHIR resources (Patient, Encounter, Observation, etc.) | Critical | 100% coverage of 27 AI use case data requirements |
| FHIR-03 | Enforce OAuth2/OIDC authentication via ABDM Consent Manager | Critical | Consent revocation immediately blocks data access |
| FHIR-04 | Rate-limit API calls to prevent denial-of-service | High | 1000 requests/minute per client with graceful degradation |
| FHIR-05 | Log all API transactions in immutable audit trail | Critical | 100% queryable audit log with <1 hour retention lag |

#### CORE-4: Unified Applications
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| APP-01 | Flutter mobile app with offline-first architecture | Critical | Full functionality with zero connectivity for 8 hours |
| APP-02 | Automatic sync when connectivity restored | Critical | Conflict resolution preserves latest user action |
| APP-03 | Voice-guided checklists in 7 tribal languages | High | >90% speech recognition accuracy in noisy field conditions |
| APP-04 | OCR capability for printed medical documents | Medium | >85% text extraction accuracy for Devanagari/Latin scripts |
| APP-05 | Role-based web dashboards for state/district leadership | High | Dashboard loads in <3 seconds with 1 year of aggregated data |

### 3.2 Pillar 1: Population Health Management

#### Use Case 1.1: Post-discharge Care Management
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| P1.1-01 | Analyse discharge records from e-Shusrut/MASSY within 24 hours | Critical | 100% of discharges processed within SLA |
| P1.1-02 | Classify follow-up risk (low/medium/high) based on diagnosis, comorbidities | High | AUC-ROC >0.85 on validation dataset |
| P1.1-03 | Generate condition-appropriate follow-up schedule | High | Schedule aligns with national clinical guidelines |
| P1.1-04 | Send automated IVR/WhatsApp reminders to patients | Medium | >70% patient acknowledgment rate |
| P1.1-05 | Escalate red-flag symptoms to responsible Sahiya/ANM | Critical | Alert delivered within 15 minutes of patient response |

#### Use Case 1.2: Chronic Disease Care-Gap Management
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| P1.2-01 | Identify overdue tests, missed reviews, refill gaps | High | 100% of eligible patients screened monthly |
| P1.2-02 | Generate prioritized care plan for professional review | High | Care plan includes specific actions, deadlines |
| P1.2-03 | Track medicine, test, and review compliance | Medium | Compliance dashboard updated daily |
| P1.2-04 | Flag rising clinical risk based on vitals trend | High | Sensitivity >80% for detecting deterioration |

#### Use Case 1.3: Maternal & Newborn Continuity Tracking
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| P1.3-01 | Track sequence of ANC visits, investigations, delivery, PNC | Critical | 100% of registered pregnancies tracked longitudinally |
| P1.3-02 | Identify likely care discontinuity | High | Predictive model precision >85% |
| P1.3-03 | Auto-generate due/overdue lists for ANMs/Sahiyas | Critical | Lists available by 8 AM daily |
| P1.3-04 | Notify delivery and discharge events faster | High | Notification latency <4 hours from event |

#### Use Case 1.4: SAM/MTC Discharge & Nutritional Relapse
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| P1.4-01 | Analyse weight-gain trajectory and discharge status | High | 100% of MTC discharges monitored |
| P1.4-02 | Identify children needing early review | High | Recall >90% for relapse cases |
| P1.4-03 | Generate child-specific follow-up tasks for community workers | Medium | Task completion rate >80% |

#### Use Case 1.5: Immunisation Defaulter Recovery
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| P1.5-01 | Integrate with U-WIN portal for vaccination history | Critical | Real-time sync with U-WIN API |
| P1.5-02 | Identify missed doses and estimate dropout likelihood | High | Dropout prediction AUC >0.80 |
| P1.5-03 | Generate beneficiary-level follow-up priorities | Critical | Prioritized list reduces defaulter rate by >30% |

#### Use Case 1.6: TB Treatment Adherence
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| P1.6-01 | Integrate with Nikshay API for treatment events | Critical | Bidirectional sync with Nikshay |
| P1.6-02 | Flag patients at risk of treatment interruption | High | Early warning >7 days before missed dose |
| P1.6-03 | Provide prioritized follow-up lists to treatment supporters | Medium | List updated daily |

#### Use Case 1.7: AI-guided Frontline Visit Prioritisation
| ID | Requirement | Priority | Acceptance Criteria |
|----|-------------|----------|---------------------|
| P1.7-01 | Combine approved risk flags into ranked daily worklist | Critical | Worklist generated by 6 AM daily |
| P1.7-02 | Show reason for visit, required action, completion deadline | Critical | 100% of tasks include actionable context |
| P1.7-03 | Enable supervisor visibility into pending/completed/escalated work | High | Supervisor dashboard refreshes every 15 minutes |

*(Continued in next sections for Pillars 2-5)*

---

## 4. Non-Functional Requirements

### 4.1 Performance Requirements
| ID | Requirement | Metric | Measurement Method |
|----|-------------|--------|-------------------|
| NF-PERF-01 | API response time (p95) | <500ms | Prometheus histograms |
| NF-PERF-02 | AI inference latency (p95) | <3 seconds | MLflow tracing |
| NF-PERF-03 | Dashboard load time | <3 seconds | Lighthouse performance score |
| NF-PERF-04 | Mobile app cold start | <2 seconds | Firebase Performance Monitoring |
| NF-PERF-05 | Batch ETL completion | By 6 AM IST daily | Airflow DAG run duration |
| NF-PERF-06 | Concurrent user support | 50,000+ simultaneous users | k6 load testing |

### 4.2 Scalability Requirements
| ID | Requirement | Target Scale | Scaling Strategy |
|----|-------------|--------------|------------------|
| NF-SCALE-01 | Patient records | 10 crore longitudinal profiles | Horizontal sharding by ABHA prefix |
| NF-SCALE-02 | Daily transactions | 50 lakh events | Kafka partitioning, auto-scaling consumers |
| NF-SCALE-03 | AI inference requests | 10 lakh/day | Kubernetes HPA, GPU autoscaling |
| NF-SCALE-04 | Storage growth | 50 TB/year | MinIO erasure coding, tiered storage |

### 4.3 Reliability & Availability
| ID | Requirement | Target | Measurement |
|----|-------------|--------|-------------|
| NF-REL-01 | Core service uptime | 99.5% (SLA) | Grafana uptime dashboard |
| NF-REL-02 | Disaster recovery RTO | <4 hours | Quarterly DR drills |
| NF-REL-03 | Disaster recovery RPO | <15 minutes | Backup verification logs |
| NF-REL-04 | Mean time to detect (MTTD) | <5 minutes | Alertmanager metrics |
| NF-REL-05 | Mean time to resolve (MTTR) | <1 hour (P1 incidents) | Incident management logs |

### 4.4 Security Requirements
| ID | Requirement | Standard | Verification |
|----|-------------|----------|--------------|
| NF-SEC-01 | Data encryption at rest | AES-256 | VAPT audit report |
| NF-SEC-02 | Data encryption in transit | TLS 1.3 | SSL Labs A+ rating |
| NF-SEC-03 | Authentication | OAuth2/OIDC with MFA | Penetration testing |
| NF-SEC-04 | Authorization | RBAC with least privilege | Access control matrix review |
| NF-SEC-05 | Audit logging | Immutable, tamper-evident | Log integrity verification |
| NF-SEC-06 | Vulnerability scanning | Weekly automated scans | Wazuh SIEM reports |
| NF-SEC-07 | VAPT audit | Bi-annual CERT-In empanelled | Audit certificate submission |

### 4.5 Privacy & Compliance (DPDP Act 2023)
| ID | Requirement | Compliance Measure | Evidence |
|----|-------------|-------------------|----------|
| NF-PRIV-01 | Explicit consent capture | ABDM Consent Manager integration | Consent transaction logs |
| NF-PRIV-02 | Right to revoke consent | Immediate access termination | Revocation audit trail |
| NF-PRIV-03 | Data minimization | Dynamic PII scrubbing | Data dictionary review |
| NF-PRIV-04 | Purpose limitation | No commercial profiling use | Third-party privacy audit |
| NF-PRIV-05 | Grievance redressal | Multilingual ticketing system | Resolution SLA reports |
| NF-PRIV-06 | Data principal rights | Export/delete on request | Request fulfillment logs |

### 4.6 Usability & Accessibility
| ID | Requirement | Standard | Testing Method |
|----|-------------|----------|----------------|
| NF-USE-01 | Low-literacy support | Voice-first UI | User acceptance testing with Sahiyas |
| NF-USE-02 | Multilingual interface | 7 tribal languages + Hindi | Native speaker validation |
| NF-USE-03 | WCAG compliance | WCAG 2.1 AA | Automated + manual accessibility audit |
| NF-USE-04 | Offline functionality | 8+ hours without connectivity | Field testing in zero-network areas |
| NF-USE-05 | Task completion rate | >90% for core workflows | Usability testing metrics |

### 4.7 Maintainability
| ID | Requirement | Target | Measurement |
|----|-------------|--------|-------------|
| NF-MAIN-01 | Code coverage | >80% unit test coverage | SonarQube reports |
| NF-MAIN-02 | Documentation completeness | 100% API endpoints documented | OpenAPI spec validation |
| NF-MAIN-03 | Deployment frequency | Multiple times per day | CI/CD pipeline metrics |
| NF-MAIN-04 | Change failure rate | <5% | DORA metrics tracking |
| NF-MAIN-05 | Technical debt ratio | <10% | Static code analysis |

---

## 5. AI/ML Model Requirements

### 5.1 Model Development Standards
| ID | Requirement | Standard | Validation |
|----|-------------|----------|------------|
| AI-DEV-01 | Foundation model selection | Open-weights (Llama 3, Mistral) | License compliance verification |
| AI-DEV-02 | Fine-tuning methodology | LoRA/QLoRA for efficiency | GPU hour tracking |
| AI-DEV-03 | Training data provenance | Documented source, consent status | Data lineage tracking |
| AI-DEV-04 | Hyperparameter tuning | Automated (Optuna/Ray Tune) | Experiment reproducibility |
| AI-DEV-05 | Model versioning | DVC + MLflow registry | Version traceability |

### 5.2 Model Performance Thresholds
| Use Case | Metric | Minimum Threshold | Recalibration Trigger |
|----------|--------|-------------------|----------------------|
| High-Risk Pregnancy Scoring | AUC-ROC | >0.85 | Drop >0.04 |
| Neonatal Sepsis Prediction | Sensitivity | >90% | Drop >5% |
| Claims Anomaly Detection | Precision | >80% | Drop >10% |
| Speech Recognition (Tribal) | WER | <15% | Increase >5% |
| Patient Matching (MPI) | Precision | >99% | Any false positive |
| Readmission Risk | AUC-ROC | >0.80 | Drop >0.05 |

### 5.3 Bias & Fairness Testing
| ID | Requirement | Threshold | Testing Frequency |
|----|-------------|-----------|-------------------|
| AI-BIAS-01 | Disparate impact ratio (ST vs General) | 0.80 - 1.25 | Monthly |
| AI-BIAS-02 | Equal opportunity difference (gender) | <0.05 | Monthly |
| AI-BIAS-03 | Calibration error across districts | <0.10 | Quarterly |
| AI-BIAS-04 | False negative rate parity (tribal blocks) | <5% disparity | Monthly |
| AI-BIAS-05 | Override rate analysis (clinician overrides) | Track by demographic | Continuous |

### 5.4 Explainability Requirements
| ID | Requirement | Implementation | User Visibility |
|----|-------------|----------------|-----------------|
| AI-XAI-01 | Feature contribution display | SHAP values for top 5 features | Doctor dashboard |
| AI-XAI-02 | Plain-language explanation | LLM-generated narrative summary | Sahiya app, patient SMS |
| AI-XAI-03 | Confidence score display | Probability with uncertainty bounds | All AI outputs |
| AI-XAI-04 | Counterfactual explanation | "What would change the recommendation?" | Clinical review interface |

### 5.5 MLOps & Drift Detection
| ID | Requirement | Threshold | Action |
|----|-------------|-----------|--------|
| AI-MLOPS-01 | Population Stability Index monitoring | PSI >0.20 triggers alert | Automated recalibration |
| AI-MLOPS-02 | Concept drift detection | AUC drop >0.04 | Model retraining pipeline |
| AI-MLOPS-03 | Quarterly retraining schedule | Every 90 days | IndiaAI GPU cluster |
| AI-MLOPS-04 | Blue-green deployment | Zero-downtime rollout | Kubernetes canary release |
| AI-MLOPS-05 | Rollback capability | <15 minutes | Automated on anomaly detection |

---

## 6. Integration Requirements

### 6.1 External System Interfaces
| System | Integration Method | Data Flow | Frequency | Owner |
|--------|-------------------|-----------|-----------|-------|
| e-Shusrut | REST API + SFTP batch | EMR, discharge summaries | Real-time + nightly | C-DAC |
| HMIS | Webhook listeners | Facility performance indicators | Daily | State HMIS Cell |
| RCH Portal | API gateway | ANC/PNC registrations, deliveries | Hourly | MoHFW |
| Nikshay | REST API (NTEP) | TB registrations, treatment events | Real-time | Central TB Division |
| PM-JAY TMS | SFTP batch + API | Claims, pre-authorizations | Daily + real-time | State Health Agency |
| Sahiya MIS | Mobile app backend sync | Home visit logs, incentives | On-device sync | ASHA Cell |
| U-WIN | API integration | Vaccination records | Real-time | Immunization Division |
| DVDMS/e-Aushadhi | SFTP batch | Drug inventory, stockouts | Daily | JSMSCL |
| Garima Jharkhand | Database view | Form-F compliance, facility registry | Weekly | PCPNDT Cell |
| Kuber IFMS | API/webhook | Grant disbursements, UC status | Real-time | Finance Dept |
| ABDM Registry | FHIR API | ABHA verification, consent | Real-time | NHA |

### 6.2 Data Exchange Standards
| Standard | Usage | Version | Compliance Level |
|----------|-------|---------|------------------|
| HL7 FHIR R4 | Clinical data exchange | R4 | Must be conformant |
| DICOM | Medical imaging (future) | 3.0 | Should support |
| ICD-10/11 | Diagnosis coding | ICD-10 (transition to 11) | Must support |
| SNOMED CT | Clinical terminology | International Edition | Should support |
| LOINC | Laboratory observations | 2.74+ | Should support |
| ISO 8601 | Date/time formatting | - | Must comply |
| UTF-8 | Character encoding | - | Must comply |

---

## 7. Documentation Deliverables

| Document | Audience | Format | Delivery Milestone |
|----------|----------|--------|-------------------|
| System Requirements Specification | Technical team, PMU | PDF + Markdown | Month 2 |
| Technical Architecture Document | Architects, DevOps | PDF + Diagrams | Month 3 |
| API Specification (OpenAPI 3.0) | Developers | YAML + Swagger UI | Month 6 |
| Database Schema Documentation | DBAs, Backend devs | ERD + SQL DDL | Month 6 |
| User Manuals (Sahiya, ANM, MO) | End users | Vernacular PDFs + Videos | Month 10 |
| Administrator Guide | IT staff | Markdown + Runbooks | Month 10 |
| Clinical Safety Protocol | Doctors, Safety Board | PDF | Month 8 |
| Disaster Recovery Plan | Ops team, PMU | PDF + Checklists | Month 10 |
| Training Materials | Trainers, Trainees | PPT + Handbooks | Month 9 |
| Test Plans & Reports | QA, PMU | Excel + Markdown | Continuous |
| VAPT Audit Reports | Security team, CERT-In | PDF (confidential) | Bi-annual |
| Model Cards (AI/ML) | Clinical board, auditors | Markdown | Per model release |
| Source Code Documentation | Developers, State IT | Inline comments + README | Continuous |
| Exit Transition Package | State government | Complete repository | Contract end |

---

## 8. Acceptance Criteria

### 8.1 Milestone Acceptance

**Milestone 1: Mobilization (Month 2)**
- [ ] Approved Work Breakdown Structure
- [ ] Bank guarantee submitted
- [ ] Project team onboarded
- [ ] Governance committees constituted

**Milestone 2: Core Platform Go-Live (Month 7)**
- [ ] SDC infrastructure operational
- [ ] Data Lake ingesting from 5+ source systems
- [ ] MPI engine matching >95% accuracy
- [ ] FHIR gateway passing conformance tests

**Milestone 3: AI Engines Integration (Month 10)**
- [ ] All Pillar 1-4 AI modules developed
- [ ] Lab validation completed with >85% accuracy
- [ ] Tribal speech models trained for 4 languages
- [ ] UAT passed with 500+ test cases

**Milestone 4: 4-District Pilot Acceptance (Month 12)**
- [ ] Field deployment in Ranchi, East Singhbhum, Khunti, Dumka
- [ ] 7,000+ Sahiyas trained
- [ ] 500+ doctors onboarded
- [ ] Clinical sign-off from Safety Board
- [ ] Independent evaluation report submitted

**Milestone 5: Statewide Go-Live (Month 18)**
- [ ] All 24 districts operational
- [ ] All 27 AI use cases activated
- [ ] Executive dashboard launched
- [ ] 24/7 O&M support established

### 8.2 SLA Requirements (O&M Phase)
| Metric | Target | Penalty Clause |
|--------|--------|----------------|
| Core service uptime | 99.5% monthly | 5% payment deduction per 0.1% below |
| P1 incident response | <15 minutes | Escalation to PMU |
| P2 incident response | <1 hour | Monthly review |
| Bug fix turnaround (critical) | <24 hours | SLA credit |
| Model recalibration | Quarterly, on-time | Mandatory deliverable |
| DR drill success | Quarterly, 100% pass | Contract compliance |

---

## 9. Appendices

### Appendix A: Stakeholder Interview Summary
(Refer to Annexure A of DPR - 14 consultation records, 19 participants across Bokaro, Ranchi, Khunti)

### Appendix B: Sample Data Models
```json
{
  "resourceType": "Patient",
  "id": "ABHA-1234567890123456",
  "identifier": [
    {
      "system": "https://abdm.gov.in/abha",
      "value": "1234-5678-9012-3456"
    }
  ],
  "name": [{ "text": "Devi Kumari" }],
  "gender": "female",
  "birthDate": "1995-03-15",
  "address": [
    {
      "district": "Khunti",
      "state": "Jharkhand",
      "villageCode": "JH-KHU-001"
    }
  ],
  "extension": [
    {
      "url": "http://jhip.in/fhir/StructureDefinition/tribal-status",
      "valueCodeableConcept": {
        "coding": [{ "code": "ST", "display": "Scheduled Tribe" }]
      }
    }
  ]
}
```

### Appendix C: Risk Register
(See Section 10 of DPR for comprehensive risk assessment)

---

**Document Approval**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Director, DoHMEFW | | | |
| State Mission Director, NHM | | | |
| Chief Medical Officer, Pilot District | | | |
| Clinical AI Safety Board Chair | | | |
| System Integrator Project Manager | | | |
