# Jharkhand Health Intelligence Platform (J-HIP)

## Executive Summary

**J-HIP** is a state-wide, capital-light, AI-enabled health intelligence initiative serving **4.06 crore citizens** across **24 districts** of Jharkhand. The platform layers artificial intelligence-based decision support, population health management, and multilingual care coordination on top of Jharkhand's existing digital health ecosystem.

### Key Metrics
- **Total Budget**: ₹77.15 Crore (inclusive of 10% contingency, 5% overhead, 18% GST)
- **Implementation Period**: 60 months (Months 1-3 design & build; Months 4-12 pilot; Months 13-60 statewide scale-up)
- **Target Population**: ~4.06 crore citizens, ~66 lakh families
- **Special Focus**: 86 lakh tribal citizens, 8 Particularly Vulnerable Tribal Groups (PVTGs), mining-belt populations
- **Frontline Workers**: ~40,000 Sahiyas, ~8,000 ANMs/CHOs, ~2,800 Medical Officers

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           J-HIP Hybrid Architecture                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────────────┐         ┌─────────────────────────────────────┐   │
│  │  State Data Centre   │         │      IndiaAI Mission GPU Cloud      │   │
│  │     (Ranchi SDC)     │◄───────►│    (Subsidized Compute Infrastructure) │   │
│  │                      │  API    │                                     │   │
│  │  ┌────────────────┐  │         │  ┌─────────────────────────────┐    │   │
│  │  │ Data Lake      │  │         │  │ AI Training Workloads       │    │   │
│  │  │ (Apache Iceberg)│  │         │  │ - Tribal Speech NLP         │    │   │
│  │  └────────────────┘  │         │  │ - Computer Vision (X-Ray)   │    │   │
│  │  ┌────────────────┐  │         │  │ - Clinical Risk Models      │    │   │
│  │  │ MPI (ABHA)     │  │         │  │ - LLM Fine-tuning           │    │   │
│  │  └────────────────┘  │         │  └─────────────────────────────┘    │   │
│  │  ┌────────────────┐  │         │  ┌─────────────────────────────┐    │   │
│  │  │ FHIR Gateway   │  │         │  │ Inference Services          │    │   │
│  │  │ (HAPI FHIR R4) │  │         │  │ - Real-time Scoring         │    │   │
│  │  └────────────────┘  │         │  │ - Voice STT/TTS             │    │   │
│  │  ┌────────────────┐  │         │  └─────────────────────────────┘    │   │
│  │  │ Microservices  │  │         │                                     │   │
│  │  │ (Kubernetes)   │  │         │                                     │   │
│  │  └────────────────┘  │         │                                     │   │
│  └──────────────────────┘         └─────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    External System Integrations                      │   │
│  │  e-Shusrut │ HMIS │ RCH │ Nikshay │ PM-JAY │ Sahiya App │ ABDM    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      Delivery Channels                               │   │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────────┐    │   │
│  │  │ Sahiya App  │  │ Web Dashboard│  │ IVR/WhatsApp/SMS Gateway │    │   │
│  │  │ (Flutter)   │  │ (React.js)   │  │ (Multilingual Voice AI)  │    │   │
│  │  └─────────────┘  └──────────────┘  └─────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Five Strategic Pillars (27 AI Use Cases)

### Pillar 1: Population Health Management
| Use Case | Target | AI Function | Benefit |
|----------|--------|-------------|---------|
| 1.1 Post-discharge Care | MASSY/PM-JAY beneficiaries | Risk stratification, follow-up scheduling | Timely hospital-to-community handover |
| 1.2 Chronic Disease Management | Diabetes, HTN, CVD, CKD patients | Care-gap identification, prioritized care plans | High-risk patient visibility |
| 1.3 Maternal & Newborn Continuity | Pregnant women, newborns | ANC/PNC tracking, delivery notification | Automated due/overdue lists |
| 1.4 SAM/MTC Discharge | Malnourished children | Relapse risk detection, follow-up tasks | Continuous nutritional care |
| 1.5 Immunisation Defaulter Recovery | Children, pregnant women | Dropout prediction, priority follow-up | Manual list elimination |
| 1.6 TB Treatment Adherence | Nikshay-registered patients | Interruption risk flagging | Prioritized supporter lists |
| 1.7 Frontline Visit Prioritisation | Sahiyas, ANMs, CHOs | Ranked daily/weekly worklists | Structured, accountable fieldwork |

### Pillar 2: Tribal & Occupational Health
| Use Case | Target | AI Function | Benefit |
|----------|--------|-------------|---------|
| 2.1 Occupational Respiratory Risk | Mining/silica workers | Exposure-based screening prioritization | Optimal clinical capacity use |
| 2.2 Silicosis-TB Coordinated Care | Dust-disease patients | Nikshay linkage, treatment tracking | Unified marginalized community care |
| 2.3 Sickle Cell Pedigree Network | PVTG communities | Family tree mapping, carrier identification | Community-level disease control |
| 2.4 Anaemia Care Completion | Adolescent girls, pregnant women | IFA adherence tracking, gap closure | Reduced anaemia prevalence |

### Pillar 3: Clinical & Diagnostic Decision Support
| Use Case | Target | AI Function | Benefit |
|----------|--------|-------------|---------|
| 3.1 High-Risk Pregnancy Progression | Antenatal mothers | Sequential risk scoring, alert escalation | Early pre-eclampsia detection |
| 3.2 Neonatal Sepsis Early Warning | Newborns (0-28 days) | Vital sign trend analysis, sepsis probability | Reduced neonatal mortality |
| 3.3 Longitudinal Patient Summary | All patients | LLM-generated clinical narratives | Doctor time savings |
| 3.4 Medication Safety & Guideline Concordance | Prescribed patients | Drug-drug interaction checks, protocol adherence | Enhanced patient safety |
| 3.5 Emergency Tele-triage Routing | Emergency callers | Symptom-based facility routing | Optimal resource utilization |
| 3.6 Referral & Discharge Summary Digitization | Referred patients | OCR + NLP parsing of handwritten notes | Closed-loop referral tracking |

### Pillar 4: Financial Integrity & Scheme Compliance
| Use Case | Target | AI Function | Benefit |
|----------|--------|-------------|---------|
| 4.1 MASSY/PM-JAY Claims Anomaly Detection | Insurance claims | Unsupervised fraud pattern detection | Revenue leak prevention |
| 4.2 Multi-Grant Fund Reconciliation | Treasury, PFMS, DMFT accounts | Cross-system transaction matching | Accelerated grant disbursement |
| 4.3 Scheme Entitlement Gap Identification | Uncovered citizens | SECC/ration card eligibility matching | Increased cashless pathway enrollment |
| 4.4 PC&PNDT Compliance Risk Prioritization | Diagnostic facilities | Form-F lag analysis, risk scoring | Optimized inspection bandwidth |
| 4.5 Pre-Audit Bill Compliance Agent | DDOs, treasury officers | JFR rule validation, split-billing detection | Audit objection prevention |
| 4.6 Fund Velocity & UC Triggers | District program managers | Expenditure velocity tracking, UC draft generation | 30-45 day faster fund unlocking |

### Pillar 5: Hospital Performance Management
| Use Case | Target | AI Function | Benefit |
|----------|--------|-------------|---------|
| 5.1 Facility-wise Patient Volume Tracking | OPD/IPD patients | Speciality classification, footfall validation | Single verified patient view |
| 5.2 Equipment Utilisation & Non-reporting Asset Flagging | Biomedical equipment | Usage vs register cross-check | Living, verified equipment list |
| 5.3 Workforce Availability & Deployment Tracking | Sanctioned vs in-position staff | HRIS reconciliation, vacancy identification | Continuous vacancy monitoring |
| 5.4 Facility & Scheme Financial-flow Tracking | Budget allocation, expenditure | Allocation vs utilisation flagging | Integrated financial visibility |
| 5.5 Integrated Facility Performance Scorecard | All public facilities | Weighted composite scoring, narrative summary | One comparable facility score |

---

## 🔒 Governance & Compliance

### Human-in-the-Loop (HITL) Protocol
**CRITICAL**: All AI outputs function strictly as **Clinical Decision Support Advisories**.
- ❌ NO autonomous prescriptions, referrals, admissions, or claim rejections
- ✅ Final authority remains with licensed clinician or authorized officer
- 📝 Override logging mandatory for continuous model improvement

### DPDP Act 2023 Compliance
| Requirement | Implementation |
|-------------|----------------|
| Explicit Consent | ABDM Consent Manager integration |
| De-identification | Dynamic PII scrubbing before AI training |
| Encryption | AES-256 at rest, TLS 1.3 in transit |
| Access Control | Role-Based Access Control (RBAC) |
| Audit Trails | Immutable logs for all data access |
| Third-party Audits | Bi-annual CERT-In VAPT, annual bias audits |

### Clinical Safety Guardrails
- **Explainable AI (XAI)**: SHAP/LIME feature contributions for all predictions
- **Bias Testing**: <5% disparate impact threshold across demographic groups
- **Safety Board**: Monthly Clinical AI Safety Board reviews (RIMS faculty, specialists, epidemiologists)
- **Drift Detection**: Automated PSI >0.20 or AUC-ROC drop >0.04 triggers recalibration

---

## 🛠️ Technology Stack

### Core Infrastructure
| Component | Technology | Purpose |
|-----------|------------|---------|
| Container Orchestration | Kubernetes (K8s) | Microservices scaling, blue-green deployment |
| Service Mesh | Istio | Traffic management, mTLS, observability |
| API Gateway | Kong | Rate limiting, authentication, routing |
| Event Streaming | Apache Kafka | Real-time data pipelines |
| Workflow Orchestration | Apache Airflow | ETL job scheduling |

### Data Layer
| Component | Technology | Purpose |
|-----------|------------|---------|
| Data Lake Format | Apache Iceberg / Delta Lake | ACID transactions, time travel |
| Object Storage | MinIO (SDC) | S3-compatible blob storage |
| Primary Database | PostgreSQL 15+ | Transactional data, MPI |
| Search Engine | Elasticsearch 8.x | Patient search, audit log queries |
| Vector Database | Milvus / Qdrant | RAG embeddings, semantic search |
| Cache | Redis 7.x | Session management, real-time scores |

### AI/ML Stack
| Component | Technology | Purpose |
|-----------|------------|---------|
| Foundation LLMs | Llama 3 8B, Mistral 7B (fine-tuned) | Clinical summaries, NLP tasks |
| RAG Framework | LangChain / LlamaIndex | Context-aware retrieval |
| Computer Vision | YOLOv8, ResNet50 (qure.ai qXR integration) | X-ray analysis |
| Speech Recognition | Whisper-large-v3, Bhashini ASR | Tribal language STT |
| Text-to-Speech | Coqui TTS, Bhashini TTS | Vernacular voice output |
| MLOps | Kubeflow, MLflow, DVC | Model lifecycle, experiment tracking |
| Bias Detection | AIF360, Fairlearn | Demographic parity testing |
| Explainability | SHAP, LIME | Feature importance visualization |

### Application Development
| Component | Technology | Purpose |
|-----------|------------|---------|
| Web Frontend | Next.js 14, React 18, TypeScript | Executive dashboards |
| Mobile App | Flutter 3.x | Offline-first Sahiya app |
| Local DB | WatermelonDB, Realm | Device-side caching |
| Charts | D3.js, Recharts | Data visualizations |
| UI Library | Tailwind CSS, shadcn/ui | Consistent design system |

### Security & Observability
| Component | Technology | Purpose |
|-----------|------------|---------|
| IAM | Keycloak | OAuth2/OIDC, RBAC |
| Secrets | HashiCorp Vault | Credential management |
| Logging | ELK Stack (Elasticsearch, Logstash, Kibana) | Centralized logging |
| Metrics | Prometheus, Grafana | Performance monitoring |
| Tracing | Jaeger | Distributed tracing |
| SIEM | Wazuh | Security event monitoring |

### DevOps & CI/CD
| Component | Technology | Purpose |
|-----------|------------|---------|
| Version Control | Git (GitLab) | Source code management |
| CI/CD | GitLab CI / ArgoCD | Automated pipelines, GitOps |
| IaC | Terraform, Helm | Infrastructure provisioning |
| Testing | Jest, Pytest, Cypress, k6 | Unit, E2E, load testing |
| Container Registry | Harbor | Secure image storage |

---

## 📅 Implementation Roadmap

### Phase 0: Inception & Governance (Months 1-3)
- [ ] System Integrator contracting & mobilization
- [ ] SRS finalization & FHIR mapping
- [ ] SDC infrastructure provisioning
- [ ] IndiaAI GPU compute allocation
- [ ] Data-sharing agreements (Nikshay, MASSY, e-Shusrut)
- [ ] Data Lake & MPI development

### Phase 1: Build & 4-District Pilot (Months 4-12)
**Pilot Districts**: Ranchi, East Singhbhum, Khunti, Dumka
- [ ] AI/ML model engineering (Pillars 1-4)
- [ ] Tribal speech NLP training (Santhali, Ho, Mundari, Kurukh)
- [ ] Application development & dashboards
- [ ] Training of Trainers (~7,000 Sahiyas, 500 doctors)
- [ ] Pilot UAT & clinical sign-off
- [ ] Independent mid-term evaluation

### Phase 2: Statewide Rollout (Month 12+)
- [ ] Expansion to remaining 20 districts
- [ ] Full activation of all 27 AI use cases
- [ ] Executive dashboard launch (Chief Secretary, Cabinet)
- [ ] 24/7 O&M tier-2/3 support
- [ ] Continuous MLOps recalibration
- [ ] Annual refresher training

---

## 💰 Financial Summary

| Cost Head | Amount (₹ Cr) | Notes |
|-----------|---------------|-------|
| Base Programme Cost | 56.85 | SI development, manpower, GPU |
| Contingency (10%) | 5.69 | Risk buffer |
| Overhead (5%) | 2.84 | Executing agency costs |
| GST (18%) | 11.77 | Statutory tax |
| **Total Budget** | **77.15** | All-inclusive 5-year envelope |

### Expected Fiscal Impact
- **Year 2+ Savings**: ₹160-200 Cr/year from fraud prevention, reduced readmissions, accelerated fund flows
- **ROI**: ~2.5x over 5-year period
- **Beneficiaries**: 3.5 lakh vulnerable households annually (reduced OOPE)

---

## 📊 Success Metrics

| Category | Metric | Baseline | Target (Year 3) |
|----------|--------|----------|-----------------|
| Clinical | 30-day preventable readmissions | - | -25% |
| Clinical | Maternal complication interception rate | - | +40% |
| Operational | Sahiya visit compliance (priority cases) | ~60% | >90% |
| Financial | Fraudulent claim detection rate | ~2% | >8% |
| Financial | Grant disbursement velocity | 60-75 days | 30-45 days |
| Equity | Tribal population coverage | ~70% | >95% |
| Adoption | Active frontline worker usage | - | >85% |

---

## 🚀 Quick Start

### Prerequisites
```bash
# Required tools
- Node.js 20+
- Python 3.11+
- Docker Desktop / Podman
- kubectl, helm
- Terraform CLI
```

### Local Development Setup
```bash
# Clone repository
git clone https://github.com/jharkhand-health/jhip-prototype.git
cd jhip-prototype

# Start local services (PostgreSQL, Redis, MinIO, Kafka)
docker-compose up -d

# Install backend dependencies
cd src/backend && pip install -r requirements.txt

# Install frontend dependencies
cd ../frontend && npm install

# Run database migrations
alembic upgrade head

# Start development servers
npm run dev  # Frontend
uvicorn main:app --reload  # Backend
```

### Deploy to SDC (Production)
```bash
# Initialize Terraform state
terraform init

# Apply infrastructure configuration
terraform apply -var-file=sdc-production.tfvars

# Deploy Kubernetes manifests
helm upgrade --install jhip ./charts/jhip -f values-production.yaml

# Verify deployment
kubectl get pods -n jhip
```

---

## 📚 Documentation

- [System Requirements Specification (SRS)](docs/SRS.md)
- [Technical Architecture](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Data Privacy & DPDP Compliance](docs/PRIVACY.md)
- [Clinical Safety Protocols](docs/CLINICAL_SAFETY.md)
- [MLOps Playbook](docs/MLOPS.md)
- [Disaster Recovery Plan](docs/DR_PLAN.md)
- [Training Materials](docs/TRAINING.md)

---

## 🤝 Stakeholders

| Stakeholder | Role | Engagement |
|-------------|------|------------|
| DoHMEFW | Policy owner, budget holder | Steering committee, policy notes |
| District Health Societies | Local implementation | District cells, training |
| Sahiyas/ANMs/CHOs | Primary end-users | ToT training, feedback loops |
| Doctors & Specialists | Clinical validators | Clinical Validation Committee |
| Patients & Communities | Beneficiaries | IEC campaigns, grievance channels |
| Finance & IT Departments | Procurement, infrastructure | Joint working groups |
| JMHIDPCL | Contract management | RFP design, SLA monitoring |
| C-DAC/NIC | Government IT systems | Technical committees, API integration |

---

## ⚠️ Out of Scope

The following are **explicitly excluded**:
- Edge compute infrastructure, end-user devices (smartphones, tablets)
- Procurement of diagnostic equipment (X-ray machines, CT scanners, PACS)
- Autonomous clinical trials requiring CDSCO approval
- Parallel data-entry platforms (J-HIP integrates with existing systems only)

---

## 📞 Contact

**Project Management Unit (PMU)**  
Department of Health, Medical Education & Family Welfare  
Government of Jharkhand, Ranchi  

**Technical Support**: tech-support@jhip.jharkhand.gov.in  
**Grievance Redressal**: grievances@jhip.jharkhand.gov.in  

---

*This is a sovereign asset of the Government of Jharkhand. All IP, source code, and model weights will be transferred to the state upon vendor exit with zero encumbrance.*

**Version**: 1.0.0  
**Last Updated**: August 2026  
**Classification**: For Limited Distribution
